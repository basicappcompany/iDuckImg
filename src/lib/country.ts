/**
 * Which tools and pages only make sense for one country. Today that is every exam and ID page
 * (the rules come from one country's authority) and nothing else: the size pages (35 x 45 mm,
 * 2 x 2 inch, 200 x 230 px) are shapes used in many places, so they are NOT marked, and a page is
 * only given a country when an official document names it. The country of an exam page comes from
 * the `country` field in `src/data/exam-presets.json`, so it cannot drift from the data.
 */
import { EXAMS } from './exam-presets';
import { EXAM_LANDING_PAGES } from './exam-landing';
import type { LandingPage } from './landing';

/** ISO 3166-1 alpha-2 codes in the order they are listed in the sidebar and the requirements hub. */
export const COUNTRY_ORDER = ['IN', 'GB', 'CA'] as const;

/** English names; other languages get theirs from `Intl.DisplayNames` (see `countryName`). */
const ENGLISH_NAMES: Record<string, string> = { IN: 'India', GB: 'United Kingdom', CA: 'Canada' };

export function countryName(code: string, locale = 'en'): string {
  try {
    const name = new Intl.DisplayNames([locale === 'en-gb' ? 'en-GB' : locale], { type: 'region' }).of(code);
    if (name && name !== code) return name;
  } catch {
    /* an unknown locale falls back to English below */
  }
  return ENGLISH_NAMES[code] ?? code;
}

/** Country code of an exam landing page, or null for every other page. */
export function countryOfLanding(page: Pick<LandingPage, 'kind' | 'initial'>): string | null {
  if (page.kind.kind !== 'exam') return null;
  const id = page.initial['examId'];
  return EXAMS.find((e) => e.id === id)?.country ?? null;
}

export function countryOfSlug(slug: string): string | null {
  const page = EXAM_LANDING_PAGES.find((p) => p.slug === slug);
  return page ? countryOfLanding(page) : null;
}
