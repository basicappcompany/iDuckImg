import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { LogoWorkerApi } from './worker';
import { PICTURE_ACCEPTS, defaultLogoOptions, outputName, type LogoOptions } from './options';

const handle = new WorkerHandle<LogoWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const logoTool: ToolDefinition<LogoOptions> = {
  id: 'logo',
  accepts: PICTURE_ACCEPTS,
  defaultOptions: defaultLogoOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (!options.logo) throw new Error('Choose your logo first.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.addLogo(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [{ name: outputName(file.name, format), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
