import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import type { CompressWorkerApi } from './worker';
import {
  COMPRESS_ACCEPTS,
  clampQuality,
  defaultCompressOptions,
  detectFormat,
  mimeOf,
  outputName,
  shouldKeepOriginal,
  targetFormat,
  type CompressOptions,
} from './options';

const handle = new WorkerHandle<CompressWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const compressTool: ToolDefinition<CompressOptions> = {
  id: 'compress',
  accepts: COMPRESS_ACCEPTS,
  defaultOptions: defaultCompressOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const input = detectFormat(file);
    if (!input) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const output = targetFormat(input, options);
    const buffer = await file.arrayBuffer();

    const result = await handle.call(
      (api) =>
        api.compress(buffer, input, output, clampQuality(options.quality), progressProxy(ctx.onProgress)),
      ctx.signal,
    );

    const keep = shouldKeepOriginal(file.size, result.byteLength, input === output);
    return [
      {
        name: outputName(file.name, output),
        blob: keep ? file.slice(0, file.size, mimeOf(input)) : new Blob([result], { type: mimeOf(output) }),
      },
    ];
  },
};
