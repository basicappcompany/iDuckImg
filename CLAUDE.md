# iDuckImg (iduckimg.com)

Free online image tools (iLovePDF/iLoveIMG style). Original brand, duck mascot. Flow on every tool: drop files, set options, process, download.

## Goals (priority order)
1. Search traffic: one fast page per tool and per high-intent query.
2. Revenue: ads on free tools, Pro subscription, paid AI credits.
3. Minimal server cost: non-AI tools run 100% in the browser, static hosting.

## Stack (exact pins in package.json; re-verify before upgrading)
- Astro 7.4.10 (static output), Preact 11 islands only for tool UIs, Tailwind 4 via `@tailwindcss/vite`.
- TypeScript pinned to 6.0.3 because `@astrojs/check` supports only TS 5/6. Do not move to TS 7 until it does.
- Codecs: jSquash (jpeg, png, webp, avif, oxipng, resize), pica, libheif-js (heic2any is unmaintained since 2023), `@cantoo/pdf-lib` (maintained fork; original pdf-lib stale since 2022), JSZip, Comlink.
- Tests: Vitest (logic), Playwright (e2e per tool). Hosting: Cloudflare Pages.
- Package manager: pnpm. Node >= 22.23.4.

## Conventions
- Every processing job runs in a Web Worker; lazy-load codecs per page; sequential batches; cancel via AbortSignal.
- Tool engine: `input files -> options -> worker job -> output files`.
- Components: FileDropzone, ToolLayout, OptionsPanel, ProgressBar, DownloadPanel, AdSlot.
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
1. Free client-side tools: compress, resize (incl. target KB), crop, convert (incl. HEIC, image to PDF), rotate/flip, EXIF removal, exam photo resizer.
2. More free tools and SEO expansion. 3. AI tools (BYO key and paid credits; document CORS findings here). 4. Accounts.

## Engine (src/engine)
- types.ts: ToolDefinition/FileResult contract. runner.ts: sequential batch, per-file errors, cancel. worker-handle.ts: lazy reusable Comlink worker, abort = terminate. limits.ts: pixel caps (warn 25MP, max 100MP). useToolRunner.ts: Preact hook.
