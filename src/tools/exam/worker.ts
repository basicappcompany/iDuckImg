import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { cropImage } from '../shared/transform';
import { findQualityForTarget } from '../../lib/quality-search';
import { padJpegToMinimum } from './jpeg-pad';
import { checkOptions, kbToBytes, planFit, type ExamOptions } from './options';
import type { InputFormat } from '../image-format';

async function fitToSize(image: ImageData, options: ExamOptions): Promise<ImageData> {
  if (!options.size) return image;
  const plan = planFit({ width: image.width, height: image.height }, options.size, options.fit);

  let resized = image;
  if (plan.resizeTo.width !== image.width || plan.resizeTo.height !== image.height) {
    const { default: resize } = await import('@jsquash/resize');
    resized = await resize(image, { ...plan.resizeTo, method: 'lanczos3', fitMethod: 'stretch' });
  }

  if (options.fit === 'crop') {
    return cropImage(resized, plan.offset.x, plan.offset.y, plan.canvas.width, plan.canvas.height);
  }
  if (options.fit === 'stretch') return resized;

  // pad: centre on a white canvas, compositing so transparent areas become white too.
  const layer = new OffscreenCanvas(resized.width, resized.height);
  const layerCtx = layer.getContext('2d');
  const canvas = new OffscreenCanvas(plan.canvas.width, plan.canvas.height);
  const ctx = canvas.getContext('2d');
  if (!layerCtx || !ctx) throw new Error('Could not process the image.');
  layerCtx.putImageData(resized, 0, 0);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(layer, plan.offset.x, plan.offset.y);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const api = {
  async fit(
    buffer: ArrayBuffer,
    inputFormat: InputFormat,
    options: ExamOptions,
    onProgress: (fraction: number) => void,
  ): Promise<{ buffer: ArrayBuffer; quality: number; padded: boolean; width: number; height: number }> {
    const problems = checkOptions(options);
    if (problems.length > 0) throw new Error(problems[0]);

    onProgress(0.05);
    const source = await decodeToImageData(buffer, inputFormat);
    onProgress(0.25);
    const image = await fitToSize(source, options);
    onProgress(0.45);

    const maxBytes = kbToBytes(options.maxKb);
    const found = await findQualityForTarget(
      async (q) => (await encodeImage(structuredCloneImage(image), 'jpeg', q)).byteLength,
      maxBytes,
      { onStep: (f) => onProgress(0.45 + f * 0.45) },
    );
    if (!found.met) {
      throw new Error(
        `Could not get under ${options.maxKb} KB at ${image.width}x${image.height}. Try a smaller picture, or a plainer one.`,
      );
    }

    let bytes: Uint8Array = new Uint8Array(await encodeImage(structuredCloneImage(image), 'jpeg', found.quality));
    let padded = false;
    if (options.minKb !== null && bytes.length < kbToBytes(options.minKb)) {
      bytes = padJpegToMinimum(bytes, kbToBytes(options.minKb));
      padded = true;
    }
    // The file must land inside the window; if padding overshot (it cannot, but be strict), fail loudly.
    if (bytes.length > maxBytes) throw new Error(`The result is above ${options.maxKb} KB.`);
    onProgress(1);
    return {
      buffer: bytes.slice().buffer as ArrayBuffer,
      quality: found.quality,
      padded,
      width: image.width,
      height: image.height,
    };
  },
};

/** The JPEG encoder flattens transparency in place, so give every encode its own copy. */
function structuredCloneImage(image: ImageData): ImageData {
  return new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);
}

export type ExamWorkerApi = typeof api;
Comlink.expose(api);
