import { withExtension } from '../../lib/files';

export type ColourSteps = 'original' | 'retro' | 'few';

export interface PixelOptions {
  /** How many big pixels across the picture (the chunkiness: fewer is chunkier). */
  blocks: number;
  /** 'original' keeps the colours; 'retro' keeps 6 levels per colour; 'few' keeps 3. */
  colours: ColourSteps;
}

export const defaultPixelOptions: PixelOptions = { blocks: 48, colours: 'original' };

export const PIXEL_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const MIN_BLOCKS = 8;
export const MAX_BLOCKS = 200;

const LEVELS: Record<ColourSteps, number> = { original: 256, retro: 6, few: 3 };

export function clampBlocks(n: number): number {
  return Math.min(MAX_BLOCKS, Math.max(MIN_BLOCKS, Math.round(Number.isFinite(n) ? n : MIN_BLOCKS)));
}

/** Side of one big pixel, in picture pixels, for a picture this wide. Never below 1. */
export function blockSize(width: number, blocks: number): number {
  return Math.max(1, Math.round(width / clampBlocks(blocks)));
}

/** Snap one colour value (0 to 255) to `levels` evenly spaced values. */
export function snap(value: number, levels: number): number {
  if (levels >= 256) return value;
  const step = 255 / (levels - 1);
  return Math.round(Math.round(value / step) * step);
}

export interface RawImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/**
 * Average each square block of the picture into one flat colour. The result has the same size as the
 * input, so it can be compared to the original. Transparent pixels count less in the average, and a
 * block that is mostly see-through stays see-through. Pure: no canvas needed.
 */
export function pixelate(src: RawImage, size: number, colours: ColourSteps): Uint8ClampedArray<ArrayBuffer> {
  const { width, height, data } = src;
  const levels = LEVELS[colours];
  const out = new Uint8ClampedArray(new ArrayBuffer(data.length));
  for (let by = 0; by < height; by += size) {
    for (let bx = 0; bx < width; bx += size) {
      const bh = Math.min(size, height - by);
      const bw = Math.min(size, width - bx);
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let y = by; y < by + bh; y++) {
        for (let x = bx; x < bx + bw; x++) {
          const i = (y * width + x) * 4;
          const alpha = data[i + 3]!;
          r += data[i]! * alpha;
          g += data[i + 1]! * alpha;
          b += data[i + 2]! * alpha;
          a += alpha;
        }
      }
      const count = bw * bh;
      const avgA = a / count;
      const rr = a > 0 ? snap(r / a, levels) : 0;
      const gg = a > 0 ? snap(g / a, levels) : 0;
      const bb = a > 0 ? snap(b / a, levels) : 0;
      for (let y = by; y < by + bh; y++) {
        for (let x = bx; x < bx + bw; x++) {
          const i = (y * width + x) * 4;
          out[i] = rr;
          out[i + 1] = gg;
          out[i + 2] = bb;
          out[i + 3] = Math.round(avgA);
        }
      }
    }
  }
  return out;
}

/** The result is a PNG: JPG would blur the sharp edges of the big pixels. */
export function outputName(inputName: string): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-pixel`, 'png');
}
