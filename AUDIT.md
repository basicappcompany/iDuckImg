# iDuckIMG security and growth audit

Started 2026-11-14 on branch `security-seo-hardening`. Status words: **fixed**, **already fine**, **needs me**, **not done yet**.
Order of work: Part A (security), Part B (SEO/AEO/GEO), Part C (growth pages).

## Part A: security

| # | Item | Status | Notes |
|---|------|--------|-------|
| A1 | Baseline grades | done | Live site on 2026-11-14 before this branch: securityheaders.com **D** (missing HSTS, CSP, X-Frame-Options, Permissions-Policy); Mozilla Observatory **D, score 35** (9 passed, 3 failed). |
| A2 | Outside code (scripts, WASM, fonts, CSS from other hosts) | already fine, audit run | The code loads nothing from a CDN. Every codec (jSquash, libheif-js, pdf-lib, JSZip) is bundled from npm and served from iduckimg.com under `/_astro/`. No web fonts. The only outside host is Cloudflare Turnstile (`challenges.cloudflare.com`) for the feedback form; it cannot be self-hosted (Cloudflare requires its own script). `pnpm audit --prod` on 2026-11-14: no known vulnerabilities. |
| A3 | Headers and CSP | fixed and deployed | Live since PR #54. Details below. |
| A4a | SVG never inserted into the page | already fine | `src/tools/shared/normalize.ts` draws an SVG only through `new Image()` from a blob URL onto a canvas. |
| A4b | File names/EXIF text shown as text | already fine | `grep` finds no `innerHTML` or `dangerouslySetInnerHTML`. The only `set:html` uses are build-time flag SVGs and the JSON-LD serializer, none holding visitor text. Preact escapes text. |
| A4c | Remove EXIF strips GPS, camera, dates, thumbnails | already fine, real phone photo not tested | `src/tools/exif/strip.ts` drops APP1 (EXIF and XMP, which hold GPS, camera and dates, and the embedded thumbnail), APP13, comments, MPF and trailing data, byte for byte on the rest. Unit tests and browser tests (a JPG with GPS, PNG text chunks, WebP) pass on the live site. I had no phone photo to inspect; **needs me:** run one through https://iduckimg.com/remove-exif-data/ and open the result's properties. |
| A4d | Blur / hide overwrite pixels | already fine | `applyEffect` (cover, pixelate, box blur) rewrites the pixel data in the output, and unit tests check that cover paints the box solid and touches nothing else, and that pixelate makes every block one flat color. Cover and pixelate cannot be undone from the file. A light blur of large text can still be partly readable, which the page already warns about; use cover for anything that must be hidden. |
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
1. **Ads.** The FAQ and About say "We may show ads"; the sister sites promise "no ads". No ad code exists. If you choose no ads, I change the FAQ, About and the two comparison pages. If you choose ads, the site would need: a CSP that allows the ad network's script and frame hosts (which loosens the current policy), a privacy-page update naming the ad provider and what it collects, and a consent banner for visitors in the EU and UK before any ad script loads.
2. **Image size limit.** The tools refuse pictures over 100 megapixels with a message and warn above 25. You asked for a friendly failure over 50 megapixels: say if you want the limit lowered.
3. **Camera.** "Take a photo" needs `camera=(self)` in the Permissions-Policy on every tool page. Test it on a phone; if it works with `camera=()`, tighten it.
4. **Languages.** Nine machine-translated languages are `noindex` until a person reads them. To publish one, set its `status` to `reviewed` in `src/i18n/locales.ts`; indexing, hreflang and the sitemap follow.

## Part B: SEO, AEO and GEO

| # | Item | Status | Notes |
|---|------|--------|-------|
| B1 | Search consoles | partly done, needs me | Google is signed in as basicappcompany@gmail.com. A verified **Domain property for iduckimg.com already exists**. Search Console says "Processing data, please check again in a day or so" for every report, because the domain was registered on 2026-11-09: there is no 3-month export, and no positions 5 to 20, impressions-without-clicks or indexing errors to list yet. **The sitemap is not submitted**: I typed `sitemap-index.xml` and pressed Submit three times, the box cleared, but the list stayed empty and the browser tab froze repeatedly. **Needs me:** add `sitemap-index.xml` at search.google.com/search-console/sitemaps. Bing Webmaster Tools: not checked (needs a Microsoft sign-in I did not have). |
| B2 | Meta tags and spelling | fixed | `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">` and light and dark `theme-color` tags (same values as iduckpdf.com) on every indexable page. Home title is now "iDuckIMG: Compress, Resize and Convert Images Online, Free". The spelling "iDuckIMG" replaces "iDuckImg" in all page text and tests; the GitHub repository URL keeps its real name. |
| B3 | AI crawlers | fixed, one item needs me | robots.txt already had explicit Allow groups for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended and Applebot-Extended and names the sitemap; **Bingbot added**. In Cloudflare, every AI crawler category is Allow (nothing blocks AI bots), AI Labyrinth is off, and the live robots.txt is ours (no managed override). **Needs me:** Crawler Hints (IndexNow): I could not find the switch in the current dashboard. |
| B4 | Languages | fixed (by noindex) | See "Language review" below. |
| B5 | Thin, repeated format pages | fixed | All 16 format pages rewritten (list below). No two could be merged: each pair is different. A test fails if two pages share a title, description, summary or paragraph. |
| B6 | Readable without JavaScript | already fine | Checked the built HTML of all 49 English tool and shortcut pages: one H1, the quick answer, numbered steps, the explanation and the questions are all in the raw HTML. |
| B7 | Answer-first content | fixed | Every English tool page has a 40 to 60 word quick answer (36 were lengthened with one true sentence), numbered steps, real facts, 4 to 6 FAQs and at least 3 related links. The 8 oldest tool pages (compress, convert, crop, resize, rotate, image-to-pdf, remove EXIF, exam resizer) had no FAQs or HowTo data and now have both. A test enforces the standard for format pages. |
| B8 | Structured data | already fine, validation needs me | WebApplication (free, operatingSystem "Any"), FAQPage, HowTo and BreadcrumbList on all tool pages; Article with datePublished and dateModified on all 25 guides; Organization (Basic App Company, sameAs the three sister sites plus GitHub) and WebSite on the home page. I could not run Google's Rich Results Test (a browser tool with a challenge); the JSON-LD was checked by parsing it. **Needs me:** run 10 pages through search.google.com/test/rich-results. |
| B9 | Family links and footer | fixed | "Also from iDuck" now lists iDuckPDF, iDuckCalculator and iDuckConvert in the sidebar and footer; footer line "© 2026 Basic App Company · iDuckIMG · iduckimg.com · Free image tools that run in your browser. Last updated 2026-11-14." |
| B10 | Trust | fixed | New page `/how-it-works/` (engines, what runs in the browser, how to check it). "Last updated" appears on every page in the footer. About names Basic App Company and now gives hello@iduckimg.com. |
| B11 | /llms.txt | fixed | Generated from the real lists; now includes the requirements page, the comparison pages and how-it-works, and no longer lists the unindexed languages. |
| B12 | Speed | see "PageSpeed" below | |

### Format pages rewritten
heic-to-jpg, heic-to-png, png-to-jpg, jpg-to-png, webp-to-jpg, webp-to-png, jpg-to-webp, png-to-webp, jpg-to-pdf, png-to-pdf, avif-to-jpg, avif-to-png, svg-to-png, svg-to-jpg, bmp-to-jpg, gif-to-png. Each now has its own title, description, summary, quick answer and steps, three sections (what the formats are and where they come from, what changes in this conversion, when to choose it and when not to) and 4 to 6 questions. Size examples are **measured with our own converter on one real 1920 x 1200 photograph** (a 213 KB JPG; a 1,465 KB PNG; a 74 KB WebP; a 6,750 KB BMP; a 700 KB GIF): for example JPG to PNG 8.9 times larger, PNG to JPG 5.6 times smaller, PNG to WebP 92 percent smaller, BMP to JPG 96 percent smaller. No figures were invented for HEIC, AVIF or SVG: those pages say no figure was measured. Not merged and not redirected: no URL changed.

### Language review
All nine non-English languages (Hindi, Bengali, Portuguese (Brazil), Indonesian, Russian, German, Spanish, French, Turkish) are machine translations that nobody has read, and every one has English text in its options, community pages and Ctrl K window. As you asked, every page in these languages is now `noindex,follow`, has a self-pointing canonical, is out of the sitemap and is no longer listed in hreflang. English (US) and English (UK) keep complete hreflang with x-default, and I fixed an old gap: the English guide pages did not declare their alternates. About 770 pages are affected, listed by the rule "every page under /hi/, /bn/, /pt-br/, /id/, /ru/, /de/, /es/, /fr/, /tr/". Hindi, Bengali, Indonesian and Portuguese were checked first: same result. To publish a language, a person must read it, then set its status to `reviewed`.

### PageSpeed
Google's PageSpeed API was over its keyless quota, so the numbers come from Lighthouse run locally against the live site (mobile settings). See the table in the final report; scores for the pages that were run are recorded in `AUDIT.md` below if they finished.

## Part C: growth pages

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | Exam and form pages | partly done | 17 exams and IDs published, each with the source document, where the numbers are, the cycle and the date read (2026-11-14): IBPS Clerk (CRP CSA-XVI), IBPS RRB (CRP RRBs-XV), IBPS SO (CRP SPL-XVI), SBI PO 2026-27, SBI Clerk 2026-27, SSC CHSL 2026, SSC GD 2026, SSC MTS 2025, CUET UG 2026, NEET UG 2026, JEE Main 2027, CTET Sept 2026, GATE 2026, UK passport digital photo, Canada passport digital photo (plus the existing IBPS PO and SSC CGL). 40 pages in all. See the list below. |
| C2 | File-size targets | fixed | compress image to 10, 15, 30, 40, 150, 300, 500 KB, 1 MB and 2 MB; "increase image size in KB" (minimum size); "resize signature 10 to 20 KB". Each page has notes measured on the real tool. |
| C3 | Dimension pages | partly done | `resize-image-to-35x45-mm` (covers 3.5 x 4.5 cm and 413 x 531 px: one page, not three), `resize-image-to-2x2-inch` (600 x 600 px), `resize-image-to-200x230-px`, `passport-size-photo`. The pixel sizes from centimetres are arithmetic at 300 DPI and the pages say so. **Not done:** "change image DPI to 200 or 300": the tools do not write DPI metadata, and I did not add a page that cannot work. |
| C4 | Missing tools | partly done | I read iloveimg.com, pi7.org and 11zon.com home or pricing pages only. Tools they list that we do not have: background remover, AI tools, upscaler, OCR, collage, bulk resize, GIF tools. **Built:** "add name and date to a photo" (a preset page for the existing add-text tool). **Not built:** passport photo maker with a print sheet, bulk resize, background remover, OCR, upscaler, JPG to JPEG. They are large engineering jobs and need decisions (model licences, size of downloads). They stay on the roadmap in `src/lib/tool-plan.ts`. |
| C5 | Guides | partly done | A single page `/photo-and-signature-requirements/` lists every exam document with its numbers, source link and read date, grouped by exam family (this replaces one guide per family, which would each need nine translations). **Not done:** the missing written guides for the newer tools, and translating the top 10 guides into Hindi properly (that needs a person who reads Hindi; machine text would go against the rule above). |
| C6 | Comparison pages | partly done | `/compare/iduckimg-vs-iloveimg/` and `/compare/iduckimg-vs-pi7/`, each a table with a source link and the date checked, saying "not stated" where the other site's page did not say. **Not done:** "Best image compressors that don't upload your photos": I could not verify enough about other tools to write it fairly. |
| C7 | OUTREACH.md | done | 20 places with drafted honest submissions. Nothing posted. |

### Exam pages, with sources (all read 2026-11-14)
| Exam | Document read | Where |
|---|---|---|
| IBPS Clerk (CRP CSA-XVI) | Notification CRP CSA-XVI, Annexure IV, https://www.ibps.in/wp-content/uploads/Notification_CRP_CSA_XVI-Final.pdf | PDF pages 55 to 57 |
| IBPS RRB (CRP RRBs-XV) | Notification CRP RRBs-XV, Annexure III, https://www.ibps.in/wp-content/uploads/CRP-RRBs-XV-notification_Revised.pdf | PDF pages 58 to 60 |
| IBPS SO (CRP SPL-XVI) | Notification CRP SPL-XVI, Annexure III, https://www.ibps.in/wp-content/uploads/Detailed-Notification-CRP-SPL-XVI_Final_V1_30.06.2026.pdf | PDF pages 44 to 46 |
| SBI PO 2026-27 | Detailed advertisement CRPD/PO/2026-27/09, Annexure II, https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf | PDF page 15 |
| SBI Clerk 2026-27 | Detailed advertisement CRPD/CR/2026-27/17, Annexure II, https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf | PDF page 9 |
| SSC CHSL 2026 | Notice, https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2026.pdf | para 9.6, PDF page 12 |
| SSC GD 2026 | Notice, https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CTGD_2026.pdf | para 8.7, PDF page 10 |
| SSC MTS 2025 | Notice (latest found), https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_mts_2025.pdf | para 10.6, PDF page 13 |
| CUET UG 2026 | Information Bulletin, https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf | PDF page 10 |
| NEET UG 2026 | Information Bulletin, https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602081576322299.pdf | PDF page 21 |
| JEE Main 2027 | Information Bulletin, https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf | PDF page 9 |
| CTET Sept 2026 | Information Bulletin, https://cdnbbsr.s3waas.gov.in/s3443dec3062d0286986e21dc0631734c9/uploads/2026/05/202605111250310617.pdf | PDF page 3 |
| GATE 2026 | Photograph and Signature page, https://gate2026.iitg.ac.in/photograph-and-signature.html | web page sections |
| UK passport (digital) | GOV.UK, https://www.gov.uk/photos-for-passports | Rules for digital photos |
| Canada passport (digital) | Canada.ca, https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html | Online renewals, digital specifications |

Caveats recorded on the pages themselves: for GATE, UK and Canada the source gives a range, and the pixel size used is our choice inside the range (said on the page). CHSL's notice gives "about 6.0 cm x 2.0 cm" in one paragraph and "about 4.0 cm x 2.0 cm" in a later list. NEET gives thumb impressions as 10 to 200 KB on one page and 50 to 300 KB on the next, so thumbs are not published for NEET. IBPS and SBI corrigenda were not checked for changes to the upload rules. SSC MTS is the 2025 notice, because no newer MTS notice was found. GATE is the 2026 cycle and a GATE 2027 site could not be found.

### Pages NOT published for lack of a readable official source
| Exam or document | What was tried | Why not |
|---|---|---|
| UPSC CSE, NDA, CDS | upsc.gov.in notice (read) and the upsconline instruction page | The CSE 2026 notice only points to a separate "Photos and Signature" instruction page; that page's PDF returned 404. NDA and CDS were not found. |
| RRB NTPC, Group D, ALP | rrbcdg.gov.in, rrb.indianrailways.gov.in, rrbahmedabad.gov.in | rrbcdg.gov.in has a TLS certificate error for its own name (I do not bypass certificate checks), the other hosts timed out or were rejected. The 2025 CEN texts were seen only as search snippets, not read. |
| CAT | iimcat.ac.in | No brochure or photo and signature specification reachable. |
| SSC CGL (new cycle) | | Existing page kept (read 2026-11-12). |
| PAN card | pan.utiitsl.com, incometax.gov.in; onlineservices.nsdl.com did not resolve | The pages read give print-form photo sizes that disagree between agencies (4.5 x 3.5 cm and 3.5 x 2.5 cm) and no online upload size. |
| Indian passport | passportindia.gov.in | The portal returned only a script shell; the ICAO guideline PDF on portal3.passportindia.gov.in timed out. |
| Aadhaar update | uidai.gov.in | The pages name a photo but give no specification. |
| Driving licence | parivahan.gov.in, sarathi.parivahan.gov.in | Connection reset. |
| US visa | travel.state.gov | HTTP 403 for automated readers. |
| UK visa, Canada visa, Schengen | gov.uk, canada.ca, home-affairs.ec.europa.eu | The UK and Canada pages read are for passports (published as such). The EU page gives 35 x 45 mm in a PDF with no pixel or KB figure. |
| State PSCs | | Not attempted: no list of the largest was given and each needs its own notice. |

### Things in Part C that are not done
Passport photo maker with print sheet, bulk resize, background remover, OCR, upscaler, JPG to JPEG, change DPI pages, the "best compressors" comparison page, written guides for the newer tools, Hindi translation of the top 10 guides, state PSC pages, UPSC and RRB and CAT and ID pages above.

## Files
- `AUDIT.md` (this file) and `OUTREACH.md` in the repository root.
