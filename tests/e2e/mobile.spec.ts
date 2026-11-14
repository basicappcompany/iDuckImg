import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage } from './helpers';

/**
 * Phones. The top bar is a fixed set of buttons, so it used to be wider than a 360 px screen (and 53 px too wide at 320),
 * and a long file name in the results list used to stretch the whole page. These tests fail on a page that scrolls
 * sideways or whose menu runs off the edge, at the widths real phones have.
 */
const WIDTHS = [320, 360, 375, 390];
const PAGES = [
  '/',
  '/compress-image/',
  '/guides/how-to-compress-an-image/',
  '/chat/',
  '/es/exam-photo-resizer/',
  '/fr/exam-photo-resizer/',
  '/de/add-watermark-to-image/',
  '/hi/',
  '/bn/compress-image/',
  '/ru/guides/',
  '/en-gb/',
];

const sideways = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe('on a phone', () => {
  for (const width of WIDTHS) {
    test(`${width}px: no page scrolls sideways and the top bar fits`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      for (const path of PAGES) {
        await page.goto(path);
        expect(await sideways(page), `${path} at ${width}px`).toBeLessThanOrEqual(0);
        // Every button of the top bar is inside the screen.
        const right = await page.evaluate(() => Math.max(...[...document.querySelectorAll('header.topbar button, header.topbar a, header.topbar summary')].map((e) => e.getBoundingClientRect().right)));
        expect(right, `${path} top bar at ${width}px`).toBeLessThanOrEqual(width);
      }
    });
  }

  test('the home search bar stays inside the screen and its text is one short line, in every language', async ({ page }) => {
    for (const width of [320, 360, 390]) {
      await page.setViewportSize({ width, height: 800 });
      for (const path of ['/', '/hi/', '/bn/', '/de/', '/es/', '/fr/', '/id/', '/pt-br/', '/ru/', '/tr/', '/en-gb/']) {
        await page.goto(path);
        // The Ctrl K hint is hidden on touch screens (hover: none); this test browser has a mouse, so hide it the same way.
        // A constructable stylesheet, because the page's Content-Security-Policy blocks injected <style> tags.
        await page.evaluate(() => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync('.hero-search kbd { display: none; }');
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        });
        const box = (await page.locator('#hero-search').boundingBox())!;
        expect(box.x, `${path} at ${width}px`).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width, `${path} at ${width}px`).toBeLessThanOrEqual(width);
        // One line of text: the bar is about 54 px tall, not two lines' worth.
        expect(box.height, `${path} at ${width}px`).toBeLessThan(64);
        const label = page.locator('#hero-search span').nth(1);
        expect(await label.evaluate((e) => e.scrollWidth <= e.clientWidth), `${path} at ${width}px text fits without cutting`).toBe(true);
      }
    }
  });

  test('320px: the language menu stays on the screen, one language per line', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/');
    await page.locator('[data-lang-menu] summary').click();
    const list = page.locator('.lang-list');
    await expect(list).toBeVisible();
    const box = (await list.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
    for (const a of await list.locator('a').all()) {
      const h = (await a.boundingBox())!.height;
      expect(h, await a.innerText()).toBeLessThan(42); // a wrapped name would be two lines tall
    }
  });

  test('360px: long file names in the list and in the results do not widen the page', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const long = 'a-very-long-photograph-file-name-from-my-holiday-in-the-mountains-2026.png';
    await page.goto('/compress-image/');
    const files = [await makeImage(page, 'image/png', long, 900, 600), await makeImage(page, 'image/png', 'second-photo-with-a-long-name-too.png', 900, 600)];
    await addFiles(page, files, /2 images selected/);
    expect(await sideways(page), 'after adding').toBeLessThanOrEqual(0);
    await page.getByRole('button', { name: 'Compress', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Download', exact: true }).first()).toBeVisible();
    expect(await sideways(page), 'in the results').toBeLessThanOrEqual(0);
  });

  test('360px: the merge and PDF file lists wrap their buttons instead of widening the page', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    for (const path of ['/merge-images/', '/image-to-pdf/']) {
      await page.goto(path);
      const files = [await makeImage(page, 'image/png', 'a-very-long-photograph-file-name-from-my-holiday-2026.png', 900, 600), await makeImage(page, 'image/png', 'b.png', 900, 600)];
      await addFiles(page, files, /^b\.png$/);
      expect(await sideways(page), path).toBeLessThanOrEqual(0);
    }
  });

  test('a translated tool page has no "options are still English" note when its options are translated', async ({ page }) => {
    await page.goto('/hi/compress-image/');
    await expect(page.locator('[data-controls-note]')).toHaveCount(0);
    await page.goto('/hi/blur-image/');
    await expect(page.locator('[data-controls-note]')).toBeVisible();
  });
});

test.describe('the language menu', () => {
  test.use({ hasTouch: true, viewport: { width: 375, height: 800 } });
  const menu = (page: Page) => page.locator('[data-lang-menu]');
  const open = async (page: Page, path = '/') => {
    await page.goto(path);
    await page.waitForLoadState('load'); // the menu's script has run
    await page.locator('[data-lang-menu] summary').click();
    await expect(menu(page)).toHaveAttribute('open', '');
  };

  test('closes when you click anywhere else', async ({ page }) => {
    await open(page);
    await page.mouse.click(6, 400); // the left edge of the page, which the open menu does not cover
    await expect(menu(page)).not.toHaveAttribute('open', '');
    // ...and on another button of the top bar.
    await open(page, '/compress-image/');
    await page.locator('#theme-toggle').click();
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });

  test('closes when you tap a plain part of the page with a finger', async ({ page }) => {
    await open(page);
    await page.touchscreen.tap(6, 500); // the left edge of the page, which the open menu does not cover
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });

  test('closes again when you tap its own button', async ({ page }) => {
    await open(page);
    await page.locator('[data-lang-menu] summary').click();
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });

  test('closes when a language is chosen: the new page shows it closed, and so does Back', async ({ page }) => {
    await open(page);
    await page.getByRole('link', { name: 'Deutsch' }).click();
    await expect(page).toHaveURL(/\/de\/$/);
    await expect(menu(page)).not.toHaveAttribute('open', '');
    await page.goBack();
    await expect(page).toHaveURL(/localhost:\d+\/$/);
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });

  test('closes when the language you are already in is chosen', async ({ page }) => {
    await open(page, '/de/');
    await page.getByRole('link', { name: 'Deutsch' }).click();
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });

  test('closes when focus moves away from it', async ({ page }) => {
    await open(page);
    await page.locator('#theme-toggle').focus();
    await expect(menu(page)).not.toHaveAttribute('open', '');
  });
});
