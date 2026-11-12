import { GUIDES, type Guide } from '../../lib/guides';
import { ukDeep } from '../uk';
import { bnGuides } from './bn';
import { deGuides } from './de';
import { GUIDE_CHROME_EN } from './en';
import { esGuides } from './es';
import { frGuides } from './fr';
import { hiGuides } from './hi';
import { idGuides } from './id';
import { ptBRGuides } from './pt-br';
import { ruGuides } from './ru';
import { trGuides } from './tr';
import type { GuideChrome, GuideLocale, GuideText } from './types';

export type { GuideChrome, GuideLocale, GuideText } from './types';

/** The translated guides by locale code. English comes from the `Guide` list itself; English (UK) is made from it. */
export const GUIDE_LOCALES: Readonly<Record<string, GuideLocale>> = { hi: hiGuides, bn: bnGuides, 'pt-BR': ptBRGuides, id: idGuides, ru: ruGuides, de: deGuides, es: esGuides, fr: frGuides, tr: trGuides };

const englishText = (g: Guide): GuideText => ({ title: g.title, seoTitle: g.seoTitle, description: g.description, intro: g.intro, steps: g.steps, sections: g.sections, faq: g.faq });

const cache = new Map<string, GuideText>();

/** A guide's text in a language. English (UK) is the English text in British spelling. */
export function guideTextFor(code: string, guide: Guide): GuideText {
  if (code === 'en') return englishText(guide);
  const key = `${code}:${guide.slug}`;
  let hit = cache.get(key);
  if (!hit) {
    hit = code === 'en-GB' ? ukDeep(englishText(guide)) : GUIDE_LOCALES[code]?.guides[guide.slug] ?? englishText(guide);
    cache.set(key, hit);
  }
  return hit;
}

export function guideChromeFor(code: string): GuideChrome {
  if (code === 'en-GB') return ukDeep(GUIDE_CHROME_EN);
  return GUIDE_LOCALES[code]?.chrome ?? GUIDE_CHROME_EN;
}

export { GUIDES };
