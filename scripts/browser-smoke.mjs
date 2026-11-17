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
  await page.setViewportSize({width: 1440, height: 900});
  await page.screenshot({path: 'browser-smoke-desktop.png', fullPage:false});
} finally {
  await browser.close();
}
