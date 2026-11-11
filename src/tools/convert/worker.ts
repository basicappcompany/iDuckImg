import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { clampQuality, pdfPlacement, type ConvertOptions } from './options';
import type { ImageFormat } from '../image-format';

async function toPdf(
  buffer: ArrayBuffer,
  inputFormat: ImageFormat,
  options: ConvertOptions,
  onProgress: (fraction: number) => void,
): Promise<ArrayBuffer> {
  const { PDFDocument } = await import('@cantoo/pdf-lib');
  const doc = await PDFDocument.create();

  // PNG is embedded as is, which keeps transparency. JPEG and WebP go through the decoder
  // first so phone-photo rotation (EXIF) is applied; pdf-lib would ignore it. They are then
  // re-encoded as high-quality JPEG, so a WebP with transparency gets a white background.
  let image;
  let width: number;
  let height: number;
  if (inputFormat === 'png') {
    image = await doc.embedPng(buffer);
    ({ width, height } = image);
    onProgress(0.7);
  } else {
    const pixels = await decodeToImageData(buffer, inputFormat);
    onProgress(0.4);
    const jpeg = await encodeImage(pixels, 'jpeg', 92);
    image = await doc.embedJpg(jpeg);
    ({ width, height } = pixels);
    onProgress(0.7);
  }

  const place = pdfPlacement(width, height, options.pdfPage);
  const page = doc.addPage([place.pageWidth, place.pageHeight]);
  page.drawImage(image, { x: place.x, y: place.y, width: place.width, height: place.height });
  // One page, so object streams save almost nothing; plain output is more widely readable.
  const bytes = await doc.save({ useObjectStreams: false });
  onProgress(1);
  return bytes.slice().buffer as ArrayBuffer;
}

const api = {
  async convert(
    buffer: ArrayBuffer,
    inputFormat: ImageFormat,
    options: ConvertOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    if (options.target === 'pdf') return toPdf(buffer, inputFormat, options, onProgress);

    const pixels = await decodeToImageData(buffer, inputFormat);
    onProgress(0.5);
    const out = await encodeImage(pixels, options.target, clampQuality(options.quality));
    onProgress(1);
    return out;
  },
};

export type ConvertWorkerApi = typeof api;
Comlink.expose(api);
