/**
 * Fair, sourced comparison pages. Rules: only say about another site what its own public page says, give
 * its address and the date we read it, say "not stated on the page we read" instead of guessing, and say what
 * the other site does better. No claims about quality, speed or popularity.
 * Facts about the other sites were read on 2026-11-14 from the pages named in each row's source.
 */
export const COMPARE_CHECKED = '2026-11-14';

export interface CompareRow {
  question: string;
  us: string;
  them: string;
  /** Where the answer about the other site comes from. */
  source: { label: string; url: string };
}

export interface ComparePage {
  slug: string;
  other: string;
  title: string;
  description: string;
  intro: string;
  rows: CompareRow[];
  /** What the other site does that iDuckIMG does not (stated fairly). */
  theirStrengths: string[];
  /** When iDuckIMG is the better pick, and when it is not. */
  chooseUs: string[];
  chooseThem: string[];
}

const ILOVE_COMPRESS = { label: 'iLoveIMG compress page', url: 'https://www.iloveimg.com/compress-image' };
const ILOVE_PRICING = { label: 'iLoveIMG pricing page', url: 'https://www.iloveimg.com/pricing' };
const PI7_HOME = { label: 'Pi7 home page', url: 'https://pi7.org/' };

export const COMPARE_PAGES: readonly ComparePage[] = [
  {
    slug: 'iduckimg-vs-iloveimg',
    other: 'iLoveIMG',
    title: 'iDuckIMG vs iLoveIMG: where files go, limits and price',
    description: 'A fair table of iDuckIMG and iLoveIMG: where pictures are processed, sign-up, limits, ads and price, each with a source link and the date we checked.',
    intro:
      "Both sites offer free online image tools. They work differently: iDuckIMG processes pictures in your browser, while iLoveIMG's page describes an upload step. Here is what each site says, with links so you can check.",
    rows: [
      {
        question: 'Where is the picture processed?',
        us: 'In your browser, on your device. The page loads its own code and does not send your picture to a server. You can check this in the browser Network tab.',
        them: 'The compress page shows an upload flow ("Upload your file and transform it", "Uploading file", "Upload speed"), which describes sending the file to its service.',
        source: ILOVE_COMPRESS,
      },
      {
        question: 'Do you need an account?',
        us: 'No sign-up for any tool.',
        them: 'The compress page we read did not ask us to sign in. Its pricing page lists a free "Basic" plan and paid "Premium" plans.',
        source: ILOVE_PRICING,
      },
      {
        question: 'Limits on free use',
        us: 'No file-count limit. Large pictures are limited by your device: over 25 megapixels shows a warning and over 100 megapixels is refused.',
        them: 'The free Basic plan lists "Limited document processing". Premium lists "Unlimited document processing". The page does not state the exact limit.',
        source: ILOVE_PRICING,
      },
      {
        question: 'Ads',
        us: 'We may show ads in future to cover costs, kept away from the upload area and the download button. None are shown today.',
        them: 'The pricing page lists "Ad-free experience" as a Premium feature.',
        source: ILOVE_PRICING,
      },
      {
        question: 'Watermark on results',
        us: 'None.',
        them: 'Not stated on the pages we read.',
        source: ILOVE_PRICING,
      },
      {
        question: 'Price',
        us: 'Free.',
        them: 'A free Basic plan, and Premium plans with prices on the pricing page (shown to us in rupees, monthly or yearly).',
        source: ILOVE_PRICING,
      },
    ],
    theirStrengths: [
      'A much larger set of tools. Its pricing page also mentions AI tools and regional file processing, which iDuckIMG does not have.',
      'Premium plans for teams, with priority support.',
    ],
    chooseUs: [
      'You do not want a photo or a scan of a document to leave your device.',
      'You need a picture at an exact size in KB or pixels for a form, with exam sizes taken from official notices.',
      'You want no account and no limit on how many files you process.',
    ],
    chooseThem: [
      'You need AI tools, or tools iDuckIMG does not have yet.',
      'You are processing very large pictures that your device struggles with.',
      'You want a paid plan with support.',
    ],
  },
  {
    slug: 'iduckimg-vs-pi7',
    other: 'Pi7',
    title: 'iDuckIMG vs Pi7 Image Tool: privacy, tools and limits',
    description: 'A fair table of iDuckIMG and Pi7: where files are processed, sign-up, tools and price, each with a source link and the date we checked.',
    intro:
      'Pi7 and iDuckIMG both offer free image tools with no sign-up. They describe file handling differently. Here is what each site says, with links so you can check.',
    rows: [
      {
        question: 'Where are files processed?',
        us: 'In your browser, on your device. The picture is not sent to our servers.',
        them: 'Its home page says "Your files are processed privately and removed automatically after processing", which describes processing on its side followed by deletion.',
        source: PI7_HOME,
      },
      {
        question: 'Do you need an account?',
        us: 'No.',
        them: 'The home page says "Free · Privacy-first · No sign-up".',
        source: PI7_HOME,
      },
      {
        question: 'Which tools?',
        us: 'Image tools only: compress, resize, crop, convert (including HEIC), rotate, EXIF removal, watermark, exam photo sizes and more.',
        them: 'Image, PDF, audio, GIF, Base64, Bulk and Collage tools, in separate sites of one ecosystem.',
        source: PI7_HOME,
      },
      {
        question: 'Price and watermark',
        us: 'Free, with no watermark.',
        them: 'Free is stated on the home page. A watermark policy is not stated on the page we read.',
        source: PI7_HOME,
      },
      {
        question: 'Ads',
        us: 'We may show ads in future, away from the upload area and the download button. None are shown today.',
        them: 'Not stated on the page we read.',
        source: PI7_HOME,
      },
    ],
    theirStrengths: [
      'A wider range of file types: PDF, audio and GIF tools as well as images.',
      'Bulk and collage tools, which iDuckIMG does not have yet.',
    ],
    chooseUs: [
      'You want the picture to stay on your device the whole time.',
      'You need exact sizes for exam forms, with the official source and the date we read it shown on each page.',
    ],
    chooseThem: [
      'You also need audio or other file types in the same place.',
      'You need bulk or collage tools that iDuckIMG does not offer yet.',
    ],
  },
];
