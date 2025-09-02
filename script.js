// Simple Apple-inspired interactions with zero dependencies

// Persisted theme
const root = document.documentElement;
const THEME_KEY = 'theme';
const stored = localStorage.getItem(THEME_KEY);
if (stored) {
  root.classList.toggle('dark', stored === 'dark');
} else {
  // Respect OS preference on first load
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.classList.add('dark');
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.classList.toggle('dark') ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Build project cards from data
const grid = document.getElementById('projects-grid');
function createProjectCard(p) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-visual">${p.badge || 'Project'}</div>
    <div class="card-body">
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="meta">${(p.tech||[]).map(t => `<span class="chip">${t}</span>`).join('')}</div>
      <div class="card-actions">
        ${p.demo ? `<a class="btn ghost" href="${p.demo}" target="_blank" rel="noopener">Live</a>` : ''}
        ${p.source ? `<a class="inline-cta" href="${p.source}" target="_blank" rel="noopener">Source ›</a>` : ''}
      </div>
    </div>
  `;
  return card;
}

if (window.PROJECTS && Array.isArray(window.PROJECTS)) {
  window.PROJECTS.forEach(p => grid.appendChild(createProjectCard(p)));
}

// Contact form (UI only)
const form = document.getElementById('contact-form');
const toast = document.getElementById('form-toast');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = fd.get('name').trim();
  const email = fd.get('email').trim();
  const message = fd.get('message').trim();

  let valid = true;
  const nameHelp = form.querySelector('#name + .help');
  const emailHelp = form.querySelector('#email + .help');
  const msgHelp = form.querySelector('#message + .help');

  nameHelp.textContent = '';
  emailHelp.textContent = '';
  msgHelp.textContent = '';

  if (!name) { nameHelp.textContent = 'Please enter your name.'; valid = false; }
  if (!email || !validateEmail(email)) { emailHelp.textContent = 'Please enter a valid email.'; valid = false; }
  if (!message) { msgHelp.textContent = 'Please enter a short message.'; valid = false; }

  if (!valid) return;

  // Demo success
  toast.hidden = false;
  form.reset();
  setTimeout(() => { toast.hidden = true; }, 3000);
});
