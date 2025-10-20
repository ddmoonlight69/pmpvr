# MemoryVerse VR - Static Site

This folder contains a scaffolded static landing page for MemoryVerse VR.

Quick start:

1. Install dev dependencies:

```bash
cd site
npm install
```

2. Start a local static server:

```bash
npm start
# open http://localhost:5000 in your browser
```

Files:
- `index.html` — main page
- `styles.css` — extracted styles
- `app.js` — small interactive behavior
- `package.json` — convenience script to run a static server

Forms and production
--------------------

The contact and newsletter forms are wired to a local API for testing (`/workspaces/pmpvr/api`). For production you have two easy choices:

1. Formspree (no backend required)
	- Create a Formspree form and copy the endpoint URL (https://formspree.io/f/yourId).
	- Add `data-formspree="https://formspree.io/f/yourId"` attribute to the `<form>` element in `index.html`.
	- The site will submit directly to Formspree and you will receive emails or view submissions in their dashboard.

2. Use your server (recommended if you need CRM persistence)
	- Deploy the `api/` Express server and switch the JS to POST to your deployed API endpoint.

Deploying
---------
- You can deploy the static `site/` folder to GitHub Pages, Netlify, or Vercel. A GitHub Actions workflow is included at `.github/workflows/deploy-site.yml` to publish `/site` to GitHub Pages on pushes to `main`.

