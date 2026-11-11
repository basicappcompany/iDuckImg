export interface PixelTransform {
  rotation: 0 | 90 | 180 | 270;
  flipH: boolean;
  flipV: boolean;
}

/**
 * Flip then rotate clockwise, exactly (no resampling blur: smoothing is off and 90 degree
 * turns land on whole pixels). Runs in a worker via OffscreenCanvas.
 */
export function transformImage(image: ImageData, t: PixelTransform): ImageData {
  const swap = t.rotation === 90 || t.rotation === 270;
  const outW = swap ? image.height : image.width;
  const outH = swap ? image.width : image.height;

  const source = new OffscreenCanvas(image.width, image.height);
  const sctx = source.getContext('2d');
  if (!sctx) throw new Error('Could not process the image.');
  sctx.putImageData(image, 0, 0);

  const out = new OffscreenCanvas(outW, outH);
  const ctx = out.getContext('2d');
  if (!ctx) throw new Error('Could not process the image.');
  ctx.imageSmoothingEnabled = false;
  ctx.translate(outW / 2, outH / 2);
  ctx.rotate((t.rotation * Math.PI) / 180);
  ctx.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1);
  ctx.drawImage(source, -image.width / 2, -image.height / 2);
  return ctx.getImageData(0, 0, outW, outH);
}

/** Copy a rectangle out of an image. Coordinates are clamped to the image. */
export function cropImage(image: ImageData, x: number, y: number, width: number, height: number): ImageData {
  const cx = Math.max(0, Math.min(image.width - 1, Math.round(x)));
  const cy = Math.max(0, Math.min(image.height - 1, Math.round(y)));
  const cw = Math.max(1, Math.min(image.width - cx, Math.round(width)));
  const ch = Math.max(1, Math.min(image.height - cy, Math.round(height)));
  const out = new ImageData(cw, ch);
  for (let row = 0; row < ch; row++) {
    const start = ((cy + row) * image.width + cx) * 4;
    out.data.set(image.data.subarray(start, start + cw * 4), row * cw * 4);
  }
  return out;
}
