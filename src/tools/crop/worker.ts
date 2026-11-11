import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { cropImage } from '../shared/transform';
import type { Rect } from './geometry';
import type { ImageFormat } from '../image-format';

const api = {
  async crop(
    buffer: ArrayBuffer,
    format: ImageFormat,
    rect: Rect,
    quality: number,
    onProgress: (fraction: number) => void,
  ): Promise<{ buffer: ArrayBuffer; width: number; height: number }> {
    onProgress(0.05);
    const image = await decodeToImageData(buffer, format);
    onProgress(0.4);
    // The preview and this decoder both apply the photo's rotation, so the sizes should match.
    // If they do not, cropping would cut the wrong part, so stop instead of guessing.
    if (rect.x + rect.width > image.width || rect.y + rect.height > image.height) {
      throw new Error('The crop box does not fit this picture. Choose the picture again and redo the crop.');
    }
    const cut = cropImage(image, rect.x, rect.y, rect.width, rect.height);
    onProgress(0.6);
    const out = await encodeImage(cut, format, Math.min(100, Math.max(1, Math.round(quality))));
    onProgress(1);
    return { buffer: out, width: cut.width, height: cut.height };
  },
};

export type CropWorkerApi = typeof api;
Comlink.expose(api);
