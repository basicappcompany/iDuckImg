import type { Guide } from './guides';

/** Guides 10 to 18. */
export const GUIDES_B: Guide[] = [
  {
    slug: 'how-to-rotate-or-flip-an-image',
    title: 'How to rotate or flip an image',
    seoTitle: 'How to Rotate or Flip an Image Online (Free, No Upload)',
    description: 'Turn a picture 90, 180 or 270 degrees, or mirror it horizontally or vertically. Works on JPG, PNG and WebP, in your browser.',
    tool: 'rotate-image',
    related: ['how-to-crop-an-image', 'how-to-resize-an-image', 'how-to-adjust-the-colours-of-a-photo'],
    updated: '2026-11-12',
    intro:
      'To rotate an image, drop it into the Rotate and flip tool, press the rotate left or right button until the preview looks right, and press Apply. The same buttons mirror a picture horizontally or vertically.',
    steps: [
      'Open the Rotate and flip tool and drop in your JPG, PNG or WebP files.',
      'Use the buttons to rotate left or right, or to flip. The preview shows the result.',
      'Press Apply.',
      'Download each file, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'Rotate or flip: which one?',
        p: [
          'Rotating turns the whole picture by 90, 180 or 270 degrees, which fixes a photo that came out sideways or upside down. Flipping mirrors it, which is how you correct text that reads backwards from a selfie camera.',
          'You can combine both. Rotate first, then flip, and watch the preview until it looks right.',
        ],
      },
      {
        h: 'Many pictures at once',
        p: [
          'The same change is applied to every picture you add, so a whole batch of sideways photos can be fixed in one go. PNG stays lossless. JPG and WebP are saved again at high quality.',
          'Check the preview first: it shows the first picture only, so a batch should be pictures that need the same turn.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'If only some of your photos are sideways, rotate those in one batch and the rest in another. A batch gets exactly one change, so mixed pictures need separate runs.',
          'Keep your original files. Rotating by 90 degrees is reversible, but saving a JPG again always changes it very slightly, so it is better not to repeat it many times.',
        ],
      },
    ],
    faq: [
      { q: 'How do I rotate a photo that is sideways?', a: 'Drop it in, press rotate left or right until it is upright, then press Apply and download it.' },
      { q: 'What is the difference between rotate and flip?', a: 'Rotate turns the picture around. Flip mirrors it, like looking at it in a mirror.' },
      { q: 'Does rotating reduce quality?', a: 'PNG stays lossless. JPG and WebP are saved again at high quality, so any change is very small.' },
    ],
  },
  {
    slug: 'how-to-remove-location-and-exif-data-from-a-photo',
    title: 'How to remove location and EXIF data from a photo',
    seoTitle: 'How to Remove EXIF and GPS Location Data From a Photo',
    description: 'Strip the hidden location, date and camera details from a photo before you share it. Done in your browser, and the picture is not recompressed.',
    tool: 'remove-exif-data',
    related: ['how-to-blur-or-hide-part-of-an-image', 'are-online-image-tools-safe', 'how-to-compress-an-image'],
    updated: '2026-11-12',
    intro:
      'To remove EXIF data from a photo, drop it into the Remove EXIF data tool and press Remove metadata. The hidden GPS location, date and camera details are stripped, and the picture itself is not recompressed.',
    steps: [
      'Open the Remove EXIF data tool and drop in your JPG, PNG or WebP photos.',
      'Press Remove metadata.',
      'Download each cleaned file, or all of them as a ZIP.',
      'Optionally check the result: on Windows, right-click the file, choose Properties and open the Details tab.',
    ],
    sections: [
      {
        h: 'What is hidden in a photo',
        p: [
          'Phones and cameras write extra details into the file: the exact place it was taken, the date and time, and the device model. Anyone who gets the original file can read them, even if the picture itself shows nothing private.',
          'Many social sites strip some of this themselves, but not all do, and a photo sent by email or chat usually arrives unchanged. Cleaning it first is the safe habit.',
        ],
      },
      {
        h: 'What this does not hide',
        p: [
          'Removing metadata does not change what is in the picture. A street sign, a house number or a face is still visible. To hide part of the image itself, use the Blur or hide tool.',
          'Because JPG data is not recompressed, the picture looks exactly as before and the file is only slightly smaller.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Clean photos before you send them, not after. A picture you have already posted or emailed cannot be taken back, but the next one can be sent clean.',
          'Screenshots usually carry no location, so they are a safe way to share a picture of a screen. Photos from a phone camera are the ones worth cleaning, especially pictures taken at home.',
        ],
      },
    ],
    faq: [
      { q: 'What is EXIF data?', a: 'It is information stored inside a photo file: where it was taken, when, and with which device and settings.' },
      { q: 'Does removing EXIF change the picture?', a: 'No. The picture is not recompressed, so it looks exactly the same.' },
      { q: 'Is my photo uploaded?', a: 'No. The data is removed in your browser and the file never leaves your device.' },
    ],
  },
  {
    slug: 'how-to-make-a-round-profile-picture',
    title: 'How to make a round profile picture',
    seoTitle: 'How to Make a Round Profile Picture (Circle Crop, Free)',
    description: 'Crop any photo into a circle, or just round the corners, and save it as a PNG with see-through corners. Free, in your browser.',
    tool: 'circle-crop-image',
    related: ['how-to-crop-an-image', 'how-to-add-a-border-to-a-picture', 'how-to-resize-an-image'],
    updated: '2026-11-12',
    intro:
      'To make a round profile picture, drop a photo into the Circle crop tool, choose Circle and press Make it round. You get a PNG with see-through corners, which keeps the middle square of your photo.',
    steps: [
      'Open the Circle crop tool and drop in your picture.',
      'Choose Circle, or Rounded corners if you only want soft edges.',
      'Press Make it round.',
      'Download the PNG.',
    ],
    sections: [
      {
        h: 'Why the result is a PNG',
        p: [
          'A round picture needs see-through corners, and JPG cannot be see-through. PNG can, so the result is always a PNG. Put it on a colored background and it keeps its round shape.',
          'Most profile picture boxes crop to a circle for you. This tool is useful when you need the round image as a file itself.',
        ],
      },
      {
        h: 'Framing the face',
        p: [
          'A circle keeps the middle square of the photo. If the face is off to one side, crop the picture first so the face is in the middle, then make it round.',
          'The Crop images tool with the 1:1 shape does that in one step.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Start from a picture that is at least a few hundred pixels wide. A round image is often shown small, but sharp edges need enough pixels to start with.',
          'Leave some space around the face. A circle cuts off the corners, so a tight crop on the head can end up trimming the hair or chin.',
        ],
      },
    ],
    faq: [
      { q: 'Can I make a circular image with a transparent background?', a: 'Yes. The corners outside the circle are see-through in the PNG you download.' },
      { q: 'What if my photo is not square?', a: 'The circle uses the middle square of the picture. Crop first if you want a different part.' },
      { q: 'Is my picture uploaded?', a: 'No. It is processed in your browser and stays on your device.' },
    ],
  },
  {
    slug: 'how-to-split-an-image-into-a-grid',
    title: 'How to split an image into a grid of tiles',
    seoTitle: 'How to Split an Image Into a Grid (Instagram, Puzzles)',
    description: 'Cut a picture into equal rows and columns for a grid post or a puzzle, up to 10 by 10, and download the tiles as a ZIP. In your browser.',
    tool: 'split-image-into-grid',
    related: ['how-to-crop-an-image', 'how-to-merge-images-side-by-side', 'how-to-resize-an-image'],
    updated: '2026-11-12',
    intro:
      'To split an image into a grid, drop it into the Split into a grid tool, choose how many rows and columns you want and press the button. Every tile is saved as its own picture, and you can download them all in a ZIP.',
    steps: [
      'Open the Split into a grid tool and drop in your picture.',
      'Choose the number of rows and columns, up to 10 by 10.',
      'Press the split button.',
      'Download the tiles, or all of them in one ZIP.',
    ],
    sections: [
      {
        h: 'Grid posts and puzzles',
        p: [
          'For a social media grid, post the tiles in the right order so they join up on a profile. A 3 by 1 split gives a wide panorama in three posts, and 3 by 3 gives nine squares.',
          'Tiles are named by row and column, for example photo-r1-c2.jpg, so you can tell which piece goes where.',
        ],
      },
      {
        h: 'No pixels lost',
        p: [
          'Every pixel of the picture lands in exactly one tile, so the pieces fit back together with nothing missing or doubled. If the size does not divide evenly, tiles differ by at most one pixel.',
          'Tiles keep the picture format. Make the picture the shape you want first, because a tall picture gives tall tiles.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Crop the picture to the right shape first. A 3 by 3 grid looks best from a square picture, and a 3 by 1 panorama from a wide one with three times the width of its height.',
          'Upload the tiles in reverse order if the site shows the newest post first, so they join up correctly on the profile. Check the layout on your phone before you share it.',
        ],
      },
    ],
    faq: [
      { q: 'How do I split a photo for an Instagram grid?', a: 'Choose the rows and columns that match your grid, for example 3 by 3, then post the tiles in order.' },
      { q: 'How many tiles can I make?', a: 'Up to 10 rows and 10 columns.' },
      { q: 'How are the tiles named?', a: 'By row and column, such as name-r1-c1.jpg, so you can put them back in order.' },
    ],
  },
  {
    slug: 'how-to-add-text-to-a-picture',
    title: 'How to add text to a picture',
    seoTitle: 'How to Add Text to a Picture or Photo Online (Free)',
    description: 'Write a caption or title on a picture. Choose the position, size and color, with an optional panel behind the text. Done in your browser.',
    tool: 'add-text-to-image',
    related: ['how-to-add-a-watermark-to-a-photo', 'how-to-add-a-logo-to-a-photo', 'how-to-add-a-border-to-a-picture'],
    updated: '2026-11-12',
    intro:
      'To add text to a picture, drop it into the Add text tool, type up to five lines, pick where they go, set the size and color and press Add text. A dark or light panel behind the text keeps it readable on a busy photo.',
    steps: [
      'Open the Add text tool and drop in your picture.',
      'Type your text, up to five lines.',
      'Choose one of nine positions, the size and the color. Add a dark or light panel if the background is busy.',
      'Press Add text and download the result.',
    ],
    sections: [
      {
        h: 'Making text easy to read',
        p: [
          'Text on a photo is hard to read when the background has light and dark areas. The optional panel puts a solid band behind the words, which fixes that without changing the picture.',
          'The size is a share of the picture width, so a caption looks the same on a small picture and a large one.',
        ],
      },
      {
        h: 'Limits to know',
        p: [
          'You can add up to five lines of up to 60 characters. For longer text, make the picture bigger or use several pictures.',
          'The preview shows the first picture, and the same text goes on every picture you add.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Keep it short. Big, short text is readable on a phone, and the size scales with the picture, so a short title usually looks better than a long caption.',
          'Pick the color that contrasts most with the area behind the text, or turn on the panel. Check the preview at a small size, because that is how most people will see it.',
        ],
      },
    ],
    faq: [
      { q: 'How many lines can I add?', a: 'Up to five lines, each up to 60 characters.' },
      { q: 'Can I put text on many pictures?', a: 'Yes. The same text goes on every picture, and you can download them all together.' },
      { q: 'Is my picture uploaded?', a: 'No. The text is drawn in your browser.' },
    ],
  },
  {
    slug: 'how-to-turn-a-photo-into-pixel-art',
    title: 'How to turn a photo into pixel art',
    seoTitle: 'How to Turn a Photo Into Pixel Art (Free, In Your Browser)',
    description: 'Make chunky pixel art from any photo. Choose how big the pixels are and how many colors to keep. Saved as a PNG, no upload.',
    tool: 'pixel-art-maker',
    related: ['how-to-adjust-the-colours-of-a-photo', 'how-to-get-a-color-palette-from-an-image', 'how-to-blur-or-hide-part-of-an-image'],
    updated: '2026-11-12',
    intro:
      'To turn a photo into pixel art, drop it into the Pixel art maker, move the slider to choose how many big pixels go across and press Make pixel art. Fewer pixels across means chunkier art, and the result is a PNG.',
    steps: [
      'Open the Pixel art maker and drop in your pictures.',
      'Move the slider to set how many big pixels go across. Fewer is chunkier.',
      'Optionally choose Retro or Very few colors for a game-console look.',
      'Press Make pixel art and download the PNG.',
    ],
    sections: [
      {
        h: 'Finding the right chunkiness',
        p: [
          'Faces work best at about 32 to 64 pixels across. Landscapes look good with more. Each big pixel is the average color of a square block of the photo.',
          'The preview uses the same code as the saved file, so what you see is what you get.',
        ],
      },
      {
        h: 'Limiting the colors',
        p: [
          'Retro keeps six shades of each color and Very few keeps three, which gives a flat, game-like look. Keep the original colors if you want the pixels to still look like the photo.',
          'The result is a PNG at the same size as your picture, because JPG would blur the hard edges of each big pixel.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Start with a simple, high-contrast photo. A face against a plain background survives chunky pixels much better than a busy street scene.',
          'Try a few settings and compare. Going from 48 to 32 pixels across changes the look a lot, and Retro colors can turn a normal photo into something that looks like a game screen.',
        ],
      },
    ],
    faq: [
      { q: 'Why is the result a PNG?', a: 'A PNG keeps the sharp edges of each big pixel. A JPG would blur them.' },
      { q: 'How many pixels should I use for a face?', a: 'Around 32 to 64 across usually works well.' },
      { q: 'Does the picture keep its size?', a: 'Yes. The result is the same size as the original.' },
    ],
  },
  {
    slug: 'how-to-merge-images-side-by-side',
    title: 'How to merge images side by side or one above the other',
    seoTitle: 'How to Merge Images Side by Side or Stacked (Free)',
    description: 'Join two or more pictures into one, in a row or a column, with an optional gap and background. Saved as PNG, JPG or WebP. In your browser.',
    tool: 'merge-images',
    related: ['how-to-split-an-image-into-a-grid', 'how-to-combine-images-into-one-pdf', 'how-to-add-a-border-to-a-picture'],
    updated: '2026-11-12',
    intro:
      'To merge images, drop two or more into the Merge images tool, put them in order, choose side by side or stacked, and press Join pictures. They are scaled to a common height or width so nothing is stretched up.',
    steps: [
      'Open the Merge images tool and drop in two or more pictures.',
      'Put them in order with Up and Down, and remove any you do not want.',
      'Choose side by side or stacked, the gap between them and the background.',
      'Press Join pictures and download the result as PNG, JPG or WebP.',
    ],
    sections: [
      {
        h: 'Matching sizes',
        p: [
          'By default every picture is scaled to the smallest common height (for a row) or width (for a column), so no picture is blown up and made blurry. If you would rather keep every picture at its own size, choose that option and they are centered.',
          'A gap and a background color of white, black or transparent finish the look. Choose transparent with PNG or WebP.',
        ],
      },
      {
        h: 'Size limits',
        p: [
          'A result over 100 megapixels is refused with a clear message, because a phone could not hold it. Use fewer or smaller pictures in that case.',
          'Before and after photos work well as a row of two. A tall stack of screenshots works well as a column.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Crop your pictures to similar shapes first. Pictures with the same height line up neatly in a row, and the tool then has nothing to shrink.',
          'Use a small gap and a white background for a clean before and after. Use no gap for a seamless panorama made from pictures that were meant to join.',
        ],
      },
    ],
    faq: [
      { q: 'How do I put two photos side by side?', a: 'Drop both in, choose side by side and press Join pictures.' },
      { q: 'Will my pictures be stretched?', a: 'No. They are scaled to a common height or width, keeping their proportions.' },
      { q: 'Can I change the order?', a: 'Yes. Use Up and Down on each picture in the list.' },
    ],
  },
  {
    slug: 'how-to-blur-or-hide-part-of-an-image',
    title: 'How to blur or hide part of an image',
    seoTitle: 'How to Blur or Hide Part of an Image (Names, Numbers, Faces)',
    description: 'Drag boxes over a name, number or face and blur, pixelate or cover them. Runs in your browser, so the original never leaves your device.',
    tool: 'blur-image',
    related: ['how-to-remove-location-and-exif-data-from-a-photo', 'are-online-image-tools-safe', 'how-to-add-text-to-a-picture'],
    updated: '2026-11-12',
    intro:
      'To hide part of a picture, drop it into the Blur or hide tool, drag a box over the name, number or face, choose Blur, Pixelate or Cover and press the button. Cover is the safest choice for anything sensitive.',
    steps: [
      'Open the Blur or hide tool and drop in your picture.',
      'Drag a box over each area to hide. You can add as many as you need.',
      'Choose Blur, Pixelate or Cover with a solid color.',
      'Press the button and download the new picture.',
    ],
    sections: [
      {
        h: 'Blur, pixelate or cover?',
        p: [
          'A light blur can leave text partly readable, and a determined person can sometimes recover digits from a weak blur or pixelation. Cover paints a solid block, which leaves nothing to recover.',
          'Use Cover for card numbers, account numbers and anything private. Use blur for faces and backgrounds where looks matter more than security.',
        ],
      },
      {
        h: 'Precise boxes and many pictures',
        p: [
          'Every box also has number inputs for its position in percent, which works without a mouse and lets you nudge it exactly. The live preview uses the same code as the saved file.',
          'If you drop several pictures, the same boxes apply to all of them, which suits screenshots with the same layout. Your original files are never changed.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Make the box a little bigger than the thing you are hiding. Edges of letters and faces stick out, and a tight box can leave a sliver visible.',
          'After you save, open the new picture and zoom in. If you can still read or recognize anything, run it again with Cover. And remember that hidden location data is separate from what is visible, so clean that too.',
        ],
      },
    ],
    faq: [
      { q: 'Is a blur enough to hide a card number?', a: 'No. A light blur can be partly readable. Use Cover, which paints a solid block.' },
      { q: 'Can I hide several areas?', a: 'Yes. Add as many boxes as you need.' },
      { q: 'Is my picture uploaded?', a: 'No. The effect is applied in your browser and the original stays on your device.' },
    ],
  },
  {
    slug: 'how-to-convert-pixels-to-cm-and-inches',
    title: 'How to convert pixels to centimeters and inches',
    seoTitle: 'How to Convert Pixels to cm, mm and Inches (With DPI)',
    description: 'Work out how big a picture is on paper from its pixels and DPI, or how many pixels A4 needs. A free calculator with common paper sizes.',
    tool: 'pixel-to-cm-converter',
    related: ['how-to-resize-an-image', 'how-to-calculate-an-aspect-ratio', 'how-to-resize-a-photo-and-signature-for-an-exam-form'],
    updated: '2026-11-12',
    intro:
      'To convert pixels to centimeters, divide the pixels by the DPI to get inches, then multiply by 2.54. At 300 DPI, 1 cm is about 118 pixels, and the Pixel, cm and inch converter does the sum for any length and resolution.',
    steps: [
      'Open the Pixel, cm and inch converter and type the length you have.',
      'Choose its unit: pixels, centimeters, millimeters or inches.',
      'Choose the resolution in DPI. Use 300 for print photos and 72 or 96 for screens.',
      'Read the same length in every unit, and the pixel sizes of common paper.',
    ],
    sections: [
      {
        h: 'Why DPI matters',
        p: [
          'Pixels have no physical size on their own. The same 1200 pixels are 4 inches wide at 300 DPI and about 16.7 inches wide at 72 DPI. DPI says how many pixels fit in one inch.',
          'For printing, 300 DPI is the usual target for photos. 150 DPI is fine for drafts, and screens only care about the pixel count.',
        ],
      },
      {
        h: 'Common sizes in pixels',
        p: [
          'At 300 DPI an A4 page is 2480 by 3508 pixels, and a 4 by 6 inch photo print is 1200 by 1800 pixels. The table on the page shows A4, A5, A3, US Letter and passport photos at the DPI you choose.',
          'Changing the DPI setting of a file does not change its pixels. To change the real size of a picture, use the Resize images tool.',
        ],
      },
    ],
    faq: [
      { q: 'How many pixels is 1 cm?', a: 'At 300 DPI it is about 118 pixels, and at 96 DPI about 38 pixels. The formula is pixels = cm divided by 2.54, times DPI.' },
      { q: 'How many pixels is an A4 page?', a: 'At 300 DPI, A4 is 2480 by 3508 pixels. At 150 DPI it is 1240 by 1754.' },
      { q: 'Does this change my picture?', a: 'No. It is only a calculator and uses no file.' },
    ],
  },
];
