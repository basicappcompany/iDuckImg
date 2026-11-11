/**
 * Lossless metadata removal. These work on file bytes, so the picture itself is not
 * re-compressed. All functions are pure and never modify their input.
 *
 * Removed: EXIF (camera, date, GPS location), XMP, IPTC, comments, thumbnails and any data
 * appended after the image (some phones append a video or depth map there).
 * Kept: everything needed to show the picture the same way (colour profile, transparency, size).
 */

const ascii = (s: string): number[] => Array.from(s, (c) => c.charCodeAt(0));

function startsWith(data: Uint8Array, prefix: string): boolean {
  const p = ascii(prefix);
  if (data.length < p.length) return false;
  return p.every((byte, i) => data[i] === byte);
}

function concat(parts: readonly Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, p) => sum + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

/**
 * Read the EXIF Orientation tag (1 to 8) from a TIFF block. Returns 1 (normal) when the tag is
 * missing or the data is malformed.
 */
export function exifOrientation(tiff: Uint8Array): number {
  if (tiff.length < 8) return 1;
  const little = tiff[0] === 0x49 && tiff[1] === 0x49;
  const big = tiff[0] === 0x4d && tiff[1] === 0x4d;
  if (!little && !big) return 1;
  const view = new DataView(tiff.buffer, tiff.byteOffset, tiff.byteLength);
  if (view.getUint16(2, little) !== 42) return 1;
  const ifd = view.getUint32(4, little);
  if (ifd + 2 > tiff.length) return 1;
  const count = view.getUint16(ifd, little);
  for (let k = 0; k < count; k++) {
    const entry = ifd + 2 + k * 12;
    if (entry + 12 > tiff.length) break;
    if (view.getUint16(entry, little) === 0x0112) {
      const value = view.getUint16(entry + 8, little);
      return value >= 1 && value <= 8 ? value : 1;
    }
  }
  return 1;
}

const EXIF_HEADER = 'Exif\0\0';

// ---------- JPEG ----------

function keepJpegSegment(marker: number, payload: Uint8Array): boolean {
  if (marker === 0xfe) return false; // comment
  if (marker >= 0xe0 && marker <= 0xef) {
    if (marker === 0xe0) return true; // JFIF
    if (marker === 0xe2) return startsWith(payload, 'ICC_PROFILE\0'); // colour profile only (drops MPF)
    if (marker === 0xee) return startsWith(payload, 'Adobe'); // colour transform flag
    return false; // EXIF/XMP (APP1), IPTC (APP13), maker data
  }
  return true;
}

/** JPEG EXIF orientation, or 1 if there is none. */
export function jpegOrientation(src: Uint8Array): number {
  if (src[0] !== 0xff || src[1] !== 0xd8) return 1;
  let i = 2;
  while (i + 4 <= src.length && src[i] === 0xff) {
    const marker = src[i + 1]!;
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      i += 2;
      continue;
    }
    const len = (src[i + 2]! << 8) | src[i + 3]!;
    const end = i + 2 + len;
    if (end > src.length) break;
    if (marker === 0xe1) {
      const payload = src.subarray(i + 4, end);
      if (startsWith(payload, EXIF_HEADER)) return exifOrientation(payload.subarray(6));
    }
    i = end;
  }
  return 1;
}

export function stripJpeg(src: Uint8Array): Uint8Array {
  if (src.length < 4 || src[0] !== 0xff || src[1] !== 0xd8) throw new Error('This is not a valid JPG file.');
  const parts: Uint8Array[] = [src.subarray(0, 2)];
  const n = src.length;
  let i = 2;
  while (i < n) {
    if (src[i] !== 0xff) {
      // Not at a marker: keep the rest untouched rather than risk damaging the picture.
      parts.push(src.subarray(i));
      break;
    }
    while (i + 1 < n && src[i + 1] === 0xff) i++; // fill bytes
    if (i + 1 >= n) break;
    const marker = src[i + 1]!;
    if (marker === 0xd9) {
      parts.push(src.subarray(i, i + 2)); // end of image: anything after it is dropped
      break;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      parts.push(src.subarray(i, i + 2));
      i += 2;
      continue;
    }
    if (i + 4 > n) {
      parts.push(src.subarray(i));
      break;
    }
    const len = (src[i + 2]! << 8) | src[i + 3]!;
    const end = i + 2 + len;
    if (end > n) {
      parts.push(src.subarray(i));
      break;
    }
    if (keepJpegSegment(marker, src.subarray(i + 4, end))) parts.push(src.subarray(i, end));
    i = end;
    if (marker === 0xda) {
      // Picture data follows. Copy it until the next real marker.
      let j = i;
      while (j + 1 < n) {
        if (src[j] !== 0xff) {
          j++;
          continue;
        }
        const next = src[j + 1]!;
        if (next === 0x00 || (next >= 0xd0 && next <= 0xd7)) j += 2;
        else if (next === 0xff) j++;
        else break;
      }
      parts.push(src.subarray(i, j));
      i = j;
    }
  }
  return concat(parts);
}

// ---------- PNG ----------

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const PNG_DROP = new Set(['tEXt', 'zTXt', 'iTXt', 'eXIf', 'tIME']);

function pngChunks(src: Uint8Array): { type: string; start: number; end: number }[] {
  if (src.length < 8 || !PNG_SIGNATURE.every((b, i) => src[i] === b)) throw new Error('This is not a valid PNG file.');
  const view = new DataView(src.buffer, src.byteOffset, src.byteLength);
  const chunks: { type: string; start: number; end: number }[] = [];
  let i = 8;
  while (i + 12 <= src.length) {
    const len = view.getUint32(i);
    const end = i + 12 + len;
    if (end > src.length) break;
    const type = String.fromCharCode(src[i + 4]!, src[i + 5]!, src[i + 6]!, src[i + 7]!);
    chunks.push({ type, start: i, end });
    i = end;
    if (type === 'IEND') break;
  }
  return chunks;
}

export function pngOrientation(src: Uint8Array): number {
  const chunk = pngChunks(src).find((c) => c.type === 'eXIf');
  return chunk ? exifOrientation(src.subarray(chunk.start + 8, chunk.end - 4)) : 1;
}

export function stripPng(src: Uint8Array): Uint8Array {
  const kept = pngChunks(src)
    .filter((c) => !PNG_DROP.has(c.type))
    .map((c) => src.subarray(c.start, c.end));
  return concat([src.subarray(0, 8), ...kept]);
}

// ---------- WebP ----------

interface RiffChunk {
  fourcc: string;
  start: number;
  /** Data length excluding padding. */
  size: number;
  /** End including the padding byte. */
  end: number;
}

function webpChunks(src: Uint8Array): RiffChunk[] {
  const isRiff = startsWith(src, 'RIFF') && src.length >= 12 && String.fromCharCode(...src.subarray(8, 12)) === 'WEBP';
  if (!isRiff) throw new Error('This is not a valid WebP file.');
  const view = new DataView(src.buffer, src.byteOffset, src.byteLength);
  const chunks: RiffChunk[] = [];
  let i = 12;
  while (i + 8 <= src.length) {
    const size = view.getUint32(i + 4, true);
    const end = Math.min(src.length, i + 8 + size + (size & 1));
    chunks.push({ fourcc: String.fromCharCode(...src.subarray(i, i + 4)), start: i, size, end });
    i = end;
  }
  return chunks;
}

export function webpOrientation(src: Uint8Array): number {
  const chunk = webpChunks(src).find((c) => c.fourcc === 'EXIF');
  if (!chunk) return 1;
  let data = src.subarray(chunk.start + 8, chunk.start + 8 + chunk.size);
  if (startsWith(data, EXIF_HEADER)) data = data.subarray(6);
  return exifOrientation(data);
}

export function stripWebp(src: Uint8Array): Uint8Array {
  const parts: Uint8Array[] = [];
  for (const chunk of webpChunks(src)) {
    if (chunk.fourcc === 'EXIF' || chunk.fourcc === 'XMP ') continue;
    const bytes = src.slice(chunk.start, chunk.end);
    if (chunk.fourcc === 'VP8X' && bytes.length > 8) bytes[8] = bytes[8]! & ~(0x08 | 0x04); // clear EXIF + XMP flags
    parts.push(bytes);
  }
  const body = concat(parts);
  const header = new Uint8Array(12);
  header.set(ascii('RIFF'), 0);
  new DataView(header.buffer).setUint32(4, body.length + 4, true);
  header.set(ascii('WEBP'), 8);
  return concat([header, body]);
}
