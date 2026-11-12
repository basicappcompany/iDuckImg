import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { drawFramed } from './draw';
import { borderedSize, tooLarge, type BorderOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async addBorder(
    buffer: ArrayBuffer,
    format: ImageFormat,
    outputFormat: ImageFormat,
    options: BorderOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    const size = borderedSize(image.width, image.height, options.thicknessPct);
    if (tooLarge(size)) throw new Error('With the border this picture would be over 100 megapixels. Use a thinner border.');
    onProgress(0.3);
    const picture = new OffscreenCanvas(image.width, image.height);
    const pictureCtx = picture.getContext('2d');
    if (!pictureCtx) throw new Error('Could not draw the picture.');
    pictureCtx.putImageData(image, 0, 0);
    const canvas = new OffscreenCanvas(size.width, size.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not draw the picture.');
    drawFramed(ctx, picture, image.width, image.height, options);
    const framed = ctx.getImageData(0, 0, size.width, size.height);
    onProgress(0.7);
    const out = await encodeImage(framed, outputFormat, Math.min(100, Math.max(1, Math.round(options.quality))));
    onProgress(1);
    return out;
  },
};

export type BorderWorkerApi = typeof api;
Comlink.expose(api);
