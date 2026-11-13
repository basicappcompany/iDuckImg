# iDuckImg (iduckimg.com)

Free online image tools (iLovePDF/iLoveIMG style). Original brand, duck mascot. Flow on every tool: drop files, set options, process, download.

## Goals (priority order)
1. Search traffic: one fast page per tool and per high-intent query.
2. Revenue: ads on free tools, Pro subscription, paid AI credits.
3. Minimal server cost: non-AI tools run 100% in the browser, static hosting.

## Stack (exact pins in package.json; re-verify before upgrading)
- Astro 7.4.10 (static output), Preact 11 islands only for tool UIs, Tailwind 4 via `@tailwindcss/vite`.
- TypeScript pinned to 6.0.3 because `@astrojs/check` supports only TS 5/6. Do not move to TS 7 until it does.
- Codecs in use: jSquash (jpeg, png, webp, oxipng, resize), libheif-js (heic2any is unmaintained since 2023), `@cantoo/pdf-lib` (maintained fork; original pdf-lib stale since 2022), JSZip, Comlink. `pica` and `@jsquash/avif` are installed but nothing imports them (status item 1.12); AVIF output is not built yet.
- Tests: Vitest (`tests/unit`, logic), Playwright (`tests/e2e`, real output of every tool, against the production build). Hosting: Cloudflare Pages (live at iduckimg.com; deploys on merge to main, PRs get a preview).
- Package manager: pnpm. Node >= 22.23.4.

## Conventions
- Every processing job runs in a Web Worker; lazy-load codecs per page; sequential batches; cancel via AbortSignal.
- Tool engine: `input files -> options -> worker job -> output files`.
- Components: AppShell, ToolLayout, DuckMark, FileDropzone, OptionsPanel, ProgressBar, DownloadPanel, AdSlot.
- TypeScript strict. Accessible. No secrets in git (`.env` locally, Cloudflare secrets in prod).
- Show "Your files never leave your device" only on tools where true.
- Exam presets: one JSON file, each with source URL and date. Never invent requirements.
- Ad slots have fixed dimensions, never in the upload area or near the download button. Inactive until AdSense approval.

## Workflow
- Never push to main: branch, PR, fix CI on the same PR, merge when green.
- Run `pnpm verify` (check, lint, test) before each commit. Small focused commits.
- Remote: https://github.com/basicappcompany/iDuckImg

## Commands
`pnpm dev` | `pnpm build` | `pnpm check` | `pnpm lint` | `pnpm test` | `pnpm test:e2e` | `pnpm verify`

## Milestones
1. Free client-side tools. DONE: compress, resize (pixels, percent, target KB), crop, convert (JPG/PNG/WebP/PDF, HEIC input), images to one PDF, rotate/flip, EXIF removal, exam photo resizer (IBPS PO, SSC CGL 2026 signature, custom). Each lives in `src/tools/<name>/` with a page in `src/pages/` and an entry in `src/lib/tools.ts`.
2. More free tools and SEO expansion. DONE: 25 landing pages, the SEO/GEO/AEO layer, circle crop, split grid, add text, pixel art, merge, blur, text and logo watermark, adjust colours, border, the pixel/cm/inch converter and the aspect ratio calculator, BMP/GIF/SVG/AVIF input. Still to do: the rest of the plan's `next` tools, more exam presets (needs the user's list), HEIC for compress/resize/crop. 3. AI tools (BYO key and paid credits; document CORS findings here). 4. Accounts.

## Engine (src/engine)
- types.ts: ToolDefinition (one file in, outputs out) and CombinedToolDefinition (whole batch in, one result out, e.g. images to PDF). runner.ts: runBatch (sequential, per-file errors, cancel) and runCombined. worker-handle.ts: lazy reusable Comlink worker, abort = terminate. limits.ts: pixel caps (warn 25MP, max 100MP). useToolRunner.ts: Preact hook for both kinds.
- src/tools/shared: codec.ts (decode any input incl. HEIC, encode JPG/PNG/WebP), heic.ts (lazy 2 MB libheif), transform.ts (rotate/flip/crop pixels), pdf.ts (image page + save). src/tools/image-format.ts: format detection.

## Design system (matches iDuckPDF; the user asked for that look)
- Neo-brutalist duck theme: cream/ink/duck-yellow, 2px ink borders, hard offset shadows, 900-weight headings, emoji per tool, sidebar + top bar, light/dark. Source of truth for colours: `src/lib/theme.ts` (same palette as iDuckPDF's themeColors.ts); `src/styles/global.css` repeats them as `--d-*` variables and a unit test fails if they drift or if any text/background pair drops below WCAG AA 4.5:1 in either theme.
- Use the shared classes (`card`, `btn btn-primary|btn-ink|btn-sm|btn-lg`, `input`, `link`, `pill`, `dropzone`, `meter`, `mark`, `display`, `eyebrow`) and colour utilities (`bg-card`, `text-muted`, `text-danger`, `border-line`, `bg-duck`...). Do not reintroduce raw blue/white Tailwind colours. Guide sections on tool pages use `.prose` (an `<ol>` becomes "Step n" cards); do not add Tailwind classes to those headings/lists, they override it.
- Theme choice is saved under `localStorage['duck.theme']` and applied by an inline script before first paint (no flash); no saved choice = follow the system.
- Shell: `AppShell.astro` (sidebar, search with Ctrl K, theme toggle, phone drawer), `ToolLayout.astro` (tool page frame: breadcrumb, pills, quick answer, more-in-group), `src/lib/tools.ts` (emoji, group, quick answer and keywords per tool; drives sidebar, homepage, search, "More in"). The mascot SVG and favicon are shared with iDuckPDF.

## Adding a tool
Create `src/tools/<name>/` (options.ts pure logic, worker.ts, tool.ts, <Name>Tool.tsx), add `src/pages/<slug>.astro`, add it to `src/lib/tools.ts` (a unit test fails if a page is missing from the list), add unit tests for the pure logic and e2e tests that check real output (pixel size, bytes, colours), and add the path to `tests/e2e/site.spec.ts`.

Checklist, because every tool touches the same places: `src/lib/tools.ts` (name and group must equal the plan row), `src/lib/tool-plan.ts` (flip the row to `live`), `src/lib/quick.ts` if it belongs in Quick tools, a line in `tests/unit/helper.test.ts` if people would find it by plain words (add a synonym in `src/lib/helper.ts` if not), `GROUPS` and `QUICK` in `tests/e2e/site.spec.ts`, `TOOL_PATHS` in `tests/e2e/errors.spec.ts`, the live count in `tests/unit/tool-plan.test.ts`, a guide in `src/lib/guides-*.ts` (a test fails without one), its text in all nine `src/i18n/*.ts` files and a line in `src/pages/[lang]/[tool].astro`, then `docs/status.html` (an item and a `TOOLS_DATA` row), this file and `docs/HANDOFF.md`. A new group also needs `TOOL_GROUPS` in `tools.ts` and a matching plan category.

## Gotchas (learned the hard way)
- jSquash packages are excluded from Vite prebundling (`astro.config.ts`) and `wasm-feature-detect` is pinned to 1.9.0 (`pnpm-workspace.yaml` overrides): 1.10 contains `import.source()`, a syntax error in current browsers, which broke WebP/PNG in dev. Production was unaffected (tree-shaken). Retest before lifting the pin.
- Browsers cache Vite dev workers hard. If dev behaves oddly after a config change, use a new port or `pnpm build && pnpm preview`.
- e2e: wait for Astro island hydration before adding files (`addFiles` in tests/e2e/helpers.ts does), or files given too early are silently lost. Vitest only runs `tests/unit` (vitest.config.ts); Playwright runs `tests/e2e` against the production build with the installed Chrome.
- HEIC e2e tests run only if `HEIC_FIXTURE` points at a .heic file (none is committed: no encoder to make one, sample licences unverified). Run them when touching HEIC code.
- Exam presets (`src/data/exam-presets.json`): only numbers read from official documents, each with source URL, location and read date; `validatePresets` and a golden test enforce it. NTA exams (JEE/NEET) are not included: their bulletin host had an expired TLS certificate when checked (2026-11-12) and only a 2022 document was readable. Do not bypass certificate checks to fetch them.
- GitHub Actions can queue for a long time (an outage on 2026-11-11 left runs queued for about an hour); do not merge without green CI, wait. A run stuck in a ghost state cannot be cancelled or re-run: push an empty commit to start a fresh one. A force-push is blocked by the harness; to fix a conflicting stacked PR, push the rebased commit as a new branch and open a new PR.
- Cloudflare Pages returns the home page with status 200 for any unknown URL (a soft 404) unless the site has a 404 page. `src/pages/404.astro` (noindex, not in the sitemap) and `public/robots.txt` fix that; do not remove them, and keep `404.astro` out of the tool list. `public/_headers` sends `X-Robots-Tag: noindex` for the pages.dev hosts only (checked live 2026-11-12: pages.dev sends it, iduckimg.com does not). Never replace those rules with a bare `/*` rule, which would remove the real site from search; a unit test guards it.
- `docs/status.html` and this file are kept current by the `docs-sync` skill (`.claude/skills/docs-sync`): re-measure test counts, pages and live checks, never copy old numbers. Docs-only changes are batched to one PR at the end of the day.

## Phones (checked at 320, 360, 375 and 390 px)
- The top bar is a fixed row of buttons: keep it narrow. Below 370 px the "iDuckImg" word is hidden (the duck stays) and the gaps shrink; do not add another top-bar button without re-checking 320 px. The language menu hangs from the top bar (`.lang` is `position: static` on phones) so it cannot run off the left edge.
- A long file name or a long translated word must never make the page wider than the screen. Inside a tool area (`.tool-area`) grid children may shrink (`min-width: 0`); file-list rows use `flex-wrap` with the buttons grouped; headings use `min-w-0` and `overflow-wrap`. `tests/e2e/mobile.spec.ts` fails on any sideways scroll at the four widths, on the language menu leaving the screen, and on long file names in the list and the results.
- Keyboard hints (Ctrl K, Esc, the hint line under the home search) are hidden on touch screens (`@media (hover: none)`). Anything that must close on a tap elsewhere listens for `pointerdown`, not `click` (iOS Safari sends no click for a tap on a plain part of the page). The language menu also closes when a language is chosen, on focus leaving it, and on `pageshow`.
- The note that a tool's own options are still English shows only for tools not in `TRANSLATED_TOOL_SLUGS` (`src/i18n/tools/translated.ts`).

## Sidebar (matches iDuckPDF's)
- White card sidebar, 280px: brand, a shadowed Search button (opens the Ctrl K window), Home, All image tools, a TOOLS label with collapsible groups (icon, name, chevron; tools indented under a left rule; the group holding the current page starts open), a COMMUNITY list, then Also from iDuck. Top bar: Search, theme toggle, yellow Support button. Styles are the `.nav-*` classes in `global.css`; keep new items on those classes. Tests expand the groups before counting links.

## Quick tools and Ask the helper
- The sidebar has three navs: Main (Home, Ask the helper, All image tools), Quick tools (a collapsible section with six collapsible sub-categories, defined in `QUICK_GROUPS` in `src/lib/quick.ts`; it holds ALL 25 shortcut pages plus the popular tools, and a test fails if a shortcut is missing or a slug does not exist) and Tools (collapsible groups of the real tools only; shortcuts are not repeated there, but they still appear as cards on the home page). Open state is not remembered between visits. A Quick tools sub-category opens only on a shortcut page (which the Tools list does not hold); on a real tool or the home page they all stay folded, and the Tools group of the current page opens. Page content is 1072px wide (iDuckPDF's 1040 plus padding) and card lists use `.card-grid` (auto-fill, 250px minimum, 12px gap) so cards keep iDuckPDF's size: icon 28px, name 17px, description 14/19px. Keep the Tools nav to real tool links only; tests compare it to the full list. Long names must stay inside the 280px column: grid containers need `minmax(0, 1fr)` columns or ellipsis never applies.
- `/chat/` is "Ask the helper", like iDuckPDF's: `src/lib/helper.ts` (pure keyword matcher with synonyms; understands "under 150 KB" and points at the nearest ready-made size page; answers safety, feedback, request, support and settings questions) and `src/components/ChatHelper.tsx`. It is not an AI and sends nothing anywhere. The page is noindex and out of the sitemap (`NOINDEX_PATHS`). Add synonyms in `SYNONYMS` when a real phrase fails to match.
- Do not write regexes with Python non-raw strings: `` becomes a backspace character. Use raw strings or the Write tool.

## Home page (matches iDuckPDF's)
- The big search box is a button (`.hero-search`) that opens the Ctrl K window; the window is the only search UI. Below it: Popular right now (`POPULAR_SLUGS` in `quick.ts`), All N tools with group chips (Everything + the five groups, with counts), an Ask the helper card, then the why cards and questions. Chips are `role="switch"` buttons and filter `[data-card-group]` blocks.

## Merge and blur
- Merge (`src/tools/merge/`) is a combined tool (whole batch in, one picture out) like images-to-PDF: `layoutMerge` is pure; the worker decodes every picture, lays out, draws, encodes. Blur (`src/tools/blur/`): boxes are fractions of the picture (`Region`), so one set fits any size; `applyEffect` is pure (cover, pixelate, three-pass box blur) and the preview runs it too. The draw surface is a pointer-events overlay; every box also has number inputs so it works without a mouse.

## Search window and watermark
- `CommandPalette.astro` is the Ctrl K / Cmd K / "/" search window (same look as iDuckPDF: groups Tools, Shortcuts, Pages, Actions). It reads `TOOLS`, `LANDING_PAGES`, `COMMUNITY` and a small PAGES list, so new tools and pages appear automatically; add synonyms in the tool's `keywords`. The sidebar search box is now a button that opens it.
- Simple one-picture tools share `SimpleToolShell.tsx` (drop zone, file count, run/cancel, progress, downloads) and `ToolGuide.astro` (steps, notes, questions); tools supply the option panels. Used by shape (circle crop), grid, pixel and text.
- Watermark (`src/tools/watermark/`): `options.ts` pure layout, `draw.ts` the canvas drawing shared by the worker (real result) and the page (live preview), group `Add text & effects`. Text only; the logo version is a separate tool.
- Logo watermark (`src/tools/logo/`, page `/add-logo-to-image/`): `options.ts` pure `layoutLogo` (one placement for a corner or the middle, many for repeat; the logo keeps its proportions and is shrunk, never cut off), `draw.ts` shared by the worker and the live preview. The logo is a `Blob` in the options, decoded in the worker with `createImageBitmap`, so PNG, JPG and WebP work and SVG does not. The logo picker is a plain file input, not a second `FileDropzone`, because the drop zone listens for paste on the whole window.

## Landing pages and SEO layer
- The 25 landing pages are shown as tools of their own: cards on the home page and items in the sidebar, in the same group as the tool they open (`landingGroup`, `landingsInGroup`, `landingAsTools` in `src/lib/landing.ts`), and found by the home search and the Ctrl K window. The `TOOLS` list (9) is still the list of real engines; shortcuts only preset one.
- `src/lib/landing.ts` lists the landing pages ("heic to jpg", "compress image to 100kb"...). `src/pages/[slug].astro` renders each one: the real tool component opens with `initial` options preset (the compress, resize and convert tool components accept an `initial` prop). To add a page, add an entry there with its own copy (never paste one paragraph into many pages); `tests/unit/landing.test.ts` checks slugs, copy and links, `tests/e2e/landing.spec.ts` checks real output and structured data.
- `src/lib/seo.ts` builds the JSON-LD (WebApplication, BreadcrumbList, HowTo, FAQPage, WebSite, Organization); `AppShell` writes Open Graph/Twitter tags and `jsonLd`. `public/og.png` is the share image (made from an HTML snippet with Playwright, 1200x630). `/llms.txt` is generated by `src/pages/llms.txt.ts` from the tool and page lists. `robots.txt` names the AI crawlers.
- Pages that are not tools or community pages (home, 404, `[slug]`, `image-tools`, `privacy`, `terms`) are listed in `OTHER_PAGES` (`src/lib/community.ts`); a test fails when a page file is in none of the lists.
- Noindex pages (request, feedback, settings) are filtered from the sitemap in `astro.config.ts`.
- Cost: static files on Cloudflare Pages plus in-browser tools means no server bill; the only fixed cost is the domain. Do not add a server or a paid API call to a free tool without saying so.
- AI provider browser access (CORS preflight only, tested 2026-11-12): Anthropic needs `anthropic-dangerous-direct-browser-access`; OpenAI, Gemini, OpenRouter, Mistral, Groq, Stability and remove.bg allow browser calls; Replicate does not. Real responses and image input were not tested.
- Browser components must not touch `window`/`document` while rendering (the build prerenders them): create browser-only objects inside `useEffect`.

## Languages (English US and UK plus nine, like LeafLock PDF)

- `src/i18n/locales.ts` is the registry (en = English (US), en-GB = English (UK), hi, bn, pt-BR, id, ru, de, es, fr, tr; all left to right; each has an `hreflang` such as en-US). English (US) is at the root; the others are under `/hi/`, `/pt-br/` and so on. `src/i18n/en.ts` is the English source of every UI string (`Dict` in `types.ts`), and each other language is one file (`es.ts`, `pt-br.ts`...) holding its `dict` plus a `tools` entry (name, summary, quick answer) for every tool. `src/i18n/index.ts` has the lookups, `alternatesFor` (hreflang) and `languageLinks` (the menu).
- English (UK) at `/en-gb/` is made, not written: `src/i18n/uk.ts` (`ukify`, `ukDeep`) turns the US text into British spelling when the page is built (dictionary, tool text, shortcut templates, guides, helper), so it cannot fall behind. **The English source is written in US spelling** (color, optimize, center); never write British spelling into English source files. Exceptions that stay as they are: guide slugs (`...-colours-...`), the `--colour-N` CSS variable the palette tool writes, search `keywords` (both spellings), and identifiers. The hard-coded labels inside tool islands are US on the UK pages too. Tests: `tests/unit/guides-i18n.test.ts` fails if British spelling gets into the English source or US spelling survives `ukify`.
- Pages: `src/pages/[lang]/index.astro` (home) and `[lang]/[tool].astro` (one per tool, same interactive island as English). `AppShell` and `ToolLayout` take a `locale` and read labels from the dictionary; English output is unchanged. Astro cannot hydrate a component picked from a lookup table, so `[tool].astro` lists every tool explicitly: add a line there for a new tool.
- Shared tool controls (drop zone, file count, Clear, Cancel, Working, Download, ZIP) are translated in `src/i18n/ui.ts` (`useUi()`; the first render is English so hydration matches, then it switches to `<html lang>`). The language menu shows an inline SVG flag (`src/i18n/flags.ts`) in the list and on the button.
- A tool's own options and run button are translated in `src/i18n/tools/<tool>.ts` (one table of ten languages (English plus nine), `useText(TABLE)`; English (UK) falls back to the English entry; done for compress, resize, convert, crop, image-to-pdf, add-text, watermark, logo, rotate, remove-exif; `positions.ts` is shared by text, watermark and logo). When you translate a tool, also change the quoted button name in its nine quick answers to the translated `run` label (a test checks it) and add the table to `TRANSLATED_TOOLS` in `tests/unit/i18n.test.ts`.
- Shortcut pages in other languages are built, not written: `src/i18n/shortcuts/<lang>.ts` holds three templates (compress to a size, convert a format, an exam document), one short reason per conversion and the sidebar words; `localizedLanding(page, code)` fills them from the page's `kind` (set in `src/lib/landing.ts` and `exam-landing.ts`). A new shortcut page needs its `why` line in all nine files if it is a conversion; a test fails until it is there. The sidebar (`AppShell`) shows the same Quick tools, helper, Community and iDuckPDF links in every language; Community links open the English pages.
- Guides are translated: `src/i18n/guides/<code>.ts` (chrome plus the three `<code>-a/b/c.ts` files mirroring `guides-a/b/c.ts`; keys are the English slugs; a test checks the same number of steps, sections, paragraphs and questions, and the placeholders). Pages: `[lang]/guides/index.astro` and `[lang]/guides/[slug].astro`. A new or changed English guide needs all nine files updated. Where a guide names a button of a tool whose controls are not translated, the English label stays in straight quotes.
- The helper is translated: `src/i18n/helper/<code>.ts` (`HelperText`), `helperContext(code)` builds the tool names and addresses, `respond(message, ctx)` in `src/lib/helper.ts` answers, and `[lang]/chat.astro` hosts `ChatHelper` with the context as a prop. Matching is English keywords plus the translated tool names, so a visitor can type either; the page says so (`understands`). Starter buttons show a translated label and send the English question.
- Not translated yet: the options and run buttons of the other 14 tools, the community and legal pages and the Ctrl K window. Translated pages say so (`machineNote`, `controlsEnglish`) and quote the English button names in the quick answers. Never mark a language `reviewed` until a person has read it, and never publish a language with English text under its address (`planned` keeps it out of hreflang and the sitemap).
- Adding a tool now also means adding its name, summary and quick answer in all nine languages: `tests/unit/i18n.test.ts` fails until every language has it, keeps the placeholders, and names the English buttons in quotes. Add the tool's button label to the `buttons` list in that test.
- Pages with no translation send no hreflang. Do not add hreflang to a page unless every listed version exists.

## How-to guides

- `src/lib/guides-a/b/c.ts` hold one guide per tool plus `are-online-image-tools-safe`; `src/lib/guides.ts` has the type and helpers; pages are `src/pages/guides/index.astro` and `[slug].astro`. Each guide: answer-first `intro`, numbered `steps` (also sent as HowTo data), `sections`, `faq` (FAQPage data), `related` guide slugs and an `updated` date. `ToolLayout` links every tool and shortcut page to its guide. Article, HowTo, FAQPage and BreadcrumbList JSON-LD are built in `src/lib/seo.ts`; `/llms.txt` and `/llms-full.txt` are generated from the same data.
- Adding a tool means adding its guide: a unit test fails without one. Write only what the tool really does, and re-read the tool when you change a guide (the test checks structure and limits, not facts). Keep titles at 60 characters, descriptions at 70 to 160, intros at 25 to 60 words, and every guide at 300 words or more.

## Extra input formats

- BMP, GIF, SVG and AVIF are accepted by every tool whose accept list has `image/png`. `FileDropzone` turns them into a PNG as soon as they arrive (`normalizeInput` in `src/tools/shared/normalize.ts`, pure parts in `src/lib/extra-formats.ts`), so no tool and no worker knows about them. Do not add them to individual `*_ACCEPTS` lists.
- A GIF keeps its first frame. An SVG is drawn through an `<img>` (no scripts, nothing fetched) at 1024 to 4096 px on its longer side; a worker cannot decode SVG, which is why this happens on the page. AVIF depends on the browser and gives a clear message when it cannot open one.
- `originalSizeOf(file)` returns the size before conversion; `DownloadPanel` uses it so before/after sizes compare with what the visitor dropped, not the PNG we made. Use it for any new before/after figure.
- Fixtures for the browser tests are in `tests/e2e/fixtures/` (made with Pillow). Output as BMP, GIF, SVG or AVIF is not built.

## Exam landing pages

- `src/lib/exam-landing.ts` builds one landing page per document in `src/data/exam-presets.json` (engine `exam`, opens `ExamTool` with `initialExam` and `initialDoc`). All numbers and the source come from the preset; never type an exam requirement into the page copy. A unit test fails when a document has no page. To add an exam: add it to the JSON with its source and read date, add a short name to `SHORT`, and update the slug lists in `tests/e2e/site.spec.ts`.

## Adjust, border and the two calculators

- Adjust colours (`src/tools/adjust/`) and border (`src/tools/border/`) follow the pixel tool: pure `options.ts` (`adjustPixels`, `borderedSize`) used by both the worker and the live preview, `SimpleToolShell`, output keeps the input format. A transparent border turns a JPG into a PNG (`outputFormat`).
- The calculators (`src/calculators/`, maths in `src/lib/units.ts` and `src/lib/ratio.ts`) use no file, so their pages pass `usesFiles={false}` to `ToolLayout` to hide the files-never-leave-your-device line (the Runs in your browser pill stays, because it is true). They are still entries in `TOOLS` and the plan.
- Colour picker and palette (`src/tools/colour/`, maths in `src/lib/colour.ts` and `src/lib/palette.ts`), Image to Base64 (`src/tools/base64/`, `src/lib/base64.ts`) and the favicon generator (`src/tools/favicon/`, ICO written by `ico.ts`) take one picture at a time (`SimpleToolShell` has a `single` prop). The Base64 tool must keep the file as dropped, so `FileDropzone` only converts BMP/GIF/SVG/AVIF for tools whose accept list has `image/png`. `Create & design` is the sixth group in `TOOL_GROUPS`.
- The helper's `expand` lists each hand-picked synonym twice so it counts double; add a synonym there when plain words land on the wrong tool (a test per tool in `tests/unit/helper.test.ts`).
