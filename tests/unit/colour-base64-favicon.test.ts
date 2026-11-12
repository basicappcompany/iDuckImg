import { describe, expect, it } from 'vitest';
import { formatHsl, formatRgb, hexToRgb, readableText, rgbToHex, rgbToHsl } from '../../src/lib/colour';
import { extractPalette, paletteAsCss, paletteAsList, type PixelData } from '../../src/lib/palette';
import {
  base64ToBytes,
  bytesToBase64,
  extensionForMime,
  formatOutput,
  parseBase64Image,
  sniffMime,
} from '../../src/lib/base64';
import { buildIco } from '../../src/tools/favicon/ico';
import { FAVICON_PNGS, fitSquare, willEnlarge } from '../../src/tools/favicon/options';

/** A 1 x 1 PNG. */
const PNG_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

describe('colour maths', () => {
  it('writes and reads hex', () => {
    expect(rgbToHex({ r: 255, g: 170, b: 0 })).toBe('#ffaa00');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 300, g: -4, b: 7.6 })).toBe('#ff0008');
    expect(hexToRgb('#FFAA00')).toEqual({ r: 255, g: 170, b: 0 });
    expect(hexToRgb('fa0')).toEqual({ r: 255, g: 170, b: 0 });
    for (const bad of ['', '#12', '#12345', 'red', '#gggggg']) expect(hexToRgb(bad)).toBeNull();
  });

  it('converts to HSL for the primary colours, greys and black/white', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
    expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
    expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
    expect(rgbToHsl({ r: 30, g: 144, b: 255 })).toEqual({ h: 210, s: 100, l: 56 });
  });

  it('formats for CSS and picks readable text', () => {
    expect(formatRgb({ r: 30, g: 144, b: 255 })).toBe('rgb(30, 144, 255)');
    expect(formatHsl({ h: 210, s: 100, l: 56 })).toBe('hsl(210, 100%, 56%)');
    expect(readableText({ r: 255, g: 255, b: 255 })).toBe('#000000');
    expect(readableText({ r: 0, g: 0, b: 0 })).toBe('#ffffff');
    expect(readableText({ r: 255, g: 212, b: 59 })).toBe('#000000');
    expect(readableText({ r: 20, g: 30, b: 120 })).toBe('#ffffff');
  });
});

const image = (w: number, h: number, colour: (i: number) => [number, number, number, number]): PixelData => {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) data.set(colour(i), i * 4);
  return { data, width: w, height: h };
};

describe('palette', () => {
  it('finds two colours and their shares', () => {
    const img = image(10, 10, (i) => (i < 75 ? [255, 0, 0, 255] : [0, 0, 255, 255]));
    const p = extractPalette(img, 6);
    expect(p).toHaveLength(2);
    expect(p[0]).toMatchObject({ hex: '#ff0000', share: 0.75 });
    expect(p[1]).toMatchObject({ hex: '#0000ff', share: 0.25 });
  });

  it('returns only the colours that exist, and never more than asked', () => {
    expect(extractPalette(image(4, 4, () => [10, 20, 30, 255]), 8)).toHaveLength(1);
    const ramp = image(64, 4, (i) => {
      const v = (i % 64) * 4;
      return [v, 255 - v, 128, 255];
    });
    const p = extractPalette(ramp, 5);
    expect(p.length).toBeLessThanOrEqual(5);
    expect(p.length).toBeGreaterThan(2);
    expect(p.reduce((n, c) => n + c.share, 0)).toBeCloseTo(1);
    for (let i = 1; i < p.length; i++) expect(p[i - 1]!.share).toBeGreaterThanOrEqual(p[i]!.share);
  });

  it('ignores see-through pixels, and handles a picture with nothing visible', () => {
    const half = image(10, 10, (i) => (i < 50 ? [0, 255, 0, 255] : [255, 0, 0, 0]));
    expect(extractPalette(half, 4).map((c) => c.hex)).toEqual(['#00ff00']);
    expect(extractPalette(image(3, 3, () => [1, 2, 3, 0]), 4)).toEqual([]);
  });

  it('keeps the colour count inside 2 to 12', () => {
    const noisy = image(40, 40, (i) => [(i * 37) % 256, (i * 91) % 256, (i * 53) % 256, 255]);
    expect(extractPalette(noisy, 99).length).toBeLessThanOrEqual(12);
    expect(extractPalette(noisy, 0).length).toBeGreaterThanOrEqual(2);
  });

  it('writes the list and the CSS', () => {
    const p = [
      { hex: '#ff0000', rgb: { r: 255, g: 0, b: 0 }, share: 0.5 },
      { hex: '#0000ff', rgb: { r: 0, g: 0, b: 255 }, share: 0.5 },
    ];
    expect(paletteAsList(p)).toBe('#ff0000\n#0000ff');
    expect(paletteAsCss(p)).toBe(':root {\n  --colour-1: #ff0000;\n  --colour-2: #0000ff;\n}');
  });
});

describe('base64', () => {
  it('round-trips bytes, including a large array', () => {
    const big = new Uint8Array(100_000).map((_, i) => i % 251);
    expect(Array.from(base64ToBytes(bytesToBase64(big))!)).toEqual(Array.from(big));
    expect(bytesToBase64(new TextEncoder().encode('Hi!'))).toBe('SGkh');
  });

  it('accepts line breaks, URL-safe characters and missing padding, and rejects the rest', () => {
    expect(new TextDecoder().decode(base64ToBytes('SGkh\nSGkh')!)).toBe('Hi!Hi!');
    expect(new TextDecoder().decode(base64ToBytes('SGk')!)).toBe('Hi');
    expect(Array.from(base64ToBytes('-_-_')!)).toEqual(Array.from(base64ToBytes('+/+/')!));
    for (const bad of ['', 'not base64!', '@@@@', 'SG=k']) expect(base64ToBytes(bad)).toBeNull();
  });

  it('recognises each picture type from its bytes', () => {
    const png = base64ToBytes(PNG_B64)!;
    expect(sniffMime(png)).toBe('image/png');
    expect(sniffMime(Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]))).toBe('image/jpeg');
    expect(sniffMime(new TextEncoder().encode('GIF89a......'))).toBe('image/gif');
    expect(sniffMime(new TextEncoder().encode('RIFF\0\0\0\0WEBPVP8 '))).toBe('image/webp');
    expect(sniffMime(new TextEncoder().encode('BM......'))).toBe('image/bmp');
    expect(sniffMime(new TextEncoder().encode('\0\0\0\x1cftypavif....'))).toBe('image/avif');
    expect(sniffMime(Uint8Array.from([0, 0, 1, 0, 1, 0]))).toBe('image/x-icon');
    expect(sniffMime(new TextEncoder().encode('<?xml version="1.0"?>\n<svg xmlns="x"></svg>'))).toBe('image/svg+xml');
    expect(sniffMime(new TextEncoder().encode('<svg></svg>'))).toBe('image/svg+xml');
    expect(sniffMime(new TextEncoder().encode('hello world, not a picture'))).toBeNull();
    expect(extensionForMime('image/jpeg')).toBe('jpg');
    expect(extensionForMime('image/x-unknown')).toBe('img');
  });

  it('formats the output four ways', () => {
    const bytes = new TextEncoder().encode('Hi!');
    expect(formatOutput(bytes, 'image/png', 'base64')).toBe('SGkh');
    expect(formatOutput(bytes, 'image/png', 'datauri')).toBe('data:image/png;base64,SGkh');
    expect(formatOutput(bytes, 'image/png', 'css')).toBe('background-image: url("data:image/png;base64,SGkh");');
    expect(formatOutput(bytes, 'image/png', 'html')).toBe('<img src="data:image/png;base64,SGkh" alt="">');
  });

  it('decodes a pasted data URI or bare Base64 into a picture', () => {
    for (const text of [`data:image/png;base64,${PNG_B64}`, PNG_B64, `  data:image/png;base64,${PNG_B64.slice(0, 20)}\n${PNG_B64.slice(20)}  `]) {
      const r = parseBase64Image(text);
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(r.mime).toBe('image/png');
        expect(r.ext).toBe('png');
        expect(r.bytes.length).toBeGreaterThan(50);
      }
    }
  });

  it('trusts the bytes over a wrong label, and explains each failure', () => {
    const wrong = parseBase64Image(`data:image/jpeg;base64,${PNG_B64}`);
    expect(wrong.ok && wrong.mime).toBe('image/png');
    const cases: [string, RegExp][] = [
      ['', /Paste some/],
      ['data:text/plain,hello', /not Base64/],
      ['this is not base64!!', /not valid Base64/],
      ['SGVsbG8gd29ybGQ=', /not to a picture/],
    ];
    for (const [text, message] of cases) {
      const r = parseBase64Image(text);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toMatch(message);
    }
  });
});

describe('favicon', () => {
  it('crops to the middle square, or pads and centres', () => {
    expect(fitSquare(300, 200, 32, 'crop')).toEqual({
      from: { x: 50, y: 0, width: 200, height: 200 },
      to: { x: 0, y: 0, width: 32, height: 32 },
    });
    expect(fitSquare(300, 200, 30, 'pad')).toEqual({
      from: { x: 0, y: 0, width: 300, height: 200 },
      to: { x: 0, y: 5, width: 30, height: 20 },
    });
    expect(fitSquare(100, 100, 16, 'pad').to).toEqual({ x: 0, y: 0, width: 16, height: 16 });
  });

  it('says when the biggest icon would be enlarged', () => {
    expect(willEnlarge(600, 600, 'crop')).toBe(false);
    expect(willEnlarge(1000, 300, 'crop')).toBe(true);
    expect(willEnlarge(1000, 300, 'pad')).toBe(false);
  });

  it('lists the files a site needs', () => {
    expect(FAVICON_PNGS.map((f) => `${f.name}:${f.size}`)).toEqual([
      'favicon-16x16.png:16',
      'favicon-32x32.png:32',
      'apple-touch-icon.png:180',
      'android-chrome-192x192.png:192',
      'android-chrome-512x512.png:512',
    ]);
  });

  it('builds a valid ICO directory around the PNG data', () => {
    const a = Uint8Array.from([1, 2, 3]);
    const b = Uint8Array.from([9, 8, 7, 6, 5]);
    const ico = buildIco([
      { size: 16, png: a },
      { size: 48, png: b },
    ]);
    const v = new DataView(ico.buffer);
    expect([v.getUint16(0, true), v.getUint16(2, true), v.getUint16(4, true)]).toEqual([0, 1, 2]);
    expect(ico.length).toBe(6 + 32 + 3 + 5);
    expect([ico[6], ico[7]]).toEqual([16, 16]);
    expect(v.getUint32(6 + 8, true)).toBe(3);
    expect(v.getUint32(6 + 12, true)).toBe(38);
    expect([ico[22], ico[23]]).toEqual([48, 48]);
    expect(v.getUint32(22 + 8, true)).toBe(5);
    expect(v.getUint32(22 + 12, true)).toBe(41);
    expect(Array.from(ico.subarray(38, 41))).toEqual([1, 2, 3]);
    expect(Array.from(ico.subarray(41))).toEqual([9, 8, 7, 6, 5]);
    expect(buildIco([{ size: 256, png: a }])[6]).toBe(0);
  });
});
