import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';

/** A flat PNG of one colour, made in the browser so no fixture files are needed. */
async function solid(page: Page, name: string, width: number, height: number, colour: string) {
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

test.describe('add a logo', () => {
  test('needs a logo, then puts it in the chosen corner only', async ({ page }) => {
    await page.goto('/add-logo-to-image/');
    await addFiles(page, [await solid(page, 'dark.png', 800, 600, '#101820')]);
    const apply = page.getByRole('button', { name: 'Add logo', exact: true });
    await expect(apply).toBeDisabled();

    await page.getByLabel('Your logo').setInputFiles(await solid(page, 'logo.png', 200, 100, '#ff0000'));
    await page.getByLabel('Opacity').fill('100');
    await expect(apply).toBeEnabled();
    await apply.click();

    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('dark-with-logo.png');
    expect([r!.width, r!.height]).toEqual([800, 600]);
    const bytes = await resultBytes(page, 0);
    // 20% of 800 = 160 wide, 80 high, 3% of 600 = 18 from the bottom right corner.
    expect(await pixelAt(page, bytes, 800 - 18 - 80, 600 - 18 - 40)).toEqual([255, 0, 0, 255]);
    expect(await pixelAt(page, bytes, 20, 20)).toEqual([16, 24, 32, 255]);
    expect(await pixelAt(page, bytes, 400, 300)).toEqual([16, 24, 32, 255]);
  });

  test('repeat covers the picture and a JPG stays a JPG', async ({ page }) => {
    await page.goto('/add-logo-to-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 900, 600)]);
    await page.getByLabel('Your logo').setInputFiles(await solid(page, 'logo.png', 100, 100, '#00ff00'));
    await page.getByLabel('Position').selectOption('tile');
    await page.getByRole('button', { name: 'Add logo', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.type).toBe('image/jpeg');
    expect(r!.name).toBe('photo-with-logo.jpg');
  });

  test('refuses a logo that is not a picture', async ({ page }) => {
    await page.goto('/add-logo-to-image/');
    await addFiles(page, [await solid(page, 'dark.png', 400, 300, '#101820')]);
    await page.getByLabel('Your logo').setInputFiles({ name: 'logo.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
    await expect(page.getByRole('alert')).toContainText('PNG, JPG or WebP');
    await expect(page.getByRole('button', { name: 'Add logo', exact: true })).toBeDisabled();
  });

  test('the preview shows the logo before you press the button', async ({ page }) => {
    await page.goto('/add-logo-to-image/');
    await addFiles(page, [await solid(page, 'dark.png', 800, 600, '#101820')]);
    const canvas = page.getByRole('img', { name: 'Preview with the logo' });
    const bright = () =>
      canvas.evaluate((c: HTMLCanvasElement) => {
        const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
        let n = 0;
        for (let i = 0; i < d.length; i += 4) if (d[i]! > 150) n++;
        return n;
      });
    await expect.poll(bright).toBe(0);
    await page.getByLabel('Your logo').setInputFiles(await solid(page, 'logo.png', 200, 100, '#ff0000'));
    await expect.poll(bright).toBeGreaterThan(0);
  });
});
