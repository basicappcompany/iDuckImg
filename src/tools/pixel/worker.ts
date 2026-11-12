import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { blockSize, pixelate, type PixelOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async pixelate(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: PixelOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.3);
    const data = pixelate(image, blockSize(image.width, options.blocks), options.colours);
    onProgress(0.7);
    const out = await encodeImage(new ImageData(data, image.width, image.height), 'png', 100);
    onProgress(1);
    return out;
  },
};

export type PixelWorkerApi = typeof api;
Comlink.expose(api);
