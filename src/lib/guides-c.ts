import type { Guide } from './guides';

/** Guides 19 to 25. */
export const GUIDES_C: Guide[] = [
  {
    slug: 'how-to-calculate-an-aspect-ratio',
    title: 'How to calculate an aspect ratio',
    seoTitle: 'How to Calculate an Aspect Ratio (16:9, 4:3, 1:1)',
    description: 'Find the aspect ratio of any width and height, or work out the matching height or width for a ratio. A free calculator with common ratios.',
    tool: 'aspect-ratio-calculator',
    related: ['how-to-resize-an-image', 'how-to-crop-an-image', 'how-to-convert-pixels-to-cm-and-inches'],
    updated: '2026-11-12',
    intro:
      'To calculate an aspect ratio, divide the width and the height by their greatest common divisor. 1920 by 1080 is 16:9. The Aspect ratio calculator does it for you, and also finds the missing side when you want to keep a ratio.',
    steps: [
      'Open the Aspect ratio calculator and type a width and a height in pixels. The simplest ratio appears.',
      'To resize to a ratio, pick one such as 16:9, 4:3 or 1:1, or type your own.',
      'Type the new width and the height follows, or type the height and the width follows.',
      'Use those numbers in the Resize images or Crop images tool.',
    ],
    sections: [
      {
        h: 'Common ratios and where they are used',
        p: [
          'Square 1:1 is used for profile pictures. 16:9 is video and most screens, 4:3 is older screens and many cameras, and 3:2 is SLR cameras and 4 by 6 inch prints. 9:16 is stories and short video, and 4:5 is Instagram portrait posts.',
          'The calculator lists them with what they are used for, so you can pick the one a place asks for.',
        ],
      },
      {
        h: 'When a size is only close to a ratio',
        p: [
          'Some sizes are almost, but not exactly, a common ratio. 1366 by 768 is 683:384, which is within a fraction of a percent of 16:9. The calculator shows both so you know it is close rather than exact.',
          'Heights and widths are rounded to a whole pixel when you resize to a ratio.',
        ],
      },
    ],
    faq: [
      { q: 'What is the aspect ratio of 1920 x 1080?', a: '16:9. Divide both by 120, their greatest common divisor, and you get 16 and 9.' },
      { q: 'How do I keep the ratio when I resize?', a: 'Choose the ratio and type the new width. The height is worked out as width times the ratio height divided by the ratio width.' },
      { q: 'Does this change my picture?', a: 'No. It is a calculator and uses no file.' },
    ],
  },
  {
    slug: 'how-to-adjust-the-colours-of-a-photo',
    title: 'How to adjust brightness, contrast and colours, or make a photo black and white',
    seoTitle: 'How to Make a Photo Black and White or Adjust Brightness',
    description: 'Change brightness, contrast and colour strength, or apply black and white, sepia or negative. Live preview, in your browser, no upload.',
    tool: 'adjust-image-colors',
    related: ['how-to-turn-a-photo-into-pixel-art', 'how-to-get-a-color-palette-from-an-image', 'how-to-compress-an-image'],
    updated: '2026-11-12',
    intro:
      'To make a photo black and white, drop it into the Adjust colours tool, choose the Black and white filter and press Apply. The same tool changes brightness, contrast and colour strength, with a live preview.',
    steps: [
      'Open the Adjust colours and filters tool and drop in your pictures.',
      'Move the Brightness, Contrast and Colour strength sliders, or choose a filter such as Black and white.',
      'Check the live preview, and use Reset if you want to start again.',
      'Press Apply and download the files, or all of them as a ZIP.',
    ],
    sections: [
      {
        h: 'What each control does',
        p: [
          'Brightness makes everything lighter or darker. Contrast pushes light and dark further apart or closer together. Colour strength dials the colours up, or down to grey, and the filters give black and white, sepia (a warm old-photo brown) or a negative.',
          'Brightness and contrast are applied first, then colour strength, then the filter. Move them in small steps, because big changes flatten or blow out detail.',
        ],
      },
      {
        h: 'Batches and file types',
        p: [
          'The same changes are applied to every picture you add, so a whole folder can be turned black and white at once. The preview shows the first picture.',
          'Transparent areas of a PNG stay transparent. Each picture is saved in its own format, and JPG and WebP are saved again at high quality.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Change one slider at a time and watch the preview. It is easy to push brightness and contrast together until detail is lost in the lightest and darkest parts.',
          'For a black and white photo with more punch, choose Black and white, then add a little contrast. For an old-photo look, sepia with slightly lower brightness works well.',
        ],
      },
    ],
    faq: [
      { q: 'How do I make a picture black and white?', a: 'Choose the Black and white filter and press Apply. Dragging Colour strength all the way down gives a similar result.' },
      { q: 'How do I make a dark photo brighter?', a: 'Move the Brightness slider to the right, and add a little contrast if it looks flat.' },
      { q: 'Is my picture uploaded?', a: 'No. The changes are made in your browser.' },
    ],
  },
  {
    slug: 'how-to-add-a-border-to-a-picture',
    title: 'How to add a border or frame to a picture',
    seoTitle: 'How to Add a Border or Frame to a Picture (Any Colour)',
    description: 'Put a white, black or coloured border around any picture, or a see-through one. Choose the thickness and see a preview. In your browser.',
    tool: 'add-border-to-image',
    related: ['how-to-merge-images-side-by-side', 'how-to-make-a-round-profile-picture', 'how-to-add-text-to-a-picture'],
    updated: '2026-11-12',
    intro:
      'To add a border to a picture, drop it into the Add a border tool, set the thickness, choose a colour and press Add border. The border goes around the picture, so nothing is cut off and the result is a little bigger.',
    steps: [
      'Open the Add a border tool and drop in your pictures.',
      'Set how thick the border is.',
      'Choose white, black, yellow, transparent, or type your own colour code such as #1e90ff.',
      'Check the preview, press Add border and download the result.',
    ],
    sections: [
      {
        h: 'Thickness that scales',
        p: [
          'The thickness is a share of the shorter side of the picture, so the border looks the same on a small photo and a large one in the same batch.',
          'Because the border is added around the outside, the picture keeps all of its content. This is different from drawing over the edge, which would hide part of it.',
        ],
      },
      {
        h: 'See-through borders',
        p: [
          'A transparent border needs a format that supports transparency, so a JPG becomes a PNG when you choose it. Other pictures keep their own format.',
          'If you type a colour code that is not valid, the page tells you instead of guessing. Use the forms #1e90ff or #fa0.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'A thin white border, around 2 to 4 percent, gives a clean print or gallery look. A thicker one in a bold colour works as a frame for a social media post.',
          'If you will print the picture, remember that a border makes the file bigger than the original, so check the final size against the paper or frame you have in mind.',
        ],
      },
    ],
    faq: [
      { q: 'How do I add a white border to a photo?', a: 'Drop the photo in, keep the colour on White, set the thickness and press Add border.' },
      { q: 'Does the border cover my picture?', a: 'No. It is added around the outside, so the picture is complete and the result is larger.' },
      { q: 'Can the border be see-through?', a: 'Yes. Choose Transparent. The result is a PNG, because JPG cannot be see-through.' },
    ],
  },
  {
    slug: 'how-to-get-a-hex-color-from-an-image',
    title: 'How to get the HEX colour code from an image',
    seoTitle: 'How to Get the HEX Color Code From an Image (Colour Picker)',
    description: 'Click any picture to get the exact colour in HEX, RGB and HSL with a one-click copy. Works with the keyboard too. In your browser.',
    tool: 'color-picker-from-image',
    related: ['how-to-get-a-color-palette-from-an-image', 'how-to-adjust-the-colours-of-a-photo', 'how-to-make-a-favicon'],
    updated: '2026-11-12',
    intro:
      'To get the HEX code of a colour in a picture, drop it into the Colour picker, move over the picture to preview the colour and click to pick it. The HEX, RGB and HSL codes appear, each with a Copy button.',
    steps: [
      'Open the Colour picker from an image tool and drop in a picture.',
      'Move over the picture to preview the colour under the pointer.',
      'Click or tap to pick it, then press Copy next to the code you need.',
      'Pick as many colours as you like. The last ten stay below so you can go back to them.',
    ],
    sections: [
      {
        h: 'HEX, RGB and HSL',
        p: [
          'They are three ways to write the same colour. HEX is the short code used in web pages, like #1E90FF. RGB gives the red, green and blue amounts from 0 to 255, and HSL gives hue, saturation and lightness, which is easier to adjust by hand.',
          'The panel shows all three, so you can paste whichever your design tool or stylesheet wants.',
        ],
      },
      {
        h: 'Getting a reliable colour',
        p: [
          'A photo is made of millions of slightly different pixels, so two spots that look the same can differ by a few steps. Click a few places, or use the palette tool to find the main colours instead.',
          'Without a mouse, click the picture once, then use the arrow keys to move and Enter to pick. If a pixel is see-through, the page says so, because what you see on screen also depends on what is behind it.',
        ],
      },
    ],
    faq: [
      { q: 'How do I find the HEX code of a colour in a picture?', a: 'Drop the picture in, click the colour and copy the HEX code that appears.' },
      { q: 'Why do nearby pixels give different codes?', a: 'Photos contain tiny variations. Click a few spots or use the palette tool to see the main colours.' },
      { q: 'Is my picture uploaded?', a: 'No. The colour is read in your browser.' },
    ],
  },
  {
    slug: 'how-to-get-a-color-palette-from-an-image',
    title: 'How to get a colour palette from an image',
    seoTitle: 'How to Get a Color Palette From an Image (HEX Codes, CSS)',
    description: 'Pull the main colours out of a picture with their HEX codes and how much of the picture each covers. Copy as a list or CSS variables.',
    tool: 'color-palette-generator',
    related: ['how-to-get-a-hex-color-from-an-image', 'how-to-adjust-the-colours-of-a-photo', 'how-to-turn-a-photo-into-pixel-art'],
    updated: '2026-11-12',
    intro:
      'To get a colour palette from a picture, drop it into the Colour palette generator. The main colours appear as swatches with their HEX codes and the share of the picture each one covers, and you can copy them as a list or CSS.',
    steps: [
      'Open the Colour palette generator and drop in a picture.',
      'The main colours appear straight away. Use the slider to ask for fewer or more, from 2 to 12.',
      'Click a swatch to copy its HEX code.',
      'Or copy the whole palette as a list or as CSS variables.',
    ],
    sections: [
      {
        h: 'How the colours are chosen',
        p: [
          'Similar pixels are grouped and each group is averaged into one colour, so a colour that fills most of the picture comes first. The percentage on a swatch is how much of the picture that group covers.',
          'Fully or mostly see-through pixels are ignored, so a logo on a transparent background gives the logo colours, not a dark empty one.',
        ],
      },
      {
        h: 'Using the palette',
        p: [
          'Copy as CSS variables gives custom properties such as --colour-1 that you can paste straight into a stylesheet. The plain list is handy for notes or a design tool.',
          'If the picture has fewer distinct colours than you asked for, you get only the colours it has. A three-colour logo gives three swatches, not twelve. For one exact colour, use the colour picker instead.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Use a picture with the mood you want. A palette is only as good as the picture it comes from, and a sunset photo gives very different colours from a product shot.',
          'Pick two or three colours from the palette rather than all of them. Most designs work best with one main colour, one accent and a neutral, and the percentages show which colours are the biggest candidates.',
        ],
      },
    ],
    faq: [
      { q: 'How many colours can I get?', a: 'From 2 to 12. Six is a good start for a brand or design palette.' },
      { q: 'Can I use the palette on my website?', a: 'Yes. Copy as CSS variables and paste the result into your stylesheet.' },
      { q: 'Is my picture uploaded?', a: 'No. The colours are worked out in your browser.' },
    ],
  },
  {
    slug: 'how-to-convert-an-image-to-base64',
    title: 'How to convert an image to Base64 (and back)',
    seoTitle: 'How to Convert an Image to Base64 and Decode It Back',
    description: 'Turn a picture into a Base64 data URI for HTML or CSS, or paste Base64 and get the image back. Done in your browser, nothing uploaded.',
    tool: 'image-to-base64',
    related: ['how-to-make-a-favicon', 'how-to-compress-an-image', 'how-to-convert-images-between-jpg-png-webp-and-heic'],
    updated: '2026-11-12',
    intro:
      'To convert an image to Base64, drop it into the Image to Base64 tool and copy the result. The default is a data URI you can paste into HTML or CSS. To go back, choose Base64 to image, paste the text and download the picture.',
    steps: [
      'Open the Image to Base64 tool and choose Image to Base64.',
      'Drop in the picture. The original file is encoded as it is, so an SVG stays an SVG.',
      'Pick the format you need: a data URI, plain Base64, a CSS background or an HTML image tag, then press Copy.',
      'To decode, choose Base64 to image, paste the text and download the picture.',
    ],
    sections: [
      {
        h: 'When Base64 is a good idea',
        p: [
          'Base64 writes the bytes of a file as plain text, so a small picture can sit inside a web page, a stylesheet or an email without a separate file. The text is about a third longer than the file.',
          'It suits small images such as icons and logos. For a large photo the text becomes very long and a normal image file loads faster, so the tool warns you above 100 KB.',
        ],
      },
      {
        h: 'Pasting Base64 back',
        p: [
          'You can paste a full data URI or just the Base64 characters. The tool reads the picture type from the data itself (PNG, JPG, GIF, WebP, BMP, AVIF, SVG or ICO) and trusts that over a wrong label.',
          'If the text was cut off when it was copied, or is not a picture, you get a plain message saying so instead of a broken download.',
        ],
      },
    ],
    faq: [
      { q: 'What is a data URI?', a: 'A way to put a file inside a web address. It starts with data:, the file type and ;base64, followed by the Base64 text.' },
      { q: 'Why is the Base64 text bigger than the file?', a: 'Base64 uses four text characters for every three bytes, so the text is about 33 percent longer.' },
      { q: 'Is my picture uploaded?', a: 'No. Encoding and decoding happen in your browser.' },
    ],
  },
  {
    slug: 'how-to-make-a-favicon',
    title: 'How to make a favicon for your website',
    seoTitle: 'How to Make a Favicon (favicon.ico, PNG, Apple Touch Icon)',
    description: 'Make favicon.ico, 16 and 32 pixel PNGs, an Apple touch icon and Android icons from one picture, with the code to paste into your page.',
    tool: 'favicon-generator',
    related: ['how-to-convert-an-image-to-base64', 'how-to-resize-an-image', 'how-to-make-a-round-profile-picture'],
    updated: '2026-11-12',
    intro:
      'To make a favicon, drop one picture into the Favicon generator and press Make favicons. You get favicon.ico, 16 and 32 pixel PNGs, an Apple touch icon and two Android icons, with the code to paste into your page.',
    steps: [
      'Open the Favicon generator and drop in one picture. A square picture of 512 pixels or more works best.',
      'If it is not square, choose to cut it to a square from the middle, or keep all of it with see-through bars.',
      'Press Make favicons and download the files, or all of them in a ZIP.',
      'Put the files in the root folder of your site and paste the code shown into the head of your pages.',
    ],
    sections: [
      {
        h: 'What you get',
        p: [
          'favicon.ico holds the 16, 32 and 48 pixel versions in one file. favicon-16x16.png and favicon-32x32.png are for browser tabs, apple-touch-icon.png (180 pixels) is for iPhones and iPads, and 192 and 512 pixel icons are for Android and installable web apps.',
          'The preview shows your icon at 16, 32 and 64 pixels so you can check it before you download.',
        ],
      },
      {
        h: 'Making it look good small',
        p: [
          'A favicon is tiny, so a simple shape with strong colours reads best. Detailed pictures turn to mush at 16 pixels, so start from a simple logo or a single letter.',
          'A picture smaller than 512 pixels is enlarged for the biggest icons and can look soft, and the page tells you when that happens. A see-through background is kept.',
        ],
      },
    ],
    faq: [
      { q: 'What files does a website need for a favicon?', a: 'A favicon.ico, 16 and 32 pixel PNGs for tabs, a 180 pixel Apple touch icon, and 192 and 512 pixel icons for Android. The tool makes all of them.' },
      { q: 'What size should my picture be?', a: 'Square and at least 512 by 512 pixels. Smaller pictures work but the big icons look soft.' },
      { q: 'Is the favicon.ico a real ICO file?', a: 'Yes. It holds the 16, 32 and 48 pixel icons in a standard ICO file.' },
    ],
  },
  {
    slug: 'are-online-image-tools-safe',
    title: 'Are online image tools safe? How to check yours',
    seoTitle: 'Are Online Image Tools Safe? How to Check Yours',
    description: 'Many online image tools upload your photo to a server. Here is how to tell, how to check in two minutes, and what iDuckImg does instead.',
    tool: 'remove-exif-data',
    related: ['how-to-remove-location-and-exif-data-from-a-photo', 'how-to-blur-or-hide-part-of-an-image', 'how-to-compress-an-image'],
    updated: '2026-11-12',
    intro:
      'An online image tool is only as private as the place it does its work. Many send your photo to a server; iDuckImg does the work in your browser, so the file stays on your device. You can check this yourself in the browser Network tab.',
    steps: [
      'Open the tool page, then open your browser developer tools (F12) and choose the Network tab.',
      'Clear the list, then drop a picture into the tool and run it.',
      'Look for large requests that carry your picture, usually shown as POST or PUT. A tool that works on your device shows none.',
      'Read the privacy policy of any tool you use, and check what it says it keeps and for how long.',
    ],
    sections: [
      {
        h: 'Why it matters',
        p: [
          'A photo can contain faces, documents, a house number and hidden details such as the exact place it was taken. Uploading it hands a copy to someone else, and you cannot see what happens next.',
          'Tools that work in your browser avoid that, because your file is processed by your own device and is never sent. They also tend to be faster, since there is no upload or download.',
        ],
      },
      {
        h: 'What iDuckImg does',
        p: [
          'Every iDuckImg tool runs in your browser. Your pictures are not uploaded, there is no sign-up and no watermark is added. The page loads its own code and files from the same site, and for some formats such as HEIC a decoder from the same site. It makes no requests to other companies.',
          'Still worth doing: remove hidden location data before you share a photo, and use Cover rather than a light blur to hide anything private. The Remove EXIF data and Blur or hide tools do those jobs on your device.',
        ],
      },
    ],
    faq: [
      { q: 'How can I tell if a tool uploads my photo?', a: 'Open the Network tab in your browser developer tools, run the tool and look for a large request that carries your picture. If there is none, the work happened on your device.' },
      { q: 'Does iDuckImg upload my pictures?', a: 'No. Each tool runs in your browser and your files stay on your device.' },
      { q: 'Is it safe to share a photo after editing it?', a: 'Remove the hidden location and camera data first, and hide anything private in the picture itself with a solid cover.' },
    ],
  },
];
