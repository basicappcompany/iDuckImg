import * as Comlink from 'comlink';
import { decodeToImageData, encodeImage } from '../shared/codec';
import { clampGap, layoutMerge, tooLarge, type MergeOptions } from './options';
import type { InputFormat } from '../image-format';

/** Decoded pictures wait here until the layout is known; cancelling terminates the worker and frees them. */
let pictures: ImageData[] = [];

const api = {
  begin(): void {
    pictures = [];
  },

  /** Decode one picture and report its size. */
  async addImage(buffer: ArrayBuffer, format: InputFormat): Promise<{ width: number; height: number }> {
    const image = await decodeToImageData(buffer, format);
    pictures.push(image);
    return { width: image.width, height: image.height };
  },

  async finish(options: MergeOptions): Promise<ArrayBuffer> {
    const layout = layoutMerge(
      pictures.map((p) => ({ width: p.width, height: p.height })),
      { ...options, gap: clampGap(options.gap) },
    );
    if (tooLarge(layout)) {
      pictures = [];
      throw new Error('The merged picture would be too large (over 100 megapixels). Use fewer or smaller pictures.');
    }
    const canvas = new OffscreenCanvas(layout.width, layout.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not draw the merged picture.');
    if (options.background !== 'transparent') {
      ctx.fillStyle = options.background === 'white' ? '#ffffff' : '#000000';
      ctx.fillRect(0, 0, layout.width, layout.height);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    for (const [i, picture] of pictures.entries()) {
      const place = layout.items[i]!;
      const tmp = new OffscreenCanvas(picture.width, picture.height);
      const tctx = tmp.getContext('2d');
      if (!tctx) throw new Error('Could not draw the merged picture.');
      tctx.putImageData(picture, 0, 0);
      ctx.drawImage(tmp, place.x, place.y, place.width, place.height);
    }
    pictures = [];
    const data = ctx.getImageData(0, 0, layout.width, layout.height);
    return encodeImage(data, options.format, Math.min(100, Math.max(1, Math.round(options.quality))));
  },
};

export type MergeWorkerApi = typeof api;
Comlink.expose(api);
