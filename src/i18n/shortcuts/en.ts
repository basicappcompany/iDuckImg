import type { ShortcutText } from './types';

/** The English source of the templates. The English pages themselves are written out in src/lib/landing.ts. */
export const en: ShortcutText = {
  chrome: {
    howToUse: 'How to use it',
    related: 'Related',
    quickTools: 'Quick tools',
    community: 'Community',
    alsoFrom: 'Also from iDuck',
    iduckpdf: 'iDuckPDF: PDF tools',
    communityPages: {
      roadmap: 'Roadmap',
      request: 'Request a feature',
      feedback: 'Send feedback',
      support: 'Support iDuckImg',
      settings: 'Settings',
      about: 'About',
    },
    groups: {
      compress: 'Compress & resize',
      convert: 'Convert a format',
      other: 'Open other formats',
      pdf: 'Make a PDF',
      forms: 'Photos for forms',
      edit: 'Quick edits',
    },
  },
  kb: {
    name: 'Compress image to {kb} KB',
    title: 'Compress image to {kb}KB online free',
    description: 'Reduce a JPG, PNG or WebP photo to {kb} KB or less, free, in your browser. No upload, no sign-up, no watermark.',
    summary: 'Shrink a photo to {kb} KB or under, right in your browser.',
    quick: 'To compress an image to {kb} KB, drop it in and press "{run}": the target is already set to {kb} KB, and the tool finds the highest quality that fits. It runs on your device, so the picture is never uploaded.',
    steps: [
      'Drop your JPG, PNG or WebP picture, or paste it from the clipboard.',
      'The target size is already set to {kb} KB and the pixel size is kept as it is.',
      'Press "{run}". The tool tries different quality levels and keeps the best one that fits.',
      'Check the result size in the list, then download it.',
    ],
    faqs: [
      {
        q: 'How do I get a photo under {kb} KB without it looking bad?',
        a: 'Leave the pixel size alone first. The tool lowers the JPG or WebP quality step by step until the file is {kb} KB or less. Only if that is not enough do you need to reduce the width as well.',
      },
      {
        q: 'Is my picture uploaded anywhere?',
        a: 'No. The compression runs inside your browser tab. The file is not sent to our servers, so it also works for private photos and documents.',
      },
      {
        q: 'The result is bigger than {kb} KB. What now?',
        a: 'The picture has too many pixels for {kb} KB at an acceptable quality. Open the resize tool, set a smaller width (for example 800 pixels), keep the target at {kb} KB and run it again.',
      },
    ],
  },
  convert: {
    name: '{from} to {to}',
    h1: '{from} to {to} converter',
    title: '{from} to {to}: free online converter',
    description: 'Convert {from} to {to} free in your browser. No upload, no sign-up, no watermark. Works on phones and computers.',
    summary: 'Turn {from} files into {to} in a few seconds.',
    quick: 'To convert {from} to {to}, drop your {from} files in, check that the format says {to}, and press "{run}". {why} It happens in your browser, so nothing is uploaded.',
    steps: [
      'Drop your {from} files, or tap the area to choose them. You can add many at once.',
      'The output format is already set to {to}.',
      'Press "{run}".',
      'Download each file, or all of them in one ZIP.',
    ],
    faqs: [
      {
        q: 'Is it safe to convert private pictures here?',
        a: 'The conversion runs inside your browser, so the pictures are not uploaded to our servers.',
      },
      {
        q: 'Can I convert many files at once?',
        a: 'Yes. Add as many as your device can handle, and download them together as a ZIP.',
      },
    ],
  },
  why: {
    'heic-to-jpg': 'HEIC is the format iPhones use by default, and JPG opens on every device and website.',
    'heic-to-png': 'PNG keeps every pixel exactly as it is and opens everywhere.',
    'png-to-jpg': 'JPG files are usually much smaller than PNG for photos.',
    'jpg-to-png': 'PNG is lossless, so it is a safe format to edit and save again.',
    'webp-to-jpg': 'JPG opens in every program, while some editors and forms still reject WebP.',
    'webp-to-png': 'PNG keeps transparency and opens in every editor.',
    'jpg-to-webp': 'WebP is typically 25 to 35 percent smaller than JPG at similar quality, which makes pages load faster.',
    'png-to-webp': 'WebP is much smaller than PNG and can keep transparency.',
    'jpg-to-pdf': 'Each picture becomes one PDF page, with the page the same size as the picture.',
    'png-to-pdf': 'Each picture becomes one PDF page.',
    'avif-to-jpg': 'JPG opens everywhere, including forms, editors and older phones that cannot show AVIF.',
    'avif-to-png': 'PNG opens in every editor and keeps any transparent background.',
    'svg-to-png': 'PNG is a normal picture that any program, form or social site accepts, and it keeps the transparent background.',
    'svg-to-jpg': 'JPG is a small, universal photo format, and the SVG is drawn sharp before it is saved.',
    'bmp-to-jpg': 'A BMP is stored uncompressed, so the JPG is usually a small fraction of its size.',
    'gif-to-png': 'You get a sharp still picture of the GIF that keeps any transparent background.',
  },
  exam: {
    name: '{short} {what} size',
    title: '{short} {what} size in px and KB',
    description: 'Resize your {what} to {req} for {short}. From the official notice. Free, in your browser, no upload.',
    summary: 'Get your {short} {what} to {size}.',
    quick: 'To resize your {what} for {short}, drop it in and press "{run}": the tool is already set to {req}, as in the official notice. It runs in your browser, so the picture is never uploaded.',
    steps: [
      'Drop your {what}, or tap the area to choose it. HEIC photos from an iPhone work too.',
      '{exam} and {doc} are already chosen, so the size is set to {req}.',
      'Press "{run}".',
      'Check the size in the list, then download the JPG and upload it to the form.',
    ],
    faqs: [
      {
        q: 'What size should the {what} be for {short}?',
        a: '{exam} asks for {req}. This comes from {source} ({location}).',
      },
      {
        q: 'How does the file get to the right size?',
        a: 'It is fitted to the size and saved as a JPG at the best quality that stays under the maximum. Everything happens in your browser, so the picture is never uploaded.',
      },
      {
        q: 'Are these numbers still current?',
        a: 'They were read from the official document on {date}, for {cycle}. Check your own notice, because exams change their rules between cycles.',
      },
    ],
  },
  docs: { photo: 'photo', signature: 'signature', 'left-thumb': 'left thumb impression', declaration: 'declaration' },
};
