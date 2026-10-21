const lighthouseModule = require('lighthouse');
const lighthouse = lighthouseModule.default || lighthouseModule;
const chromeLauncher = require('chrome-launcher');

const URL = 'https://www.ocn.ne.jp';

(async () => {

  // =====================
  // Mobile
  // =====================
  const mobileChrome = await chromeLauncher.launch({
    chromeFlags: ['--headless']
  });

  const mobileResult = await lighthouse(URL, {
    port: mobileChrome.port,
    output: 'json',
    onlyCategories: ['performance']
  });

  const mobileAudits = mobileResult.lhr.audits;

  console.log('===== MOBILE =====');
  console.log(
    'LCP:',
    mobileAudits['largest-contentful-paint'].numericValue
  );
  console.log(
    'TBT:',
    mobileAudits['total-blocking-time'].numericValue
  );
  console.log(
    'CLS:',
    mobileAudits['cumulative-layout-shift'].numericValue
  );

  await mobileChrome.kill();


  // =====================
  // Desktop
  // =====================
  const desktopChrome = await chromeLauncher.launch({
    chromeFlags: [
      '--headless',
      '--window-size=1350,940'
    ]
  });

  const desktopResult = await lighthouse(URL, {
    port: desktopChrome.port,
    output: 'json',
    onlyCategories: ['performance'],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    }
  });

  const desktopAudits = desktopResult.lhr.audits;

  console.log('===== DESKTOP =====');
  console.log(
    'LCP:',
    desktopAudits['largest-contentful-paint'].numericValue
  );
  console.log(
    'TBT:',
    desktopAudits['total-blocking-time'].numericValue
  );
  console.log(
    'CLS:',
    desktopAudits['cumulative-layout-shift'].numericValue
  );

  await desktopChrome.kill();

})();
