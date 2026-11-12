import { existsSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { COMMUNITY, NOINDEX_PATHS, OTHER_PAGES, communityPath } from '../../src/lib/community';
import { PLAN } from '../../src/lib/tool-plan';
import { TOOLS } from '../../src/lib/tools';

describe('COMMUNITY', () => {
  it('has unique slugs and a page file for each one, so the sidebar never links to a 404', () => {
    const slugs = COMMUNITY.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(existsSync(`src/pages/${slug}.astro`), slug).toBe(true);
  });

  it('does not clash with a tool slug', () => {
    const tools = new Set(TOOLS.map((t) => t.slug));
    for (const p of COMMUNITY) expect(tools.has(p.slug), p.slug).toBe(false);
  });

  it('accounts for every page that is neither a tool nor the home or 404 page', () => {
    const known = new Set([...TOOLS.map((t) => t.slug), ...COMMUNITY.map((p) => p.slug), ...OTHER_PAGES]);
    const pages = readdirSync('src/pages').filter((f) => f.endsWith('.astro')).map((f) => f.replace('.astro', ''));
    expect(pages.filter((p) => !known.has(p))).toEqual([]);
  });

  it('keeps forms and settings out of search results, and the useful pages in', () => {
    expect(NOINDEX_PATHS).toEqual(['/request/', '/feedback/', '/settings/', '/chat/']);
    expect(COMMUNITY.filter((p) => p.indexable).map((p) => p.slug)).toEqual(['roadmap', 'support', 'about']);
    expect(communityPath('about')).toBe('/about/');
  });
});

describe('the roadmap promises nothing it cannot keep', () => {
  it('has no dates and no launch wording in any planned tool', () => {
    for (const p of PLAN) {
      expect(`${p.title} ${p.summary}`).not.toMatch(/(20dd|Q[1-4]|next week|next month|coming soon|will launch)/i);
    }
  });

  it('never lists a live tool as something coming', () => {
    const live = new Set(TOOLS.map((t) => t.slug));
    for (const p of PLAN) expect(p.status === 'live', p.id).toBe(live.has(p.id));
  });
});
