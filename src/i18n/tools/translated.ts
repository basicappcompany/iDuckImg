/**
 * The tools whose own options and run button are translated (`src/i18n/tools/<tool>.ts`). Pages for these tools do
 * not carry the "the tool's own options are still English" note; every other tool's page does. When you translate a
 * tool's options, add its slug here and its table to `TRANSLATED_TOOLS` in `tests/unit/i18n.test.ts` (a test checks
 * the two lists match).
 */
export const TRANSLATED_TOOL_SLUGS: readonly string[] = [
  'compress-image',
  'resize-image',
  'convert-image',
  'crop-image',
  'image-to-pdf',
  'add-text-to-image',
  'add-watermark-to-image',
  'add-logo-to-image',
  'rotate-image',
  'remove-exif-data',
];
