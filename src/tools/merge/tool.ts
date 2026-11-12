import { WorkerHandle } from '../../engine/worker-handle';
import type { CombinedToolDefinition, OutputFile } from '../../engine/types';
import { detectInputFormat } from '../image-format';
import type { MergeWorkerApi } from './worker';
import { FORMAT_MIME, MERGE_ACCEPTS, MIN_IMAGES, defaultMergeOptions, outputName, type MergeOptions } from './options';

const handle = new WorkerHandle<MergeWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const mergeTool: CombinedToolDefinition<MergeOptions> = {
  id: 'merge',
  accepts: MERGE_ACCEPTS,
  defaultOptions: defaultMergeOptions,
  async runAll(files, options, ctx): Promise<OutputFile[]> {
    if (files.length < MIN_IMAGES) throw new Error('Add at least two pictures to join.');
    await handle.call((api) => api.begin(), ctx.signal);
    for (const [i, file] of files.entries()) {
      const format = detectInputFormat(file);
      if (!format) throw new Error(`${file.name}: unsupported image type. Use JPG, PNG, WebP or HEIC.`);
      const buffer = await file.arrayBuffer();
      try {
        await handle.call((api) => api.addImage(buffer, format), ctx.signal);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') throw error;
        throw new Error(`${file.name}: ${error instanceof Error ? error.message : 'could not be read'}`);
      }
      ctx.onProgress((i + 1) / (files.length + 1));
    }
    const bytes = await handle.call((api) => api.finish(options), ctx.signal);
    ctx.onProgress(1);
    return [{ name: outputName(options.format), blob: new Blob([bytes], { type: FORMAT_MIME[options.format] }) }];
  },
};
