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
import { LANDING_PAGES, isTranslatable } from '../../src/lib/landing';
import { SHORTCUT_TEXT, localizedLanding, localizedQuickGroups } from '../../src/i18n/shortcuts';
import { QUICK_GROUPS } from '../../src/lib/quick';
import { flagSvg } from '../../src/i18n/flags';
import { TRANSLATED_TOOL_SLUGS } from '../../src/i18n/tools/translated';
import { COMPRESS_TEXT } from '../../src/i18n/tools/compress';
import { CONVERT_TEXT } from '../../src/i18n/tools/convert';
import { CROP_TEXT } from '../../src/i18n/tools/crop';
import { PDF_TEXT } from '../../src/i18n/tools/pdf';
import { RESIZE_TEXT } from '../../src/i18n/tools/resize';
import { EXIF_TEXT } from '../../src/i18n/tools/exif';
import { LOGO_TEXT } from '../../src/i18n/tools/logo';
import { POSITION_TEXT } from '../../src/i18n/tools/positions';
import { ROTATE_TEXT } from '../../src/i18n/tools/rotate';
import { TEXT_TEXT } from '../../src/i18n/tools/text';
import { WATERMARK_TEXT } from '../../src/i18n/tools/watermark';

/** Tools whose own options and run button are translated: slug -> table. The quick answer names the translated button. */
const TRANSLATED_TOOLS: Record<string, Readonly<Record<string, { run: string }>>> = {
  'compress-image': COMPRESS_TEXT,
  'resize-image': RESIZE_TEXT,
  'convert-image': CONVERT_TEXT,
  'crop-image': CROP_TEXT,
  'image-to-pdf': PDF_TEXT,
  'add-text-to-image': TEXT_TEXT,
  'add-watermark-to-image': WATERMARK_TEXT,
  'add-logo-to-image': LOGO_TEXT,
  'rotate-image': ROTATE_TEXT,
  'remove-exif-data': EXIF_TEXT,
};

/** The ten languages LeafLock PDF publishes. */
const EXPECTED = ['en', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr'];
/** Every language in the menu: English (US), English (UK), then the nine translations. */
const EXPECTED_ALL = ['en', 'en-GB', ...EXPECTED.slice(1)];
/** The languages that are real translations (English (UK) is a spelling variant, checked on its own). */
const TRANSLATED = OTHER_LOCALES.filter((l) => !l.variantOf).map((l) => l.code);

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
    expect(LOCALES.map((l) => l.code)).toEqual(EXPECTED_ALL);
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

describe.each(TRANSLATED)('translation: %s', (code) => {
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
    for (const [slug, label] of Object.entries(buttons)) {
      // A tool with translated controls names its translated button; the others still name the English one.
      const shown = TRANSLATED_TOOLS[slug]?.[code]?.run ?? label;
      expect(data.tools[slug]!.quick, `${code} ${slug}`).toContain(`"${shown}"`);
    }
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

describe('translated shortcut pages', () => {
  const english = SHORTCUT_TEXT.en!;
  const convertSlugs = LANDING_PAGES.filter((p) => p.kind.kind === 'convert').map((p) => p.slug);

  it('has a template, a reason for every conversion, and every placeholder, in every language', () => {
    expect(Object.keys(english.why).sort()).toEqual([...convertSlugs].sort());
    for (const code of TRANSLATED) {
      const t = SHORTCUT_TEXT[code]!;
      expect(Object.keys(t.why).sort(), code).toEqual([...convertSlugs].sort());
      for (const kind of ['kb', 'convert', 'exam'] as const) {
        expect(t[kind].steps, `${code} ${kind} steps`).toHaveLength(4);
        expect(t[kind].faqs, `${code} ${kind} faqs`).toHaveLength(english[kind].faqs.length);
        for (const key of ['name', 'title', 'description', 'summary', 'quick'] as const) {
          expect(placeholders(t[kind][key]), `${code} ${kind} ${key}`).toEqual(placeholders(english[kind][key]));
          expect(t[kind][key], `${code} ${kind} ${key} left in English`).not.toBe(english[kind][key]);
        }
        english[kind].steps.forEach((s, i) => expect(placeholders(t[kind].steps[i]!), `${code} ${kind} step ${i}`).toEqual(placeholders(s)));
        english[kind].faqs.forEach((f, i) => {
          expect(placeholders(t[kind].faqs[i]!.q), `${code} ${kind} faq ${i} q`).toEqual(placeholders(f.q));
          expect(placeholders(t[kind].faqs[i]!.a), `${code} ${kind} faq ${i} a`).toEqual(placeholders(f.a));
        });
      }
      expect(Object.keys(t.chrome.groups).sort(), code).toEqual(Object.keys(english.chrome.groups).sort());
      expect(Object.keys(t.chrome.communityPages).sort(), code).toEqual(Object.keys(english.chrome.communityPages).sort());
      expect(Object.keys(t.docs).sort(), code).toEqual(Object.keys(english.docs).sort());
    }
  });

  it('builds every page in every language with real, filled-in text', () => {
    for (const code of TRANSLATED) {
      const names = new Set<string>();
      for (const page of LANDING_PAGES.filter(isTranslatable)) {
        const p = localizedLanding(page, code);
        const where = `${code} ${page.slug}`;
        for (const [key, value] of Object.entries({ name: p.name, h1: p.h1, title: p.title, description: p.description, summary: p.summary, quick: p.quick })) {
          expect(value.trim().length, `${where} ${key}`).toBeGreaterThan(3);
          expect(value, `${where} ${key}`).not.toMatch(/\{\w+\}|undefined|\[object/);
        }
        expect(p.title.length, `${where} title`).toBeLessThanOrEqual(75);
        expect(p.description.length, `${where} description`).toBeGreaterThan(60);
        expect(p.description.length, `${where} description`).toBeLessThanOrEqual(220);
        expect(p.quick.length, `${where} quick`).toBeGreaterThan(80);
        expect(p.steps, where).toHaveLength(4);
        expect(p.faqs.length, where).toBeGreaterThanOrEqual(2);
        for (const f of p.faqs) expect(`${f.q} ${f.a}`, where).not.toMatch(/\{\w+\}|undefined/);
        expect(p.title, where).not.toBe(page.title);
        expect(p.quick, where).not.toBe(page.quick);
        names.add(p.name);
      }
      expect(names.size, `${code} duplicate names`).toBe(LANDING_PAGES.filter(isTranslatable).length);
    }
  });

  it('names the translated run button in the quick answer', () => {
    const resize = LANDING_PAGES.find((p) => p.slug === 'compress-image-to-100kb')!;
    expect(localizedLanding(resize, 'es').quick).toContain('"Cambiar tamaño"');
    const convert = LANDING_PAGES.find((p) => p.slug === 'heic-to-jpg')!;
    expect(localizedLanding(convert, 'de').quick).toContain('„Umwandeln“');
    expect(localizedLanding(convert, 'de').quick).toContain('HEIC');
  });

  it('lists every Quick tools group and shortcut in the sidebar, in the language', () => {
    for (const code of TRANSLATED) {
      const groups = localizedQuickGroups(code);
      expect(groups.map((g) => g.id)).toEqual(QUICK_GROUPS.map((g) => g.id));
      // English-only pages (custom sizes) are not listed in a translated sidebar.
      const englishOnly = new Set(LANDING_PAGES.filter((p) => !isTranslatable(p)).map((p) => p.slug));
      expect(groups.flatMap((g) => g.items)).toHaveLength(QUICK_GROUPS.flatMap((g) => g.slugs).filter((s) => !englishOnly.has(s)).length);
      for (const g of groups) {
        expect(g.name.length).toBeGreaterThan(3);
        for (const i of g.items) expect(i.href.startsWith(`/${OTHER_LOCALES.find((l) => l.code === code)!.path}/`), i.href).toBe(true);
      }
    }
  });
});

describe('translated tool controls', () => {
  it('has every key, every placeholder and no English left in place, for every language', () => {
    const tables = { compress: COMPRESS_TEXT, resize: RESIZE_TEXT, convert: CONVERT_TEXT, crop: CROP_TEXT, pdf: PDF_TEXT, text: TEXT_TEXT, watermark: WATERMARK_TEXT, logo: LOGO_TEXT, rotate: ROTATE_TEXT, exif: EXIF_TEXT, positions: POSITION_TEXT } as unknown as Record<string, Record<string, Record<string, string>>>;
    for (const [name, table] of Object.entries(tables)) {
      const english = Object.entries(table.en!);
      expect(Object.keys(table).sort(), name).toEqual([...EXPECTED].sort());
      for (const code of TRANSLATED) {
        const t = table[code]!;
        expect(Object.keys(t).sort(), `${name} ${code}`).toEqual(english.map(([k]) => k).sort());
        for (const [key, value] of english) {
          expect(t[key]!.trim().length, `${name} ${code} ${key}`).toBeGreaterThan(0);
          expect(placeholders(t[key]!), `${name} ${code} ${key}`).toEqual(placeholders(value));
          if (value.length > 14) expect(t[key], `${name} ${code} ${key} left in English`).not.toBe(value);
        }
      }
    }
  });
});

describe('the shared tool controls', () => {
  const english = Object.entries(UI_TEXT.en!);
  it('are translated for every language, with every key and placeholder', () => {
    expect(Object.keys(UI_TEXT).sort()).toEqual([...EXPECTED].sort());
    for (const code of TRANSLATED) {
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
    for (const t of LANDING_PAGES) expect(hasTranslations(`/${t.slug}/`), t.slug).toBe(isTranslatable(t));
    for (const p of ['/guides/', '/chat/', '/guides/how-to-compress-an-image/']) expect(hasTranslations(p), p).toBe(true);
    for (const p of ['/privacy/', '/about/']) expect(hasTranslations(p), p).toBe(false);
  });

  it('lists only reviewed language versions of a translated page for hreflang', () => {
    // Machine-translated languages nobody has read are noindex, so hreflang must not point at them.
    const reviewed = LOCALES.filter((l) => l.status === 'reviewed');
    const alts = alternatesFor('/compress-image/');
    expect(alts.map((a) => a.locale.code)).toEqual(reviewed.map((l) => l.code));
    expect(alts[0]!.href).toBe('https://iduckimg.com/compress-image/');
    expect(alts[0]!.hreflang).toBe('en-US');
    expect(alternatesFor('/')[1]!.href).toBe('https://iduckimg.com/en-gb/');
    expect(alts.some((a) => a.locale.status === 'machine')).toBe(false);
    expect(alternatesFor('/privacy/')).toEqual([]);
  });

  it('sends the language menu to the same page, or to the language home when there is no translation', () => {
    expect(languageLinks('/compress-image/').find((l) => l.locale.code === 'es')!.href).toBe('/es/compress-image/');
    expect(languageLinks('/guides/').find((l) => l.locale.code === 'es')!.href).toBe('/es/guides/');
    expect(languageLinks('/guides/').find((l) => l.locale.code === 'en-GB')!.href).toBe('/en-gb/guides/');
    expect(languageLinks('/privacy/').find((l) => l.locale.code === 'es')!.href).toBe('/es/');
    expect(languageLinks('/privacy/').find((l) => l.locale.code === 'en')!.href).toBe('/');
    expect(languageLinks('/').map((l) => l.locale.code)).toEqual(EXPECTED_ALL);
  });

  it('keeps the English dictionary type complete', () => {
    const d: Dict = en;
    expect(d.groups['Create & design']).toBe('Create & design');
  });
});

describe('which tools carry the "controls are still English" note', () => {
  it('lists exactly the tools whose own options are translated', () => {
    expect([...TRANSLATED_TOOL_SLUGS].sort()).toEqual(Object.keys(TRANSLATED_TOOLS).sort());
    for (const slug of TRANSLATED_TOOL_SLUGS) expect(TOOLS.some((t) => t.slug === slug), slug).toBe(true);
  });
});
