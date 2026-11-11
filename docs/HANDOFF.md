# Handoff (written when the usage limit was reached, 2026-11-12)

Branch `feat/community-pages` holds unfinished work. It is NOT merged and NOT verified end to end. `main` and the live site are fine and unchanged (last deploy: pages.dev noindex, PR #19).

## On this branch, written but not yet wired or tested together
- Community pages: `roadmap`, `request`, `feedback`, `support`, `settings`, `about` (src/pages), `CommunityLayout.astro`, `FeedbackForm.tsx`, `SettingsPanel.tsx`, `ShareButton.tsx`, `Chips.tsx`, `src/lib/{community,contact,clipboard,theme-client}.ts`, `.chip` CSS.
- Master plan: `src/lib/tool-plan.ts` (58 tools, 7 categories, keyword URLs) + `tests/unit/tool-plan.test.ts`; the roadmap page reads it.
- URL renames: `compress-images` to `compress-image`, `images-to-pdf` to `image-to-pdf` (pages moved, `public/_redirects` 301s added, tests updated). Tool groups changed to Shrink & resize / Edit & transform / Convert & combine / Privacy & cleanup.
- Unit tests: 209 pass.

## Still to do, in this order
1. `AppShell.astro`: add a "Community" nav (from `COMMUNITY`), a yellow Support button in the top bar, footer links; make the header toggle use `browserTheme()` from `theme-client.ts` and listen for the `duck-theme` event.
2. `astro.config.ts`: sitemap `filter` using `NOINDEX_PATHS` (request, feedback, settings must stay out of the sitemap).
3. Update e2e: `tests/e2e/site.spec.ts` GROUPS (new 4 groups), add `community.spec.ts` (forms build the right mailto, Copy instead, settings theme, share, no dead links). Run `pnpm verify` and `pnpm test:e2e`, then PR, wait for green CI, merge, check live.
4. Command-palette search (Ctrl K modal like iDuckPDF: TOOLS and PAGES sections, arrows, Enter, Esc, synonyms) and an `/image-tools/` hub page.
5. SEO/GEO/AEO: Open Graph and Twitter tags, share image, JSON-LD (WebSite, Organization, WebApplication, HowTo, FAQPage, BreadcrumbList), `llms.txt`, AI-crawler rules in robots.txt.
6. Landing pages (resize to 100 KB, HEIC to JPG, PNG to JPG, exam presets), Privacy and Terms pages, then the cheap tools marked `next` in the plan.
7. Docs: update `docs/status.html` (58-tool plan, slug renames) and `CLAUDE.md`; run the docs-sync skill.

## Decisions waiting on you
- Feedback currently goes to hello@iduckpdf.com because iduckimg.com has no mail routing (no MX record). Set up Email Routing, then change `CONTACT_EMAIL` in `src/lib/contact.ts`.
- Governing law and legal name for the legal pages (status items 4.2, 4.3).
- Tech-stack direction (status item 1.11).
