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

/** Links in the Quick tools sidebar: the shortcut pages plus the tools some groups list. */
const QUICK_LINKS = 39;

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
      expect(tags.map(([code]) => code), path).toEqual(['en-US', 'en-GB', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr', 'x-default']);
      expect(tags.find(([code]) => code === 'x-default')![1], path).toBe(english);
      expect(tags.find(([code]) => code === 'en-US')![1], path).toBe(english);
      expect(tags.find(([code]) => code === 'en-GB')![1], path).toBe(english === '/' ? '/en-gb/' : `/en-gb${english}`);
      expect(tags.find(([code]) => code === 'es')![1], path).toBe(spanish);
    }
  });

  test('pages with no translation do not claim to have one', async ({ page }) => {
    for (const path of ['/privacy/', '/terms/', '/about/']) {
      await page.goto(path);
      expect(await hreflangs(page), path).toEqual([]);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    }
  });

  test('the language menu opens, lists eleven languages, and switches to the same page', async ({ page }) => {
    await page.goto('/compress-image/');
    await page.locator('[data-lang-menu] summary').click();
    const links = page.locator('[data-lang-menu] a');
    await expect(links).toHaveCount(11);
    await expect(links.nth(0)).toHaveText('English (US)');
    await expect(links.nth(1)).toHaveText('English (UK)');
    await expect(links.nth(8)).toHaveText('Español');
    await expect(links.nth(0)).toHaveAttribute('aria-current', 'true');
    // Each language has a flag in the list, and the open language's flag shows on the button.
    await expect(page.locator('[data-lang-menu] .lang-list svg.flag')).toHaveCount(11);
    await expect(page.locator('[data-lang-menu] summary svg.flag')).toHaveCount(1);
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page.locator('[data-lang-menu] summary svg.flag')).toHaveCount(1);
    await expect(page).toHaveURL(/\/es\/compress-image\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Comprimir imágenes');

    // A guide has translations too, so the menu stays on the guides hub.
    await page.goto('/guides/');
    await page.locator('[data-lang-menu] summary').click();
    await page.getByRole('link', { name: 'Deutsch' }).click();
    await expect(page).toHaveURL(/\/de\/guides\/$/);

    // From a page with no translation the menu goes to that language's home page.
    await page.goto('/privacy/');
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
    // The whole sidebar is there in Spanish: the helper, Quick tools with its groups, Community and the sister site.
    await expect(page.getByText('Ask the helper')).toHaveCount(0);
    const quick = page.getByRole('navigation', { name: 'Quick tools' });
    await expect(quick).toBeVisible();
    await expect(quick.getByRole('button', { name: /Herramientas rápidas/ })).toBeVisible();
    await expect(quick.getByRole('button', { name: /Comprimir y cambiar tamaño/ })).toHaveAttribute('aria-expanded', 'true');
    await expect(quick.locator('a[href="/es/compress-image-to-100kb/"]')).toContainText('Comprimir imagen a 100 KB');
    for (const button of await quick.locator('[data-nav-group]').all()) {
      if ((await button.getAttribute('aria-expanded')) === 'false') await button.click();
    }
    await expect(quick.locator('a[href="/es/heic-to-jpg/"]')).toContainText('HEIC a JPG');
    expect(await quick.getByRole('link').count()).toBe(QUICK_LINKS);
    await expect(page.getByText('Comunidad', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Acerca de' })).toHaveAttribute('href', '/about/');
    await expect(page.getByRole('link', { name: 'Preguntar al asistente' }).first()).toHaveAttribute('href', '/es/chat/');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/es/');
    await expect(page.getByRole('link', { name: 'Apoyar' }).last()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Guías prácticas' })).toHaveAttribute('href', '/es/guides/');
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

  test('the watermark, text, logo, rotate and metadata tools are translated too', async ({ page }) => {
    const cases: [string, string, RegExp, string][] = [
      ['/de/add-watermark-to-image/', 'Wasserzeichen hinzufügen', /1 Bild ausgewählt/, 'Position'],
      ['/fr/add-text-to-image/', 'Ajouter le texte', /1 image sélectionnée/, 'Position'],
      ['/pt-br/add-logo-to-image/', 'Adicionar logotipo', /1 imagem selecionada/, 'Posição'],
      ['/tr/rotate-image/', 'Uygula', /1 görsel seçildi/, ''],
      ['/id/remove-exif-data/', 'Hapus metadata', /1 gambar dipilih/, ''],
    ];
    for (const [path, button, ready, label] of cases) {
      await page.goto(path);
      await addFiles(page, [await makeImage(page, 'image/jpeg', 'a.jpg', 400, 300)], ready);
      await expect(page.getByRole('button', { name: button, exact: true }), path).toBeVisible();
      if (label) await expect(page.getByLabel(label, { exact: true }).first(), path).toBeVisible();
    }
    // The position list is translated.
    await page.goto('/es/add-watermark-to-image/');
    await addFiles(page, [await makeImage(page, 'image/jpeg', 'a.jpg', 400, 300)], /1 imagen seleccionada/);
    await expect(page.getByRole('option', { name: 'Abajo a la derecha' })).toHaveCount(1);
  });

  test('the home page of each language has the Ask the helper card, English only on the English page', async ({ page }) => {
    await page.goto('/de/');
    const card = page.getByRole('region', { name: 'Den Helfer fragen' });
    await expect(card).toContainText('Unsicher, welches Werkzeug Sie brauchen?');
    await expect(card.getByRole('link', { name: 'Den Helfer fragen' })).toHaveAttribute('href', '/de/chat/');
    await page.goto('/');
    await expect(page.getByRole('region', { name: 'Ask the helper' }).getByRole('link')).toHaveAttribute('href', '/chat/');
  });

  test('the helper is translated: the page, the answers, and the tool it points at', async ({ page }) => {
    await page.goto('/es/chat/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    const log = page.getByRole('log');
    await expect(log).toContainText('Duck');
    await expect(log).not.toContainText('I am Duck');
    await page.waitForLoadState('networkidle');
    // A starter button shows its Spanish label and gets a Spanish answer that opens the Spanish page.
    const starter = page.getByRole('group').getByRole('button').first();
    const label = (await starter.textContent())!.trim();
    await starter.click();
    await expect(log.getByText(label).first()).toBeVisible();
    const card = log.locator('a[href^="/es/"]').first();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/es\/compress-image-to-100kb\/$/);
    // Typing a tool's Spanish name finds it too.
    await page.goto('/es/chat/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox').fill('Comprimir imágenes');
    await page.getByRole('button', { name: /enviar/i }).click();
    await expect(page.getByRole('log').locator('a[href="/es/compress-image/"]')).toBeVisible();
  });

  test('the UK helper answers in British spelling and stays on the UK pages', async ({ page }) => {
    await page.goto('/en-gb/chat/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox').fill('make a photo black and white');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByRole('log').locator('a[href="/en-gb/adjust-image-colors/"]')).toBeVisible();
    await expect(page.getByRole('log')).toContainText('Adjust colours and filters');
  });

  test('the duck eye is black in dark mode too', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const fill = await page.locator('svg[aria-label="iDuck mascot"] circle').first().getAttribute('fill');
    expect(fill).toBe('#000');
  });

  test('a shortcut page is translated, works, and is tagged for every language', async ({ page }) => {
    await page.goto('/es/heic-to-jpg/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Convertir HEIC a JPG');
    await expect(page).toHaveTitle(/HEIC a JPG.*iDuckImg/);
    await expect(page.getByRole('region', { name: 'Cómo usarlo' }).getByRole('listitem')).toHaveCount(4);
    await expect(page.getByRole('region', { name: 'Preguntas frecuentes' }).locator('details')).toHaveCount(2);
    await expect(page.getByRole('navigation', { name: 'Relacionado' }).locator('a[href^="/es/"]').first()).toBeVisible();
    const tags = await hreflangs(page);
    expect(tags.map(([c]) => c)).toEqual(['en-US', 'en-GB', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr', 'x-default']);
    expect(tags.find(([c]) => c === 'de')![1]).toBe('/de/heic-to-jpg/');
    // The English page now points at its translations.
    await page.goto('/heic-to-jpg/');
    expect((await hreflangs(page)).find(([c]) => c === 'fr')![1]).toBe('/fr/heic-to-jpg/');
    // The language menu keeps you on the same page.
    await page.locator('[data-lang-menu] summary').click();
    await expect(page.locator('[data-lang-menu] a[hreflang="tr"]')).toHaveAttribute('href', '/tr/heic-to-jpg/');
  });

  test('a translated shortcut page converts a picture with the right option already set', async ({ page }) => {
    await page.goto('/pt-br/png-to-jpg/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Conversor de PNG para JPG');
    await addFiles(page, [await makeImage(page, 'image/png', 'logo.png', 300, 200)], /1 imagem selecionada/);
    await page.getByRole('button', { name: 'Converter', exact: true }).click();
    const [r] = await readResults(page, 1);
    expect(r!.type).toBe('image/jpeg');
  });

  test('exam and size shortcut pages are translated', async ({ page }) => {
    await page.goto('/ru/ibps-po-photo-size/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('IBPS PO');
    await expect(page.getByText('200 x 230 px').first()).toBeVisible();
    await page.goto('/de/compress-image-to-50kb/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bild auf 50 KB komprimieren');
  });

  test('the English pages are unchanged', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Images, sorted.');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(page.locator('[data-machine-note]')).toHaveCount(0);
    await expect(page.getByText('Ask the helper').first()).toBeVisible();
  });

  test('English (US) and English (UK) are both in the menu, and UK spelling shows on the UK pages only', async ({ page }) => {
    await page.goto('/color-picker-from-image/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Color picker from an image');
    await page.locator('[data-lang-menu] summary').click();
    await page.getByRole('link', { name: 'English (UK)' }).click();
    await expect(page).toHaveURL(/\/en-gb\/color-picker-from-image\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Colour picker from an image');
    await expect(page.locator('[data-machine-note]')).toHaveCount(0);
    await expect(page.locator('[data-controls-note]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://iduckimg.com/en-gb/color-picker-from-image/');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_GB');
    // The sidebar stays inside the UK pages.
    await expect(page.getByRole('navigation', { name: 'Tools', exact: true }).locator('a[href="/en-gb/crop-image/"]')).toHaveCount(1);
    // The menu shows the open language and goes back to US.
    await page.locator('[data-lang-menu] summary').click();
    await expect(page.locator('[data-lang-menu] a[aria-current="true"]')).toHaveText('English (UK)');
    await page.getByRole('link', { name: 'English (US)' }).click();
    await expect(page).toHaveURL(/\/color-picker-from-image\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Color picker from an image');
  });

  test('a guide is translated, tagged for every language, linked from the tool page, and has its own hub', async ({ page }) => {
    await page.goto('/de/guides/how-to-compress-an-image/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bild');
    await expect(page.locator('ol li').first()).toBeVisible();
    await expect(page.locator('article details')).toHaveCount(3);
    const tags = await hreflangs(page);
    expect(tags.map(([c]) => c)).toEqual(['en-US', 'en-GB', 'hi', 'bn', 'pt-BR', 'id', 'ru', 'de', 'es', 'fr', 'tr', 'x-default']);
    expect(tags.find(([c]) => c === 'en-GB')![1]).toBe('/en-gb/guides/how-to-compress-an-image/');
    expect(tags.find(([c]) => c === 'fr')![1]).toBe('/fr/guides/how-to-compress-an-image/');
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"inLanguage":"de"'))).toBe(true);
    // The button opens the German tool page.
    await expect(page.locator('a.btn-primary[href="/de/compress-image/"]')).toBeVisible();
    // The tool page links to the German guide, not the English one.
    await page.goto('/de/compress-image/');
    await expect(page.locator('a[href="/de/guides/how-to-compress-an-image/"]')).toBeVisible();
    // The hub lists every guide in German.
    await page.goto('/de/guides/');
    await expect(page.locator('ul[aria-label] a[href^="/de/guides/"]')).toHaveCount(25);
    await expect(page.locator('a[href="/guides/how-to-compress-an-image/"]')).toHaveCount(0);
  });

  test('the UK guides are the English guides in British spelling', async ({ page }) => {
    await page.goto('/en-gb/guides/how-to-adjust-the-colours-of-a-photo/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('colours');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await page.goto('/guides/how-to-adjust-the-colours-of-a-photo/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('colors');
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
