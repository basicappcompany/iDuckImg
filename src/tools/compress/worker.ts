import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import type { ImageFormat } from '../image-format';

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

    const image = await decodeToImageData(buffer, inputFormat);
    onProgress(0.4);
    const out = await encodeImage(image, outputFormat, quality);
    onProgress(1);
    return out;
  },
};

export type CompressWorkerApi = typeof api;
Comlink.expose(api);
