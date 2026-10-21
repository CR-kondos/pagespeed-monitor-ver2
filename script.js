const lighthouseModule = require('lighthouse');
const lighthouse = lighthouseModule.default || lighthouseModule;
const chromeLauncher = require('chrome-launcher');

const URL = 'https://www.ocn.ne.jp';

async function runLighthouse(formFactor) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless']
  });

  const result = await lighthouse(URL, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance'],
    formFactor: formFactor
  });

  const audits = result.lhr.audits;

  console.log(`===== ${formFactor.toUpperCase()} =====`);

  console.log(
    'LCP:',
    audits['largest-contentful-paint'].numericValue
  );

  console.log(
    'TBT:',
    audits['total-blocking-time'].numericValue
  );

  console.log(
    'CLS:',
    audits['cumulative-layout-shift'].numericValue
  );

  await chrome.kill();
}

(async () => {
  await runLighthouse('mobile');
  await runLighthouse('desktop');
})();
