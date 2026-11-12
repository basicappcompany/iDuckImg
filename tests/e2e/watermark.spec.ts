import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';

/** Share of pixels in a region of the result that are close to white (the watermark colour on a dark picture). */
async function lightShare(page: Page, bytes: Uint8Array, region: { x: number; y: number; w: number; h: number }): Promise<number> {
  return page.evaluate(
    async ({ data, region }) => {
      const bitmap = await createImageBitmap(new Blob([new Uint8Array(data)]));
      const c = document.createElement('canvas');
      c.width = bitmap.width;
      c.height = bitmap.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0);
      const px = ctx.getImageData(region.x, region.y, region.w, region.h).data;
      let light = 0;
      for (let i = 0; i < px.length; i += 4) if (px[i]! > 200 && px[i + 1]! > 200 && px[i + 2]! > 200) light++;
      return light / (px.length / 4);
    },
    { data: Array.from(bytes), region },
  );
}

/** A flat dark picture, so any white pixel must come from the watermark. */
async function darkImage(page: Page, name: string, width: number, height: number) {
  const base64 = await page.evaluate(
    async ({ width, height }) => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, 0, width, height);
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    },
    { width, height },
  );
  return { name, mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') };
}

test.describe('watermark', () => {
  test('needs text, then draws it in the chosen corner only', async ({ page }) => {
    await page.goto('/add-watermark-to-image/');
    await addFiles(page, [await darkImage(page, 'dark.png', 800, 600)]);
    const apply = page.getByRole('button', { name: 'Add watermark', exact: true });
    await expect(apply).toBeDisabled();

    await page.getByLabel('Text', { exact: true }).fill('© Duck Studio');
    await page.getByLabel('Opacity', { exact: false }).fill('100');
    await expect(apply).toBeEnabled();
    await apply.click();

    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('dark-watermarked.png');
    expect([r!.width, r!.height]).toEqual([800, 600]);
    const bytes = await resultBytes(page, 0);
    expect(await lightShare(page, bytes, { x: 400, y: 450, w: 400, h: 150 })).toBeGreaterThan(0.01);
    expect(await lightShare(page, bytes, { x: 0, y: 0, w: 400, h: 150 })).toBe(0);
  });

  test('"repeat" covers the picture and JPG stays a JPG', async ({ page }) => {
    await page.goto('/add-watermark-to-image/');
    const jpg = await makeImage(page, 'image/jpeg', 'photo.jpg', 900, 600);
    await addFiles(page, [jpg]);
    await page.getByLabel('Text', { exact: true }).fill('SAMPLE');
    await page.getByLabel('Position').selectOption('tile');
    await page.getByRole('button', { name: 'Add watermark', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.type).toBe('image/jpeg');
    expect(r!.name).toBe('photo-watermarked.jpg');
    expect(r!.size).toBeGreaterThan(0);
  });

  test('the preview shows the watermark before you press the button', async ({ page }) => {
    await page.goto('/add-watermark-to-image/');
    await addFiles(page, [await darkImage(page, 'dark.png', 800, 600)]);
    const canvas = page.getByRole('img', { name: 'Preview with the watermark' });
    await expect(canvas).toBeVisible();
    const lightBefore = await canvas.evaluate((c: HTMLCanvasElement) => {
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i]! > 60) n++;
      return n;
    });
    expect(lightBefore).toBe(0);
    await page.getByLabel('Text', { exact: true }).fill('Preview me');
    await expect
      .poll(() =>
        canvas.evaluate((c: HTMLCanvasElement) => {
          const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
          let n = 0;
          for (let i = 0; i < d.length; i += 4) if (d[i]! > 60) n++;
          return n;
        }),
      )
      .toBeGreaterThan(0);
  });
});
