# Handoff (updated 2026-11-12, after PR #34)

Everything below is merged to `main` and live at https://iduckimg.com (PRs #20 to #34, each merged on green CI). The site has 20 tools and 25 shortcut pages (45 pages), from a 59-tool plan. `pnpm verify` passes with 304 unit tests and `pnpm test:e2e` with 155 browser tests (4 HEIC tests skipped without a fixture). For what is done and what is next, open `docs/status.html`; for conventions and the add-a-tool checklist, read `CLAUDE.md`.

## What exists
- Community pages (roadmap, request, feedback, support, settings, about) in the sidebar, forms that build a mailto, 59-tool master plan in `src/lib/tool-plan.ts`.
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
4. AI foundation with the visitor's own key (shared settings + provider adapters; "Describe an image" and "Image to text"). The security headers / CSP (status 3.9) must come first. Provider browser access (preflight only, tested 2026-11-12): Anthropic needs the header `anthropic-dangerous-direct-browser-access`; OpenAI, Gemini, OpenRouter, Mistral, Groq, Stability and remove.bg allow it; Replicate does not (needs a proxy). Real responses and image input are not tested. AI pages must not carry ads and must say the image goes to the provider.
5. OCR, then background remover (check each model's licence for commercial use first).

## Also done: how-to guides
`/guides/` and 25 guides (one per tool), with Article, HowTo and FAQ data, `/llms-full.txt`, links from every tool page. See status item 5.15.

## Decisions waiting on you
- Feedback goes to hello@iduckpdf.com because iduckimg.com has no mail routing (no MX record). Set up Email Routing, then change `CONTACT_EMAIL` in `src/lib/contact.ts` (status 3.7).
- Governing law and legal name for the legal pages (status 4.2, 4.3); a lawyer review before real money (4.4).
- Which AI providers you actually use, so they come first.
- Tech-stack direction (status 1.11).
