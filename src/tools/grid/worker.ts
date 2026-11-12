import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { cropImage } from '../shared/transform';
import { tileRects, type GridOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  /** One encoded file per tile, row by row. */
  async split(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: GridOptions,
    onProgress: (fraction: number) => void,
  ): Promise<{ row: number; col: number; bytes: ArrayBuffer }[]> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    const tiles = tileRects(image.width, image.height, options.rows, options.cols);
    const quality = Math.min(100, Math.max(1, Math.round(options.quality)));
    const out: { row: number; col: number; bytes: ArrayBuffer }[] = [];
    for (const [i, t] of tiles.entries()) {
      const piece = cropImage(image, t.x, t.y, t.width, t.height);
      out.push({ row: t.row, col: t.col, bytes: await encodeImage(piece, format, quality) });
      onProgress(0.1 + (0.9 * (i + 1)) / tiles.length);
    }
    return out;
  },
};

export type GridWorkerApi = typeof api;
Comlink.expose(api);
