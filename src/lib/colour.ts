/** Colour maths for the colour picker and the palette tool. Pure, so it is tested without a browser. */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  /** 0 to 359. */
  h: number;
  /** 0 to 100. */
  s: number;
  /** 0 to 100. */
  l: number;
}

const byte = (n: number) => Math.min(255, Math.max(0, Math.round(Number.isFinite(n) ? n : 0)));
const hex2 = (n: number) => byte(n).toString(16).padStart(2, '0');

/** (255, 170, 0) -> "#ffaa00" */
export function rgbToHex({ r, g, b }: Rgb): string {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
}

/** "#fa0", "FFAA00" or "#ffaa00" -> a colour; anything else is null. */
export function hexToRgb(text: string): Rgb | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text.trim());
  if (!m) return null;
  const h = m[1]!.length === 3 ? [...m[1]!].map((c) => c + c).join('') : m[1]!;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = byte(r) / 255;
  const gn = byte(g) / 255;
  const bn = byte(b) / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
  else if (max === gn) h = ((bn - rn) / d + 2) * 60;
  else h = ((rn - gn) / d + 4) * 60;
  return { h: Math.round(h) % 360, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export const formatRgb = ({ r, g, b }: Rgb): string => `rgb(${byte(r)}, ${byte(g)}, ${byte(b)})`;
export const formatHsl = ({ h, s, l }: Hsl): string => `hsl(${h}, ${s}%, ${l}%)`;

/** Black or white text, whichever reads better on this colour (WCAG relative luminance). */
export function readableText({ r, g, b }: Rgb): '#000000' | '#ffffff' {
  const lin = (v: number) => {
    const c = byte(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return lum > 0.179 ? '#000000' : '#ffffff';
}
