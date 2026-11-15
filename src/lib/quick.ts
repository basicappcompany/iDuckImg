import { TOOLS, toolPath } from './tools';
import { LANDING_PAGES, landingName, landingPath } from './landing';
import { EXAM_LANDING_PAGES } from './exam-landing';

/**
 * The "Quick tools" at the top of the sidebar: the jobs people come for most, in a few
 * sub-categories that open and close. Every shortcut page (landing page) belongs to exactly one
 * sub-category, and a few of the main tools are listed here too so the whole popular set is in one
 * place. A unit test fails if a slug stops existing or a shortcut is missing. The grouping is
 * chosen from experience of what people search for, not measured traffic: change it when Search
 * Console shows what really gets used.
 */
export interface QuickGroupDef {
  id: string;
  name: string;
  emoji: string;
  slugs: readonly string[];
}

export const QUICK_GROUPS: readonly QuickGroupDef[] = [
  {
    id: 'compress',
    name: 'Compress & resize',
    emoji: '📦',
    slugs: [
      'compress-image',
      'resize-image',
      'compress-image-to-100kb',
      'compress-image-to-50kb',
      'compress-image-to-200kb',
      'compress-image-to-20kb',
      'compress-image-to-10kb',
      'compress-image-to-15kb',
      'compress-image-to-30kb',
      'compress-image-to-40kb',
      'compress-image-to-150kb',
      'compress-image-to-300kb',
      'compress-image-to-500kb',
      'bulk-resize-images',
      'compress-image-to-1mb',
      'compress-image-to-2mb',
    ],
  },
  {
    id: 'convert',
    name: 'Convert a format',
    emoji: '🔁',
    slugs: [
      'heic-to-jpg',
      'heic-to-png',
      'png-to-jpg',
      'jpg-to-png',
      'webp-to-jpg',
      'webp-to-png',
      'jpg-to-webp',
      'png-to-webp',
    ],
  },
  {
    id: 'other',
    name: 'Open other formats',
    emoji: '🖼️',
    slugs: ['avif-to-jpg', 'avif-to-png', 'svg-to-png', 'svg-to-jpg', 'bmp-to-jpg', 'gif-to-png'],
  },
  {
    id: 'pdf',
    name: 'Make a PDF',
    emoji: '📄',
    slugs: ['jpg-to-pdf', 'png-to-pdf', 'image-to-pdf'],
  },
  {
    id: 'forms',
    name: 'Photos for forms',
    emoji: '🪪',
    slugs: [
      'exam-photo-resizer',
      ...EXAM_LANDING_PAGES.map((p) => p.slug),
      'increase-image-size-in-kb',
      'resize-signature-10-20kb',
      'resize-image-to-35x45-mm',
      'resize-image-to-2x2-inch',
      'resize-image-to-200x230-px',
      'passport-size-photo',
      'add-name-and-date-to-photo',
      'remove-exif-data',
      'blur-image',
    ],
  },
  {
    id: 'edit',
    name: 'Quick edits',
    emoji: '✂️',
    slugs: [
      'crop-image',
      'rotate-image',
      'add-watermark-to-image',
      'add-logo-to-image',
      'circle-crop-image',
      'merge-images',
      'adjust-image-colors',
      'add-border-to-image',
    ],
  },
];

export interface QuickItem {
  slug: string;
  href: string;
  name: string;
  emoji: string;
}

export interface QuickGroup extends Omit<QuickGroupDef, 'slugs'> {
  items: QuickItem[];
}

function item(slug: string): QuickItem | null {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (tool) return { slug, href: toolPath(slug), name: tool.name, emoji: tool.emoji };
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (page) return { slug, href: landingPath(slug), name: landingName(page), emoji: page.emoji };
  return null;
}

export function quickGroups(): QuickGroup[] {
  return QUICK_GROUPS.map(({ slugs, ...group }) => ({
    ...group,
    items: slugs.flatMap((s) => item(s) ?? []),
  }));
}

/** "Popular right now" on the home page. Chosen from experience, not measured traffic. */
export const POPULAR_SLUGS: readonly string[] = [
  'compress-image',
  'resize-image',
  'compress-image-to-100kb',
  'heic-to-jpg',
  'png-to-jpg',
  'jpg-to-pdf',
];

export function popularTools(): (QuickItem & { summary: string })[] {
  return POPULAR_SLUGS.flatMap((slug) => {
    const base = item(slug);
    if (!base) return [];
    const tool = TOOLS.find((t) => t.slug === slug);
    const page = LANDING_PAGES.find((p) => p.slug === slug);
    return [{ ...base, summary: tool?.summary ?? page?.summary ?? '' }];
  });
}
