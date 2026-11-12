import type { ToolGroup } from '../lib/tools';

/**
 * Every string a translated page needs. English (en.ts) is the source: a unit test fails when a
 * language is missing a key, leaves one empty, drops a {placeholder}, or still reads like English.
 * Where a string names a button in a tool, keep that button's English label in straight quotes,
 * because the tool controls are English for now.
 */
export interface Dict {
  // Page chrome
  skipToTool: string;
  siteMenu: string;
  homeAria: string;
  searchPlaceholder: string;
  searchAria: string;
  searchButton: string;
  openSearch: string;
  navHome: string;
  navGuides: string;
  toolsLabel: string;
  openMenu: string;
  themeToggle: string;
  support: string;
  supportAria: string;
  language: string;
  footerTagline: string;
  footerPrivacy: string;
  footerTerms: string;
  footerFeedback: string;
  footerGuides: string;
  /** Says the page is machine-translated and what is still English. */
  machineNote: string;

  // Tool pages
  breadcrumbHome: string;
  runsInBrowser: string;
  noSignup: string;
  noWatermark: string;
  filesNeverLeave: string;
  quickAnswer: string;
  readGuide: string;
  /** Contains {group}. */
  moreIn: string;
  controlsEnglish: string;
  toolDescSuffix: string;

  // Home page
  homeTitle: string;
  homeDescription: string;
  heroBefore: string;
  heroMark: string;
  heroAfter: string;
  /** Contains {n}. */
  heroSub: string;
  heroSearch: string;
  /** Contains {n}. */
  allTools: string;
  pickGroup: string;
  why: { title: string; text: string }[];
  guidesHeading: string;
  guidesIntro: string;
  /** Contains {n}. */
  allGuides: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  groups: Record<ToolGroup, string>;
}

export interface ToolText {
  name: string;
  summary: string;
  quick: string;
}

/** One language: its dictionary and the text of every tool. */
export interface LocaleData {
  dict: Dict;
  /** Keyed by tool slug. English reads these from `src/lib/tools.ts` itself. */
  tools: Record<string, ToolText>;
}
