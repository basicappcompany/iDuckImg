import { assessPixels } from '../../engine/limits';

/**
 * Decode an iPhone HEIC/HEIF photo to pixels. The decoder is a 2 MB WebAssembly bundle, so it
 * is imported only when a HEIC file is actually given. libheif applies the image's rotation
 * and mirroring while decoding, so the result is already upright.
 */
export async function decodeHeic(buffer: ArrayBuffer): Promise<ImageData> {
  const { default: factory } = await import('libheif-js/libheif-wasm/libheif-bundle.mjs');
  const libheif = await factory();
  const decoder = new libheif.HeifDecoder();

  let images;
  try {
    images = decoder.decode(new Uint8Array(buffer));
  } catch {
    throw new Error('This HEIC file could not be read. It may be damaged or use an unsupported format.');
  }
  const image = images[0];
  if (!image) throw new Error('This HEIC file has no image in it.');

  try {
    const width = image.get_width();
    const height = image.get_height();
    if (assessPixels(width, height) === 'too-large') {
      throw new Error('Image is too large to process on this device (over 100 megapixels).');
    }
    const target = new ImageData(width, height);
    await new Promise<void>((resolve, reject) => {
      image.display(target, (result) => (result ? resolve() : reject(new Error('This HEIC file could not be decoded.'))));
    });
    return target;
  } finally {
    for (const img of images) img.free?.();
  }
}
