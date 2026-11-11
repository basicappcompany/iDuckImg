/** A JPEG comment segment holds at most 65533 data bytes (the length field counts itself). */
const MAX_COMMENT_DATA = 65_533;

/**
 * Some exam forms demand a MINIMUM file size, and a simple picture can compress below it. A JPEG
 * may carry comment segments that viewers ignore, so adding filler there raises the file size
 * without changing a single pixel. Returns the input unchanged if it is already big enough.
 * The result is exactly `minBytes` long, except when the gap is 1 to 3 bytes: a segment needs at
 * least 4 bytes, so the file then ends up at most 3 bytes over.
 */
export function padJpegToMinimum(jpeg: Uint8Array, minBytes: number): Uint8Array {
  if (jpeg.length >= minBytes) return jpeg;
  if (jpeg.length < 2 || jpeg[0] !== 0xff || jpeg[1] !== 0xd8) throw new Error('This is not a valid JPG file.');

  // Each segment costs 4 bytes of overhead (marker + length) plus its data.
  let remaining = minBytes - jpeg.length;
  const segments: Uint8Array[] = [];
  while (remaining > 0) {
    const data = Math.min(MAX_COMMENT_DATA, Math.max(0, remaining - 4));
    const segment = new Uint8Array(4 + data);
    segment[0] = 0xff;
    segment[1] = 0xfe;
    segment[2] = (data + 2) >> 8;
    segment[3] = (data + 2) & 0xff;
    segment.fill(0x20, 4); // spaces
    segments.push(segment);
    remaining -= segment.length;
  }

  const out = new Uint8Array(jpeg.length + segments.reduce((n, s) => n + s.length, 0));
  out.set(jpeg.subarray(0, 2), 0);
  let offset = 2;
  for (const s of segments) {
    out.set(s, offset);
    offset += s.length;
  }
  out.set(jpeg.subarray(2), offset);
  return out;
}
