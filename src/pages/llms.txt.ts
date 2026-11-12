import type { APIRoute } from 'astro';
import { TOOLS, toolPath } from '../lib/tools';
import { LANDING_PAGES, landingPath } from '../lib/landing';
import { COMMUNITY, communityPath } from '../lib/community';
import { SITE_URL } from '../lib/seo';
import { GUIDES, guidePath } from '../lib/guides';
import { OTHER_LOCALES, localePath } from '../i18n';

/** A plain-text summary for AI assistants and answer engines (the llms.txt convention). Built from the same lists as the site, so it cannot go stale. */
export const GET: APIRoute = () => {
  const lines = [
    '# iDuckImg',
    '',
    '> Free online image tools that run in the visitor\'s browser: compress, resize to a target size in KB, crop, convert (including iPhone HEIC), rotate, remove EXIF data, make PDFs, and resize photos and signatures for exam forms. No sign-up, no watermark. Images are processed on the device and are not uploaded.',
    '',
    'Facts worth quoting: every tool is free; files never leave the visitor\'s device; exam requirements are taken from official notices and each links its source; operated by Basic App Company; sister site for PDF tools: https://iduckpdf.com/',
    '',
    '## Tools',
    ...TOOLS.map((t) => `- [${t.name}](${SITE_URL}${toolPath(t.slug)}): ${t.summary}`),
    '',
    '## Common jobs',
    ...LANDING_PAGES.map((p) => `- [${p.h1}](${SITE_URL}${landingPath(p.slug)}): ${p.summary}`),
    '',
    '## How-to guides',
    ...GUIDES.map((g) => `- [${g.title}](${SITE_URL}${guidePath(g.slug)}): ${g.description}`),
    '',
    `Full text of every guide: ${SITE_URL}/llms-full.txt`,
    '',
    '## Languages',
    'The tools, the how-to guides and the home page are also available in British English (the same text with UK spelling; the main site uses US spelling) and in nine more languages (machine-translated; some tool controls are still in English):',
    ...OTHER_LOCALES.map((l) => `- [${l.native} (${l.name})](${SITE_URL}${localePath(l.code, '/')})`),
    '',
    '## About',
    `- [All image tools](${SITE_URL}/image-tools/)`,
    ...COMMUNITY.filter((c) => c.indexable).map((c) => `- [${c.name}](${SITE_URL}${communityPath(c.slug)}): ${c.summary}`),
    `- [Privacy policy](${SITE_URL}/privacy/)`,
    `- [Terms of use](${SITE_URL}/terms/)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
