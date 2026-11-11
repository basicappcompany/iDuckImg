import { describe, expect, it } from 'vitest';
import {
  exifOrientation,
  jpegOrientation,
  pngOrientation,
  stripJpeg,
  stripPng,
  stripWebp,
  webpOrientation,
} from '../../src/tools/exif/strip';
import {
  MAKE_MARKER,
  buildTiff,
  concat,
  indexOfBytes,
  riffChunk,
  syntheticJpeg,
  syntheticPng,
  syntheticWebp,
} from '../helpers/exif-builders';

describe('exifOrientation', () => {
  it('reads big and little endian TIFF', () => {
    for (const little of [false, true]) {
      for (const o of [1, 3, 6, 8]) expect(exifOrientation(buildTiff({ orientation: o, little }))).toBe(o);
    }
  });
  it('returns 1 for junk, short or out-of-range data', () => {
    expect(exifOrientation(new Uint8Array(0))).toBe(1);
    expect(exifOrientation(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))).toBe(1);
    expect(exifOrientation(buildTiff({ orientation: 99 }))).toBe(1);
  });
});

describe('stripJpeg', () => {
  it('removes EXIF, XMP, IPTC, comments, MPF and trailing data and keeps the rest byte for byte', () => {
    const { file, expectedClean } = syntheticJpeg();
    const out = stripJpeg(file);
    expect(Array.from(out)).toEqual(Array.from(expectedClean));
    expect(indexOfBytes(out, 'Exif')).toBe(-1);
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
    expect(indexOfBytes(out, 'TRAILING')).toBe(-1);
  });
  it('does not modify its input', () => {
    const { file } = syntheticJpeg();
    const copy = file.slice();
    stripJpeg(file);
    expect(Array.from(file)).toEqual(Array.from(copy));
  });
  it('is idempotent', () => {
    const { file } = syntheticJpeg();
    const once = stripJpeg(file);
    expect(Array.from(stripJpeg(once))).toEqual(Array.from(once));
  });
  it('rejects non-JPEG input', () => {
    expect(() => stripJpeg(new Uint8Array([1, 2, 3, 4, 5]))).toThrow(/not a valid JPG/);
  });
  it('keeps a truncated file rather than damaging it', () => {
    const { file } = syntheticJpeg();
    const cut = file.subarray(0, 30);
    expect(() => stripJpeg(cut)).not.toThrow();
  });
});

describe('jpegOrientation', () => {
  it('finds the tag', () => {
    expect(jpegOrientation(syntheticJpeg(buildTiff({ orientation: 6 })).file)).toBe(6);
    expect(jpegOrientation(syntheticJpeg(buildTiff({ orientation: 3, little: true })).file)).toBe(3);
  });
  it('is 1 when there is no EXIF, and after stripping', () => {
    expect(jpegOrientation(new Uint8Array([0xff, 0xd8, 0xff, 0xd9]))).toBe(1);
    expect(jpegOrientation(stripJpeg(syntheticJpeg(buildTiff({ orientation: 6 })).file))).toBe(1);
  });
});

describe('stripPng', () => {
  it('drops text, time, EXIF and XMP chunks and anything after IEND, keeps the rest', () => {
    const { file, expectedClean } = syntheticPng();
    const out = stripPng(file);
    expect(Array.from(out)).toEqual(Array.from(expectedClean));
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
    expect(indexOfBytes(out, 'JUNK')).toBe(-1);
  });
  it('reads orientation from eXIf', () => {
    expect(pngOrientation(syntheticPng(buildTiff({ orientation: 8 })).file)).toBe(8);
  });
  it('rejects non-PNG input', () => {
    expect(() => stripPng(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))).toThrow(/not a valid PNG/);
  });
});

describe('stripWebp', () => {
  it('drops EXIF and XMP, clears the VP8X flags and fixes the RIFF size', () => {
    const { file, vp8x } = syntheticWebp();
    const out = stripWebp(file);
    const image = riffChunk('VP8 ', [1, 2, 3, 4, 5]);
    const expectedBody = concat([...'WEBP'].map((c) => c.charCodeAt(0)), vp8x(0x10), image);
    const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    expect(String.fromCharCode(...out.subarray(0, 4))).toBe('RIFF');
    expect(view.getUint32(4, true)).toBe(out.length - 8);
    expect(Array.from(out.subarray(8))).toEqual(Array.from(expectedBody));
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
  });
  it('reads orientation from the EXIF chunk, and not after stripping', () => {
    const { file } = syntheticWebp(buildTiff({ orientation: 6 }));
    expect(webpOrientation(file)).toBe(6);
    expect(webpOrientation(stripWebp(file))).toBe(1);
  });
  it('rejects non-WebP input', () => {
    expect(() => stripWebp(new Uint8Array(20))).toThrow(/not a valid WebP/);
  });
});
