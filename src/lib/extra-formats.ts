/**
 * BMP, GIF, SVG and AVIF input. The image tools themselves only know JPG, PNG and WebP (plus HEIC in a
 * few), so these four are turned into a PNG the moment a file is dropped. Every tool then sees an
 * ordinary PNG and needs no change. This file is the pure part (detection and sizes); the browser
 * part that draws the PNG is `src/tools/shared/normalize.ts`.
 */

export type ExtraFormat = 'bmp' | 'gif' | 'svg' | 'avif';

/** Accept entries for the file picker. Browsers often report no MIME type for these, so list extensions too. */
export const EXTRA_ACCEPTS = [
  'image/bmp',
  'image/x-ms-bmp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  '.bmp',
  '.gif',
  '.svg',
  '.avif',
] as const;

export const EXTRA_LABELS = 'BMP, GIF, SVG and AVIF';

export function detectExtraFormat(file: { type: string; name: string }): ExtraFormat | null {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (type === 'image/bmp' || type === 'image/x-ms-bmp' || name.endsWith('.bmp')) return 'bmp';
  if (type === 'image/gif' || name.endsWith('.gif')) return 'gif';
  if (type === 'image/svg+xml' || name.endsWith('.svg')) return 'svg';
  if (type === 'image/avif' || name.endsWith('.avif')) return 'avif';
  return null;
}

/** True when the tool takes ordinary pictures, so it should also take the extra formats. */
export function takesPictures(accepts: readonly string[]): boolean {
  return accepts.some((a) => a.toLowerCase() === 'image/png');
}

/** A vector picture has no pixel size of its own, so it is drawn at least this wide or tall... */
export const SVG_MIN_SIDE = 1024;
/** ...and never more than this, which keeps the PNG a sensible size. */
export const SVG_MAX_SIDE = 4096;
/** An SVG over this size is more likely a mistake than a picture. */
export const SVG_MAX_BYTES = 10 * 1024 * 1024;

/** Size to draw an SVG at: its own proportions, with the longer side between the min and the max. */
export function svgRenderSize(width: number, height: number): { width: number; height: number } {
  if (!(width > 0 && height > 0)) return { width: SVG_MIN_SIDE, height: SVG_MIN_SIDE };
  const longest = Math.max(width, height);
  const target = Math.min(SVG_MAX_SIDE, Math.max(SVG_MIN_SIDE, longest));
  const k = target / longest;
  return { width: Math.max(1, Math.round(width * k)), height: Math.max(1, Math.round(height * k)) };
}

/** A number with no unit or with px. Anything else (%, em, mm) is not a pixel size we can trust. */
function pixels(value: string | undefined): number | null {
  if (!value) return null;
  const m = /^\s*([0-9]*\.?[0-9]+)\s*(px)?\s*$/i.exec(value);
  return m ? Number(m[1]) : null;
}

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag)?.slice(2, 4).find((v) => v !== undefined);
}

/** The size an SVG says it has: width and height, else its viewBox, else null. */
export function parseSvgSize(text: string): { width: number; height: number } | null {
  const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
  if (!tag) return null;
  const width = pixels(attr(tag, 'width'));
  const height = pixels(attr(tag, 'height'));
  if (width && height) return { width, height };
  const box = attr(tag, 'viewBox')?.trim().split(/[\s,]+/).map(Number);
  if (box && box.length === 4 && box.every(Number.isFinite) && box[2]! > 0 && box[3]! > 0) {
    // One side given and the other not: keep the viewBox proportions.
    if (width) return { width, height: (width * box[3]!) / box[2]! };
    if (height) return { width: (height * box[2]!) / box[3]!, height };
    return { width: box[2]!, height: box[3]! };
  }
  return null;
}

/** photo.gif -> photo.png */
export function pngName(name: string): string {
  const dot = name.lastIndexOf('.');
  return `${dot > 0 ? name.slice(0, dot) : name}.png`;
}
