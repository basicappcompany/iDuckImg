import { expect, test, type Page } from '@playwright/test';
import { addFiles, readResults, resultBytes } from './helpers';

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

test.describe('merge images', () => {
  test('joins two pictures side by side at the smallest height, in the order shown', async ({ page }) => {
    await page.goto('/merge-images/');
    await addFiles(page, [await solid(page, 'red.png', 400, 200, '#ff0000'), await solid(page, 'blue.png', 300, 300, '#0000ff')], /\d+ pictures?/);
    const join = page.getByRole('button', { name: 'Join pictures', exact: true });
    await expect(join).toBeEnabled();
    await join.click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('merged.png');
    expect([r!.width, r!.height]).toEqual([600, 200]); // 400 + (300 scaled to 200) by 200
    const bytes = await resultBytes(page, 0);
    expect(await pixelAt(page, bytes, 100, 100)).toEqual([255, 0, 0, 255]);
    expect(await pixelAt(page, bytes, 500, 100)).toEqual([0, 0, 255, 255]);
  });

  test('moving a picture down swaps the order, and a column with a gap adds up the heights', async ({ page }) => {
    await page.goto('/merge-images/');
    await addFiles(page, [await solid(page, 'red.png', 200, 100, '#ff0000'), await solid(page, 'blue.png', 200, 100, '#0000ff')], /\d+ pictures?/);
    await page.getByRole('button', { name: 'Move red.png down' }).click();
    await page.getByLabel('Arrange').selectOption('column');
    await page.getByLabel('Space between').fill('20');
    await page.getByLabel('Background').selectOption('black');
    await page.getByRole('button', { name: 'Join pictures', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([200, 220]);
    const bytes = await resultBytes(page, 0);
    expect(await pixelAt(page, bytes, 100, 50)).toEqual([0, 0, 255, 255]); // blue is first now
    expect(await pixelAt(page, bytes, 100, 110)).toEqual([0, 0, 0, 255]); // the gap
    expect(await pixelAt(page, bytes, 100, 170)).toEqual([255, 0, 0, 255]);
  });

  test('needs two pictures', async ({ page }) => {
    await page.goto('/merge-images/');
    await addFiles(page, [await solid(page, 'one.png', 100, 100, '#00ff00')], /\d+ pictures?/);
    await expect(page.getByRole('button', { name: 'Join pictures', exact: true })).toBeDisabled();
  });
});

test.describe('blur or hide', () => {
  test('a box added by number covers just that area', async ({ page }) => {
    await page.goto('/blur-image/');
    await addFiles(page, [await solid(page, 'card.png', 400, 300, '#ffcc00')]);
    const run = page.getByRole('button', { name: /Blur the boxes|Hide the boxes|Pixelate the boxes/ });
    await expect(run).toBeDisabled();
    await page.getByRole('button', { name: 'Add a box in the middle' }).click();
    await page.getByLabel('What to do with the boxes').selectOption('cover');
    await page.getByRole('button', { name: 'Hide the boxes' }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('card-hidden.png');
    expect([r!.width, r!.height]).toEqual([400, 300]);
    const bytes = await resultBytes(page, 0);
    expect(await pixelAt(page, bytes, 200, 150)).toEqual([0, 0, 0, 255]); // inside the middle box
    expect(await pixelAt(page, bytes, 10, 10)).toEqual([255, 204, 0, 255]); // untouched corner
  });

  test('dragging on the picture draws a box that can be removed', async ({ page }) => {
    await page.goto('/blur-image/');
    await addFiles(page, [await solid(page, 'p.png', 400, 300, '#336699')]);
    const surface = page.getByTestId('draw-surface');
    // The mouse works in window coordinates, so make sure the picture is on screen before measuring it.
    await surface.scrollIntoViewIfNeeded();
    const box = (await surface.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.5, { steps: 5 });
    await page.mouse.up();
    await expect(page.getByText('Box 1', { exact: true })).toBeVisible();
    const left = page.getByLabel('Box 1 Left (%)');
    expect(Number(await left.inputValue())).toBeGreaterThan(15);
    expect(Number(await left.inputValue())).toBeLessThan(25);
    await page.getByRole('button', { name: 'Remove box 1' }).click();
    await expect(page.getByText('Box 1', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Blur the boxes/ })).toBeDisabled();
  });

  test('blur changes the box and leaves the rest', async ({ page }) => {
    await page.goto('/blur-image/');
    // A two-tone picture: left half white, right half black. A blur in the middle softens the edge.
    const c = await page.evaluate(async () => {
      const cv = document.createElement('canvas');
      cv.width = 400;
      cv.height = 200;
      const ctx = cv.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#000';
      ctx.fillRect(200, 0, 200, 200);
      const blob: Blob = await new Promise((r) => cv.toBlob((b) => r(b!), 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return btoa(s);
    });
    await addFiles(page, [{ name: 'edge.png', mimeType: 'image/png', buffer: Buffer.from(c, 'base64') }]);
    await page.getByRole('button', { name: 'Add a box in the middle' }).click();
    await page.getByRole('button', { name: 'Blur the boxes' }).click();
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('edge-blurred.png');
    const bytes = await resultBytes(page, 0);
    const near = await pixelAt(page, bytes, 195, 100); // just left of the edge, inside the box
    expect(near[0]).toBeLessThan(250); // no longer pure white
    expect((await pixelAt(page, bytes, 5, 100))[0]).toBe(255); // far left untouched
    expect((await pixelAt(page, bytes, 395, 100))[0]).toBe(0);
  });
});
