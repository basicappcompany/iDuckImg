/**
 * Every live tool, in the order shown on the homepage. Add a tool here when its page ships;
 * the homepage and the "More tools" block on each tool page both read this list.
 */
export interface ToolLink {
  /** Page file name under src/pages, also the URL path. */
  slug: string;
  name: string;
  /** One line shown on the homepage card. */
  summary: string;
}

export const TOOLS: readonly ToolLink[] = [
  { slug: 'compress-images', name: 'Compress images', summary: 'Make JPG, PNG and WebP files smaller without visible loss.' },
  { slug: 'resize-image', name: 'Resize images', summary: 'Set exact pixels or a percentage, or shrink to a target size in KB.' },
  { slug: 'convert-image', name: 'Convert images', summary: 'Open iPhone HEIC photos, switch between JPG, PNG and WebP, or make a PDF.' },
  { slug: 'images-to-pdf', name: 'Combine images into PDF', summary: 'Put several images in one PDF and choose the page order.' },
  { slug: 'rotate-image', name: 'Rotate and flip', summary: 'Turn an image 90, 180 or 270 degrees, or mirror it.' },
  { slug: 'exam-photo-resizer', name: 'Exam photo and signature resizer', summary: 'Exact pixels and KB for exam forms, with requirements and sources.' },
  { slug: 'remove-exif-data', name: 'Remove EXIF data', summary: 'Strip location, camera and date details before you share a photo.' },
];

export function toolPath(slug: string): string {
  return `/${slug}/`;
}

/** The other tools, for the "More tools" block. `currentPath` is the page's URL path. */
export function otherTools(currentPath: string): ToolLink[] {
  const normalised = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
  return TOOLS.filter((t) => toolPath(t.slug) !== normalised);
}
