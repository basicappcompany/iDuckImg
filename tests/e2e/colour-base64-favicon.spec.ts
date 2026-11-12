import { fileURLToPath } from 'node:url';
import { expect, test, type Page } from '@playwright/test';
import { addFiles, readResults, resultBytes } from './helpers';

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));

/** A picture split in two: the left half one colour, the right half another. */
async function twoTone(page: Page, name: string, width: number, height: number, left: string, right: string) {
  const base64 = await page.evaluate(
    async ({ width, height, left, right }) => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, width / 2, height);
      ctx.fillStyle = right;
      ctx.fillRect(width / 2, 0, width / 2, height);
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    },
    { width, height, left, right },
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

test.describe('colour picker', () => {
  test('previews on hover, picks on click, and keeps the picked colours', async ({ page }) => {
    await ready(page, '/color-picker-from-image/');
    await addFiles(page, [await twoTone(page, 'two.png', 200, 100, '#ff0000', '#0000ff')]);
    const surface = page.getByTestId('pick-surface');
    await expect(surface).toHaveAttribute('data-ready', 'true');
    await surface.scrollIntoViewIfNeeded();
    const box = (await surface.boundingBox())!;
    const hex = page.locator('[data-value="HEX"]');

    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2);
    await expect(hex).toHaveText('#FF0000');
    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
    await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
    await expect(hex).toHaveText('#0000FF');
    await expect(page.locator('[data-value="RGB"]')).toHaveText('rgb(0, 0, 255)');
    await expect(page.locator('[data-value="HSL"]')).toHaveText('hsl(240, 100%, 50%)');
    await page.mouse.move(box.x - 50, box.y - 50); // leave the picture: the picked colour stays
    await expect(hex).toHaveText('#0000FF');

    await expect(page.getByRole('button', { name: 'Show #FF0000' })).toBeVisible();
    await page.getByRole('button', { name: 'Show #FF0000' }).click();
    await expect(hex).toHaveText('#FF0000');
  });

  test('works from the keyboard', async ({ page }) => {
    await ready(page, '/color-picker-from-image/');
    await addFiles(page, [await twoTone(page, 'two.png', 200, 100, '#ff0000', '#0000ff')]);
    const surface = page.getByTestId('pick-surface');
    await expect(surface).toHaveAttribute('data-ready', 'true');
    await surface.focus();
    // Starts in the middle (x = 100, the first blue column); Left moves onto red.
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[data-value="HEX"]')).toHaveText('#FF0000');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Shift+ArrowRight');
    await expect(page.locator('[data-value="HEX"]')).toHaveText('#0000FF');
    await expect(page.getByRole('button', { name: 'Show #FF0000' })).toBeVisible();
  });

  test('says when a pixel is see-through', async ({ page }) => {
    await ready(page, '/color-picker-from-image/');
    const base64 = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 100;
      c.height = 50;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(0, 0, 50, 50); // the right half stays transparent
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    });
    await addFiles(page, [{ name: 'half.png', mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') }]);
    await expect(page.getByTestId('pick-surface')).toHaveAttribute('data-ready', 'true');
    await page.getByTestId('pick-surface').scrollIntoViewIfNeeded();
    const box = (await page.getByTestId('pick-surface').boundingBox())!;
    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
    await expect(page.getByText(/This pixel is/)).toHaveCount(0);
    await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
    await expect(page.getByText(/This pixel is fully see-through/)).toBeVisible();
  });
});

test.describe('colour palette', () => {
  test('finds the two colours with their shares and copies a list', async ({ page }) => {
    await ready(page, '/color-palette-generator/');
    await addFiles(page, [await twoTone(page, 'two.png', 200, 100, '#ff0000', '#0000ff')]);
    const swatches = page.getByTestId('swatches').locator('li');
    await expect(swatches).toHaveCount(2);
    await expect(page.getByTestId('swatches')).toContainText('#FF0000');
    await expect(page.getByTestId('swatches')).toContainText('#0000FF');
    await expect(page.getByTestId('swatches')).toContainText('50%');
    await page.getByRole('button', { name: 'Copy all as a list' }).click();
    await expect(page.getByRole('status').filter({ hasText: /Copied the list|Could not copy/ })).toBeVisible();
  });

  test('the slider asks for more colours from a varied picture', async ({ page }) => {
    await ready(page, '/color-palette-generator/');
    const gradient = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 240;
      c.height = 60;
      const ctx = c.getContext('2d')!;
      for (let i = 0; i < 240; i++) {
        ctx.fillStyle = `hsl(${i * 1.5},80%,50%)`;
        ctx.fillRect(i, 0, 1, 60);
      }
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    });
    await addFiles(page, [{ name: 'rainbow.png', mimeType: 'image/png', buffer: Buffer.from(gradient, 'base64') }]);
    const items = page.getByTestId('swatches').locator('li');
    await expect(items).toHaveCount(6);
    await page.getByLabel('Number of colours').fill('3');
    await expect(items).toHaveCount(3);
    await page.getByLabel('Number of colours').fill('12');
    await expect(items).toHaveCount(12);
  });
});

test.describe('image to Base64', () => {
  test('encodes a picture as a data URI, in each format, and the SVG stays an SVG', async ({ page }) => {
    await ready(page, '/image-to-base64/');
    await addFiles(page, [await twoTone(page, 'two.png', 20, 10, '#ff0000', '#0000ff')]);
    const out = page.locator('#b64-out');
    await expect(out).toHaveValue(/^data:image\/png;base64,iVBOR/);
    await page.getByLabel('Format').selectOption('html');
    await expect(out).toHaveValue(/^<img src="data:image\/png;base64,/);
    await page.getByLabel('Format').selectOption('base64');
    await expect(out).toHaveValue(/^iVBOR/);

    await page.getByLabel('Choose files').setInputFiles(fixture('half-red.svg'));
    await page.getByLabel('Format').selectOption('datauri');
    await expect(out).toHaveValue(/^data:image\/svg\+xml;base64,/);
    expect(Buffer.from((await out.inputValue()).split(',')[1]!, 'base64').toString()).toContain('<svg');
  });

  test('decodes pasted text back to a picture, and explains bad text', async ({ page }) => {
    await ready(page, '/image-to-base64/');
    await addFiles(page, [await twoTone(page, 'two.png', 20, 10, '#ff0000', '#0000ff')]);
    const uri = await page.locator('#b64-out').inputValue();

    await page.getByRole('button', { name: 'Base64 to image' }).click();
    await page.getByLabel('Base64 text').fill(uri);
    const img = page.getByRole('img', { name: 'The decoded picture' });
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((i: HTMLImageElement) => `${i.naturalWidth}x${i.naturalHeight}`)).toBe('20x10');
    await expect(page.getByRole('link', { name: 'Download image.png' })).toBeVisible();

    await page.getByLabel('Base64 text').fill('this is not base64!!');
    await expect(page.getByRole('alert')).toContainText('not valid Base64');
    await expect(img).toHaveCount(0);
    await page.getByLabel('Base64 text').fill('SGVsbG8gd29ybGQ=');
    await expect(page.getByRole('alert')).toContainText('not to a picture');
  });
});

test.describe('favicon generator', () => {
  test('makes the six files at the right sizes, with a real ICO', async ({ page }) => {
    await ready(page, '/favicon-generator/');
    await addFiles(page, [await twoTone(page, 'logo.png', 300, 200, '#ff0000', '#0000ff')]);
    await expect(page.getByText(/smaller than 512 px/)).toBeVisible();
    await page.getByRole('button', { name: 'Make favicons', exact: true }).click();
    const results = await readResults(page, 6);
    expect(results.map((r) => r.name)).toEqual([
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
    ]);
    expect(results.slice(1).map((r) => [r.width, r.height])).toEqual([[16, 16], [32, 32], [180, 180], [192, 192], [512, 512]]);
    expect(results.slice(1).every((r) => r.type === 'image/png')).toBe(true);

    const ico = await resultBytes(page, 0);
    expect(Array.from(ico.slice(0, 6))).toEqual([0, 0, 1, 0, 3, 0]); // an icon file holding three pictures
    expect(Array.from(ico.slice(6, 8))).toEqual([16, 16]);
    // Cut to a square from the middle of 300 x 200: red on the left half, blue on the right.
    const png32 = await resultBytes(page, 2);
    expect(await pixelAt(page, png32, 4, 16)).toEqual([255, 0, 0, 255]);
    expect(await pixelAt(page, png32, 28, 16)).toEqual([0, 0, 255, 255]);
  });

  test('keep-all pads with see-through bars, and the code can be copied', async ({ page }) => {
    await ready(page, '/favicon-generator/');
    await addFiles(page, [await twoTone(page, 'logo.png', 300, 100, '#ff0000', '#0000ff')]);
    await page.getByLabel('If the picture is not square').selectOption('pad');
    await page.getByRole('button', { name: 'Make favicons', exact: true }).click();
    await readResults(page, 6);
    const png = await resultBytes(page, 3); // apple-touch-icon, 180 px
    expect((await pixelAt(page, png, 90, 5))[3]).toBe(0); // bar above
    expect((await pixelAt(page, png, 20, 90))).toEqual([255, 0, 0, 255]); // picture in the middle band
    await expect(page.getByRole('region', { name: 'Code for your page' })).toContainText('rel="apple-touch-icon"');
    await page.getByRole('button', { name: 'Copy the code' }).click();
    await expect(page.getByRole('status').filter({ hasText: /Copied|Could not copy/ })).toBeVisible();
  });

  test('takes one picture at a time', async ({ page }) => {
    await ready(page, '/favicon-generator/');
    await addFiles(page, [await twoTone(page, 'a.png', 100, 100, '#ff0000', '#0000ff')]);
    await page.getByLabel('Choose files').setInputFiles(await twoTone(page, 'b.png', 100, 100, '#00ff00', '#0000ff'));
    await expect(page.getByText('1 image selected.')).toBeVisible(); // the second picture replaced the first
    await expect(page.getByText('2 images selected.')).toHaveCount(0);
  });
});
