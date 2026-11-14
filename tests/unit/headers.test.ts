import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/** Cloudflare Pages `_headers`: a URL pattern line, then indented `Name: value` lines. */
function parseHeaders(text: string): { pattern: string; headers: Record<string, string> }[] {
  const rules: { pattern: string; headers: Record<string, string> }[] = [];
  for (const raw of text.split(/\r?\n/)) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue;
    if (/^\s/.test(raw)) {
      const [name, ...rest] = raw.trim().split(':');
      rules.at(-1)!.headers[name!.trim().toLowerCase()] = rest.join(':').trim();
    } else {
      rules.push({ pattern: raw.trim(), headers: {} });
    }
  }
  return rules;
}

const rules = parseHeaders(readFileSync('public/_headers', 'utf8'));
const noindexRules = rules.filter((r) => r.headers['x-robots-tag']?.includes('noindex'));

describe('public/_headers', () => {
  it('has noindex rules for the production pages.dev address and for preview deployments', () => {
    const patterns = noindexRules.map((r) => r.pattern);
    expect(patterns).toContain('https://:project.pages.dev/*');
    expect(patterns).toContain('https://:version.:project.pages.dev/*');
  });

  it('never applies noindex to the real domain or to every host', () => {
    expect(noindexRules.length).toBeGreaterThan(0);
    for (const { pattern } of noindexRules) {
      // A bare path like /* or /compress-image/ matches on every host, including iduckimg.com.
      expect(pattern, `${pattern} would also hit iduckimg.com`).toMatch(/^https:\/\//);
      // The host must be a pages.dev host, spelled out in the pattern.
      const host = pattern.replace(/^https:\/\//, '').split('/')[0]!;
      expect(host.endsWith('.pages.dev'), `${host} is not a pages.dev host`).toBe(true);
      expect(host).not.toContain('iduckimg.com');
    }
  });

  it('uses only noindex on those rules, so nothing else changes by accident', () => {
    for (const rule of noindexRules) expect(Object.keys(rule.headers)).toEqual(['x-robots-tag']);
  });

  it('the parser reads a rule the way Cloudflare does (guards this test itself)', () => {
    const parsed = parseHeaders('# note\n/*\n  X-Test: a:b\n\nhttps://x.pages.dev/*\n  X-Robots-Tag: noindex\n');
    expect(parsed).toEqual([
      { pattern: '/*', headers: { 'x-test': 'a:b' } },
      { pattern: 'https://x.pages.dev/*', headers: { 'x-robots-tag': 'noindex' } },
    ]);
  });
});

describe('security headers', () => {
  const all = rules.find((r) => r.pattern === '/*');

  it('sends the hardening headers on every page', () => {
    expect(all, 'a /* rule').toBeDefined();
    const h = all!.headers;
    expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(h['strict-transport-security']).toMatch(/max-age=31536000; includeSubDomains/);
    expect(h['x-content-type-options']).toBe('nosniff');
    expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(h['cross-origin-opener-policy']).toBe('same-origin');
    for (const off of ['microphone=()', 'geolocation=()', 'payment=()']) expect(h['permissions-policy']).toContain(off);
  });

  it('the bare /* rule never carries noindex (that would remove the real site from search)', () => {
    expect(Object.keys(all!.headers)).not.toContain('x-robots-tag');
  });

  it('astro.config.ts keeps the script policy free of unsafe-inline and unsafe-eval', () => {
    const cfg = readFileSync('astro.config.ts', 'utf8');
    const csp = cfg
      .slice(cfg.indexOf('csp:'), cfg.indexOf('integrations:'))
      .replace(/\/\/.*$/gm, ''); // ignore comments
    expect(csp).not.toMatch(/(?<!wasm-)unsafe-eval/); // wasm-unsafe-eval (WebAssembly only) is allowed
    // The one allowed 'unsafe-inline' is for style="" attributes, which cannot run script.
    const scriptPart = csp.slice(csp.indexOf('scriptDirective'), csp.indexOf('styleDirective'));
    expect(scriptPart).not.toMatch(/unsafe-inline/);
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("worker-src 'self' blob:");
  });
});
