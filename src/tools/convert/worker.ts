import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { addImagePage, savePdf } from '../shared/pdf';
import { clampQuality, type ConvertOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async convert(
    buffer: ArrayBuffer,
    inputFormat: ImageFormat,
    options: ConvertOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    if (options.target === 'pdf') {
      const { PDFDocument } = await import('@cantoo/pdf-lib');
      const doc = await PDFDocument.create();
      await addImagePage(doc, buffer, inputFormat, options.pdfPage);
      onProgress(0.9);
      const out = await savePdf(doc);
      onProgress(1);
      return out;
    }

    const pixels = await decodeToImageData(buffer, inputFormat);
    onProgress(0.5);
    const out = await encodeImage(pixels, options.target, clampQuality(options.quality));
    onProgress(1);
    return out;
  },
};

export type ConvertWorkerApi = typeof api;
Comlink.expose(api);
