import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { jpegOrientation, stripJpeg, stripPng, stripWebp } from './strip';
import type { ImageFormat } from '../image-format';

const api = {
  async strip(
    buffer: ArrayBuffer,
    format: ImageFormat,
    onProgress: (fraction: number) => void,
  ): Promise<ArrayBuffer> {
    onProgress(0.1);
    const bytes = new Uint8Array(buffer);

    if (format === 'jpeg') {
      if (jpegOrientation(bytes) !== 1) {
        // The photo is stored sideways and relies on the EXIF rotation flag to display upright.
        // Removing the flag would turn it, so let the browser apply it and save a fresh JPG.
        const image = await decodeToImageData(buffer, 'jpeg');
        onProgress(0.6);
        const out = await encodeImage(image, 'jpeg', 92);
        onProgress(1);
        return out;
      }
      const out = stripJpeg(bytes);
      onProgress(1);
      return out.slice().buffer as ArrayBuffer;
    }

    // PNG and WebP: browsers do not reliably apply EXIF rotation to these, so the stored
    // pixels already show what viewers see, and dropping the tag changes nothing visible.
    const out = format === 'png' ? stripPng(bytes) : stripWebp(bytes);
    onProgress(1);
    return out.slice().buffer as ArrayBuffer;
  },
};

export type ExifWorkerApi = typeof api;
Comlink.expose(api);
