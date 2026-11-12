import { describe, expect, it } from 'vitest';
import { QUICK_SLUGS, quickTools } from '../../src/lib/quick';

describe('quick tools', () => {
  it('lists only pages that exist, once each, so the sidebar never links to a 404', () => {
    expect(new Set(QUICK_SLUGS).size).toBe(QUICK_SLUGS.length);
    expect(quickTools().map((q) => q.slug)).toEqual([...QUICK_SLUGS]);
    for (const q of quickTools()) {
      expect(q.href).toBe(`/${q.slug}/`);
      expect(q.name.length).toBeGreaterThan(0);
    }
  });
});
