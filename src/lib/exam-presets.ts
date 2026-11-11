import data from '../data/exam-presets.json';

export type FitMode = 'crop' | 'pad' | 'stretch';

export interface ExamDocument {
  id: string;
  name: string;
  /** Pixels, or null when the official document gives no pixel size. */
  width: number | null;
  height: number | null;
  minKb: number | null;
  maxKb: number;
  /** How to fit a differently shaped picture: cut the edges, add white bars, or stretch. */
  fit: FitMode;
  /** Physical size as written in the official document. Shown, never converted. */
  physical?: string;
  note?: string;
}

export interface ExamSource {
  title: string;
  url: string;
  location: string;
  /** ISO date (YYYY-MM-DD) we read the document. */
  retrieved: string;
}

export interface ExamPreset {
  id: string;
  name: string;
  cycle: string;
  source: ExamSource;
  notes?: string[];
  documents: ExamDocument[];
}

export const EXAMS = (data as { exams: ExamPreset[] }).exams;

/**
 * The rule for this file is "never invent requirements". These checks make the minimum
 * evidence mandatory: a real https source, a read date, and numbers that make sense.
 * Returns a list of problems; empty means valid.
 */
export function validatePresets(exams: readonly ExamPreset[]): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const exam of exams) {
    const where = exam.id || '(no id)';
    if (!exam.id || ids.has(exam.id)) problems.push(`${where}: missing or duplicate id`);
    ids.add(exam.id);
    if (!exam.name) problems.push(`${where}: missing name`);
    if (!exam.cycle) problems.push(`${where}: missing cycle (which year or round the numbers are from)`);
    if (!exam.source?.url?.startsWith('https://')) problems.push(`${where}: source.url must be an https URL`);
    if (!exam.source?.title) problems.push(`${where}: missing source.title`);
    if (!exam.source?.location) problems.push(`${where}: missing source.location (page or section)`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(exam.source?.retrieved ?? '')) problems.push(`${where}: source.retrieved must be YYYY-MM-DD`);
    if (!exam.documents?.length) problems.push(`${where}: no documents`);

    const docIds = new Set<string>();
    for (const doc of exam.documents ?? []) {
      const dw = `${where}/${doc.id || '(no id)'}`;
      if (!doc.id || docIds.has(doc.id)) problems.push(`${dw}: missing or duplicate id`);
      docIds.add(doc.id);
      if (!doc.name) problems.push(`${dw}: missing name`);
      if (!Number.isFinite(doc.maxKb) || doc.maxKb <= 0) problems.push(`${dw}: maxKb must be a positive number`);
      if (doc.minKb !== null && (!Number.isFinite(doc.minKb) || doc.minKb <= 0 || doc.minKb > doc.maxKb)) {
        problems.push(`${dw}: minKb must be positive and not above maxKb`);
      }
      const hasW = doc.width !== null;
      const hasH = doc.height !== null;
      if (hasW !== hasH) problems.push(`${dw}: give both width and height, or neither`);
      for (const side of [doc.width, doc.height]) {
        if (side !== null && (!Number.isInteger(side) || side <= 0)) problems.push(`${dw}: pixel sizes must be positive whole numbers`);
      }
      if (!['crop', 'pad', 'stretch'].includes(doc.fit)) problems.push(`${dw}: fit must be crop, pad or stretch`);
    }
  }
  return problems;
}

export function findExam(id: string): ExamPreset | undefined {
  return EXAMS.find((e) => e.id === id);
}

/** One line such as "200 x 230 px, 20 to 50 KB". */
export function describeRequirements(doc: ExamDocument): string {
  const parts: string[] = [];
  if (doc.width !== null && doc.height !== null) parts.push(`${doc.width} x ${doc.height} px`);
  parts.push(doc.minKb !== null ? `${doc.minKb} to ${doc.maxKb} KB` : `up to ${doc.maxKb} KB`);
  parts.push('JPG');
  return parts.join(', ');
}
