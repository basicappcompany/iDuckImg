import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test, type Page } from '@playwright/test';
import { readResults, resultBytes } from './helpers';

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));

async function pixelAt(page: Page, bytes: Uint8Array, x: number, y: number): Promise<number[]> {
  return page.evaluate(
    async ({ data, x, y }) => {
      const bitmap = await createImageBitmap(new Blob([new Uint8Array(data)]));
      const c = document.createElement('canvas');
      c.width = bitmap.width;
      c.height = bitmap.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0);
      return Array.from(ctx.getImageData(x, y, 1, 1).data);
    },
    { data: Array.from(bytes), x, y },
  );
}

/** Drop a fixture into the Convert page, convert to PNG, and return the one result. */
async function convertToPng(page: Page, file: string) {
  await page.goto('/convert-image/');
  await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
  await page.getByLabel('Choose files').setInputFiles(fixture(file));
  await expect(page.getByText(/\d+ images? selected/)).toBeVisible();
  await page.getByLabel('Format').selectOption('png');
  await page.getByRole('button', { name: 'Convert', exact: true }).click();
  const [r] = await readResults(page, 1);
  return { r: r!, bytes: await resultBytes(page, 0) };
}

test.describe('BMP, GIF, SVG and AVIF input', () => {
  test('a BMP opens and keeps its size and colour', async ({ page }) => {
    const { r, bytes } = await convertToPng(page, 'red.bmp');
    expect(r.name).toBe('red.png');
    expect([r.width, r.height]).toEqual([64, 32]);
    expect(await pixelAt(page, bytes, 30, 15)).toEqual([255, 0, 0, 255]);
  });

  test('a GIF becomes its first frame', async ({ page }) => {
    const { r, bytes } = await convertToPng(page, 'two-frames.gif');
    expect(r.name).toBe('two-frames.png');
    expect([r.width, r.height]).toEqual([60, 40]);
    expect(await pixelAt(page, bytes, 30, 20)).toEqual([255, 0, 0, 255]);
  });

  test('an AVIF opens, and the list compares with the AVIF, not the PNG made from it', async ({ page }) => {
    const { r, bytes } = await convertToPng(page, 'green.avif');
    expect(r.name).toBe('green.png');
    expect([r.width, r.height]).toEqual([80, 60]);
    const [red, green] = await pixelAt(page, bytes, 40, 30);
    expect(red).toBeLessThan(40);
    expect(green).toBeGreaterThan(150);
    await expect(page.getByRole('region', { name: 'Results' })).toContainText('324 B to');
  });

  test('an SVG is drawn sharp at a useful size and keeps its transparent area', async ({ page }) => {
    const { r, bytes } = await convertToPng(page, 'half-red.svg');
    expect(r.name).toBe('half-red.png');
    // 200 x 100 is drawn at 1024 wide so a vector stays sharp.
    expect([r.width, r.height]).toEqual([1024, 512]);
    expect(await pixelAt(page, bytes, 200, 250)).toEqual([255, 0, 0, 255]);
    expect((await pixelAt(page, bytes, 800, 250))[3]).toBe(0);
  });

  test('other tools take them too, and the picker lists them', async ({ page }) => {
    await page.goto('/compress-image/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await expect(page.getByText('Also takes BMP, GIF, SVG and AVIF')).toBeVisible();
    await page.getByLabel('Choose files').setInputFiles(fixture('red.bmp'));
    await expect(page.getByText(/1 image selected/)).toBeVisible();
  });

  test('a broken file gets a clear message and does not stop the good ones', async ({ page }) => {
    await page.goto('/convert-image/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await page.getByLabel('Choose files').setInputFiles([
      { name: 'broken.gif', mimeType: 'image/gif', buffer: Buffer.from('not a picture') },
      { name: 'red.bmp', mimeType: 'image/bmp', buffer: readFileSync(fixture('red.bmp')) },
    ]);
    await expect(page.getByRole('alert')).toContainText('broken.gif could not be read as a GIF');
    await expect(page.getByText(/1 image selected/)).toBeVisible();
  });
});
