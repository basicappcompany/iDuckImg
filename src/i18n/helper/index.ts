import { LANDING_PAGES } from '../../lib/landing';
import { ENGLISH_CONTEXT, type HelperContext } from '../../lib/helper';
import { TOOLS, toolPath } from '../../lib/tools';
import { localePath, toolText } from '../index';
import { localizedLanding } from '../shortcuts';
import { ukDeep } from '../uk';
import { bnHelper } from './bn';
import { deHelper } from './de';
import { HELPER_EN } from './en';
import { esHelper } from './es';
import { frHelper } from './fr';
import { hiHelper } from './hi';
import { idHelper } from './id';
import { ptBRHelper } from './pt-br';
import { ruHelper } from './ru';
import { trHelper } from './tr';
import type { HelperText } from './types';

export type { HelperText } from './types';

/** The helper's words by locale code. English is `HELPER_EN`; English (UK) is made from it. */
export const HELPER_TEXT: Readonly<Record<string, HelperText>> = { hi: hiHelper, bn: bnHelper, 'pt-BR': ptBRHelper, id: idHelper, ru: ruHelper, de: deHelper, es: esHelper, fr: frHelper, tr: trHelper };

export function helperText(code: string): HelperText {
  if (code === 'en-GB') return ukDeep(HELPER_EN);
  return HELPER_TEXT[code] ?? HELPER_EN;
}

/**
 * Everything the chat needs for a language, as plain data: the words, the tool names and where each tool lives
 * in that language. It is built when the page is built and handed to the chat in the browser.
 */
export function helperContext(code: string): HelperContext {
  if (code === 'en') return ENGLISH_CONTEXT;
  const items: HelperContext['items'] = {};
  for (const t of TOOLS) {
    const x = toolText(code, t.slug);
    items[t.slug] = { name: x.name, summary: x.summary, href: localePath(code, toolPath(t.slug)) };
  }
  for (const p of LANDING_PAGES) {
    const x = localizedLanding(p, code);
    items[p.slug] = { name: x.name, summary: x.summary, href: localePath(code, `/${p.slug}/`) };
  }
  return {
    text: helperText(code),
    items,
    // The community pages are not translated yet, so they stay at their English addresses.
    links: { ...ENGLISH_CONTEXT.links, browse: localePath(code, '/') },
    translated: code !== 'en-GB',
  };
}
