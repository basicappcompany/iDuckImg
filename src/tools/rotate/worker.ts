import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { transformImage } from '../shared/transform';
import type { RotateOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async rotate(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: RotateOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.4);
    const turned = transformImage(image, options);
    onProgress(0.6);
    const quality = Math.min(100, Math.max(1, Math.round(options.quality)));
    const out = await encodeImage(turned, format, quality);
    onProgress(1);
    return out;
  },
};

export type RotateWorkerApi = typeof api;
Comlink.expose(api);
