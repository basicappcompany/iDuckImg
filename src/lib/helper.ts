import { TOOLS, toolPath, type ToolLink } from './tools';
import { landingAsTools, landingPath } from './landing';

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

export const STARTERS: readonly string[] = [
  'Make a photo under 100 KB',
  'Open an iPhone photo on Windows',
  'Resize my photo for an exam form',
  'Make a round profile picture',
  'Put my name on photos',
  'Is my picture safe?',
];

export const GREETING = 'Hi, I am Duck 🦆 What do you want to do with your picture today?';

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
  location: 'exif metadata gps',
  gps: 'exif metadata',
  privacy: 'exif metadata',
  sideways: 'rotate',
  upside: 'rotate',
  mirror: 'flip rotate',
  scan: 'pdf',
  document: 'pdf',
};

const STOP = new Set(['a', 'an', 'the', 'my', 'me', 'i', 'to', 'of', 'for', 'and', 'or', 'it', 'is', 'in', 'on', 'this', 'that', 'want', 'need', 'how', 'can', 'do', 'make', 'get', 'with', 'please', 'help']);

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
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

function asHelperTool(t: ToolLink, isShortcut: boolean): HelperTool {
  return {
    slug: t.slug,
    href: isShortcut ? landingPath(t.slug) : toolPath(t.slug),
    name: t.name,
    emoji: t.emoji,
    summary: t.summary,
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
export function matchTools(text: string, limit = 3): HelperTool[] {
  const ws = expand(words(text));
  if (ws.length === 0) return [];
  const candidates = [
    ...TOOLS.map((t) => ({ tool: t, shortcut: false })),
    ...landingAsTools().map((t) => ({ tool: t, shortcut: true })),
  ];
  return candidates
    .map((c, i) => ({ ...c, score: scoreTool(c.tool, ws), i }))
    .filter((c) => c.score >= 2)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((c) => asHelperTool(c.tool, c.shortcut));
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

/** The helper's answer to one message. */
export function respond(message: string): HelperReply {
  const s = message.toLowerCase();
  const none = (text: string, links: HelperLink[] = []): HelperReply => ({ text, tools: [], links });

  if (/^(hi|hello|hey|yo|hiya|namaste)\b/.test(s.trim())) {
    return none('Hi! 🦆 Tell me what you want to do with your picture, like “make it smaller for email” or “turn HEIC into JPG”.');
  }
  if (/\b(safe|secure|trust|stored?|servers?|see my|keep my|uploaded|do you upload|is it private|are my)\b/.test(s)) {
    return none(
      'Every tool runs inside your browser tab, so your pictures are processed on your own device and are not uploaded to us. I only match your words to tools and never see your files.',
      [link('How it works', '/about/'), link('Privacy policy', '/privacy/')],
    );
  }
  if (/(bug|broken|not working|doesn.?t work|error|problem|issue|crash|stuck|feedback)/.test(s)) {
    return none('Sorry about that! Tell us what happened and which kind of picture it was, and we will look into it.', [
      link('Send feedback', '/feedback/'),
    ]);
  }
  if (/(feature|suggest|wish|idea|missing|add a tool|request|can you add)/.test(s)) {
    return none('We love ideas. Tell us what you wish this site could do.', [
      link('Request a feature', '/request/'),
      link('See the roadmap', '/roadmap/'),
    ]);
  }
  if (/(donate|support|tip|coffee|sponsor)/.test(s)) {
    return none('That is kind of you. The best help is telling a friend, and there are other ways too.', [link('Support iDuckImg', '/support/')]);
  }
  if (/(dark mode|theme|settings)/.test(s)) {
    return none('Theme and saved data live in Settings.', [link('Open Settings', '/settings/')]);
  }

  // A size in KB points straight at the matching shortcut and says how to set any other size.
  const kb = kbTarget(s);
  if (kb !== null && kb > 0 && /(compress|smaller|reduce|shrink|size|under|below|less|kb|k\b)/.test(s)) {
    const n = nearestSizePage(kb);
    const slug = `compress-image-to-${n}kb`;
    const tool = landingAsTools().find((t) => t.slug === slug);
    if (tool) {
      const exact = n === kb;
      return {
        text: exact
          ? `That is “Compress image to ${n} KB”. The target is already set, so just drop your picture in.`
          : `The closest ready-made page that fits is “Compress image to ${n} KB”. For exactly ${kb} KB, open Resize images and type ${kb} in the target size box.`,
        tools: [asHelperTool(tool, true), ...(exact ? [] : [asHelperTool(TOOLS.find((t) => t.slug === 'resize-image')!, false)])],
        links: [],
      };
    }
  }

  const tools = matchTools(message);
  if (tools.length > 0) {
    return { text: tools.length === 1 ? `That sounds like “${tools[0]!.name}”.` : 'These should do it. The first one is my best guess.', tools, links: [] };
  }
  return none('Hmm, I am not sure which tool that is. Try words like compress, resize, crop, rotate, HEIC, PDF, watermark or text. Or browse everything.', [
    link('Browse all image tools', '/image-tools/'),
  ]);
}
