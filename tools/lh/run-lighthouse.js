const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse(url) {
  const outDir = path.resolve(__dirname, '..', '..', 'site', 'lighthouse-report');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Launching Chrome via chrome-launcher...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu']
  });

  const options = {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    logLevel: 'info'
  };

  try {
    console.log('Running Lighthouse for', url);
    const runnerResult = await lighthouse(url, options);
    const reportJson = runnerResult.report;
    fs.writeFileSync(path.join(outDir, 'report.json'), reportJson);

    // Generate HTML report from the LHR
    const lhr = runnerResult.lhr;
    const htmlReport = require('lighthouse/report/generator/report-generator').generateReport(lhr, 'html');
    fs.writeFileSync(path.join(outDir, 'report.html'), htmlReport);

    console.log('Lighthouse report saved to', outDir);
  } catch (err) {
    console.error('Lighthouse run failed:', err);
  } finally {
    await chrome.kill();
  }
}

const url = process.argv[2] || 'http://localhost:5000';
runLighthouse(url).catch(err => {
  console.error(err);
  process.exit(1);
});

