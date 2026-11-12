import { HEIC_ACCEPTS } from '../image-format';
import { MAX_PIXELS } from '../../engine/limits';

export type MergeDirection = 'row' | 'column';
export type MergeMatch = 'smallest' | 'none';
export type MergeBackground = 'white' | 'black' | 'transparent';
export type MergeFormat = 'png' | 'jpeg' | 'webp';

export interface MergeOptions {
  /** 'row' puts the pictures side by side; 'column' stacks them. */
  direction: MergeDirection;
  /** Space between pictures, in pixels of the result. */
  gap: number;
  /**
   * 'smallest' scales every picture to the same height (row) or width (column) as the smallest one,
   * so nothing is stretched up. 'none' keeps every picture at its own size and centres it.
   */
  match: MergeMatch;
  background: MergeBackground;
  format: MergeFormat;
  /** JPG and WebP only. */
  quality: number;
}

export const defaultMergeOptions: MergeOptions = {
  direction: 'row',
  gap: 0,
  match: 'smallest',
  background: 'white',
  format: 'png',
  quality: 92,
};

export const MERGE_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp', ...HEIC_ACCEPTS] as const;

export const MAX_GAP = 200;
export const MIN_IMAGES = 2;

export interface Size {
  width: number;
  height: number;
}

export interface Placement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MergeLayout {
  width: number;
  height: number;
  items: Placement[];
}

export function clampGap(n: number): number {
  return Math.min(MAX_GAP, Math.max(0, Math.round(Number.isFinite(n) ? n : 0)));
}

/**
 * Where each picture goes in the result. Pure, so it can be tested without a canvas. With
 * `match: 'smallest'` pictures share the smallest cross size; otherwise they keep their own size and
 * sit in the middle of the cross axis.
 */
export function layoutMerge(sizes: readonly Size[], o: Pick<MergeOptions, 'direction' | 'gap' | 'match'>): MergeLayout {
  if (sizes.length === 0) return { width: 0, height: 0, items: [] };
  const gap = clampGap(o.gap);
  const row = o.direction === 'row';
  // Size along the cross axis (height for a row, width for a column).
  const cross = (s: Size) => (row ? s.height : s.width);
  const main = (s: Size) => (row ? s.width : s.height);

  const target = o.match === 'smallest' ? Math.min(...sizes.map(cross)) : Math.max(...sizes.map(cross));
  const scaled = sizes.map((s) => {
    const k = o.match === 'smallest' ? target / cross(s) : 1;
    return { main: Math.max(1, Math.round(main(s) * k)), cross: Math.max(1, Math.round(cross(s) * k)) };
  });

  let cursor = 0;
  const items = scaled.map((s) => {
    const along = cursor;
    cursor += s.main + gap;
    const across = Math.round((target - s.cross) / 2);
    return row
      ? { x: along, y: across, width: s.main, height: s.cross }
      : { x: across, y: along, width: s.cross, height: s.main };
  });
  const total = cursor - gap;
  return row ? { width: total, height: target, items } : { width: target, height: total, items };
}

/** True when the merged picture would be too big for a phone to hold. */
export function tooLarge(layout: MergeLayout): boolean {
  return layout.width * layout.height > MAX_PIXELS;
}

export const FORMAT_EXT: Record<MergeFormat, string> = { png: 'png', jpeg: 'jpg', webp: 'webp' };
export const FORMAT_MIME: Record<MergeFormat, string> = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' };

export function outputName(format: MergeFormat): string {
  return `merged.${FORMAT_EXT[format]}`;
}
