const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory store (for local testing only)
const contacts = [];
const subscribers = [];

app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!email || !message) return res.status(400).json({ ok: false, error: 'email and message are required' });
  const entry = { id: contacts.length + 1, firstName, lastName, email, phone, message, receivedAt: new Date().toISOString() };
  contacts.push(entry);
  console.log('[contact]', entry);
  return res.json({ ok: true, entry });
});

app.post('/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ ok: false, error: 'email is required' });
  if (subscribers.find(s => s.email === email)) return res.status(409).json({ ok: false, error: 'already subscribed' });
  const sub = { id: subscribers.length + 1, email, subscribedAt: new Date().toISOString() };
  subscribers.push(sub);
  console.log('[newsletter]', sub);
  return res.json({ ok: true, sub });
});

app.get('/_debug/contacts', (req, res) => res.json({ contacts }));
app.get('/_debug/subscribers', (req, res) => res.json({ subscribers }));

// health check for containers / platforms
app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.listen(port, () => console.log(`pmpvr API listening on http://localhost:${port}`));
