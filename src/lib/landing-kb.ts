/** The "compress image to N KB" page builder. Its own module so landing.ts and landing-growth.ts can both use it without importing each other. */
import type { LandingPage } from './landing';

const KB_STEPS = (kb: number): string[] => [
  'Drop your JPG, PNG or WebP picture, or paste it from the clipboard.',
  `The target size is already set to ${kb} KB and the pixel size is kept as it is.`,
  'Press Resize. The tool tries different quality levels and keeps the best one that fits.',
  'Check the result size in the list, then download it.',
];

export const kbPage = (kb: number, extra: string, who: string): LandingPage => ({
  slug: `compress-image-to-${kb}kb`,
  kind: { kind: 'kb', kb },
  engine: 'resize',
  initial: { mode: 'percent', percent: 100, width: null, height: null, targetKb: kb, format: 'same' },
  emoji: '📦',
  h1: `Compress image to ${kb} KB`,
  title: `Compress image to ${kb}KB online free`,
  description: `Reduce a JPG, PNG or WebP photo to ${kb} KB or less, free, in your browser. No upload, no sign-up, no watermark.`,
  summary: `Shrink a photo to ${kb} KB or under, right in your browser.`,
  quick: `To compress an image to ${kb} KB, drop it in and press Resize: the target is already set to ${kb} KB, and the tool finds the highest quality that fits. It runs on your device, so the picture is never uploaded.`,
  steps: KB_STEPS(kb),
  notes: [
    extra,
    `${who} If the photo is very large, ${kb} KB may need a smaller pixel size as well as lower quality. In that case the tool tells you, and you can lower the width on the Resize images page and try again.`,
    'PNG is a lossless format, so it cannot be squeezed to an exact size by quality alone. A PNG with a target size is saved as WebP, which is much smaller. If a form insists on JPG, use the Convert images page first.',
  ],
  faqs: [
    {
      q: `How do I get a photo under ${kb} KB without it looking bad?`,
      a: `Leave the pixel size alone first. The tool lowers the JPG or WebP quality step by step until the file is ${kb} KB or less, which keeps the picture sharp for as long as possible. Only if that is not enough do you need to reduce the width as well.`,
    },
    {
      q: 'Is my picture uploaded anywhere?',
      a: 'No. The compression runs inside your browser tab. The file is not sent to our servers, so it also works for private photos and documents.',
    },
    {
      q: `The result is bigger than ${kb} KB. What now?`,
      a: `The picture has too many pixels for ${kb} KB at an acceptable quality. Open Resize images, set a smaller width (for example 800 pixels), keep the target at ${kb} KB and run it again.`,
    },
    {
      q: 'Does it work on my phone?',
      a: 'Yes. Tap the drop area to choose a photo from your gallery or take a new one. Many forms ask for a size limit, and phones usually produce files of several MB, so this is a common job.',
    },
  ],
  related: ['resize-image', 'compress-image', 'exam-photo-resizer', 'convert-image'],
});

