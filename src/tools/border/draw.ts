import { TRANSPARENT, borderedSize, type BorderOptions } from './options';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/**
 * Paint the border colour over the whole canvas, then the picture inside it. The canvas must already
 * be `borderedSize` big. Used by the worker (the real result) and by the page (the live preview).
 */
export function drawFramed(
  ctx: Ctx,
  picture: CanvasImageSource,
  width: number,
  height: number,
  options: Pick<BorderOptions, 'thicknessPct' | 'colour'>,
): void {
  const { border, width: full, height: tall } = borderedSize(width, height, options.thicknessPct);
  ctx.clearRect(0, 0, full, tall);
  if (options.colour !== TRANSPARENT) {
    ctx.fillStyle = options.colour;
    ctx.fillRect(0, 0, full, tall);
  }
  ctx.drawImage(picture, border, border, width, height);
}
