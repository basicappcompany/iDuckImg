import { LANDING_PAGES, isTranslatable, type LandingPage } from '../../lib/landing';
import { QUICK_GROUPS } from '../../lib/quick';
import { TOOLS, toolPath } from '../../lib/tools';
import { localePath } from '../locales';
import { toolText } from '../index';
import { CONVERT_TEXT } from '../tools/convert';
import { RESIZE_TEXT } from '../tools/resize';
import { ukDeep } from '../uk';
import { bn } from './bn';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { hi } from './hi';
import { id } from './id';
import { ptBR } from './pt-br';
import { ru } from './ru';
import { tr } from './tr';
import type { Faq, ShortcutText } from './types';

export type { ShortcutText } from './types';

export const SHORTCUT_TEXT: Readonly<Record<string, ShortcutText>> = { en, 'en-GB': ukDeep(en), hi, bn, 'pt-BR': ptBR, id, ru, de, es, fr, tr };

export function shortcutText(code: string): ShortcutText {
  return SHORTCUT_TEXT[code] ?? en;
}

/** Fill {placeholders}; one that has no value stays as written, so a test can spot it. */
function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}

export interface LocalLanding {
  /** The name in lists and the sidebar. */
  name: string;
  /** The page heading. */
  h1: string;
  title: string;
  description: string;
  summary: string;
  quick: string;
  steps: string[];
  faqs: Faq[];
}

/** The ExamTool is not translated yet, so its button keeps the English name, and the quick answer quotes it. */
const EXAM_RUN = 'Make my file';

/** A shortcut page in another language, built from the language's templates and the page's own data. */
export function localizedLanding(page: LandingPage, code: string): LocalLanding {
  const t = shortcutText(code);
  const k = page.kind;
  const apply = (template: { name: string; title: string; description: string; summary: string; quick: string; steps: string[]; faqs: Faq[] }, v: Record<string, string | number>, h1?: string): LocalLanding => ({
    name: fill(template.name, v),
    h1: fill(h1 ?? template.name, v),
    title: fill(template.title, v),
    description: fill(template.description, v),
    summary: fill(template.summary, v),
    quick: fill(template.quick, v),
    steps: template.steps.map((s) => fill(s, v)),
    faqs: template.faqs.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) })),
  });

  if (k.kind === 'kb') {
    const run = (RESIZE_TEXT[code] ?? RESIZE_TEXT.en).run;
    return apply(t.kb, { kb: k.kb, run });
  }
  if (k.kind === 'convert') {
    const run = (CONVERT_TEXT[code] ?? CONVERT_TEXT.en).run;
    const why = t.why[page.slug] ?? '';
    return apply(t.convert, { from: k.from, to: k.to, why, run }, t.convert.h1);
  }
  if (k.kind === 'custom') throw new Error(`${page.slug} is English only and has no translated version`);
  const what = t.docs[k.docId as keyof ShortcutText['docs']] ?? k.docId;
  return apply(t.exam, {
    short: k.short,
    exam: k.examName,
    doc: what,
    what,
    req: k.req,
    size: k.size,
    source: k.source,
    location: k.location,
    date: k.retrieved,
    cycle: k.cycle,
    run: EXAM_RUN,
  });
}

export interface LocalQuickGroup {
  id: string;
  emoji: string;
  name: string;
  items: { slug: string; href: string; name: string; emoji: string }[];
}

/** The Quick tools of the sidebar in a language: group names, shortcut names and links to that language's pages. */
export function localizedQuickGroups(code: string): LocalQuickGroup[] {
  const t = shortcutText(code);
  return QUICK_GROUPS.map((group) => ({
    id: group.id,
    emoji: group.emoji,
    name: t.chrome.groups[group.id as keyof ShortcutText['chrome']['groups']],
    items: group.slugs.flatMap((slug) => {
      const tool = TOOLS.find((x) => x.slug === slug);
      if (tool) return [{ slug, href: localePath(code, toolPath(slug)), name: toolText(code, slug).name, emoji: tool.emoji }];
      const page = LANDING_PAGES.find((p) => p.slug === slug);
      if (page && isTranslatable(page)) return [{ slug, href: localePath(code, `/${slug}/`), name: localizedLanding(page, code).name, emoji: page.emoji }];
      return [];
    }),
  }));
}
