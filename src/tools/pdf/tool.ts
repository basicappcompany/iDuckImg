import { WorkerHandle } from '../../engine/worker-handle';
import type { CombinedToolDefinition, OutputFile } from '../../engine/types';
import { detectFormat } from '../image-format';
import type { PdfPageMode } from '../convert/options';
import type { PdfWorkerApi } from './worker';

export interface ImagesToPdfOptions {
  pdfPage: PdfPageMode;
}

export const IMAGES_TO_PDF_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

const handle = new WorkerHandle<PdfWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const imagesToPdfTool: CombinedToolDefinition<ImagesToPdfOptions> = {
  id: 'images-to-pdf',
  accepts: IMAGES_TO_PDF_ACCEPTS,
  defaultOptions: { pdfPage: 'a4' },
  async runAll(files, options, ctx): Promise<OutputFile[]> {
    if (files.length === 0) throw new Error('Add at least one image.');
    await handle.call((api) => api.begin(), ctx.signal);
    for (const [i, file] of files.entries()) {
      const format = detectFormat(file);
      if (!format) throw new Error(`${file.name}: unsupported image type. Use JPG, PNG or WebP.`);
      const buffer = await file.arrayBuffer();
      try {
        await handle.call((api) => api.addImage(buffer, format, options.pdfPage), ctx.signal);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') throw error;
        throw new Error(`${file.name}: ${error instanceof Error ? error.message : 'could not be added'}`);
      }
      ctx.onProgress((i + 1) / (files.length + 1));
    }
    const pdf = await handle.call((api) => api.finish(), ctx.signal);
    ctx.onProgress(1);
    return [{ name: 'images.pdf', blob: new Blob([pdf], { type: 'application/pdf' }) }];
  },
};
