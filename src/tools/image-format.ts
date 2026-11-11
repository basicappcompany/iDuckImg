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

/** Detect the input format from its MIME type, falling back to the file extension. */
export function detectFormat(file: { type: string; name: string }): ImageFormat | null {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (type === 'image/jpeg' || /\.jpe?g$/.test(name)) return 'jpeg';
  if (type === 'image/png' || name.endsWith('.png')) return 'png';
  if (type === 'image/webp' || name.endsWith('.webp')) return 'webp';
  return null;
}
