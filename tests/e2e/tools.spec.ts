import { expect, test } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';

test.describe('compress', () => {
  test('shrinks JPG, PNG and WebP and offers a ZIP', async ({ page }) => {
    await page.goto('/compress-image/');
    const images = [
      await makeImage(page, 'image/jpeg', 'a.jpg'),
      await makeImage(page, 'image/png', 'b.png'),
      await makeImage(page, 'image/webp', 'c.webp'),
    ];
    await addFiles(page, images);
    await page.getByRole('button', { name: 'Compress', exact: true }).click();

    await expect(page.getByRole('button', { name: /Download all \(3\) as ZIP/ })).toBeVisible();
    const results = await readResults(page, 3);
    expect(results.map((r) => r.name)).toEqual(['a-compressed.jpg', 'b-compressed.png', 'c-compressed.webp']);
    results.forEach((r, i) => {
      expect(r.size).toBeLessThan(images[i]!.buffer.length);
      expect([r.width, r.height]).toEqual([1200, 800]);
    });
  });

  test('compresses to AVIF and the file is smaller than the JPG', async ({ page }) => {
    await page.goto('/compress-image/');
    const image = await makeImage(page, 'image/jpeg', 'a.jpg');
    await addFiles(page, [image]);
    await page.getByLabel('Output format').selectOption('avif');
    await page.getByRole('button', { name: 'Compress', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r).toMatchObject({ name: 'a-compressed.avif', type: 'image/avif', width: 1200, height: 800 });
    expect(r!.size).toBeLessThan(image.buffer.length);
  });

  test('cancel stops a batch', async ({ page }) => {
    await page.goto('/compress-image/');
    const images = [];
    for (let i = 0; i < 6; i++) images.push(await makeImage(page, 'image/jpeg', `big${i}.jpg`, 4000, 3000));
    await addFiles(page, images);
    await page.getByRole('button', { name: 'Compress', exact: true }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    // The tool is usable again and the batch did not complete.
    await expect(page.getByRole('button', { name: 'Compress', exact: true })).toBeEnabled();
    expect(await page.locator('section[aria-label="Results"] a[download]').count()).toBeLessThan(6);
  });
});

test.describe('cancel in other tools', () => {
  const CASES: Array<[string, string]> = [
    ['/resize-image/', 'Resize'],
    ['/convert-image/', 'Convert'],
    ['/image-to-pdf/', 'Create PDF'],
  ];
  for (const [path, run] of CASES) {
    test(`cancel works on ${path}`, async ({ page }) => {
      await page.goto(path);
      const images = [];
      for (let i = 0; i < 6; i++) images.push(await makeImage(page, 'image/jpeg', `big${i}.jpg`, 4000, 3000));
      await addFiles(page, images, path === '/image-to-pdf/' ? /\d+ pages?/ : undefined);
      await page.getByRole('button', { name: run, exact: true }).click();
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page.getByRole('button', { name: run, exact: true })).toBeEnabled();
      expect(await page.locator('section[aria-label="Results"] a[download]').count()).toBeLessThan(6);
    });
  }
});

test.describe('resize', () => {
  test('resizes by width keeping proportions', async ({ page }) => {
    await page.goto('/resize-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'a.jpg', 1600, 1200)]);
    await page.getByLabel('Width (px)').fill('800');
    await page.getByLabel('Height (px)').fill('');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([800, 600]);
  });

  test('resizes by percent', async ({ page }) => {
    await page.goto('/resize-image/');
    await addFiles(page, [await makeImage(page, 'image/png', 'a.png', 1600, 1200)]);
    await page.getByLabel('Resize', { exact: true }).selectOption('percent');
    await page.getByLabel(/Scale/).fill('25');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([400, 300]);
  });

  test('hits a target size, turning PNG into WebP', async ({ page }) => {
    await page.goto('/resize-image/');
    await addFiles(page, [
      await makeImage(page, 'image/jpeg', 'a.jpg', 1600, 1200),
      await makeImage(page, 'image/png', 'b.png', 1600, 1200),
    ]);
    await page.getByLabel('Width (px)').fill('800');
    await page.getByLabel('Height (px)').fill('');
    await page.getByLabel(/Target file size/).fill('60');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();
    await expect(page.getByRole('button', { name: /Download all \(2\) as ZIP/ })).toBeVisible();
    const results = await readResults(page, 2);
    expect(results.map((r) => r.type)).toEqual(['image/jpeg', 'image/webp']);
    results.forEach((r) => expect(r.size).toBeLessThanOrEqual(60 * 1024));
  });

  test('reports an unreachable target instead of failing silently', async ({ page }) => {
    await page.goto('/resize-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'a.jpg', 1600, 1200)]);
    await page.getByLabel(/Target file size/).fill('1');
    await page.getByRole('button', { name: 'Resize', exact: true }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Could not get under 1 KB' })).toBeVisible();
  });
});

test.describe('convert', () => {
  test('converts to JPG', async ({ page }) => {
    await page.goto('/convert-image/');
    await addFiles(page, [
      await makeImage(page, 'image/png', 'a.png'),
      await makeImage(page, 'image/webp', 'b.webp'),
    ]);
    await page.getByLabel('Format').selectOption('jpeg');
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const results = await readResults(page, 2);
    expect(results.map((r) => [r.name, r.type])).toEqual([
      ['a.jpg', 'image/jpeg'],
      ['b.jpg', 'image/jpeg'],
    ]);
  });

  test('converts to AVIF: a real AVIF file at the same pixel size', async ({ page }) => {
    await page.goto('/convert-image/');
    await addFiles(page, [await makeImage(page, 'image/png', 'a.png')]);
    await page.getByLabel('Format').selectOption('avif');
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const results = await readResults(page, 1);
    expect(results[0]).toMatchObject({ name: 'a.avif', type: 'image/avif', width: 1200, height: 800 });
    const bytes = await resultBytes(page, 0);
    expect(new TextDecoder().decode(bytes.subarray(4, 12))).toBe('ftypavif');
  });

  test('makes PDFs', async ({ page }) => {
    await page.goto('/convert-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'a.jpg'), await makeImage(page, 'image/png', 'b.png')]);
    await page.getByLabel('Format').selectOption('pdf');
    await page.getByRole('button', { name: 'Convert', exact: true }).click();
    const results = await readResults(page, 2);
    expect(results.map((r) => r.name)).toEqual(['a.pdf', 'b.pdf']);
    results.forEach((r) => expect(r.head).toBe('%PDF-'));
  });
});
