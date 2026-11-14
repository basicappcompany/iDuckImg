/**
 * Landing pages: one page per thing people actually search for ("heic to jpg", "compress image to
 * 100kb"). Each one opens an existing tool with the options already set, and has its own short
 * guide and questions. The copy is written per page: do not paste one paragraph into all of them.
 * A unit test checks every slug is unique, never clashes with a tool or community page, and that
 * each page has real content.
 */
import { TOOLS, type ToolGroup, type ToolLink } from './tools';
import { EXAM_LANDING_PAGES } from './exam-landing';
import { RICH, type RichSection } from './landing-rich';
import { GROWTH_PAGES } from './landing-growth';
import { kbPage } from './landing-kb';

export type LandingEngine = 'compress' | 'resize' | 'convert' | 'exam' | 'text';

export interface LandingFaq {
  q: string;
  a: string;
}

/**
 * What a page is made of, so a translated version can be built from a per-language template instead of
 * being written page by page. English copy stays in this file; the other languages live in src/i18n/shortcuts.
 */
export type LandingKind =
  /** A page that exists in English only for now (a custom size, a minimum size, a size in MB). It has no translation templates. */
  | { kind: 'custom' }
  | { kind: 'kb'; kb: number }
  | { kind: 'convert'; from: string; to: string }
  | {
      kind: 'exam';
      /** Short exam name, such as "IBPS PO". */
      short: string;
      examName: string;
      docId: string;
      /** The requirements as shown, such as "200 x 230 px, 20 to 50 KB, JPG". */
      req: string;
      /** The requirements without the format, such as "200 x 230 px, 20 to 50 KB". */
      size: string;
      source: string;
      location: string;
      /** ISO date the notice was read. */
      retrieved: string;
      cycle: string;
    };

export interface LandingPage {
  slug: string;
  /** What the page is made of; used to build translated versions. */
  kind: LandingKind;
  engine: LandingEngine;
  /** Options handed to the tool component. */
  initial: Record<string, unknown>;
  emoji: string;
  /** The page heading, which is also the words people search for. */
  h1: string;
  /** <title>, under about 60 characters plus the brand. */
  title: string;
  description: string;
  /** One line under the heading. */
  summary: string;
  /** Answer-first sentence for the Quick answer box (and for AI answer engines). */
  quick: string;
  steps: string[];
  /** Plain paragraphs shown under the steps. */
  notes: string[];
  /** Longer explanation blocks (what the formats are, what changes, when to choose it). Format pages only. */
  sections?: RichSection[];
  faqs: LandingFaq[];
  /** Slugs of tools or other landing pages to link to. */
  related: string[];
}

const convertPage = (
  slug: string,
  from: string,
  to: string,
  target: 'jpeg' | 'png' | 'webp' | 'pdf',
  p: Pick<LandingPage, 'emoji' | 'notes' | 'faqs' | 'related'> & { why: string },
): LandingPage => ({
  slug,
  kind: { kind: 'convert', from, to },
  engine: 'convert',
  initial: { target },
  emoji: p.emoji,
  h1: `${from} to ${to} converter`,
  title: `${from} to ${to}: free online converter`,
  description: `Convert ${from} to ${to} free in your browser. No upload, no sign-up, no watermark. Works on phones and computers.`,
  summary: `Turn ${from} files into ${to} in a few seconds.`,
  quick: `To convert ${from} to ${to}, drop your ${from} files in, check that the format says ${to}, and press Convert. ${p.why} It happens in your browser, so nothing is uploaded.`,
  steps: [
    `Drop your ${from} files, or tap the area to choose them. You can add many at once.`,
    `The output format is already set to ${to}.`,
    'Press Convert.',
    'Download each file, or all of them in one ZIP.',
  ],
  notes: p.notes,
  faqs: p.faqs,
  related: p.related,
});

const BASE_PAGES: readonly LandingPage[] = [
  kbPage(
    100,
    'A limit of 100 KB is the most common one on job, bank and government forms, so this is the page most people want.',
    'Photos from a phone are often 3 to 8 MB.',
  ),
  kbPage(
    50,
    'Fifty KB is typical for signature and thumb impression uploads, which are small and mostly white, so they shrink easily.',
    'A cropped signature usually goes under 50 KB without any visible change.',
  ),
  kbPage(
    200,
    'Two hundred KB is a common limit for passport-style photos and ID uploads, where a little more detail is kept.',
    'A normal photo at its full size often needs only a quality drop to get there.',
  ),
  kbPage(
    20,
    'Twenty KB is a strict limit used by a few forms for signatures. It is small, so a smaller pixel size usually helps as well.',
    'This is the hardest of the common limits.',
  ),

  convertPage('heic-to-jpg', 'HEIC', 'JPG', 'jpeg', {
    emoji: '📱',
    why: 'HEIC is the format iPhones use by default, and JPG opens on every device and website.',
    notes: [
      'HEIC (also written HEIF) is the photo format that iPhones and some Android phones save by default. It makes smaller files, but Windows, many websites and most upload forms cannot open it. JPG is the format that works everywhere.',
      'Colors and detail are kept at a high quality setting (90 by default). Live Photos are converted as a still picture. You can lower the quality in the options to make the files smaller.',
    ],
    faqs: [
      {
        q: 'Why will my iPhone photo not upload?',
        a: 'The photo is saved as HEIC, and many sites only accept JPG or PNG. Convert it to JPG here and upload the result. You can also change the iPhone setting to Most Compatible under Settings, Camera, Formats.',
      },
      {
        q: 'Does converting HEIC to JPG lose quality?',
        a: 'JPG is a lossy format, so a very small amount of detail is lost. At the default quality of 90 the difference is not visible for normal photos. Raise the quality to 100 if you want to be extra careful, at the cost of a bigger file.',
      },
      {
        q: 'Is it safe to convert private photos here?',
        a: 'The conversion runs inside your browser, so the photos are not uploaded to our servers.',
      },
      {
        q: 'Can I convert many HEIC photos at once?',
        a: 'Yes. Add as many as your device can handle, and download them together as a ZIP.',
      },
    ],
    related: ['convert-image', 'heic-to-png', 'compress-image-to-100kb', 'image-to-pdf'],
  }),
  convertPage('heic-to-png', 'HEIC', 'PNG', 'png', {
    emoji: '📱',
    why: 'PNG keeps every pixel exactly as it is and opens everywhere.',
    notes: [
      'Choose PNG when you want no loss at all, for example before editing a picture again. PNG files are larger than JPG, often several times larger for photos.',
      'If you only need a picture to share or upload, JPG is smaller. See HEIC to JPG.',
    ],
    faqs: [
      {
        q: 'Should I pick PNG or JPG for an iPhone photo?',
        a: 'JPG is smaller and fine for sharing. PNG is exact but big. Pick PNG only if you will edit the picture further or need transparency preserved.',
      },
      {
        q: 'Why is the PNG so much bigger than the HEIC?',
        a: 'HEIC compresses photos very efficiently. PNG does not throw detail away, so it stores far more data.',
      },
    ],
    related: ['heic-to-jpg', 'convert-image', 'compress-image'],
  }),
  convertPage('png-to-jpg', 'PNG', 'JPG', 'jpeg', {
    emoji: '🖼️',
    why: 'JPG files are usually much smaller than PNG for photos.',
    notes: [
      'JPG cannot store transparency. Any see-through area of a PNG becomes white after conversion, so keep the PNG if you need a transparent background.',
      'Use PNG for logos, screenshots and graphics with sharp edges, and JPG for photos. Turning a photo from PNG into JPG often cuts the size by 70 to 90 percent.',
    ],
    faqs: [
      {
        q: 'What happens to a transparent background?',
        a: 'It becomes white. JPG has no transparency.',
      },
      {
        q: 'Will the JPG look worse?',
        a: 'At quality 90 the difference is hard to see in photos. Screenshots with small text can show slight blur around letters, so use a higher quality or keep those as PNG.',
      },
      {
        q: 'Can I choose how small the file is?',
        a: 'Yes. Lower the quality in the options, or use Compress image to 100 KB if you need a specific size.',
      },
    ],
    related: ['jpg-to-png', 'compress-image-to-100kb', 'convert-image', 'png-to-pdf'],
  }),
  convertPage('jpg-to-png', 'JPG', 'PNG', 'png', {
    emoji: '🖼️',
    why: 'PNG is lossless, so it is a safe format to edit and save again.',
    notes: [
      'Converting a JPG to PNG does not bring back detail the JPG already lost, and the file usually gets bigger. It is useful when a program or site asks for PNG, or when you want to stop adding new JPG compression each time you save.',
      'A PNG made from a JPG has no transparent areas. To make a background transparent you need a background remover, which is on our roadmap.',
    ],
    faqs: [
      {
        q: 'Why did my file get bigger?',
        a: 'PNG stores every pixel without throwing detail away, while JPG does. For photos, a PNG is commonly 3 to 10 times larger.',
      },
      {
        q: 'Does it make the picture sharper?',
        a: 'No. It keeps exactly what the JPG showed. It cannot restore lost detail.',
      },
    ],
    related: ['png-to-jpg', 'convert-image', 'compress-image'],
  }),
  convertPage('webp-to-jpg', 'WebP', 'JPG', 'jpeg', {
    emoji: '🌐',
    why: 'JPG opens in every program, while some editors and forms still reject WebP.',
    notes: [
      'WebP is a modern format used by many websites, and when you save an image from a page you often get a .webp file that older software cannot open. JPG works everywhere.',
      'If the WebP has transparent areas they become white in the JPG. Use WebP to PNG to keep transparency.',
    ],
    faqs: [
      {
        q: 'Why did my downloaded image save as WebP?',
        a: 'Many sites serve WebP because it is smaller, and your browser saves what it received. Converting it to JPG makes it usable in more places.',
      },
      {
        q: 'Can I keep the transparent background?',
        a: 'Not in JPG. Convert to PNG instead: see WebP to PNG.',
      },
    ],
    related: ['webp-to-png', 'jpg-to-webp', 'convert-image'],
  }),
  convertPage('webp-to-png', 'WebP', 'PNG', 'png', {
    emoji: '🌐',
    why: 'PNG keeps transparency and opens in every editor.',
    notes: [
      'PNG keeps any transparent background that the WebP had. It is the right choice for logos, stickers and graphics.',
      'The PNG will be larger than the WebP, since WebP compresses better.',
    ],
    faqs: [
      {
        q: 'Is the transparent background kept?',
        a: 'Yes, PNG supports transparency and the converted file keeps it.',
      },
      {
        q: 'Why is the PNG bigger?',
        a: 'WebP is more efficient. A PNG of the same picture can be several times larger.',
      },
    ],
    related: ['webp-to-jpg', 'png-to-jpg', 'convert-image'],
  }),
  convertPage('jpg-to-webp', 'JPG', 'WebP', 'webp', {
    emoji: '⚡',
    why: 'WebP is typically 25 to 35 percent smaller than JPG at similar quality, which makes pages load faster.',
    notes: [
      'Use WebP for pictures you put on a website: smaller files load faster, which helps both visitors and search rankings. All current browsers show WebP.',
      'Some older software and many upload forms still ask for JPG, so keep your original JPG too.',
    ],
    faqs: [
      {
        q: 'How much smaller will the WebP be?',
        a: 'Usually 25 to 35 percent smaller than the JPG at a similar look. It depends on the picture.',
      },
      {
        q: 'Will it work on every site?',
        a: 'All current browsers display WebP, but some forms and older programs only accept JPG or PNG.',
      },
    ],
    related: ['png-to-webp', 'compress-image', 'webp-to-jpg'],
  }),
  convertPage('png-to-webp', 'PNG', 'WebP', 'webp', {
    emoji: '⚡',
    why: 'WebP is much smaller than PNG and can keep transparency.',
    notes: [
      'WebP can keep a transparent background like PNG does, and the files are usually far smaller, which is good for web pages.',
      'The conversion is lossy at the quality you choose. For a pixel-exact copy, keep the PNG.',
    ],
    faqs: [
      {
        q: 'Is the transparent background kept?',
        a: 'Yes. WebP supports transparency.',
      },
      {
        q: 'How much smaller is it?',
        a: 'Often 50 to 80 percent smaller than the PNG for photos. Flat graphics also shrink, but less.',
      },
    ],
    related: ['jpg-to-webp', 'compress-image', 'png-to-jpg'],
  }),
  convertPage('jpg-to-pdf', 'JPG', 'PDF', 'pdf', {
    emoji: '📄',
    why: 'Each picture becomes one PDF page, with the page the same size as the picture.',
    notes: [
      'Converting a JPG to PDF is useful when a form wants a PDF, or when you want to email a scan or a photo of a document. Every image becomes its own PDF.',
      'To put several pictures into one PDF, use Combine images into PDF, which also lets you choose the order and an A4 page.',
    ],
    faqs: [
      {
        q: 'How do I put many JPGs in one PDF?',
        a: 'Use Combine images into PDF. Add all the pictures, put them in order, and press Create PDF.',
      },
      {
        q: 'Does the PDF keep the picture quality?',
        a: 'The picture keeps its full pixel size. It is saved into the PDF as a high-quality JPG (quality 92), so it looks the same to the eye.',
      },
      {
        q: 'Is it uploaded?',
        a: 'No. The PDF is created in your browser.',
      },
    ],
    related: ['image-to-pdf', 'png-to-pdf', 'compress-image'],
  }),
  convertPage('png-to-pdf', 'PNG', 'PDF', 'pdf', {
    emoji: '📄',
    why: 'Each picture becomes one PDF page.',
    notes: [
      'Screenshots and scans saved as PNG can be turned into a PDF to send or print. Each image becomes its own PDF, with the page the size of the image.',
      'Want several screenshots in one PDF? Use Combine images into PDF and choose the order.',
    ],
    faqs: [
      {
        q: 'Can I make one PDF from many PNG files?',
        a: 'Yes, with Combine images into PDF.',
      },
      {
        q: 'Is transparency kept?',
        a: 'The PDF page is white, so a transparent area shows as white.',
      },
    ],
    related: ['image-to-pdf', 'jpg-to-pdf', 'png-to-jpg'],
  }),
  convertPage('avif-to-jpg', 'AVIF', 'JPG', 'jpeg', {
    emoji: '🖼️',
    why: 'JPG opens everywhere, including forms, editors and older phones that cannot show AVIF.',
    notes: [
      'AVIF is a newer format that many sites and phones now save pictures in. It makes small files, but a lot of upload forms, editors and older programs still ask for JPG.',
      'Reading AVIF needs a browser that supports it: current Chrome, Edge, Firefox and Safari 16.4 or later do. If yours does not, the tool says so instead of failing silently.',
      'JPG has no transparency, so a see-through area becomes white.',
    ],
    faqs: [
      {
        q: 'Why will my site or form not take an AVIF?',
        a: 'AVIF is newer than JPG and PNG, and many upload forms only list the older formats. Converting to JPG fixes that.',
      },
      {
        q: 'Will the JPG look the same?',
        a: 'Very close. JPG is saved at high quality, but any conversion between lossy formats can lose a little fine detail.',
      },
      {
        q: 'Does it say AVIF is not supported?',
        a: 'Only if your browser cannot open AVIF. Update it, or try another current browser.',
      },
    ],
    related: ['avif-to-png', 'webp-to-jpg', 'convert-image'],
  }),
  convertPage('avif-to-png', 'AVIF', 'PNG', 'png', {
    emoji: '🖼️',
    why: 'PNG opens in every editor and keeps any transparent background.',
    notes: [
      'PNG keeps a transparent background, which is why it is the right choice for logos and stickers saved as AVIF.',
      'The PNG will be much larger than the AVIF, since AVIF compresses far better.',
    ],
    faqs: [
      {
        q: 'Why is the PNG so much bigger?',
        a: 'AVIF is one of the most efficient formats. A lossless PNG of the same picture can be ten times larger.',
      },
      {
        q: 'Is the transparent background kept?',
        a: 'Yes. PNG supports transparency and the converted file keeps it.',
      },
    ],
    related: ['avif-to-jpg', 'webp-to-png', 'convert-image'],
  }),
  convertPage('svg-to-png', 'SVG', 'PNG', 'png', {
    emoji: '✏️',
    why: 'PNG is a normal picture that any program, form or social site accepts, and it keeps the transparent background.',
    notes: [
      'An SVG is a drawing described by shapes, so it has no fixed pixel size. It is drawn here at least 1024 pixels on its longer side (and at most 4096), keeping its proportions, so the PNG is sharp.',
      'If you need an exact size, convert here first, then use Resize images to set the pixels you want.',
      'The SVG is drawn like a picture, so scripts inside it do not run and nothing is fetched from other sites. Fonts the SVG expects but that are not inside the file may be drawn in a plain fallback font.',
    ],
    faqs: [
      {
        q: 'What size will the PNG be?',
        a: 'The SVG is drawn at its own proportions with the longer side at least 1024 pixels. Use Resize images afterwards for an exact size.',
      },
      {
        q: 'Is the background transparent?',
        a: 'Yes, unless the SVG draws its own background.',
      },
      {
        q: 'Is my SVG uploaded?',
        a: 'No. It is drawn in your browser and never leaves your device.',
      },
    ],
    related: ['svg-to-jpg', 'resize-image', 'convert-image'],
  }),
  convertPage('svg-to-jpg', 'SVG', 'JPG', 'jpeg', {
    emoji: '✏️',
    why: 'JPG is a small, universal photo format, and the SVG is drawn sharp before it is saved.',
    notes: [
      'JPG has no transparency, so any see-through area of the SVG becomes white. If you need to keep it, use SVG to PNG instead.',
      'An SVG has no fixed pixel size. It is drawn at least 1024 pixels on its longer side, keeping its proportions.',
    ],
    faqs: [
      {
        q: 'Why is the background white?',
        a: 'JPG cannot be see-through, so transparent areas are filled with white. SVG to PNG keeps them transparent.',
      },
      {
        q: 'Can I choose the size?',
        a: 'Convert first, then use Resize images to set exact pixels or a file size in KB.',
      },
    ],
    related: ['svg-to-png', 'resize-image', 'png-to-jpg'],
  }),
  convertPage('bmp-to-jpg', 'BMP', 'JPG', 'jpeg', {
    emoji: '🗂️',
    why: 'A BMP is stored uncompressed, so the JPG is usually a small fraction of its size.',
    notes: [
      'BMP is an old Windows format that stores every pixel without compression, so the files are very large. A JPG of the same picture is often 90 percent smaller.',
      'JPG has no transparency, so any see-through area becomes white.',
    ],
    faqs: [
      {
        q: 'How much smaller will it be?',
        a: 'Usually a lot: BMP is uncompressed, so a JPG is often a tenth of the size or less.',
      },
      {
        q: 'Do I lose quality?',
        a: 'JPG is lossy, but it is saved at high quality, so the change is hard to see on a photo.',
      },
    ],
    related: ['compress-image', 'png-to-jpg', 'convert-image'],
  }),
  convertPage('gif-to-png', 'GIF', 'PNG', 'png', {
    emoji: '🎞️',
    why: 'You get a sharp still picture of the GIF that keeps any transparent background.',
    notes: [
      'This makes a still picture. A GIF that moves keeps only its first frame, so the PNG does not animate.',
      'GIF can only show 256 colors, and PNG keeps them exactly. The PNG may be larger than the GIF for a simple graphic.',
    ],
    faqs: [
      {
        q: 'Does the animation stay?',
        a: 'No. Only the first frame is saved, as a still PNG.',
      },
      {
        q: 'Is the transparent background kept?',
        a: 'Yes. A transparent GIF becomes a transparent PNG.',
      },
    ],
    related: ['png-to-jpg', 'compress-image', 'convert-image'],
  }),
  ...EXAM_LANDING_PAGES,
  ...GROWTH_PAGES,
];

/** Format pages get their own copy from landing-rich.ts: titles, summaries, steps, explanations and extra questions. */
export const LANDING_PAGES: readonly LandingPage[] = BASE_PAGES.map((page) => {
  const rich = RICH[page.slug];
  if (!rich) return page;
  const { moreFaqs, ...copy } = rich;
  return { ...page, ...copy, faqs: [...page.faqs, ...moreFaqs] };
});

/** Pages with translation templates. A 'custom' page is English only, so it is left out of every translated site. */
export function isTranslatable(page: LandingPage): boolean {
  return page.kind.kind !== 'custom';
}

export function landingForSlug(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function landingPath(slug: string): string {
  return `/${slug}/`;
}

const PARENT_SLUG: Record<LandingEngine, string> = {
  compress: 'compress-image',
  resize: 'resize-image',
  convert: 'convert-image',
  exam: 'exam-photo-resizer',
  text: 'add-text-to-image',
};

/** The tool this page opens (its "parent"). */
export function landingParent(page: LandingPage): ToolLink {
  return TOOLS.find((t) => t.slug === PARENT_SLUG[page.engine])!;
}

/** Shortcuts sit in the same group as the tool they open, so they appear next to it. */
export function landingGroup(page: LandingPage): ToolGroup {
  return landingParent(page).group;
}

export function landingName(page: LandingPage): string {
  return page.h1.replace(' converter', '');
}

export function landingsInGroup(group: ToolGroup): LandingPage[] {
  return LANDING_PAGES.filter((p) => landingGroup(p) === group);
}

/** Shortcuts in the shape of a tool, so search and card lists can treat them the same. */
export function landingAsTools(): ToolLink[] {
  return LANDING_PAGES.map((p) => ({
    slug: p.slug,
    name: landingName(p),
    summary: p.summary,
    group: landingGroup(p),
    emoji: p.emoji,
    quick: p.quick,
    keywords: p.slug.replace(/-/g, ' '),
  }));
}
