import { expect, test, type Page } from '@playwright/test';
import { addFiles, readResults, type TestImage } from './helpers';

/** 40x20 PNG: top-left red, top-right green, bottom-left blue, bottom-right yellow. */
async function quadrants(page: Page): Promise<TestImage> {
  const base64 = await page.evaluate(async () => {
    const c = document.createElement('canvas');
    c.width = 40;
    c.height = 20;
    const x = c.getContext('2d')!;
    const fill = (color: string, px: number, py: number) => {
      x.fillStyle = color;
      x.fillRect(px, py, 20, 10);
    };
    fill('#ff0000', 0, 0);
    fill('#00c800', 20, 0);
    fill('#0000ff', 0, 10);
    fill('#ffff00', 20, 10);
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    return btoa(String.fromCharCode(...bytes));
  });
  return { name: 'q.png', mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') };
}

/** Colour names at the four corners of the first result: [topLeft, topRight, bottomLeft, bottomRight]. */
async function corners(page: Page): Promise<{ size: [number, number]; colors: string[] }> {
  const link = page.getByRole('region', { name: 'Results' }).locator('a[download]').first();
  await expect(link).toBeVisible();
  return link.evaluate(async (a) => {
    const blob = await (await fetch((a as HTMLAnchorElement).href)).blob();
    const bmp = await createImageBitmap(blob);
    const c = new OffscreenCanvas(bmp.width, bmp.height);
    const ctx = c.getContext('2d')!;
    ctx.drawImage(bmp, 0, 0);
    const name = (r: number, g: number, b: number) =>
      r > 200 && g < 60 && b < 60 ? 'red' : g > 150 && r < 60 && b < 60 ? 'green' : b > 200 && r < 60 && g < 60 ? 'blue' : r > 200 && g > 200 && b < 60 ? 'yellow' : `?${r},${g},${b}`;
    const at = (x: number, y: number) => {
      const d = ctx.getImageData(x, y, 1, 1).data;
      return name(d[0]!, d[1]!, d[2]!);
    };
    const w = bmp.width;
    const h = bmp.height;
    return {
      size: [w, h] as [number, number],
      colors: [at(2, 2), at(w - 3, 2), at(2, h - 3), at(w - 3, h - 3)],
    };
  });
}

async function apply(page: Page, steps: string[]): Promise<void> {
  await page.goto('/rotate-image/');
  await addFiles(page, [await quadrants(page)]);
  for (const step of steps) await page.getByRole('button', { name: step, exact: true }).click();
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
}

test.describe('rotate and flip', () => {
  test('rotate right moves corners clockwise and swaps the size', async ({ page }) => {
    await apply(page, ['Rotate right']);
    expect(await corners(page)).toEqual({ size: [20, 40], colors: ['blue', 'red', 'yellow', 'green'] });
  });

  test('rotate left moves corners anticlockwise', async ({ page }) => {
    await apply(page, ['Rotate left']);
    expect(await corners(page)).toEqual({ size: [20, 40], colors: ['green', 'yellow', 'red', 'blue'] });
  });

  test('flip horizontal mirrors left and right', async ({ page }) => {
    await apply(page, ['Flip horizontal']);
    expect(await corners(page)).toEqual({ size: [40, 20], colors: ['green', 'red', 'yellow', 'blue'] });
  });

  test('flip vertical mirrors top and bottom', async ({ page }) => {
    await apply(page, ['Flip vertical']);
    expect(await corners(page)).toEqual({ size: [40, 20], colors: ['blue', 'yellow', 'red', 'green'] });
  });

  test('a flip after a rotation acts on what you see, not on the original', async ({ page }) => {
    // After rotate right the picture is [blue red / yellow green]; mirroring that left-to-right
    // gives [red blue / green yellow].
    await apply(page, ['Rotate right', 'Flip horizontal']);
    expect(await corners(page)).toEqual({ size: [20, 40], colors: ['red', 'blue', 'green', 'yellow'] });
  });

  test('Apply is disabled until something changes, and Reset restores that', async ({ page }) => {
    await page.goto('/rotate-image/');
    await addFiles(page, [await quadrants(page)]);
    const applyButton = page.getByRole('button', { name: 'Apply', exact: true });
    await expect(applyButton).toBeDisabled();
    await page.getByRole('button', { name: 'Rotate right', exact: true }).click();
    await expect(applyButton).toBeEnabled();
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(applyButton).toBeDisabled();
  });

  test('works on JPG and keeps the proportions swapped', async ({ page }) => {
    await page.goto('/rotate-image/');
    const base64 = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 300;
      c.height = 200;
      c.getContext('2d')!.fillRect(0, 0, 300, 200);
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.9));
      return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
    });
    await addFiles(page, [{ name: 'a.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(base64, 'base64') }]);
    await page.getByRole('button', { name: 'Rotate right', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.name, r!.type, r!.width, r!.height]).toEqual(['a-rotated.jpg', 'image/jpeg', 200, 300]);
  });
});
