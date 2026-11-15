import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export { detectFormat, mimeOf, type ImageFormat } from '../image-format';

export interface CompressOptions {
  /** 1 to 100. Applies to JPEG, WebP and AVIF. PNG is always lossless. */
  quality: number;
  /** 'same' keeps each file's format; 'webp' and 'avif' convert everything to that format. */
  format: 'same' | 'webp' | 'avif';
}

export const defaultCompressOptions: CompressOptions = { quality: 75, format: 'same' };

export const COMPRESS_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export function targetFormat(input: ImageFormat, options: CompressOptions): ImageFormat {
  return options.format === 'same' ? input : options.format;
}

export function clampQuality(quality: number): number {
  if (!Number.isFinite(quality)) return defaultCompressOptions.quality;
  return Math.min(100, Math.max(1, Math.round(quality)));
}

/** photo.jpg -> photo-compressed.jpg (extension follows the output format). */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-compressed`, extensionOf(format));
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
