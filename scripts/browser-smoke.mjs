import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  page.on('console', message => {
    if (message.type() === 'error' || message.type() === 'warning')
      console.log('CONSOLE:', message.type(), message.text());
  });
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText)
  );
  page.on('response', response => {
    if (response.status() >= 400)
      console.log('HTTP:', response.status(), response.url());
  });
  const response = await page.goto('https://ihan243.github.io/Hamburger/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(6500);
  const state = await page.evaluate(() => ({
    rootSize: document.querySelector('#root')?.innerHTML.length,
    bodyText: document.body.innerText.slice(0, 450),
    scripts: [...document.querySelectorAll('script')].map(s => s.src),
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));
  console.log('ROOT STATUS:', JSON.stringify({http: response?.status(), ...state}));
  await page.screenshot({ path: 'browser-smoke-mobile.png', fullPage: false });
  if (!state.rootSize || state.rootSize < 300) {
    throw new Error('React content did not render in the deployed browser');
  }
  // Validate the reference menu and preserve its real shopping interactions.
  await page.evaluate(() => document.querySelector('#carta').scrollIntoView({block: 'start', behavior: 'instant'}));
  await page.waitForTimeout(1100);
  const mobileMenu = await page.evaluate(() => {
    const section = document.getElementById('carta');
    const panel = section.querySelector('.ref-menu-panel');
    const heading = section.querySelector('#ref-menu-title');
    const rect = panel.getBoundingClientRect();
    return {
      scrollY: Math.round(window.scrollY),
      sectionTop: Math.round(section.getBoundingClientRect().top),
      panelTop: Math.round(rect.top),
      headingVisible: Boolean(heading && getComputedStyle(heading).opacity !== '0'),
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth
    };
  });
  console.log('MENU MOBILE METRICS:', JSON.stringify(mobileMenu));
  if (mobileMenu.document > mobileMenu.viewport + 1) throw new Error('Menu causes horizontal overflow');
  const featuredCount = await page.locator('#carta .ref-menu-line').count();
  if (featuredCount !== 7)
    throw new Error('Expected 5 featured items plus 2 combo/drink items, got ' + featuredCount);
  await page.screenshot({path: 'browser-smoke-menu-mobile.png', fullPage: false});
  await page.locator('#carta .ref-menu-filters button').filter({hasText: 'Pollo Broaster'}).click();
  if ((await page.locator('#carta .ref-menu-line').count()) < 2)
    throw new Error('Broaster category was empty');
  await page.locator('#carta input[type="search"]').fill('limonada');
  if ((await page.locator('#carta .ref-menu-line').count()) < 1)
    throw new Error('Live menu search did not find limonada');
  await page.locator('#carta input[type="search"]').fill('producto-imposible-xyz');
  if (!(await page.locator('#carta .ref-menu-empty').isVisible()))
    throw new Error('Search missing-results state did not render');
  await page.locator('#carta .ref-menu-filters button').filter({hasText:'Lo Más Pedido'}).click();
  console.log('MENU TEST:', JSON.stringify({featuredCount, currency: await page.locator('#carta .ref-menu-price').first().innerText()}));
  // The in-app catalog must open without route changes and expose all products.
  const originalUrl = page.url();
  await page.locator('#carta .ref-menu-order-box button').click();
  await page.waitForSelector('.dc-overlay[role="dialog"]');
  if (page.url() !== originalUrl) throw new Error('Catalog navigated to another URL');
  const count = await page.locator('.dc-product').count();
  if (count < 18) throw new Error('Expected the complete menu, got ' + count);
  const overlay = page.locator('.dc-overlay');
  await page.screenshot({path:'browser-smoke-catalog-mobile.png',fullPage:false});
  await overlay.locator('.dc-search input').fill('limonada');
  if (await overlay.locator('.dc-product').count() < 1) throw new Error('Digital catalog search failed');
  await overlay.locator('.dc-search input').fill('');
  await overlay.locator('.dc-category-strip button').filter({hasText:'Alitas y crunch'}).click();
  const wing = overlay.locator('.dc-product').filter({hasText:'Alitas Crocantes'}).first();
  await wing.locator('.dc-add-btn').click();
  await page.waitForSelector('.dc-customize-dialog');
  const mustChoose = await page.locator('.dc-customize-confirm').isDisabled();
  if (!mustChoose) throw new Error('Required sauce was not validated');
  await page.locator('.dc-customize-dialog select').first().selectOption({label:'BBQ'});
  await page.locator('.dc-customize-dialog textarea').fill('Salsa aparte');
  await page.locator('.dc-customize-confirm').click();
  if (await page.locator('.dc-customize-dialog').count()) throw new Error('Customize dialog did not close');
  await overlay.locator('.dc-cart-shortcut').click();
  await overlay.locator('.dc-summary.mobile-open').waitFor();
  if (!(await overlay.locator('.dc-selected-lines li').count())) throw new Error('Added item missing in summary');
  await page.screenshot({path:'browser-smoke-catalog-cart-mobile.png',fullPage:false});
  await overlay.locator('.dc-summary-mobile-close').click();
  await page.keyboard.press('Escape');
  if (await page.locator('.dc-overlay').count()) throw new Error('Escape failed to dismiss catalog');
  console.log('DIGITAL CATALOG:', JSON.stringify({products:count,requiredSauce:mustChoose,spa:page.url()===originalUrl}));

  // Exercise the assistant instead of checking compilation alone.
  await page.locator('.hercules-mascot-trigger').click();
  await page.waitForSelector('.hercules-dialog[role="dialog"]');
  await page.locator('.hercules-question').first().click();
  await page.waitForSelector('.hercules-bot-message');
  console.log('CHAT TEST:', JSON.stringify({
    questions: await page.locator('.hercules-question').count(),
    answers: await page.locator('.hercules-bot-message').count(),
    text: (await page.locator('.hercules-bot-message').last().innerText()).slice(0,110)
  }));
  await page.screenshot({path: 'browser-smoke-chat-mobile.png', fullPage: false});
  await page.keyboard.press('Escape');
  if (await page.locator('.hercules-dialog').count()) throw new Error('Escape did not close assistant');

  // User can add a product and dismiss the cart without getting trapped.
  await page.locator('#carta .ref-menu-item-button').first().click();
  await page.waitForSelector('.cart-panel');
  console.log('CART TEST:', JSON.stringify({
    items: await page.locator('.cart-panel h5').count(),
    focusInside: await page.evaluate(() => document.querySelector('.cart-panel')?.contains(document.activeElement))
  }));
  await page.keyboard.press('Escape');
  if (await page.locator('.cart-panel').count()) throw new Error('Cart did not close with Escape');
  await page.setViewportSize({width: 320, height: 640});
  await page.waitForTimeout(300);
  const narrow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth
  }));
  console.log('NARROW PHONE:', JSON.stringify(narrow));
  if (narrow.document > narrow.viewport + 1)
    throw new Error('Horizontal overflow detected at 320px');
  await page.screenshot({path: 'browser-smoke-narrow.png', fullPage: false});

  await page.setViewportSize({width: 1440, height: 900});
  await page.locator('.hercules-mascot-trigger').click();
  await page.waitForSelector('.hercules-dialog');
  await page.waitForTimeout(500); // allow panel entrance to settle before screenshot
  await page.screenshot({path: 'browser-smoke-chat-desktop.png', fullPage:false});
  await page.keyboard.press('Escape');
  // Desktop screenshot of full integrated catalog and persistent order panel.
  await page.locator('#carta .ref-menu-order-box button').click();
  await page.waitForSelector('.dc-overlay');
  await page.waitForTimeout(400);
  await page.screenshot({path:'browser-smoke-catalog-desktop.png',fullPage:false});
  await page.keyboard.press('Escape');
  await page.locator('#carta').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector('#carta').scrollIntoView({behavior:'instant',block:'start'}));
  await page.waitForTimeout(850);
  await page.screenshot({path: 'browser-smoke-menu-desktop.png', fullPage:false});
  await page.screenshot({path: 'browser-smoke-desktop.png', fullPage:false});
} finally {
  await browser.close();
}
