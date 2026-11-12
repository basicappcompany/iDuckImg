import { describe, expect, it } from 'vitest';
import { shapeGeometry, outputName as shapeName, clampRadiusPct } from '../../src/tools/shape/options';
import { tileRects, tileName, clampCount } from '../../src/tools/grid/options';
import { blockSize, clampBlocks, pixelate, snap } from '../../src/tools/pixel/options';
import { cleanLines, defaultTextOptions, layoutText, outputName as textName, type TextOptions } from '../../src/tools/text/options';

describe('circle and rounded corners', () => {
  it('keeps the middle square for a circle', () => {
    expect(shapeGeometry(1000, 600, { shape: 'circle', radiusPct: 0 })).toEqual({
      outWidth: 600,
      outHeight: 600,
      srcX: 200,
      srcY: 0,
      radius: 300,
    });
    expect(shapeGeometry(400, 900, { shape: 'circle', radiusPct: 0 })).toMatchObject({ outWidth: 400, srcX: 0, srcY: 250 });
  });

  it('keeps the whole picture for rounded corners, sized from the shorter side', () => {
    const g = shapeGeometry(1000, 500, { shape: 'rounded', radiusPct: 20 });
    expect([g.outWidth, g.outHeight, g.srcX, g.srcY, g.radius]).toEqual([1000, 500, 0, 0, 100]);
    expect(clampRadiusPct(200)).toBe(50);
    expect(clampRadiusPct(-3)).toBe(0);
  });

  it('always names the result as a PNG', () => {
    expect(shapeName('me.jpeg', 'circle')).toBe('me-circle.png');
  });
});

describe('grid', () => {
  it('cuts every pixel into exactly one tile, row by row', () => {
    for (const [w, h, r, c] of [
      [1000, 700, 3, 3],
      [101, 53, 4, 7],
      [10, 10, 10, 10],
    ] as const) {
      const tiles = tileRects(w, h, r, c);
      expect(tiles).toHaveLength(r * c);
      expect(tiles.reduce((n, t) => n + t.width * t.height, 0)).toBe(w * h);
      expect(tiles[0]).toMatchObject({ row: 1, col: 1, x: 0, y: 0 });
      const last = tiles[tiles.length - 1]!;
      expect(last.x + last.width).toBe(w);
      expect(last.y + last.height).toBe(h);
      const widths = tiles.slice(0, c).map((t) => t.width);
      expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
    }
  });

  it('limits the counts and names tiles by row and column', () => {
    expect(clampCount(99)).toBe(10);
    expect(clampCount(0)).toBe(1);
    expect(tileName('photo.jpg', { row: 2, col: 3 }, 'jpeg')).toBe('photo-r2-c3.jpg');
  });
});

describe('pixel art', () => {
  const solid = (w: number, h: number, rgba: [number, number, number, number]) => {
    const data = new Uint8ClampedArray(w * h * 4);
    for (let i = 0; i < w * h; i++) data.set(rgba, i * 4);
    return { data, width: w, height: h };
  };

  it('turns each block into one flat colour (the average)', () => {
    // A 4x2 picture: left half black, right half white, in 2x2 blocks, then one block of 4x2.
    const img = solid(4, 2, [0, 0, 0, 255]);
    for (const x of [2, 3]) for (const y of [0, 1]) img.data.set([255, 255, 255, 255], (y * 4 + x) * 4);
    const two = pixelate(img, 2, 'original');
    expect(Array.from(two.slice(0, 4))).toEqual([0, 0, 0, 255]);
    expect(Array.from(two.slice(8, 12))).toEqual([255, 255, 255, 255]);
    const one = pixelate(img, 4, 'original');
    expect(one[0]).toBe(128); // (0 + 255) / 2 rounded
    expect(new Set(Array.from(one).filter((_, i) => i % 4 === 0)).size).toBe(1);
  });

  it('keeps a see-through area see-through', () => {
    const out = pixelate(solid(4, 4, [10, 20, 30, 0]), 2, 'original');
    for (let i = 3; i < out.length; i += 4) expect(out[i]).toBe(0);
  });

  it('limits colours to evenly spaced shades', () => {
    expect(snap(100, 256)).toBe(100);
    expect(new Set([0, 40, 90, 130, 200, 255].map((v) => snap(v, 3)))).toEqual(new Set([0, 128, 255]));
    const out = pixelate(solid(2, 2, [100, 150, 200, 255]), 2, 'few');
    expect([out[0], out[1], out[2]]).toEqual([128, 128, 255]);
  });

  it('sizes blocks from the width, never below one pixel', () => {
    expect(blockSize(960, 48)).toBe(20);
    expect(blockSize(20, 200)).toBe(1);
    expect(clampBlocks(1)).toBe(8);
    expect(clampBlocks(9999)).toBe(200);
  });
});

describe('add text', () => {
  const o = (patch: Partial<TextOptions>): TextOptions => ({ ...defaultTextOptions, text: 'x', ...patch });

  it('keeps at most five tidy lines', () => {
    expect(cleanLines('  hello   world \n\n second \n')).toEqual(['hello world', 'second']);
    expect(cleanLines('1\n2\n3\n4\n5\n6\n7')).toHaveLength(5);
    expect(cleanLines('a'.repeat(200)[0]!.repeat(200))[0]).toHaveLength(60);
    expect(cleanLines('  \n ')).toEqual([]);
  });

  it('anchors the block in the chosen place and scales with the width', () => {
    const l = layoutText(1000, 600, o({ position: 'top-right', sizePct: 5 }));
    expect([l.align, l.anchorY, l.fontPx]).toEqual(['right', 'top', 50]);
    expect(l.x).toBeGreaterThan(500);
    expect(l.y).toBeLessThan(300);
    const c = layoutText(1000, 600, o({ position: 'center' }));
    expect([c.x, c.y, c.align, c.anchorY]).toEqual([500, 300, 'center', 'middle']);
    expect(layoutText(40, 40, o({ sizePct: 2 })).fontPx).toBe(10);
  });

  it('names the result after the input', () => {
    expect(textName('a.png', 'png')).toBe('a-text.png');
  });
});
