import { describe, expect, it } from 'vitest';
import {
  ASPECTS,
  MIN_SIZE,
  clampRect,
  fitRectToAspect,
  fullRect,
  initialRect,
  moveRect,
  resizeRect,
  resolveAspect,
  screenToImageDelta,
  setRectField,
  type Bounds,
  type Handle,
  type Rect,
} from '../../src/tools/crop/geometry';

const B: Bounds = { width: 1000, height: 600 };
const HANDLES: Handle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

/** Every box we produce must be whole pixels, inside the image, and at least the minimum size. */
function expectValid(r: Rect, b: Bounds = B) {
  for (const v of [r.x, r.y, r.width, r.height]) expect(Number.isInteger(v)).toBe(true);
  expect(r.x).toBeGreaterThanOrEqual(0);
  expect(r.y).toBeGreaterThanOrEqual(0);
  expect(r.x + r.width).toBeLessThanOrEqual(b.width);
  expect(r.y + r.height).toBeLessThanOrEqual(b.height);
  expect(r.width).toBeGreaterThanOrEqual(Math.min(MIN_SIZE, b.width));
  expect(r.height).toBeGreaterThanOrEqual(Math.min(MIN_SIZE, b.height));
}

/** Small deterministic generator so failures are reproducible. */
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

describe('clampRect', () => {
  it('rounds and keeps the box inside the image', () => {
    expect(clampRect({ x: -50, y: 580.4, width: 2000, height: 100.6 }, B)).toEqual({
      x: 0,
      y: 499,
      width: 1000,
      height: 101,
    });
  });
  it('enforces the minimum size', () => {
    const r = clampRect({ x: 10, y: 10, width: 1, height: 0 }, B);
    expect([r.width, r.height]).toEqual([MIN_SIZE, MIN_SIZE]);
  });
  it('copes with an image smaller than the minimum size', () => {
    const tiny = { width: 5, height: 9 };
    expectValid(clampRect({ x: 3, y: 3, width: 50, height: 50 }, tiny), tiny);
  });
});

describe('initialRect and fullRect', () => {
  it('starts with the middle 80 percent', () => {
    expect(initialRect(B)).toEqual({ x: 100, y: 60, width: 800, height: 480 });
  });
  it('full is the whole image', () => {
    expect(fullRect(B)).toEqual({ x: 0, y: 0, width: 1000, height: 600 });
  });
});

describe('moveRect', () => {
  const r = { x: 100, y: 100, width: 200, height: 100 };
  it('moves without changing size', () => {
    expect(moveRect(r, 30, -20, B)).toEqual({ x: 130, y: 80, width: 200, height: 100 });
  });
  it('stops at every edge', () => {
    expect(moveRect(r, -999, -999, B)).toMatchObject({ x: 0, y: 0 });
    expect(moveRect(r, 9999, 9999, B)).toMatchObject({ x: 800, y: 500 });
  });
});

describe('fitRectToAspect', () => {
  it('shrinks one side to reach the ratio, around the same centre', () => {
    const out = fitRectToAspect({ x: 100, y: 100, width: 400, height: 200 }, 1, B);
    expect(out).toEqual({ x: 200, y: 100, width: 200, height: 200 });
  });
  it('works for tall boxes too', () => {
    const out = fitRectToAspect({ x: 0, y: 0, width: 200, height: 400 }, 2, B);
    expect(out.width / out.height).toBeCloseTo(2, 1);
    expect(out.width).toBe(200);
  });
});

describe('resizeRect, free', () => {
  const start = { x: 300, y: 200, width: 400, height: 200 };
  it('moves only the edges the handle owns', () => {
    expect(resizeRect(start, 'e', 50, 999, B)).toEqual({ x: 300, y: 200, width: 450, height: 200 });
    expect(resizeRect(start, 'w', -100, 999, B)).toEqual({ x: 200, y: 200, width: 500, height: 200 });
    expect(resizeRect(start, 's', 999, 40, B)).toEqual({ x: 300, y: 200, width: 400, height: 240 });
    expect(resizeRect(start, 'n', 999, -50, B)).toEqual({ x: 300, y: 150, width: 400, height: 250 });
  });
  it('a corner moves two edges', () => {
    expect(resizeRect(start, 'se', 100, 100, B)).toEqual({ x: 300, y: 200, width: 500, height: 300 });
    expect(resizeRect(start, 'nw', -100, -100, B)).toEqual({ x: 200, y: 100, width: 500, height: 300 });
  });
  it('cannot cross the opposite edge or leave the image', () => {
    const r = resizeRect(start, 'e', -9999, 0, B);
    expect(r.width).toBe(MIN_SIZE);
    expect(r.x).toBe(300);
    expect(resizeRect(start, 'se', 9999, 9999, B)).toEqual({ x: 300, y: 200, width: 700, height: 400 });
  });
});

describe('resizeRect, aspect locked', () => {
  const start = { x: 300, y: 200, width: 400, height: 200 }; // ratio 2
  it('a corner keeps the ratio', () => {
    const r = resizeRect(start, 'se', 100, 0, B, 2);
    expect(r.width / r.height).toBeCloseTo(2, 1);
    expect(r).toMatchObject({ x: 300, y: 200 });
    expect(r.width).toBeGreaterThan(400);
  });
  it('the opposite corner stays put', () => {
    const r = resizeRect(start, 'nw', -60, -10, B, 2);
    expect(r.x + r.width).toBe(700);
    expect(r.y + r.height).toBe(400);
  });
  it('an edge grows the other side around the centre', () => {
    const r = resizeRect(start, 'e', 100, 0, B, 2);
    expect(r.width).toBe(500);
    expect(r.height).toBe(250);
    expect(r.y + r.height / 2).toBe(300);
  });
  it('a top or bottom edge grows the width around the centre', () => {
    const r = resizeRect(start, 's', 0, 100, B, 2);
    expect(r.height).toBe(300);
    expect(r.width).toBe(600);
    expect(r.x + r.width / 2).toBe(500);
  });
  it('stops when the image edge is reached, still in ratio', () => {
    const r = resizeRect(start, 'se', 9999, 9999, B, 2);
    expectValid(r);
    expect(Math.abs(r.width / r.height - 2)).toBeLessThan(0.05);
  });
});

describe('resizeRect never produces an invalid box (randomised)', () => {
  it('holds for every handle, ratio and drag, including wild ones', () => {
    const next = rng(42);
    const aspects: (number | null)[] = [null, 1, 4 / 3, 3 / 4, 16 / 9, 9 / 16, 0.8];
    for (let i = 0; i < 4000; i++) {
      const bounds = { width: 50 + Math.floor(next() * 3000), height: 50 + Math.floor(next() * 3000) };
      const aspect = aspects[Math.floor(next() * aspects.length)] ?? null;
      let start = clampRect(
        { x: next() * bounds.width, y: next() * bounds.height, width: next() * bounds.width, height: next() * bounds.height },
        bounds,
      );
      if (aspect) start = fitRectToAspect(start, aspect, bounds);
      const handle = HANDLES[Math.floor(next() * HANDLES.length)]!;
      const dx = (next() - 0.5) * bounds.width * 3;
      const dy = (next() - 0.5) * bounds.height * 3;
      const out = resizeRect(start, handle, dx, dy, bounds, aspect);
      expectValid(out, bounds);
    }
  });

  it('keeps the ratio to within a pixel of rounding whenever there is room', () => {
    const next = rng(7);
    for (let i = 0; i < 2000; i++) {
      const bounds = { width: 800, height: 800 };
      const aspect = [1, 4 / 3, 3 / 4, 16 / 9][Math.floor(next() * 4)]!;
      const start = fitRectToAspect({ x: 200, y: 200, width: 400, height: 400 }, aspect, bounds);
      const handle = (['ne', 'nw', 'se', 'sw'] as Handle[])[Math.floor(next() * 4)]!;
      const out = resizeRect(start, handle, (next() - 0.5) * 100, (next() - 0.5) * 100, bounds, aspect);
      // Rounding each side to a whole pixel can shift the ratio by about 1px of height.
      expect(Math.abs(out.width - out.height * aspect)).toBeLessThanOrEqual(1.5);
    }
  });
});

describe('setRectField', () => {
  const r = { x: 100, y: 100, width: 400, height: 200 };
  it('moves with x and y, clamped', () => {
    expect(setRectField(r, 'x', 50, B)).toMatchObject({ x: 50, width: 400 });
    expect(setRectField(r, 'x', 5000, B)).toMatchObject({ x: 600 });
    expect(setRectField(r, 'y', -5, B)).toMatchObject({ y: 0 });
  });
  it('resizes with width and height, not past the edge', () => {
    expect(setRectField(r, 'width', 300, B)).toMatchObject({ width: 300, height: 200 });
    expect(setRectField(r, 'width', 5000, B)).toMatchObject({ width: 900 });
    expect(setRectField(r, 'height', 5000, B)).toMatchObject({ height: 500 });
  });
  it('keeps the ratio when locked', () => {
    const w = setRectField(r, 'width', 600, B, 2);
    expect([w.width, w.height]).toEqual([600, 300]);
    const h = setRectField(r, 'height', 100, B, 2);
    expect([h.width, h.height]).toEqual([200, 100]);
  });
  it('locked growth stops at the image edge in ratio', () => {
    const out = setRectField({ x: 0, y: 400, width: 200, height: 100 }, 'width', 800, B, 2);
    expectValid(out);
    expect(out.y + out.height).toBeLessThanOrEqual(600);
    expect(Math.abs(out.width / out.height - 2)).toBeLessThan(0.05);
  });
  it('ignores junk', () => {
    expect(setRectField(r, 'width', NaN, B)).toBe(r);
  });
});

describe('aspects', () => {
  it('has unique ids, free first, and resolves the picture ratio', () => {
    expect(new Set(ASPECTS.map((a) => a.id)).size).toBe(ASPECTS.length);
    expect(ASPECTS[0]!.ratio).toBeNull();
    const original = ASPECTS.find((a) => a.id === 'original')!;
    expect(resolveAspect(original, { width: 1200, height: 800 })).toBeCloseTo(1.5, 6);
    expect(resolveAspect(ASPECTS.find((a) => a.id === '1:1')!, B)).toBe(1);
    expect(resolveAspect(ASPECTS[0]!, B)).toBeNull();
  });
});

describe('screenToImageDelta', () => {
  it('scales a screen move to image pixels', () => {
    expect(screenToImageDelta(10, 500, 2000)).toBe(40);
    expect(screenToImageDelta(10, 0, 2000)).toBe(0);
  });
});
