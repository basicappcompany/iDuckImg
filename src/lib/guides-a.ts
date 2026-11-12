import type { Guide } from './guides';

/** Guides 1 to 9. Every claim here describes what the tool really does; a test checks the structure, not the facts, so re-read the tool when you change one. */
export const GUIDES_A: Guide[] = [
  {
    slug: 'how-to-compress-an-image',
    title: 'How to compress an image without losing quality',
    seoTitle: 'How to Compress an Image Without Losing Quality (Free)',
    description: 'Shrink JPG, PNG and WebP files in your browser. Pick a quality, check the before and after sizes, and download. No upload, no sign-up.',
    tool: 'compress-image',
    related: ['how-to-resize-an-image', 'how-to-convert-images-between-jpg-png-webp-and-heic', 'how-to-remove-location-and-exif-data-from-a-photo'],
    updated: '2026-11-12',
    intro:
      'To compress an image, drop it into the Compress images tool, keep the quality near 75 and press Compress. Photos usually get much smaller with no change you can see, and the picture never leaves your device.',
    steps: [
      'Open the Compress images tool and drop in your JPG, PNG or WebP files, or paste them from the clipboard.',
      'Set the quality. Around 75 keeps a photo looking the same while making the file much smaller.',
      'Press Compress and look at the before and after size next to each file.',
      'Download each file, or all of them in one ZIP.',
    ],
    sections: [
      {
        h: 'What changes for each file type',
        p: [
          'JPG and WebP are compressed with an adjustable quality, so a lower number means a smaller file and a little less detail. Photos from a phone are often 3 to 8 MB, and most of that can go without a visible difference.',
          'PNG is different. It is optimised without losing anything, so the picture is exactly the same but the saving is smaller. If a PNG is a photo, converting it to JPG or WebP will save far more.',
        ],
      },
      {
        h: 'If you need an exact size',
        p: [
          'Forms often say a photo must be under a number of kilobytes. For that, use the target size box on the Resize images tool, or open a ready-made page such as Compress image to 100 KB. It tries different quality levels and keeps the best one that fits.',
          'If a file cannot be made smaller, you get the original back instead of a worse one.',
        ],
      },
    ],
    faq: [
      { q: 'Does compressing an image reduce its quality?', a: 'JPG and WebP lose a small amount of detail as the quality goes down, and at around 75 the change is hard to see. PNG is optimised without any loss.' },
      { q: 'Is my picture uploaded when I compress it?', a: 'No. The work happens in your browser on your own device, so the file is never sent anywhere.' },
      { q: 'Can I compress many images at once?', a: 'Yes. Add as many as you like, and download them together as a ZIP.' },
    ],
  },
  {
    slug: 'how-to-resize-an-image',
    title: 'How to resize an image by pixels, percent or file size',
    seoTitle: 'How to Resize an Image: Pixels, Percent or KB (Free)',
    description: 'Change an image to exact pixel sizes, a percentage, or a target file size in KB, in your browser. Keeps the proportions. No upload.',
    tool: 'resize-image',
    related: ['how-to-compress-an-image', 'how-to-crop-an-image', 'how-to-calculate-an-aspect-ratio'],
    updated: '2026-11-12',
    intro:
      'To resize an image, drop it into the Resize images tool, type a width or height in pixels or choose a percentage, and press Resize. Leave one box empty and the other is worked out so the picture is not stretched.',
    steps: [
      'Open the Resize images tool and drop in your JPG, PNG or WebP files.',
      'Type a width, a height, or a percentage. Leave one box empty to keep the proportions.',
      'If a form needs a file size, type a target in KB, for example 100.',
      'Press Resize and download the result, or all files as a ZIP.',
    ],
    sections: [
      {
        h: 'Pixels, percent or kilobytes?',
        p: [
          'Pixels are for places that ask for a size such as 1200 by 800. A percentage is quicker when you just want it smaller, for example 50 percent. A target in KB is for upload limits, and the tool finds the best quality that fits.',
          'The target size works for JPG and WebP. A PNG with a target size is saved as WebP, because PNG is lossless and cannot trade quality for size.',
        ],
      },
      {
        h: 'When the target is too small',
        p: [
          'If the size you ask for cannot be reached at the pixel size you chose, you see a message instead of a wrong file. Try fewer pixels, then try the target again.',
          'Making a picture bigger does not add detail. It is enlarged, so it can look soft, which is why shrinking is the safe direction.',
        ],
      },
    ],
    faq: [
      { q: 'How do I resize without stretching the picture?', a: 'Fill in only the width or only the height. The other side is calculated from the original proportions.' },
      { q: 'Can I resize to exactly 100 KB?', a: 'Yes. Type 100 as the target size. The tool picks the highest quality that fits under it, or tells you if it cannot.' },
      { q: 'Does resizing upload my photo?', a: 'No. It runs in your browser and the file stays on your device.' },
    ],
  },
  {
    slug: 'how-to-crop-an-image',
    title: 'How to crop an image to the exact area you want',
    seoTitle: 'How to Crop an Image: Drag, Ratio or Exact Pixels',
    description: 'Crop a picture by dragging a box, locking a ratio such as 1:1 or 16:9, or typing exact pixels. Free, in your browser, no upload.',
    tool: 'crop-image',
    related: ['how-to-resize-an-image', 'how-to-make-a-round-profile-picture', 'how-to-rotate-or-flip-an-image'],
    updated: '2026-11-12',
    intro:
      'To crop an image, drop it into the Crop images tool, drag the box over the part you want to keep and press Crop. Choose a shape such as 1:1 or 16:9 to lock the proportions, or type exact pixels.',
    steps: [
      'Open the Crop images tool and drop in a JPG, PNG or WebP image.',
      'Drag the box and its handles over the part you want. Pick a ratio like 1:1 or 16:9 if you need one.',
      'Or type the left, top, width and height in pixels for an exact crop.',
      'Press Crop and download the result.',
    ],
    sections: [
      {
        h: 'Choosing a ratio',
        p: [
          'A ratio keeps the box in a fixed shape while you move and resize it. Use 1:1 for a square profile picture, 16:9 for video thumbnails and slides, and 4:3 or 3:2 for photo prints.',
          'If you are not sure what shape a place wants, the aspect ratio calculator turns a width and height into a ratio.',
        ],
      },
      {
        h: 'Fine control without a mouse',
        p: [
          'You can move the box with the arrow keys and type exact values, which also works on a phone where dragging is fiddly. The cropped picture keeps its original format.',
          'Cropping removes the outside area for good in the file you download, so keep your original if you may want it back. Because the tool never touches the file you dropped in, you can always start again from it and try a different box.',
        ],
      },
    ],
    faq: [
      { q: 'How do I crop to a square?', a: 'Choose the 1:1 shape and move the box over the part you want. The box stays square as you resize it.' },
      { q: 'Can I crop to exact pixels?', a: 'Yes. Type the left, top, width and height in pixels.' },
      { q: 'Does cropping reduce the quality?', a: 'The pixels you keep are unchanged. JPG and WebP are saved again at high quality, and PNG stays lossless.' },
    ],
  },
  {
    slug: 'how-to-add-a-watermark-to-a-photo',
    title: 'How to add a text watermark to a photo',
    seoTitle: 'How to Add a Text Watermark to a Photo (Free, No Upload)',
    description: 'Put your name or a copyright line on pictures. Choose position, size, opacity and colour, or repeat it across the image. Done in your browser.',
    tool: 'add-watermark-to-image',
    related: ['how-to-add-a-logo-to-a-photo', 'how-to-add-text-to-a-picture', 'how-to-remove-location-and-exif-data-from-a-photo'],
    updated: '2026-11-12',
    intro:
      'To watermark a photo, drop it into the Add a watermark tool, type your text, choose where it goes and press Add watermark. You can place it in a corner or repeat it across the whole picture.',
    steps: [
      'Open the Add a watermark tool and drop in your JPG, PNG or WebP pictures.',
      'Type your text, for example your name or a copyright line.',
      'Choose the position, size, opacity and colour. The preview updates as you change them.',
      'Press Add watermark and download each file, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'Making it readable but not ugly',
        p: [
          'The size is a share of the picture width, so the mark looks the same on a small photo and a large one. A soft edge in the opposite colour keeps white text readable on light areas and black text readable on dark ones.',
          'Around 60 percent opacity is a good start. Lower it if the mark competes with the picture, raise it if it must be seen.',
        ],
      },
      {
        h: 'What a watermark can and cannot do',
        p: [
          'A visible watermark discourages copying, but it does not prevent it. Someone determined can crop or edit it out. Putting it near the middle, or repeating it across the picture, makes that harder.',
          'The same watermark is applied to every picture you add, and JPG and WebP are saved again at high quality.',
        ],
      },
    ],
    faq: [
      { q: 'Can I watermark many photos at once?', a: 'Yes. Add them all, check the preview of the first, and every picture gets the same mark at the same relative size.' },
      { q: 'Can someone remove my watermark?', a: 'A determined person can crop or edit it out. A repeated mark across the whole picture is harder to remove than one in a corner.' },
      { q: 'Can I use a logo instead of text?', a: 'Yes, with the Add a logo tool, which places a PNG, JPG or WebP picture the same way.' },
    ],
  },
  {
    slug: 'how-to-add-a-logo-to-a-photo',
    title: 'How to put your logo on a photo',
    seoTitle: 'How to Add a Logo to a Photo or Image (Free, No Upload)',
    description: 'Place your logo on one picture or many. Pick the position, size and opacity, or repeat it across the image. Runs in your browser.',
    tool: 'add-logo-to-image',
    related: ['how-to-add-a-watermark-to-a-photo', 'how-to-merge-images-side-by-side', 'how-to-add-text-to-a-picture'],
    updated: '2026-11-12',
    intro:
      'To add a logo to a photo, drop the picture into the Add a logo tool, choose your logo file, pick where it goes and press Add logo. A PNG logo with a transparent background looks best.',
    steps: [
      'Open the Add a logo tool and drop in your JPG, PNG or WebP pictures.',
      'Choose your logo file. A PNG with a transparent background gives the cleanest result.',
      'Pick one of nine positions, or repeat it, then set the size and opacity.',
      'Press Add logo and download the files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'Getting a clean logo',
        p: [
          'A JPG logo keeps its white box, so it will show as a white rectangle on the photo. Export your logo as a PNG or WebP with a transparent background instead.',
          'SVG logos are not supported yet, because the browser cannot draw them in the background worker. Export a PNG at a large size first.',
        ],
      },
      {
        h: 'Size and placement',
        p: [
          'The logo keeps its own proportions and its size is a share of the picture width, so it looks the same on every photo in a batch. If it would be too big to fit, it is shrunk rather than cut off.',
          'Use a corner for a quiet brand mark and the middle or the repeat option when you want it harder to remove.',
        ],
      },
      {
        h: 'Tips for a professional result',
        p: [
          'Keep the logo small and consistent. Around 10 to 20 percent of the picture width is usually enough, and using the same corner on every photo makes a set look like it belongs together.',
          'Check the preview on a light photo and a dark one before you run a big batch. If the logo disappears on one of them, raise the opacity or add a light outline to the logo before you use it.',
        ],
      },
    ],
    faq: [
      { q: 'Which logo files work?', a: 'PNG, JPG and WebP. A transparent PNG or WebP looks best. SVG is not supported yet.' },
      { q: 'Is my logo or photo uploaded?', a: 'No. Both are combined in your browser and stay on your device.' },
      { q: 'Can I put the logo on many photos?', a: 'Yes. The same logo goes on every picture at the same relative size.' },
    ],
  },
  {
    slug: 'how-to-resize-a-photo-and-signature-for-an-exam-form',
    title: 'How to resize a photo and signature for an exam form',
    seoTitle: 'Resize Photo and Signature for Exam Forms (Exact KB and px)',
    description: 'Get a photo, signature or thumb impression to the exact pixels and KB an exam form asks for, using requirements from official notices.',
    tool: 'exam-photo-resizer',
    related: ['how-to-resize-an-image', 'how-to-compress-an-image', 'how-to-crop-an-image'],
    updated: '2026-11-12',
    intro:
      'To resize a photo for an exam form, pick your exam and the document in the Exam photo and signature resizer, drop your picture and press Make my file. You get a JPG at the exact pixel size and inside the allowed KB range.',
    steps: [
      'Open the Exam photo and signature resizer and choose your exam and the document, such as Photograph or Signature.',
      'Check the requirements shown. Each has a link to the official notice and the date we read it.',
      'Drop your photo or scan. HEIC photos from an iPhone work too.',
      'Press Make my file, check the size in the list and download the JPG.',
    ],
    sections: [
      {
        h: 'Which exams are covered',
        p: [
          'Today the tool has IBPS PO/MT (photograph, signature, left thumb impression and handwritten declaration) and the SSC CGL 2026 signature. Every number comes from an official notice, and each preset shows its source and when we read it.',
          'If your exam is not listed, choose Other exam and type the width, height and KB limits from your own notice.',
        ],
      },
      {
        h: 'Always check your own notice',
        p: [
          'Exam rules change between cycles, so compare the numbers with your current notification before you upload. The tool is only as current as the notice it was read from.',
          'The picture is cut or padded to the exact pixel size, then saved at the best quality that fits under the maximum. If a simple picture comes out under the minimum, harmless filler data is added to the file so it reaches it. The picture itself is not changed.',
        ],
      },
    ],
    faq: [
      { q: 'Are the sizes official?', a: 'Yes, they are copied from official notices, and each preset links to the document and says when we read it. Check the notice for your own cycle too.' },
      { q: 'What if my exam is not listed?', a: 'Choose Other exam and enter the pixel size and KB range from your notice.' },
      { q: 'Is my photo uploaded?', a: 'No. It is resized in your browser and never leaves your device.' },
    ],
  },
  {
    slug: 'how-to-convert-images-between-jpg-png-webp-and-heic',
    title: 'How to convert images between JPG, PNG, WebP and HEIC',
    seoTitle: 'How to Convert Images: JPG, PNG, WebP, HEIC to PDF (Free)',
    description: 'Open iPhone HEIC photos, switch between JPG, PNG and WebP, or make a PDF. Converts in your browser with no upload and no sign-up.',
    tool: 'convert-image',
    related: ['how-to-compress-an-image', 'how-to-combine-images-into-one-pdf', 'how-to-turn-a-photo-into-pixel-art'],
    updated: '2026-11-12',
    intro:
      'To convert an image, drop it into the Convert images tool, choose JPG, PNG, WebP or PDF as the format and press Convert. HEIC photos from an iPhone, and AVIF, SVG, GIF and BMP files, open as input too.',
    steps: [
      'Open the Convert images tool and drop in your files. You can add many at once.',
      'Choose the output format: JPG, PNG, WebP or PDF.',
      'Press Convert.',
      'Download each file, or all of them in one ZIP.',
    ],
    sections: [
      {
        h: 'Which format to choose',
        p: [
          'JPG is the safe choice for photos and opens everywhere, including upload forms. PNG keeps sharp edges and see-through backgrounds, so it suits logos and screenshots. WebP is usually smaller than both and works in every current browser.',
          'JPG cannot be see-through, so a transparent area is filled with white when you convert to JPG.',
        ],
      },
      {
        h: 'HEIC, AVIF, SVG, GIF and BMP',
        p: [
          'iPhones save photos as HEIC, which many apps and sites cannot open. Convert to JPG and it works everywhere. The first HEIC file loads a decoder of about 2 MB, so it can take a moment to start. HEIC is for input only.',
          'A GIF keeps only its first frame, an SVG is drawn at least 1024 pixels on its longer side, and AVIF needs a browser that can open it. These are turned into a PNG first, in your browser.',
        ],
      },
    ],
    faq: [
      { q: 'How do I convert HEIC to JPG?', a: 'Drop the HEIC file into the tool, leave the format on JPG and press Convert. It works in your browser.' },
      { q: 'Does converting lose quality?', a: 'PNG is lossless. JPG and WebP are lossy but saved at high quality, so the change is hard to see on a photo.' },
      { q: 'Can I make a PDF?', a: 'Yes, choose PDF to get one PDF per image. To put several images in a single PDF, use Combine images into one PDF.' },
    ],
  },
  {
    slug: 'how-to-combine-images-into-one-pdf',
    title: 'How to combine images into one PDF',
    seoTitle: 'How to Combine Images into One PDF (Free, Reorder Pages)',
    description: 'Put several JPG, PNG or WebP images into a single PDF, choose the page order and A4 or image-size pages. Runs in your browser.',
    tool: 'image-to-pdf',
    related: ['how-to-convert-images-between-jpg-png-webp-and-heic', 'how-to-merge-images-side-by-side', 'how-to-compress-an-image'],
    updated: '2026-11-12',
    intro:
      'To combine images into one PDF, drop them into the Combine images into PDF tool, put them in order with Up and Down, choose the page style and press Create PDF. Each image becomes one page.',
    steps: [
      'Open the Combine images into PDF tool and drop in your images. You can add more at any time.',
      'Put them in the order you want with Up and Down, and remove any you do not need.',
      'Choose A4 with margins, or pages that match each image.',
      'Press Create PDF and download the file.',
    ],
    sections: [
      {
        h: 'A4 pages or image-sized pages',
        p: [
          'A4 with margins is best when you will print the PDF or send it as a document, because every page is the same size. Pages that match each image are better when the pictures are different shapes and you want no white space.',
          'Pictures are not stretched. They are scaled to fit the page and centred.',
        ],
      },
      {
        h: 'Keeping the PDF small',
        p: [
          'The PDF is only as small as the pictures put into it. If it is too big to email, compress the images first, then combine them.',
          'A transparent area shows as white on the page. If you want one separate PDF per image instead of one for all, use the Convert images tool with PDF as the format.',
        ],
      },
      {
        h: 'Tips for a tidy PDF',
        p: [
          'Rotate sideways photos first with the Rotate and flip tool, so every page is upright. It is much easier to fix the pictures than to fix the pages afterwards.',
          'Name your files so they sort in order, then check the order in the list before you press Create PDF. The pages follow the list from top to bottom.',
        ],
      },
    ],
    faq: [
      { q: 'Can I change the page order?', a: 'Yes. Use Up and Down next to each image, and remove the ones you do not need.' },
      { q: 'Does it work with iPhone photos?', a: 'Yes. HEIC photos open as input and are put into the PDF.' },
      { q: 'Are my images uploaded?', a: 'No. The PDF is made in your browser and never leaves your device.' },
    ],
  },
];
