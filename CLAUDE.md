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
2. More free tools and SEO expansion (landing pages per query, e.g. "resize image to 100kb"; more exam presets; HEIC for compress/resize/crop). 3. AI tools (BYO key and paid credits; document CORS findings here). 4. Accounts.

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

## Gotchas (learned the hard way)
- jSquash packages are excluded from Vite prebundling (`astro.config.ts`) and `wasm-feature-detect` is pinned to 1.9.0 (`pnpm-workspace.yaml` overrides): 1.10 contains `import.source()`, a syntax error in current browsers, which broke WebP/PNG in dev. Production was unaffected (tree-shaken). Retest before lifting the pin.
- Browsers cache Vite dev workers hard. If dev behaves oddly after a config change, use a new port or `pnpm build && pnpm preview`.
- e2e: wait for Astro island hydration before adding files (`addFiles` in tests/e2e/helpers.ts does), or files given too early are silently lost. Vitest only runs `tests/unit` (vitest.config.ts); Playwright runs `tests/e2e` against the production build with the installed Chrome.
- HEIC e2e tests run only if `HEIC_FIXTURE` points at a .heic file (none is committed: no encoder to make one, sample licences unverified). Run them when touching HEIC code.
- Exam presets (`src/data/exam-presets.json`): only numbers read from official documents, each with source URL, location and read date; `validatePresets` and a golden test enforce it. NTA exams (JEE/NEET) are not included: their bulletin host had an expired TLS certificate when checked (2026-11-12) and only a 2022 document was readable. Do not bypass certificate checks to fetch them.
- GitHub Actions can queue for a long time (an outage on 2026-11-11 left runs queued for about an hour); do not merge without green CI, wait. A run stuck in a ghost state cannot be cancelled or re-run: push an empty commit to start a fresh one. A force-push is blocked by the harness; to fix a conflicting stacked PR, push the rebased commit as a new branch and open a new PR.
- Known SEO gaps (checked 2026-11-12, tracked in docs/status.html): there is no `public/robots.txt` and no `src/pages/404.astro`, so `/robots.txt` and any unknown URL return the home page with status 200 (a soft 404); `iduckimg.pages.dev` has no `X-Robots-Tag` header so it can be indexed as a duplicate. Fix these before asking Search Console to crawl.
- `docs/status.html` and this file are kept current by the `docs-sync` skill (`.claude/skills/docs-sync`): re-measure test counts, pages and live checks, never copy old numbers. Docs-only changes are batched to one PR at the end of the day.
