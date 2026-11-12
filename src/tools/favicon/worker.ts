import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { buildIco } from './ico';
import { FAVICON_PNGS, ICO_SIZES, fitSquare, type FaviconFit, type FaviconOptions } from './options';
import type { ImageFormat } from '../image-format';

export interface FaviconFile {
  name: string;
  type: string;
  bytes: ArrayBuffer;
}

/** The picture drawn onto a square canvas of `size`, then saved as PNG bytes. */
async function squarePng(source: OffscreenCanvas, size: number, fit: FaviconFit): Promise<Uint8Array> {
  const { from, to } = fitSquare(source.width, source.height, size, fit);
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not draw the icon.');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, from.x, from.y, from.width, from.height, to.x, to.y, to.width, to.height);
  return new Uint8Array(await encodeImage(ctx.getImageData(0, 0, size, size), 'png', 100));
}

const api = {
  async make(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: FaviconOptions,
    onProgress: (fraction: number) => void,
  ): Promise<FaviconFile[]> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    const source = new OffscreenCanvas(image.width, image.height);
    const sourceCtx = source.getContext('2d');
    if (!sourceCtx) throw new Error('Could not read the picture.');
    sourceCtx.putImageData(image, 0, 0);
    onProgress(0.2);

    const files: FaviconFile[] = [];
    const icoImages: { size: number; png: Uint8Array }[] = [];
    for (const size of ICO_SIZES) icoImages.push({ size, png: await squarePng(source, size, options.fit) });
    const ico = buildIco(icoImages);
    files.push({ name: 'favicon.ico', type: 'image/vnd.microsoft.icon', bytes: ico.buffer.slice(ico.byteOffset, ico.byteOffset + ico.byteLength) as ArrayBuffer });
    onProgress(0.5);

    for (const [i, { name, size }] of FAVICON_PNGS.entries()) {
      const png = await squarePng(source, size, options.fit);
      files.push({ name, type: 'image/png', bytes: png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer });
      onProgress(0.5 + (0.5 * (i + 1)) / FAVICON_PNGS.length);
    }
    return files;
  },
};

export type FaviconWorkerApi = typeof api;
Comlink.expose(api);
