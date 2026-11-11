import { describe, expect, it } from 'vitest';
import {
  computeSize,
  defaultResizeOptions,
  outputName,
  resolveOutputFormat,
  targetNeedsLossy,
  type ResizeOptions,
} from '../../src/tools/resize/options';

const src = { width: 4000, height: 3000 };
const opts = (patch: Partial<ResizeOptions>): ResizeOptions => ({ ...defaultResizeOptions, ...patch });

describe('computeSize pixels mode', () => {
  it('derives height from width when keeping proportions', () => {
    expect(computeSize(src, opts({ width: 1000, height: null }))).toEqual({ width: 1000, height: 750 });
  });
  it('derives width from height when keeping proportions', () => {
    expect(computeSize(src, opts({ width: null, height: 600 }))).toEqual({ width: 800, height: 600 });
  });
  it('fits inside the box when both are set', () => {
    expect(computeSize(src, opts({ width: 800, height: 800 }))).toEqual({ width: 800, height: 600 });
  });
  it('stretches to the exact size when proportions are off', () => {
    expect(computeSize(src, opts({ width: 500, height: 500, keepAspect: false }))).toEqual({
      width: 500,
      height: 500,
    });
  });
  it('uses the source for a missing side when stretching', () => {
    expect(computeSize(src, opts({ width: 500, height: null, keepAspect: false }))).toEqual({
      width: 500,
      height: 3000,
    });
  });
  it('rejects empty or invalid sizes', () => {
    expect(() => computeSize(src, opts({ width: null, height: null }))).toThrow();
    expect(() => computeSize(src, opts({ width: 0, height: 0 }))).toThrow();
  });
  it('never returns zero', () => {
    expect(computeSize({ width: 10, height: 1000 }, opts({ width: 1, height: null }))).toEqual({
      width: 1,
      height: 100,
    });
    expect(computeSize({ width: 1000, height: 10 }, opts({ width: 1, height: null }))).toEqual({
      width: 1,
      height: 1,
    });
  });
});

describe('computeSize percent mode', () => {
  it('scales both sides', () => {
    expect(computeSize(src, opts({ mode: 'percent', percent: 25 }))).toEqual({ width: 1000, height: 750 });
  });
  it('rejects a zero percentage', () => {
    expect(() => computeSize(src, opts({ mode: 'percent', percent: 0 }))).toThrow();
  });
});

describe('computeSize limits', () => {
  it('refuses output over 100 megapixels', () => {
    expect(() => computeSize(src, opts({ mode: 'percent', percent: 1000 }))).toThrow(/100 megapixels/);
  });
});

describe('resolveOutputFormat', () => {
  it('keeps the format by default', () => {
    expect(resolveOutputFormat('jpeg', opts({}))).toBe('jpeg');
    expect(resolveOutputFormat('png', opts({}))).toBe('png');
  });
  it('turns PNG into WebP when a target size is set', () => {
    expect(resolveOutputFormat('png', opts({ targetKb: 100 }))).toBe('webp');
    expect(resolveOutputFormat('jpeg', opts({ targetKb: 100 }))).toBe('jpeg');
  });
  it('honours an explicit format', () => {
    expect(resolveOutputFormat('png', opts({ format: 'jpeg' }))).toBe('jpeg');
  });
});

describe('targetNeedsLossy', () => {
  it('flags a target with PNG output only', () => {
    expect(targetNeedsLossy(opts({ targetKb: 100 }), 'png')).toBe(true);
    expect(targetNeedsLossy(opts({ targetKb: 100 }), 'webp')).toBe(false);
    expect(targetNeedsLossy(opts({}), 'png')).toBe(false);
  });
});

describe('outputName', () => {
  it('adds -resized and follows the format', () => {
    expect(outputName('photo.jpeg', 'jpeg')).toBe('photo-resized.jpg');
    expect(outputName('shot.png', 'webp')).toBe('shot-resized.webp');
  });
});
