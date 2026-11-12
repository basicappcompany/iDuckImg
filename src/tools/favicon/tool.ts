import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat } from '../image-format';
import type { FaviconWorkerApi } from './worker';
import { FAVICON_ACCEPTS, defaultFaviconOptions, type FaviconOptions } from './options';

const handle = new WorkerHandle<FaviconWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const faviconTool: ToolDefinition<FaviconOptions> = {
  id: 'favicon',
  accepts: FAVICON_ACCEPTS,
  defaultOptions: defaultFaviconOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const files = await handle.call((api) => api.make(buffer, format, options, progressProxy(ctx.onProgress)), ctx.signal);
    return files.map((f) => ({ name: f.name, blob: new Blob([f.bytes], { type: f.type }) }));
  },
};
