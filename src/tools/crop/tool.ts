import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { withExtension } from '../../lib/files';
import { detectFormat, extensionOf, mimeOf } from '../image-format';
import type { CropWorkerApi } from './worker';
import type { Rect } from './geometry';

export interface CropOptions {
  rect: Rect;
  /** JPG and WebP only. A crop of a JPG has to be saved again; PNG stays lossless. */
  quality: number;
}

// HEIC is left out: browsers cannot show it in the preview, so the user could not place the box.
export const CROP_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

const handle = new WorkerHandle<CropWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export function croppedName(inputName: string, ext: string): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-cropped`, ext);
}

export const cropTool: ToolDefinition<CropOptions> = {
  id: 'crop',
  accepts: CROP_ACCEPTS,
  defaultOptions: { rect: { x: 0, y: 0, width: 1, height: 1 }, quality: 92 },
  async run(file, options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call(
      (api) => api.crop(buffer, format, options.rect, options.quality, progressProxy(ctx.onProgress)),
      ctx.signal,
    );
    return [
      {
        name: croppedName(file.name, extensionOf(format)),
        blob: new Blob([result.buffer], { type: mimeOf(format) }),
        width: result.width,
        height: result.height,
      },
    ];
  },
};
