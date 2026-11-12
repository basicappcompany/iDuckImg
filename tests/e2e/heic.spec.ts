import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';

/**
 * Real HEIC decoding needs a real HEIC file, and none is stored in the repo (there is no HEIC
 * encoder available to make one, and sample images carry their own licences). Point
 * HEIC_FIXTURE at any .heic file to run these, e.g.
 *   HEIC_FIXTURE=/path/to/photo.heic pnpm test:e2e -g HEIC
 */
const fixture = process.env['HEIC_FIXTURE'];

test.describe('HEIC input', () => {
  test.skip(!fixture, 'set HEIC_FIXTURE to a .heic file to run');

  test('converts a HEIC photo to JPG, PNG and WebP', async ({ page }) => {
    for (const [target, type, ext] of [
      ['jpeg', 'image/jpeg', 'jpg'],
      ['png', 'image/png', 'png'],
      ['webp', 'image/webp', 'webp'],
    ] as const) {
      await page.goto('/convert-image/');
      await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
      await page.getByLabel('Choose files').setInputFiles(fixture!);
      await expect(page.getByText(/\d+ images? selected/)).toBeVisible();
      await page.getByLabel('Format').selectOption(target);
      await page.getByRole('button', { name: 'Convert', exact: true }).click();
      const [r] = await readResults(page, 1);
      expect(r!.type).toBe(type);
      expect(r!.name.endsWith(`.${ext}`)).toBe(true);
      expect(r!.width).toBeGreaterThan(100);
      expect(r!.height).toBeGreaterThan(100);
      expect(r!.size).toBeGreaterThan(1000);
    }
  });

  test('turns a HEIC photo into a PDF page', async ({ page }) => {
    await page.goto('/convert-image/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await page.getByLabel('Choose files').setInputFiles(fixture!);
    await expect(page.getByText(/\d+ images? selected/)).toBeVisible();
    await page.getByLabel('Format').selectOption('pdf');
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.head).toBe('%PDF-');
  });

  test('combines a HEIC photo and a JPG into one PDF', async ({ page }) => {
    await page.goto('/image-to-pdf/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    const jpg = await makeImage(page, 'image/jpeg', 'b.jpg', 400, 300);
    await page
      .getByLabel('Choose files')
      .setInputFiles([{ name: 'photo.heic', mimeType: 'image/heic', buffer: readFileSync(fixture!) }, jpg]);
    await expect(page.getByText(/2 pages \(/)).toBeVisible();
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click();
    const pdf = await resultBytes(page, 0);
    const pages = (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;
    expect(pages).toBe(2);
  });

  test('a damaged HEIC file gets a clear error', async ({ page }) => {
    await page.goto('/convert-image/');
    await addFiles(page, [{ name: 'broken.heic', mimeType: 'image/heic', buffer: Buffer.from('not a heic at all') }]);
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'broken.heic' })).toBeVisible();
  });
});
