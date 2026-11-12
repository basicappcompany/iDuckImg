import { expect, test, type Page } from '@playwright/test';

/** Same order as the sidebar and the homepage: grouped. */
const GROUPS: Record<string, string[]> = {
  'Shrink & resize': ['/compress-image/', '/resize-image/', '/exam-photo-resizer/', '/pixel-to-cm-converter/', '/aspect-ratio-calculator/'],
  'Edit & transform': ['/crop-image/', '/rotate-image/', '/circle-crop-image/', '/split-image-into-grid/', '/merge-images/', '/adjust-image-colors/', '/add-border-to-image/'],
  'Add text & effects': ['/add-watermark-to-image/', '/add-logo-to-image/', '/add-text-to-image/', '/pixel-art-maker/', '/blur-image/'],
  'Convert & combine': ['/convert-image/', '/image-to-pdf/', '/image-to-base64/', '/favicon-generator/'],
  'Privacy & cleanup': ['/remove-exif-data/'],
  'Create & design': ['/color-picker-from-image/', '/color-palette-generator/'],
};
const TOOL_PATHS = Object.values(GROUPS).flat();
/** The shortcuts (landing pages) listed under the tool they open, after the group's own tools. */
const SHORTCUTS: Record<string, string[]> = {
  'Shrink & resize': ['/compress-image-to-100kb/', '/compress-image-to-50kb/', '/compress-image-to-200kb/', '/compress-image-to-20kb/',
    '/ibps-po-photo-size/', '/ibps-po-signature-size/', '/ibps-po-thumb-impression-size/', '/ibps-po-declaration-size/', '/ssc-cgl-signature-size/'],
  'Convert & combine': [
    '/heic-to-jpg/', '/heic-to-png/', '/png-to-jpg/', '/jpg-to-png/', '/webp-to-jpg/',
    '/webp-to-png/', '/jpg-to-webp/', '/png-to-webp/', '/jpg-to-pdf/', '/png-to-pdf/',
    '/avif-to-jpg/', '/avif-to-png/', '/svg-to-png/', '/svg-to-jpg/', '/bmp-to-jpg/', '/gif-to-png/',
  ],
};
/** The Quick tools sub-categories at the top of the sidebar, in order. */
const QUICK: Record<string, string[]> = {
  'Compress & resize': [
    '/compress-image/', '/resize-image/', '/compress-image-to-100kb/', '/compress-image-to-50kb/',
    '/compress-image-to-200kb/', '/compress-image-to-20kb/',
  ],
  'Convert a format': [
    '/heic-to-jpg/', '/heic-to-png/', '/png-to-jpg/', '/jpg-to-png/', '/webp-to-jpg/',
    '/webp-to-png/', '/jpg-to-webp/', '/png-to-webp/',
  ],
  'Open other formats': ['/avif-to-jpg/', '/avif-to-png/', '/svg-to-png/', '/svg-to-jpg/', '/bmp-to-jpg/', '/gif-to-png/'],
  'Make a PDF': ['/jpg-to-pdf/', '/png-to-pdf/', '/image-to-pdf/'],
  'Photos for forms': ['/exam-photo-resizer/', '/ibps-po-photo-size/', '/ibps-po-signature-size/', '/ibps-po-thumb-impression-size/', '/ibps-po-declaration-size/', '/ssc-cgl-signature-size/', '/remove-exif-data/', '/blur-image/'],
  'Quick edits': ['/crop-image/', '/rotate-image/', '/add-watermark-to-image/', '/add-logo-to-image/', '/circle-crop-image/', '/merge-images/', '/adjust-image-colors/', '/add-border-to-image/'],
};
/** Everything the home page and the sidebar list, in order: each group's tools, then its shortcuts. */
const LISTED = Object.entries(GROUPS).flatMap(([group, paths]) => [...paths, ...(SHORTCUTS[group] ?? [])]);
const groupOf = (path: string) => Object.entries(GROUPS).find(([, paths]) => paths.includes(path))![0];

const hrefs = (_page: Page, selector: ReturnType<Page['locator']>) =>
  selector.evaluateAll((links) => links.map((a) => new URL((a as HTMLAnchorElement).href).pathname));

const TOGGLE = 'Switch between light and dark mode';
const LIGHT_BG = 'rgb(255, 253, 245)';
const DARK_BG = 'rgb(18, 18, 18)';
const bodyBackground = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe('site', () => {
  test('the homepage lists every tool by group and no longer says coming soon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Images, sorted.');
    await expect(page.getByText(/coming soon/i)).toHaveCount(0);
    expect(await hrefs(page, page.getByRole('region', { name: 'Tools' }).getByRole('link'))).toEqual(LISTED);
    for (const group of Object.keys(GROUPS)) await expect(page.getByRole('heading', { name: group })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Common questions' }).locator('details')).toHaveCount(5);
  });

  test('only Compress & resize is open in Quick tools to start with; on a shortcut its own group opens instead', async ({ page }) => {
    await page.goto('/compress-image/');
    const quick = page.getByRole('navigation', { name: 'Quick tools' });
    const subGroups = quick.locator('[data-nav-group]:not([aria-controls="quick-body"])');
    await expect(subGroups).toHaveCount(Object.keys(QUICK).length);
    const openGroups = quick.locator('[data-nav-group][aria-expanded="true"]:not([aria-controls="quick-body"])');
    await expect(openGroups).toHaveCount(1);
    await expect(openGroups).toHaveAttribute('aria-controls', 'quick-compress');
    await expect(page.getByRole('navigation', { name: 'Tools', exact: true }).locator('a[aria-current="page"]')).toBeVisible();

    await page.goto('/heic-to-jpg/');
    await expect(quick.locator('[data-nav-group][aria-expanded="true"]:not([aria-controls="quick-body"])')).toHaveCount(1);
    await expect(quick.locator('a[aria-current="page"]')).toHaveAttribute('href', '/heic-to-jpg/');

    await expect(quick.locator('[data-nav-group][aria-expanded="true"]:not([aria-controls="quick-body"])')).toHaveAttribute('aria-controls', 'quick-convert');

    await page.goto('/');
    await expect(quick.locator('[data-nav-group][aria-expanded="true"]:not([aria-controls="quick-body"])')).toHaveAttribute('aria-controls', 'quick-compress');
  });

  for (const path of TOOL_PATHS) {
    test(`${path} has a canonical link, the sidebar, a quick answer, and links to its group`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com${path}`);

      const sidebar = page.getByRole('navigation', { name: 'Tools', exact: true });
      // The group holding this page starts open; the others are collapsed until opened.
      await expect(sidebar.locator(`a[href="${path}"]`)).toBeVisible();
      await expect(sidebar.locator(`[data-nav-group][aria-expanded="true"]`)).toHaveCount(1);
      for (const button of await sidebar.locator('[data-nav-group]').all()) {
        if ((await button.getAttribute('aria-expanded')) === 'false') await button.click();
      }
      expect(await hrefs(page, sidebar.getByRole('link'))).toEqual(TOOL_PATHS);
      expect(await hrefs(page, page.getByRole('navigation', { name: 'Main' }).getByRole('link'))).toEqual(['/', '/chat/', '/image-tools/', '/guides/']);

      // Quick tools: a collapsible section with sub-categories that open and close.
      const quick = page.getByRole('navigation', { name: 'Quick tools' });
      await expect(quick.locator('[data-nav-group][aria-expanded="true"]')).not.toHaveCount(0);
      for (const button of await quick.locator('[data-nav-group]').all()) {
        if ((await button.getAttribute('aria-expanded')) === 'false') await button.click();
      }
      expect(await hrefs(page, quick.getByRole('link'))).toEqual(Object.values(QUICK).flat());
      await expect(sidebar.locator('a[aria-current="page"]')).toHaveAttribute('href', path);

      await expect(page.getByRole('region', { name: 'Quick answer' })).toContainText('To ');
      await expect(page.getByText('Runs in your browser').first()).toBeVisible();

      const group = groupOf(path);
      const more = page.getByRole('navigation', { name: `More in ${group}` });
      const mates = GROUPS[group]!.filter((p) => p !== path);
      expect(await hrefs(page, more.getByRole('link'))).toEqual(mates);
    });
  }

  test('the sitemap lists the homepage and every tool', async ({ request }) => {
    const index = await request.get('/sitemap-index.xml');
    expect(index.ok()).toBe(true);
    const body = await (await request.get('/sitemap-0.xml')).text();
    for (const path of ['/', ...TOOL_PATHS]) expect(body).toContain(`https://iduckimg.com${path}`);
  });

  test('keyboard users can skip straight to the tool', async ({ page }) => {
    await page.goto('/compress-image/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to the tool' });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main');
    await expect(skip).toBeInViewport();
  });

  test.describe('light and dark', () => {
    test.use({ colorScheme: 'light' });

    test('the toggle switches the theme and the choice is remembered', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.*/);
      expect(await bodyBackground(page)).toBe(LIGHT_BG);

      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);
      await expect(page.getByRole('button', { name: TOGGLE })).toHaveAttribute('aria-pressed', 'true');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);

      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      expect(await bodyBackground(page)).toBe(LIGHT_BG);
    });

    test('a saved choice is applied before the page is drawn, so there is no flash', async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('duck.theme', 'dark'));
      await page.goto('/crop-image/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      expect(await bodyBackground(page)).toBe(DARK_BG);
    });

    test('a broken storage does not break the page', async ({ page }) => {
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('blocked'); } });
      });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.getByRole('button', { name: TOGGLE }).click(); // still switches for this visit
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test.describe('system dark mode', () => {
    test.use({ colorScheme: 'dark' });

    test('follows the system setting until the visitor chooses', async ({ page }) => {
      await page.goto('/');
      expect(await bodyBackground(page)).toBe(DARK_BG);
      await page.getByRole('button', { name: TOGGLE }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      expect(await bodyBackground(page)).toBe(LIGHT_BG);
    });
  });

  test.describe('search', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    const dialog = (page: Page) => page.getByRole('dialog', { name: 'Search' });
    const box = (page: Page) => page.getByRole('combobox', { name: /Search tools, pages and actions/ });

    test('Ctrl K opens the search window from anywhere, focuses it, and Esc closes it', async ({ page }) => {
      await page.goto('/rotate-image/');
      await page.waitForLoadState('networkidle');
      await page.keyboard.press('Control+k');
      await expect(dialog(page)).toBeVisible();
      await expect(box(page)).toBeFocused();
      await page.keyboard.press('Control+k');
      await expect(dialog(page)).toBeHidden();
      await page.keyboard.press('Control+k');
      await page.keyboard.press('Escape');
      await expect(dialog(page)).toBeHidden();
    });

    test('"/" opens it too, but not while typing in a field', async ({ page }) => {
      await page.goto('/chat/');
      await page.waitForLoadState('networkidle');
      await page.getByLabel('Describe what you want to do').focus();
      await page.keyboard.type('a/b');
      await expect(dialog(page)).toBeHidden();
      await page.locator('body').click({ position: { x: 5, y: 5 } });
      await page.keyboard.press('/');
      await expect(dialog(page)).toBeVisible();
    });

    test('it groups results, filters by words, moves with the arrows and Enter opens the pick', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Control+k');
      await expect(dialog(page).getByText('Tools', { exact: true })).toBeVisible();
      await expect(dialog(page).getByText('Pages', { exact: true })).toBeVisible();

      await box(page).fill('heic');
      const options = dialog(page).getByRole('option');
      await expect(options.first()).toContainText('Convert images');
      await expect(options.filter({ hasText: 'HEIC to JPG' })).toHaveCount(1);
      await expect(options.first()).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('ArrowDown');
      await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/convert-image\/$/);
    });

    test('it finds exam signatures, pages and the theme action, and says so when nothing matches', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Control+k');
      await box(page).fill('signature');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/exam-photo-resizer\/$/);
      await page.waitForLoadState('networkidle');

      await page.keyboard.press('Control+k');
      await box(page).fill('privacy');
      await expect(dialog(page).getByRole('option', { name: /Privacy policy/ })).toBeVisible();

      await box(page).fill('dark');
      await dialog(page).getByRole('option', { name: /Switch light \/ dark/ }).click();
      await expect(dialog(page)).toBeHidden();
      await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);

      await page.keyboard.press('Control+k');
      await box(page).fill('qqqqq');
      await expect(dialog(page).getByText('Nothing matches')).toBeVisible();
    });

    test('clicking the dim backdrop closes it', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open search' }).click();
      await expect(dialog(page)).toBeVisible();
      await page.mouse.click(5, 5);
      await expect(dialog(page)).toBeHidden();
    });

    test('the big search box on the home page opens the same window, and Ctrl K works from it', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const hero = page.getByRole('button', { name: 'Search tools, pages and actions' }).first();
      await expect(hero).toContainText('Ctrl K');
      await hero.click();
      await expect(dialog(page)).toBeVisible();
      await expect(box(page)).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(dialog(page)).toBeHidden();
      await hero.focus();
      await page.keyboard.press('Control+k');
      await expect(dialog(page)).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('region', { name: 'Ask the helper' }).getByRole('link', { name: 'Ask the helper' })).toHaveAttribute('href', '/chat/');
      await expect(page.locator('[data-card]:not([hidden])')).toHaveCount(LISTED.length);
    });

    test('Popular right now links to real pages, and the group chips narrow the tool list', async ({ page, request }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const popular = await hrefs(page, page.getByRole('region', { name: 'Popular right now' }).getByRole('link'));
      expect(popular).toHaveLength(6);
      for (const href of popular) expect((await request.get(href)).status(), href).toBe(200);

      const cards = page.locator('[data-card-group]:not([hidden]) [data-card]');
      await expect(cards).toHaveCount(LISTED.length);
      await page.getByRole('switch', { name: /^Add text & effects/ }).click();
      await expect(cards).toHaveCount(GROUPS['Add text & effects']!.length);
      await expect(page.getByRole('switch', { name: /^Add text & effects/ })).toHaveAttribute('aria-checked', 'true');
      await expect(page.getByRole('switch', { name: /^Everything/ })).toHaveAttribute('aria-checked', 'false');
      await page.getByRole('switch', { name: /^Everything/ }).click();
      await expect(cards).toHaveCount(LISTED.length);
    });
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 375, height: 700 } });

    for (const path of ['/', ...TOOL_PATHS]) {
      test(`${path} does not scroll sideways`, async ({ page }) => {
        await page.goto(path);
        await page.waitForFunction(() => document.querySelector('astro-island[ssr]') === null);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test('the menu opens as a drawer, closes with Escape, and a link opens its tool', async ({ page }) => {
      await page.goto('/');
      const menu = page.getByRole('button', { name: 'Open the menu' });
      await expect(page.locator('#sidebar')).not.toBeInViewport();
      await menu.click();
      await expect(page.locator('#sidebar')).toBeInViewport();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');

      await page.keyboard.press('Escape');
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#sidebar')).not.toBeInViewport();

      await menu.click();
      await page.locator('#sidebar').getByRole('button', { name: 'Edit & transform' }).click();
      await page.locator('#sidebar').getByRole('link', { name: 'Rotate and flip' }).click();
      await expect(page).toHaveURL(/\/rotate-image\/$/);
    });

    test('the search button opens the search window with the box ready', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open search' }).click();
      await expect(page.getByRole('dialog', { name: 'Search' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: /Search tools, pages and actions/ })).toBeFocused();
    });
  });
});
