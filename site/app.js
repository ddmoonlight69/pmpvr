// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.stat-card, .problem-card, .model-card, .investment-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form submission (local testing)
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
// Read API base from meta tag (allows easy swapping after deploy)
const metaApiBase = document.querySelector('meta[name="api-base"]');
const API_BASE = (metaApiBase && metaApiBase.getAttribute('content')) || 'https://pmpvr-api.onrender.com';
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        contactStatus.textContent = 'Sending...';
        const data = new FormData(contactForm);
        const payload = Object.fromEntries(data.entries());
        try {
            const res = await fetch(API_BASE + '/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await res.json();
            if (json.ok) {
                contactStatus.textContent = 'Thanks — we received your message.';
                contactForm.reset();
            } else {
                contactStatus.textContent = json.error || 'Submission failed.';
            }
        } catch (err) {
            contactStatus.textContent = 'Could not reach local API. Run `api/npm start` or configure a production form integration.';
        }
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
const newsletterStatus = document.getElementById('newsletter-status');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        newsletterStatus.textContent = 'Subscribing...';
        const data = new FormData(newsletterForm);
        const payload = Object.fromEntries(data.entries());
        try {
            const res = await fetch(API_BASE + '/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await res.json();
            if (json.ok) {
                newsletterStatus.textContent = 'Subscribed — thank you!';
                newsletterForm.reset();
            } else {
                newsletterStatus.textContent = json.error || 'Subscription failed.';
            }
        } catch (err) {
            newsletterStatus.textContent = 'Could not reach local API. Run `api/npm start` or configure a production form integration.';
        }
    });
}

// Helper: switch to Formspree for production by setting data-formspree on forms
document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const endpoint = form.getAttribute('data-formspree');
        const statusEl = form.querySelector('[aria-live]') || form.querySelector('.status');
        if (statusEl) statusEl.textContent = 'Sending...';
        const data = new FormData(form);
        try {
            const res = await fetch(endpoint, { method: 'POST', body: data });
            if (res.ok) {
                if (statusEl) statusEl.textContent = 'Thanks — we received your submission.';
                form.reset();
            } else {
                if (statusEl) statusEl.textContent = 'Submission failed.';
            }
        } catch (err) {
            if (statusEl) statusEl.textContent = 'Submission failed.';
        }
    });
});
