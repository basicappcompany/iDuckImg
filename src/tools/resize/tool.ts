import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { ResizeWorkerApi } from './worker';
import {
  RESIZE_ACCEPTS,
  defaultResizeOptions,
  outputName,
  resolveOutputFormat,
  targetNeedsLossy,
  type ResizeOptions,
} from './options';

const handle = new WorkerHandle<ResizeWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const resizeTool: ToolDefinition<ResizeOptions> = {
  id: 'resize',
  accepts: RESIZE_ACCEPTS,
  defaultOptions: defaultResizeOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const input = detectFormat(file);
    if (!input) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const output = resolveOutputFormat(input, options);
    if (targetNeedsLossy(options, output)) {
      throw new Error('A target size needs JPG or WebP output. PNG is lossless.');
    }
    const buffer = await file.arrayBuffer();

    const result = await handle.call(
      (api) => api.resize(buffer, input, output, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );

    return [
      {
        name: outputName(file.name, output),
        blob: new Blob([result.buffer], { type: mimeOf(output) }),
        width: result.width,
        height: result.height,
      },
    ];
  },
};
