/**
 * The master plan: every image tool we mean to build, 58 in 7 categories. The roadmap page, the
 * status page and the tests read it. The `id` is the page address (a meaningful keyword slug),
 * so a tool's URL is decided here, once, before it is built. A "live" entry must exist in
 * src/lib/tools.ts; a unit test checks that, and that the plan never drops below 50 tools.
 *
 * Status:  live = shipped | next = cheap and ready to build | soon = needs more work or a check
 *          first | later = waits on something (the AI tools need a security policy and legal pages)
 * Effort:  S = hours, M = about a day, L = several days
 * Engine:  browser = runs in the page | local-model = downloads a model once, then runs in the
 *          page | your-ai-key = the visitor pastes their own provider key (never sent to us)
 */
export type PlanStatus = 'live' | 'next' | 'soon' | 'later';
export type PlanEffort = 'S' | 'M' | 'L';
export type PlanEngine = 'browser' | 'local-model' | 'your-ai-key';

export interface PlanCategory {
  id: string;
  emoji: string;
  blurb: string;
}

export const PLAN_CATEGORIES: readonly PlanCategory[] = [
  { id: 'Shrink & resize', emoji: '🗜️', blurb: 'Make files smaller or the exact size a form asks for.' },
  { id: 'Edit & transform', emoji: '🎨', blurb: 'Crop, turn, adjust and combine pictures.' },
  { id: 'Add text & effects', emoji: '✨', blurb: 'Watermarks, captions, memes and creative effects.' },
  { id: 'Convert & combine', emoji: '🔁', blurb: 'Switch formats, make PDFs and GIFs, read text from pictures.' },
  { id: 'Privacy & cleanup', emoji: '🛡️', blurb: 'Remove hidden data, backgrounds and faces.' },
  { id: 'Create & design', emoji: '🧰', blurb: 'Signatures, QR codes, palettes and printable sheets.' },
  { id: 'AI tools', emoji: '🤖', blurb: 'Use your own AI key for describing, reading and generating images.' },
];

export interface PlannedTool {
  /** The page address: /<id>/. Lowercase words joined by hyphens, in the words people search. */
  id: string;
  emoji: string;
  title: string;
  summary: string;
  category: string;
  status: PlanStatus;
  effort: PlanEffort;
  engine: PlanEngine;
  /** Something to settle before or while building it. */
  check?: string;
}

const t = (
  id: string,
  emoji: string,
  title: string,
  summary: string,
  category: string,
  status: PlanStatus,
  effort: PlanEffort,
  engine: PlanEngine = 'browser',
  check?: string,
): PlannedTool => ({ id, emoji, title, summary, category, status, effort, engine, ...(check ? { check } : {}) });

const SHRINK = 'Shrink & resize';
const EDIT = 'Edit & transform';
const TEXT = 'Add text & effects';
const CONVERT = 'Convert & combine';
const PRIVACY = 'Privacy & cleanup';
const CREATE = 'Create & design';
const AI = 'AI tools';
const SPECS = 'Sizes must be read from official sources, each with a link and a date.';
const MODEL = 'Check the model licence allows commercial use before choosing one.';
const AI_FIRST = 'Needs a content-security policy and the legal pages first; test with a mock provider, then a real key.';

export const PLAN: readonly PlannedTool[] = [
  // ---- Shrink & resize (7) ----
  t('compress-image', '🗜️', 'Compress images', 'Make JPG, PNG and WebP files smaller without visible loss.', SHRINK, 'live', 'M'),
  t('resize-image', '📐', 'Resize images', 'Set exact pixels or a percentage, or shrink to a target size in KB.', SHRINK, 'live', 'M'),
  t('exam-photo-resizer', '🪪', 'Exam photo and signature resizer', 'Exact pixels and KB for exam forms, with requirements and sources.', SHRINK, 'live', 'M'),
  t('passport-photo-maker', '📷', 'Passport and visa photo maker', 'Crop to the right size for a passport or visa.', SHRINK, 'soon', 'M', 'browser', SPECS),
  t('social-media-image-resizer', '📱', 'Social media image resizer', 'Sizes for Instagram, YouTube, WhatsApp and more.', SHRINK, 'soon', 'M', 'browser', SPECS),
  t('pixel-to-cm-converter', '📏', 'Pixel, cm and inch converter', 'Convert between pixels, centimetres and inches at any DPI.', SHRINK, 'next', 'S'),
  t('aspect-ratio-calculator', '🧮', 'Aspect ratio calculator', 'Find the matching height or width for any ratio.', SHRINK, 'next', 'S'),

  // ---- Edit & transform (9) ----
  t('crop-image', '✂️', 'Crop images', 'Drag a box, pick a ratio like 1:1, or type exact pixels.', EDIT, 'live', 'L'),
  t('rotate-image', '🔄', 'Rotate and flip', 'Turn an image 90, 180 or 270 degrees, or mirror it.', EDIT, 'live', 'M'),
  t('adjust-image-colors', '🎚️', 'Adjust colours and filters', 'Brightness, contrast, saturation, black and white, sepia and more.', EDIT, 'next', 'M'),
  t('add-border-to-image', '🖼️', 'Add a border or frame', 'Put a coloured border or padding around a picture.', EDIT, 'next', 'S'),
  t('circle-crop-image', '⭕', 'Circle crop and round corners', 'Make a round profile picture or round the corners.', EDIT, 'live', 'S'),
  t('split-image-into-grid', '🧩', 'Split an image into a grid', 'Cut a picture into equal tiles for a grid post or a puzzle.', EDIT, 'live', 'S'),
  t('merge-images', '🪢', 'Merge images side by side', 'Join several pictures into one, in a row or a column.', EDIT, 'next', 'S'),
  t('compare-images', '↔️', 'Compare two images', 'Slide between a before and an after picture.', EDIT, 'next', 'S'),
  t('photo-editor', '🖌️', 'Online photo editor', 'Crop, turn, adjust and add text in one place.', EDIT, 'soon', 'L'),

  // ---- Add text & effects (7) ----
  t('add-watermark-to-image', '💧', 'Add a watermark', 'Put your name or a copyright line on a picture before you share it.', TEXT, 'live', 'M'),
  t('add-text-to-image', '🔠', 'Add text to an image', 'Write on a picture with any size, colour and position.', TEXT, 'live', 'M'),
  t('meme-maker', '😂', 'Meme maker', 'Top and bottom text on any picture.', TEXT, 'soon', 'M'),
  t('blur-image', '🌫️', 'Blur or hide parts of an image', 'Blur, pixelate or cover areas such as names and numbers.', TEXT, 'next', 'M'),
  t('pixel-art-maker', '👾', 'Pixel art maker', 'Turn a photo into chunky pixel art.', TEXT, 'live', 'S'),
  t('photo-to-sketch', '✏️', 'Photo to pencil sketch', 'Give a photo a pencil-drawing look.', TEXT, 'soon', 'M'),
  t('image-to-ascii-art', '🔣', 'Image to ASCII art', 'Draw a picture with text characters.', TEXT, 'next', 'S'),

  // ---- Convert & combine (10) ----
  t('convert-image', '🔁', 'Convert images', 'Open iPhone HEIC photos, switch between JPG, PNG and WebP, or make a PDF.', CONVERT, 'live', 'M'),
  t('image-to-pdf', '📄', 'Combine images into PDF', 'Put several images in one PDF and choose the page order.', CONVERT, 'live', 'M'),
  t('svg-to-png', '🧷', 'SVG to PNG', 'Turn an SVG drawing into a PNG of any size.', CONVERT, 'next', 'S'),
  t('png-to-svg', '🖋️', 'PNG to SVG', 'Trace a picture into a scalable vector drawing.', CONVERT, 'soon', 'M'),
  t('image-to-base64', '🧬', 'Image to Base64', 'Turn an image into text for code, and back.', CONVERT, 'next', 'S'),
  t('gif-maker', '🎞️', 'GIF maker', 'Make an animated GIF from several pictures.', CONVERT, 'soon', 'M'),
  t('gif-to-frames', '🎬', 'GIF to images', 'Save every frame of a GIF as a picture.', CONVERT, 'next', 'S'),
  t('favicon-generator', '⭐', 'Favicon generator', 'Make the icon files a website needs from one picture.', CONVERT, 'next', 'S'),
  t('image-to-text', '🔤', 'Image to text (OCR)', 'Copy the text out of a photo, a screenshot or a scan.', CONVERT, 'soon', 'M', 'browser', 'Large first download; self-host the engine and language files.'),
  t('collage-maker', '🗂️', 'Collage maker', 'Arrange several photos in a grid layout.', CONVERT, 'soon', 'L'),

  // ---- Privacy & cleanup (6) ----
  t('remove-exif-data', '🛡️', 'Remove EXIF data', 'Strip location, camera and date details before you share a photo.', PRIVACY, 'live', 'M'),
  t('view-exif-data', '🔎', 'View EXIF data', 'See what hidden details a photo carries before you share it.', PRIVACY, 'next', 'S'),
  t('blur-faces', '🙈', 'Blur faces', 'Find faces in a photo and blur them.', PRIVACY, 'soon', 'L', 'local-model', MODEL),
  t('remove-background', '🪄', 'Remove a background', 'Cut the subject out of a photo.', PRIVACY, 'soon', 'L', 'local-model', MODEL),
  t('make-background-transparent', '🫥', 'Make a background transparent', 'Turn a white or plain background transparent.', PRIVACY, 'next', 'S'),
  t('find-duplicate-images', '👯', 'Find duplicate images', 'Spot copies and near-copies in a folder of photos.', PRIVACY, 'soon', 'M'),

  // ---- Create & design (9) ----
  t('signature-maker', '✍️', 'Signature maker', 'Draw or type a signature and save it as a transparent PNG.', CREATE, 'next', 'M'),
  t('color-picker-from-image', '🎯', 'Colour picker from an image', 'Click a picture to get the exact colour code.', CREATE, 'next', 'S'),
  t('color-palette-generator', '🎨', 'Colour palette generator', 'Pull the main colours out of a picture.', CREATE, 'next', 'S'),
  t('placeholder-image-generator', '🧱', 'Placeholder image generator', 'Make a plain image of any size for a design or a test.', CREATE, 'next', 'S'),
  t('sticker-maker', '🏷️', 'Sticker maker', 'Cut out a subject and add an outline.', CREATE, 'soon', 'M', 'local-model', 'Needs the background remover first.'),
  t('id-photo-print-sheet', '🖨️', 'ID photo print sheet', 'Lay out passport photos on a 4x6 sheet to print.', CREATE, 'soon', 'M', 'browser', SPECS),
  t('document-scanner', '📑', 'Document scanner', 'Turn a photo of a page into a clean scan.', CREATE, 'soon', 'L'),
  t('qr-code-generator', '🔳', 'QR code generator', 'Make a QR code for a link, text or Wi-Fi.', CREATE, 'next', 'S'),
  t('qr-code-reader', '📲', 'QR code reader', 'Read a QR code from a picture.', CREATE, 'next', 'S'),

  // ---- AI tools with your own key (10) ----
  t('alt-text-generator', '♿', 'Alt text generator', 'Describe a picture in words for accessibility and search.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('handwriting-to-text', '📝', 'Handwriting to text', 'Read handwriting and hard scans with a vision model.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('ai-image-generator', '🪄', 'AI image generator', 'Make a picture from a description.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('ai-image-upscaler', '🔍', 'AI image upscaler', 'Make a small picture larger and sharper.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('remove-object-from-photo', '🧽', 'Remove an object from a photo', 'Erase something from a picture and fill the gap.', AI, 'later', 'L', 'your-ai-key', AI_FIRST),
  t('image-to-prompt', '💬', 'Image to prompt', 'Describe a picture as a prompt for an image generator.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('photo-caption-generator', '🏷️', 'Photo caption generator', 'Write captions and hashtags for a photo.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('translate-text-in-image', '🌐', 'Translate text in an image', 'Read the text in a picture and translate it.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
  t('ai-photo-editor', '🪞', 'AI photo editor', 'Change a photo by telling the AI what to do.', AI, 'later', 'L', 'your-ai-key', AI_FIRST),
  t('product-description-generator', '🛍️', 'Product description from a photo', 'Write a shop listing from a product picture.', AI, 'later', 'M', 'your-ai-key', AI_FIRST),
];

export const MIN_PLANNED_TOOLS = 50;

export function planByCategory(): { category: PlanCategory; tools: PlannedTool[] }[] {
  return PLAN_CATEGORIES.map((category) => ({ category, tools: PLAN.filter((p) => p.category === category.id) }));
}

export function planCounts(): Record<PlanStatus, number> & { total: number } {
  const counts = { live: 0, next: 0, soon: 0, later: 0, total: PLAN.length };
  for (const p of PLAN) counts[p.status]++;
  return counts;
}
