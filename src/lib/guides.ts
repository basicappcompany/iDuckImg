/**
 * How-to guides: one per tool, plus a short one on whether online image tools are safe. Plain-English
 * walkthroughs that people search for ("how to compress an image"), each linking to the tool that does
 * the job. The text lives in guides-a/b/c.ts; this file holds the type, the order and the helpers.
 * Each guide's `steps` are shown as a numbered list and sent as HowTo data, its `faq` as FAQPage data.
 * A unit test checks every tool has a guide and every link goes somewhere real.
 */
import { GUIDES_A } from './guides-a';
import { GUIDES_B } from './guides-b';
import { GUIDES_C } from './guides-c';

export interface GuideSection {
  h: string;
  p: string[];
}

export interface Guide {
  /** The URL part: /guides/<slug>/. */
  slug: string;
  /** The page heading. */
  title: string;
  /** The <title> without the site name, 60 characters at most. */
  seoTitle: string;
  /** The meta description, 70 to 160 characters. */
  description: string;
  /** Slug of the tool this guide is about, in `TOOLS`. */
  tool: string;
  /** Slugs of other guides to link to. */
  related: string[];
  /** ISO date of the last time the text was checked against the tool. */
  updated: string;
  /** The answer, first: this is what an answer engine quotes. */
  intro: string;
  steps: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
}

export const GUIDES: readonly Guide[] = [...GUIDES_A, ...GUIDES_B, ...GUIDES_C];

export const guidePath = (slug: string): string => `/guides/${slug}/`;

export function guideForSlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** The guide written for a tool, if there is one. */
export function guideForTool(toolSlug: string): Guide | undefined {
  return GUIDES.find((g) => g.tool === toolSlug);
}

/** Every word of a guide, for length checks. */
export function guideText(g: Guide): string {
  return [g.title, g.intro, ...g.steps, ...g.sections.flatMap((s) => [s.h, ...s.p]), ...g.faq.flatMap((f) => [f.q, f.a])].join(' ');
}
