import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat } from '../image-format';
import type { ShapeWorkerApi } from './worker';
import { SHAPE_ACCEPTS, defaultShapeOptions, outputName, type ShapeOptions } from './options';

const handle = new WorkerHandle<ShapeWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const shapeTool: ToolDefinition<ShapeOptions> = {
  id: 'shape',
  accepts: SHAPE_ACCEPTS,
  defaultOptions: defaultShapeOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.shape(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, options.shape), blob: new Blob([result], { type: 'image/png' }) }];
  },
};
