import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { NOINDEX_PATHS } from './src/lib/community';
import { LOCALES } from './src/i18n/locales';

export default defineConfig({
  site: 'https://iduckimg.com',
  output: 'static',
  // Content-Security-Policy: Astro hashes every inline script and style it emits and writes the
  // policy into a <meta> tag on each page (a meta tag cannot carry frame-ancestors; public/_headers
  // does). No 'unsafe-inline' or 'unsafe-eval' for scripts. Turnstile (feedback form) is the only
  // outside host. Test in `pnpm build && pnpm preview`; the dev server does not send it.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "worker-src 'self' blob:",
        "img-src 'self' blob: data:",
        "connect-src 'self' blob: https://challenges.cloudflare.com",
        "frame-src https://challenges.cloudflare.com",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", "'wasm-unsafe-eval'", 'https://challenges.cloudflare.com'] },
      // Inline style="" attributes (server-rendered markup) cannot run script; allow them only.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  integrations: [
    preact(),
    // Pages that are noindex (forms, settings) stay out of the sitemap too.
    // Each translated page lists its other language versions (hreflang) in the sitemap too.
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.endsWith(path)),
      i18n: {
        defaultLocale: 'en',
        locales: Object.fromEntries(LOCALES.filter((l) => l.status !== 'planned').map((l) => [l.path || 'en', l.hreflang])),
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    worker: { format: 'es' },
    // jSquash locates its .wasm files relative to its own module URL, which breaks
    // when Vite pre-bundles it in dev.
    optimizeDeps: {
      exclude: [
        '@jsquash/jpeg',
        '@jsquash/png',
        '@jsquash/webp',
        '@jsquash/oxipng',
        '@jsquash/resize',
      ],
    },
  },
});
