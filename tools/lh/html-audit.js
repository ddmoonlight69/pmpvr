const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.resolve(__dirname, '..', '..', 'site', 'index.html');
const html = fs.readFileSync(filePath, 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const results = [];

// lang
if (!doc.documentElement.lang) results.push('Document <html> is missing lang attribute');

// title
if (!doc.querySelector('title')) results.push('Missing <title> element');

// meta description
if (!doc.querySelector('meta[name="description"]')) results.push('Missing meta description');

// skip link
if (!doc.querySelector('.skip-link')) results.push('Missing skip link with class "skip-link"');

// images without alt
const imgs = Array.from(doc.querySelectorAll('img'));
const imgsMissingAlt = imgs.filter(i => !i.hasAttribute('alt') || i.getAttribute('alt').trim() === '');
if (imgsMissingAlt.length) results.push(`Found ${imgsMissingAlt.length} <img> elements missing alt text`);

// forms with inputs lacking labels
const forms = Array.from(doc.querySelectorAll('form'));
forms.forEach((form, idx) => {
  const inputs = Array.from(form.querySelectorAll('input, textarea, select'));
  inputs.forEach(input => {
    const id = input.id;
    const hasLabel = id && doc.querySelector(`label[for="${id}"]`);
    const ariaLabel = input.getAttribute('aria-label');
    if (!hasLabel && !ariaLabel && input.getAttribute('type') !== 'hidden') {
      results.push(`Form ${idx + 1} has an input without label or aria-label: <${input.tagName.toLowerCase()} name="${input.getAttribute('name') || ''}">`);
    }
  });
});

if (!results.length) {
  console.log('No basic HTML accessibility/SEO issues detected by html-audit.');
  process.exit(0);
}

console.log('html-audit results:');
results.forEach(r => console.log('- ' + r));
process.exit(0);
