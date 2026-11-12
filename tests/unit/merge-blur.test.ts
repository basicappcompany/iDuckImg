import { describe, expect, it } from 'vitest';
import { clampGap, layoutMerge, outputName, tooLarge } from '../../src/tools/merge/options';
import {
  applyEffect,
  blurRadius,
  clampRegion,
  outputName as blurName,
  pixelBlock,
  regionFromCorners,
  regionToPixels,
  type RawImage,
} from '../../src/tools/blur/options';

describe('merge layout', () => {
  it('puts pictures in a row at the smallest common height, without stretching any up', () => {
    const l = layoutMerge(
      [
        { width: 400, height: 200 },
        { width: 300, height: 300 },
      ],
      { direction: 'row', gap: 0, match: 'smallest' },
    );
    expect(l.height).toBe(200);
    expect(l.items[0]).toEqual({ x: 0, y: 0, width: 400, height: 200 });
    expect(l.items[1]).toEqual({ x: 400, y: 0, width: 200, height: 200 });
    expect(l.width).toBe(600);
  });

  it('stacks in a column with a gap between', () => {
    const l = layoutMerge(
      [
        { width: 100, height: 50 },
        { width: 200, height: 80 },
        { width: 100, height: 50 },
      ],
      { direction: 'column', gap: 10, match: 'smallest' },
    );
    expect(l.width).toBe(100);
    expect(l.items.map((i) => i.y)).toEqual([0, 60, 60 + 40 + 10]);
    expect(l.items[1]).toMatchObject({ width: 100, height: 40 });
    expect(l.height).toBe(50 + 10 + 40 + 10 + 50);
  });

  it('keeps sizes and centres each picture when matching is off', () => {
    const l = layoutMerge(
      [
        { width: 100, height: 100 },
        { width: 100, height: 40 },
      ],
      { direction: 'row', gap: 5, match: 'none' },
    );
    expect(l.height).toBe(100);
    expect(l.items[1]).toEqual({ x: 105, y: 30, width: 100, height: 40 });
    expect(l.width).toBe(205);
  });

  it('handles empty input, limits the gap and flags a result that is too big', () => {
    expect(layoutMerge([], { direction: 'row', gap: 0, match: 'none' })).toEqual({ width: 0, height: 0, items: [] });
    expect(clampGap(9999)).toBe(200);
    expect(clampGap(-4)).toBe(0);
    expect(tooLarge({ width: 20000, height: 6000, items: [] })).toBe(true);
    expect(tooLarge({ width: 4000, height: 3000, items: [] })).toBe(false);
    expect(outputName('jpeg')).toBe('merged.jpg');
  });
});

const image = (w: number, h: number, fn: (x: number, y: number) => number): RawImage => {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = fn(x, y);
      data.set([v, v, v, 255], (y * w + x) * 4);
    }
  }
  return { data, width: w, height: h };
};
const at = (img: RawImage, x: number, y: number) => img.data[(y * img.width + x) * 4]!;

describe('blur regions', () => {
  it('keeps boxes inside the picture and above the minimum', () => {
    expect(clampRegion({ x: 0.9, y: 0.9, width: 0.5, height: 0.5 })).toEqual({ x: 0.5, y: 0.5, width: 0.5, height: 0.5 });
    expect(clampRegion({ x: 0, y: 0, width: 0, height: 0 }).width).toBe(0.01);
    expect(regionFromCorners(0.8, 0.7, 0.2, 0.1)).toMatchObject({ x: 0.2, y: 0.1 });
    const r = regionFromCorners(0.8, 0.7, 0.2, 0.1);
    expect(r.width).toBeCloseTo(0.6);
    expect(r.height).toBeCloseTo(0.6);
  });

  it('converts to whole pixels inside the picture, at least one pixel', () => {
    expect(regionToPixels({ x: 0.1, y: 0.2, width: 0.5, height: 0.25 }, 200, 100)).toEqual({ x: 20, y: 20, width: 100, height: 25 });
    const edge = regionToPixels({ x: 1, y: 1, width: 0.5, height: 0.5 }, 50, 50);
    expect(edge.x + edge.width).toBeLessThanOrEqual(50);
    expect(edge.width).toBeGreaterThanOrEqual(1);
  });
});

describe('blur effects', () => {
  const stripes = () => image(40, 40, (x) => (x % 2 === 0 ? 0 : 255));
  const rect = { x: 10, y: 10, width: 20, height: 20 };

  it('cover paints the box solid and touches nothing else', () => {
    const img = stripes();
    const before = Uint8ClampedArray.from(img.data);
    applyEffect(img, rect, 'cover', 50, 'black');
    expect(at(img, 15, 15)).toBe(0);
    expect(at(img, 29, 29)).toBe(0);
    for (let i = 0; i < img.data.length; i += 4) {
      const x = (i / 4) % 40;
      const y = Math.floor(i / 4 / 40);
      const inside = x >= 10 && x < 30 && y >= 10 && y < 30;
      if (!inside) expect(img.data[i]).toBe(before[i]);
    }
    const white = stripes();
    applyEffect(white, rect, 'cover', 50, 'white');
    expect(at(white, 15, 15)).toBe(255);
  });

  it('blur smooths a high-contrast box, keeps its average, and leaves the outside alone', () => {
    const img = stripes();
    applyEffect(img, rect, 'blur', 80, 'black');
    // Stripes alternated 0/255 pixel by pixel; after blurring, the middle is nearly uniform grey.
    const middle = [at(img, 18, 18), at(img, 19, 18), at(img, 20, 19), at(img, 21, 20)];
    for (const v of middle) expect(Math.abs(v - 127.5)).toBeLessThan(40);
    expect(at(img, 2, 2)).toBe(0); // outside, x=2 is even -> black
    expect(at(img, 3, 2)).toBe(255);
  });

  it('pixelate makes every block one flat colour', () => {
    const img = image(40, 40, (x, y) => (x * 7 + y * 13) % 256);
    applyEffect(img, rect, 'pixelate', 60, 'black');
    const size = pixelBlock(60, rect);
    expect(size).toBeGreaterThanOrEqual(2);
    const v = at(img, 10, 10);
    for (let y = 10; y < 10 + Math.min(size, 20); y++) for (let x = 10; x < 10 + Math.min(size, 20); x++) expect(at(img, x, y)).toBe(v);
  });

  it('stronger settings use a bigger radius and bigger blocks', () => {
    expect(blurRadius(100, rect)).toBeGreaterThan(blurRadius(10, rect));
    expect(pixelBlock(100, rect)).toBeGreaterThan(pixelBlock(10, rect));
    expect(blurRadius(1, { x: 0, y: 0, width: 4, height: 4 })).toBe(2);
  });

  it('names the result by what was done', () => {
    expect(blurName('a.jpg', 'jpeg', 'blur')).toBe('a-blurred.jpg');
    expect(blurName('a.png', 'png', 'pixelate')).toBe('a-pixelated.png');
    expect(blurName('a.png', 'png', 'cover')).toBe('a-hidden.png');
  });
});
