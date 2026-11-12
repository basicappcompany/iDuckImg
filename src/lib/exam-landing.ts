/**
 * One landing page per exam document ("IBPS PO photo size", "SSC CGL signature size"). They are built
 * from `src/data/exam-presets.json`, so every number on a page is the number in the preset, with the
 * same source and read date. Nothing is typed in twice, which is how a page could drift from its
 * source. A test fails when a document in the data has no page.
 */
import { EXAMS, describeRequirements, type ExamDocument, type ExamPreset } from './exam-presets';
import type { LandingPage } from './landing';

/** Short name for headings and slugs. Falls back to the full name for an exam not listed here. */
const SHORT: Record<string, { name: string; slug: string }> = {
  'ibps-po-xv': { name: 'IBPS PO', slug: 'ibps-po' },
  'ssc-cgl-2026': { name: 'SSC CGL', slug: 'ssc-cgl' },
};

const DOC_SLUG: Record<string, string> = {
  photo: 'photo-size',
  signature: 'signature-size',
  'left-thumb': 'thumb-impression-size',
  declaration: 'declaration-size',
};

const DOC_EMOJI: Record<string, string> = {
  photo: '📸',
  signature: '📝',
  'left-thumb': '👍',
  declaration: '📃',
};

export function examPageSlug(exam: ExamPreset, doc: ExamDocument): string {
  const short = SHORT[exam.id]?.slug ?? exam.id;
  return `${short}-${DOC_SLUG[doc.id] ?? `${doc.id}-size`}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 2026-11-12 -> 12 Nov 2026 */
export function readableDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[(m ?? 1) - 1]} ${y}`;
}

function sizeOnly(doc: ExamDocument): string {
  return describeRequirements(doc).replace(/, JPG$/, '');
}

function examPage(exam: ExamPreset, doc: ExamDocument): LandingPage {
  const short = SHORT[exam.id]?.name ?? exam.name;
  const what = doc.name.toLowerCase();
  const req = describeRequirements(doc);
  const hasPixels = doc.width !== null && doc.height !== null;

  let title = `${short} ${what} size: ${sizeOnly(doc)}`;
  if (title.length > 60) title = `${short} ${what} size in px and KB`;

  const fitText =
    doc.fit === 'pad'
      ? 'padded with white to fill the exact size'
      : doc.fit === 'stretch'
        ? 'stretched to the exact size'
        : 'cut at the edges to the exact size, keeping the middle';

  const steps = [
    `Drop your ${what}, or tap the area to choose it. HEIC photos from an iPhone work too.`,
    `${exam.name} and ${doc.name} are already chosen, so the size is set to ${req}.`,
    'Press Make my file.',
    'Check the size in the list, then download the JPG and upload it to the form.',
  ];

  const notes = [
    hasPixels
      ? `The picture is ${fitText}, then saved at the best quality that fits under ${doc.maxKb} KB.${doc.minKb !== null ? ` If a simple picture comes out under ${doc.minKb} KB, harmless filler data is added to the JPG so it reaches the minimum. The picture itself is not changed by that.` : ''}`
      : `The notice gives no pixel size, so your picture keeps its own pixel size and only the file size is fitted, to ${doc.minKb !== null ? `${doc.minKb} to ${doc.maxKb}` : `up to ${doc.maxKb}`} KB.`,
    ...(doc.physical ? [`The notice gives the physical size as ${doc.physical}. That is shown here as written and is not converted into pixels.`] : []),
    ...(doc.note ? [doc.note] : []),
    ...(exam.notes ?? []),
    `Source: ${exam.source.title}, ${exam.source.location}, read on ${readableDate(exam.source.retrieved)}. Exams change their rules between cycles, so check your own notice.`,
  ];

  const faqs = [
    {
      q: `What size should the ${what} be for ${short}?`,
      a: `${exam.name} asks for ${req}. This comes from ${exam.source.title} (${exam.source.location}).`,
    },
    {
      q: 'How does the file get to the right size?',
      a: hasPixels
        ? `It is ${fitText}, then saved as a JPG at the best quality that stays under the maximum.${doc.minKb !== null ? ` If it would be under ${doc.minKb} KB, filler data is added so it reaches the minimum.` : ''} Everything happens in your browser, so the picture is never uploaded.`
        : 'Your picture keeps its pixel size and is saved as a JPG at the best quality that fits the file size range. It happens in your browser, so the picture is never uploaded.',
    },
    {
      q: 'Are these numbers still current?',
      a: `They were read from the official document on ${readableDate(exam.source.retrieved)}, for ${exam.cycle}. Check your own notice. If yours is different, open the Exam photo and signature resizer, choose Other exam and type your sizes.`,
    },
  ];

  return {
    slug: examPageSlug(exam, doc),
    kind: {
      kind: 'exam',
      short,
      examName: exam.name,
      docId: doc.id,
      req,
      size: sizeOnly(doc),
      source: exam.source.title,
      location: exam.source.location,
      retrieved: exam.source.retrieved,
      cycle: exam.cycle,
    },
    engine: 'exam',
    initial: { examId: exam.id, docId: doc.id },
    emoji: DOC_EMOJI[doc.id] ?? '🪪',
    h1: `${short} ${what} size`,
    title,
    description: `Resize your ${what} to ${req} for ${short}. From the official notice. Free, in your browser, no upload.`,
    summary: `Get your ${short} ${what} to ${sizeOnly(doc)}.`,
    quick: `To resize your ${what} for ${short}, drop it in and press Make my file: the tool is already set to ${req}, as in the official notice. It runs in your browser, so the picture is never uploaded.`,
    steps,
    notes,
    faqs,
    related: [
      'exam-photo-resizer',
      ...exam.documents.filter((d) => d.id !== doc.id).map((d) => examPageSlug(exam, d)),
      'compress-image-to-50kb',
    ],
  };
}

export const EXAM_LANDING_PAGES: readonly LandingPage[] = EXAMS.flatMap((exam) => exam.documents.map((doc) => examPage(exam, doc)));
