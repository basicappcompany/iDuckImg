import { expect, test, type Page } from '@playwright/test';
import { readResults, resultBytes, type TestImage } from './helpers';

/** 400x200 PNG: top-left red, top-right green, bottom-left blue, bottom-right yellow. */
async function quadrants(page: Page): Promise<TestImage> {
  const base64 = await page.evaluate(async () => {
    const c = document.createElement('canvas');
    c.width = 400;
    c.height = 200;
    const x = c.getContext('2d')!;
    for (const [color, px, py] of [
      ['#ff0000', 0, 0],
      ['#00c800', 200, 0],
      ['#0000ff', 0, 100],
      ['#ffff00', 200, 100],
    ] as const) {
      x.fillStyle = color;
      x.fillRect(px, py, 200, 100);
    }
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/png'));
    return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
  });
  return { name: 'q.png', mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') };
}

async function open(page: Page, image: TestImage) {
  await page.goto('/crop-image/');
  await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
  await page.getByLabel('Choose files').setInputFiles(image);
  await expect(page.getByTestId('crop-box')).toBeVisible();
}

const field = (page: Page, id: 'x' | 'y' | 'width' | 'height') => page.locator(`#crop-${id}`);
const read = async (page: Page) => ({
  x: Number(await field(page, 'x').inputValue()),
  y: Number(await field(page, 'y').inputValue()),
  width: Number(await field(page, 'width').inputValue()),
  height: Number(await field(page, 'height').inputValue()),
});

/** Colour name of the pixel at (x, y) of the first result. */
async function colourAt(page: Page, x: number, y: number): Promise<string> {
  const link = page.getByRole('region', { name: 'Results' }).locator('a[download]').first();
  return link.evaluate(
    async (a, [px, py]) => {
      const bmp = await createImageBitmap(await (await fetch((a as HTMLAnchorElement).href)).blob());
      const ctx = new OffscreenCanvas(bmp.width, bmp.height).getContext('2d')!;
      ctx.drawImage(bmp, 0, 0);
      const d = ctx.getImageData(px!, py!, 1, 1).data;
      const [r, g, b] = [d[0]!, d[1]!, d[2]!];
      return r > 200 && g < 60 && b < 60 ? 'red' : g > 150 && r < 60 && b < 60 ? 'green' : b > 200 && r < 60 && g < 60 ? 'blue' : r > 200 && g > 200 && b < 60 ? 'yellow' : `?${r},${g},${b}`;
    },
    [x, y],
  );
}

test.describe('crop', () => {
  // Playwright's mouse works in viewport coordinates, so the crop area (below the page header and
  // the quick answer) must be on screen. A tall viewport keeps all of it visible.
  test.use({ viewport: { width: 1280, height: 1500 } });

  test('starts with a box over the middle of the picture', async ({ page }) => {
    await open(page, await quadrants(page));
    expect(await read(page)).toEqual({ x: 40, y: 20, width: 320, height: 160 });
    await expect(page.getByText('q.png (400 x 200 px)')).toBeVisible();
  });

  test('typing exact numbers crops exactly that part (top-right quadrant is green)', async ({ page }) => {
    await open(page, await quadrants(page));
    await field(page, 'width').fill('200');
    await field(page, 'height').fill('100');
    await field(page, 'x').fill('200');
    await field(page, 'y').fill('0');
    expect(await read(page)).toEqual({ x: 200, y: 0, width: 200, height: 100 });

    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.name, r!.type, r!.width, r!.height]).toEqual(['q-cropped.png', 'image/png', 200, 100]);
    // Every corner and the middle of the result is green: nothing from the other quadrants leaked in.
    for (const [x, y] of [[0, 0], [199, 0], [0, 99], [199, 99], [100, 50]] as const) {
      expect(await colourAt(page, x, y)).toBe('green');
    }
  });

  test('cropping the bottom-left quadrant gives blue, and the edge rows are exact', async ({ page }) => {
    await open(page, await quadrants(page));
    await field(page, 'width').fill('200');
    await field(page, 'height').fill('100');
    await field(page, 'x').fill('0');
    await field(page, 'y').fill('100');
    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    await readResults(page, 1);
    for (const [x, y] of [[0, 0], [199, 99], [100, 50]] as const) expect(await colourAt(page, x, y)).toBe('blue');
  });

  test('dragging the box moves it without resizing', async ({ page }) => {
    await open(page, await quadrants(page));
    const before = await read(page);
    const box = (await page.getByTestId('crop-box').boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 30, box.y + box.height / 2 + 10, { steps: 5 });
    await page.mouse.up();
    const after = await read(page);
    expect(after.width).toBe(before.width);
    expect(after.height).toBe(before.height);
    expect(after.x).toBeGreaterThan(before.x);
    expect(after.y).toBeGreaterThan(before.y);
    // The box stays inside the picture.
    expect(after.x + after.width).toBeLessThanOrEqual(400);
    expect(after.y + after.height).toBeLessThanOrEqual(200);
  });

  test('dragging a corner handle resizes, and cannot leave the picture', async ({ page }) => {
    await open(page, await quadrants(page));
    const handle = (await page.locator('[data-handle="se"]').boundingBox())!;
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await page.mouse.down();
    await page.mouse.move(handle.x + 800, handle.y + 800, { steps: 8 }); // far past the edge
    await page.mouse.up();
    const after = await read(page);
    expect(after.x).toBe(40);
    expect(after.y).toBe(20);
    expect(after.x + after.width).toBe(400);
    expect(after.y + after.height).toBe(200);
  });

  test('a ratio locks the shape, and dragging keeps it', async ({ page }) => {
    await open(page, await quadrants(page));
    await page.getByLabel('Shape').selectOption({ label: 'Square (1:1)' });
    let r = await read(page);
    expect(r.width).toBe(r.height);

    const handle = (await page.locator('[data-handle="se"]').boundingBox())!;
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await page.mouse.down();
    await page.mouse.move(handle.x - 20, handle.y - 30, { steps: 5 });
    await page.mouse.up();
    r = await read(page);
    expect(Math.abs(r.width - r.height)).toBeLessThanOrEqual(1);

    // Typing a width in a locked shape moves the height with it.
    await field(page, 'width').fill('100');
    r = await read(page);
    expect([r.width, r.height]).toEqual([100, 100]);
  });

  test('arrow keys nudge the box, Shift moves by ten', async ({ page }) => {
    await open(page, await quadrants(page));
    await page.getByTestId('crop-box').focus();
    await page.keyboard.press('ArrowLeft');
    expect((await read(page)).x).toBe(39);
    await page.keyboard.press('Shift+ArrowRight');
    expect((await read(page)).x).toBe(49);
    await page.keyboard.press('ArrowUp');
    expect((await read(page)).y).toBe(19);
  });

  test('Whole picture and Reset box buttons', async ({ page }) => {
    await open(page, await quadrants(page));
    await page.getByRole('button', { name: 'Whole picture' }).click();
    expect(await read(page)).toEqual({ x: 0, y: 0, width: 400, height: 200 });
    await page.getByRole('button', { name: 'Reset box' }).click();
    expect(await read(page)).toEqual({ x: 40, y: 20, width: 320, height: 160 });
  });

  test('a JPG stays a JPG', async ({ page }) => {
    await page.goto('/crop-image/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    const base64 = await page.evaluate(async () => {
      const c = document.createElement('canvas');
      c.width = 300;
      c.height = 200;
      c.getContext('2d')!.fillRect(0, 0, 300, 200);
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.9));
      return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
    });
    await page.getByLabel('Choose files').setInputFiles({ name: 'a.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(base64, 'base64') });
    await expect(page.getByTestId('crop-box')).toBeVisible();
    await field(page, 'width').fill('100');
    await field(page, 'height').fill('50');
    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.name, r!.type, r!.width, r!.height]).toEqual(['a-cropped.jpg', 'image/jpeg', 100, 50]);
    expect((await resultBytes(page, 0)).slice(0, 2)).toEqual(new Uint8Array([0xff, 0xd8]));
  });

  test('a broken picture is reported instead of leaving a dead tool', async ({ page }) => {
    await page.goto('/crop-image/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await page.getByLabel('Choose files').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not an image') });
    await expect(page.getByRole('alert').filter({ hasText: 'could not be shown' })).toBeVisible();
  });
});
