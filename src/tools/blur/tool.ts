import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { BlurWorkerApi } from './worker';
import { BLUR_ACCEPTS, defaultBlurOptions, outputName, type BlurOptions } from './options';

const handle = new WorkerHandle<BlurWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const blurTool: ToolDefinition<BlurOptions> = {
  id: 'blur',
  accepts: BLUR_ACCEPTS,
  defaultOptions: defaultBlurOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (options.regions.length === 0) throw new Error('Draw at least one box on the picture first.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.hide(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format, options.effect), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
