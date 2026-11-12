/**
 * The words for the translated shortcut pages ("HEIC to JPG", "Compress image to 100 KB", "IBPS PO photo size")
 * and for the sidebar parts that go with them. The 25 pages are made from three templates (compress to a size,
 * convert a format, an exam document) plus one short reason per conversion, so each language needs about 1,200
 * words rather than 25 pages of its own. The English source of the pages stays in src/lib/landing.ts.
 *
 * Placeholders: {kb} {from} {to} {why} {run} {short} {exam} {doc} {what} {req} {size} {source} {location}
 * {date} {cycle}. {run} is the name of the tool's run button, filled in from the tool's own translation.
 */
export interface Faq {
  q: string;
  a: string;
}

export interface PageTemplate {
  /** The name in lists and the sidebar. */
  name: string;
  title: string;
  description: string;
  summary: string;
  quick: string;
  /** Exactly four steps. */
  steps: string[];
  faqs: Faq[];
}

export interface ShortcutText {
  chrome: {
    howToUse: string;
    related: string;
    quickTools: string;
    community: string;
    alsoFrom: string;
    iduckpdf: string;
    communityPages: Record<'roadmap' | 'request' | 'feedback' | 'support' | 'settings' | 'about', string>;
    groups: Record<'compress' | 'convert' | 'other' | 'pdf' | 'forms' | 'edit', string>;
  };
  /** Compress an image to {kb} KB. */
  kb: PageTemplate;
  /** {from} to {to}. `name` and `title` here are the heading and the <title>. */
  convert: PageTemplate & { h1: string };
  /** One short reason for each conversion, by page slug. */
  why: Record<string, string>;
  /** An exam document: {short} {what} size. */
  exam: PageTemplate;
  /** Document names, lower case, for {what}. */
  docs: Record<'photo' | 'signature' | 'left-thumb' | 'declaration', string>;
}
