import { assessPixels } from '../../engine/limits';
import {
  SVG_MAX_BYTES,
  detectExtraFormat,
  parseSvgSize,
  pngName,
  svgRenderSize,
  type ExtraFormat,
} from '../../lib/extra-formats';

/**
 * The size a file had before we turned it into a PNG. The download list compares results against the
 * original, so a 100 KB AVIF that became a 900 KB PNG is not reported as "saved 85%".
 */
const originalSizes = new WeakMap<File, number>();

export function originalSizeOf(file: File): number {
  return originalSizes.get(file) ?? file.size;
}

const NAMES: Record<ExtraFormat, string> = { bmp: 'BMP', gif: 'GIF', svg: 'SVG', avif: 'AVIF' };

function toPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('could not be turned into a PNG'))), 'image/png'),
  );
}

async function drawSvg(file: File): Promise<HTMLCanvasElement> {
  if (file.size > SVG_MAX_BYTES) throw new Error('is too large for an SVG (over 10 MB)');
  const text = await file.text();
  if (!/<svg\b/i.test(text)) throw new Error('is not a valid SVG');
  const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }));
  try {
    // An SVG shown as an image cannot run scripts or load other files, so this is safe to draw.
    const img = new Image();
    img.src = url;
    try {
      await img.decode();
    } catch {
      throw new Error('could not be read as an SVG');
    }
    const own = parseSvgSize(text) ?? (img.naturalWidth > 0 ? { width: img.naturalWidth, height: img.naturalHeight } : null);
    const { width, height } = svgRenderSize(own?.width ?? 0, own?.height ?? 0);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('could not be drawn');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function drawBitmap(file: File, format: ExtraFormat): Promise<HTMLCanvasElement> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(
      format === 'avif'
        ? 'could not be opened. This browser may not support AVIF; try an up-to-date Chrome, Edge, Firefox or Safari'
        : `could not be read as a ${NAMES[format]}`,
    );
  }
  try {
    if (assessPixels(bitmap.width, bitmap.height) === 'too-large') throw new Error('is too large (over 100 megapixels)');
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('could not be drawn');
    ctx.drawImage(bitmap, 0, 0);
    return canvas;
  } finally {
    bitmap.close();
  }
}

/**
 * BMP, GIF, SVG or AVIF in, a PNG file out (same name with .png). A GIF becomes its first frame. Throws
 * an Error whose message finishes the sentence "<name> ...". Other files come back unchanged.
 */
export async function normalizeInput(file: File): Promise<File> {
  const format = detectExtraFormat(file);
  if (!format) return file;
  const canvas = format === 'svg' ? await drawSvg(file) : await drawBitmap(file, format);
  const blob = await toPng(canvas);
  const png = new File([blob], pngName(file.name), { type: 'image/png', lastModified: file.lastModified });
  originalSizes.set(png, file.size);
  return png;
}
