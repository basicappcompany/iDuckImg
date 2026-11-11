import { expect, test } from '@playwright/test';
import { addFiles, makeImage, resultBytes } from './helpers';

/** Shown by the page list once files are added, e.g. "3 pages (1.2 MB)". */
const PAGES = /\d+ pages? \(/;

/** Page sizes in order, read from the uncompressed PDF. */
function mediaBoxes(pdf: Uint8Array): [number, number][] {
  const text = Buffer.from(pdf).toString('latin1');
  return [...text.matchAll(/\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/g)].map((m) => [
    Number(m[1]),
    Number(m[2]),
  ]);
}

const pageCount = (pdf: Uint8Array) => (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;

test.describe('images to one PDF', () => {
  test('combines images in the order shown, one page each', async ({ page }) => {
    await page.goto('/image-to-pdf/');
    await addFiles(page, [
      await makeImage(page, 'image/jpeg', 'wide.jpg', 800, 400), // 2:1 landscape
      await makeImage(page, 'image/png', 'tall.png', 400, 800), // 1:2 portrait
      await makeImage(page, 'image/webp', 'square.webp', 500, 500),
    ], PAGES);
    await page.getByLabel('Page size').selectOption('fit');
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click();

    const link = page.getByRole('region', { name: 'Results' }).locator('a[download]');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('download', 'images.pdf');
    const pdf = await resultBytes(page, 0);
    expect(Buffer.from(pdf).subarray(0, 5).toString()).toBe('%PDF-');
    expect(pageCount(pdf)).toBe(3);
    expect(mediaBoxes(pdf)).toEqual([[800, 400], [400, 800], [500, 500]]);
  });

  test('reordering and removing change the PDF', async ({ page }) => {
    await page.goto('/image-to-pdf/');
    await addFiles(page, [
      await makeImage(page, 'image/jpeg', 'a.jpg', 800, 400),
      await makeImage(page, 'image/jpeg', 'b.jpg', 400, 800),
      await makeImage(page, 'image/jpeg', 'c.jpg', 500, 500),
    ], PAGES);
    await page.getByLabel('Page size').selectOption('fit');
    await page.getByRole('button', { name: 'Move c.jpg up' }).click(); // a, c, b
    await page.getByRole('button', { name: 'Remove a.jpg' }).click(); // c, b
    await expect(page.getByText('2 pages')).toBeVisible();
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click();

    const pdf = await resultBytes(page, 0);
    expect(pageCount(pdf)).toBe(2);
    expect(mediaBoxes(pdf)).toEqual([[500, 500], [400, 800]]);
  });

  test('A4 pages are portrait or landscape to suit each image', async ({ page }) => {
    await page.goto('/image-to-pdf/');
    await addFiles(page, [
      await makeImage(page, 'image/jpeg', 'wide.jpg', 800, 400),
      await makeImage(page, 'image/jpeg', 'tall.jpg', 400, 800),
    ], PAGES);
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click(); // A4 is the default
    const pdf = await resultBytes(page, 0);
    expect(mediaBoxes(pdf)).toEqual([[841.89, 595.28], [595.28, 841.89]]);
  });

  test('a broken file fails the whole job with its name, and the tool is usable again', async ({ page }) => {
    await page.goto('/image-to-pdf/');
    await addFiles(page, [
      await makeImage(page, 'image/jpeg', 'ok.jpg', 400, 300),
      { name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('definitely not a png') },
    ], PAGES);
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'broken.png' })).toBeVisible();
    await page.getByRole('button', { name: 'Remove broken.png' }).click();
    await page.getByRole('button', { name: 'Create PDF', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Results' }).locator('a[download]')).toHaveCount(1);
  });
});
