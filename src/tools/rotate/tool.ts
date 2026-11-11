import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { RotateWorkerApi } from './worker';
import { ROTATE_ACCEPTS, defaultRotateOptions, outputName, type RotateOptions } from './options';

const handle = new WorkerHandle<RotateWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const rotateTool: ToolDefinition<RotateOptions> = {
  id: 'rotate',
  accepts: ROTATE_ACCEPTS,
  defaultOptions: defaultRotateOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.rotate(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
