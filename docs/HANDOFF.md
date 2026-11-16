# Handoff (updated 2026-11-16, after PR #68)

Everything below is merged to `main` and live at https://iduckimg.com (PRs #20 to #68, each merged on green CI). The site has 24 tools and 25 shortcut pages in eleven language versions (1333 built pages), from a 59-tool plan. `pnpm verify` passes with 559 unit tests and `pnpm test:e2e` with 254 browser tests (4 more HEIC tests skipped without a fixture). For what is done and what is next, open `docs/status.html`; for conventions and the lessons learned, read `CLAUDE.md`.


## What exists
- Community pages (roadmap, request, feedback, support, settings, about) in the sidebar, forms that send through the feedback Worker (or build a mailto when the Turnstile key is empty), 59-tool master plan in `src/lib/tool-plan.ts`.
- URL renames `compress-images` to `compress-image` and `images-to-pdf` to `image-to-pdf` (301s in `public/_redirects`).
- 25 landing pages from `src/lib/landing.ts` via `src/pages/[slug].astro`: the real tool opens with options preset (compress to 20/50/100/200 KB, HEIC/PNG/WebP/JPG conversions, JPG/PNG to PDF).
- SEO: Open Graph + Twitter tags and `public/og.png`, JSON-LD from `src/lib/seo.ts`, sitemap filter for noindex pages, `robots.txt` naming AI crawlers, generated `/llms.txt`, hub `/image-tools/`, footer "Popular" links.
- `/privacy/` and `/terms/` (plain words, Basic App Company, no governing law yet).
- Fixed: the Settings page crashed the build (it touched `window` while prerendering).

## After deploying (needs the live URL)
1. `curl -I https://iduckimg.com/heic-to-jpg/` should be 200; `/llms.txt` and `/og.png` should load; `https://iduckimg.pages.dev/` should still send `X-Robots-Tag: noindex`.
2. Search Console: verify the domain, submit `sitemap-index.xml`, request indexing for the landing pages (status 5.7, yours).
3. Run Lighthouse (mobile) on the home page and one landing page (status 5.12).

## Next, in this order
1. DONE: command palette, text watermark, circle crop, split into grid, add text, pixel art, Quick tools in the sidebar, Ask the helper. Merge images, blur/hide and the logo watermark are done too. BMP/GIF/SVG/AVIF inputs are done too (see CLAUDE.md, Extra input formats). The exam landing pages are done too (`src/lib/exam-landing.ts`, built from the preset JSON). Four more tools are done (adjust colours, border, pixel/cm/inch converter, aspect ratio calculator). Colour picker, palette, Image to Base64 and the favicon generator are done too. Next: the plan's remaining `next` tools (compare images, ASCII art, GIF to frames, view EXIF, transparent background, signature maker, placeholder image, QR code make and read).
2. (see 1)
3. DONE: the exam preset picker takes a starting choice, and there is one landing page per exam document. More exams: see status item 2.25.
4. AI foundation with the visitor's own key (shared settings + provider adapters; "Describe an image" and "Image to text"). The security headers and CSP (status 3.9) are done. Provider browser access (preflight only, tested 2026-11-12): Anthropic needs the header `anthropic-dangerous-direct-browser-access`; OpenAI, Gemini, OpenRouter, Mistral, Groq, Stability and remove.bg allow it; Replicate does not (needs a proxy). Real responses and image input are not tested. AI pages must not carry ads and must say the image goes to the provider.
5. OCR, then background remover (check each model's licence for commercial use first).

## Also done: how-to guides
`/guides/` and 25 guides (one per tool), with Article, HowTo and FAQ data, `/llms-full.txt`, links from every tool page. See status item 5.15.

## Also done: languages (English US and UK plus nine)
English (US) at the root, English (UK) at `/en-gb/` (made from the US text at build time) and nine languages (the ones LeafLock PDF publishes) at `/hi/`, `/bn/`, `/pt-br/`, `/id/`, `/ru/`, `/de/`, `/es/`, `/fr/`, `/tr/`. Each has the home page, every tool and shortcut page, the 25 how-to guides with a hub, and the helper at `/<lang>/chat/`, with hreflang, the sitemap and `/llms.txt`. All machine-translated; the shared controls and the options of ten tools are translated too, the other 14 tools' own options, the community and legal pages and the Ctrl K window are still English. See status items 5.16 to 5.18 and the Languages section of CLAUDE.md.

## Also done: automatic feedback sending
`worker/index.ts` (Cloudflare Worker `iduckimg-feedback`, route `iduckimg.com/api/feedback`) with its logic in `src/lib/feedback-api.ts`. Deployed by hand with wrangler on 2026-11-13 and answering; `TURNSTILE_SECRET` and `FORWARD_TO` are set. Not yet checked: a real message from the live form reaching the inbox (status 3.11, yours). Deploy order and the rest: "Feedback worker" in `CLAUDE.md`.

## Also done: security, SEO and growth audit (PRs #54 to #57, 2026-11-14)
CSP and security headers (securityheaders.com A+, Observatory A+ 130), the SEO/AEO/GEO foundations, 17 exams and IDs from official documents, more size and dimension pages, comparison pages, OUTREACH.md and Lighthouse 98 to 99. Everything, including what was not built and why, is in `AUDIT.md`. Nine languages are noindex until a person reads them.

## Also done on 2026-11-15 (PRs #59 to #62)
AVIF output in Convert and Compress, the Bulk resize page, the `minimatch` advisory fixed, `pica` removed, and a plain message for browsers without OffscreenCanvas. Firefox passes the tool tests; WebKit could only be run through Playwright's Windows build, which lacks OffscreenCanvas, so real Safari is untested.

## Also done on 2026-11-15 (PRs #64 and #65)
Cancel is tested in Resize, Convert and Images to PDF. Every exam has a country: exam pages carry a "Specific to X" pill, the sidebar has India, United Kingdom and Canada groups, and the requirements page and exam dropdown are split by country (`src/lib/country.ts`). General size pages are not marked. Not yet tested: the pill on a real phone, near-limit photos in Firefox and WebKit, Cancel in the other tools.

## Also done on 2026-11-15 (PRs #67 and #68)
Page block order on every tool and shortcut page: tool, how-to and notes, Related, "More in...", the quick answer, then Common questions last. The quick answer is only directly above the questions, never above the tool (the owner asked for this). `ToolLayout` draws the questions from its `faqs` prop; tests under `page block order` guard it. Translated tool pages have no questions section. Watch Search Console in case the lower quick answer affects results.

## Waiting on the owner (also in status.html)
Cloudflare analytics decision (3.18: the injected beacon is blocked by the CSP and costs Lighthouse best practices 7 points), 
HEIC to JPG on the live site (3.14), GitHub two-factor and a branch rule for main (3.15), DNSSEC and auto-renew at GoDaddy (3.16), submit the sitemap in Search Console (5.7), Rich Results Test on ten pages (5.22), ads or no ads (6.5), a real feedback message (3.11), camera policy on a phone, a person to read each language.

## Decisions waiting on you
- Governing law and legal name for the legal pages (status 4.2, 4.3); a lawyer review before real money (4.4).
- Which AI providers you actually use, so they come first.
- Who can read Hindi, Bengali, Portuguese, Indonesian, Russian, German, Spanish, French or Turkish, to review the machine translations: the home page, the top five tool pages, one guide and the helper in each (status 5.17 and 5.18).
- Tech-stack direction (status 1.11).
