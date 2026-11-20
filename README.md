# Keylink Business Support – Business Setup in Bahrain

Static landing page (HTML + CSS + JS). No build step.

## Deploy on GitHub Pages
1. Create a repository and upload everything in this folder (keep the `assets` folder).
2. Settings → Pages → Source: "Deploy from a branch" → `main` / root.
3. Optional: add your domain under Pages → Custom domain, then replace `./` in the canonical, `og:url` and schema `url` fields of `index.html` with your full URL (e.g. https://www.keylinkbah.com/business-setup-in-bahrain/).

## Structure
- index.html – page, SEO meta tags, and JSON-LD schema (after the footer)
- assets/css/styles.css – all styles
- assets/js/main.js – menu, FAQ, Calendly popup, WhatsApp form redirect
- assets/images/ – logo, favicon and photos
