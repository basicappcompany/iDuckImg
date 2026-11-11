import { assessPixels } from '../../engine/limits';
import type { ImageFormat } from '../image-format';

const MIME: Record<ImageFormat, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

/** Decode JPG/PNG/WebP bytes to pixels. Runs in a worker (OffscreenCanvas). */
export async function decodeToImageData(buffer: ArrayBuffer, format: ImageFormat): Promise<ImageData> {
  const bitmap = await createImageBitmap(new Blob([buffer], { type: MIME[format] }));
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

/** JPEG has no transparency, so composite onto white instead of letting it turn black. */
function flattenOnWhite(image: ImageData): ImageData {
  const d = image.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3]!;
    if (a === 255) continue;
    const k = a / 255;
    d[i] = Math.round(d[i]! * k + 255 * (1 - k));
    d[i + 1] = Math.round(d[i + 1]! * k + 255 * (1 - k));
    d[i + 2] = Math.round(d[i + 2]! * k + 255 * (1 - k));
    d[i + 3] = 255;
  }
  return image;
}

/** Encode pixels. Quality 1 to 100 applies to JPEG and WebP; PNG is lossless. */
export async function encodeImage(
  image: ImageData,
  format: ImageFormat,
  quality: number,
): Promise<ArrayBuffer> {
  if (format === 'jpeg') {
    const { encode } = await import('@jsquash/jpeg');
    return encode(flattenOnWhite(image), { quality });
  }
  if (format === 'webp') {
    const { encode } = await import('@jsquash/webp');
    return encode(image, { quality });
  }
  const { encode } = await import('@jsquash/png');
  return encode(image);
}
