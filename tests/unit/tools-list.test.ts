import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TOOLS, otherTools, toolPath } from '../../src/lib/tools';

describe('TOOLS', () => {
  it('has unique slugs and non-empty text', () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const t of TOOLS) {
      expect(t.name.length).toBeGreaterThan(0);
      expect(t.summary.length).toBeGreaterThan(0);
    }
  });

  it('points only at pages that exist, so the homepage never links to a 404', () => {
    for (const t of TOOLS) expect(existsSync(`src/pages/${t.slug}.astro`), t.slug).toBe(true);
  });

  it('covers every tool page (a new page must be added to the list)', async () => {
    const { readdirSync } = await import('node:fs');
    const { COMMUNITY, OTHER_PAGES } = await import('../../src/lib/community');
    const notTools = new Set([...OTHER_PAGES, ...COMMUNITY.map((c) => c.slug)]);
    const pages = readdirSync('src/pages')
      .filter((f) => f.endsWith('.astro'))
      .map((f) => f.replace('.astro', ''))
      // The home page, the 404 page and the community pages are not tools.
      .filter((name) => !notTools.has(name))
      .sort();
    expect(TOOLS.map((t) => t.slug).sort()).toEqual(pages);
  });
});

describe('otherTools', () => {
  it('leaves out the current page, with or without a trailing slash', () => {
    expect(otherTools('/compress-image/').some((t) => t.slug === 'compress-image')).toBe(false);
    expect(otherTools('/compress-image').some((t) => t.slug === 'compress-image')).toBe(false);
    expect(otherTools('/compress-image/')).toHaveLength(TOOLS.length - 1);
  });
  it('returns everything for an unknown path', () => {
    expect(otherTools('/')).toHaveLength(TOOLS.length);
  });
});

describe('toolPath', () => {
  it('builds a trailing-slash path', () => {
    expect(toolPath('resize-image')).toBe('/resize-image/');
  });
});
