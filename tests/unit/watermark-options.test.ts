import { describe, expect, it } from 'vitest';
import {
  WATERMARK_POSITIONS,
  cleanText,
  defaultWatermarkOptions,
  layoutWatermark,
  outputName,
  type WatermarkOptions,
} from '../../src/tools/watermark/options';

const o = (patch: Partial<WatermarkOptions>): WatermarkOptions => ({ ...defaultWatermarkOptions, text: 'x', ...patch });

describe('layoutWatermark', () => {
  it('scales the text with the picture width', () => {
    expect(layoutWatermark(2000, 1000, o({ sizePct: 5 })).fontPx).toBe(100);
    expect(layoutWatermark(400, 200, o({ sizePct: 5 })).fontPx).toBe(20);
  });

  it('never makes the text unreadably small', () => {
    expect(layoutWatermark(50, 50, o({ sizePct: 2 })).fontPx).toBe(10);
  });

  it('anchors each of the nine positions inside the picture', () => {
    const w = 1000;
    const h = 600;
    for (const { id } of WATERMARK_POSITIONS.filter((p) => p.id !== 'tile')) {
      const l = layoutWatermark(w, h, o({ position: id }));
      expect(l.tile).toBe(false);
      expect(l.x).toBeGreaterThanOrEqual(0);
      expect(l.x).toBeLessThanOrEqual(w);
      expect(l.y).toBeGreaterThanOrEqual(0);
      expect(l.y).toBeLessThanOrEqual(h);
    }
    const br = layoutWatermark(w, h, o({ position: 'bottom-right' }));
    expect([br.align, br.baseline]).toEqual(['right', 'bottom']);
    expect(br.x).toBeGreaterThan(w / 2);
    expect(br.y).toBeGreaterThan(h / 2);
    const tl = layoutWatermark(w, h, o({ position: 'top-left' }));
    expect([tl.align, tl.baseline]).toEqual(['left', 'top']);
    const c = layoutWatermark(w, h, o({ position: 'center' }));
    expect([c.x, c.y, c.align, c.baseline]).toEqual([500, 300, 'center', 'middle']);
  });

  it('marks the tiled pattern and keeps opacity in range', () => {
    expect(layoutWatermark(800, 600, o({ position: 'tile' })).tile).toBe(true);
    expect(layoutWatermark(800, 600, o({ opacity: 500 })).opacity).toBe(1);
    expect(layoutWatermark(800, 600, o({ opacity: 0 })).opacity).toBe(0.05);
  });
});

describe('text and names', () => {
  it('tidies spaces and caps the length', () => {
    expect(cleanText('  hello   world \n')).toBe('hello world');
    expect(cleanText('a'.repeat(200))).toHaveLength(80);
    expect(cleanText('   ')).toBe('');
  });

  it('names the output after the input with its own extension', () => {
    expect(outputName('holiday.jpeg', 'jpeg')).toBe('holiday-watermarked.jpg');
    expect(outputName('logo', 'png')).toBe('logo-watermarked.png');
  });
});
