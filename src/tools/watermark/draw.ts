import { cleanText, layoutWatermark, type WatermarkOptions } from './options';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/**
 * Draw the watermark onto a canvas that already holds the picture. Used by the worker (the real
 * result) and by the page (the live preview), so they cannot disagree.
 */
export function drawWatermark(ctx: Ctx, width: number, height: number, options: WatermarkOptions): void {
  const text = cleanText(options.text);
  if (!text) return;
  const layout = layoutWatermark(width, height, options);
  const fill = options.color === 'white' ? '#ffffff' : '#000000';
  const edge = options.color === 'white' ? '#000000' : '#ffffff';

  ctx.save();
  ctx.globalAlpha = layout.opacity;
  ctx.font = `800 ${layout.fontPx}px system-ui, "Segoe UI", Arial, sans-serif`;
  ctx.fillStyle = fill;
  // A soft edge in the opposite colour keeps the mark readable on light and dark areas alike.
  ctx.shadowColor = edge;
  ctx.shadowBlur = Math.max(2, layout.fontPx / 8);

  if (layout.tile) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textWidth = ctx.measureText(text).width;
    const stepX = textWidth + layout.fontPx * 2.5;
    const stepY = layout.fontPx * 4;
    const reach = Math.hypot(width, height) / 2;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(layout.angle);
    let row = 0;
    for (let y = -reach; y <= reach; y += stepY, row++) {
      // Every other row is shifted by half a step so the pattern does not form columns.
      const offset = row % 2 === 0 ? 0 : stepX / 2;
      for (let x = -reach - stepX + offset; x <= reach + stepX; x += stepX) ctx.fillText(text, x, y);
    }
  } else {
    ctx.textAlign = layout.align;
    ctx.textBaseline = layout.baseline;
    ctx.fillText(text, layout.x, layout.y);
  }
  ctx.restore();
}
