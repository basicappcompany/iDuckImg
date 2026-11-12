import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectFormat, mimeOf } from '../image-format';
import type { GridWorkerApi } from './worker';
import { GRID_ACCEPTS, defaultGridOptions, tileName, type GridOptions } from './options';

const handle = new WorkerHandle<GridWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const gridTool: ToolDefinition<GridOptions> = {
  id: 'grid',
  accepts: GRID_ACCEPTS,
  defaultOptions: defaultGridOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    if (options.rows * options.cols < 2) throw new Error('Choose at least 2 tiles: more than one row or column.');
    const buffer = await file.arrayBuffer();
    const tiles = await handle.call(
      (api) => api.split(buffer, format, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return tiles.map((t) => ({ name: tileName(file.name, t, format), blob: new Blob([t.bytes], { type: mimeOf(format) }) }));
  },
};
