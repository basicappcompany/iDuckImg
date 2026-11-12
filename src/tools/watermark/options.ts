import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type WatermarkPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'tile';

export const WATERMARK_POSITIONS: { id: WatermarkPosition; label: string }[] = [
  { id: 'top-left', label: 'Top left' },
  { id: 'top-center', label: 'Top centre' },
  { id: 'top-right', label: 'Top right' },
  { id: 'middle-left', label: 'Middle left' },
  { id: 'center', label: 'Centre' },
  { id: 'middle-right', label: 'Middle right' },
  { id: 'bottom-left', label: 'Bottom left' },
  { id: 'bottom-center', label: 'Bottom centre' },
  { id: 'bottom-right', label: 'Bottom right' },
  { id: 'tile', label: 'Repeat across the picture' },
];

export interface WatermarkOptions {
  text: string;
  position: WatermarkPosition;
  /** Text height as a percentage of the image width, so the mark looks the same at any size. */
  sizePct: number;
  /** 5 to 100. */
  opacity: number;
  color: 'white' | 'black';
  /** JPG and WebP output quality. */
  quality: number;
}

export const defaultWatermarkOptions: WatermarkOptions = {
  text: '',
  position: 'bottom-right',
  sizePct: 5,
  opacity: 60,
  color: 'white',
  quality: 92,
};

export const WATERMARK_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

/** The text is shown on one line; very long text would not fit any picture. */
export const MAX_TEXT_LENGTH = 80;

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
}

export function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH);
}

export interface WatermarkLayout {
  fontPx: number;
  opacity: number;
  /** Anchor for a single mark. */
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
  baseline: 'top' | 'middle' | 'bottom';
  /** True for the repeated diagonal pattern; x, y, align and baseline are then unused. */
  tile: boolean;
  /** Tile only: angle in radians. */
  angle: number;
}

/** Where and how big to draw, for an image of width x height. Pure, so it can be tested without a canvas. */
export function layoutWatermark(width: number, height: number, o: WatermarkOptions): WatermarkLayout {
  const fontPx = Math.max(10, Math.round((width * clamp(o.sizePct, 1, 40)) / 100));
  const opacity = clamp(o.opacity, 5, 100) / 100;
  const margin = Math.round(fontPx * 0.6);
  const base = { fontPx, opacity, tile: o.position === 'tile', angle: -Math.PI / 6 };
  if (o.position === 'tile') return { ...base, x: 0, y: 0, align: 'center', baseline: 'middle' };

  const [row, col] = o.position === 'center' ? ['middle', 'center'] : (o.position.split('-') as [string, string]);
  const r = row === 'top' ? 'top' : row === 'bottom' ? 'bottom' : 'middle';
  const c = col === 'left' ? 'left' : col === 'right' ? 'right' : 'center';
  return {
    ...base,
    align: c,
    baseline: r,
    x: c === 'left' ? margin : c === 'right' ? width - margin : width / 2,
    y: r === 'top' ? margin : r === 'bottom' ? height - margin : height / 2,
  };
}

/** photo.jpg -> photo-watermarked.jpg */
export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-watermarked`, extensionOf(format));
}
