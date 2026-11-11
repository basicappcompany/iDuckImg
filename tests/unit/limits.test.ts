import { describe, expect, it } from 'vitest';
import { assessPixels, fitWithinPixels, MAX_PIXELS, WARN_PIXELS } from '../../src/engine/limits';

describe('assessPixels', () => {
  it('classifies by area', () => {
    expect(assessPixels(4000, 3000)).toBe('ok');
    expect(assessPixels(8000, 5000)).toBe('warn');
    expect(assessPixels(12000, 9000)).toBe('too-large');
  });
});

describe('fitWithinPixels', () => {
  it('leaves small images alone and never upscales', () => {
    expect(fitWithinPixels(800, 600)).toEqual({ width: 800, height: 600 });
  });

  it('scales large images under the cap keeping aspect ratio', () => {
    const { width, height } = fitWithinPixels(10000, 8000, WARN_PIXELS);
    expect(width * height).toBeLessThanOrEqual(WARN_PIXELS);
    expect(Math.abs(width / height - 10000 / 8000)).toBeLessThan(0.01);
  });

  it('never returns a zero dimension', () => {
    const { width, height } = fitWithinPixels(MAX_PIXELS * 4, 1, 10);
    expect(width).toBeGreaterThanOrEqual(1);
    expect(height).toBeGreaterThanOrEqual(1);
  });
});
