import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { BorderWorkerApi } from './worker';
import { BORDER_ACCEPTS, defaultBorderOptions, outputFormat, outputName, type BorderOptions } from './options';

const handle = new WorkerHandle<BorderWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const borderTool: ToolDefinition<BorderOptions> = {
  id: 'border',
  accepts: BORDER_ACCEPTS,
  defaultOptions: defaultBorderOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const input = detectFormat(file);
    if (!input) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const format = outputFormat(input, options.colour);
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.addBorder(buffer, input, format, { ...options }, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
