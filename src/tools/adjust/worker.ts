import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { adjustPixels, type AdjustOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async adjust(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: AdjustOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.3);
    const data = adjustPixels(image, options);
    onProgress(0.7);
    const quality = Math.min(100, Math.max(1, Math.round(options.quality)));
    const out = await encodeImage(new ImageData(data, image.width, image.height), format, quality);
    onProgress(1);
    return out;
  },
};

export type AdjustWorkerApi = typeof api;
Comlink.expose(api);
