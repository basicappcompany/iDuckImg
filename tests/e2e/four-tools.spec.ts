import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';

/** A flat picture of one colour, so every pixel that differs afterwards came from the tool. */
async function flatImage(page: Page, name: string, width: number, height: number, colour = '#c05621') {
  const base64 = await page.evaluate(
    async ({ width, height, colour }) => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = colour;
      ctx.fillRect(0, 0, width, height);
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    },
    { width, height, colour },
  );
  return { name, mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') };
}

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

async function ready(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
}

test.describe('adjust colours and filters', () => {
  test('needs a change, then black and white makes every channel equal', async ({ page }) => {
    await ready(page, '/adjust-image-colors/');
    await addFiles(page, [await flatImage(page, 'flat.png', 120, 80)]);
    const apply = page.getByRole('button', { name: 'Apply', exact: true });
    await expect(apply).toBeDisabled();
    await page.getByLabel('Filter').selectOption('grayscale');
    await expect(apply).toBeEnabled();
    await apply.click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('flat-edited.png');
    expect([r!.width, r!.height]).toEqual([120, 80]);
    expect(await pixelAt(page, await resultBytes(page, 0), 60, 40)).toEqual([112, 112, 112, 255]);
  });

  test('brightness up makes it lighter, and the preview changes before you press anything', async ({ page }) => {
    await ready(page, '/adjust-image-colors/');
    await addFiles(page, [await flatImage(page, 'flat.png', 120, 80, '#646464')]);
    const preview = page.getByRole('img', { name: 'Preview with the changes' });
    const red = () => preview.evaluate((c: HTMLCanvasElement) => c.getContext('2d')!.getImageData(5, 5, 1, 1).data[0]!);
    await expect.poll(red).toBe(100);
    await page.getByLabel('Brightness').fill('50');
    await expect.poll(red).toBeGreaterThan(200);
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.size).toBeGreaterThan(0);
    expect((await pixelAt(page, await resultBytes(page, 0), 10, 10))[0]).toBeGreaterThan(200);
  });
});

test.describe('add a border', () => {
  test('adds a white border around a picture, grows it, and leaves the middle alone', async ({ page }) => {
    await ready(page, '/add-border-to-image/');
    await addFiles(page, [await flatImage(page, 'card.png', 200, 100)]);
    await page.getByLabel('Thickness').fill('10');
    await page.getByRole('button', { name: 'Add border', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('card-framed.png');
    expect([r!.width, r!.height]).toEqual([220, 120]); // 10% of the shorter side (100) = 10 px on each side
    const bytes = await resultBytes(page, 0);
    expect(await pixelAt(page, bytes, 2, 2)).toEqual([255, 255, 255, 255]);
    expect(await pixelAt(page, bytes, 217, 117)).toEqual([255, 255, 255, 255]);
    expect(await pixelAt(page, bytes, 110, 60)).toEqual([192, 86, 33, 255]);
  });

  test('a typed colour code is used, and a bad one is explained', async ({ page }) => {
    await ready(page, '/add-border-to-image/');
    await addFiles(page, [await flatImage(page, 'card.png', 200, 100)]);
    await page.getByLabel('Colour code').fill('#1e90ff');
    await page.getByRole('button', { name: 'Add border', exact: true }).click();
    await readResults(page, 1);
    expect(await pixelAt(page, await resultBytes(page, 0), 2, 2)).toEqual([30, 144, 255, 255]);
    await page.getByLabel('Colour code').fill('blue');
    await expect(page.getByRole('alert')).toContainText('#1e90ff');
  });

  test('a see-through border turns a JPG into a PNG with a clear corner', async ({ page }) => {
    await ready(page, '/add-border-to-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'card.jpg', 200, 100)]);
    await page.getByLabel('Colour', { exact: true }).selectOption('transparent');
    await page.getByRole('button', { name: 'Add border', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('card-framed.png');
    expect(r!.type).toBe('image/png');
    expect((await pixelAt(page, await resultBytes(page, 0), 2, 2))[3]).toBe(0);
  });
});

test.describe('pixel, cm and inch converter', () => {
  test('1 cm at 300 DPI, and A4 in pixels', async ({ page }) => {
    await ready(page, '/pixel-to-cm-converter/');
    await page.getByLabel('Length', { exact: true }).fill('1');
    await page.getByLabel('Unit').selectOption('cm');
    const result = page.getByRole('region', { name: 'Result' });
    await expect(result.locator('[data-unit="px"]')).toHaveText('118.11');
    await expect(result.locator('[data-unit="mm"]')).toHaveText('10');
    await expect(result.locator('[data-unit="in"]')).toHaveText('0.39');
    await expect(page.getByRole('region', { name: 'Common sizes' })).toContainText('A4');
    await expect(page.getByRole('region', { name: 'Common sizes' })).toContainText('2480 x 3508 px');
  });

  test('the DPI changes the pixels, and bad input is explained', async ({ page }) => {
    await ready(page, '/pixel-to-cm-converter/');
    await page.getByLabel('Length', { exact: true }).fill('1200');
    await page.getByLabel('Resolution (DPI)').selectOption('72');
    await expect(page.getByRole('region', { name: 'Result' }).locator('[data-unit="in"]')).toHaveText('16.67');
    await page.getByLabel('Resolution (DPI)').selectOption('custom');
    await page.getByLabel('Your DPI').fill('100');
    await expect(page.getByRole('region', { name: 'Result' }).locator('[data-unit="in"]')).toHaveText('12');
    await page.getByLabel('Length', { exact: true }).fill('');
    await expect(page.getByRole('region', { name: 'Result' }).getByRole('alert')).toBeVisible();
  });
});

test.describe('aspect ratio calculator', () => {
  test('finds 16:9, and says when a size is only close to one', async ({ page }) => {
    await ready(page, '/aspect-ratio-calculator/');
    const out = page.getByTestId('ratio-result');
    await expect(out).toContainText('16:9');
    await page.getByLabel('Width (px)', { exact: true }).fill('1366');
    await page.getByLabel('Height (px)', { exact: true }).fill('768');
    await expect(out).toContainText('683:384');
    await expect(out).toContainText('very close to 16:9');
    await page.getByLabel('Height (px)', { exact: true }).fill('0');
    await expect(out.getByRole('alert')).toBeVisible();
  });

  test('keeps a ratio when either side changes', async ({ page }) => {
    await ready(page, '/aspect-ratio-calculator/');
    await page.getByRole('button', { name: '4:3', exact: true }).click();
    await page.getByLabel('New width (px)').fill('1000');
    await expect(page.getByLabel('New height (px)')).toHaveValue('750');
    await page.getByLabel('New height (px)').fill('300');
    await expect(page.getByLabel('New width (px)')).toHaveValue('400');
    await page.getByLabel('Ratio', { exact: true }).fill('1.91:1');
    await page.getByLabel('New width (px)').fill('1200');
    await expect(page.getByLabel('New height (px)')).toHaveValue('628');
  });
});
