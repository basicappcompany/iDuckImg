// Runs after `astro build`. Browsers and the header graders (securityheaders.com, Mozilla
// Observatory) read the Content-Security-Policy HTTP header, not the <meta> tag Astro writes per page.
// Across the whole site there are only a handful of distinct inline scripts and styles, so this
// collects every hash from dist/ and writes ONE site-wide policy into dist/_headers.
// The directives come from the meta tag Astro generated from astro.config.ts, so there is one source.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const HEADERS = join(DIST, '_headers');
if (!existsSync(HEADERS)) throw new Error('dist/_headers is missing: run astro build first');

const scriptHashes = new Set();
const styleHashes = new Set();
let base = null;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      const meta = html.match(/<meta http-equiv="content-security-policy" content="([^"]*)"/);
      if (!meta) continue;
      const directives = meta[1].split(';').map((d) => d.trim()).filter(Boolean);
      for (const d of directives) {
        const [name, ...values] = d.split(/\s+/);
        for (const v of values) {
          if (!v.startsWith("'sha256-")) continue;
          if (name === 'script-src') scriptHashes.add(v);
          else if (name === 'style-src') styleHashes.add(v);
        }
      }
      base ??= directives;
    }
  }
}
walk(DIST);
if (!base) throw new Error('No page carries the CSP meta tag: is security.csp on in astro.config.ts?');

const withHashes = (d, hashes) => {
  const [name, ...values] = d.split(/\s+/);
  return [name, ...values.filter((v) => !v.startsWith("'sha256-")), ...[...hashes].sort()].join(' ');
};
const policy = [
  ...base.map((d) => (d.startsWith('script-src ') ? withHashes(d, scriptHashes) : d.startsWith('style-src ') ? withHashes(d, styleHashes) : d)),
  "frame-ancestors 'none'",
].join('; ');

const text = readFileSync(HEADERS, 'utf8');
const line = /^(\s*Content-Security-Policy:).*$/m;
if (!line.test(text)) throw new Error('dist/_headers has no Content-Security-Policy line to replace');
// Cloudflare Pages allows 2000 characters per header line.
if (policy.length > 1900) throw new Error(`CSP is ${policy.length} characters; too long for one _headers line`);
writeFileSync(HEADERS, text.replace(line, `$1 ${policy}`));
console.log(`CSP header written: ${scriptHashes.size} script hashes, ${styleHashes.size} style hash, ${policy.length} characters`);
