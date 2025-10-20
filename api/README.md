# Local API for testing forms

This small Express server accepts contact and newsletter submissions for local testing only.

Endpoints:
- POST /contact — body: { firstName, lastName, email, phone, message }
- POST /newsletter — body: { email }
- GET /_debug/contacts — list stored contacts (in-memory)
- GET /_debug/subscribers — list stored subscribers (in-memory)

How to run:

```bash
cd api
npm install
npm start
# server runs on http://localhost:4000
```

In production consider using:
- Formspree / Netlify Forms / Mailgun / Sendgrid for contact emails
- A database (Postgres/Mongo) or CRM integration for persistence
- Proper validation, rate-limiting, spam protection, and secure storage

Docker / deployment
-------------------

Build and run locally with Docker:

```bash
cd api
docker build -t pmpvr-api:latest .
docker run -p 4000:4000 pmpvr-api:latest
# visit http://localhost:4000/health
```

Deploy to Render or Heroku:
- Render: create a new Web Service, connect your GitHub repo and set the Docker build command to use the included Dockerfile or let Render detect Node.
- Heroku: push the repo to a Heroku app (you can use the Dockerfile with Container Registry) or use a standard Node buildpack.

Render specific steps
---------------------
1. Go to https://dashboard.render.com/new and choose "Web Service".
2. Connect your GitHub repo (ddmoonlight69/pmpvr) and select the `main` branch.
3. Render will detect the `render.yaml` and the Dockerfile at `api/Dockerfile`. Confirm the service name `pmpvr-api` and deploy.
4. For the static site, create a "Static Site" on Render and point it at the `site/` folder (Render will also read `render.yaml` if you use the Create from Manifest flow).

After deploy, update your front-end fetch endpoints in `site/app.js` to the Render API URL (https://pmpvr-api.onrender.com/contact).


