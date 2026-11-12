import { rgbToHex, type Rgb } from './colour';

export interface PaletteColour {
  hex: string;
  rgb: Rgb;
  /** Share of the picture's visible pixels, 0 to 1. */
  share: number;
}

export interface PixelData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export const MIN_COLOURS = 2;
export const MAX_COLOURS = 12;
/** Looking at every pixel of a photo adds nothing; this many samples is plenty. */
const MAX_SAMPLES = 40_000;

type Sample = [number, number, number];

function range(box: Sample[], channel: 0 | 1 | 2): number {
  let lo = 255;
  let hi = 0;
  for (const p of box) {
    if (p[channel] < lo) lo = p[channel];
    if (p[channel] > hi) hi = p[channel];
  }
  return hi - lo;
}

/**
 * The main colours of a picture by median cut: keep splitting the group of pixels that spans the
 * widest colour range, at its middle, until there are `count` groups. Each group becomes one colour
 * (its average) with the share of pixels it holds. Mostly see-through pixels are ignored. A picture
 * with fewer distinct colours than asked for returns only the colours it has.
 */
export function extractPalette(img: PixelData, count: number): PaletteColour[] {
  const want = Math.min(MAX_COLOURS, Math.max(MIN_COLOURS, Math.round(Number.isFinite(count) ? count : 6)));
  const total = img.width * img.height;
  const step = Math.max(1, Math.ceil(total / MAX_SAMPLES));
  const samples: Sample[] = [];
  for (let i = 0; i < total; i += step) {
    const o = i * 4;
    if (img.data[o + 3]! < 128) continue;
    samples.push([img.data[o]!, img.data[o + 1]!, img.data[o + 2]!]);
  }
  if (samples.length === 0) return [];

  const boxes: Sample[][] = [samples];
  while (boxes.length < want) {
    // The group that is the most spread out, weighted by how many pixels it holds.
    let best = -1;
    let bestScore = 0;
    boxes.forEach((box, i) => {
      const spread = Math.max(range(box, 0), range(box, 1), range(box, 2));
      const score = spread * box.length;
      if (spread > 0 && score > bestScore) {
        best = i;
        bestScore = score;
      }
    });
    if (best < 0) break; // every group is a single colour
    const box = boxes[best]!;
    const channel = ([0, 1, 2] as const).reduce((a, c) => (range(box, c) > range(box, a) ? c : a), 0 as 0 | 1 | 2);
    box.sort((a, b) => a[channel] - b[channel]);
    // Split where the value changes, as near the middle as possible, so one solid colour is never cut in two.
    const middle = Math.floor(box.length / 2);
    let cut = middle;
    for (let d = 0; d < box.length; d++) {
      const lo = middle - d;
      const hi = middle + d;
      if (lo > 0 && box[lo - 1]![channel] !== box[lo]![channel]) {
        cut = lo;
        break;
      }
      if (hi < box.length && hi > 0 && box[hi - 1]![channel] !== box[hi]![channel]) {
        cut = hi;
        break;
      }
    }
    boxes.splice(best, 1, box.slice(0, cut), box.slice(cut));
  }

  return boxes
    .filter((b) => b.length > 0)
    .map((box) => {
      const sum = box.reduce((acc, p) => [acc[0]! + p[0], acc[1]! + p[1], acc[2]! + p[2]], [0, 0, 0]);
      const rgb = { r: Math.round(sum[0]! / box.length), g: Math.round(sum[1]! / box.length), b: Math.round(sum[2]! / box.length) };
      return { hex: rgbToHex(rgb), rgb, share: box.length / samples.length };
    })
    .sort((a, b) => b.share - a.share);
}

/** One colour per line, for pasting into notes or a design tool. */
export function paletteAsList(colours: readonly PaletteColour[]): string {
  return colours.map((c) => c.hex).join('\n');
}

/** CSS custom properties, one per colour, named by rank. */
export function paletteAsCss(colours: readonly PaletteColour[]): string {
  return `:root {\n${colours.map((c, i) => `  --colour-${i + 1}: ${c.hex};`).join('\n')}\n}`;
}
