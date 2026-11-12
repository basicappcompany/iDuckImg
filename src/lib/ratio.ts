/** Aspect ratio maths for the calculator page. Pure, so it is tested without a browser. */

export interface Ratio {
  w: number;
  h: number;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x;
}

/** 1920 x 1080 -> 16:9. Needs whole, positive numbers; anything else is null. */
export function simplifyRatio(width: number, height: number): Ratio | null {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) return null;
  const g = gcd(width, height);
  return { w: width / g, h: height / g };
}

export const COMMON_RATIOS: { label: string; w: number; h: number; use: string }[] = [
  { label: '1:1', w: 1, h: 1, use: 'square, profile pictures' },
  { label: '4:3', w: 4, h: 3, use: 'older screens, many cameras' },
  { label: '3:2', w: 3, h: 2, use: 'SLR cameras, 4 x 6 in prints' },
  { label: '16:9', w: 16, h: 9, use: 'video, most screens, YouTube' },
  { label: '16:10', w: 16, h: 10, use: 'laptop screens' },
  { label: '21:9', w: 21, h: 9, use: 'ultrawide screens, film' },
  { label: '5:4', w: 5, h: 4, use: '8 x 10 in prints' },
  { label: '4:5', w: 4, h: 5, use: 'Instagram portrait' },
  { label: '3:4', w: 3, h: 4, use: 'portrait photos' },
  { label: '2:3', w: 2, h: 3, use: 'portrait prints' },
  { label: '9:16', w: 9, h: 16, use: 'stories, Reels, TikTok' },
];

/** The common ratio this shape is within `tolerance` (a share, 0.01 = 1%) of, or null. */
export function nearestCommon(width: number, height: number, tolerance = 0.01): (typeof COMMON_RATIOS)[number] | null {
  if (!(width > 0 && height > 0)) return null;
  const value = width / height;
  let best: (typeof COMMON_RATIOS)[number] | null = null;
  let bestError = Infinity;
  for (const r of COMMON_RATIOS) {
    const error = Math.abs(value - r.w / r.h) / (r.w / r.h);
    if (error <= tolerance && error < bestError) {
      best = r;
      bestError = error;
    }
  }
  return best;
}

/**
 * "16:9", "16/9", "16 x 9" or "1.91:1" -> a ratio. Decimals are allowed on either side. Anything
 * else, or a zero side, is null.
 */
export function parseRatio(text: string): Ratio | null {
  const m = /^\s*([0-9]*\.?[0-9]+)\s*(?:[:/x×]|\s)\s*([0-9]*\.?[0-9]+)\s*$/i.exec(text);
  if (!m) return null;
  const w = Number(m[1]);
  const h = Number(m[2]);
  return w > 0 && h > 0 ? { w, h } : null;
}

/** The height that keeps `ratio` for this width, rounded to whole pixels. */
export function heightFor(width: number, ratio: Ratio): number {
  return Math.round((width * ratio.h) / ratio.w);
}

/** The width that keeps `ratio` for this height, rounded to whole pixels. */
export function widthFor(height: number, ratio: Ratio): number {
  return Math.round((height * ratio.w) / ratio.h);
}
