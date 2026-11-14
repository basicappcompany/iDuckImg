# iDuckIMG security and growth audit

Started 2026-11-14 on branch `security-seo-hardening`. Status words: **fixed**, **already fine**, **needs me**, **not done yet**.
Order of work: Part A (security), Part B (SEO/AEO/GEO), Part C (growth pages).

## Part A: security

| # | Item | Status | Notes |
|---|------|--------|-------|
| A1 | Baseline grades (securityheaders.com, Mozilla Observatory) | not done yet | Needs the browser; run against the live site before this branch deploys. |
| A2 | Outside code (scripts, WASM, fonts, CSS from other hosts) | already fine | The code loads nothing from a CDN. Every codec (jSquash, libheif-js, pdf-lib, JSZip) is bundled from npm and served from iduckimg.com under `/_astro/`. No web fonts. The only outside host is Cloudflare Turnstile (`challenges.cloudflare.com`) for the feedback form; it cannot be self-hosted (Cloudflare requires its own script). Not done: `pnpm audit` for known vulnerabilities. |
| A3 | Headers and CSP | fixed (not yet deployed) | Details below. |
| A4a | SVG never inserted into the page | already fine | `src/tools/shared/normalize.ts` draws an SVG only through `new Image()` from a blob URL onto a canvas. |
| A4b | File names/EXIF text shown as text | already fine | `grep` finds no `innerHTML` or `dangerouslySetInnerHTML`. The only `set:html` uses are build-time flag SVGs and the JSON-LD serializer, none holding visitor text. Preact escapes text. |
| A4c | Remove EXIF strips GPS, camera, dates, thumbnails | not done yet | `src/tools/exif/strip.ts` drops APP1 (EXIF/XMP), APP13, comments and trailing data, with unit tests. Still to do: inspect real phone-photo output. |
| A4d | Blur / hide overwrite pixels | not done yet | To verify in `src/tools/blur/`. |
| A4e | Very large images fail politely | already fine, to re-test | `src/engine/limits.ts`: warn at 25 MP, refuse above 100 MP. You asked for a friendly failure over 50 MP: **needs me**, say if you want the limit lowered. |
| A4f | Base64 validated; no eval/new Function | already fine | `base64ToBytes` validates the alphabet and sniffs the type. No `eval(` or `new Function(` in `src/` or `worker/`. The CSP forbids `unsafe-eval`, and the full e2e suite passes under it. |
| A5 | Ads decision | needs me | See "Decisions waiting on you". No ad code added. |
| A6 | Forms and helper chat | partly checked | Feedback form posts to `/api/feedback` (Cloudflare Worker with Turnstile, honeypot, 12,000-byte limit). The helper chat is a local keyword matcher and sends nothing. Git history scan for keys, secrets and .env files: nothing found. |
| A7 | GitHub settings | not done yet | Needs the browser and a logged-in GitHub. |
| A8 | Cloudflare settings and email DNS | not done yet | Needs the browser. |
| A9 | DNSSEC, domain lock, auto-renew | not done yet | Needs the browser. |
| A10 | security.txt, re-grade | not done yet | |

### A3 details
- `astro.config.ts` `security.csp`: Astro hashes every inline script and style it emits and writes the policy into a `<meta>` tag on each page. `script-src 'self' 'wasm-unsafe-eval' https://challenges.cloudflare.com` plus hashes: no `unsafe-inline`, no `unsafe-eval`. Also `default-src 'self'`, `worker-src 'self' blob:`, `img-src 'self' blob: data:`, `font-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-src` Turnstile only.
- Two additions beyond your list. `connect-src` also allows `blob:`: a blob URL only points at data the page itself made, and nothing can be sent to another host through it. `style-src-attr 'unsafe-inline'` covers inline `style=""` attributes, which cannot run script; style elements stay hash-only.
- `public/_headers` `/*`: `frame-ancestors 'none'` (a meta tag cannot carry it), HSTS one year with includeSubDomains (no preload), nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (microphone, geolocation, payment off), COOP same-origin.
- **Camera: needs me.** Every tool page has a "Take a photo" button, so camera is `(self)` everywhere instead of blocked on non-photo pages. A file input with `capture` is probably not governed by Permissions-Policy. Test "Take a photo" on a real phone; if it works with `camera=()`, tighten it.
- The pages.dev `X-Robots-Tag: noindex` rules are unchanged and their unit test passes.
- Tested: `pnpm build`, then the full Playwright suite on a free port (4173 was held by another process) against the built site with the CSP in place. 229 tests, 4 skipped (HEIC, no fixture), 0 failed after two test-only fixes: the results helper used `fetch(blob:)`, and one test injected a `<style>` tag.
- **HEIC under the CSP is not tested** (no fixture file). Check HEIC to JPG on the live site after deploy.
- `_headers` is not applied by `astro preview`, so the HTTP headers are verified only after deploy.

## Decisions waiting on you
1. Ads: the FAQ says "We may show ads"; the sister sites promise "no ads". Which should iDuckIMG be? If no ads, I fix the FAQ. If ads, I will first list what the CSP, the privacy page and an EU/UK consent banner need.
2. Lower the image size limit from 100 MP to 50 MP?
3. Test "Take a photo" on a phone with a tighter camera policy (see A3).

## Part B and Part C
Not started.
