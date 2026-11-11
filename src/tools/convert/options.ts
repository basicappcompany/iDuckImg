import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type ConvertTarget = ImageFormat | 'pdf';
export type PdfPageMode = 'fit' | 'a4';

export interface ConvertOptions {
  target: ConvertTarget;
  /** JPG and WebP output only. */
  quality: number;
  /** PDF output only. 'fit' makes the page the size of the image; 'a4' centres it on A4. */
  pdfPage: PdfPageMode;
}

export const defaultConvertOptions: ConvertOptions = { target: 'jpeg', quality: 90, pdfPage: 'fit' };

export const CONVERT_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const A4 = { width: 595.28, height: 841.89 } as const;
export const A4_MARGIN = 36;
/** PDF viewers cap pages at 14400 points on a side. */
export const MAX_PDF_SIDE = 14_400;

export interface PdfPlacement {
  pageWidth: number;
  pageHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Where to draw an image on a PDF page. Units are points. The image is never distorted.
 * 'fit': page matches the image (scaled down only if it would exceed the PDF page limit).
 * 'a4': A4 in the orientation that suits the image, image centred inside a margin.
 */
export function pdfPlacement(imageWidth: number, imageHeight: number, mode: PdfPageMode): PdfPlacement {
  if (mode === 'a4') {
    const landscape = imageWidth > imageHeight;
    const pageWidth = landscape ? A4.height : A4.width;
    const pageHeight = landscape ? A4.width : A4.height;
    const boxW = pageWidth - 2 * A4_MARGIN;
    const boxH = pageHeight - 2 * A4_MARGIN;
    const scale = Math.min(boxW / imageWidth, boxH / imageHeight);
    const width = imageWidth * scale;
    const height = imageHeight * scale;
    return { pageWidth, pageHeight, x: (pageWidth - width) / 2, y: (pageHeight - height) / 2, width, height };
  }
  const scale = Math.min(1, MAX_PDF_SIDE / Math.max(imageWidth, imageHeight));
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return { pageWidth: width, pageHeight: height, x: 0, y: 0, width, height };
}

export function clampQuality(quality: number): number {
  if (!Number.isFinite(quality)) return defaultConvertOptions.quality;
  return Math.min(100, Math.max(1, Math.round(quality)));
}

export function targetExtension(target: ConvertTarget): string {
  return target === 'pdf' ? 'pdf' : extensionOf(target);
}

/** photo.png -> photo.jpg. Keeps the base name so converted files are easy to match up. */
export function outputName(inputName: string, target: ConvertTarget): string {
  return withExtension(inputName, targetExtension(target));
}

export function mimeOfTarget(target: ConvertTarget): string {
  if (target === 'pdf') return 'application/pdf';
  return { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[target];
}

/** True when the target format has no transparency, so transparent areas become white. */
export function losesTransparency(target: ConvertTarget): boolean {
  return target === 'jpeg';
}
