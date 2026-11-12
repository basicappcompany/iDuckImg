/**
 * Every live tool, in the order shown in the sidebar and on the homepage (grouped). Add a tool
 * here when its page ships; the homepage, the sidebar, search and the "More in this group"
 * block on each tool page all read this list.
 */
export const TOOL_GROUPS = ['Shrink & resize', 'Edit & transform', 'Add text & effects', 'Convert & combine', 'Privacy & cleanup'] as const;
export type ToolGroup = (typeof TOOL_GROUPS)[number];

export interface ToolLink {
  /** Page file name under src/pages, also the URL path. */
  slug: string;
  name: string;
  /** One line shown on cards and under the page title. */
  summary: string;
  group: ToolGroup;
  emoji: string;
  /** Answer-first sentence shown at the top of the tool page. */
  quick: string;
  /** Extra words people might search for, so "heic" finds the converter. */
  keywords: string;
}

export const TOOLS: readonly ToolLink[] = [
  {
    slug: 'compress-image',
    name: 'Compress images',
    summary: 'Make JPG, PNG and WebP files smaller without visible loss.',
    group: 'Shrink & resize',
    emoji: '📦',
    quick:
      'To compress an image, drop it in, choose a quality (around 75 looks the same for most photos) and press Compress. You get a smaller file in the same format, made in your browser tab.',
    keywords: 'reduce size smaller shrink optimise optimize jpg jpeg png webp kb mb',
  },
  {
    slug: 'resize-image',
    name: 'Resize images',
    summary: 'Set exact pixels or a percentage, or shrink to a target size in KB.',
    group: 'Shrink & resize',
    emoji: '📐',
    quick:
      'To resize an image, set a width or height in pixels, or a percentage, then press Resize. Need a specific file size? Type a target in KB and the tool finds the best quality that fits.',
    keywords: 'dimensions pixels percent scale width height target kb 100kb 50kb',
  },
  {
    slug: 'crop-image',
    name: 'Crop images',
    summary: 'Drag a box, pick a ratio like 1:1, or type exact pixels.',
    group: 'Edit & transform',
    emoji: '✂️',
    quick:
      'To crop an image, drag the box over the part you want to keep, or type exact pixels, then press Crop. Pick a shape such as 1:1 or 16:9 to lock the proportions.',
    keywords: 'cut trim square aspect ratio frame',
  },
  {
    slug: 'add-watermark-to-image',
    name: 'Add a watermark',
    summary: 'Put your name or a copyright line on a picture before you share it.',
    group: 'Add text & effects',
    emoji: '💧',
    quick:
      'To add a watermark, drop your pictures in, type the text, choose where it goes and how see-through it is, then press Add watermark. The text is drawn in your browser, so nothing is uploaded.',
    keywords: 'text copyright name stamp protect brand overlay mark photo',
  },
  {
    slug: 'add-logo-to-image',
    name: 'Add a logo to pictures',
    summary: 'Put your logo on a picture, or on many at once, before you share it.',
    group: 'Add text & effects',
    emoji: '🏷️',
    quick:
      'To add a logo, drop your pictures in, choose your logo file, pick the position, size and see-through level, then press Add logo. Both files stay on your device.',
    keywords: 'logo brand image watermark stamp overlay company business photo transparent png',
  },
  {
    slug: 'exam-photo-resizer',
    name: 'Exam photo and signature resizer',
    summary: 'Exact pixels and KB for exam forms, with requirements and sources.',
    group: 'Shrink & resize',
    emoji: '🪪',
    quick:
      'To get a photo or signature ready for an exam form, pick the exam and the document, drop your picture, and download a JPG with the exact pixel size and file size range. The requirements come from official notices, each with a link.',
    keywords: 'ssc ibps passport photo signature thumb impression declaration upload form application bank',
  },
  {
    slug: 'convert-image',
    name: 'Convert images',
    summary: 'Open iPhone HEIC photos, switch between JPG, PNG and WebP, or make a PDF.',
    group: 'Convert & combine',
    emoji: '🔁',
    quick:
      'To convert an image, drop it in, choose JPG, PNG, WebP or PDF and press Convert. iPhone HEIC photos work too, so you can turn them into JPG files that open anywhere.',
    keywords: 'heic heif iphone jpg jpeg png webp pdf format change',
  },
  {
    slug: 'image-to-pdf',
    name: 'Combine images into PDF',
    summary: 'Put several images in one PDF and choose the page order.',
    group: 'Convert & combine',
    emoji: '📄',
    quick:
      'To make one PDF from several images, add them, put them in order with Up and Down, choose A4 or image-size pages, and press Create PDF.',
    keywords: 'merge join pdf pages photos scan document',
  },
  {
    slug: 'rotate-image',
    name: 'Rotate and flip',
    summary: 'Turn an image 90, 180 or 270 degrees, or mirror it.',
    group: 'Edit & transform',
    emoji: '🔄',
    quick:
      'To rotate or flip an image, drop it in, use the buttons until the preview looks right, and press Apply. The same change is applied to every image you add.',
    keywords: 'turn mirror sideways upside down orientation',
  },
  {
    slug: 'remove-exif-data',
    name: 'Remove EXIF data',
    summary: 'Strip location, camera and date details before you share a photo.',
    group: 'Privacy & cleanup',
    emoji: '🛡️',
    quick:
      'To remove location and camera details from a photo, drop it in and press Remove metadata. The picture is not recompressed, so quality stays the same.',
    keywords: 'metadata gps location privacy strip clean exif iptc xmp',
  },
  {
    slug: 'circle-crop-image',
    name: 'Circle crop and round corners',
    summary: 'Make a round profile picture or round the corners of any picture.',
    group: 'Edit & transform',
    emoji: '⭕',
    quick:
      'To make a picture round, drop it in, choose Circle or Rounded corners and press Make it round. You get a PNG with see-through corners, made in your browser.',
    keywords: 'round circle profile avatar picture rounded corners rounded oval',
  },
  {
    slug: 'split-image-into-grid',
    name: 'Split an image into a grid',
    summary: 'Cut a picture into equal tiles for a grid post or a puzzle.',
    group: 'Edit & transform',
    emoji: '🧩',
    quick:
      'To split a picture into tiles, drop it in, choose the number of rows and columns and press Split. You get one file per tile, numbered row by row, and all of them in one ZIP.',
    keywords: 'cut tiles pieces parts puzzle instagram grid 3x3 divide slice',
  },
  {
    slug: 'add-text-to-image',
    name: 'Add text to an image',
    summary: 'Write on a picture with any size, colour and position.',
    group: 'Add text & effects',
    emoji: '🔠',
    quick:
      'To add text to a picture, drop it in, type your words, choose where they go, how big and what colour, then press Add text. It is drawn in your browser, so nothing is uploaded.',
    keywords: 'write caption words label type font quote meme overlay',
  },
  {
    slug: 'pixel-art-maker',
    name: 'Pixel art maker',
    summary: 'Turn a photo into chunky pixel art.',
    group: 'Add text & effects',
    emoji: '👾',
    quick:
      'To turn a photo into pixel art, drop it in, set how many big pixels go across with the slider and press Make pixel art. You get a PNG at the same size, with sharp edges.',
    keywords: 'pixelate pixelated 8-bit retro game mosaic blocky',
  },
  {
    slug: 'merge-images',
    name: 'Merge images side by side',
    summary: 'Join several pictures into one, in a row or a column.',
    group: 'Edit & transform',
    emoji: '🪢',
    quick:
      'To join pictures, drop two or more in, put them in order, choose side by side or stacked, and press Join pictures. You get one picture, made in your browser.',
    keywords: 'combine join stitch collage side by side stack vertical horizontal before after',
  },
  {
    slug: 'blur-image',
    name: 'Blur or hide parts of an image',
    summary: 'Blur, pixelate or cover areas such as names and numbers.',
    group: 'Add text & effects',
    emoji: '🌫️',
    quick:
      'To hide part of a picture, drop it in, drag a box over the name, number or face, choose Blur, Pixelate or Cover, and press the button. The new picture is made in your browser.',
    keywords: 'censor redact hide face number name privacy pixelate cover mask obscure',
  },
];

export function toolPath(slug: string): string {
  return `/${slug}/`;
}

function normalise(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/** The tool whose page is at this URL path, if any. */
export function toolForPath(path: string): ToolLink | undefined {
  const p = normalise(path);
  return TOOLS.find((t) => toolPath(t.slug) === p);
}

/** The other tools in the same group as `tool`, for "More in this group". */
export function groupMates(tool: ToolLink): ToolLink[] {
  return TOOLS.filter((t) => t.group === tool.group && t.slug !== tool.slug);
}

/** The other tools, for places that list everything but the current page. */
export function otherTools(currentPath: string): ToolLink[] {
  const p = normalise(currentPath);
  return TOOLS.filter((t) => toolPath(t.slug) !== p);
}

export function toolsInGroup(group: ToolGroup): ToolLink[] {
  return TOOLS.filter((t) => t.group === group);
}

/**
 * Words to match against. Every word the user typed must appear somewhere in the tool's name,
 * summary or keywords (as the start of a word), so "heic" finds the converter and "pdf com" finds
 * the PDF combiner. An empty query matches everything.
 */
export function searchTools(query: string, tools: readonly ToolLink[] = TOOLS): ToolLink[] {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (words.length === 0) return [...tools];
  return tools.filter((t) => {
    const haystack = `${t.name} ${t.summary} ${t.keywords}`.toLowerCase().split(/[^a-z0-9]+/);
    return words.every((w) => haystack.some((h) => h.startsWith(w)));
  });
}
