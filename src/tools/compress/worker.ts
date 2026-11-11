import * as Comlink from 'comlink';
import { assessPixels } from '../../engine/limits';
import { mimeOf, type ImageFormat } from './options';

async function decode(buffer: ArrayBuffer, mime: string): Promise<ImageData> {
  const bitmap = await createImageBitmap(new Blob([buffer], { type: mime }));
  try {
    if (assessPixels(bitmap.width, bitmap.height) === 'too-large') {
      throw new Error('Image is too large to process on this device (over 100 megapixels).');
    }
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not read the image.');
    ctx.drawImage(bitmap, 0, 0);
    return ctx.getImageData(0, 0, bitmap.width, bitmap.height);
  } finally {
    bitmap.close();
  }
}

const api = {
  async compress(
    buffer: ArrayBuffer,
    inputFormat: ImageFormat,
    outputFormat: ImageFormat,
    quality: number,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.05);
    // PNG to PNG: optimise the original bytes losslessly, no decode needed.
    if (inputFormat === 'png' && outputFormat === 'png') {
      const { optimise } = await import('@jsquash/oxipng');
      onProgress(0.2);
      const out = await optimise(buffer, { level: 3, interlace: false, optimiseAlpha: true });
      onProgress(1);
      return out;
    }

    const image = await decode(buffer, mimeOf(inputFormat));
    onProgress(0.4);
    let out: ArrayBuffer;
    if (outputFormat === 'jpeg') {
      const { encode } = await import('@jsquash/jpeg');
      out = await encode(image, { quality });
    } else if (outputFormat === 'webp') {
      const { encode } = await import('@jsquash/webp');
      out = await encode(image, { quality });
    } else {
      const { encode } = await import('@jsquash/png');
      out = await encode(image);
    }
    onProgress(1);
    return out;
  },
};

export type CompressWorkerApi = typeof api;
Comlink.expose(api);
