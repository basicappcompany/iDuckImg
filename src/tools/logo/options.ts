import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';
import { clamp, type WatermarkPosition } from '../watermark/options';

export { WATERMARK_POSITIONS as LOGO_POSITIONS } from '../watermark/options';

export interface LogoOptions {
  /** The logo picture. It never leaves the device; it is read in the worker. */
  logo: Blob | null;
  position: WatermarkPosition;
  /** Logo width as a percentage of the picture width, so it looks the same on any picture. */
  sizePct: number;
  /** 5 to 100. */
  opacity: number;
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultLogoOptions: LogoOptions = {
  logo: null,
  position: 'bottom-right',
  sizePct: 20,
  opacity: 80,
  quality: 92,
};

export const LOGO_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const PICTURE_ACCEPTS = LOGO_ACCEPTS;

export interface Placement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LogoLayout {
  opacity: number;
  /** Every copy of the logo to draw. One for a corner or the middle, many for "repeat". */
  placements: Placement[];
}

/**
 * Where the logo goes on a picture of `width` x `height`. Pure, so it can be tested without a canvas.
 * The logo keeps its own proportions, is never wider or taller than 90% of the picture, and never
 * leaves it.
 */
export function layoutLogo(
  width: number,
  height: number,
  logo: { width: number; height: number },
  o: Pick<LogoOptions, 'position' | 'sizePct' | 'opacity'>,
): LogoLayout {
  const opacity = clamp(o.opacity, 5, 100) / 100;
  if (!(logo.width > 0 && logo.height > 0 && width > 0 && height > 0)) return { opacity, placements: [] };

  let w = (width * clamp(o.sizePct, 2, 90)) / 100;
  let h = (w * logo.height) / logo.width;
  const fit = Math.min(1, (width * 0.9) / w, (height * 0.9) / h);
  w = Math.max(1, Math.round(w * fit));
  h = Math.max(1, Math.round(h * fit));
  const margin = Math.round(Math.min(width, height) * 0.03);

  if (o.position === 'tile') {
    const stepX = Math.round(w * 1.8);
    const stepY = Math.round(h * 1.8);
    const placements: Placement[] = [];
    let row = 0;
    for (let y = 0; y < height; y += stepY, row++) {
      // Every other row is shifted by half a step so the pattern does not form columns.
      for (let x = row % 2 === 0 ? 0 : -Math.round(stepX / 2); x < width; x += stepX) {
        placements.push({ x, y, width: w, height: h });
      }
    }
    return { opacity, placements };
  }

  const [row, col] = o.position === 'center' ? ['middle', 'center'] : (o.position.split('-') as [string, string]);
  const x = col === 'left' ? margin : col === 'right' ? width - w - margin : Math.round((width - w) / 2);
  const y = row === 'top' ? margin : row === 'bottom' ? height - h - margin : Math.round((height - h) / 2);
  return {
    opacity,
    placements: [{ x: Math.max(0, x), y: Math.max(0, y), width: w, height: h }],
  };
}

/** photo.jpg -> photo-with-logo.jpg */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-with-logo`, extensionOf(format));
}
