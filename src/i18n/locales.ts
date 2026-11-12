/**
 * The language registry: the one place that says which languages exist.
 *
 * The ten languages are the ones LeafLock PDF publishes (leaflockpdf.com), chosen there from the
 * country mix of PDF and image tool sites plus the largest online populations: English, Hindi,
 * Bengali, Portuguese (Brazil), Indonesian, Russian, German, Spanish, French and Turkish. All read
 * left to right. English lives at the root; every other language lives under its own path
 * (/es/, /pt-br/, ...).
 *
 * What is translated so far: the page chrome, the home page and the heading, summary and quick answer
 * of every tool page. The tool controls, the how-to guides, the shortcut pages and the community pages
 * are English for now, and the translated pages say so.
 *
 * `status` follows LeafLock's rule: 'machine' means translated by a machine and published with a
 * visible label; a person has not yet read it. A locale that is 'planned' would be left out of
 * hreflang and the sitemap, so it is never indexed with English text under a foreign address.
 */
export type LocaleStatus = 'machine' | 'reviewed' | 'planned';

export interface LocaleInfo {
  /** The code used in code: en, en-GB, hi, pt-BR... */
  code: string;
  /** The language tag for hreflang, <html lang> and the sitemap: en-US, en-GB, hi, pt-BR... */
  hreflang: string;
  /** The URL path segment: en has none (root); others are /es/, /pt-br/... */
  path: string;
  /** English name, for people maintaining the site. */
  name: string;
  /** The name in its own language, shown in the language menu. */
  native: string;
  /** Open Graph locale, for example pt_BR. */
  og: string;
  status: LocaleStatus;
  /** English (UK) is English with British spelling, made from the US text when the page is built; it has no translation to review. */
  variantOf?: 'en';
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES: readonly LocaleInfo[] = [
  { code: 'en', hreflang: 'en-US', path: '', name: 'English (US)', native: 'English (US)', og: 'en_US', status: 'reviewed' },
  { code: 'en-GB', hreflang: 'en-GB', path: 'en-gb', name: 'English (UK)', native: 'English (UK)', og: 'en_GB', status: 'reviewed', variantOf: 'en' },
  { code: 'hi', hreflang: 'hi', path: 'hi', name: 'Hindi', native: 'हिन्दी', og: 'hi_IN', status: 'machine' },
  { code: 'bn', hreflang: 'bn', path: 'bn', name: 'Bengali', native: 'বাংলা', og: 'bn_BD', status: 'machine' },
  { code: 'pt-BR', hreflang: 'pt-BR', path: 'pt-br', name: 'Portuguese (Brazil)', native: 'Português (Brasil)', og: 'pt_BR', status: 'machine' },
  { code: 'id', hreflang: 'id', path: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', og: 'id_ID', status: 'machine' },
  { code: 'ru', hreflang: 'ru', path: 'ru', name: 'Russian', native: 'Русский', og: 'ru_RU', status: 'machine' },
  { code: 'de', hreflang: 'de', path: 'de', name: 'German', native: 'Deutsch', og: 'de_DE', status: 'machine' },
  { code: 'es', hreflang: 'es', path: 'es', name: 'Spanish', native: 'Español', og: 'es_ES', status: 'machine' },
  { code: 'fr', hreflang: 'fr', path: 'fr', name: 'French', native: 'Français', og: 'fr_FR', status: 'machine' },
  { code: 'tr', hreflang: 'tr', path: 'tr', name: 'Turkish', native: 'Türkçe', og: 'tr_TR', status: 'machine' },
];

/** The languages that get their own pages: every one except English. */
export const OTHER_LOCALES: readonly LocaleInfo[] = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE && l.status !== 'planned');

export function localeByCode(code: string): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0]!;
}

export function localeByPath(segment: string): LocaleInfo | undefined {
  return OTHER_LOCALES.find((l) => l.path === segment);
}

/** /compress-image/ in Spanish -> /es/compress-image/. English paths are unchanged. */
export function localePath(code: string, path: string): string {
  const info = localeByCode(code);
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!info.path) return clean;
  return clean === '/' ? `/${info.path}/` : `/${info.path}${clean}`;
}

/** /es/compress-image/ -> { locale: es, rest: /compress-image/ }. Anything else is English as it is. */
export function splitLocalePath(pathname: string): { locale: LocaleInfo; rest: string } {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const m = /^\/([^/]+)(\/.*)$/.exec(withSlash);
  const found = m ? localeByPath(m[1]!) : undefined;
  if (found && m) return { locale: found, rest: m[2]! };
  return { locale: localeByCode(DEFAULT_LOCALE), rest: withSlash };
}
