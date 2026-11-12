import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { applyEffect, regionToPixels, type BlurOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async hide(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: BlurOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.3);
    for (const region of options.regions) {
      applyEffect(image, regionToPixels(region, image.width, image.height), options.effect, options.strength, options.cover);
    }
    onProgress(0.7);
    const out = await encodeImage(image, format, Math.min(100, Math.max(1, Math.round(options.quality))));
    onProgress(1);
    return out;
  },
};

export type BlurWorkerApi = typeof api;
Comlink.expose(api);
