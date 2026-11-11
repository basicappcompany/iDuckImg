# iDuckImg

Free online image tools that run in your browser: compress, resize, crop, convert (including iPhone HEIC), combine images into one PDF, rotate and flip, remove EXIF data, and resize photos and signatures for exam forms. No sign-up, no watermark, and the files never leave the device.

Live at https://iduckimg.com. The look follows [iDuckPDF](https://iduckpdf.com).

## Run it

You need Node 22.23.4 or later and pnpm (the version is pinned in `package.json`).

```sh
pnpm install
pnpm dev          # development server at http://localhost:4321
pnpm build        # static site into dist/
pnpm preview      # serve dist/ locally
```

The dev server caches workers hard. If something behaves oddly after a config change, use `pnpm build` then `pnpm preview`.

## Check it

```sh
pnpm verify       # type-check, lint and unit tests (run before every commit)
pnpm test:e2e     # browser tests: builds the site and drives the installed Chrome
```

The unit tests live in `tests/unit` (Vitest) and the browser tests in `tests/e2e` (Playwright). The browser tests check the real output of every tool: pixel size, file size, colours and PDF page order. Four HEIC tests are skipped unless `HEIC_FIXTURE` points at a `.heic` file:

```sh
HEIC_FIXTURE=/path/to/photo.heic pnpm test:e2e -g HEIC
```

## Layout

| Path | What is in it |
| --- | --- |
| `src/pages/` | One page per tool, plus the home page |
| `src/tools/<name>/` | A tool: pure logic (`options.ts`), the worker, the tool definition and its UI |
| `src/tools/shared/` | Decoding and encoding, HEIC, pixel transforms and PDF pages shared by tools |
| `src/engine/` | The tool contract, the batch runner, the worker handle and the Preact hook |
| `src/components/` | App shell, tool layout, drop zone, options, progress and download panels |
| `src/lib/` | The tool list (`tools.ts`), theme colours (`theme.ts`), exam preset rules and helpers |
| `src/data/exam-presets.json` | Photo and signature requirements, each with its official source |
| `docs/status.html` | The status page: every phase and item, what is done and who owns what |

To add a tool, see "Adding a tool" in `CLAUDE.md`.

## Release flow

Never push to `main`. Make a branch, open a pull request, wait for CI to pass, then squash-merge. Merging to `main` deploys to Cloudflare Pages, and every pull request gets a preview build.

`CLAUDE.md` holds the decisions, conventions and lessons learned. Open `docs/status.html` in a browser to see where the project stands.
