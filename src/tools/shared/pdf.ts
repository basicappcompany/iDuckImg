import type { PDFDocument } from '@cantoo/pdf-lib';
import { pdfPlacement, type PdfPageMode } from '../convert/options';
import { decodeToImageData, encodeImage } from './codec';
import type { ImageFormat } from '../image-format';

/**
 * Add one image as one page. PNG is embedded as is, which keeps transparency. JPEG and WebP go
 * through the decoder first so phone-photo rotation (EXIF) is applied, which pdf-lib would
 * ignore; they are then re-encoded as high-quality JPEG, so a WebP with transparency gets a
 * white background.
 */
export async function addImagePage(
  doc: PDFDocument,
  buffer: ArrayBuffer,
  format: ImageFormat,
  mode: PdfPageMode,
): Promise<void> {
  let image;
  let width: number;
  let height: number;
  if (format === 'png') {
    image = await doc.embedPng(buffer);
    ({ width, height } = image);
  } else {
    const pixels = await decodeToImageData(buffer, format);
    const jpeg = await encodeImage(pixels, 'jpeg', 92);
    image = await doc.embedJpg(jpeg);
    ({ width, height } = pixels);
  }
  const place = pdfPlacement(width, height, mode);
  const page = doc.addPage([place.pageWidth, place.pageHeight]);
  page.drawImage(image, { x: place.x, y: place.y, width: place.width, height: place.height });
}

/** One page per image, so object streams save almost nothing; plain output is more widely readable. */
export async function savePdf(doc: PDFDocument): Promise<ArrayBuffer> {
  const bytes = await doc.save({ useObjectStreams: false });
  return bytes.slice().buffer as ArrayBuffer;
}
