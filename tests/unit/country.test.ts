import { describe, expect, it } from 'vitest';
import { EXAMS, validatePresets } from '../../src/lib/exam-presets';
import { EXAM_LANDING_PAGES } from '../../src/lib/exam-landing';
import { LANDING_PAGES } from '../../src/lib/landing';
import { COUNTRY_ORDER, countryName, countryOfLanding, countryOfSlug } from '../../src/lib/country';
import { QUICK_GROUPS, quickGroups } from '../../src/lib/quick';

describe('country-specific pages', () => {
  it('every exam names a country that is listed', () => {
    for (const e of EXAMS) expect(COUNTRY_ORDER as readonly string[], e.id).toContain(e.country);
  });

  it('a preset without a country fails validation', () => {
    const bad = [{ ...EXAMS[0]!, country: '' }];
    expect(validatePresets(bad).join('\n')).toMatch(/country/);
  });

  it('every exam page has the country of its exam, and no other page has one', () => {
    for (const page of EXAM_LANDING_PAGES) {
      const exam = EXAMS.find((e) => e.id === page.initial['examId'])!;
      expect(countryOfLanding(page), page.slug).toBe(exam.country);
    }
    const examSlugs = new Set(EXAM_LANDING_PAGES.map((p) => p.slug));
    for (const page of LANDING_PAGES.filter((p) => !examSlugs.has(p.slug))) {
      expect(countryOfSlug(page.slug), page.slug).toBeNull();
    }
  });

  it('the UK and Canada passport photos are not filed under India', () => {
    expect(countryOfSlug('uk-passport-photo-size')).toBe('GB');
    expect(countryOfSlug('canada-passport-photo-size')).toBe('CA');
    expect(countryOfSlug('ibps-po-photo-size')).toBe('IN');
  });

  it('the sidebar has one group per country holding exactly that country\'s pages, and none elsewhere', () => {
    const inCountryGroups = new Set<string>();
    for (const g of quickGroups().filter((x) => x.country)) {
      expect(g.name).toBe(countryName(g.country!));
      for (const item of g.items) {
        expect(countryOfSlug(item.slug), item.slug).toBe(g.country);
        inCountryGroups.add(item.slug);
      }
    }
    expect(inCountryGroups.size).toBe(EXAM_LANDING_PAGES.length);
    for (const g of QUICK_GROUPS.filter((x) => !x.country)) {
      for (const slug of g.slugs) expect(inCountryGroups.has(slug), slug).toBe(false);
    }
  });

  it('country names follow the language', () => {
    expect(countryName('IN')).toBe('India');
    expect(countryName('GB', 'de')).toBe('Vereinigtes Königreich');
    expect(countryName('CA', 'fr')).toBe('Canada');
  });
});
