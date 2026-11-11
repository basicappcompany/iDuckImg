import { expect, test } from '@playwright/test';
import { addFiles, makeImage, readResults, resultBytes } from './helpers';
import { MAKE_MARKER, buildTiff, concat, exifApp1, indexOfBytes, injectAfterSoi, pngChunk } from '../helpers/exif-builders';

const run = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: 'Remove metadata', exact: true }).click();

test.describe('remove EXIF data', () => {
  test('strips EXIF and GPS from a JPG without recompressing it', async ({ page }) => {
    await page.goto('/remove-exif-data/');
    const plain = await makeImage(page, 'image/jpeg', 'photo.jpg', 600, 400);
    const withExif = injectAfterSoi(new Uint8Array(plain.buffer), exifApp1(buildTiff({ orientation: 1 })));
    expect(indexOfBytes(withExif, MAKE_MARKER)).toBeGreaterThan(0);

    await addFiles(page, [{ ...plain, buffer: Buffer.from(withExif) }]);
    await run(page);
    const [info] = await readResults(page, 1);
    const out = await resultBytes(page, 0);

    expect(info!.name).toBe('photo-clean.jpg');
    expect([info!.width, info!.height]).toEqual([600, 400]);
    expect(indexOfBytes(out, 'Exif')).toBe(-1);
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
    // Not recompressed: exactly the original picture bytes, minus the EXIF segment.
    expect(Array.from(out)).toEqual(Array.from(new Uint8Array(plain.buffer)));
  });

  test('keeps a sideways-stored JPG upright by applying its rotation tag', async ({ page }) => {
    await page.goto('/remove-exif-data/');
    const plain = await makeImage(page, 'image/jpeg', 'phone.jpg', 600, 400);
    // Orientation 6 means "rotate 90 degrees clockwise to display", so it shows as 400x600.
    const withExif = injectAfterSoi(new Uint8Array(plain.buffer), exifApp1(buildTiff({ orientation: 6 })));
    await addFiles(page, [{ ...plain, buffer: Buffer.from(withExif) }]);
    await run(page);
    const [info] = await readResults(page, 1);
    const out = await resultBytes(page, 0);

    expect([info!.width, info!.height]).toEqual([400, 600]);
    expect(indexOfBytes(out, 'Exif')).toBe(-1);
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
  });

  test('strips text and EXIF chunks from a PNG', async ({ page }) => {
    await page.goto('/remove-exif-data/');
    const plain = await makeImage(page, 'image/png', 'shot.png', 300, 200);
    const bytes = new Uint8Array(plain.buffer);
    // Insert metadata chunks right after IHDR (8 byte signature + 25 byte IHDR chunk).
    const extra = concat(
      pngChunk('tEXt', Array.from(`Author\0${MAKE_MARKER}`, (c) => c.charCodeAt(0))),
      pngChunk('eXIf', buildTiff()),
    );
    const withMeta = concat(bytes.subarray(0, 33), extra, bytes.subarray(33));
    expect(indexOfBytes(withMeta, MAKE_MARKER)).toBeGreaterThan(0);

    await addFiles(page, [{ ...plain, buffer: Buffer.from(withMeta) }]);
    await run(page);
    const [info] = await readResults(page, 1);
    const out = await resultBytes(page, 0);

    expect([info!.name, info!.type, info!.width, info!.height]).toEqual(['shot-clean.png', 'image/png', 300, 200]);
    expect(indexOfBytes(out, MAKE_MARKER)).toBe(-1);
    expect(indexOfBytes(out, 'eXIf')).toBe(-1);
  });

  test('handles a WebP and produces a file the browser can still decode', async ({ page }) => {
    await page.goto('/remove-exif-data/');
    await addFiles(page, [await makeImage(page, 'image/webp', 'pic.webp', 300, 200)]);
    await run(page);
    const [info] = await readResults(page, 1);
    expect([info!.name, info!.type, info!.width, info!.height]).toEqual(['pic-clean.webp', 'image/webp', 300, 200]);
  });

  test('reports a corrupt file instead of failing silently', async ({ page }) => {
    await page.goto('/remove-exif-data/');
    await addFiles(page, [{ name: 'broken.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('not really a jpeg') }]);
    await run(page);
    await expect(page.getByRole('alert').filter({ hasText: 'broken.jpg' })).toBeVisible();
  });
});
