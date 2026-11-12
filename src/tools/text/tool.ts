import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { TextWorkerApi } from './worker';
import { TEXT_ACCEPTS, cleanLines, defaultTextOptions, outputName, type TextOptions } from './options';

const handle = new WorkerHandle<TextWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const textTool: ToolDefinition<TextOptions> = {
  id: 'text',
  accepts: TEXT_ACCEPTS,
  defaultOptions: defaultTextOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (cleanLines(options.text).length === 0) throw new Error('Type the text first.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.addText(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
