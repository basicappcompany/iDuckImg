import { expect, type Page } from '@playwright/test';

export type TestImageType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface TestImage {
  name: string;
  mimeType: TestImageType;
  buffer: Buffer;
}

/** Draw a noisy gradient in the browser and return it encoded, so tests need no fixture files. */
export async function makeImage(
  page: Page,
  type: TestImageType,
  name: string,
  width = 1200,
  height = 800,
  { transparent = false }: { transparent?: boolean } = {},
): Promise<TestImage> {
  const base64 = await page.evaluate(
    async ({ type, width, height, transparent }) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      if (transparent) {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(width / 2, 0, width / 2, height); // left half stays transparent
      } else {
        const g = ctx.createLinearGradient(0, 0, width, height);
        g.addColorStop(0, '#f59e0b');
        g.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
        const dots = Math.min(6000, Math.round((width * height) / 160));
        for (let i = 0; i < dots; i++) {
          ctx.fillStyle = `hsl(${Math.random() * 360},70%,50%)`;
          ctx.fillRect(Math.random() * width, Math.random() * height, 8, 8);
        }
      }
      const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), type, 0.95));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let binary = '';
      for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      return btoa(binary);
    },
    { type, width, height, transparent },
  );
  return { name, mimeType: type, buffer: Buffer.from(base64, 'base64') };
}

/** Give files to the tool through its real file input, as a user choosing files would. */
export async function addFiles(page: Page, images: TestImage[]): Promise<void> {
  await page.getByLabel('Choose files').setInputFiles(images);
  await expect(page.getByText(/\d+ images? selected/)).toBeVisible();
}

export interface Downloaded {
  name: string;
  type: string;
  size: number;
  /** Decoded size for images; null for other types. */
  width: number | null;
  height: number | null;
  /** First 5 bytes as text, e.g. "%PDF-". */
  head: string;
}

/** Read every result link back from the page and describe the file behind it. */
export async function readResults(page: Page, count: number): Promise<Downloaded[]> {
  const results = page.getByRole('region', { name: 'Results' });
  await expect(results.locator('a[download]')).toHaveCount(count);
  return results.locator('a[download]').evaluateAll(async (links) => {
    const out = [];
    for (const link of links as HTMLAnchorElement[]) {
      const blob = await (await fetch(link.href)).blob();
      let width: number | null = null;
      let height: number | null = null;
      if (blob.type.startsWith('image/')) {
        const bitmap = await createImageBitmap(blob);
        width = bitmap.width;
        height = bitmap.height;
      }
      const head = new TextDecoder().decode(new Uint8Array(await blob.slice(0, 5).arrayBuffer()));
      out.push({ name: link.download, type: blob.type, size: blob.size, width, height, head });
    }
    return out;
  });
}
