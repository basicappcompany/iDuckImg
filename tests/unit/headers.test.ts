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
      // A bare path like /* or /compress-images/ matches on every host, including iduckimg.com.
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
