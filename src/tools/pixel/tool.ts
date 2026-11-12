import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat } from '../image-format';
import type { PixelWorkerApi } from './worker';
import { PIXEL_ACCEPTS, defaultPixelOptions, outputName, type PixelOptions } from './options';

const handle = new WorkerHandle<PixelWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const pixelTool: ToolDefinition<PixelOptions> = {
  id: 'pixel',
  accepts: PIXEL_ACCEPTS,
  defaultOptions: defaultPixelOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.pixelate(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name), blob: new Blob([result], { type: 'image/png' }) }];
  },
};
