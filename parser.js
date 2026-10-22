const fs = require('fs');

const mobile = JSON.parse(
  fs.readFileSync('mobile-report.json', 'utf8')
);

const desktop = JSON.parse(
  fs.readFileSync('desktop-report.json', 'utf8')
);

const now = new Date().toISOString();

const row = [
  now,

  mobile.audits['largest-contentful-paint'].numericValue,
  mobile.audits['total-blocking-time'].numericValue,
  mobile.audits['cumulative-layout-shift'].numericValue,

  desktop.audits['largest-contentful-paint'].numericValue,
  desktop.audits['total-blocking-time'].numericValue,
  desktop.audits['cumulative-layout-shift'].numericValue

].join(',');

const header =
'datetime,mobile_lcp,mobile_tbt,mobile_cls,desktop_lcp,desktop_tbt,desktop_cls\n';

if (!fs.existsSync('metrics.csv')) {
  fs.writeFileSync(
    'metrics.csv',
    header + row + '\n'
  );
} else {
  fs.appendFileSync(
    'metrics.csv',
    row + '\n'
  );
}

console.log('CSV updated');
