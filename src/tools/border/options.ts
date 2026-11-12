import { withExtension } from '../../lib/files';
import { MAX_PIXELS } from '../../engine/limits';
import { extensionOf, type ImageFormat } from '../image-format';

export interface BorderOptions {
  /** Border thickness as a percentage of the shorter side, so it looks the same on any picture. */
  thicknessPct: number;
  /** '#rrggbb', or 'transparent' (the result is then a PNG or WebP, never a JPG). */
  colour: string;
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultBorderOptions: BorderOptions = { thicknessPct: 5, colour: '#ffffff', quality: 92 };

export const BORDER_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const MIN_PCT = 1;
export const MAX_PCT = 40;
export const TRANSPARENT = 'transparent';

export const SWATCHES: { label: string; value: string }[] = [
  { label: 'White', value: '#ffffff' },
  { label: 'Black', value: '#000000' },
  { label: 'Yellow', value: '#ffd43b' },
  { label: 'Transparent', value: TRANSPARENT },
];

export function clampPct(n: number): number {
  return Math.min(MAX_PCT, Math.max(MIN_PCT, Math.round(Number.isFinite(n) ? n : MIN_PCT)));
}

/** '#fa0' or 'FFAA00' or '#ffaa00' -> '#ffaa00'. Anything else is null. */
export function parseHex(text: string): string | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text.trim());
  if (!m) return null;
  const h = m[1]!.toLowerCase();
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  return `#${full}`;
}

/** Border thickness in whole pixels for a picture this size. Never below 1. */
export function borderPx(width: number, height: number, pct: number): number {
  return Math.max(1, Math.round((Math.min(width, height) * clampPct(pct)) / 100));
}

export interface BorderedSize {
  border: number;
  width: number;
  height: number;
}

/** The size of the picture once the border is added on all four sides. */
export function borderedSize(width: number, height: number, pct: number): BorderedSize {
  const border = borderPx(width, height, pct);
  return { border, width: width + 2 * border, height: height + 2 * border };
}

export function tooLarge(size: { width: number; height: number }): boolean {
  return size.width * size.height > MAX_PIXELS;
}

/** A see-through border cannot be saved as a JPG, so a JPG becomes a PNG. */
export function outputFormat(input: ImageFormat, colour: string): ImageFormat {
  return colour === TRANSPARENT && input === 'jpeg' ? 'png' : input;
}

/** photo.jpg -> photo-framed.jpg */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-framed`, extensionOf(format));
}
