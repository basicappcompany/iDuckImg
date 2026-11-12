import { TEXT_COLOURS, cleanLines, layoutText, type TextOptions } from './options';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/** Draw the text block onto a canvas that already holds the picture. Shared by the worker and the live preview. */
export function drawText(ctx: Ctx, width: number, height: number, options: TextOptions): void {
  const lines = cleanLines(options.text);
  if (lines.length === 0) return;
  const l = layoutText(width, height, options);

  ctx.save();
  ctx.font = `800 ${l.fontPx}px system-ui, "Segoe UI", Arial, sans-serif`;
  ctx.textBaseline = 'top';
  ctx.textAlign = l.align;
  const widest = Math.max(...lines.map((line) => ctx.measureText(line).width));
  const blockH = lines.length * l.lineHeight;
  const top = l.anchorY === 'top' ? l.y : l.anchorY === 'bottom' ? l.y - blockH : l.y - blockH / 2;
  const left = l.align === 'left' ? l.x : l.align === 'right' ? l.x - widest : l.x - widest / 2;

  if (options.box !== 'none') {
    ctx.fillStyle = options.box === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)';
    const r = l.padding;
    ctx.beginPath();
    ctx.roundRect?.(left - l.padding, top - l.padding / 2, widest + l.padding * 2, blockH + l.padding, r);
    if (!ctx.roundRect) ctx.rect(left - l.padding, top - l.padding / 2, widest + l.padding * 2, blockH + l.padding);
    ctx.fill();
  } else {
    // Without a panel, a soft edge in the opposite tone keeps the text readable.
    ctx.shadowColor = options.colour === 'black' ? '#ffffff' : '#000000';
    ctx.shadowBlur = Math.max(2, l.fontPx / 8);
  }

  ctx.fillStyle = TEXT_COLOURS[options.colour];
  lines.forEach((line, i) => ctx.fillText(line, l.x, top + i * l.lineHeight + (l.lineHeight - l.fontPx) / 2));
  ctx.restore();
}
