import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export interface GridOptions {
  rows: number;
  cols: number;
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultGridOptions: GridOptions = { rows: 3, cols: 3, quality: 92 };

export const GRID_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const MAX_SIDE = 10;

export function clampCount(n: number): number {
  return Math.min(MAX_SIDE, Math.max(1, Math.round(Number.isFinite(n) ? n : 1)));
}

export interface TileRect {
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Cut a width x height picture into rows x cols tiles, row by row. Edges are rounded from the exact
 * fractions, so tiles differ by at most one pixel and together they cover every pixel once.
 */
export function tileRects(width: number, height: number, rows: number, cols: number): TileRect[] {
  const r = clampCount(rows);
  const c = clampCount(cols);
  const xs = Array.from({ length: c + 1 }, (_, i) => Math.round((i * width) / c));
  const ys = Array.from({ length: r + 1 }, (_, i) => Math.round((i * height) / r));
  const tiles: TileRect[] = [];
  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      tiles.push({
        row: row + 1,
        col: col + 1,
        x: xs[col]!,
        y: ys[row]!,
        width: Math.max(1, xs[col + 1]! - xs[col]!),
        height: Math.max(1, ys[row + 1]! - ys[row]!),
      });
    }
  }
  return tiles;
}

/** photo.jpg, row 2 column 3 -> photo-r2-c3.jpg */
export function tileName(inputName: string, tile: Pick<TileRect, 'row' | 'col'>, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-r${tile.row}-c${tile.col}`, extensionOf(format));
}
