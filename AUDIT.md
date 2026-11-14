# iDuckIMG security and growth audit

Started 2026-11-14 on branch `security-seo-hardening`. Status words: **fixed**, **already fine**, **needs me**, **not done yet**.
Order of work: Part A (security), Part B (SEO/AEO/GEO), Part C (growth pages).

## Part A: security

| # | Item | Status | Notes |
|---|------|--------|-------|
| A1 | Baseline grades | done | Live site on 2026-11-14 before this branch: securityheaders.com **D** (missing HSTS, CSP, X-Frame-Options, Permissions-Policy); Mozilla Observatory **D, score 35** (9 passed, 3 failed). |
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
| A7 | GitHub settings | partly fixed, needs me | Logged in as basicappcompany (verified email basicappcompany@gmail.com). **Fixed:** dependency graph, Dependabot alerts and Dependabot security updates are on. **Needs me:** (1) Two-factor login is NOT enabled on the account: turn it on at github.com/settings/security. (2) Protect main against force pushes and deletion: the repo is private on the free plan; a ruleset returned "Unauthorized" and the classic rule asked me to confirm by email (a code sent to you), so nothing was saved. Click Verify via email at github.com/basicappcompany/iDuckImg/settings/branch_protection_rules/new, then create a rule for `main` with nothing ticked (that blocks force pushes and deletion), or tell me when done and I will retry. (3) Secret scanning and push protection are not offered for a private repo on the free plan (they need GitHub Advanced Security or a public repo); I did not upgrade anything. |
| A8 | Cloudflare settings and email DNS | fixed, one item needs me | Logged in as Basicappcompany@gmail.com. **Fixed:** Always Use HTTPS on (checked: http redirects with a 301); Minimum TLS raised from 1.0 to 1.2 (checked: TLS 1.1 is refused, 1.2 works); Bot Fight Mode on. **Already fine:** TLS 1.3 on, Automatic HTTPS Rewrites on, AI crawler policies all Allow (nothing blocks AI bots), AI Labyrinth off, live robots.txt is ours (no managed override). **Email: left alone.** The domain receives mail through Cloudflare Email Routing and the feedback Worker sends through it, so SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`) and DMARC (`p=quarantine`, reports to onsecureserver.net) already exist; I did not replace them with `-all` / `p=reject`. Tightening them is possible once you confirm no other service sends as @iduckimg.com. **Needs me:** Crawler Hints (IndexNow): I could not find the switch in the current dashboard (not on Caching > Configuration or Speed > Settings); search the dashboard for "Crawler Hints". |
| A9 | DNSSEC, domain lock, auto-renew | needs me | GoDaddy is not logged in on this browser, and I never type passwords, so I stopped. Public records show DNSSEC is **off** (no DS at the .com registry, no DNSKEY) and the registry lock flags are on (transfer, update, delete prohibited). Registered 2026-11-09, expires 2027-11-09. Auto-renew could not be checked. To do (about 5 minutes): in Cloudflare DNS > Settings click Enable DNSSEC, copy the DS values into GoDaddy (Domain > DNS > DNSSEC > Add), confirm the site loads, and check auto-renew. Tell me when you are signed in to GoDaddy and I will do it. |
| A10 | security.txt, re-grade | fixed | `/.well-known/security.txt` (contact hello@iduckimg.com, expires 2027-11-14) returns 200. Re-graded on the live site after PR #54 deployed (2026-11-14): securityheaders.com **A+** (was D); Mozilla Observatory **A+, score 130, 12 of 12 tests passed** (was D, 35). |

### A3 details
- `astro.config.ts` `security.csp`: Astro hashes every inline script and style it emits and writes the policy into a `<meta>` tag on each page. `script-src 'self' 'wasm-unsafe-eval' https://challenges.cloudflare.com` plus hashes: no `unsafe-inline`, no `unsafe-eval`. Also `default-src 'self'`, `worker-src 'self' blob:`, `img-src 'self' blob: data:`, `font-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-src` Turnstile only.
- Two additions beyond your list. `connect-src` also allows `blob:`: a blob URL only points at data the page itself made, and nothing can be sent to another host through it. `style-src-attr 'unsafe-inline'` covers inline `style=""` attributes, which cannot run script; style elements stay hash-only.
- `public/_headers` `/*`: `frame-ancestors 'none'` (a meta tag cannot carry it), HSTS one year with includeSubDomains (no preload), nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (microphone, geolocation, payment off), COOP same-origin.
- **Camera: needs me.** Every tool page has a "Take a photo" button, so camera is `(self)` everywhere instead of blocked on non-photo pages. A file input with `capture` is probably not governed by Permissions-Policy. Test "Take a photo" on a real phone; if it works with `camera=()`, tighten it.
- The pages.dev `X-Robots-Tag: noindex` rules are unchanged and their unit test passes.
- Tested: `pnpm build`, then the full Playwright suite on a free port (4173 was held by another process) against the built site with the CSP in place. 229 tests, 4 skipped (HEIC, no fixture), 0 failed after two test-only fixes: the results helper used `fetch(blob:)`, and one test injected a `<style>` tag.
- **HEIC under the CSP is not tested** (no fixture file). Check HEIC to JPG on the live site after deploy.
- **Header CSP (added after the first grade check):** graders read only HTTP headers, and the whole site has just 6 distinct inline scripts and 1 inline style. `scripts/csp-headers.mjs` runs after `astro build` and writes one site-wide Content-Security-Policy (about 990 characters, real hashes read from `dist/`, directives taken from the meta tag Astro generates) into `dist/_headers`. Astro's stricter per-page meta copy stays. Also added `X-Frame-Options: DENY`.
- `_headers` is not applied by `astro preview`, so the HTTP headers are verified only after deploy.

### Deploy check of PR #54 (2026-11-14)
Preview and live. Real headers confirmed on both. Browser tests run against the live site after deploy: compress, resize, remove EXIF, exam photo resizer and the landing pages, 21 passed; against the preview before merging, 31 passed (also convert, crop, BMP/GIF/SVG/AVIF input). **HEIC to JPG was not tested**: no HEIC file exists in the repo or on the build machine. **Needs me:** open https://iduckimg.com/heic-to-jpg/ and convert one iPhone photo; if it fails, send me the console error, because the likely cause is the new CSP.

## Decisions waiting on you
1. Ads: the FAQ says "We may show ads"; the sister sites promise "no ads". Which should iDuckIMG be? If no ads, I fix the FAQ. If ads, I will first list what the CSP, the privacy page and an EU/UK consent banner need.
2. Lower the image size limit from 100 MP to 50 MP?
3. Test "Take a photo" on a phone with a tighter camera policy (see A3).

## Part B and Part C
Not started.
