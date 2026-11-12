import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type AdjustFilter = 'none' | 'grayscale' | 'sepia' | 'invert';

export interface AdjustOptions {
  /** -100 to 100. 0 changes nothing. */
  brightness: number;
  /** -100 to 100. */
  contrast: number;
  /** -100 (grey) to 100 (twice as colourful). */
  saturation: number;
  filter: AdjustFilter;
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultAdjustOptions: AdjustOptions = { brightness: 0, contrast: 0, saturation: 0, filter: 'none', quality: 92 };

export const ADJUST_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const FILTERS: { id: AdjustFilter; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'grayscale', label: 'Black and white' },
  { id: 'sepia', label: 'Sepia (old photo)' },
  { id: 'invert', label: 'Invert (negative)' },
];

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : 0));
const byte = (n: number) => (n < 0 ? 0 : n > 255 ? 255 : Math.round(n));

/** True when the settings would leave the picture exactly as it is. */
export function isUnchanged(o: AdjustOptions): boolean {
  return o.brightness === 0 && o.contrast === 0 && o.saturation === 0 && o.filter === 'none';
}

export interface RawImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/**
 * Brightness and contrast, then saturation, then the filter. Returns a new pixel array and leaves the
 * input alone. Transparency is never touched. Pure, so the preview and the saved file use the same
 * maths and tests need no canvas.
 */
export function adjustPixels(src: RawImage, o: AdjustOptions): Uint8ClampedArray<ArrayBuffer> {
  const out = new Uint8ClampedArray(new ArrayBuffer(src.data.length));
  out.set(src.data);
  if (isUnchanged(o)) return out;

  const add = clamp(o.brightness, -100, 100) * 2.55;
  const c = clamp(o.contrast, -100, 100) * 2.55;
  const factor = (259 * (c + 255)) / (255 * (259 - c));
  // One table for brightness and contrast, so each channel is a lookup.
  const lut = new Uint8ClampedArray(256);
  for (let v = 0; v < 256; v++) lut[v] = byte(factor * (v + add - 128) + 128);
  const sat = 1 + clamp(o.saturation, -100, 100) / 100;

  for (let i = 0; i < out.length; i += 4) {
    let r = lut[out[i]!]!;
    let g = lut[out[i + 1]!]!;
    let b = lut[out[i + 2]!]!;
    if (sat !== 1) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = byte(gray + (r - gray) * sat);
      g = byte(gray + (g - gray) * sat);
      b = byte(gray + (b - gray) * sat);
    }
    if (o.filter === 'grayscale') {
      r = g = b = byte(0.299 * r + 0.587 * g + 0.114 * b);
    } else if (o.filter === 'sepia') {
      const nr = 0.393 * r + 0.769 * g + 0.189 * b;
      const ng = 0.349 * r + 0.686 * g + 0.168 * b;
      const nb = 0.272 * r + 0.534 * g + 0.131 * b;
      r = byte(nr);
      g = byte(ng);
      b = byte(nb);
    } else if (o.filter === 'invert') {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
    }
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
  }
  return out;
}

/** photo.jpg -> photo-edited.jpg */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-edited`, extensionOf(format));
}
