import { withExtension } from '../../lib/files';
import { MAX_PIXELS } from '../../engine/limits';
import { extensionOf, type ImageFormat } from '../image-format';

export type ResizeMode = 'pixels' | 'percent';

export interface ResizeOptions {
  mode: ResizeMode;
  /** Pixels mode. Empty (null) means "work it out from the other side". */
  width: number | null;
  height: number | null;
  /** Pixels mode: keep the original proportions. Off stretches to the exact size. */
  keepAspect: boolean;
  /** Percent mode: 1 to 1000. */
  percent: number;
  /** Optional target file size in KB. Applies to JPG and WebP output. */
  targetKb: number | null;
  /** 'same' keeps each file's format. */
  format: 'same' | ImageFormat;
  /** Used when there is no target size. JPG and WebP only. */
  quality: number;
}

export const defaultResizeOptions: ResizeOptions = {
  mode: 'pixels',
  width: 1280,
  height: null,
  keepAspect: true,
  percent: 50,
  targetKb: null,
  format: 'same',
  quality: 85,
};

export const RESIZE_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export interface Size {
  width: number;
  height: number;
}

function positive(n: number | null | undefined): n is number {
  return typeof n === 'number' && Number.isFinite(n) && n >= 1;
}

/**
 * Work out the output size for a source image. Throws a readable error when the options
 * cannot produce a size. Never returns fractions or zero.
 */
export function computeSize(source: Size, options: ResizeOptions): Size {
  let width: number;
  let height: number;

  if (options.mode === 'percent') {
    if (!positive(options.percent)) throw new Error('Enter a percentage of 1 or more.');
    const scale = options.percent / 100;
    width = source.width * scale;
    height = source.height * scale;
  } else {
    const w = positive(options.width) ? options.width : null;
    const h = positive(options.height) ? options.height : null;
    if (w === null && h === null) throw new Error('Enter a width, a height, or both.');
    if (!options.keepAspect) {
      width = w ?? source.width;
      height = h ?? source.height;
    } else if (w !== null && h !== null) {
      // Fit inside the w x h box without distortion.
      const scale = Math.min(w / source.width, h / source.height);
      width = source.width * scale;
      height = source.height * scale;
    } else if (w !== null) {
      width = w;
      height = (source.height * w) / source.width;
    } else {
      height = h!;
      width = (source.width * h!) / source.height;
    }
  }

  const out = { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
  if (out.width * out.height > MAX_PIXELS) {
    throw new Error('The resized image would be over 100 megapixels. Choose a smaller size.');
  }
  return out;
}

/**
 * Which format to write. A target size needs lossy encoding, so PNG becomes WebP unless the
 * user picked a format explicitly.
 */
export function resolveOutputFormat(input: ImageFormat, options: ResizeOptions): ImageFormat {
  if (options.format !== 'same') return options.format;
  if (options.targetKb && input === 'png') return 'webp';
  return input;
}

/** A target size cannot be reached with lossless PNG output. */
export function targetNeedsLossy(options: ResizeOptions, output: ImageFormat): boolean {
  return Boolean(options.targetKb) && output === 'png';
}

export function outputName(inputName: string, format: ImageFormat): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-resized`, extensionOf(format));
}
