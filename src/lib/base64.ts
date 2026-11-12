/** Base64 for pictures: encode to a data URI or code snippet, and decode pasted text back to a file. */

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  // btoa wants a string, and spreading a big array into one call overflows the stack: go in chunks.
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

/** Null when the text is not valid Base64. Accepts URL-safe characters, line breaks and missing padding. */
export function base64ToBytes(text: string): Uint8Array | null {
  const clean = text.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (clean === '' || !/^[A-Za-z0-9+/]*={0,2}$/.test(clean)) return null;
  const core = clean.replace(/=+$/, '');
  const padded = core + '='.repeat((4 - (core.length % 4)) % 4);
  try {
    const binary = atob(padded);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

const startsWith = (b: Uint8Array, sig: number[], at = 0) => sig.every((v, i) => b[at + i] === v);
const ascii = (b: Uint8Array, from: number, to: number) => String.fromCharCode(...b.subarray(from, to));

/** What kind of picture these bytes are, from their first bytes, or null. */
export function sniffMime(b: Uint8Array): string | null {
  if (startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png';
  if (startsWith(b, [0xff, 0xd8, 0xff])) return 'image/jpeg';
  if (ascii(b, 0, 4) === 'GIF8') return 'image/gif';
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP') return 'image/webp';
  if (ascii(b, 0, 2) === 'BM') return 'image/bmp';
  if (ascii(b, 4, 8) === 'ftyp' && /^(avif|avis)$/.test(ascii(b, 8, 12))) return 'image/avif';
  if (startsWith(b, [0, 0, 1, 0])) return 'image/x-icon';
  const head = new TextDecoder().decode(b.subarray(0, 512)).trimStart();
  if (/^(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)?(<!doctype svg[^>]*>\s*)?<svg\b/i.test(head)) return 'image/svg+xml';
  return null;
}

const EXT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/avif': 'avif',
  'image/x-icon': 'ico',
  'image/svg+xml': 'svg',
};

export function extensionForMime(mime: string): string {
  return EXT[mime] ?? 'img';
}

export type OutputStyle = 'datauri' | 'base64' | 'css' | 'html';

export const OUTPUT_STYLES: { id: OutputStyle; label: string }[] = [
  { id: 'datauri', label: 'Data URI (data:image/png;base64,...)' },
  { id: 'base64', label: 'Base64 text only' },
  { id: 'css', label: 'CSS background' },
  { id: 'html', label: 'HTML img tag' },
];

/** The text to show for one picture in the chosen style. */
export function formatOutput(bytes: Uint8Array, mime: string, style: OutputStyle): string {
  const b64 = bytesToBase64(bytes);
  const uri = `data:${mime};base64,${b64}`;
  if (style === 'base64') return b64;
  if (style === 'css') return `background-image: url("${uri}");`;
  if (style === 'html') return `<img src="${uri}" alt="">`;
  return uri;
}

export type ParsedImage = { ok: true; mime: string; ext: string; bytes: Uint8Array } | { ok: false; error: string };

/** Pasted text (a data URI or bare Base64) -> picture bytes and type, or a plain-words error. */
export function parseBase64Image(text: string): ParsedImage {
  const trimmed = text.trim();
  if (trimmed === '') return { ok: false, error: 'Paste some Base64 text first.' };
  let payload = trimmed;
  let declared: string | null = null;
  const uri = /^data:([^;,]*)((?:;[^;,]*)*),([\s\S]*)$/i.exec(trimmed);
  if (uri) {
    if (!/;base64/i.test(uri[2]!)) return { ok: false, error: 'This data URI is not Base64. Only ;base64 data is supported.' };
    declared = uri[1]!.toLowerCase() || null;
    payload = uri[3]!;
  }
  const bytes = base64ToBytes(payload);
  if (!bytes) return { ok: false, error: 'That is not valid Base64. Check that nothing was cut off when you copied it.' };
  const mime = sniffMime(bytes) ?? (declared && declared.startsWith('image/') ? declared : null);
  if (!mime) return { ok: false, error: 'The text decodes, but not to a picture this tool recognises (PNG, JPG, GIF, WebP, BMP, AVIF, SVG or ICO).' };
  return { ok: true, mime, ext: extensionForMime(mime), bytes };
}
