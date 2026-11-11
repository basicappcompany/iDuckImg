import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { withExtension } from '../../lib/files';
import { detectFormat, extensionOf, mimeOf } from '../image-format';
import type { ExifWorkerApi } from './worker';

export type ExifOptions = Record<string, never>;

export const EXIF_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

const handle = new WorkerHandle<ExifWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

/** photo.jpeg -> photo-clean.jpg */
export function cleanName(inputName: string, ext: string): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-clean`, ext);
}

export const exifTool: ToolDefinition<ExifOptions> = {
  id: 'exif-remove',
  accepts: EXIF_ACCEPTS,
  defaultOptions: {},
  async run(file, _options, ctx): Promise<OutputFile[]> {
    const format = detectFormat(file);
    if (!format) throw new Error('Unsupported image type. Use JPG, PNG or WebP.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call((api) => api.strip(buffer, format, progressProxy(ctx.onProgress)), ctx.signal);
    return [{ name: cleanName(file.name, extensionOf(format)), blob: new Blob([result], { type: mimeOf(format) }) }];
  },
};
