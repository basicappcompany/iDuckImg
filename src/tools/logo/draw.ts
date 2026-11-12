import { layoutLogo, type LogoOptions } from './options';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/**
 * Draw the logo onto a canvas that already holds the picture. Used by the worker (the real result)
 * and by the page (the live preview), so they cannot disagree.
 */
export function drawLogo(
  ctx: Ctx,
  width: number,
  height: number,
  logo: ImageBitmap,
  options: Pick<LogoOptions, 'position' | 'sizePct' | 'opacity'>,
): void {
  const layout = layoutLogo(width, height, { width: logo.width, height: logo.height }, options);
  ctx.save();
  ctx.globalAlpha = layout.opacity;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (const p of layout.placements) ctx.drawImage(logo, p.x, p.y, p.width, p.height);
  ctx.restore();
}
