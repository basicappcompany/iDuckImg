import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type Effect = 'blur' | 'pixelate' | 'cover';
export type CoverColour = 'black' | 'white';

/** A box on the picture. All four numbers are fractions of the picture (0 to 1), so one box fits any size. */
export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BlurOptions {
  regions: Region[];
  effect: Effect;
  /** 1 to 100: how strong the blur or how big the pixel blocks are. Ignored by 'cover'. */
  strength: number;
  cover: CoverColour;
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultBlurOptions: BlurOptions = {
  regions: [],
  effect: 'blur',
  strength: 70,
  cover: 'black',
  quality: 92,
};

export const BLUR_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const MAX_REGIONS = 20;
/** Smallest box, as a fraction of the picture, so a stray click does not make an invisible one. */
export const MIN_FRACTION = 0.01;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));

/** Keep a box inside the picture and above the minimum size. */
export function clampRegion(r: Region): Region {
  const width = clamp(r.width, MIN_FRACTION, 1);
  const height = clamp(r.height, MIN_FRACTION, 1);
  return { width, height, x: clamp(r.x, 0, 1 - width), y: clamp(r.y, 0, 1 - height) };
}

/** A box from two corners, in any order, for dragging on the picture. */
export function regionFromCorners(ax: number, ay: number, bx: number, by: number): Region {
  return clampRegion({
    x: Math.min(ax, bx),
    y: Math.min(ay, by),
    width: Math.abs(bx - ax),
    height: Math.abs(by - ay),
  });
}

export interface PixelRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** The box in whole pixels of a width x height picture: inside it, at least one pixel big. */
export function regionToPixels(r: Region, width: number, height: number): PixelRect {
  const x = clamp(Math.round(r.x * width), 0, width - 1);
  const y = clamp(Math.round(r.y * height), 0, height - 1);
  return {
    x,
    y,
    width: clamp(Math.round(r.width * width), 1, width - x),
    height: clamp(Math.round(r.height * height), 1, height - y),
  };
}

export interface RawImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/** Block size for pixelate, from the strength and the box. Always at least 2 so something visibly changes. */
export function pixelBlock(strength: number, rect: PixelRect): number {
  const longest = Math.max(rect.width, rect.height);
  return Math.max(2, Math.round((clamp(strength, 1, 100) / 100) * (longest / 3)));
}

/** Blur radius from the strength and the box. */
export function blurRadius(strength: number, rect: PixelRect): number {
  const short = Math.min(rect.width, rect.height);
  return Math.max(2, Math.round((clamp(strength, 1, 100) / 100) * (short / 2)));
}

/** One pass of a box blur along rows (horizontal) or columns, edge pixels repeated, inside the rect only. */
function boxPass(data: Uint8ClampedArray, stride: number, rect: PixelRect, radius: number, horizontal: boolean): void {
  const length = horizontal ? rect.width : rect.height;
  const lines = horizontal ? rect.height : rect.width;
  const size = radius * 2 + 1;
  const line = new Float32Array(length * 4);
  const index = (i: number, l: number) => {
    const x = rect.x + (horizontal ? i : l);
    const y = rect.y + (horizontal ? l : i);
    return (y * stride + x) * 4;
  };
  for (let l = 0; l < lines; l++) {
    for (let i = 0; i < length; i++) line.set(data.subarray(index(i, l), index(i, l) + 4), i * 4);
    for (let ch = 0; ch < 4; ch++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) sum += line[Math.min(length - 1, Math.max(0, k)) * 4 + ch]!;
      for (let i = 0; i < length; i++) {
        data[index(i, l) + ch] = Math.round(sum / size);
        const out = Math.max(0, i - radius) * 4 + ch;
        const inn = Math.min(length - 1, i + radius + 1) * 4 + ch;
        sum += line[inn]! - line[out]!;
      }
    }
  }
}

/**
 * Change one box of the picture in place. Pure: no canvas. Blur runs three box passes each way,
 * which looks like a smooth blur; pixelate averages square blocks; cover paints a solid colour.
 * Only blur and pixelate with a strong setting hide small text; "cover" hides everything.
 */
export function applyEffect(img: RawImage, rect: PixelRect, effect: Effect, strength: number, cover: CoverColour): void {
  const { data, width } = img;
  if (effect === 'cover') {
    const v = cover === 'white' ? 255 : 0;
    for (let y = rect.y; y < rect.y + rect.height; y++) {
      for (let x = rect.x; x < rect.x + rect.width; x++) {
        const i = (y * width + x) * 4;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
    }
    return;
  }
  if (effect === 'pixelate') {
    const size = pixelBlock(strength, rect);
    for (let by = rect.y; by < rect.y + rect.height; by += size) {
      for (let bx = rect.x; bx < rect.x + rect.width; bx += size) {
        const bw = Math.min(size, rect.x + rect.width - bx);
        const bh = Math.min(size, rect.y + rect.height - by);
        const sum = [0, 0, 0, 0];
        for (let y = by; y < by + bh; y++) {
          for (let x = bx; x < bx + bw; x++) {
            const i = (y * width + x) * 4;
            for (let c = 0; c < 4; c++) sum[c]! += data[i + c]!;
          }
        }
        const n = bw * bh;
        for (let y = by; y < by + bh; y++) {
          for (let x = bx; x < bx + bw; x++) {
            const i = (y * width + x) * 4;
            for (let c = 0; c < 4; c++) data[i + c] = Math.round(sum[c]! / n);
          }
        }
      }
    }
    return;
  }
  const radius = blurRadius(strength, rect);
  for (let pass = 0; pass < 3; pass++) {
    boxPass(data, width, rect, radius, true);
    boxPass(data, width, rect, radius, false);
  }
}

/** photo.jpg -> photo-blurred.jpg (or -hidden when everything is covered). */
export function outputName(inputName: string, format: ImageFormat, effect: Effect): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-${effect === 'cover' ? 'hidden' : effect === 'pixelate' ? 'pixelated' : 'blurred'}`, extensionOf(format));
}
