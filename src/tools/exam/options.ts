import { withExtension } from '../../lib/files';
import type { ExamDocument, ExamPreset, FitMode } from '../../lib/exam-presets';

export interface Size {
  width: number;
  height: number;
}

/** Everything the worker needs. Built from an exam preset or typed in by the user. */
export interface ExamOptions {
  /** Exact output size in pixels, or null to keep the picture's own size. */
  size: Size | null;
  fit: FitMode;
  /** File size window in KB. min is optional. */
  minKb: number | null;
  maxKb: number;
  /** Used in the output file name, e.g. "ibps-po-xv-photo". */
  label: string;
}

export const EXAM_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export interface FitPlan {
  /** Size to resample the source to first. */
  resizeTo: Size;
  /** Where the resampled image goes on the final canvas (pad), or the top-left of the cut (crop). */
  offset: { x: number; y: number };
  canvas: Size;
}

const clampMin1 = (n: number) => Math.max(1, Math.round(n));

/**
 * How to turn a source picture into an exact target size without surprises.
 * crop: scale until the target is covered, then cut the overflow evenly from both sides.
 * pad: scale until the whole picture fits, then centre it on a white canvas.
 * stretch: scale each side independently (distorts if the shapes differ).
 */
export function planFit(source: Size, target: Size, mode: FitMode): FitPlan {
  if (mode === 'stretch') {
    return { resizeTo: { ...target }, offset: { x: 0, y: 0 }, canvas: { ...target } };
  }
  if (mode === 'crop') {
    const scale = Math.max(target.width / source.width, target.height / source.height);
    // Rounding can leave a side 1px short of the target; never go below it.
    const resizeTo = {
      width: Math.max(target.width, clampMin1(source.width * scale)),
      height: Math.max(target.height, clampMin1(source.height * scale)),
    };
    return {
      resizeTo,
      offset: {
        x: Math.floor((resizeTo.width - target.width) / 2),
        y: Math.floor((resizeTo.height - target.height) / 2),
      },
      canvas: { ...target },
    };
  }
  const scale = Math.min(target.width / source.width, target.height / source.height);
  const resizeTo = {
    width: Math.min(target.width, clampMin1(source.width * scale)),
    height: Math.min(target.height, clampMin1(source.height * scale)),
  };
  return {
    resizeTo,
    offset: {
      x: Math.floor((target.width - resizeTo.width) / 2),
      y: Math.floor((target.height - resizeTo.height) / 2),
    },
    canvas: { ...target },
  };
}

/** Options for one document of an exam preset. */
export function presetOptions(exam: ExamPreset, doc: ExamDocument): ExamOptions {
  return {
    size: doc.width !== null && doc.height !== null ? { width: doc.width, height: doc.height } : null,
    fit: doc.fit,
    minKb: doc.minKb,
    maxKb: doc.maxKb,
    label: `${exam.id}-${doc.id}`,
  };
}

/** photo.png + "ibps-po-xv-photo" -> photo-ibps-po-xv-photo.jpg */
export function outputName(inputName: string, label: string): string {
  const dot = inputName.lastIndexOf('.');
  const base = dot > 0 ? inputName.slice(0, dot) : inputName;
  return withExtension(`${base}-${label}`, 'jpg');
}

export function kbToBytes(kb: number): number {
  return Math.round(kb * 1024);
}

/** Reasons the options cannot work, in plain words. Empty means usable. */
export function checkOptions(o: ExamOptions): string[] {
  const problems: string[] = [];
  if (!Number.isFinite(o.maxKb) || o.maxKb <= 0) problems.push('Enter a maximum file size in KB.');
  if (o.minKb !== null && (!Number.isFinite(o.minKb) || o.minKb <= 0)) problems.push('The minimum size must be above 0.');
  if (o.minKb !== null && Number.isFinite(o.maxKb) && o.minKb > o.maxKb) problems.push('The minimum size cannot be above the maximum.');
  if (o.size !== null) {
    const ok = (n: number) => Number.isInteger(n) && n >= 1 && n <= 10_000;
    if (!ok(o.size.width) || !ok(o.size.height)) problems.push('Width and height must be whole numbers from 1 to 10000.');
  }
  return problems;
}
