import { describe, expect, it } from 'vitest';
import { TOOLS, TOOL_GROUPS, toolPath } from '../../src/lib/tools';
import { en } from '../../src/i18n/en';
import {
  LOCALES,
  LOCALE_DATA,
  OTHER_LOCALES,
  alternatesFor,
  dictFor,
  format,
  hasTranslations,
  languageLinks,
  localeByCode,
  localeByPath,
  localePath,
  splitLocalePath,
  toolText,
} from '../../src/i18n';
import type { Dict } from '../../src/i18n/types';
import { UI_TEXT, fill } from '../../src/i18n/ui';
import { flagSvg } from '../../src/i18n/flags';

/** The ten languages LeafLock PDF publishes. */
const EXPECTED = ['en', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr'];

/** Every string of a dictionary with the path to it, so a missing or empty one can be named. */
function flatten(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => flatten(v, `${path}[${i}]`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => flatten(v, path ? `${path}.${k}` : k));
  return [];
}

const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

describe('the language registry', () => {
  it('has the ten languages LeafLock publishes, English first', () => {
    expect(LOCALES.map((l) => l.code)).toEqual(EXPECTED);
    expect(new Set(LOCALES.map((l) => l.path)).size).toBe(LOCALES.length);
    expect(LOCALES[0]!.path).toBe('');
    for (const l of LOCALES) {
      expect(l.native.length, l.code).toBeGreaterThan(1);
      expect(l.og, l.code).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      if (l.path) expect(l.path, l.code).toMatch(/^[a-z]{2}(-[a-z]{2})?$/);
    }
  });

  it('publishes every language that has a translation, and nothing that has none', () => {
    expect(OTHER_LOCALES.map((l) => l.code).sort()).toEqual(Object.keys(LOCALE_DATA).sort());
    for (const l of OTHER_LOCALES) expect(l.status).not.toBe('planned');
  });

  it('builds and reads language paths', () => {
    expect(localePath('en', '/compress-image/')).toBe('/compress-image/');
    expect(localePath('es', '/compress-image/')).toBe('/es/compress-image/');
    expect(localePath('es', '/')).toBe('/es/');
    expect(localePath('pt-BR', '/')).toBe('/pt-br/');
    expect(splitLocalePath('/es/compress-image/')).toMatchObject({ locale: { code: 'es' }, rest: '/compress-image/' });
    expect(splitLocalePath('/pt-br/')).toMatchObject({ locale: { code: 'pt-BR' }, rest: '/' });
    expect(splitLocalePath('/es')).toMatchObject({ locale: { code: 'es' }, rest: '/' });
    expect(splitLocalePath('/compress-image/')).toMatchObject({ locale: { code: 'en' }, rest: '/compress-image/' });
    // A page whose name looks like a language is still English unless it is a published language path.
    expect(splitLocalePath('/guides/how-to-crop-an-image/').locale.code).toBe('en');
    expect(localeByPath('xx')).toBeUndefined();
    expect(localeByCode('xx').code).toBe('en');
  });

  it('fills placeholders', () => {
    expect(format('All {n} tools', { n: 24 })).toBe('All 24 tools');
    expect(format('{a} and {b}', { a: 1 })).toBe('1 and {b}');
  });
});

describe.each(OTHER_LOCALES.map((l) => l.code))('translation: %s', (code) => {
  const data = LOCALE_DATA[code]!;
  const english = flatten(en);
  const translated = new Map(flatten(data.dict));

  it('has every string of the English dictionary, none empty', () => {
    expect([...translated.keys()].sort()).toEqual(english.map(([k]) => k).sort());
    for (const [key, value] of translated) expect(value.trim().length, `${code} ${key}`).toBeGreaterThan(0);
    expect(data.dict.why).toHaveLength(en.why.length);
    expect(data.dict.faqs).toHaveLength(en.faqs.length);
    expect(Object.keys(data.dict.groups).sort()).toEqual([...TOOL_GROUPS].sort());
  });

  it('keeps every {placeholder} the English has, and adds none', () => {
    for (const [key, value] of english) expect(placeholders(translated.get(key)!), `${code} ${key}`).toEqual(placeholders(value));
  });

  it('is actually translated, not English left in place', () => {
    const same = english.filter(([key, value]) => translated.get(key) === value && value.length > 12);
    expect(same.map(([k]) => k), `${code} still has English`).toEqual([]);
    const identicalShort = english.filter(([key, value]) => translated.get(key) === value);
    expect(identicalShort.length / english.length, `${code} identical strings`).toBeLessThan(0.08);
  });

  it('translates every tool, with a name, a summary and a quick answer', () => {
    expect(Object.keys(data.tools).sort()).toEqual(TOOLS.map((t) => t.slug).sort());
    for (const t of TOOLS) {
      const x = data.tools[t.slug]!;
      expect(x.name.trim().length, `${code} ${t.slug} name`).toBeGreaterThan(2);
      expect(x.name.length, `${code} ${t.slug} name`).toBeLessThanOrEqual(70);
      expect(x.summary.length, `${code} ${t.slug} summary`).toBeGreaterThan(15);
      expect(x.summary.length, `${code} ${t.slug} summary`).toBeLessThanOrEqual(170);
      expect(x.quick.length, `${code} ${t.slug} quick`).toBeGreaterThan(60);
      expect(x.quick.length, `${code} ${t.slug} quick`).toBeLessThanOrEqual(420);
      expect(x.name, `${code} ${t.slug}`).not.toBe(t.name);
      expect(x.quick, `${code} ${t.slug}`).not.toBe(t.quick);
    }
    expect(new Set(TOOLS.map((t) => data.tools[t.slug]!.name)).size, `${code} duplicate names`).toBe(TOOLS.length);
  });

  it('keeps the controls the tool really has, in English, in quotes', () => {
    // The tool controls are English for now, so a quick answer that names a button must name it as it appears.
    const buttons: Record<string, string> = {
      'compress-image': 'Compress',
      'resize-image': 'Resize',
      'crop-image': 'Crop',
      'add-watermark-to-image': 'Add watermark',
      'add-logo-to-image': 'Add logo',
      'convert-image': 'Convert',
      'image-to-pdf': 'Create PDF',
      'rotate-image': 'Apply',
      'remove-exif-data': 'Remove metadata',
      'circle-crop-image': 'Make it round',
      'add-text-to-image': 'Add text',
      'pixel-art-maker': 'Make pixel art',
      'merge-images': 'Join pictures',
      'adjust-image-colors': 'Apply',
      'add-border-to-image': 'Add border',
      'favicon-generator': 'Make favicons',
    };
    for (const [slug, label] of Object.entries(buttons)) expect(data.tools[slug]!.quick, `${code} ${slug}`).toContain(`"${label}"`);
  });

  it('is in its own script', () => {
    const script: Record<string, RegExp> = { hi: /[ऀ-ॿ]/, bn: /[ঀ-৿]/, ru: /[Ѐ-ӿ]/ };
    const re = script[code];
    if (re) {
      for (const t of TOOLS) expect(data.tools[t.slug]!.name, `${code} ${t.slug}`).toMatch(re);
      expect(data.dict.heroMark).toMatch(re);
      expect(data.dict.machineNote).toMatch(re);
    }
  });

  it('says plainly that it is machine-translated and what is still English', () => {
    expect(data.dict.machineNote.length).toBeGreaterThan(40);
    expect(data.dict.controlsEnglish.length).toBeGreaterThan(20);
    expect(data.dict.readGuide.length).toBeGreaterThan(8);
  });

  it('contains no leftover template syntax', () => {
    for (const [key, value] of translated) expect(value, `${code} ${key}`).not.toMatch(/\$\{|undefined|\[object/);
  });
});

describe('the shared tool controls', () => {
  const english = Object.entries(UI_TEXT.en!);
  it('are translated for every language, with every key and placeholder', () => {
    expect(Object.keys(UI_TEXT).sort()).toEqual([...EXPECTED].sort());
    for (const code of OTHER_LOCALES.map((l) => l.code)) {
      const ui = UI_TEXT[code]!;
      expect(Object.keys(ui).sort(), code).toEqual(english.map(([k]) => k).sort());
      for (const [key, value] of english) {
        const t = (ui as unknown as Record<string, string>)[key]!;
        expect(t.trim().length, `${code} ${key}`).toBeGreaterThan(0);
        expect(placeholders(t), `${code} ${key}`).toEqual(placeholders(value));
        if (value.length > 12) expect(t, `${code} ${key} left in English`).not.toBe(value);
      }
    }
  });
  it('fills placeholders', () => {
    expect(fill(UI_TEXT.es!.downloadAll, { n: 3 })).toBe('Descargar todo (3) en ZIP');
  });
});

describe('flags', () => {
  it('has a flag for every language', () => {
    for (const l of LOCALES) expect(flagSvg(l.code), l.code).toContain('<svg');
    expect(flagSvg('xx')).toBe('');
  });
});

describe('lookups', () => {
  it('falls back to English for an unknown language or tool', () => {
    expect(dictFor('xx')).toBe(en);
    const t = TOOLS[0]!;
    expect(toolText('xx', t.slug)).toEqual({ name: t.name, summary: t.summary, quick: t.quick });
    expect(toolText('es', 'no-such-tool').name).toBe('no-such-tool');
    expect(toolText('es', 'compress-image').name).toBe('Comprimir imágenes');
  });

  it('knows which pages have translations', () => {
    expect(hasTranslations('/')).toBe(true);
    for (const t of TOOLS) expect(hasTranslations(toolPath(t.slug))).toBe(true);
    for (const p of ['/guides/', '/privacy/', '/heic-to-jpg/', '/chat/']) expect(hasTranslations(p)).toBe(false);
  });

  it('lists every language version of a translated page for hreflang', () => {
    const alts = alternatesFor('/compress-image/');
    expect(alts.map((a) => a.hreflang)).toEqual(EXPECTED);
    expect(alts[0]!.href).toBe('https://iduckimg.com/compress-image/');
    expect(alts.find((a) => a.hreflang === 'pt-BR')!.href).toBe('https://iduckimg.com/pt-br/compress-image/');
    expect(alternatesFor('/')[1]!.href).toBe('https://iduckimg.com/hi/');
    expect(alternatesFor('/guides/')).toEqual([]);
  });

  it('sends the language menu to the same page, or to the language home when there is no translation', () => {
    expect(languageLinks('/compress-image/').find((l) => l.locale.code === 'es')!.href).toBe('/es/compress-image/');
    expect(languageLinks('/guides/').find((l) => l.locale.code === 'es')!.href).toBe('/es/');
    expect(languageLinks('/guides/').find((l) => l.locale.code === 'en')!.href).toBe('/');
    expect(languageLinks('/').map((l) => l.locale.code)).toEqual(EXPECTED);
  });

  it('keeps the English dictionary type complete', () => {
    const d: Dict = en;
    expect(d.groups['Create & design']).toBe('Create & design');
  });
});
