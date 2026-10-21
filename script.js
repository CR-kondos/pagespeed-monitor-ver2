const lighthouseModule = require('lighthouse');
const lighthouse = lighthouseModule.default || lighthouseModule;
const chromeLauncher = require('chrome-launcher');

const URL = 'https://www.ocn.ne.jp';

(async () => {

  // =====================
  // MOBILE
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
  // DESKTOP
  // =====================
  const desktopChrome = await chromeLauncher.launch({
    chromeFlags: ['--headless']
  });

  const desktopResult = await lighthouse(URL, {
    port: desktopChrome.port,
    output: 'json',
    preset: 'desktop'
  });

  const desktopAudits = desktopResult.lhr.audits;

  console.log('===== DESKTOP =====');

  console.log(
    'Config Settings:'
  );

  console.log(
    desktopResult.lhr.configSettings
  );

  console.log(
    'Final URL:',
    desktopResult.lhr.finalDisplayedUrl
  );

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
