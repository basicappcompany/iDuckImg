import { expect, test, type Page } from '@playwright/test';
import { addFiles, makeImage, readResults } from './helpers';

const LANGS = [
  { code: 'hi', path: 'hi', native: 'हिन्दी', h1: 'इमेज', toolName: 'इमेज कंप्रेस करें' },
  { code: 'bn', path: 'bn', native: 'বাংলা', h1: 'ইমেজ', toolName: 'ইমেজ কমপ্রেস করুন' },
  { code: 'pt-BR', path: 'pt-br', native: 'Português (Brasil)', h1: 'Imagens', toolName: 'Comprimir imagens' },
  { code: 'id', path: 'id', native: 'Bahasa Indonesia', h1: 'Gambar', toolName: 'Kompres gambar' },
  { code: 'ru', path: 'ru', native: 'Русский', h1: 'Изображения', toolName: 'Сжатие изображений' },
  { code: 'de', path: 'de', native: 'Deutsch', h1: 'Bilder', toolName: 'Bilder komprimieren' },
  { code: 'es', path: 'es', native: 'Español', h1: 'Imágenes', toolName: 'Comprimir imágenes' },
  { code: 'fr', path: 'fr', native: 'Français', h1: 'Vos images', toolName: 'Compresser des images' },
  { code: 'tr', path: 'tr', native: 'Türkçe', h1: 'Görseller', toolName: 'Görselleri sıkıştır' },
] as const;

const hreflangs = (page: Page) =>
  page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
    links.map((l) => [l.getAttribute('hreflang'), new URL((l as HTMLLinkElement).href).pathname] as const),
  );

test.describe('languages', () => {
  for (const l of LANGS) {
    test(`${l.native}: the home page and a tool page are translated and tagged`, async ({ page }) => {
      const home = await page.goto(`/${l.path}/`);
      expect(home?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', l.code);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(l.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://iduckimg.com/${l.path}/`);
      await expect(page.locator('[data-machine-note]')).toBeVisible();
      // Cards link to this language's tool pages, not to English ones.
      const card = page.locator(`[data-slug="compress-image"] a`);
      await expect(card).toHaveAttribute('href', `/${l.path}/compress-image/`);
      await expect(card).toContainText(l.toolName);

      const tool = await page.goto(`/${l.path}/compress-image/`);
      expect(tool?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', l.code);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(l.toolName);
      await expect(page).toHaveTitle(new RegExp(`${l.toolName}.*iDuckImg`));
      await expect(page.locator('[data-controls-note]')).toBeVisible();
      await expect(page.locator('meta[property="og:locale"]')).toHaveCount(1);
    });
  }

  test('every page tells search engines about all ten languages, and English is the default', async ({ page }) => {
    // [page, the same page in English, the same page in Spanish]
    const cases: [string, string, string][] = [
      ['/', '/', '/es/'],
      ['/compress-image/', '/compress-image/', '/es/compress-image/'],
      ['/es/', '/', '/es/'],
      ['/de/compress-image/', '/compress-image/', '/es/compress-image/'],
      ['/pt-br/favicon-generator/', '/favicon-generator/', '/es/favicon-generator/'],
    ];
    for (const [path, english, spanish] of cases) {
      await page.goto(path);
      const tags = await hreflangs(page);
      expect(tags.map(([code]) => code), path).toEqual(['en', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr', 'x-default']);
      expect(tags.find(([code]) => code === 'x-default')![1], path).toBe(english);
      expect(tags.find(([code]) => code === 'en')![1], path).toBe(english);
      expect(tags.find(([code]) => code === 'es')![1], path).toBe(spanish);
    }
  });

  test('pages with no translation do not claim to have one', async ({ page }) => {
    for (const path of ['/guides/', '/guides/how-to-compress-an-image/', '/heic-to-jpg/', '/privacy/']) {
      await page.goto(path);
      expect(await hreflangs(page), path).toEqual([]);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    }
  });

  test('the language menu opens, lists ten languages, and switches to the same page', async ({ page }) => {
    await page.goto('/compress-image/');
    await page.locator('[data-lang-menu] summary').click();
    const links = page.locator('[data-lang-menu] a');
    await expect(links).toHaveCount(10);
    await expect(links.nth(7)).toHaveText('Español');
    await expect(links.nth(0)).toHaveAttribute('aria-current', 'true');
    // Each language has a flag in the list, and the open language's flag shows on the button.
    await expect(page.locator('[data-lang-menu] .lang-list svg.flag')).toHaveCount(10);
    await expect(page.locator('[data-lang-menu] summary svg.flag')).toHaveCount(1);
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page.locator('[data-lang-menu] summary svg.flag')).toHaveCount(1);
    await expect(page).toHaveURL(/\/es\/compress-image\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Comprimir imágenes');

    // From a page with no translation the menu goes to that language's home page.
    await page.goto('/guides/');
    await page.locator('[data-lang-menu] summary').click();
    await page.getByRole('link', { name: 'Deutsch' }).click();
    await expect(page).toHaveURL(/\/de\/$/);

    // Escape closes it.
    await page.waitForLoadState('load'); // the menu's script has run
    await page.locator('[data-lang-menu] summary').click();
    await expect(page.locator('[data-lang-menu]')).toHaveAttribute('open', '');
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-lang-menu]')).not.toHaveAttribute('open', '');
  });

  test('the tool on a translated page really works', async ({ page }) => {
    await page.goto('/fr/compress-image/');
    await expect(page.getByText('Déposez vos images ici')).toBeVisible();
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 1200, 800)], /1 image sélectionnée/);
    await expect(page.getByRole('button', { name: 'Effacer' })).toBeVisible();
    await expect(page.getByLabel('Format de sortie')).toBeVisible();
    await page.getByRole('button', { name: 'Compresser', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.type).toBe('image/jpeg');
    expect(r!.size).toBeGreaterThan(0);
    await expect(page.getByRole('link', { name: 'Télécharger' })).toBeVisible();
  });

  test('the sidebar is translated and links to the same language', async ({ page }) => {
    await page.goto('/es/crop-image/');
    const tools = page.getByRole('navigation', { name: 'Tools', exact: true });
    await expect(tools.getByText('Herramientas', { exact: true })).toBeVisible();
    await expect(tools.locator('a[href="/es/crop-image/"]')).toHaveAttribute('aria-current', 'page');
    await expect(tools.locator('a[href="/es/crop-image/"]')).toContainText('Recortar imágenes');
    // The English-only parts of the sidebar are not shown with English labels on a Spanish page.
    await expect(page.getByRole('navigation', { name: 'Quick tools' })).toHaveCount(0);
    await expect(page.getByText('Ask the helper')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/es/');
    await expect(page.getByRole('link', { name: 'Apoyar' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Guías prácticas' })).toHaveAttribute('href', '/guides/');
  });

  test('has translated structured data and FAQ on the home page', async ({ page }) => {
    await page.goto('/de/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const all = blocks.join(' ');
    expect(all).toContain('"inLanguage":"de"');
    expect(all).toContain('Was ist iDuckImg?');
    await expect(page.getByRole('region', { name: 'Häufige Fragen' }).locator('details')).toHaveCount(5);
    await page.goto('/de/compress-image/');
    const tool = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ');
    expect(tool).toContain('"@type":"WebApplication"');
    expect(tool).toContain('"inLanguage":"de"');
  });

  test('a translated tool shows its own options and run button in that language', async ({ page }) => {
    await page.goto('/es/resize-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'foto.jpg', 800, 600)], /1 imagen seleccionada/);
    await expect(page.getByLabel('Ancho (px)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cambiar tamaño', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tamaño' }).or(page.getByText('Tamaño', { exact: true })).first()).toBeVisible();
    // The quick answer names the button the visitor sees.
    await expect(page.getByText('"Cambiar tamaño"').first()).toBeVisible();
    // English stays English.
    await page.goto('/resize-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'photo.jpg', 800, 600)]);
    await expect(page.getByRole('button', { name: 'Resize', exact: true })).toBeVisible();
  });

  test('the home page of each language has the Ask the helper card, English only on the English page', async ({ page }) => {
    await page.goto('/de/');
    const card = page.getByRole('region', { name: 'Den Helfer fragen' });
    await expect(card).toContainText('Unsicher, welches Werkzeug Sie brauchen?');
    await expect(card.getByRole('link', { name: 'Den Helfer fragen' })).toHaveAttribute('href', '/chat/');
    await page.goto('/');
    await expect(page.getByRole('region', { name: 'Ask the helper' }).getByRole('link')).toHaveAttribute('href', '/chat/');
  });

  test('the duck eye is black in dark mode too', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const fill = await page.locator('svg[aria-label="iDuck mascot"] circle').first().getAttribute('fill');
    expect(fill).toBe('#000');
  });

  test('the English pages are unchanged', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Images, sorted.');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('[data-machine-note]')).toHaveCount(0);
    await expect(page.getByText('Ask the helper').first()).toBeVisible();
  });

  test('is in the sitemap with language alternates', async ({ request }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    expect(xml).toContain('<loc>https://iduckimg.com/es/compress-image/</loc>');
    expect(xml).toContain('<loc>https://iduckimg.com/pt-br/</loc>');
    expect(xml).toMatch(/xhtml:link rel="alternate" hreflang="tr" href="https:\/\/iduckimg\.com\/tr\/compress-image\/"/);
    expect(xml).toMatch(/hreflang="pt-BR" href="https:\/\/iduckimg\.com\/pt-br\/"/);
  });

  test('llms.txt points assistants at every translated home page', async ({ request }) => {
    const text = await (await request.get('/llms.txt')).text();
    expect(text).toContain('## Languages');
    for (const path of ['hi', 'bn', 'pt-br', 'id', 'ru', 'de', 'es', 'fr', 'tr']) expect(text).toContain(`https://iduckimg.com/${path}/`);
  });

  test('long languages do not scroll sideways on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    for (const path of ['/hi/', '/bn/compress-image/', '/ru/', '/de/exam-photo-resizer/', '/fr/']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
