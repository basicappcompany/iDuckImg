export type FaviconFit = 'crop' | 'pad';

export interface FaviconOptions {
  /** 'crop' cuts a non-square picture to a square from the middle; 'pad' keeps all of it on a see-through square. */
  fit: FaviconFit;
}

export const defaultFaviconOptions: FaviconOptions = { fit: 'crop' };

export const FAVICON_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

/** The PNG files a site needs, with the size each is drawn at. */
export const FAVICON_PNGS: { name: string; size: number }[] = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

/** Sizes packed into favicon.ico, which older browsers and Windows still ask for. */
export const ICO_SIZES = [16, 32, 48] as const;

/** The largest size we draw; a smaller picture is enlarged to this and looks soft. */
export const LARGEST = 512;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * How to put a picture of width x height on a square of `size`: the part of the picture to take
 * (`from`) and where to draw it (`to`). Crop takes the middle square and fills the whole icon; pad
 * takes everything and centres it, leaving see-through bars. Pure, so it needs no canvas to test.
 */
export function fitSquare(width: number, height: number, size: number, fit: FaviconFit): { from: Rect; to: Rect } {
  if (fit === 'crop') {
    const side = Math.min(width, height);
    return {
      from: { x: Math.round((width - side) / 2), y: Math.round((height - side) / 2), width: side, height: side },
      to: { x: 0, y: 0, width: size, height: size },
    };
  }
  const scale = size / Math.max(width, height);
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  return {
    from: { x: 0, y: 0, width, height },
    to: { x: Math.round((size - w) / 2), y: Math.round((size - h) / 2), width: w, height: h },
  };
}

/** True when the picture is smaller than the biggest icon, so that icon is enlarged. */
export function willEnlarge(width: number, height: number, fit: FaviconFit): boolean {
  const side = fit === 'crop' ? Math.min(width, height) : Math.max(width, height);
  return side < LARGEST;
}

/** What to paste into the <head> of a page. */
export const HEAD_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`;
