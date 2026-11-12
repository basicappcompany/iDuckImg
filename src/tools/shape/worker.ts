import * as Comlink from 'comlink';
import { decodeToImageData } from '../shared/codec';
import { shapeGeometry, type ShapeOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async shape(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: ShapeOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.4);
    const g = shapeGeometry(image.width, image.height, options);

    const source = new OffscreenCanvas(image.width, image.height);
    const sctx = source.getContext('2d');
    const out = new OffscreenCanvas(g.outWidth, g.outHeight);
    const ctx = out.getContext('2d');
    if (!sctx || !ctx) throw new Error('Could not process the image.');
    sctx.putImageData(image, 0, 0);

    // Clip to a rounded rectangle (a circle when the radius is half the side), then draw the picture inside it.
    const r = Math.min(g.radius, g.outWidth / 2, g.outHeight / 2);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(g.outWidth, 0, g.outWidth, g.outHeight, r);
    ctx.arcTo(g.outWidth, g.outHeight, 0, g.outHeight, r);
    ctx.arcTo(0, g.outHeight, 0, 0, r);
    ctx.arcTo(0, 0, g.outWidth, 0, r);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(source, g.srcX, g.srcY, g.outWidth, g.outHeight, 0, 0, g.outWidth, g.outHeight);
    onProgress(0.8);

    const blob = await out.convertToBlob({ type: 'image/png' });
    const bytes = await blob.arrayBuffer();
    onProgress(1);
    return bytes;
  },
};

export type ShapeWorkerApi = typeof api;
Comlink.expose(api);
