const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless']
  });

  const result = await lighthouse(
    'https://www.ocn.ne.jp',
    {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance']
    }
  );

  const audits = result.lhr.audits;

  console.log('LCP:', audits['largest-contentful-paint'].numericValue);
  console.log('TBT:', audits['total-blocking-time'].numericValue);
  console.log('CLS:', audits['cumulative-layout-shift'].numericValue);

  await chrome.kill();
})();
