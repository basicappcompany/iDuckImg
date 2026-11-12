import { describe, expect, it } from 'vitest';
import { EXAMS, describeRequirements } from '../../src/lib/exam-presets';
import { EXAM_LANDING_PAGES, examPageSlug, readableDate } from '../../src/lib/exam-landing';
import { LANDING_PAGES, landingGroup, landingParent } from '../../src/lib/landing';

const pairs = EXAMS.flatMap((exam) => exam.documents.map((doc) => ({ exam, doc })));

describe('exam landing pages', () => {
  it('there is one page for every document of every exam, and no others', () => {
    expect(EXAM_LANDING_PAGES.map((p) => p.slug).sort()).toEqual(pairs.map(({ exam, doc }) => examPageSlug(exam, doc)).sort());
    for (const p of EXAM_LANDING_PAGES) expect(LANDING_PAGES).toContain(p);
  });

  it('each page opens the right exam and document', () => {
    for (const { exam, doc } of pairs) {
      const page = EXAM_LANDING_PAGES.find((p) => p.slug === examPageSlug(exam, doc))!;
      expect(page.engine).toBe('exam');
      expect(page.initial).toEqual({ examId: exam.id, docId: doc.id });
    }
  });

  it('states the numbers from the data, so a page cannot disagree with its source', () => {
    for (const { exam, doc } of pairs) {
      const page = EXAM_LANDING_PAGES.find((p) => p.slug === examPageSlug(exam, doc))!;
      const text = [page.quick, page.description, ...page.steps, ...page.notes, ...page.faqs.map((f) => f.a)].join(' ');
      expect(text).toContain(describeRequirements(doc));
      expect(text).toContain(exam.source.title);
      expect(text).toContain(readableDate(exam.source.retrieved));
      if (doc.physical) expect(text).toContain(doc.physical);
      if (doc.note) expect(text).toContain(doc.note);
    }
  });

  it('never claims a pixel size the notice does not give', () => {
    for (const { exam, doc } of pairs.filter((x) => x.doc.width === null)) {
      const page = EXAM_LANDING_PAGES.find((p) => p.slug === examPageSlug(exam, doc))!;
      const text = [page.title, page.quick, page.description, page.summary, ...page.steps, ...page.notes, ...page.faqs.map((f) => f.a)].join(' ');
      expect(text).not.toMatch(/\d+ x \d+ px/);
      expect(text).toContain('keeps its own pixel size');
    }
  });

  it('sit with the exam tool', () => {
    for (const p of EXAM_LANDING_PAGES) {
      expect(landingParent(p).slug).toBe('exam-photo-resizer');
      expect(landingGroup(p)).toBe('Shrink & resize');
    }
  });

  it('formats dates', () => {
    expect(readableDate('2026-11-12')).toBe('12 Nov 2026');
    expect(readableDate('2025-01-05')).toBe('5 Jan 2025');
  });
});
