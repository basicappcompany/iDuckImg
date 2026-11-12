import { describe, expect, it } from 'vitest';
import { HELPER_TEXT, helperContext, helperText } from '../../src/i18n/helper';
import { HELPER_EN } from '../../src/i18n/helper/en';
import { OTHER_LOCALES } from '../../src/i18n';
import { ENGLISH_CONTEXT, STARTERS, respond } from '../../src/lib/helper';
import { TOOLS } from '../../src/lib/tools';
import { LANDING_PAGES } from '../../src/lib/landing';

const TRANSLATED = OTHER_LOCALES.filter((l) => !l.variantOf).map((l) => l.code);
const SCRIPT: Record<string, RegExp> = { hi: /\p{Script=Devanagari}/u, bn: /\p{Script=Bengali}/u, ru: /\p{Script=Cyrillic}/u };
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

const flat = (o: unknown, prefix = ''): [string, string][] =>
  Array.isArray(o)
    ? o.flatMap((v, i) => flat(v, `${prefix}[${i}]`))
    : o && typeof o === 'object'
      ? Object.entries(o).flatMap(([k, v]) => flat(v, prefix ? `${prefix}.${k}` : k))
      : [[prefix, String(o)]];

describe('translated helper', () => {
  it('has text for every translated language', () => {
    expect(Object.keys(HELPER_TEXT).sort()).toEqual([...TRANSLATED].sort());
  });

  describe.each(TRANSLATED)('%s', (code) => {
    const t = HELPER_TEXT[code]!;
    const english = new Map(flat(HELPER_EN));
    const mine = new Map(flat(t));

    it('has every field of the English text, with the same placeholders', () => {
      expect([...mine.keys()].sort()).toEqual([...english.keys()].sort());
      for (const [key, value] of english) {
        if (value === '' && !['understands', 'page.after'].includes(key)) continue;
        if (!['understands', 'page.before', 'page.after'].includes(key)) expect(mine.get(key)!.trim().length, `${code} ${key}`).toBeGreaterThan(0);
        expect(placeholders(mine.get(key)!), `${code} ${key}`).toEqual(placeholders(value));
      }
      expect(t.starters).toHaveLength(STARTERS.length);
      expect(t.ui.understands.length, `${code} understands`).toBeGreaterThan(10);
    });

    it('is not English left in place', () => {
      expect(t.greeting).not.toBe(HELPER_EN.greeting);
      expect(t.replies.safe).not.toBe(HELPER_EN.replies.safe);
      expect(t.replies.none).not.toBe(HELPER_EN.replies.none);
      const script = SCRIPT[code];
      if (script) expect(script.test(t.replies.safe)).toBe(true);
    });

    it('answers in its own language and points at that language\'s pages', () => {
      const ctx = helperContext(code);
      const exact = respond('make my photo under 100 KB', ctx);
      expect(exact.text).not.toContain('{');
      expect(exact.tools[0]!.href).toBe(`/${OTHER_LOCALES.find((l) => l.code === code)!.path}/compress-image-to-100kb/`);
      expect(exact.tools[0]!.name).not.toBe('Compress image to 100 KB');
      const near = respond('compress to 150kb', ctx);
      expect(near.text).toContain('150');
      expect(near.text).not.toContain('{');
      expect(near.tools.map((x) => x.slug)).toEqual(['compress-image-to-100kb', 'resize-image']);
      const safe = respond('is my picture safe', ctx);
      expect(safe.text).toBe(t.replies.safe);
      expect(safe.links[1]!.label).toBe(t.links.privacy);
      expect(respond('xyzzy', ctx).text).toBe(t.replies.none);
    });

    it('finds a tool by its translated name, and still by English words', () => {
      const ctx = helperContext(code);
      const name = ctx.items['compress-image']!.name;
      expect(respond(name, ctx).tools.map((x) => x.slug), `${code} typing "${name}"`).toContain('compress-image');
      expect(respond('make a round profile picture', ctx).tools[0]!.slug).toBe('circle-crop-image');
    });
  });

  it('gives every tool and shortcut page an address and a name in every language', () => {
    for (const code of [...TRANSLATED, 'en-GB']) {
      const ctx = helperContext(code);
      for (const slug of [...TOOLS.map((x) => x.slug), ...LANDING_PAGES.map((p) => p.slug)]) {
        expect(ctx.items[slug]?.name, `${code} ${slug}`).toBeTruthy();
        expect(ctx.items[slug]!.href.startsWith(`/${OTHER_LOCALES.find((l) => l.code === code)!.path}/`), `${code} ${slug}`).toBe(true);
      }
    }
  });

  it('English (UK) is the English helper with British spelling and keeps English matching', () => {
    const uk = helperText('en-GB');
    expect(uk.replies.none).toBe(HELPER_EN.replies.none);
    const ctx = helperContext('en-GB');
    expect(ctx.translated).toBe(false);
    const r = respond('make my photo black and white', ctx);
    expect(r.tools[0]!.slug).toBe('adjust-image-colors');
    expect(r.tools[0]!.href).toBe('/en-gb/adjust-image-colors/');
    expect(r.tools[0]!.name).toBe('Adjust colours and filters');
  });

  it('the English helper is unchanged by the context', () => {
    expect(respond('make my photo under 100 KB').tools[0]!.href).toBe('/compress-image-to-100kb/');
    expect(respond('make my photo under 100 KB', ENGLISH_CONTEXT).text).toContain('Compress image to 100 KB');
    expect(helperContext('en')).toBe(ENGLISH_CONTEXT);
  });
});
