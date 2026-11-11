import { describe, expect, it } from 'vitest';
import { findQualityForTarget } from '../../src/lib/quality-search';

/** Fake encoder: size grows linearly with quality. */
const linear = (perQuality: number) => async (q: number) => q * perQuality;

describe('findQualityForTarget', () => {
  it('returns the top quality when it already fits', async () => {
    const r = await findQualityForTarget(linear(10), 10_000);
    expect(r).toEqual({ quality: 95, bytes: 950, met: true });
  });

  it('finds the highest quality under the target', async () => {
    // size = q * 100, target 5030 -> best q is 50
    const r = await findQualityForTarget(linear(100), 5030);
    expect(r.met).toBe(true);
    expect(r.quality).toBe(50);
    expect(r.bytes).toBeLessThanOrEqual(5030);
  });

  it('is monotone: a bigger target never gives lower quality', async () => {
    const small = await findQualityForTarget(linear(100), 3000);
    const large = await findQualityForTarget(linear(100), 8000);
    expect(large.quality).toBeGreaterThanOrEqual(small.quality);
  });

  it('reports met = false when even the minimum is too big', async () => {
    const r = await findQualityForTarget(linear(100), 100);
    expect(r.met).toBe(false);
    expect(r.quality).toBe(5);
  });

  it('uses a bounded number of encodes', async () => {
    let calls = 0;
    await findQualityForTarget(async (q) => (calls++, q * 100), 5030);
    expect(calls).toBeLessThanOrEqual(10);
  });

  it('reports progress between 0 and 1', async () => {
    const steps: number[] = [];
    await findQualityForTarget(linear(100), 5030, { onStep: (f) => steps.push(f) });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps.every((s) => s > 0 && s <= 1)).toBe(true);
  });
});
