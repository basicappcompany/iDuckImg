export type ImageFormat = 'jpeg' | 'png' | 'webp';

const MIME: Record<ImageFormat, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};
const EXT: Record<ImageFormat, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };

export function mimeOf(format: ImageFormat): string {
  return MIME[format];
}

export function extensionOf(format: ImageFormat): string {
  return EXT[format];
}

/** Formats we can read. HEIC (iPhone photos) can be decoded but is never an output format. */
export type InputFormat = ImageFormat | 'heic';

/** Accept entries for the file picker. Browsers often report no MIME type for HEIC, so list extensions too. */
export const HEIC_ACCEPTS = ['image/heic', 'image/heif', '.heic', '.heif'] as const;

export function isHeic(file: { type: string; name: string }): boolean {
  const type = file.type.toLowerCase();
  return type === 'image/heic' || type === 'image/heif' || /\.(heic|heif)$/i.test(file.name);
}

/** Like detectFormat, but also recognises HEIC/HEIF. */
export function detectInputFormat(file: { type: string; name: string }): InputFormat | null {
  return detectFormat(file) ?? (isHeic(file) ? 'heic' : null);
}

/** Detect the input format from its MIME type, falling back to the file extension. */
export function detectFormat(file: { type: string; name: string }): ImageFormat | null {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (type === 'image/jpeg' || /\.jpe?g$/.test(name)) return 'jpeg';
  if (type === 'image/png' || name.endsWith('.png')) return 'png';
  if (type === 'image/webp' || name.endsWith('.webp')) return 'webp';
  return null;
}
