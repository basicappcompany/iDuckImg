/** Builders for small files with known metadata, shared by unit and e2e tests. */

export const MAKE_MARKER = 'TestCamMarker';

const ascii = (s: string): number[] => Array.from(s, (c) => c.charCodeAt(0));

export function concat(...parts: (Uint8Array | number[])[]): Uint8Array {
  const arrays = parts.map((p) => (p instanceof Uint8Array ? p : Uint8Array.from(p)));
  const out = new Uint8Array(arrays.reduce((n, a) => n + a.length, 0));
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

/**
 * TIFF block with a Make string (out of line), Orientation and a GPS pointer, so tests have
 * something recognisable to look for.
 */
export function buildTiff({ orientation = 1, little = false }: { orientation?: number; little?: boolean } = {}): Uint8Array {
  const make = Uint8Array.from([...ascii(MAKE_MARKER), 0]);
  const entryCount = 3;
  const ifdSize = 2 + entryCount * 12 + 4;
  const makeOffset = 8 + ifdSize;
  const gpsOffset = makeOffset + make.length + (make.length & 1);
  const total = gpsOffset + 2 + 12 + 4;
  const buf = new Uint8Array(total);
  const v = new DataView(buf.buffer);
  buf.set(ascii(little ? 'II' : 'MM'), 0);
  v.setUint16(2, 42, little);
  v.setUint32(4, 8, little);
  v.setUint16(8, entryCount, little);
  const entry = (i: number, tag: number, type: number, count: number, value: number, short = false) => {
    const o = 10 + i * 12;
    v.setUint16(o, tag, little);
    v.setUint16(o + 2, type, little);
    v.setUint32(o + 4, count, little);
    if (short) v.setUint16(o + 8, value, little);
    else v.setUint32(o + 8, value, little);
  };
  entry(0, 0x010f, 2, make.length, makeOffset); // Make
  entry(1, 0x0112, 3, 1, orientation, true); // Orientation
  entry(2, 0x8825, 4, 1, gpsOffset); // GPS IFD pointer
  buf.set(make, makeOffset);
  v.setUint16(gpsOffset, 1, little); // one GPS entry: latitude ref "N"
  const g = gpsOffset + 2;
  v.setUint16(g, 0x0001, little);
  v.setUint16(g + 2, 2, little);
  v.setUint32(g + 4, 2, little);
  buf.set([0x4e, 0], g + 8);
  return buf;
}

export function jpegSegment(marker: number, payload: Uint8Array | number[]): Uint8Array {
  const p = payload instanceof Uint8Array ? payload : Uint8Array.from(payload);
  return concat([0xff, marker, (p.length + 2) >> 8, (p.length + 2) & 0xff], p);
}

export function exifApp1(tiff: Uint8Array): Uint8Array {
  return jpegSegment(0xe1, concat(ascii('Exif\0\0'), tiff));
}

/** Insert a segment right after the JPEG's SOI (and any APP0/JFIF is not required). */
export function injectAfterSoi(jpeg: Uint8Array, segment: Uint8Array): Uint8Array {
  return concat(jpeg.subarray(0, 2), segment, jpeg.subarray(2));
}

export const JPEG_TRAILER = ascii('TRAILING-VIDEO-DATA');

/** Structurally valid (not decodable) JPEG with one of each kind of segment. */
export function syntheticJpeg(tiff: Uint8Array = buildTiff()): { file: Uint8Array; expectedClean: Uint8Array } {
  const soi = [0xff, 0xd8];
  const app0 = jpegSegment(0xe0, [...ascii('JFIF\0'), 1, 1, 0, 0, 1, 0, 1, 0, 0]);
  const exif = exifApp1(tiff);
  const xmp = jpegSegment(0xe1, ascii('http://ns.adobe.com/xap/1.0/\0<x:xmpmeta/>'));
  const icc = jpegSegment(0xe2, [...ascii('ICC_PROFILE\0'), 1, 1, 9, 9, 9]);
  const mpf = jpegSegment(0xe2, [...ascii('MPF\0'), 1, 2, 3]);
  const iptc = jpegSegment(0xed, ascii('Photoshop 3.0\0'));
  const com = jpegSegment(0xfe, ascii('a comment'));
  const dqt = jpegSegment(0xdb, [0, 1, 2, 3, 4]);
  const sof = jpegSegment(0xc0, [8, 0, 8, 0, 8, 1, 1, 0x11, 0]);
  const sos = jpegSegment(0xda, [1, 1, 0, 0, 63, 0]);
  // Picture data with byte stuffing (FF 00) and a restart marker (FF D0), which are not segments.
  const data = [0x12, 0xff, 0x00, 0x34, 0xff, 0xd0, 0x56, 0xff, 0x00];
  const eoi = [0xff, 0xd9];
  const file = concat(soi, app0, exif, xmp, icc, mpf, iptc, com, dqt, sof, sos, data, eoi, JPEG_TRAILER);
  const expectedClean = concat(soi, app0, icc, dqt, sof, sos, data, eoi);
  return { file, expectedClean };
}

const u32be = (n: number): number[] => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];

export function pngChunk(type: string, data: Uint8Array | number[] = []): Uint8Array {
  const d = data instanceof Uint8Array ? data : Uint8Array.from(data);
  return concat(u32be(d.length), ascii(type), d, [0, 0, 0, 0]); // CRC is not checked by the stripper
}

export function syntheticPng(tiff: Uint8Array = buildTiff()): { file: Uint8Array; expectedClean: Uint8Array } {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const ihdr = pngChunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0]);
  const text = pngChunk('tEXt', ascii('Author\0someone'));
  const time = pngChunk('tIME', [7, 232, 1, 1, 0, 0, 0]);
  const icc = pngChunk('iCCP', ascii('p\0\0data'));
  const exif = pngChunk('eXIf', tiff);
  const itxt = pngChunk('iTXt', ascii('XML:com.adobe.xmp\0\0\0\0\0<x/>'));
  const idat = pngChunk('IDAT', [1, 2, 3, 4]);
  const iend = pngChunk('IEND');
  const file = concat(sig, ihdr, text, time, icc, exif, itxt, idat, iend, ascii('JUNK'));
  const expectedClean = concat(sig, ihdr, icc, idat, iend);
  return { file, expectedClean };
}

export function riffChunk(fourcc: string, data: Uint8Array | number[]): Uint8Array {
  const d = data instanceof Uint8Array ? data : Uint8Array.from(data);
  const size = [d.length & 255, (d.length >> 8) & 255, (d.length >> 16) & 255, (d.length >> 24) & 255];
  return concat(ascii(fourcc), size, d, d.length & 1 ? [0] : []);
}

export function syntheticWebp(tiff: Uint8Array = buildTiff()): { file: Uint8Array; vp8x: (flags: number) => Uint8Array } {
  const vp8x = (flags: number) => riffChunk('VP8X', [flags, 0, 0, 0, 7, 0, 0, 7, 0, 0]);
  const image = riffChunk('VP8 ', [1, 2, 3, 4, 5]); // odd size, so it carries a padding byte
  const exif = riffChunk('EXIF', concat(ascii('Exif\0\0'), tiff));
  const xmp = riffChunk('XMP ', ascii('<x:xmpmeta/>'));
  const body = concat(ascii('WEBP'), vp8x(0x10 | 0x08 | 0x04), image, exif, xmp);
  const size = body.length;
  const file = concat(ascii('RIFF'), [size & 255, (size >> 8) & 255, (size >> 16) & 255, (size >> 24) & 255], body);
  return { file, vp8x };
}

export function indexOfBytes(haystack: Uint8Array, needle: string): number {
  const n = ascii(needle);
  outer: for (let i = 0; i + n.length <= haystack.length; i++) {
    for (let j = 0; j < n.length; j++) if (haystack[i + j] !== n[j]) continue outer;
    return i;
  }
  return -1;
}
