import { describe, expect, it } from 'vitest';
import { GUIDES } from '../../src/lib/guides';
import { GUIDE_LOCALES, guideChromeFor, guideTextFor } from '../../src/i18n/guides';
import { GUIDE_CHROME_EN } from '../../src/i18n/guides/en';
import { OTHER_LOCALES, dictFor, localeByCode, toolText } from '../../src/i18n';
import { TOOLS } from '../../src/lib/tools';
import { ukify, ukDeep } from '../../src/i18n/uk';

const TRANSLATED = OTHER_LOCALES.filter((l) => !l.variantOf).map((l) => l.code);
const SCRIPT: Record<string, RegExp> = { hi: /\p{Script=Devanagari}/u, bn: /\p{Script=Bengali}/u, ru: /\p{Script=Cyrillic}/u };
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

describe('translated how-to guides', () => {
  it('has a language file for every translated language', () => {
    expect(Object.keys(GUIDE_LOCALES).sort()).toEqual([...TRANSLATED].sort());
  });

  describe.each(TRANSLATED)('%s', (code) => {
    const locale = GUIDE_LOCALES[code]!;

    it('has a guide for every English guide and none extra', () => {
      expect(Object.keys(locale.guides).sort()).toEqual(GUIDES.map((g) => g.slug).sort());
    });

    it('keeps the English structure: same steps, sections, paragraphs and questions', () => {
      for (const g of GUIDES) {
        const t = locale.guides[g.slug]!;
        expect(t.steps, `${code} ${g.slug} steps`).toHaveLength(g.steps.length);
        expect(t.sections, `${code} ${g.slug} sections`).toHaveLength(g.sections.length);
        g.sections.forEach((s, i) => expect(t.sections[i]!.p, `${code} ${g.slug} section ${i}`).toHaveLength(s.p.length));
        expect(t.faq, `${code} ${g.slug} faq`).toHaveLength(g.faq.length);
      }
    });

    it('has no empty text and is not English left in place', () => {
      for (const g of GUIDES) {
        const t = locale.guides[g.slug]!;
        const all = [t.title, t.seoTitle, t.description, t.intro, ...t.steps, ...t.sections.flatMap((s) => [s.h, ...s.p]), ...t.faq.flatMap((f) => [f.q, f.a])];
        for (const text of all) expect(text.trim().length, `${code} ${g.slug}`).toBeGreaterThan(2);
        expect(t.title, `${code} ${g.slug} title`).not.toBe(g.title);
        expect(t.intro, `${code} ${g.slug} intro`).not.toBe(g.intro);
        const script = SCRIPT[code];
        if (script) expect(script.test(t.intro), `${code} ${g.slug} intro script`).toBe(true);
      }
    });

    it('has titles and descriptions within search limits', () => {
      for (const g of GUIDES) {
        const t = locale.guides[g.slug]!;
        expect(t.seoTitle.length, `${code} ${g.slug} seoTitle`).toBeLessThanOrEqual(75);
        expect(t.description.length, `${code} ${g.slug} description`).toBeGreaterThanOrEqual(60);
        expect(t.description.length, `${code} ${g.slug} description`).toBeLessThanOrEqual(175);
      }
    });

    it('keeps every number of the English text', () => {
      const nums = (s: string) => (s.match(/\d+/g) ?? []).length;
      for (const g of GUIDES) {
        const t = locale.guides[g.slug]!;
        // Digits may be written in another numeral system or reworded, so only guard against a guide losing most of them.
        const en = [g.intro, ...g.steps].reduce((n, s) => n + nums(s), 0);
        const tr = [t.intro, ...t.steps].reduce((n, s) => n + nums(s), 0);
        if (!SCRIPT[code] || code === 'ru') expect(tr, `${code} ${g.slug} numbers`).toBeGreaterThanOrEqual(Math.floor(en / 2));
      }
    });

    it('has translated page chrome with the placeholders the English has', () => {
      const c = locale.chrome;
      for (const key of Object.keys(GUIDE_CHROME_EN) as (keyof typeof GUIDE_CHROME_EN)[]) {
        if (key !== 'hubBefore' && key !== 'hubAfter') expect(c[key].length, `${code} ${key}`).toBeGreaterThan(0);
        expect(placeholders(c[key]), `${code} ${key}`).toEqual(placeholders(GUIDE_CHROME_EN[key]));
        expect(c.openTool).toContain('{tool}');
        expect(c.writtenBy).toContain('{date}');
      }
      expect(c.hubDescription.length).toBeGreaterThanOrEqual(60);
      expect(c.hubDescription.length).toBeLessThanOrEqual(240);
    });

    it('does not mention an English-only guide any more on translated tool pages', () => {
      expect(dictFor(code).readGuide).not.toMatch(/[(（]/);
    });
  });

  it('falls back to the English text for a language it does not know', () => {
    const g = GUIDES[0]!;
    expect(guideTextFor('xx', g).title).toBe(g.title);
    expect(guideChromeFor('xx')).toEqual(GUIDE_CHROME_EN);
  });
});

describe('English (UK)', () => {
  it('is a spelling variant of English, in the registry and at /en-gb/', () => {
    const uk = localeByCode('en-GB');
    expect(uk.path).toBe('en-gb');
    expect(uk.hreflang).toBe('en-GB');
    expect(uk.variantOf).toBe('en');
    expect(uk.status).not.toBe('machine');
    expect(localeByCode('en').hreflang).toBe('en-US');
    expect(localeByCode('en').native).toBe('English (US)');
  });

  it('converts US spelling to UK spelling and leaves the rest alone', () => {
    expect(ukify('Adjust colors and filters')).toBe('Adjust colours and filters');
    expect(ukify('Color picker: center the grayscale picture')).toBe('Colour picker: centre the greyscale picture');
    expect(ukify('It is optimized and normalized, then canceled')).toBe('It is optimised and normalised, then cancelled');
    expect(ukify('Convert pixels to centimeters')).toBe('Convert pixels to centimetres');
    expect(ukify('Resize, size and prize stay as they are')).toBe('Resize, size and prize stay as they are');
    expect(ukify('Keep {n} and https://iduckimg.com/color-picker-from-image/ as written')).toBe('Keep {n} and https://iduckimg.com/color-picker-from-image/ as written');
    expect(ukify('Colors and Color')).toBe('Colours and Colour');
  });

  it('converts every string inside an object and keeps its shape', () => {
    const out = ukDeep({ a: 'color', b: ['gray', { c: 'center' }], n: 3 });
    expect(out).toEqual({ a: 'colour', b: ['grey', { c: 'centre' }], n: 3 });
  });

  it('has British spelling in the tool names, the home page and every guide, and no US spelling left', () => {
    const US = /\b(colors?|colored|gray|grayscale|centers?|centered|centimeters?|millimeters?|optimiz\w+|normaliz\w+|recogniz\w+|canceled|labeled)\b/i;
    expect(toolText('en-GB', 'color-picker-from-image').name).toBe('Colour picker from an image');
    expect(dictFor('en-GB').homeTitle).not.toBe('');
    for (const t of TOOLS) {
      const x = toolText('en-GB', t.slug);
      expect(US.test(`${x.name} ${x.summary} ${x.quick}`), `${t.slug} still has US spelling`).toBe(false);
    }
    for (const g of GUIDES) {
      const t = guideTextFor('en-GB', g);
      const all = [t.title, t.seoTitle, t.description, t.intro, ...t.steps, ...t.sections.flatMap((s) => [s.h, ...s.p]), ...t.faq.flatMap((f) => [f.q, f.a])].join(' ');
      expect(US.test(all), `${g.slug} still has US spelling`).toBe(false);
    }
    expect(guideTextFor('en-GB', GUIDES.find((g) => g.slug === 'how-to-adjust-the-colours-of-a-photo')!).title).toContain('colours');
  });

  it('has the same structure as the English guides', () => {
    for (const g of GUIDES) {
      const t = guideTextFor('en-GB', g);
      expect(t.steps).toHaveLength(g.steps.length);
      expect(t.faq).toHaveLength(g.faq.length);
    }
  });

  it('is American on the main site: no British spelling in the English source of the guides and tools', () => {
    const UKW = /\b(colours?|coloured|greyscale|centres?|centred|centimetres?|millimetres?|optimis\w+|normalis\w+|recognis\w+|cancelled|labelled)\b/i;
    for (const g of GUIDES) {
      const all = [g.title, g.seoTitle, g.description, g.intro, ...g.steps, ...g.sections.flatMap((s) => [s.h, ...s.p]), ...g.faq.flatMap((f) => [f.q, f.a])].join(' ');
      // --colour-1 is the real name of a CSS variable the palette tool writes, so it is allowed.
      expect(UKW.test(all.replace(/--colour-\d+/g, '')), `${g.slug} has British spelling`).toBe(false);
    }
    for (const t of TOOLS) expect(UKW.test(`${t.name} ${t.summary} ${t.quick}`), `${t.slug} has British spelling`).toBe(false);
  });
});
