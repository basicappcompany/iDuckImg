/**
 * Per-conversion copy for the format landing pages ("heic to jpg", "png to webp"...). Each entry is written for
 * its own pair: what the two formats are and where they come from, what really changes in this conversion,
 * and when to choose the result or not. Do not paste one paragraph into several pages (a unit test also
 * checks that no two pages share a title, description, summary or section text).
 *
 * The size examples marked "measured" come from running this site's own converter in a real browser on one
 * real 1920 x 1200 photograph (checked 2026-11-14): a JPG of 207.8 KB, a PNG of 1,464.7 KB, a WebP of 73.9 KB,
 * a BMP of 6,750 KB and a 256-color GIF of 700.4 KB, all made from the same picture. Other pictures give
 * other numbers, and the copy says so. Formats we could not measure (HEIC, AVIF, SVG) have no invented figures.
 */
import type { LandingFaq } from './landing';

export interface RichSection {
  h: string;
  paragraphs: string[];
}

export interface RichCopy {
  title: string;
  description: string;
  summary: string;
  quick: string;
  steps: string[];
  sections: RichSection[];
  moreFaqs: LandingFaq[];
}

const SAMPLE = 'In our own test, one 1920 x 1200 photograph';

export const RICH: Record<string, RichCopy> = {
  'heic-to-jpg': {
    title: 'HEIC to JPG: open iPhone photos anywhere',
    description: 'Change iPhone HEIC photos into JPG so Windows, forms and websites accept them. Free, in your browser, nothing uploaded, no watermark.',
    summary: 'Make iPhone photos open on any computer, form or website.',
    quick: 'To convert HEIC to JPG, drop your iPhone photos in and press Convert: the output is already JPG at quality 90, the format every upload form accepts. The work happens in your browser, so the photos are never uploaded.',
    steps: [
      'Drop your HEIC or HEIF photos, or tap to pick them from your gallery. Many at once is fine.',
      'Leave the format on JPG. Lower the quality only if the files must be smaller.',
      'Press Convert. The HEIC decoder is downloaded the first time you do this, then it runs on your device.',
      'Download each JPG, or all of them in one ZIP.',
    ],
    sections: [
      {
        h: 'What HEIC and JPG are',
        paragraphs: [
          'HEIC is the photo format that iPhones have saved by default since iOS 11 in 2017. It is the HEIC flavor of HEIF, the High Efficiency Image File Format standardized by the MPEG group, and it uses video-style compression to keep files small.',
          'JPG was standardized in 1992 by the Joint Photographic Experts Group. It is older and less efficient, but every camera, browser, editor and upload form can open it.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The picture is decoded from HEIC and saved again as JPG, which is lossy: a small amount of fine detail is traded for size. At the default quality of 90 the difference is not visible in normal photos.',
          'Expect the JPG to be larger than the HEIC, because HEIC compresses better. A Live Photo becomes one still picture. Keep your original HEIC if you want the smallest file or the most editing headroom.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG when you are uploading to a form, emailing to someone on Windows, or posting to a site that rejects HEIC. Do not convert if you only want to back up or edit on an Apple device: HEIC keeps more quality per megabyte there.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Will the JPG be bigger than my HEIC?', a: 'Usually yes. HEIC compresses more efficiently, so the same picture takes more space as JPG. Lower the quality in the options, or use Compress image to 100 KB if a form sets a limit.' },
      { q: 'Does it work on Android or Windows?', a: 'Yes. It runs in any current browser, so you can convert HEIC photos that were sent to a Windows PC or an Android phone.' },
    ],
  },
  'heic-to-png': {
    title: 'HEIC to PNG: lossless copy of an iPhone photo',
    description: 'Turn iPhone HEIC photos into PNG for editing or exact copies. Runs free in your browser, no upload, no sign-up and no watermark added.',
    summary: 'Save an iPhone photo with no further quality loss.',
    quick: 'To convert HEIC to PNG, drop your photos in and press Convert: the output is already PNG, which keeps every pixel as decoded. It is much bigger than JPG, and everything happens in your browser, so nothing is uploaded.',
    steps: [
      'Drop your HEIC photos, or tap to choose them.',
      'The format is already PNG. Nothing else needs setting, because PNG has no quality slider.',
      'Press Convert and expect the files to be several times bigger than the originals.',
      'Download one by one, or as a ZIP.',
    ],
    sections: [
      {
        h: 'What HEIC and PNG are',
        paragraphs: [
          'HEIC is Apple\'s default photo format on iPhones since 2017, a compact format from the MPEG group that is hard to open on many non-Apple systems. PNG is the lossless format that became a W3C Recommendation in 1996, designed as a free replacement for GIF.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The HEIC picture is decoded and written as PNG with no new loss. That does not undo the loss HEIC already made when the phone saved the photo, and the file grows a lot, since PNG stores every pixel without lossy compression. A Live Photo becomes one still frame.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Pick PNG when you will edit the photo again and do not want another round of JPG loss, or when a tool asks for PNG. For sharing, emailing or uploading, JPG is the better choice: see HEIC to JPG.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Does PNG make my iPhone photo sharper?', a: 'No. PNG copies exactly what the HEIC decoder produces. It cannot restore detail that was already compressed away.' },
      { q: 'Can I get a transparent background from a photo?', a: 'Not by converting. A normal photo has no transparent areas. Removing a background needs a separate tool, which is on our roadmap.' },
    ],
  },
  'png-to-jpg': {
    title: 'PNG to JPG: make big PNG files much smaller',
    description: 'Convert PNG to JPG to shrink photos and screenshots. See what happens to transparency, with a measured size example. Free, in your browser.',
    summary: 'Shrink a PNG photo, and know what happens to transparency.',
    quick: 'To convert PNG to JPG, drop your PNG files in and press Convert: the output is already JPG at quality 90. Transparent areas turn white, and a photo usually gets several times smaller. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your PNG files, or tap to choose them.',
      'Leave the format on JPG. Lower the quality if you need a smaller file.',
      'Press Convert. Any see-through area is filled with white.',
      'Check the sizes in the list, then download one by one or as a ZIP.',
    ],
    sections: [
      {
        h: 'What PNG and JPG are',
        paragraphs: [
          'PNG was designed in the mid-1990s as a free replacement for GIF and became a W3C Recommendation in 1996. It is lossless and supports full transparency. JPG, standardized in 1992, is lossy and built for photographs.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'Transparency is lost: JPG cannot store it, so see-through areas become white. The picture is also compressed with loss. The gain is size. ' + SAMPLE + ' went from a 1,465 KB PNG to a 260 KB JPG, about 5.6 times smaller, at the default quality.',
          'Flat graphics and screenshots with small text change less in size and can show slight blur around letters.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG for photographs, and when a form has a size limit. Keep the PNG for logos, icons, screenshots of text and anything with a transparent background.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Why does my logo have a white box after converting?', a: 'The logo had a transparent background, and JPG fills transparent areas with white. Keep it as PNG, or place it on a color that matches the page.' },
      { q: 'How much smaller will the JPG be?', a: 'It depends on the picture. For the photograph we tested the JPG was about 5.6 times smaller, but a simple graphic with flat colors can change much less.' },
    ],
  },
  'jpg-to-png': {
    title: 'JPG to PNG: lossless copy for editing or forms',
    description: 'Convert JPG to PNG when a site or program asks for PNG. See the real size change and what PNG cannot fix. Free, in your browser, no upload.',
    summary: 'Get a PNG from a JPG, and see why the file grows.',
    quick: 'To convert JPG to PNG, drop your JPG files in and press Convert: the output is already PNG, which stops further quality loss but makes the file much bigger. Nothing is uploaded, because it all runs in your browser.',
    steps: [
      'Drop your JPG files, or tap to choose them.',
      'The format is already PNG, and PNG has no quality setting to adjust.',
      'Press Convert and expect a much larger file.',
      'Download the PNG files one by one, or as a ZIP.',
    ],
    sections: [
      {
        h: 'What JPG and PNG are',
        paragraphs: [
          'JPG (JPEG, 1992) is the lossy photo format from the Joint Photographic Experts Group. PNG (W3C Recommendation, 1996) is lossless, supports transparency and was made as a patent-free alternative to GIF.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          SAMPLE + ' grew from a 208 KB JPG to a 1,850 KB PNG, about 8.9 times larger, with the same 1920 x 1200 pixels. The PNG shows exactly the JPG\'s pixels, including its compression artifacts, so it does not look better.',
          'The PNG has no transparent areas, because the JPG had none.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Choose PNG when a program or website only accepts PNG, or when you will edit and save the picture many times and want to stop adding JPG loss. Do not choose it to make a photo smaller or sharper: it does neither.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Can I make the background transparent here?', a: 'No. Converting does not remove a background. The PNG has the same opaque pixels as the JPG.' },
      { q: 'Is there a way to keep the PNG small?', a: 'Use Compress image on the PNG afterwards, or choose WebP instead, which is far smaller than PNG for photos.' },
    ],
  },
  'webp-to-jpg': {
    title: 'WebP to JPG: fix pictures a form will not take',
    description: 'Turn WebP images saved from websites into JPG that any editor or upload form accepts. Notes on transparency. Free, in your browser.',
    summary: 'Make a downloaded WebP picture usable everywhere.',
    quick: 'To convert WebP to JPG, drop your WebP files in and press Convert: the output is already JPG at quality 90, which every editor and form accepts. See-through areas become white, and nothing is uploaded from your browser.',
    steps: [
      'Drop your WebP files, or tap to choose them.',
      'Leave the format on JPG, and lower the quality only if you need smaller files.',
      'Press Convert. Transparent parts turn white.',
      'Download each JPG, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What WebP and JPG are',
        paragraphs: [
          'Google released WebP in 2010. It can be lossy or lossless, supports transparency and animation, and is usually smaller than JPG. Every current browser shows it. JPG, from 1992, is older but is accepted by practically all software.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The picture is decoded and saved as JPG, which means transparency is lost (white fills it in) and the file usually grows, because WebP is the more efficient format. ' + SAMPLE + ' went from a 74 KB WebP to a 248 KB JPG, about 3.4 times larger.',
          'An animated WebP becomes one still picture.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG when the place you are sending the picture rejects WebP: older editors, printers, some job and exam portals. Keep WebP for your own website, where the smaller file helps pages load faster.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Why is the JPG bigger than the WebP?', a: 'WebP compresses photographs more efficiently, so the same picture takes more space as JPG. That trade is what makes the file widely accepted.' },
      { q: 'Does an animated WebP stay animated?', a: 'No. JPG cannot animate, so you get a single still picture.' },
    ],
  },
  'webp-to-png': {
    title: 'WebP to PNG: keep transparency, open anywhere',
    description: 'Convert WebP to PNG to keep a transparent background and open files in any editor. Real size example included. Free, in your browser, no upload.',
    summary: 'Keep the transparent background of a WebP in a format all editors open.',
    quick: 'To convert WebP to PNG, drop your WebP files in and press Convert: the output is already PNG, which keeps transparency but is far bigger than WebP. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your WebP files, or tap to choose them.',
      'The format is already PNG, so there is no quality setting.',
      'Press Convert and expect a larger file.',
      'Download the PNG files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What WebP and PNG are',
        paragraphs: [
          'WebP is Google\'s 2010 image format, efficient and able to keep transparency. PNG, a W3C Recommendation since 1996, is the long-established lossless format with transparency that every editor reads.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'Transparency is kept. The size is not: PNG stores pixels without lossy compression, so ' + SAMPLE.replace('In our own test, ', 'in our own test, ') + ' went from a 74 KB WebP to a 1,674 KB PNG, about 23 times larger. A lossy WebP also does not gain detail by becoming a PNG.',
          'An animated WebP becomes a single still frame.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Choose PNG for logos, stickers and graphics that need a clear background and must open in older tools. For ordinary photos use JPG, which is far smaller than PNG.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Why is the PNG so much larger than the WebP?', a: 'WebP is a modern, efficient format. PNG does not use lossy compression, so it stores much more data for a photograph.' },
      { q: 'Can I get a smaller PNG?', a: 'Run Compress image on it, or choose JPG if it is a photo without transparency.' },
    ],
  },
  'jpg-to-webp': {
    title: 'JPG to WebP: smaller images for your website',
    description: 'Convert JPG to WebP to cut file size for faster web pages. Measured example, browser support and when to keep the JPG. Free, no upload.',
    summary: 'Make web images smaller without changing their size in pixels.',
    quick: 'To convert JPG to WebP, drop your JPG files in and press Convert: the output is already WebP, which is usually clearly smaller at a similar look. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your JPG files, or tap to choose them.',
      'The format is already WebP. Adjust the quality only if you want a smaller or sharper result.',
      'Press Convert and compare the sizes in the list.',
      'Download the WebP files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What JPG and WebP are',
        paragraphs: [
          'JPG is the 1992 photo standard from the Joint Photographic Experts Group. WebP is Google\'s 2010 format built to make web images smaller, and every current browser supports it.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          SAMPLE + ' went from a 208 KB JPG to a 122 KB WebP, about 42 percent smaller, with the same 1920 x 1200 pixels. Both formats are lossy, so a second round of compression can cost a little detail.',
          'WebP can also keep transparency and animation, which JPG cannot, though a plain JPG has neither to carry over.',
        ],
      },
      {
        h: 'When to choose WebP, and when not to',
        paragraphs: [
          'Choose WebP for pictures on your own website, where smaller files load faster. Keep the JPG for emailing, printing, job and exam forms and any older software, which may still reject WebP.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Does converting JPG to WebP lose quality?', a: 'A little, because both are lossy and the picture is compressed again. At the default quality the difference is hard to see, but keep your original JPG.' },
      { q: 'Will every device show my WebP?', a: 'Every current browser does. Some older programs, printers and upload forms still only accept JPG or PNG.' },
    ],
  },
  'png-to-webp': {
    title: 'PNG to WebP: shrink PNG files and keep clear areas',
    description: 'Convert PNG to WebP to cut file size a lot and keep transparency. Measured size example and when to keep the PNG. Free, in your browser.',
    summary: 'Cut a PNG down to a fraction of its size, transparency included.',
    quick: 'To convert PNG to WebP, drop your PNG files in and press Convert: the output is already WebP, which is usually far smaller and keeps transparent areas. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your PNG files, or tap to choose them.',
      'The format is already WebP. Change the quality if you want it smaller or sharper.',
      'Press Convert and check the saving in the list.',
      'Download the WebP files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What PNG and WebP are',
        paragraphs: [
          'PNG (W3C Recommendation, 1996) is lossless with transparency. WebP (Google, 2010) offers lossy and lossless modes plus transparency, usually in smaller files.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          SAMPLE + ' went from a 1,465 KB PNG to a 118 KB WebP, about 92 percent smaller. Here WebP is saved in its lossy mode, so it is not a pixel-exact copy. Transparency carries over.',
          'Flat graphics with few colors shrink less than photographs do.',
        ],
      },
      {
        h: 'When to choose WebP, and when not to',
        paragraphs: [
          'Choose WebP for website images, sprites and logos where size matters. Keep the PNG for an exact master copy, for pixel art and for software that does not read WebP.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Is the WebP an exact copy of my PNG?', a: 'No. This tool saves lossy WebP, which trades a little detail for size. Keep the PNG if you need exact pixels.' },
      { q: 'Will it work in older programs?', a: 'Current browsers show WebP, but some editors, printers and forms do not. Keep the PNG for those.' },
    ],
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF: send a photo or scan as a PDF',
    description: 'Turn a JPG photo or scan into a PDF page the same size as the picture. Real size example and how to join many. Free, no upload.',
    summary: 'Put a photo or scan into a PDF a form will accept.',
    quick: 'To convert JPG to PDF, drop your JPG files in and press Convert: each picture becomes its own PDF page at its full pixel size. The PDF is built in your browser, so the picture is never uploaded.',
    steps: [
      'Drop your JPG files, or tap to choose them.',
      'The output is already PDF, with one page per picture.',
      'Press Convert.',
      'Download the PDFs. To get many pictures into one PDF instead, use Combine images into PDF.',
    ],
    sections: [
      {
        h: 'What JPG and PDF are',
        paragraphs: [
          'JPG is the 1992 photographic image format. PDF was created by Adobe in 1993 and became the ISO 32000 standard in 2008. It is meant for documents that must look the same on every device.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The picture is placed on a PDF page the same size as the image and saved at high quality, so it looks the same to the eye. The file grows a little: ' + SAMPLE.replace('In our own test, ', 'in our own test, ') + ' went from 208 KB as JPG to 277 KB as PDF. The text inside a photographed document is still a picture, so it cannot be selected or searched.',
        ],
      },
      {
        h: 'When to choose PDF, and when not to',
        paragraphs: [
          'Choose PDF when a portal wants a document, for emailing a scan, or for printing. Keep the JPG when the form asks for an image file.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Can I select the text in the PDF?', a: 'No. The page is a picture of the document. Text recognition (OCR) would be needed to make it selectable.' },
      { q: 'Why is the PDF bigger than my JPG?', a: 'The PDF stores the picture and the page structure around it, so it is somewhat larger than the plain JPG.' },
    ],
  },
  'png-to-pdf': {
    title: 'PNG to PDF: turn screenshots into PDF pages',
    description: 'Convert PNG screenshots and images to PDF pages. Learn what happens to transparency and file size. Free, in your browser, no upload.',
    summary: 'Turn PNG screenshots and graphics into PDF pages.',
    quick: 'To convert PNG to PDF, drop your PNG files in and press Convert: each image becomes a PDF page the size of the picture, and transparent areas show white. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your PNG files, or tap to choose them.',
      'The output is already PDF, one page per image.',
      'Press Convert.',
      'Download the PDFs, or use Combine images into PDF for a single multi-page file.',
    ],
    sections: [
      {
        h: 'What PNG and PDF are',
        paragraphs: [
          'PNG is the lossless image format that became a W3C Recommendation in 1996. PDF, created by Adobe in 1993 and an ISO standard since 2008, is the format for documents that look the same everywhere.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The page is white, so a see-through area of the PNG shows as white. ' + SAMPLE.replace('In our own test, ', 'in our own test, ') + ' went from a 1,465 KB PNG to a 2,104 KB PDF, about 44 percent larger, because the picture is stored at full size inside the page.',
        ],
      },
      {
        h: 'When to choose PDF, and when not to',
        paragraphs: [
          'Choose PDF to send or print screenshots, receipts and diagrams, or when a portal wants a document. If a portal has a size limit, convert a JPG instead, or compress the PNG first: see Compress image.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Does the PDF keep a transparent background?', a: 'No. PDF pages here are white, so transparent parts of the PNG appear white.' },
      { q: 'How do I make the PDF smaller?', a: 'Compress the PNG first, or convert it to JPG and then to PDF. A JPG-based PDF is much smaller for photographs.' },
    ],
  },
  'avif-to-jpg': {
    title: 'AVIF to JPG: open modern pictures in old software',
    description: 'Convert AVIF to JPG for editors and upload forms that reject AVIF. Browser support explained. Free, in your browser, nothing uploaded.',
    summary: 'Make an AVIF picture work in editors and forms that reject it.',
    quick: 'To convert AVIF to JPG, drop your AVIF files in and press Convert: the output is already JPG at quality 90. Your browser reads the AVIF, so a current Chrome, Edge, Firefox or Safari is needed. Nothing is uploaded.',
    steps: [
      'Drop your AVIF files, or tap to choose them. Your browser must be able to open AVIF.',
      'Leave the format on JPG.',
      'Press Convert. Transparent parts turn white.',
      'Download the JPG files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What AVIF and JPG are',
        paragraphs: [
          'AVIF is the still-image format of the AV1 video codec, from the Alliance for Open Media (specification 2019). It makes very small files. Chrome has shown it since 2020, Firefox since 2021 and Safari since version 16.4 in 2023. JPG is the 1992 format that everything opens.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The AVIF is decoded by your browser and saved as JPG. Transparency is lost (white fills it) and, because AVIF compresses better, the JPG is normally larger. Both are lossy, so a little fine detail can be lost.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG when an editor, printer or form cannot open AVIF. If you are publishing to your own website, AVIF or WebP will give smaller files.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Which browsers can open AVIF?', a: 'Current Chrome and Edge, Firefox 93 or later, and Safari 16.4 or later. If yours cannot, this page says so instead of failing silently.' },
      { q: 'Why is my JPG bigger than the AVIF?', a: 'AVIF is one of the most efficient formats, so the same picture takes more space as JPG.' },
    ],
  },
  'avif-to-png': {
    title: 'AVIF to PNG: keep transparency, open anywhere',
    description: 'Convert AVIF to PNG to keep a transparent background and use the picture in any program. Notes on size. Free, in your browser.',
    summary: 'Keep an AVIF logo or sticker transparent in a format all programs open.',
    quick: 'To convert AVIF to PNG, drop your AVIF files in and press Convert: the output is already PNG, which keeps transparent areas but is much bigger than AVIF. Your browser reads the AVIF, and nothing is uploaded.',
    steps: [
      'Drop your AVIF files, or tap to choose them.',
      'The output is already PNG, with no quality setting.',
      'Press Convert and expect a much larger file.',
      'Download the PNG files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What AVIF and PNG are',
        paragraphs: [
          'AVIF is the AV1-based image format from the Alliance for Open Media (2019), known for very small files and now supported by current browsers. PNG is the lossless 1996 format that every program opens and that supports transparency.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The AVIF is decoded by your browser and written as PNG. Transparency is kept. The PNG is lossless from that point but cannot restore detail AVIF already dropped, and it is much larger. We did not measure an AVIF example, so no figure is given here.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Choose PNG for logos, icons and stickers that need a clear background, or when software only accepts PNG. For photographs with no transparency, JPG will be far smaller.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Does the PNG look better than the AVIF?', a: 'No. It shows what the AVIF showed. PNG just stores those pixels without more loss.' },
      { q: 'What if my browser cannot read AVIF?', a: 'Update it or try another current browser. This page will tell you when the file cannot be opened.' },
    ],
  },
  'svg-to-png': {
    title: 'SVG to PNG: a sharp picture at a useful size',
    description: 'Turn an SVG drawing into a PNG with a transparent background, drawn sharp at 1024 to 4096 pixels. Free, safe, in your browser.',
    summary: 'Turn a vector drawing into a normal picture, background kept clear.',
    quick: 'To convert SVG to PNG, drop your SVG files in and press Convert: each is drawn at least 1024 pixels on its longer side and saved as a PNG with its transparent background. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your SVG files, or tap to choose them.',
      'The output is already PNG. The drawing is rendered at 1024 to 4096 pixels on its longer side.',
      'Press Convert.',
      'Download the PNG files. For an exact pixel size, open Resize images next.',
    ],
    sections: [
      {
        h: 'What SVG and PNG are',
        paragraphs: [
          'SVG is a vector format from the W3C (a Recommendation since 2001). It is text describing shapes, so it stays sharp at any size. PNG is a pixel format with transparency, a W3C Recommendation since 1996, that every site and program accepts.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'A drawing becomes a fixed grid of pixels, so it is no longer infinitely sharp: it is drawn at its own proportions with the longer side at least 1024 pixels (at most 4096). Transparent areas stay transparent. Scripts in the SVG do not run, and nothing is fetched from other sites. Fonts that are not stored inside the file may be drawn in a plain fallback font.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Choose PNG when a site, document or social network will not take SVG. Keep the SVG for your own website, printing at large sizes and any editing, since it scales without blur.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Are scripts inside an SVG run?', a: 'No. The SVG is drawn like a picture through an image element, so scripts do not run and nothing is loaded from other sites.' },
      { q: 'Why does the text look different from my design?', a: 'If the SVG uses a font that is not embedded in the file, the browser falls back to a plain font. Convert the text to outlines in your drawing program first.' },
    ],
  },
  'svg-to-jpg': {
    title: 'SVG to JPG: a small picture from a vector drawing',
    description: 'Convert an SVG drawing to a JPG with a white background. Drawn sharp at 1024 to 4096 pixels, safe and private. Free, in your browser.',
    summary: 'Turn a vector drawing into a small, universal JPG.',
    quick: 'To convert SVG to JPG, drop your SVG files in and press Convert: each is drawn at least 1024 pixels on its longer side, saved as JPG at quality 90, and any see-through area turns white. Nothing is uploaded.',
    steps: [
      'Drop your SVG files, or tap to choose them.',
      'The output is already JPG at 1024 to 4096 pixels on the longer side.',
      'Press Convert. Transparent parts become white.',
      'Download the JPG files, or open Resize images to reach a specific size in KB.',
    ],
    sections: [
      {
        h: 'What SVG and JPG are',
        paragraphs: [
          'SVG, a W3C Recommendation since 2001, is a text-based vector format made of shapes that scales without blur. JPG, from 1992, is a lossy pixel format designed for photographs.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'The drawing is turned into pixels and compressed with loss, so sharp edges can show faint blur and the background is white where the SVG was transparent. The result is a small file that any form, email or app accepts.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG for photographs of a design or when a size limit applies. For logos and graphics with clean edges or a transparent background, SVG to PNG gives a better result.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Why is the background white?', a: 'JPG cannot be transparent, so clear parts of the SVG are filled with white.' },
      { q: 'Can I make it exactly 20 KB?', a: 'Convert here first, then use Compress image to 20 KB. Drawings with large flat areas shrink easily.' },
    ],
  },
  'bmp-to-jpg': {
    title: 'BMP to JPG: cut a huge BMP down to size',
    description: 'Convert BMP to JPG and shrink old Windows bitmaps by about 96 percent in our test. Free, in your browser, with nothing uploaded.',
    summary: 'Shrink an uncompressed Windows bitmap to a normal photo file.',
    quick: 'To convert BMP to JPG, drop your BMP files in and press Convert: the output is already JPG at quality 90, usually a tiny fraction of the BMP size. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your BMP files, or tap to choose them.',
      'Leave the format on JPG.',
      'Press Convert and compare the sizes in the list.',
      'Download the JPG files, or all of them in a ZIP.',
    ],
    sections: [
      {
        h: 'What BMP and JPG are',
        paragraphs: [
          'BMP is the bitmap format of Microsoft Windows, from its earliest versions. It stores every pixel with no compression, which is why the files are so large. JPG (1992) compresses photographs with a small loss of detail.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          SAMPLE + ' went from a 6,750 KB BMP (6.6 MB) to a 260 KB JPG, about 96 percent smaller. Because JPG is lossy, tiny details can change, and transparent parts (rare in BMP) become white.',
        ],
      },
      {
        h: 'When to choose JPG, and when not to',
        paragraphs: [
          'Choose JPG for photographs, email and uploads. Choose PNG instead if the picture is a screenshot or drawing with sharp text, since PNG is also lossless but far smaller than BMP.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Why are BMP files so big?', a: 'BMP stores each pixel in full without compression. A 1920 x 1200 picture takes about 6.6 MB that way.' },
      { q: 'Should I use PNG instead of JPG?', a: 'For screenshots and graphics with sharp edges, yes. PNG is lossless and much smaller than BMP. JPG is better for photographs.' },
    ],
  },
  'gif-to-png': {
    title: 'GIF to PNG: a still frame with a clear background',
    description: 'Convert a GIF to a PNG still. Only the first frame is kept; transparency is preserved. Measured size example. Free, in your browser.',
    summary: 'Save the first frame of a GIF as a still PNG.',
    quick: 'To convert GIF to PNG, drop your GIF files in and press Convert: only the first frame is saved, as a PNG that keeps transparent areas, and the animation is lost. It runs in your browser, so nothing is uploaded.',
    steps: [
      'Drop your GIF files, or tap to choose them.',
      'The output is already PNG, made from the first frame.',
      'Press Convert.',
      'Download the PNG files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What GIF and PNG are',
        paragraphs: [
          'GIF was introduced by CompuServe in 1987. It is limited to 256 colors and supports simple on-or-off transparency and animation. PNG, a W3C Recommendation since 1996, was created as a free replacement and supports millions of colors and smooth transparency.',
        ],
      },
      {
        h: 'What changes in this conversion',
        paragraphs: [
          'Animation is lost: only the first frame becomes the PNG. Colors and transparency are kept exactly. The PNG can be larger than the GIF, because GIF uses a compact palette. ' + SAMPLE.replace('In our own test, ', 'in our own test, ') + ' saved as a 256-color GIF of 700 KB became a PNG of 1,444 KB, about 2.1 times larger.',
        ],
      },
      {
        h: 'When to choose PNG, and when not to',
        paragraphs: [
          'Choose PNG when you want a still image of a GIF for a document, a thumbnail or editing. Keep the GIF if you need the animation, and look for a video format if the GIF is large.',
        ],
      },
    ],
    moreFaqs: [
      { q: 'Can I get every frame of an animated GIF?', a: 'Not with this page: it saves the first frame only. A GIF-to-frames tool is on our roadmap.' },
      { q: 'Why is the PNG bigger than the GIF?', a: 'A GIF stores a palette of at most 256 colors, which is compact for simple graphics. A PNG of the same picture can be larger, especially for photographs.' },
    ],
  },
};
