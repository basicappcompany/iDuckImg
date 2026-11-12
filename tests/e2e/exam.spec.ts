import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage, readResults } from './helpers';

const kb = (bytes: number) => bytes / 1024;

/** A mostly white scan with a little ink, like a signature on paper: compresses to very little. */
async function signatureScan(page: Page, width = 900, height = 300) {
  const base64 = await page.evaluate(
    async ({ width, height }) => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const x = c.getContext('2d')!;
      x.fillStyle = '#fff';
      x.fillRect(0, 0, width, height);
      x.strokeStyle = '#111';
      x.lineWidth = 6;
      x.beginPath();
      x.moveTo(40, height * 0.7);
      for (let i = 1; i < 12; i++) x.lineTo(40 + i * 60, height * (i % 2 ? 0.25 : 0.75));
      x.stroke();
      const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.9));
      return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
    },
    { width, height },
  );
  return { name: 'sign.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(base64, 'base64') };
}

async function pick(page: Page, exam: string | RegExp, doc?: string) {
  await page.goto('/exam-photo-resizer/');
  await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
  await page.getByLabel('Exam', { exact: true }).selectOption({ label: String(exam) });
  if (doc) await page.getByLabel('Document').selectOption({ label: doc });
}

const make = (page: Page) => page.getByRole('button', { name: 'Make my file', exact: true }).click();

test.describe('exam photo resizer', () => {
  test('shows the requirements with a source link and the date it was read', async ({ page }) => {
    await pick(page, 'IBPS PO/MT (CRP PO/MT-XV)', 'Photograph');
    const card = page.getByRole('region', { name: 'Requirements' });
    await expect(card).toContainText('200 x 230 px, 20 to 50 KB, JPG');
    await expect(card.getByRole('link')).toHaveAttribute('href', /^https:\/\/www\.ibps\.in\/.*CRP-PO-XV\.pdf$/);
    await expect(card).toContainText('We read it on 2026-11-12');
    await expect(card).toContainText('Exam rules change');
  });

  test('IBPS photo: exact pixels and inside the KB window', async ({ page }) => {
    await pick(page, 'IBPS PO/MT (CRP PO/MT-XV)', 'Photograph');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'me.jpg', 1600, 1200)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect(r!.name).toBe('me-ibps-po-xv-photo.jpg');
    expect(r!.type).toBe('image/jpeg');
    expect([r!.width, r!.height]).toEqual([200, 230]);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(20);
    expect(kb(r!.size)).toBeLessThanOrEqual(50);
  });

  test('IBPS signature: a plain scan is padded up to the 10 KB minimum', async ({ page }) => {
    await pick(page, 'IBPS PO/MT (CRP PO/MT-XV)', 'Signature');
    await addFiles(page, [await signatureScan(page)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([140, 60]);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(10);
    expect(kb(r!.size)).toBeLessThanOrEqual(20);
  });

  test('IBPS declaration: 800 x 400 inside 50 to 100 KB, PNG input', async ({ page }) => {
    await pick(page, 'IBPS PO/MT (CRP PO/MT-XV)', 'Handwritten declaration');
    await addFiles(page, [await makeImage(page, 'image/png', 'decl.png', 1600, 900)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([800, 400]);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(50);
    expect(kb(r!.size)).toBeLessThanOrEqual(100);
  });

  test('SSC CGL signature keeps the picture size and only fits 10 to 20 KB', async ({ page }) => {
    await pick(page, 'SSC CGL 2026');
    const card = page.getByRole('region', { name: 'Requirements' });
    await expect(card).toContainText('10 to 20 KB, JPG');
    await expect(card).toContainText('6.0 cm x 2.0 cm');
    await addFiles(page, [await signatureScan(page, 1200, 400)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([1200, 400]);
    expect(kb(r!.size)).toBeLessThanOrEqual(20);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(10);
  });

  test('custom sizes work, and bad input is explained before running', async ({ page }) => {
    await pick(page, 'Other exam: enter the size myself');
    await page.getByLabel('Width (px)').fill('300');
    await page.getByLabel('Height (px)').fill('300');
    await page.getByLabel('Minimum size (KB)').fill('5');
    await page.getByLabel('Maximum size (KB)').fill('30');
    await addFiles(page, [await makeImage(page, 'image/png', 'a.png', 1000, 1000)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([300, 300]);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(5);
    expect(kb(r!.size)).toBeLessThanOrEqual(30);

    await page.getByLabel('Minimum size (KB)').fill('50');
    await expect(page.getByRole('alert').filter({ hasText: /minimum/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Make my file', exact: true })).toBeDisabled();
  });

  test('an impossible maximum gives a clear error instead of a wrong file', async ({ page }) => {
    await pick(page, 'Other exam: enter the size myself');
    await page.getByLabel('Width (px)').fill('');
    await page.getByLabel('Height (px)').fill('');
    await page.getByLabel('Minimum size (KB)').fill('');
    await page.getByLabel('Maximum size (KB)').fill('1');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'big.jpg', 1600, 1200)]);
    await make(page);
    await expect(page.getByRole('alert').filter({ hasText: 'Could not get under 1 KB' })).toBeVisible();
  });
});

test.describe('exam landing pages', () => {
  test('open with the exam and document already chosen, and make a file in range', async ({ page }) => {
    await page.goto('/ibps-po-signature-size/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('IBPS PO signature size');
    await expect(page.getByLabel('Exam', { exact: true })).toHaveValue('ibps-po-xv');
    await expect(page.getByLabel('Document')).toHaveValue('signature');
    await expect(page.getByRole('region', { name: 'Requirements' })).toContainText('140 x 60 px, 10 to 20 KB, JPG');
    await addFiles(page, [await signatureScan(page)]);
    await make(page);
    const [r] = await readResults(page, 1);
    expect([r!.width, r!.height]).toEqual([140, 60]);
    expect(kb(r!.size)).toBeGreaterThanOrEqual(10);
    expect(kb(r!.size)).toBeLessThanOrEqual(20);
  });

  test('the SSC page opens SSC and gives no pixel size', async ({ page }) => {
    await page.goto('/ssc-cgl-signature-size/');
    await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
    await expect(page.getByLabel('Exam', { exact: true })).toHaveValue('ssc-cgl-2026');
    const card = page.getByRole('region', { name: 'Requirements' });
    await expect(card).toContainText('10 to 20 KB, JPG');
    await expect(card).not.toContainText(' px');
  });

  test('show the source and date in the page text, and carry FAQ data', async ({ page }) => {
    await page.goto('/ibps-po-photo-size/');
    await expect(page.getByText('read on 12 Nov 2026').first()).toBeVisible();
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join(' ')).toContain('FAQPage');
  });
});
