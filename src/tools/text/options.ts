import { withExtension } from '../../lib/files';
import { extensionOf, type ImageFormat } from '../image-format';

export type TextPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export const TEXT_POSITIONS: { id: TextPosition; label: string }[] = [
  { id: 'top-left', label: 'Top left' },
  { id: 'top-center', label: 'Top centre' },
  { id: 'top-right', label: 'Top right' },
  { id: 'middle-left', label: 'Middle left' },
  { id: 'center', label: 'Centre' },
  { id: 'middle-right', label: 'Middle right' },
  { id: 'bottom-left', label: 'Bottom left' },
  { id: 'bottom-center', label: 'Bottom centre' },
  { id: 'bottom-right', label: 'Bottom right' },
];

export type TextColour = 'white' | 'black' | 'yellow' | 'red';
export type TextBox = 'none' | 'dark' | 'light';

export const TEXT_COLOURS: Record<TextColour, string> = {
  white: '#ffffff',
  black: '#000000',
  yellow: '#ffd23f',
  red: '#e03131',
};

export interface TextOptions {
  /** Up to MAX_LINES lines separated by new lines. */
  text: string;
  position: TextPosition;
  /** Text height as a percentage of the picture width. */
  sizePct: number;
  colour: TextColour;
  /** A solid panel behind the text, for reading on busy pictures. */
  box: TextBox;
  quality: number;
}

export const defaultTextOptions: TextOptions = {
  text: '',
  position: 'bottom-center',
  sizePct: 7,
  colour: 'white',
  box: 'dark',
  quality: 92,
};

export const TEXT_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const MAX_LINES = 5;
export const MAX_LINE_LENGTH = 60;

/** The lines to draw: trimmed, empty ones dropped, capped in number and length. */
export function cleanLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim().slice(0, MAX_LINE_LENGTH))
    .filter(Boolean)
    .slice(0, MAX_LINES);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
}

export interface TextLayout {
  fontPx: number;
  lineHeight: number;
  padding: number;
  /** Anchor of the whole block. */
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
  /** Which edge of the block y refers to. */
  anchorY: 'top' | 'middle' | 'bottom';
}

/** Where the text block goes in a picture of width x height. Pure, so it can be tested without a canvas. */
export function layoutText(width: number, height: number, o: TextOptions): TextLayout {
  const fontPx = Math.max(10, Math.round((width * clamp(o.sizePct, 2, 30)) / 100));
  const margin = Math.round(fontPx * 0.7);
  const [row, col] = o.position === 'center' ? ['middle', 'center'] : (o.position.split('-') as [string, string]);
  const anchorY = row === 'top' ? 'top' : row === 'bottom' ? 'bottom' : 'middle';
  const align = col === 'left' ? 'left' : col === 'right' ? 'right' : 'center';
  return {
    fontPx,
    lineHeight: Math.round(fontPx * 1.2),
    padding: Math.round(fontPx * 0.35),
    align,
    anchorY,
    x: align === 'left' ? margin : align === 'right' ? width - margin : width / 2,
    y: anchorY === 'top' ? margin : anchorY === 'bottom' ? height - margin : height / 2,
  };
}

export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-text`, extensionOf(format));
}
