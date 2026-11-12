import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { AdjustWorkerApi } from './worker';
import { ADJUST_ACCEPTS, defaultAdjustOptions, isUnchanged, outputName, type AdjustOptions } from './options';

const handle = new WorkerHandle<AdjustWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const adjustTool: ToolDefinition<AdjustOptions> = {
  id: 'adjust',
  accepts: ADJUST_ACCEPTS,
  defaultOptions: defaultAdjustOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (isUnchanged(options)) throw new Error('Change a setting first, otherwise the picture would stay the same.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.adjust(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
