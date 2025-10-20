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
