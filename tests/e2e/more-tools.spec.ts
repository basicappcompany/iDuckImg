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

/** RGBA of one pixel in a result file. */
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

test.describe('circle crop', () => {
  test('keeps the middle square and makes the corners see-through', async ({ page }) => {
    await page.goto('/circle-crop-image/');
    await addFiles(page, [await flatImage(page, 'me.png', 800, 600)]);
    await page.getByRole('button', { name: 'Make it round', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('me-circle.png');
    expect(r!.type).toBe('image/png');
    expect([r!.width, r!.height]).toEqual([600, 600]);
    const bytes = await resultBytes(page, 0);
    expect((await pixelAt(page, bytes, 2, 2))[3]).toBe(0); // a corner is empty
    expect((await pixelAt(page, bytes, 300, 300))[3]).toBe(255); // the middle is solid
  });

  test('rounded corners keep the whole picture size', async ({ page }) => {
    await page.goto('/circle-crop-image/');
    await addFiles(page, [await flatImage(page, 'wide.png', 800, 400)]);
    await page.getByLabel('Shape', { exact: true }).selectOption('rounded');
    await page.getByRole('button', { name: 'Make it round', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([800, 400]);
    const bytes = await resultBytes(page, 0);
    expect((await pixelAt(page, bytes, 1, 1))[3]).toBe(0);
    expect((await pixelAt(page, bytes, 400, 200))[3]).toBe(255);
  });
});

test.describe('split into a grid', () => {
  test('makes one numbered file per tile that together cover the picture', async ({ page }) => {
    await page.goto('/split-image-into-grid/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 900, 600)]);
    await page.getByLabel('Rows').fill('2');
    await page.getByLabel('Columns').fill('3');
    await page.getByRole('button', { name: 'Split into 6 tiles' }).click();
    const tiles = await readResults(page, 6);
    expect(tiles.map((t) => t.name)).toEqual([
      'photo-r1-c1.jpg', 'photo-r1-c2.jpg', 'photo-r1-c3.jpg',
      'photo-r2-c1.jpg', 'photo-r2-c2.jpg', 'photo-r2-c3.jpg',
    ]);
    for (const t of tiles) {
      expect(t.type).toBe('image/jpeg');
      expect([t.width, t.height]).toEqual([300, 300]);
    }
  });

  test('will not run with a single tile', async ({ page }) => {
    await page.goto('/split-image-into-grid/');
    await addFiles(page, [await makeImage(page, 'image/png', 'a.png', 300, 300)]);
    await page.getByLabel('Rows').fill('1');
    await page.getByLabel('Columns').fill('1');
    await expect(page.getByRole('button', { name: /Split into/ })).toBeDisabled();
  });
});

test.describe('pixel art', () => {
  test('averages blocks into flat colours at the same size', async ({ page }) => {
    await page.goto('/pixel-art-maker/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 800, 600)]);
    await page.getByLabel(/Big pixels across/).fill('8');
    await page.getByRole('button', { name: 'Make pixel art', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('photo-pixel.png');
    expect(r!.type).toBe('image/png');
    expect([r!.width, r!.height]).toEqual([800, 600]);
    const bytes = await resultBytes(page, 0);
    // 8 blocks across 800 px = 100 px blocks: every pixel inside one block has the same colour.
    const a = await pixelAt(page, bytes, 10, 10);
    const b = await pixelAt(page, bytes, 90, 90);
    expect(a).toEqual(b);
  });
});

test.describe('add text', () => {
  test('needs text, then writes it where you chose and not elsewhere', async ({ page }) => {
    await page.goto('/add-text-to-image/');
    await addFiles(page, [await flatImage(page, 'plain.png', 800, 600, '#101820')]);
    const run = page.getByRole('button', { name: 'Add text', exact: true });
    await expect(run).toBeDisabled();
    await page.getByLabel('Text', { exact: true }).fill('HELLO DUCK');
    await page.getByLabel('Panel behind the text').selectOption('none');
    await page.getByLabel('Position').selectOption('top-left');
    await expect(run).toBeEnabled();
    await run.click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('plain-text.png');
    expect([r!.width, r!.height]).toEqual([800, 600]);
    const bytes = await resultBytes(page, 0);
    const lightIn = (x0: number, y0: number, w: number, h: number) =>
      page.evaluate(
        async ({ data, x0, y0, w, h }) => {
          const bitmap = await createImageBitmap(new Blob([new Uint8Array(data)]));
          const c = document.createElement('canvas');
          c.width = bitmap.width;
          c.height = bitmap.height;
          const ctx = c.getContext('2d')!;
          ctx.drawImage(bitmap, 0, 0);
          const px = ctx.getImageData(x0, y0, w, h).data;
          let n = 0;
          for (let i = 0; i < px.length; i += 4) if (px[i]! > 200 && px[i + 1]! > 200) n++;
          return n;
        },
        { data: Array.from(bytes), x0, y0, w, h },
      );
    expect(await lightIn(0, 0, 400, 150)).toBeGreaterThan(50);
    expect(await lightIn(400, 300, 400, 300)).toBe(0);
  });
});
