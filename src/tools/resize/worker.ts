import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { findQualityForTarget } from '../../lib/quality-search';
import { computeSize, type ResizeOptions } from './options';
import type { ImageFormat } from '../image-format';

export interface ResizeWorkerResult {
  buffer: ArrayBuffer;
  width: number;
  height: number;
  quality: number | null;
}

const api = {
  async resize(
    buffer: ArrayBuffer,
    inputFormat: ImageFormat,
    outputFormat: ImageFormat,
    options: ResizeOptions,
    onProgress: (fraction: number) => void,
  ): Promise<ResizeWorkerResult> {
    onProgress(0.05);
    const source = await decodeToImageData(buffer, inputFormat);
    onProgress(0.25);

    const size = computeSize({ width: source.width, height: source.height }, options);
    let image = source;
    if (size.width !== source.width || size.height !== source.height) {
      const { default: resize } = await import('@jsquash/resize');
      image = await resize(source, { ...size, method: 'lanczos3', fitMethod: 'stretch' });
    }
    onProgress(0.5);

    const lossy = outputFormat !== 'png';
    if (options.targetKb && lossy) {
      const targetBytes = Math.round(options.targetKb * 1024);
      const found = await findQualityForTarget(
        async (q) => (await encodeImage(image, outputFormat, q)).byteLength,
        targetBytes,
        { onStep: (f) => onProgress(0.5 + f * 0.45) },
      );
      if (!found.met) {
        throw new Error(
          `Could not get under ${options.targetKb} KB at ${size.width}x${size.height}. Try a smaller size.`,
        );
      }
      const out = await encodeImage(image, outputFormat, found.quality);
      onProgress(1);
      return { buffer: out, width: size.width, height: size.height, quality: found.quality };
    }

    const quality = Math.min(100, Math.max(1, Math.round(options.quality)));
    const out = await encodeImage(image, outputFormat, quality);
    onProgress(1);
    return {
      buffer: out,
      width: size.width,
      height: size.height,
      quality: lossy ? quality : null,
    };
  },
};

export type ResizeWorkerApi = typeof api;
Comlink.expose(api);
