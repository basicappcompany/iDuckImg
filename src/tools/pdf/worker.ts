import * as Comlink from 'comlink';
import type { PDFDocument } from '@cantoo/pdf-lib';
import { addImagePage, savePdf } from '../shared/pdf';
import type { PdfPageMode } from '../convert/options';
import type { ImageFormat } from '../image-format';

/**
 * The document lives in the worker and grows one image at a time, so the page never holds
 * every photo in memory at once. Cancelling terminates the worker, which discards it.
 */
let doc: PDFDocument | null = null;

const api = {
  async begin(): Promise<void> {
    const { PDFDocument } = await import('@cantoo/pdf-lib');
    doc = await PDFDocument.create();
    doc.setProducer('iDuckImg');
    doc.setCreator('iDuckImg');
  },

  async addImage(buffer: ArrayBuffer, format: ImageFormat, mode: PdfPageMode): Promise<void> {
    if (!doc) throw new Error('PDF was not started.');
    await addImagePage(doc, buffer, format, mode);
  },

  async finish(): Promise<ArrayBuffer> {
    if (!doc) throw new Error('PDF was not started.');
    const out = await savePdf(doc);
    doc = null;
    return out;
  },
};

export type PdfWorkerApi = typeof api;
Comlink.expose(api);
