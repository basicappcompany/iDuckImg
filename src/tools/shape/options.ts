import { withExtension } from '../../lib/files';

export type Shape = 'circle' | 'rounded';

export interface ShapeOptions {
  shape: Shape;
  /** Rounded corners only: radius as a percentage of the shorter side (0 to 50). 50 is a full circle or pill. */
  radiusPct: number;
}

export const defaultShapeOptions: ShapeOptions = { shape: 'circle', radiusPct: 20 };

export const SHAPE_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export interface ShapeGeometry {
  outWidth: number;
  outHeight: number;
  /** Where the part we keep starts in the source picture. */
  srcX: number;
  srcY: number;
  /** Corner radius in output pixels. */
  radius: number;
}

export function clampRadiusPct(n: number): number {
  return Math.min(50, Math.max(0, Number.isFinite(n) ? n : 0));
}

/**
 * A circle needs a square, so the middle square of the picture is kept. Rounded corners keep the
 * whole picture. Pure, so it can be tested without a canvas.
 */
export function shapeGeometry(width: number, height: number, o: ShapeOptions): ShapeGeometry {
  if (o.shape === 'circle') {
    const side = Math.min(width, height);
    return {
      outWidth: side,
      outHeight: side,
      srcX: Math.floor((width - side) / 2),
      srcY: Math.floor((height - side) / 2),
      radius: side / 2,
    };
  }
  const short = Math.min(width, height);
  return { outWidth: width, outHeight: height, srcX: 0, srcY: 0, radius: (short * clampRadiusPct(o.radiusPct)) / 100 };
}

/** The result is always a PNG, the format that can hold the see-through corners. */
export function outputName(inputName: string, shape: Shape): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-${shape}`, 'png');
}
