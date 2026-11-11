import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type Rotation = 0 | 90 | 180 | 270;

/**
 * The transform is always: flip (horizontal and/or vertical) first, then rotate clockwise.
 * The buttons below keep the state in that normal form, so the live preview (CSS transform in
 * the same order) and the worker output always agree.
 */
export interface RotateOptions {
  rotation: Rotation;
  flipH: boolean;
  flipV: boolean;
  /** JPG and WebP output quality. JPG cannot be rotated losslessly in the browser. */
  quality: number;
}

export const defaultRotateOptions: RotateOptions = { rotation: 0, flipH: false, flipV: false, quality: 92 };

export const ROTATE_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

const norm = (degrees: number): Rotation => (((degrees % 360) + 360) % 360) as Rotation;

export function isIdentity(o: Pick<RotateOptions, 'rotation' | 'flipH' | 'flipV'>): boolean {
  return o.rotation === 0 && !o.flipH && !o.flipV;
}

/** Visual "rotate right": turns the current result 90 degrees clockwise. */
export function rotateRight(o: RotateOptions): RotateOptions {
  return { ...o, rotation: norm(o.rotation + 90) };
}

export function rotateLeft(o: RotateOptions): RotateOptions {
  return { ...o, rotation: norm(o.rotation - 90) };
}

/**
 * Visual "flip horizontally" of the current result. A mirror conjugates a rotation into the
 * opposite rotation (M R(r) = R(-r) M), so the stored rotation is negated.
 */
export function flipHorizontal(o: RotateOptions): RotateOptions {
  return { ...o, rotation: norm(-o.rotation), flipH: !o.flipH };
}

export function flipVertical(o: RotateOptions): RotateOptions {
  return { ...o, rotation: norm(-o.rotation), flipV: !o.flipV };
}

export function rotatedSize(width: number, height: number, rotation: Rotation): { width: number; height: number } {
  return rotation === 90 || rotation === 270 ? { width: height, height: width } : { width, height };
}

/** CSS transform for the preview. CSS applies right to left, so this is flip, then rotate. */
export function previewTransform(o: Pick<RotateOptions, 'rotation' | 'flipH' | 'flipV'>): string {
  return `rotate(${o.rotation}deg) scale(${o.flipH ? -1 : 1}, ${o.flipV ? -1 : 1})`;
}

export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-rotated`, extensionOf(format));
}
