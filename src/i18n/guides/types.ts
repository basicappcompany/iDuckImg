/**
 * The words for the translated how-to guides. English is the source (`src/lib/guides-a/b/c.ts` and `en.ts` here).
 * Each language has a `GuideLocale`: the page chrome (`chrome`) and the text of every guide, keyed by the guide's slug.
 * Facts that do not change with the language (the tool a guide is about, its related guides, the date it was
 * last checked) stay in the English `Guide` and are not repeated.
 */
export interface GuideSectionText {
  h: string;
  p: string[];
}

/** The translatable part of a `Guide` (see `src/lib/guides.ts`). */
export interface GuideText {
  title: string;
  /** The <title> without the site name; keep it at 60 characters or fewer where the language allows. */
  seoTitle: string;
  /** The meta description, about 70 to 160 characters. */
  description: string;
  /** The answer, first: this is what an answer engine quotes. */
  intro: string;
  steps: string[];
  sections: GuideSectionText[];
  faq: { q: string; a: string }[];
}

/** The fixed words on a guide page and on the guides hub. */
export interface GuideChrome {
  /** Breadcrumb: Home. */
  home: string;
  /** Breadcrumb and heading: How-to guides. */
  guides: string;
  quickAnswer: string;
  /** The big button. Contains {tool}, the translated name of the tool. */
  openTool: string;
  steps: string;
  commonQuestions: string;
  /** The footnote. Contains {date}, already formatted for the language. */
  writtenBy: string;
  relatedGuides: string;
  allGuides: string;
  /** The hub's <title> without the site name. */
  hubTitle: string;
  /** The hub's meta description, 70 to 160 characters. */
  hubDescription: string;
  /** The hub heading is hubBefore + highlighted hubMark + hubAfter, for example "Image " + "how-to" + " guides". Either end may be empty. */
  hubBefore: string;
  hubMark: string;
  hubAfter: string;
  hubIntro: string;
  /** The name of the guide list in structured data. */
  hubListName: string;
  /** Accessible label for the list of guide cards. */
  hubListLabel: string;
}

export interface GuideLocale {
  chrome: GuideChrome;
  guides: Record<string, GuideText>;
}
