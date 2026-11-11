/** Pure geometry for the crop box. All units are image pixels. Nothing here touches the DOM. */

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type RectField = 'x' | 'y' | 'width' | 'height';

/** Smallest box the user can make, so a stray click cannot collapse it. */
export const MIN_SIZE = 16;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** The smallest allowed side, never larger than the image itself. */
function minSide(bounds: Bounds, minSize: number): { w: number; h: number } {
  return { w: Math.min(minSize, bounds.width), h: Math.min(minSize, bounds.height) };
}

/** Round to whole pixels and force the box inside the image and above the minimum size. */
export function clampRect(rect: Rect, bounds: Bounds, minSize: number = MIN_SIZE): Rect {
  const min = minSide(bounds, minSize);
  const width = clamp(Math.round(rect.width), min.w, bounds.width);
  const height = clamp(Math.round(rect.height), min.h, bounds.height);
  return {
    width,
    height,
    x: clamp(Math.round(rect.x), 0, bounds.width - width),
    y: clamp(Math.round(rect.y), 0, bounds.height - height),
  };
}

export function fullRect(bounds: Bounds): Rect {
  return { x: 0, y: 0, width: bounds.width, height: bounds.height };
}

/** A starting box: the middle 80 percent, so the handles are visible and easy to grab. */
export function initialRect(bounds: Bounds): Rect {
  return clampRect(
    {
      x: bounds.width * 0.1,
      y: bounds.height * 0.1,
      width: bounds.width * 0.8,
      height: bounds.height * 0.8,
    },
    bounds,
  );
}

export function moveRect(rect: Rect, dx: number, dy: number, bounds: Bounds): Rect {
  return clampRect({ ...rect, x: rect.x + dx, y: rect.y + dy }, bounds);
}

/**
 * The largest box with the given width/height ratio that fits inside `rect`, with the same
 * centre. Used when the user picks an aspect ratio.
 */
export function fitRectToAspect(rect: Rect, aspect: number, bounds: Bounds): Rect {
  let width = rect.width;
  let height = width / aspect;
  if (height > rect.height) {
    height = rect.height;
    width = height * aspect;
  }
  return clampRect(
    { x: rect.x + (rect.width - width) / 2, y: rect.y + (rect.height - height) / 2, width, height },
    bounds,
  );
}

/**
 * Drag a handle by (dx, dy). `start` is the box when the drag began, so the result does not
 * drift with repeated small moves. With `aspect` set (width / height), the ratio is kept:
 * corners follow the pointer, edges grow the box around its centre on the other axis.
 */
export function resizeRect(
  start: Rect,
  handle: Handle,
  dx: number,
  dy: number,
  bounds: Bounds,
  aspect: number | null = null,
  minSize: number = MIN_SIZE,
): Rect {
  const min = minSide(bounds, minSize);
  const west = handle.includes('w');
  const east = handle.includes('e');
  const north = handle.includes('n');
  const south = handle.includes('s');
  const left = start.x;
  const top = start.y;
  const right = start.x + start.width;
  const bottom = start.y + start.height;

  if (aspect === null) {
    let l = left;
    let t = top;
    let r = right;
    let b = bottom;
    if (west) l = clamp(left + dx, 0, right - min.w);
    if (east) r = clamp(right + dx, left + min.w, bounds.width);
    if (north) t = clamp(top + dy, 0, bottom - min.h);
    if (south) b = clamp(bottom + dy, top + min.h, bounds.height);
    return clampRect({ x: l, y: t, width: r - l, height: b - t }, bounds, minSize);
  }

  const isCorner = (west || east) && (north || south);
  if (isCorner) {
    const anchorX = west ? right : left;
    const anchorY = north ? bottom : top;
    const pointerX = (west ? left : right) + dx;
    const pointerY = (north ? top : bottom) + dy;
    let width = Math.abs(pointerX - anchorX);
    let height = Math.abs(pointerY - anchorY);
    if (width / aspect >= height) height = width / aspect;
    else width = height * aspect;

    const availW = west ? anchorX : bounds.width - anchorX;
    const availH = north ? anchorY : bounds.height - anchorY;
    const shrink = Math.min(1, availW / width, availH / height);
    width *= shrink;
    height *= shrink;
    const grow = Math.max(1, min.w / width, min.h / height);
    width *= grow;
    height *= grow;

    return clampRect(
      { x: west ? anchorX - width : anchorX, y: north ? anchorY - height : anchorY, width, height },
      bounds,
      minSize,
    );
  }

  if (east || west) {
    const availW = east ? bounds.width - left : right;
    let width = clamp((east ? start.width + dx : start.width - dx), min.w, availW);
    let height = width / aspect;
    const centreY = start.y + start.height / 2;
    const maxHeight = 2 * Math.min(centreY, bounds.height - centreY);
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }
    return clampRect({ x: east ? left : right - width, y: centreY - height / 2, width, height }, bounds, minSize);
  }

  const availH = south ? bounds.height - top : bottom;
  let height = clamp((south ? start.height + dy : start.height - dy), min.h, availH);
  let width = height * aspect;
  const centreX = start.x + start.width / 2;
  const maxWidth = 2 * Math.min(centreX, bounds.width - centreX);
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspect;
  }
  return clampRect({ x: centreX - width / 2, y: south ? top : bottom - height, width, height }, bounds, minSize);
}

/**
 * Apply a typed value to one field. Position fields move the box; size fields resize it from
 * its top-left corner (keeping the ratio when `aspect` is set), never past the image edge.
 */
export function setRectField(
  rect: Rect,
  field: RectField,
  value: number,
  bounds: Bounds,
  aspect: number | null = null,
  minSize: number = MIN_SIZE,
): Rect {
  if (!Number.isFinite(value)) return rect;
  if (field === 'x') return clampRect({ ...rect, x: value }, bounds, minSize);
  if (field === 'y') return clampRect({ ...rect, y: value }, bounds, minSize);

  const min = minSide(bounds, minSize);
  if (field === 'width') {
    let width = clamp(value, min.w, bounds.width - rect.x);
    let height = aspect ? width / aspect : rect.height;
    if (aspect && rect.y + height > bounds.height) {
      height = bounds.height - rect.y;
      width = height * aspect;
    }
    return clampRect({ ...rect, width, height }, bounds, minSize);
  }
  let height = clamp(value, min.h, bounds.height - rect.y);
  let width = aspect ? height * aspect : rect.width;
  if (aspect && rect.x + width > bounds.width) {
    width = bounds.width - rect.x;
    height = width / aspect;
  }
  return clampRect({ ...rect, width, height }, bounds, minSize);
}

export interface AspectChoice {
  id: string;
  label: string;
  /** width / height, or null for free. 'original' is resolved from the image. */
  ratio: number | null | 'original';
}

export const ASPECTS: readonly AspectChoice[] = [
  { id: 'free', label: 'Free', ratio: null },
  { id: 'original', label: 'Same as the picture', ratio: 'original' },
  { id: '1:1', label: 'Square (1:1)', ratio: 1 },
  { id: '4:3', label: '4:3', ratio: 4 / 3 },
  { id: '3:4', label: '3:4', ratio: 3 / 4 },
  { id: '3:2', label: '3:2', ratio: 3 / 2 },
  { id: '2:3', label: '2:3', ratio: 2 / 3 },
  { id: '16:9', label: '16:9', ratio: 16 / 9 },
  { id: '9:16', label: '9:16', ratio: 9 / 16 },
  { id: '4:5', label: '4:5 (portrait post)', ratio: 4 / 5 },
];

export function resolveAspect(choice: AspectChoice, bounds: Bounds): number | null {
  if (choice.ratio === 'original') return bounds.width / bounds.height;
  return choice.ratio;
}

/** Convert a pointer movement in screen pixels to image pixels. */
export function screenToImageDelta(deltaScreen: number, displayedSize: number, imageSize: number): number {
  return displayedSize > 0 ? (deltaScreen * imageSize) / displayedSize : 0;
}
