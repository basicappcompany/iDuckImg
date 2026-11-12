import { TOOLS, toolPath } from '../lib/tools';
import { SITE_URL } from '../lib/seo';
import { LANDING_PAGES, landingPath } from '../lib/landing';
import { en } from './en';
import { LOCALES, localePath, type LocaleInfo } from './locales';
import type { Dict, LocaleData, ToolText } from './types';
import { bn } from './bn';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { hi } from './hi';
import { id } from './id';
import { ptBR } from './pt-br';
import { ru } from './ru';
import { tr } from './tr';

export { DEFAULT_LOCALE, LOCALES, OTHER_LOCALES, localeByCode, localeByPath, localePath, splitLocalePath, type LocaleInfo } from './locales';
export type { Dict, LocaleData, ToolText } from './types';

/** Every translated language's text, by locale code. English is built from the tool list itself. */
export const LOCALE_DATA: Readonly<Record<string, LocaleData>> = { hi, bn, 'pt-BR': ptBR, id, ru, de, es, fr, tr };

export function dictFor(code: string): Dict {
  return LOCALE_DATA[code]?.dict ?? en;
}

/** Name, summary and quick answer of a tool in a language, falling back to English. */
export function toolText(code: string, slug: string): ToolText {
  const base = TOOLS.find((t) => t.slug === slug);
  const english: ToolText = { name: base?.name ?? slug, summary: base?.summary ?? '', quick: base?.quick ?? '' };
  return LOCALE_DATA[code]?.tools[slug] ?? english;
}

/** Fill {placeholders}: format('All {n} tools', { n: 24 }). */
export function format(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}

export interface Alternate {
  /** The hreflang value: en, hi, pt-BR... */
  hreflang: string;
  href: string;
  locale: LocaleInfo;
}

/** Slugs that have a translated page, with the home page. */
const TRANSLATED_PATHS = new Set<string>(['/', ...TOOLS.map((t) => toolPath(t.slug)), ...LANDING_PAGES.map((p) => landingPath(p.slug))]);

/** True when this English path has a translated version in every published language. */
export function hasTranslations(englishPath: string): boolean {
  return TRANSLATED_PATHS.has(englishPath);
}

/** Every language version of an English path, as absolute URLs, or nothing when it has none. */
export function alternatesFor(englishPath: string): Alternate[] {
  if (!hasTranslations(englishPath)) return [];
  return LOCALES.filter((l) => l.status !== 'planned').map((locale) => ({
    hreflang: locale.code,
    href: `${SITE_URL}${localePath(locale.code, englishPath)}`,
    locale,
  }));
}

/** Where the language menu sends the visitor: the same page in each language, or that language's home page. */
export function languageLinks(englishPath: string): { locale: LocaleInfo; href: string }[] {
  const translated = hasTranslations(englishPath);
  return LOCALES.filter((l) => l.status !== 'planned').map((locale) => ({
    locale,
    href: translated ? localePath(locale.code, englishPath) : localePath(locale.code, '/'),
  }));
}

