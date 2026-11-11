import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://iduckimg.com',
  output: 'static',
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    worker: { format: 'es' },
    // jSquash locates its .wasm files relative to its own module URL, which breaks
    // when Vite pre-bundles it in dev.
    optimizeDeps: { exclude: ['@jsquash/jpeg', '@jsquash/png', '@jsquash/webp', '@jsquash/oxipng'] },
  },
});
