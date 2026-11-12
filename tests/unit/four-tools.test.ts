import { describe, expect, it } from 'vitest';
import {
  adjustPixels,
  defaultAdjustOptions,
  isUnchanged,
  outputName as adjustName,
  type AdjustOptions,
  type RawImage,
} from '../../src/tools/adjust/options';
import {
  TRANSPARENT,
  borderPx,
  borderedSize,
  clampPct,
  outputFormat,
  outputName as borderName,
  parseHex,
  tooLarge,
} from '../../src/tools/border/options';
import { CM_PER_INCH, PAPER_SIZES, clampDpi, convertLength, formatNumber, paperInPixels } from '../../src/lib/units';
import { COMMON_RATIOS, gcd, heightFor, nearestCommon, parseRatio, simplifyRatio, widthFor } from '../../src/lib/ratio';

const px = (r: number, g: number, b: number, a = 255): RawImage => ({ data: new Uint8ClampedArray([r, g, b, a]), width: 1, height: 1 });
const o = (patch: Partial<AdjustOptions>): AdjustOptions => ({ ...defaultAdjustOptions, ...patch });
const run = (img: RawImage, patch: Partial<AdjustOptions>) => Array.from(adjustPixels(img, o(patch)));

describe('adjust colours', () => {
  it('leaves the picture exactly alone at the defaults, and does not change the input', () => {
    const img = px(10, 120, 250, 77);
    expect(isUnchanged(defaultAdjustOptions)).toBe(true);
    expect(run(img, {})).toEqual([10, 120, 250, 77]);
    run(img, { brightness: 50, filter: 'invert' });
    expect(Array.from(img.data)).toEqual([10, 120, 250, 77]);
  });

  it('brightness moves every channel and stops at black and white', () => {
    expect(run(px(100, 100, 100), { brightness: 100 }).slice(0, 3)).toEqual([255, 255, 255]);
    expect(run(px(100, 100, 100), { brightness: -100 }).slice(0, 3)).toEqual([0, 0, 0]);
    const [r] = run(px(100, 100, 100), { brightness: 20 });
    expect(r).toBeGreaterThan(100);
    expect(r).toBeLessThan(255);
  });

  it('contrast pushes light up and dark down and leaves middle grey', () => {
    expect(run(px(200, 200, 200), { contrast: 50 })[0]).toBeGreaterThan(200);
    expect(run(px(50, 50, 50), { contrast: 50 })[0]).toBeLessThan(50);
    expect(Math.abs(run(px(128, 128, 128), { contrast: 80 })[0]! - 128)).toBeLessThanOrEqual(1);
    expect(run(px(200, 200, 200), { contrast: -50 })[0]).toBeLessThan(200);
  });

  it('saturation -100 makes grey, and leaves a grey picture grey', () => {
    const [r, g, b] = run(px(200, 50, 50), { saturation: -100 });
    expect(r).toBe(g);
    expect(g).toBe(b);
    expect(run(px(90, 90, 90), { saturation: 100 }).slice(0, 3)).toEqual([90, 90, 90]);
    const [r2, , b2] = run(px(200, 100, 100), { saturation: 50 });
    expect(r2! - b2!).toBeGreaterThan(100);
  });

  it('black and white uses the usual weights', () => {
    expect(run(px(200, 50, 50), { filter: 'grayscale' }).slice(0, 3)).toEqual([95, 95, 95]);
    expect(run(px(255, 255, 255), { filter: 'grayscale' }).slice(0, 3)).toEqual([255, 255, 255]);
  });

  it('sepia turns white warm, and invert flips each channel', () => {
    expect(run(px(255, 255, 255), { filter: 'sepia' }).slice(0, 3)).toEqual([255, 255, 239]);
    expect(run(px(10, 20, 30), { filter: 'invert' }).slice(0, 3)).toEqual([245, 235, 225]);
  });

  it('never touches transparency', () => {
    for (const filter of ['grayscale', 'sepia', 'invert'] as const) expect(run(px(1, 2, 3, 40), { filter, brightness: 30 })[3]).toBe(40);
  });

  it('names the result', () => {
    expect(adjustName('a.jpg', 'jpeg')).toBe('a-edited.jpg');
  });
});

describe('border', () => {
  it('sizes the border from the shorter side and adds it to all four sides', () => {
    expect(borderPx(200, 100, 10)).toBe(10);
    expect(borderedSize(200, 100, 10)).toEqual({ border: 10, width: 220, height: 120 });
    expect(borderedSize(100, 200, 10)).toEqual({ border: 10, width: 120, height: 220 });
  });

  it('keeps the border at least one pixel and within limits', () => {
    expect(borderPx(10, 10, 1)).toBe(1);
    expect(clampPct(0)).toBe(1);
    expect(clampPct(500)).toBe(40);
    expect(clampPct(NaN)).toBe(1);
  });

  it('reads colour codes', () => {
    expect(parseHex('#FFAA00')).toBe('#ffaa00');
    expect(parseHex('fa0')).toBe('#ffaa00');
    expect(parseHex(' #1e90ff ')).toBe('#1e90ff');
    for (const bad of ['', '#12', '#12345', 'red', '#gggggg']) expect(parseHex(bad)).toBeNull();
  });

  it('turns a see-through JPG into a PNG, and keeps every other format', () => {
    expect(outputFormat('jpeg', TRANSPARENT)).toBe('png');
    expect(outputFormat('jpeg', '#ffffff')).toBe('jpeg');
    expect(outputFormat('webp', TRANSPARENT)).toBe('webp');
    expect(outputFormat('png', TRANSPARENT)).toBe('png');
  });

  it('refuses a result that is too big, and names the file', () => {
    expect(tooLarge({ width: 12000, height: 9000 })).toBe(true);
    expect(tooLarge({ width: 4000, height: 3000 })).toBe(false);
    expect(borderName('a.png', 'png')).toBe('a-framed.png');
  });
});

describe('pixel, cm and inch', () => {
  it('converts every way at 300 DPI', () => {
    const l = convertLength(1, 'in', 300);
    expect(l.px).toBe(300);
    expect(l.cm).toBeCloseTo(CM_PER_INCH);
    expect(l.mm).toBeCloseTo(25.4);
    const fromPx = convertLength(300, 'px', 300);
    expect(fromPx.in).toBe(1);
    expect(convertLength(2.54, 'cm', 300).px).toBeCloseTo(300);
    expect(convertLength(25.4, 'mm', 300).in).toBeCloseTo(1);
  });

  it('the DPI changes the pixels but not the physical size', () => {
    expect(convertLength(1200, 'px', 300).in).toBe(4);
    expect(convertLength(1200, 'px', 72).in).toBeCloseTo(16.667, 2);
    expect(convertLength(1, 'cm', 300).px).toBeCloseTo(118.11, 1);
  });

  it('knows A4 in pixels', () => {
    const a4 = PAPER_SIZES.find((p) => p.name === 'A4')!;
    expect(paperInPixels(a4, 300)).toEqual({ width: 2480, height: 3508 });
    expect(paperInPixels(a4, 150)).toEqual({ width: 1240, height: 1754 });
  });

  it('guards the DPI and formats numbers', () => {
    expect(clampDpi(0)).toBe(300);
    expect(clampDpi(NaN)).toBe(300);
    expect(clampDpi(99999)).toBe(2400);
    expect(formatNumber(2480.314)).toBe('2480.31');
    expect(formatNumber(3.5)).toBe('3.5');
    expect(formatNumber(10)).toBe('10');
    expect(formatNumber(NaN)).toBe('-');
  });
});

describe('aspect ratio', () => {
  it('simplifies to the smallest whole numbers', () => {
    expect(gcd(1920, 1080)).toBe(120);
    expect(simplifyRatio(1920, 1080)).toEqual({ w: 16, h: 9 });
    expect(simplifyRatio(1366, 768)).toEqual({ w: 683, h: 384 });
    expect(simplifyRatio(500, 500)).toEqual({ w: 1, h: 1 });
  });

  it('refuses anything that is not a whole, positive size', () => {
    for (const [w, h] of [[0, 5], [5, 0], [-3, 4], [1.5, 2], [NaN, 1]] as const) expect(simplifyRatio(w, h)).toBeNull();
  });

  it('names the nearest common ratio only when it really is close', () => {
    expect(nearestCommon(1920, 1080)?.label).toBe('16:9');
    expect(nearestCommon(1366, 768)?.label).toBe('16:9');
    expect(nearestCommon(1000, 777)).toBeNull();
    expect(nearestCommon(0, 5)).toBeNull();
    for (const r of COMMON_RATIOS) expect(nearestCommon(r.w * 100, r.h * 100)?.label).toBe(r.label);
  });

  it('reads typed ratios', () => {
    expect(parseRatio('16:9')).toEqual({ w: 16, h: 9 });
    expect(parseRatio('4/3')).toEqual({ w: 4, h: 3 });
    expect(parseRatio('16 x 9')).toEqual({ w: 16, h: 9 });
    expect(parseRatio('1.91:1')).toEqual({ w: 1.91, h: 1 });
    for (const bad of ['', '16', '0:9', '16:0', 'a:b', '16:9:1']) expect(parseRatio(bad)).toBeNull();
  });

  it('works out the other side', () => {
    expect(heightFor(1280, { w: 16, h: 9 })).toBe(720);
    expect(widthFor(720, { w: 16, h: 9 })).toBe(1280);
    expect(heightFor(1000, { w: 4, h: 3 })).toBe(750);
    expect(heightFor(1001, { w: 4, h: 3 })).toBe(751);
  });
});
