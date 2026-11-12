/** Pixels, centimetres, millimetres and inches. Pure maths for the converter page. */

export type Unit = 'px' | 'cm' | 'mm' | 'in';

export const UNITS: { id: Unit; label: string }[] = [
  { id: 'px', label: 'Pixels (px)' },
  { id: 'cm', label: 'Centimetres (cm)' },
  { id: 'mm', label: 'Millimetres (mm)' },
  { id: 'in', label: 'Inches (in)' },
];

export const CM_PER_INCH = 2.54;

/** Resolutions people ask about: screens, photos and print. */
export const DPI_CHOICES = [72, 96, 150, 200, 300, 600] as const;
export const DEFAULT_DPI = 300;
export const MAX_DPI = 2400;

export interface Lengths {
  px: number;
  cm: number;
  mm: number;
  in: number;
}

export function clampDpi(dpi: number): number {
  if (!Number.isFinite(dpi) || dpi <= 0) return DEFAULT_DPI;
  return Math.min(MAX_DPI, Math.max(1, dpi));
}

/** The same length in every unit. `dpi` is pixels per inch. */
export function convertLength(value: number, unit: Unit, dpi: number): Lengths {
  const d = clampDpi(dpi);
  const inches = unit === 'in' ? value : unit === 'cm' ? value / CM_PER_INCH : unit === 'mm' ? value / (CM_PER_INCH * 10) : value / d;
  return { px: inches * d, cm: inches * CM_PER_INCH, mm: inches * CM_PER_INCH * 10, in: inches };
}

/** Up to `places` decimals, with no trailing zeros: 2480.31 -> "2480.31", 3.5 -> "3.5", 10 -> "10". */
export function formatNumber(n: number, places = 2): string {
  if (!Number.isFinite(n)) return '-';
  return String(Number(n.toFixed(places)));
}

export interface PaperSize {
  name: string;
  /** Millimetres, portrait. */
  widthMm: number;
  heightMm: number;
}

export const PAPER_SIZES: PaperSize[] = [
  { name: 'A4', widthMm: 210, heightMm: 297 },
  { name: 'A5', widthMm: 148, heightMm: 210 },
  { name: 'A3', widthMm: 297, heightMm: 420 },
  { name: 'US Letter', widthMm: 215.9, heightMm: 279.4 },
  { name: 'Passport photo (35 x 45 mm)', widthMm: 35, heightMm: 45 },
  { name: 'Photo print 4 x 6 in', widthMm: 101.6, heightMm: 152.4 },
];

/** A paper size in whole pixels at a resolution. */
export function paperInPixels(paper: PaperSize, dpi: number): { width: number; height: number } {
  return {
    width: Math.round(convertLength(paper.widthMm, 'mm', dpi).px),
    height: Math.round(convertLength(paper.heightMm, 'mm', dpi).px),
  };
}
