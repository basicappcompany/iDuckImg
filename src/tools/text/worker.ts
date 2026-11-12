import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { drawText } from './draw';
import { clamp, type TextOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async addText(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: TextOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.4);
    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not draw on the image.');
    ctx.putImageData(image, 0, 0);
    drawText(ctx, image.width, image.height, options);
    const marked = ctx.getImageData(0, 0, image.width, image.height);
    onProgress(0.7);
    const out = await encodeImage(marked, format, clamp(Math.round(options.quality), 1, 100));
    onProgress(1);
    return out;
  },
};

export type TextWorkerApi = typeof api;
Comlink.expose(api);
