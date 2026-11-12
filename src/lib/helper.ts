import { TOOLS, toolPath, type ToolLink } from './tools';
import { landingAsTools, landingPath } from './landing';
import { HELPER_EN } from '../i18n/helper/en';
import type { HelperText } from '../i18n/helper/types';

/**
 * "Ask the helper": plain words in, the right tool out. It is a keyword matcher, not an AI: it
 * runs in the page, sends nothing anywhere and never sees a picture. Pure functions so every
 * answer can be tested.
 */
export interface HelperTool {
  slug: string;
  href: string;
  name: string;
  emoji: string;
  summary: string;
}

export interface HelperLink {
  label: string;
  href: string;
}

export interface HelperReply {
  text: string;
  tools: HelperTool[];
  links: HelperLink[];
}

/**
 * Everything that changes with the language: the words, the names of the tools and where each one lives.
 * It is plain data so a translated page can hand it to the chat in the browser. English is the default.
 */
export interface HelperContext {
  text: HelperText;
  /** Name, summary and address of every tool and shortcut page, by slug, in the page's language. */
  items: Record<string, { name: string; summary: string; href: string }>;
  /** Where the answer links go. */
  links: { about: string; privacy: string; feedback: string; request: string; roadmap: string; support: string; settings: string; browse: string };
  /** True for a translated page: the translated names are matched as well as the English keywords. */
  translated: boolean;
}

const fillText = (text: string, values: Record<string, string | number>): string => text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));

/** The English context, built from the tool lists. */
export const ENGLISH_CONTEXT: HelperContext = {
  text: HELPER_EN,
  items: Object.fromEntries(
    [...TOOLS.map((t) => [t.slug, { name: t.name, summary: t.summary, href: toolPath(t.slug) }] as const), ...landingAsTools().map((t) => [t.slug, { name: t.name, summary: t.summary, href: landingPath(t.slug) }] as const)],
  ),
  links: { about: '/about/', privacy: '/privacy/', feedback: '/feedback/', request: '/request/', roadmap: '/roadmap/', support: '/support/', settings: '/settings/', browse: '/image-tools/' },
  translated: false,
};

export const STARTERS: readonly string[] = HELPER_EN.starters;

export const GREETING = HELPER_EN.greeting;

const SIZE_PAGES = [20, 50, 100, 200];

/** Words people use that our tool descriptions do not. Each maps to words that are in them. */
const SYNONYMS: Record<string, string> = {
  smaller: 'compress shrink reduce',
  small: 'compress shrink reduce',
  email: 'compress reduce',
  whatsapp: 'compress reduce',
  upload: 'compress resize',
  heavy: 'compress reduce',
  large: 'compress reduce',
  big: 'compress reduce',
  iphone: 'heic',
  apple: 'heic',
  heif: 'heic',
  passport: 'exam photo',
  signature: 'exam signature',
  form: 'exam',
  application: 'exam',
  avatar: 'circle round',
  profile: 'circle round',
  round: 'circle',
  copyright: 'watermark',
  logo: 'logo',
  caption: 'text',
  write: 'text',
  words: 'text',
  tiles: 'grid split',
  instagram: 'grid split',
  puzzle: 'grid split',
  mosaic: 'pixel',
  retro: 'pixel',
  brighter: 'adjust colours',
  darker: 'adjust colours',
  lighter: 'adjust colours',
  brighten: 'adjust colours',
  darken: 'adjust colours',
  frame: 'border',
  base64: 'base64',
  favicon: 'favicon',
  eyedropper: 'colour picker',
  location: 'exif metadata gps',
  gps: 'exif metadata',
  privacy: 'exif metadata',
  sideways: 'rotate',
  upside: 'rotate',
  mirror: 'flip rotate',
  scan: 'pdf',
  document: 'pdf',
};

const STOP = new Set(['from', 'a', 'an', 'the', 'my', 'me', 'i', 'to', 'of', 'for', 'and', 'or', 'it', 'is', 'in', 'on', 'this', 'that', 'want', 'need', 'how', 'can', 'do', 'make', 'get', 'with', 'please', 'help']);

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter((w) => w && !STOP.has(w));
}

/**
 * Each typed word, then the words it stands for. The synonyms are hand-picked and precise ("iphone"
 * means HEIC), so they are listed twice and count double. Without that, a loose word such as
 * "convert" would tie with them and push the right page out of the top three.
 */
function expand(ws: string[]): string[] {
  return ws.flatMap((w) => {
    const same = SYNONYMS[w]?.split(' ') ?? [];
    return [w, ...same, ...same];
  });
}

function asHelperTool(t: ToolLink, isShortcut: boolean, ctx: HelperContext = ENGLISH_CONTEXT): HelperTool {
  const item = ctx.items[t.slug];
  return {
    slug: t.slug,
    href: item?.href ?? (isShortcut ? landingPath(t.slug) : toolPath(t.slug)),
    name: item?.name ?? t.name,
    emoji: t.emoji,
    summary: item?.summary ?? t.summary,
  };
}

/** Score one tool for the words: a hit in the name counts most, then keywords, then the summary. */
export function scoreTool(tool: ToolLink, ws: string[]): number {
  const name = words(tool.name);
  const keys = words(tool.keywords);
  const sum = words(tool.summary);
  let score = 0;
  for (const w of ws) {
    const hit = (list: string[]) => list.some((x) => x === w || (w.length >= 3 && x.startsWith(w)));
    if (hit(name)) score += 3;
    else if (hit(keys)) score += 2;
    else if (hit(sum)) score += 1;
  }
  return score;
}

/** The best matches for a sentence, best first. Shortcuts rank with tools; ties keep the list order. */
export function matchTools(text: string, limit = 3, ctx: HelperContext = ENGLISH_CONTEXT): HelperTool[] {
  const ws = expand(words(text));
  if (ws.length === 0) return [];
  // On a translated page the translated name and summary count as well, so the visitor can type a tool's own name.
  const seen = (t: ToolLink): ToolLink => {
    const item = ctx.translated ? ctx.items[t.slug] : undefined;
    return item ? { ...t, name: `${t.name} ${item.name}`, summary: `${t.summary} ${item.summary}` } : t;
  };
  const candidates = [
    ...TOOLS.map((t) => ({ tool: seen(t), shortcut: false, slug: t.slug })),
    ...landingAsTools().map((t) => ({ tool: seen(t), shortcut: true, slug: t.slug })),
  ];
  return candidates
    .map((c, i) => ({ ...c, score: scoreTool(c.tool, ws), i }))
    .filter((c) => c.score >= 2)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((c) => asHelperTool({ ...c.tool, slug: c.slug }, c.shortcut, ctx));
}

/** "100kb", "under 150 KB", "50 kb" -> the number of KB, or null. */
export function kbTarget(text: string): number | null {
  const m = text.toLowerCase().match(/(\d{1,5})\s*(?:kb|k\b|kilobytes?)/);
  return m ? Number(m[1]) : null;
}

/** The ready-made page for a size: the largest one that still fits under it, or the smallest if none does. */
export function nearestSizePage(kb: number): number {
  const fits = SIZE_PAGES.filter((n) => n <= kb);
  return fits.length > 0 ? Math.max(...fits) : Math.min(...SIZE_PAGES);
}

const link = (label: string, href: string): HelperLink => ({ label, href });

/** The helper's answer to one message, in the language of the context (English by default). */
export function respond(message: string, ctx: HelperContext = ENGLISH_CONTEXT): HelperReply {
  const s = message.toLowerCase();
  const r = ctx.text.replies;
  const l = ctx.text.links;
  const none = (text: string, links: HelperLink[] = []): HelperReply => ({ text, tools: [], links });

  if (/^(hi|hello|hey|yo|hiya|namaste)\b/.test(s.trim())) return none(r.hi);
  if (/\b(safe|secure|trust|stored?|servers?|see my|keep my|uploaded|do you upload|is it private|are my)\b/.test(s)) {
    return none(r.safe, [link(l.howItWorks, ctx.links.about), link(l.privacy, ctx.links.privacy)]);
  }
  if (/(bug|broken|not working|doesn.?t work|error|problem|issue|crash|stuck|feedback)/.test(s)) return none(r.bug, [link(l.feedback, ctx.links.feedback)]);
  if (/(feature|suggest|wish|idea|missing|add a tool|request|can you add)/.test(s)) {
    return none(r.feature, [link(l.request, ctx.links.request), link(l.roadmap, ctx.links.roadmap)]);
  }
  if (/(donate|support|tip|coffee|sponsor)/.test(s)) return none(r.donate, [link(l.support, ctx.links.support)]);
  if (/(dark mode|theme|settings)/.test(s)) return none(r.settings, [link(l.settings, ctx.links.settings)]);

  // A size in KB points straight at the matching shortcut and says how to set any other size.
  const kb = kbTarget(s);
  if (kb !== null && kb > 0 && /(compress|smaller|reduce|shrink|size|under|below|less|kb|k\b)/.test(s)) {
    const n = nearestSizePage(kb);
    const slug = `compress-image-to-${n}kb`;
    const tool = landingAsTools().find((t) => t.slug === slug);
    if (tool) {
      const exact = n === kb;
      const resize = TOOLS.find((t) => t.slug === 'resize-image')!;
      const name = ctx.items[slug]?.name ?? tool.name;
      return {
        text: exact
          ? fillText(r.kbExact, { name, n, kb })
          : fillText(r.kbNear, { name, n, kb, resize: ctx.items['resize-image']?.name ?? resize.name }),
        tools: [asHelperTool(tool, true, ctx), ...(exact ? [] : [asHelperTool(resize, false, ctx)])],
        links: [],
      };
    }
  }

  const tools = matchTools(message, 3, ctx);
  if (tools.length > 0) {
    return { text: tools.length === 1 ? fillText(r.one, { name: tools[0]!.name }) : r.many, tools, links: [] };
  }
  return none(r.none, [link(l.browse, ctx.links.browse)]);
}
