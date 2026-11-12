import { describe, expect, it } from 'vitest';
import { QUICK_GROUPS, quickGroups } from '../../src/lib/quick';
import { LANDING_PAGES } from '../../src/lib/landing';
import { TOOLS } from '../../src/lib/tools';

describe('quick tools', () => {
  const all = QUICK_GROUPS.flatMap((g) => g.slugs);

  it('has unique sub-categories, each with items, and lists nothing twice', () => {
    expect(new Set(QUICK_GROUPS.map((g) => g.id)).size).toBe(QUICK_GROUPS.length);
    expect(new Set(all).size).toBe(all.length);
    for (const g of quickGroups()) expect(g.items.length, g.id).toBeGreaterThan(0);
  });

  it('links only to pages that exist, so the sidebar never links to a 404', () => {
    const known = new Set<string>([...TOOLS.map((t) => t.slug), ...LANDING_PAGES.map((p) => p.slug)]);
    for (const slug of all) expect(known.has(slug), slug).toBe(true);
    for (const g of quickGroups()) {
      for (const i of g.items) expect(i.href).toBe(`/${i.slug}/`);
      expect(g.items).toHaveLength(QUICK_GROUPS.find((x) => x.id === g.id)!.slugs.length);
    }
  });

  it('contains every shortcut page, so all the popular jobs are in one place', () => {
    for (const p of LANDING_PAGES) expect(all, p.slug).toContain(p.slug);
  });
});
