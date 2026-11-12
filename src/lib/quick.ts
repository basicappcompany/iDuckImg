import { TOOLS, toolPath } from './tools';
import { LANDING_PAGES, landingName, landingPath } from './landing';

/**
 * The "Quick tools" at the top of the sidebar: the jobs people come for most, one click away
 * without opening a group. Each is a tool slug or a shortcut slug; a unit test fails if one
 * stops existing. Chosen from experience of what people search for, not measured traffic: change
 * the list when Search Console shows what really gets used.
 */
export const QUICK_SLUGS: readonly string[] = [
  'compress-image',
  'resize-image',
  'compress-image-to-100kb',
  'heic-to-jpg',
  'png-to-jpg',
  'jpg-to-pdf',
  'exam-photo-resizer',
];

export interface QuickTool {
  slug: string;
  href: string;
  name: string;
  emoji: string;
}

export function quickTools(): QuickTool[] {
  return QUICK_SLUGS.flatMap((slug) => {
    const tool = TOOLS.find((t) => t.slug === slug);
    if (tool) return [{ slug, href: toolPath(slug), name: tool.name, emoji: tool.emoji }];
    const page = LANDING_PAGES.find((p) => p.slug === slug);
    if (page) return [{ slug, href: landingPath(slug), name: landingName(page), emoji: page.emoji }];
    return [];
  });
}
