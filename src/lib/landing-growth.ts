/**
 * Growth pages: more file-size targets, sizes in MB, a minimum file size, a 10 to 20 KB signature, and
 * pages for common picture sizes. Each is a shortcut that opens an existing tool with its options preset.
 *
 * Honesty rules, like the rest of the site:
 * - Nothing here is a requirement of any exam or office. Where a number comes from an official document
 *   the page links the exam page that carries the source. A size in pixels worked out from centimetres
 *   is arithmetic at 300 DPI and says so.
 * - The size figures marked "in our test" were measured with this site's own tool, in a real browser, on
 *   one real 1920 x 1200 photograph (a 213 KB JPG), checked 2026-11-14. Other pictures give other numbers.
 */
import type { LandingPage } from './landing';
import { kbPage } from './landing-kb';

const TEST = 'In our own test, a 1920 x 1200 photograph';

function kb(n: number, extra: string, who: string, sections: NonNullable<LandingPage['sections']>): LandingPage {
  return { ...kbPage(n, extra, who), sections };
}

const section = (h: string, ...paragraphs: string[]) => ({ h, paragraphs });

export const GROWTH_PAGES: readonly LandingPage[] = [
  kb(
    10,
    'Ten KB is tiny, about the size of a small icon. Forms ask for it for signatures, thumb impressions and stamps, which are mostly white and shrink easily.',
    'A cropped signature on white paper usually fits.',
    [
      section(
        'What to expect at 10 KB',
        `${TEST} could not reach 10 KB at its own pixel size, and the tool said so: "Could not get under 10 KB at 1920x1200". The same picture shrunk to 800 pixels wide came out at 9.7 KB, and at 400 pixels wide at 10.0 KB.`,
        'So at 10 KB the number of pixels matters more than the quality slider. Resize the picture first, then set the 10 KB target. A face photo at this size will look soft: it is meant for signatures and small stamps.',
      ),
    ],
  ),
  kb(
    15,
    'Fifteen KB is a small limit used for signatures and stamps on some forms. It is easier than 10 KB but still needs a modest picture size.',
    'Signatures and scanned stamps do well here.',
    [
      section(
        'What to expect at 15 KB',
        `${TEST} reached 14.5 KB at its full 1920 x 1200 size. It looked soft, as you would expect at this size. Shrunk to 800 pixels wide it came out at 14.9 KB and looked sharper for the same file size.`,
        'If the result looks blurry, lower the width first and keep the 15 KB target: fewer pixels at the same file size look cleaner than many pixels squeezed hard.',
      ),
    ],
  ),
  kb(
    30,
    'Thirty KB is a common limit for small ID-style photos and signatures. It leaves enough room for a clear, small portrait.',
    'A small passport-style photo at around 400 to 600 pixels wide fits easily.',
    [
      section(
        'What to expect at 30 KB',
        `${TEST} came out at 29.6 KB at full size. The picture is clearly recognisable but shows compression blur on fine detail such as hair and text.`,
        'For a portrait the face stays clear; for a document scan with small print, check that the text is still readable in the result before you upload it.',
      ),
    ],
  ),
  kb(
    40,
    'Forty KB is a typical middle limit for photos on application forms: bigger than a signature, smaller than a full photo.',
    'Most photos reach it with a quality drop alone, if they are not huge.',
    [
      section(
        'What to expect at 40 KB',
        `${TEST} came out at 38.8 KB at full size. At this size you see mild blur on edges, but faces and large text stay readable.`,
        'If a form gives a range, such as 20 to 50 KB, aim for the upper part: the tool picks the best quality that is under your number, so a target of 40 usually lands a little below it.',
      ),
    ],
  ),
  kb(
    150,
    'A limit of 150 KB shows up on ID and document uploads that want a clear photo but not a large file.',
    'Phone photos often need only a quality drop to get there.',
    [
      section(
        'What to expect at 150 KB',
        `${TEST} came out at 142.9 KB at full size, with the picture looking close to the original.`,
        'The tool aims at the best quality that stays under the number, so the result is usually a few KB below 150 rather than exactly 150.',
      ),
    ],
  ),
  kb(
    300,
    'Three hundred KB is a common cap for photo uploads on government and college portals, enough for a sharp passport-style photo.',
    'Most phone photos need to be resized and compressed to get there.',
    [
      section(
        'What to expect at 300 KB',
        `${TEST} came out at 275.2 KB at full size and looked very close to the original.`,
        'A phone photo straight from the camera is often 3 to 8 MB. The tool lowers the quality and, only if needed, you lower the width, until it is under 300 KB.',
      ),
    ],
  ),
  kb(
    500,
    'Half a megabyte is a frequent limit for document and photo uploads. It keeps text readable and photos sharp.',
    'Camera photos almost always need compressing to reach it.',
    [
      section(
        'What to expect at 500 KB',
        `${TEST}, which was already a 208 KB JPG, came out at 338 KB. The target is a ceiling, not a goal: the tool re-saves the picture at high quality and does not pad it up to 500 KB, so a picture that is already small can even come out a little larger than your original.`,
        'If your original is already under 500 KB you do not need this step. If a form needs a minimum size instead, see Increase image size in KB.',
      ),
    ],
  ),

  // Sizes in MB. English only for now (there is no translated template for them).
  {
    slug: 'compress-image-to-1mb',
    kind: { kind: 'custom' },
    engine: 'resize',
    initial: { mode: 'percent', percent: 100, width: null, height: null, targetKb: 1024, format: 'same' },
    emoji: '📦',
    h1: 'Compress image to 1 MB',
    title: 'Compress image to 1MB online free',
    description: 'Reduce a JPG, PNG or WebP photo to 1 MB (1024 KB) or less, free, in your browser. How the target works. No upload, no sign-up.',
    summary: 'Get a camera photo under 1 MB, right in your browser.',
    quick:
      'To compress an image to 1 MB, drop it in and press Resize: the target is already 1024 KB and the pixel size is kept as it is. The tool finds the highest quality that fits. It runs in your browser, so the picture is never uploaded.',
    steps: [
      'Drop your JPG, PNG or WebP picture, or paste it from the clipboard.',
      'The target is already set to 1024 KB (1 MB) and the pixel size stays as it is.',
      'Press Resize. The tool tries different quality levels and keeps the best one that fits.',
      'Check the size in the list, then download it.',
    ],
    notes: [
      'One megabyte is 1024 KB. Many forms and email systems use 1 MB as a limit, and a modern phone photo of 3 to 8 MB needs a real reduction to reach it.',
      'The target is a ceiling, not a goal. If your picture is already under 1 MB the tool re-saves it at high quality and does not make it bigger on purpose; in our own test a 208 KB JPG came out at 338 KB, still far under 1 MB.',
      'PNG is lossless, so a PNG with a target is saved as WebP. If a form insists on JPG, use the Convert images page first.',
    ],
    faqs: [
      { q: 'How many KB is 1 MB?', a: 'One megabyte is 1024 KB here. The page sets the target to 1024 KB.' },
      { q: 'The photo is still over 1 MB. What now?', a: 'The picture has very many pixels. Open Resize images, set a smaller width such as 1600 pixels, keep the 1 MB target and run it again.' },
      { q: 'Does the picture look worse?', a: 'Slightly, if the original was large. The tool lowers quality only as far as it needs to, so a photo that only just exceeds 1 MB loses very little.' },
      { q: 'Is my picture uploaded?', a: 'No. The compression runs inside your browser tab and the file stays on your device.' },
    ],
    related: ['compress-image-to-500kb', 'compress-image-to-2mb', 'resize-image', 'compress-image'],
    sections: [
      section(
        'What to expect at 1 MB',
        'Most pictures reach 1 MB with only a small quality drop. The result keeps its pixel size unless the picture is huge, in which case the tool tells you to reduce the width as well.',
      ),
    ],
  },
  {
    slug: 'compress-image-to-2mb',
    kind: { kind: 'custom' },
    engine: 'resize',
    initial: { mode: 'percent', percent: 100, width: null, height: null, targetKb: 2048, format: 'same' },
    emoji: '📦',
    h1: 'Compress image to 2 MB',
    title: 'Compress image to 2MB online free',
    description: 'Reduce a JPG, PNG or WebP photo to 2 MB (2048 KB) or less, free, in your browser, with the pixel size kept. No upload, no sign-up.',
    summary: 'Get a big photo under 2 MB, right in your browser.',
    quick:
      'To compress an image to 2 MB, drop it in and press Resize: the target is already 2048 KB and the pixel size is kept. The tool finds the highest quality that fits, so the result stays sharp. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your JPG, PNG or WebP picture, or paste it.',
      'The target is already set to 2048 KB (2 MB) and the pixel size stays as it is.',
      'Press Resize.',
      'Check the size in the list, then download the result.',
    ],
    notes: [
      'Two megabytes is 2048 KB. It is a typical limit on job sites, school portals and email attachments, and the least strict of the common size limits, so a quality drop is usually barely visible.',
      'The target is a ceiling, not a goal. A picture that is already under 2 MB is simply re-saved at high quality.',
      'If a picture is very large, such as a 48 megapixel camera photo, you may need to reduce the width as well. The tool says so when the target cannot be reached.',
    ],
    faqs: [
      { q: 'Will the picture lose quality?', a: 'Only as much as needed. At 2 MB most photos keep their full pixel size and look almost identical.' },
      { q: 'Why did my file get no smaller?', a: 'It was already under 2 MB. The target is a ceiling, so a small picture is not padded or compressed further than needed.' },
      { q: 'Can I do many photos at once?', a: 'Yes. Add as many as your device can handle and download them together as a ZIP.' },
      { q: 'Is my picture uploaded?', a: 'No. Everything happens in your browser.' },
    ],
    related: ['compress-image-to-1mb', 'compress-image-to-500kb', 'resize-image', 'compress-image'],
    sections: [
      section('What to expect at 2 MB', 'A 12 megapixel phone photo is commonly 3 to 6 MB. Getting it to 2 MB usually costs a modest quality drop and keeps the full pixel size.'),
    ],
  },

  // A minimum file size.
  {
    slug: 'increase-image-size-in-kb',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: null, height: null, minKb: 100, maxKb: 200, fit: 'pad' } },
    emoji: '⬆️',
    h1: 'Increase image size in KB',
    title: 'Increase image size in KB: reach a minimum',
    description: 'Make a JPG reach a minimum file size, such as 50 or 100 KB, for forms that reject small files. The picture is not changed. Free, in your browser.',
    summary: 'Reach the minimum file size a form asks for.',
    quick:
      'To increase an image to a minimum size in KB, drop it in, set the minimum and maximum sizes in the form, and press Make my file: harmless filler data is added to the JPG so it reaches the minimum, and the picture itself is not changed. Nothing is uploaded.',
    steps: [
      'Drop your picture, or tap to choose it. HEIC photos from an iPhone work too.',
      'Set Minimum size (KB) and Maximum size (KB) to what the form says. The page starts with 100 and 200.',
      'Leave the width and height empty to keep the picture size, or type exact pixels.',
      'Press Make my file, check the size in the list, then download the JPG.',
    ],
    notes: [
      'Some forms reject files that are too small, for example "between 20 and 50 KB". If your picture comes out smaller than the minimum, the tool adds harmless filler data inside the JPG file until it reaches the minimum. The picture, its pixels and its quality are not changed, so it looks exactly the same.',
      'This does not make the picture sharper or bigger in pixels. If you need more pixels, type a width and height in the form: the tool will then scale the picture to that size.',
      'The result is always a JPG. The numbers on this page are examples to edit, not requirements of any exam: take them from your own form. For exams with official numbers see the Exam photo and signature resizer.',
    ],
    faqs: [
      { q: 'How can a file get bigger without changing the picture?', a: 'A JPG file can carry extra, unused data. The tool adds some until the file reaches your minimum. Viewers ignore it, so the picture looks the same.' },
      { q: 'Will the form accept it?', a: 'A form that only checks the file size and type will. A form that also checks the picture, such as for a face, looks at the picture, which is unchanged.' },
      { q: 'Can I also set a maximum?', a: 'Yes. Set Maximum size (KB) to the form\'s limit. The tool saves at the best quality under it, then fills up to the minimum if the result is still too small.' },
      { q: 'Does it work for PNG or WebP files?', a: 'You can drop them in, but the result is a JPG, which is what most forms ask for.' },
      { q: 'Is my picture uploaded?', a: 'No. It is processed in your browser and stays on your device.' },
    ],
    related: ['exam-photo-resizer', 'compress-image-to-100kb', 'resize-image', 'compress-image'],
    sections: [
      section(
        'When to use this, and when not to',
        'Use it when a form rejects a file for being too small, for example a signature scan of 6 KB where the form wants 10 to 20 KB. Do not use it to hide a low-quality picture: if a form needs a sharper photo, take a better one.',
      ),
    ],
  },

  // A signature of 10 to 20 KB.
  {
    slug: 'resize-signature-10-20kb',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: null, height: null, minKb: 10, maxKb: 20, fit: 'pad' } },
    emoji: '✍️',
    h1: 'Resize signature to 10 to 20 KB',
    title: 'Resize signature to 10 to 20 KB online',
    description: 'Get a scanned signature between 10 and 20 KB as a JPG, as several exam forms ask. Padded or compressed as needed. Free, in your browser.',
    summary: 'Fit a scanned signature into a 10 to 20 KB window.',
    quick:
      'To resize a signature to 10 to 20 KB, drop your scan in and press Make my file: the form is already set to a minimum of 10 KB and a maximum of 20 KB. The tool compresses it if it is too big and fills it up if it is too small. Nothing is uploaded.',
    steps: [
      'Sign on white paper with a black pen, and scan or photograph it. Crop close to the signature.',
      'Drop the picture here, or tap to choose it.',
      'Minimum 10 KB and maximum 20 KB are already set. Leave the width and height empty to keep the picture size.',
      'Press Make my file, then download the JPG and upload it to the form.',
    ],
    notes: [
      'Several forms we have read ask for a signature of 10 to 20 KB, for example the SSC notices and the IBPS and SBI notifications, each with its own pixel or centimetre size. See the exam pages below, which show the source document and the date we read it.',
      'This page sets only the file size. If your form also gives a size in pixels, type it in the width and height boxes, or pick your exam in the Exam photo and signature resizer, where the numbers are preset from the official document.',
      'Crop close, sign on white paper and avoid shadows. A tiny signature in a big white scan is the usual reason forms reject it, because it becomes unreadable when compressed.',
    ],
    faqs: [
      { q: 'What size does a signature need to be?', a: 'It depends on the form. Many ask for 10 to 20 KB as a JPG. Take the pixel or centimetre size from your own notice.' },
      { q: 'My signature scan is only 5 KB. What now?', a: 'The tool adds harmless filler to the JPG so it reaches the 10 KB minimum. The picture is not changed.' },
      { q: 'My scan is 300 KB. What now?', a: 'The tool lowers the quality until it fits under 20 KB. If it cannot, it tells you, and you can crop closer or type a smaller width and height.' },
      { q: 'Why does the form say my signature is too small?', a: 'Forms often reject a signature that fills only a small part of the picture. Crop so the signature fills most of it.' },
      { q: 'Is my signature uploaded?', a: 'No. It is processed in your browser and stays on your device.' },
    ],
    related: ['exam-photo-resizer', 'ibps-po-signature-size', 'ssc-cgl-signature-size', 'compress-image-to-20kb'],
    sections: [
      section(
        'What this page does not decide',
        'It does not know which exam you are applying to, and it never claims a requirement for one. It only makes the file size land in the window you set, which starts at the common 10 to 20 KB.',
      ),
    ],
  },

  // Sizes in pixels. The numbers are arithmetic at 300 DPI, not an official requirement, and the pages say so.
  {
    slug: 'resize-image-to-35x45-mm',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: 413, height: 531, minKb: null, maxKb: 500, fit: 'crop' } },
    emoji: '📐',
    h1: 'Resize image to 35 x 45 mm',
    title: 'Resize image to 3.5 x 4.5 cm: 413 x 531 px',
    description: 'Make a photo 3.5 x 4.5 cm (35 x 45 mm), which is 413 x 531 pixels at 300 DPI. Cropped to fit, free, in your browser, no upload.',
    summary: 'Crop a photo to the common passport shape, 35 x 45 mm.',
    quick:
      'To resize an image to 3.5 x 4.5 cm, drop it in and press Make my file: the form is already set to 413 x 531 pixels, which is 35 x 45 mm at 300 DPI. The tool cuts the edges to fit and keeps the file under 500 KB. Nothing is uploaded.',
    steps: [
      'Drop your photo, or tap to choose it. HEIC photos from an iPhone work too.',
      'The size is already 413 x 531 pixels. Change the maximum size (KB) if your form has a limit.',
      'Press Make my file. The edges are cut so the picture fills the exact size.',
      'Check the result, then download the JPG.',
    ],
    notes: [
      '3.5 x 4.5 cm is the same as 35 x 45 mm. At 300 DPI that is 413 x 531 pixels (3.5 cm is 1.378 inches, times 300, is 413; 4.5 cm is 1.772 inches, times 300, is 531). This is arithmetic, not a rule of any office.',
      'The picture is cut at the edges to fill the exact size, keeping the middle, so frame your face in the middle before you upload. The file is saved as a JPG under the maximum shown in the form, which starts at 500 KB.',
      'Forms that give only a size in centimetres usually check the file size and the shape, not the DPI. If yours gives pixels, use those instead. 413 x 531 px, 35 x 45 mm and 3.5 x 4.5 cm are the same shape, so this one page covers all three.',
    ],
    faqs: [
      { q: 'How many pixels is 3.5 x 4.5 cm?', a: 'At 300 DPI it is 413 x 531 pixels. At 200 DPI it would be 276 x 354 pixels. Pixels depend on the DPI, and most forms that give pixels give them directly.' },
      { q: 'Is 35 x 45 mm the same as 3.5 x 4.5 cm?', a: 'Yes. 35 millimetres is 3.5 centimetres, and 45 millimetres is 4.5 centimetres.' },
      { q: 'Will the picture be stretched?', a: 'No. The edges are cut to fill the shape, which keeps faces natural. Choose "Keep everything, add white bars" in the form if you would rather not lose any part of the picture.' },
      { q: 'Does this decide what my form accepts?', a: 'No. Your form decides. This page makes the shape and the pixel size; take the file size and format from your form.' },
      { q: 'Is my photo uploaded?', a: 'No. It is resized in your browser and stays on your device.' },
    ],
    related: ['passport-size-photo', 'resize-image-to-2x2-inch', 'exam-photo-resizer', 'pixel-to-cm-converter'],
    sections: [
      section(
        'Where 3.5 x 4.5 cm is used',
        'It is a very common photo shape for forms and IDs in many countries. Some official pages we have read give this shape in centimetres, for example the GATE and CTET pages in this site\'s exam list, each with its source. The number of pixels is something your own form states, if at all.',
      ),
    ],
  },
  {
    slug: 'resize-image-to-2x2-inch',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: 600, height: 600, minKb: null, maxKb: 500, fit: 'crop' } },
    emoji: '⬜',
    h1: 'Resize image to 2 x 2 inch',
    title: 'Resize image to 2 x 2 inch: 600 x 600 px',
    description: 'Make a photo 2 x 2 inch, which is 600 x 600 pixels at 300 DPI. Square crop, free, in your browser, with no upload and no sign-up.',
    summary: 'Crop a photo to a 2 x 2 inch square.',
    quick:
      'To resize an image to 2 x 2 inch, drop it in and press Make my file: the form is already set to 600 x 600 pixels, which is 2 x 2 inch at 300 DPI. The tool crops to a square and keeps the file under 500 KB. Nothing is uploaded.',
    steps: [
      'Drop your photo, or tap to choose it.',
      'The size is already 600 x 600 pixels. Change the maximum size (KB) if your form has a limit.',
      'Press Make my file. The picture is cut to a square around the middle.',
      'Check the result, then download the JPG.',
    ],
    notes: [
      '2 inches at 300 DPI is 600 pixels, so a 2 x 2 inch picture is 600 x 600 pixels. 51 x 51 millimetres is the same size. This is arithmetic, not a rule of any office.',
      'The picture is cut at the edges to a square, keeping the middle, so frame the head in the centre before you upload. Pick "Keep everything, add white bars" in the form if you do not want any cut.',
      'Square photos are asked for by many forms and portals. If yours gives a different pixel size or file size, type it into the form on this page.',
    ],
    faqs: [
      { q: 'How many pixels is 2 x 2 inch?', a: 'At 300 DPI it is 600 x 600 pixels. At 200 DPI it is 400 x 400 pixels. A form that gives pixels states them directly.' },
      { q: 'How many cm is 2 x 2 inch?', a: 'Just over 5.08 cm each way, about 51 x 51 mm.' },
      { q: 'Does it keep my head in the middle?', a: 'It keeps the middle of your picture. If your head is off to one side, crop it with Crop images first.' },
      { q: 'Does this decide what a form accepts?', a: 'No. Take the file size, format and rules about the background and head size from your own form.' },
      { q: 'Is my photo uploaded?', a: 'No. Everything happens in your browser.' },
    ],
    related: ['resize-image-to-35x45-mm', 'passport-size-photo', 'crop-image', 'pixel-to-cm-converter'],
    sections: [
      section('Square photos', 'A square is the easiest shape to fit, because the same size works whether the original is portrait or landscape. The tool takes the middle square of your picture.'),
    ],
  },
  {
    slug: 'resize-image-to-200x230-px',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: 200, height: 230, minKb: 20, maxKb: 50, fit: 'crop' } },
    emoji: '🪪',
    h1: 'Resize image to 200 x 230 pixels',
    title: 'Resize image to 200 x 230 pixels, 20 to 50 KB',
    description: 'Make a photo exactly 200 x 230 pixels and 20 to 50 KB, a size several bank forms use. Official sources linked. Free, in your browser.',
    summary: 'Fit a photo to exactly 200 x 230 pixels.',
    quick:
      'To resize an image to 200 x 230 pixels, drop it in and press Make my file: the form is set to 200 x 230 pixels and 20 to 50 KB. The tool cuts the edges to fit and saves a JPG in that file-size window. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your photo, or tap to choose it. HEIC photos from an iPhone work too.',
      'The size is already 200 x 230 pixels with a 20 to 50 KB file size. Change any number your form needs.',
      'Press Make my file.',
      'Check the size in the list, then download the JPG.',
    ],
    notes: [
      'This page only sets the numbers 200 x 230 pixels and 20 to 50 KB for you. They are not a rule of every form. The official IBPS and SBI notices that we read give exactly these numbers for the photograph, as preferred pixels with the file-size limits; see the exam pages below for the source documents and the dates we read them.',
      'The picture is cut at the edges to fill the exact size, keeping the middle, so frame the face in the centre first.',
      'If your form is for a different exam, choose it in the Exam photo and signature resizer instead, where the numbers come from the official document.',
    ],
    faqs: [
      { q: 'Which forms use 200 x 230 pixels?', a: 'The IBPS and SBI recruitment notices we read ask for a photograph of 200 x 230 pixels, 20 to 50 KB. Other forms differ, so always check yours.' },
      { q: 'What if my form says 3.5 x 4.5 cm instead?', a: 'Use Resize image to 3.5 x 4.5 cm. That page works out 413 x 531 pixels at 300 DPI.' },
      { q: 'Why 20 to 50 KB?', a: 'That is the file-size window in those notices. A picture that comes out under 20 KB gets harmless filler data so it reaches the minimum.' },
      { q: 'Does it cut off part of my face?', a: 'It cuts the edges to fill the shape. Choose "Keep everything, add white bars" in the form if you would rather keep the whole picture.' },
      { q: 'Is my photo uploaded?', a: 'No. It stays in your browser.' },
    ],
    related: ['ibps-po-photo-size', 'sbi-po-photo-size', 'exam-photo-resizer', 'resize-image-to-35x45-mm'],
    sections: [
      section('Official sources for this size', 'The exam pages ibps-po-photo-size, ibps-clerk-photo-size and sbi-po-photo-size each show the notification, the page where the numbers are printed and the date we read it.'),
    ],
  },
  {
    slug: 'passport-size-photo',
    kind: { kind: 'custom' },
    engine: 'exam',
    initial: { examId: 'custom', custom: { width: 413, height: 531, minKb: null, maxKb: 500, fit: 'crop' } },
    emoji: '🛂',
    h1: 'Passport size photo: resize to the right shape',
    title: 'Passport size photo: crop and resize online',
    description: 'Crop a photo to a passport-style shape, 413 x 531 px (35 x 45 mm) by default, with the sizes to expect and where to check yours. Free, no upload.',
    summary: 'Make a passport-style photo from any picture.',
    quick:
      'To make a passport size photo, drop your picture in and press Make my file: the form starts at 413 x 531 pixels, the 35 x 45 mm shape at 300 DPI, cropped to the middle. Change the numbers to match your office. Photos are never uploaded.',
    steps: [
      'Take or choose a photo in front of a plain light wall, with your face in the middle and looking straight ahead.',
      'Drop it here. The size starts at 413 x 531 pixels (35 x 45 mm at 300 DPI).',
      'Change the width, height and maximum size (KB) to what your form or office says.',
      'Press Make my file, then download the JPG.',
    ],
    notes: [
      'There is no single passport size. The sizes differ by country and by whether you upload a file or print. This page makes the shape; it does not decide what your office accepts. Read your office\'s own page first.',
      'Two official pages we read give details for digital photos. GOV.UK asks for at least 600 x 750 pixels and 50 KB to 10 MB for a digital UK passport photo, and Canada.ca asks for 1,200 x 1,800 pixels or more, 200 KB to 5 MB, for a digital Canadian passport photo (it gives 50 x 70 mm for a printed one). Both have a preset in the exam list, with the source link and the date we read it.',
      'A passport-style photo needs a plain background, even light, no shadows on the face, and no glasses glare or hats. This tool does not change the background or check your face: it only crops and resizes.',
      'Passport-size sizes in pixels at 300 DPI: 35 x 45 mm is 413 x 531 pixels, 2 x 2 inch is 600 x 600 pixels, and 50 x 70 mm is 591 x 827 pixels. These are conversions, not rules.',
    ],
    faqs: [
      { q: 'What size is a passport size photo?', a: 'It depends on the country and the form. 35 x 45 mm is common, 2 x 2 inch is common for US-style photos, and Canada prints 50 x 70 mm. Check your office\'s own page.' },
      { q: 'Can this tool remove the background?', a: 'No. It crops and resizes only. A background remover is on our roadmap.' },
      { q: 'How big in KB should the file be?', a: 'Your form states it. The page starts with a 500 KB maximum, which you can change. If a form gives a minimum, set Minimum size (KB) as well.' },
      { q: 'Can I print a sheet of photos?', a: 'Not yet. A print sheet with several photos on one page is on our roadmap.' },
      { q: 'Is my photo uploaded?', a: 'No. It is processed in your browser and stays on your device.' },
    ],
    related: ['resize-image-to-35x45-mm', 'resize-image-to-2x2-inch', 'uk-passport-photo-size', 'canada-passport-photo-size'],
    sections: [
      section(
        'Official digital photo pages we have read',
        'UK passport (digital photo): the GOV.UK page "Get a passport photo". Canada passport (digital photo): the Canada.ca page "Passport photo requirements". Their exam pages show the numbers, the section of the page and the date we read it. Pages for the Indian passport, the US visa and the Schengen visa are not published, because we could not read an official page with the numbers.',
      ),
    ],
  },
  {
    slug: 'add-name-and-date-to-photo',
    kind: { kind: 'custom' },
    engine: 'text',
    initial: { text: 'YOUR NAME\nDD/MM/YYYY', position: 'bottom-center', sizePct: 6, colour: 'white', box: 'dark' },
    emoji: '🏷️',
    h1: 'Add name and date to a photo',
    title: 'Add name and date to a photo online free',
    description: 'Print your name and a date on a photo, in a readable strip at the bottom, for forms that ask for it. Free, in your browser, no upload.',
    summary: 'Print a name and a date on a photo, readable on any picture.',
    quick:
      'To add a name and date to a photo, drop it in, type your name on the first line and the date on the second, and press Add text: the lines go in a dark strip at the bottom so they stay readable. It runs in your browser, so the photo is never uploaded.',
    steps: [
      'Drop your photo, or tap to choose it.',
      'Replace the first line with your name and the second line with the date, written the way your form asks.',
      'Check the preview. Move the text, change its size or colour, or switch the strip on or off.',
      'Press Add text, then download the picture.',
    ],
    notes: [
      'Some forms ask for the candidate’s name and the date the photo was taken to be printed on the photo. This page only puts the text you type onto your picture. It does not add the date by itself, so type the date yourself, and it does not know any form’s rules: read your own notice for the date format, the position and the size.',
      'The text goes in a dark strip so it stays readable on busy or light pictures. You can have up to five lines of up to 60 characters.',
      'A date printed on a photo does not prove when it was taken. Use the real date, and the same photo you upload elsewhere on the form. If your form also has a size in pixels and KB, resize the photo first, then add the text, then check the file size again.',
    ],
    faqs: [
      { q: 'Does it add the date automatically?', a: 'No. Type the date yourself in the format your form asks, such as DD/MM/YYYY.' },
      { q: 'Where is the text placed?', a: 'At the bottom centre by default, in a dark strip. You can move it to any of nine positions or turn the strip off.' },
      { q: 'Will it change the size of my photo?', a: 'No. The picture keeps its pixel size and format. The text is drawn onto it.' },
      { q: 'Can I do this for many photos?', a: 'The same text is applied to the photo you choose. For several people, run it once for each photo with the right name and date.' },
      { q: 'Is my photo uploaded?', a: 'No. The text is drawn in your browser and the photo stays on your device.' },
    ],
    related: ['add-text-to-image', 'exam-photo-resizer', 'resize-image-to-35x45-mm', 'compress-image'],
    sections: [
      section('When to use this, and when not to', 'Use it when a form asks for a name and date on the photo and you have the photo already. Do not use it to change a date: a printed date should match when the photo was really taken.'),
    ],
  },
];
