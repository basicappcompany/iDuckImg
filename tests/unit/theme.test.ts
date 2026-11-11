import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast, dark, light, luminance, type ThemeKey } from '../../src/lib/theme';

const css = readFileSync('src/styles/global.css', 'utf8');

/** Pull `--d-name: #value` pairs out of one CSS rule that starts at `selector`. */
function varsIn(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  expect(start, `${selector} not found in global.css`).toBeGreaterThanOrEqual(0);
  const block = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...block.matchAll(/--d-([A-Za-z]+)\s*:\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1]!, m[2]!.toLowerCase()]));
}

describe('contrast maths', () => {
  it('matches known WCAG values', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrast('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
    expect(luminance('#ffffff')).toBeCloseTo(1, 5);
  });
});

describe('global.css matches the theme tokens', () => {
  it('has the same light values', () => {
    const v = varsIn(':root {');
    for (const key of Object.keys(light) as ThemeKey[]) expect(v[key], `light ${key}`).toBe(light[key]);
  });
  it('has the same dark values, for both the saved choice and the system setting', () => {
    for (const selector of [':root[data-theme="dark"]', ':root:not([data-theme="light"]) {']) {
      const v = varsIn(selector);
      for (const key of Object.keys(dark) as ThemeKey[]) expect(v[key], `${selector} ${key}`).toBe(dark[key]);
    }
  });
});

/** Text that must be readable on a surface. 4.5 is the WCAG AA minimum for normal text. */
const PAIRS: [string, ThemeKey, ThemeKey, number][] = [
  ['body text', 'ink', 'bg', 4.5],
  ['card text', 'ink', 'card', 4.5],
  ['muted text on the page', 'muted', 'bg', 4.5],
  ['muted text on a card', 'muted', 'card', 4.5],
  ['muted text on a soft surface', 'muted', 'soft', 4.5],
  ['text on a soft surface', 'ink', 'soft', 4.5],
  ['text on a yellow button', 'duckInk', 'duck', 4.5],
  ['error text on the page', 'dangerText', 'bg', 4.5],
  ['error text on a card', 'dangerText', 'card', 4.5],
  ['error text on a soft surface', 'dangerText', 'soft', 4.5],
  ['text on a green badge', 'duckInk', 'ok', 4.5],
  ['yellow highlight against the page', 'duck', 'bg', 1.2],
];

describe.each([
  ['light', light],
  ['dark', dark],
] as const)('%s theme is readable', (_name, theme) => {
  for (const [label, fg, bg, min] of PAIRS) {
    it(`${label}: ${fg} on ${bg} is at least ${min}`, () => {
      expect(contrast(theme[fg], theme[bg])).toBeGreaterThanOrEqual(min);
    });
  }

  it('the border colour stands out from the page (a visible edge, not just decoration)', () => {
    expect(contrast(theme.line, theme.bg)).toBeGreaterThanOrEqual(3);
  });
});
