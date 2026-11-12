import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { WatermarkWorkerApi } from './worker';
import { WATERMARK_ACCEPTS, cleanText, defaultWatermarkOptions, outputName, type WatermarkOptions } from './options';

const handle = new WorkerHandle<WatermarkWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const watermarkTool: ToolDefinition<WatermarkOptions> = {
  id: 'watermark',
  accepts: WATERMARK_ACCEPTS,
  defaultOptions: defaultWatermarkOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (!cleanText(options.text)) throw new Error('Type the text for the watermark first.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.watermark(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
