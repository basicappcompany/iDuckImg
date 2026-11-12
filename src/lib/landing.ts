/**
 * Landing pages: one page per thing people actually search for ("heic to jpg", "compress image to
 * 100kb"). Each one opens an existing tool with the options already set, and has its own short
 * guide and questions. The copy is written per page: do not paste one paragraph into all of them.
 * A unit test checks every slug is unique, never clashes with a tool or community page, and that
 * each page has real content.
 */
import { TOOLS, type ToolGroup, type ToolLink } from './tools';

export type LandingEngine = 'compress' | 'resize' | 'convert';

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingPage {
  slug: string;
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
  faqs: LandingFaq[];
  /** Slugs of tools or other landing pages to link to. */
  related: string[];
}

const KB_STEPS = (kb: number): string[] => [
  'Drop your JPG, PNG or WebP picture, or paste it from the clipboard.',
  `The target size is already set to ${kb} KB and the pixel size is kept as it is.`,
  'Press Resize. The tool tries different quality levels and keeps the best one that fits.',
  'Check the result size in the list, then download it.',
];

const kbPage = (kb: number, extra: string, who: string): LandingPage => ({
  slug: `compress-image-to-${kb}kb`,
  engine: 'resize',
  initial: { mode: 'percent', percent: 100, width: null, height: null, targetKb: kb, format: 'same' },
  emoji: '🗜️',
  h1: `Compress image to ${kb} KB`,
  title: `Compress image to ${kb}KB online free`,
  description: `Reduce a JPG, PNG or WebP photo to ${kb} KB or less, free, in your browser. No upload, no sign-up, no watermark.`,
  summary: `Shrink a photo to ${kb} KB or under, right in your browser.`,
  quick: `To compress an image to ${kb} KB, drop it in and press Resize: the target is already set to ${kb} KB, and the tool finds the highest quality that fits. It runs on your device, so the picture is never uploaded.`,
  steps: KB_STEPS(kb),
  notes: [
    extra,
    `${who} If the photo is very large, ${kb} KB may need a smaller pixel size as well as lower quality. In that case the tool tells you, and you can lower the width on the Resize images page and try again.`,
    'PNG is a lossless format, so it cannot be squeezed to an exact size by quality alone. A PNG with a target size is saved as WebP, which is much smaller. If a form insists on JPG, use the Convert images page first.',
  ],
  faqs: [
    {
      q: `How do I get a photo under ${kb} KB without it looking bad?`,
      a: `Leave the pixel size alone first. The tool lowers the JPG or WebP quality step by step until the file is ${kb} KB or less, which keeps the picture sharp for as long as possible. Only if that is not enough do you need to reduce the width as well.`,
    },
    {
      q: 'Is my picture uploaded anywhere?',
      a: 'No. The compression runs inside your browser tab. The file is not sent to our servers, so it also works for private photos and documents.',
    },
    {
      q: `The result is bigger than ${kb} KB. What now?`,
      a: `The picture has too many pixels for ${kb} KB at an acceptable quality. Open Resize images, set a smaller width (for example 800 pixels), keep the target at ${kb} KB and run it again.`,
    },
    {
      q: 'Does it work on my phone?',
      a: 'Yes. Tap the drop area to choose a photo from your gallery or take a new one. Many forms ask for a size limit, and phones usually produce files of several MB, so this is a common job.',
    },
  ],
  related: ['resize-image', 'compress-image', 'exam-photo-resizer', 'convert-image'],
});

const convertPage = (
  slug: string,
  from: string,
  to: string,
  target: 'jpeg' | 'png' | 'webp' | 'pdf',
  p: Pick<LandingPage, 'emoji' | 'notes' | 'faqs' | 'related'> & { why: string },
): LandingPage => ({
  slug,
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

export const LANDING_PAGES: readonly LandingPage[] = [
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
      'Colours and detail are kept at a high quality setting (90 by default). Live Photos are converted as a still picture. You can lower the quality in the options to make the files smaller.',
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
];

export function landingForSlug(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function landingPath(slug: string): string {
  return `/${slug}/`;
}

const PARENT_SLUG: Record<LandingEngine, string> = { compress: 'compress-image', resize: 'resize-image', convert: 'convert-image' };

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
