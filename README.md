# Apple‑style Developer Portfolio (Static)

A clean, Apple‑inspired portfolio you can host on GitHub Pages. Built with **HTML, CSS, and vanilla JS**.

## Features
- Smooth reveal animations and gentle hover effects
- Dark mode toggle (persisted)
- Responsive grid of interactive project cards (data-driven via `data/projects.js`)
- Placeholder Blog section (easy to swap for a static blog later)
- Contact form UI (no backend yet)

## Getting Started
1. **Edit your name** in `index.html` (title + brand). Add your links in the “Elsewhere” card.
2. **Add projects** in `data/projects.js` — title, description, tech, links.
3. Optionally customize styles in `styles.css` (colors, radii, spacing).

## Run locally
Just open `index.html` in a modern browser. No build step.

## Deploy to GitHub Pages
1. Create a new repo (e.g. `portfolio`), and upload these files.
2. Commit & push `main` (or `master`).
3. In the repo settings → **Pages**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `/root`
4. Your site will be available at `https://<your‑user>.github.io/<repo>/` shortly.

> Tip: If assets don't load, ensure relative paths are correct (this template uses relative paths).

## Next steps
- Wire the contact form to a service (Formspree, Netlify Forms, or an Apps Script endpoint).
- Add a `/blog` directory and list posts dynamically, or integrate a static site generator if you prefer.
- Add a `projects.json` endpoint and fetch it instead of bundling in `projects.js`.
