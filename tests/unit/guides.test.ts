import { describe, expect, it } from 'vitest';
import { GUIDES, guideForSlug, guideForTool, guidePath, guideText } from '../../src/lib/guides';
import { TOOLS } from '../../src/lib/tools';
import { articleLd, collectionLd, howToLd } from '../../src/lib/seo';

const words = (s: string) => s.trim().split(/\s+/).length;

describe('how-to guides', () => {
  it('has one guide for every tool, plus the safety guide', () => {
    for (const t of TOOLS) expect(guideForTool(t.slug), `${t.slug} has no guide`).toBeDefined();
    expect(GUIDES).toHaveLength(TOOLS.length + 1);
    expect(guideForSlug('are-online-image-tools-safe')).toBeDefined();
  });

  it('gives each tool its own guide, not the safety one', () => {
    const owners = GUIDES.filter((g) => g.slug !== 'are-online-image-tools-safe').map((g) => g.tool);
    expect(new Set(owners).size).toBe(owners.length);
  });

  it('has unique, readable slugs', () => {
    const slugs = GUIDES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const g of GUIDES) {
      expect(g.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      if (g.slug !== 'are-online-image-tools-safe') expect(g.slug.startsWith('how-to-'), g.slug).toBe(true);
      expect(guidePath(g.slug)).toBe(`/guides/${g.slug}/`);
    }
  });

  it('keeps titles and descriptions inside search limits', () => {
    for (const g of GUIDES) {
      expect(g.seoTitle.length, g.slug).toBeLessThanOrEqual(60);
      expect(g.seoTitle.length, g.slug).toBeGreaterThan(25);
      expect(g.description.length, g.slug).toBeGreaterThanOrEqual(70);
      expect(g.description.length, g.slug).toBeLessThanOrEqual(160);
    }
    expect(new Set(GUIDES.map((g) => g.seoTitle)).size).toBe(GUIDES.length);
    expect(new Set(GUIDES.map((g) => g.description)).size).toBe(GUIDES.length);
  });

  it('answers first: a short intro that is not copied between guides', () => {
    for (const g of GUIDES) {
      expect(words(g.intro), g.slug).toBeGreaterThanOrEqual(25);
      expect(words(g.intro), g.slug).toBeLessThanOrEqual(60);
    }
    expect(new Set(GUIDES.map((g) => g.intro)).size).toBe(GUIDES.length);
  });

  it('has real content: steps, sections and questions, and enough words to help', () => {
    for (const g of GUIDES) {
      expect(g.steps.length, g.slug).toBeGreaterThanOrEqual(4);
      expect(g.sections.length, g.slug).toBeGreaterThanOrEqual(2);
      for (const s of g.sections) expect(s.p.length, `${g.slug}: ${s.h}`).toBeGreaterThanOrEqual(2);
      expect(g.faq.length, g.slug).toBeGreaterThanOrEqual(3);
      expect(words(guideText(g)), g.slug).toBeGreaterThanOrEqual(300);
    }
  });

  it('links only to guides and tools that exist, and never to itself', () => {
    for (const g of GUIDES) {
      expect(TOOLS.some((t) => t.slug === g.tool), `${g.slug} -> tool ${g.tool}`).toBe(true);
      expect(g.related.length, g.slug).toBeGreaterThanOrEqual(2);
      for (const r of g.related) {
        expect(guideForSlug(r), `${g.slug} -> ${r}`).toBeDefined();
        expect(r).not.toBe(g.slug);
      }
    }
  });

  it('keeps the claims we can check honest', () => {
    const all = GUIDES.map(guideText).join(' ');
    // We do not promise anything about rankings, speed records or "100 percent" safety.
    expect(all).not.toMatch(/100 ?%|guarantee|best in the world|number one|#1/i);
    // The guides say the tools run in the browser; they must never say files are uploaded to us.
    expect(all).not.toMatch(/we upload|uploaded to our/i);
    for (const g of GUIDES) expect(g.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('builds structured data with the guide text', () => {
    const g = GUIDES[0]!;
    const article = articleLd({ headline: g.title, description: g.description, path: guidePath(g.slug), datePublished: g.updated, dateModified: g.updated }) as Record<string, unknown>;
    expect(article['@type']).toBe('Article');
    expect(article['url']).toBe(`https://iduckimg.com${guidePath(g.slug)}`);
    expect((article['author'] as Record<string, string>)['name']).toBe('Basic App Company');
    const how = howToLd(g.title, g.steps) as { step: { text: string }[] };
    expect(how.step.map((s) => s.text)).toEqual(g.steps);
    const list = collectionLd('Guides', '/guides/', 'x', [{ name: 'a', path: '/guides/a/' }]) as { mainEntity: { itemListElement: { position: number; url: string }[] } };
    expect(list.mainEntity.itemListElement[0]).toMatchObject({ position: 1, url: 'https://iduckimg.com/guides/a/' });
  });
});
