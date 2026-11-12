import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/seo';
import { GUIDES, guidePath } from '../lib/guides';
import { TOOLS, toolPath } from '../lib/tools';

/**
 * The full text of every how-to guide in one plain file, for AI assistants and answer engines that
 * prefer to read one document (the llms-full.txt convention, next to /llms.txt). Built from the same
 * data as the guide pages, so it cannot disagree with them.
 */
export const GET: APIRoute = () => {
  const out: string[] = [
    '# iDuckImg: how-to guides',
    '',
    `> Free image tools that run in the visitor's browser. Files are processed on the device and are not uploaded. Source: ${SITE_URL}/guides/`,
    '',
  ];
  for (const g of GUIDES) {
    const tool = TOOLS.find((t) => t.slug === g.tool);
    out.push(`## ${g.title}`, '', `URL: ${SITE_URL}${guidePath(g.slug)}`);
    if (tool) out.push(`Tool: ${tool.name} (${SITE_URL}${toolPath(tool.slug)})`);
    out.push(`Last checked: ${g.updated}`, '', g.intro, '', '### Steps', '');
    g.steps.forEach((s, i) => out.push(`${i + 1}. ${s}`));
    out.push('');
    for (const s of g.sections) out.push(`### ${s.h}`, '', ...s.p.flatMap((p) => [p, '']));
    out.push('### Common questions', '');
    for (const f of g.faq) out.push(`**${f.q}**`, f.a, '');
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
