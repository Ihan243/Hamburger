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
  await page.screenshot({path: 'browser-smoke-desktop.png', fullPage:false});
} finally {
  await browser.close();
}
