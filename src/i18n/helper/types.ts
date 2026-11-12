/**
 * The words of "Ask the helper" (/chat/) in one language: the page, the chat window and every answer.
 * English is the source (`en.ts`). The matching of what a visitor types is still done on English keywords
 * plus the translated tool names (see `src/lib/helper.ts`), so a visitor can type either.
 *
 * Placeholders: {name} a tool's name, {n} and {kb} sizes in KB, {resize} the name of the Resize tool.
 * Keep the quote marks around {name} in the language's own style.
 */
export interface HelperText {
  /** The /chat/ page. */
  page: {
    /** <title> without the site name. */
    title: string;
    description: string;
    /** The heading is before + highlighted mark + after, for example "Ask the" + "helper". */
    before: string;
    mark: string;
    after: string;
    intro: string;
  };
  ui: {
    /** Accessible name of the conversation. */
    log: string;
    typing: string;
    /** Accessible name of the row of starter buttons. */
    things: string;
    /** Label of the text box (for screen readers). */
    describe: string;
    placeholder: string;
    send: string;
    /** The link text on a tool card. */
    openIt: string;
    footnote: string;
    /** Tells the visitor what the helper understands, honestly. */
    understands: string;
  };
  greeting: string;
  /** Six button labels, in the same order as the English starters; each one sends the matching English question. */
  starters: string[];
  replies: {
    hi: string;
    safe: string;
    bug: string;
    feature: string;
    donate: string;
    settings: string;
    /** A size in KB with a ready-made page for exactly that size. {name}. */
    kbExact: string;
    /** The nearest page. {name} {kb} {resize}. */
    kbNear: string;
    one: string;
    many: string;
    none: string;
  };
  links: {
    howItWorks: string;
    privacy: string;
    feedback: string;
    request: string;
    roadmap: string;
    support: string;
    settings: string;
    browse: string;
  };
}
