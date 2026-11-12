import { describe, expect, it } from 'vitest';
import { LANDING_PAGES } from '../../src/lib/landing';
import { TOOLS } from '../../src/lib/tools';
import { COMMUNITY } from '../../src/lib/community';
import { breadcrumbLd, faqLd, howToLd, serialize, webApplicationLd } from '../../src/lib/seo';
import { computeSize, defaultResizeOptions, type ResizeOptions } from '../../src/tools/resize/options';

const known = new Set<string>([...TOOLS.map((t) => t.slug), ...LANDING_PAGES.map((p) => p.slug)]);
const reserved = new Set<string>([...COMMUNITY.map((c) => c.slug), 'privacy', 'terms', 'image-tools', 'llms.txt', '404']);

describe('landing pages', () => {
  it('have unique slugs that never clash with a tool or another page', () => {
    const slugs = LANDING_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(TOOLS.some((t) => t.slug === slug)).toBe(false);
      expect(reserved.has(slug)).toBe(false);
    }
  });

  it('each has real, distinct content', () => {
    const quicks = new Set<string>();
    for (const p of LANDING_PAGES) {
      expect(p.title.length).toBeLessThanOrEqual(60);
      expect(p.description.length).toBeGreaterThan(60);
      expect(p.description.length).toBeLessThanOrEqual(160);
      expect(p.quick).toMatch(/^To /);
      expect(p.steps.length).toBeGreaterThanOrEqual(3);
      expect(p.notes.length).toBeGreaterThanOrEqual(1);
      expect(p.faqs.length).toBeGreaterThanOrEqual(2);
      quicks.add(p.quick);
    }
    expect(quicks.size).toBe(LANDING_PAGES.length);
  });

  it('only link to pages that exist', () => {
    for (const p of LANDING_PAGES) {
      expect(p.related.length).toBeGreaterThan(0);
      for (const slug of p.related) expect(known.has(slug), `${p.slug} -> ${slug}`).toBe(true);
    }
  });

  it('size-target pages set a target and keep the picture size', () => {
    for (const p of LANDING_PAGES.filter((x) => x.engine === 'resize')) {
      const o = { ...defaultResizeOptions, ...p.initial } as ResizeOptions;
      expect(o.targetKb).toBe(Number(p.slug.match(/(\d+)kb$/)![1]));
      expect(computeSize({ width: 4000, height: 3000 }, o)).toEqual({ width: 4000, height: 3000 });
    }
  });

  it('convert pages name their output format in the page text', () => {
    for (const p of LANDING_PAGES.filter((x) => x.engine === 'convert')) {
      const target = String(p.initial['target']);
      expect(p.slug.endsWith(target === 'jpeg' ? 'jpg' : target)).toBe(true);
    }
  });
});

describe('structured data', () => {
  it('builds valid-looking schema.org objects', () => {
    expect(webApplicationLd('X', '/x/', 'd')).toMatchObject({ '@type': 'WebApplication', url: 'https://iduckimg.com/x/' });
    expect(breadcrumbLd([{ name: 'Home', path: '/' }])).toMatchObject({ itemListElement: [{ position: 1, item: 'https://iduckimg.com/' }] });
    expect(howToLd('n', ['a', 'b'])).toMatchObject({ step: [{ position: 1 }, { position: 2 }] });
    expect(faqLd([{ q: 'q', a: 'a' }])).toMatchObject({ mainEntity: [{ name: 'q' }] });
  });

  it('never lets data close the script tag', () => {
    expect(serialize({ a: '</script><b>' })).not.toContain('</script>');
  });
});
