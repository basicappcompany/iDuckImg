import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { clamp } from '../watermark/options';
import { drawLogo } from './draw';
import type { LogoOptions } from './options';
import type { ImageFormat } from '../image-format';

const api = {
  async addLogo(
    buffer: ArrayBuffer,
    format: ImageFormat,
    options: LogoOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    if (!options.logo) throw new Error('Choose a logo first.');
    onProgress(0.05);
    let logo: ImageBitmap;
    try {
      logo = await createImageBitmap(options.logo);
    } catch {
      throw new Error('The logo could not be read. Use a PNG, JPG or WebP picture.');
    }
    try {
      const image = await decodeToImageData(buffer, format);
      onProgress(0.4);
      const canvas = new OffscreenCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not draw on the image.');
      ctx.putImageData(image, 0, 0);
      drawLogo(ctx, image.width, image.height, logo, options);
      const marked = ctx.getImageData(0, 0, image.width, image.height);
      onProgress(0.7);
      const out = await encodeImage(marked, format, clamp(Math.round(options.quality), 1, 100));
      onProgress(1);
      return out;
    } finally {
      logo.close();
    }
  },
};

export type LogoWorkerApi = typeof api;
Comlink.expose(api);
