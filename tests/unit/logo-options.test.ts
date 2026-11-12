import { describe, expect, it } from 'vitest';
import { LOGO_POSITIONS, defaultLogoOptions, layoutLogo, outputName, type LogoOptions } from '../../src/tools/logo/options';

const o = (patch: Partial<LogoOptions>) => ({ ...defaultLogoOptions, ...patch });
const wide = { width: 400, height: 100 };

describe('layoutLogo', () => {
  it('sizes the logo from the picture width and keeps its proportions', () => {
    const [p] = layoutLogo(1000, 800, wide, o({ sizePct: 20, position: 'center' })).placements;
    expect(p!.width).toBe(200);
    expect(p!.height).toBe(50);
    const [small] = layoutLogo(500, 400, wide, o({ sizePct: 20, position: 'center' })).placements;
    expect(small!.width).toBe(100);
    expect(small!.height).toBe(25);
  });

  it('puts each of the nine positions fully inside the picture', () => {
    for (const { id } of LOGO_POSITIONS.filter((p) => p.id !== 'tile')) {
      const l = layoutLogo(1000, 600, wide, o({ position: id }));
      expect(l.placements).toHaveLength(1);
      const p = l.placements[0]!;
      expect(p.x, id).toBeGreaterThanOrEqual(0);
      expect(p.y, id).toBeGreaterThanOrEqual(0);
      expect(p.x + p.width, id).toBeLessThanOrEqual(1000);
      expect(p.y + p.height, id).toBeLessThanOrEqual(600);
    }
  });

  it('puts corners in the right corner and the middle in the middle', () => {
    const br = layoutLogo(1000, 600, wide, o({ position: 'bottom-right' })).placements[0]!;
    expect(br.x).toBeGreaterThan(500);
    expect(br.y).toBeGreaterThan(300);
    const tl = layoutLogo(1000, 600, wide, o({ position: 'top-left' })).placements[0]!;
    expect(tl.x).toBeLessThan(100);
    expect(tl.y).toBeLessThan(100);
    const c = layoutLogo(1000, 600, wide, o({ position: 'center' })).placements[0]!;
    expect(c.x + c.width / 2).toBeCloseTo(500, 0);
    expect(c.y + c.height / 2).toBeCloseTo(300, 0);
  });

  it('shrinks a logo that would not fit, instead of cutting it off', () => {
    const tall = { width: 100, height: 1000 };
    const p = layoutLogo(800, 600, tall, o({ sizePct: 60, position: 'center' })).placements[0]!;
    expect(p.height).toBeLessThanOrEqual(540);
    expect(p.width / p.height).toBeCloseTo(0.1, 1);
  });

  it('repeats across the picture, staggering every other row', () => {
    const l = layoutLogo(1000, 600, wide, o({ position: 'tile', sizePct: 10 }));
    expect(l.placements.length).toBeGreaterThan(8);
    const rows = [...new Set(l.placements.map((p) => p.y))];
    expect(rows.length).toBeGreaterThan(2);
    const firstX = (y: number) => Math.min(...l.placements.filter((p) => p.y === y).map((p) => p.x));
    expect(firstX(rows[0]!)).not.toBe(firstX(rows[1]!));
  });

  it('limits opacity and survives nonsense', () => {
    expect(layoutLogo(100, 100, wide, o({ opacity: 500 })).opacity).toBe(1);
    expect(layoutLogo(100, 100, wide, o({ opacity: 0 })).opacity).toBe(0.05);
    expect(layoutLogo(100, 100, { width: 0, height: 0 }, o({})).placements).toEqual([]);
    expect(layoutLogo(0, 0, wide, o({})).placements).toEqual([]);
  });

  it('names the result by what was done', () => {
    expect(outputName('photo.jpg', 'jpeg')).toBe('photo-with-logo.jpg');
    expect(outputName('a.png', 'png')).toBe('a-with-logo.png');
  });
});
