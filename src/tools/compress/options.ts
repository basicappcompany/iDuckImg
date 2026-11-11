import { withExtension } from '../../lib/files';

export type ImageFormat = 'jpeg' | 'png' | 'webp';

export interface CompressOptions {
  /** 1 to 100. Applies to JPEG and WebP. PNG is always lossless. */
  quality: number;
  /** 'same' keeps each file's format; 'webp' converts everything to WebP. */
  format: 'same' | 'webp';
}

export const defaultCompressOptions: CompressOptions = { quality: 75, format: 'same' };

export const COMPRESS_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

const MIME: Record<ImageFormat, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};
const EXT: Record<ImageFormat, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };

export function mimeOf(format: ImageFormat): string {
  return MIME[format];
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

export function targetFormat(input: ImageFormat, options: CompressOptions): ImageFormat {
  return options.format === 'webp' ? 'webp' : input;
}

export function clampQuality(quality: number): number {
  if (!Number.isFinite(quality)) return defaultCompressOptions.quality;
  return Math.min(100, Math.max(1, Math.round(quality)));
}

/** photo.jpg -> photo-compressed.jpg (extension follows the output format). */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-compressed`, EXT[format]);
}

/**
 * Compression must never make a file bigger. If the result is not smaller and the format
 * is unchanged, keep the original bytes.
 */
export function shouldKeepOriginal(
  originalSize: number,
  compressedSize: number,
  sameFormat: boolean,
): boolean {
  return sameFormat && compressedSize >= originalSize;
}
