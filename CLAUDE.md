# Axioma — Residential Complex Website (Frontend Only)

Marketing website for a residential complex in Lithuania. I build HTML/CSS/JS; a separate PHP developer handles backend, CRM, and hosting.

## Tech Stack (MUST follow exactly)

- Bootstrap 5.3+ for grid and layout
- jQuery 3.x + jQuery UI 1.13.1 for all JS interactions (datepicker with Lithuanian locale)
- Fancybox for lightbox, LightSlider for gallery thumbnails
- Font Awesome 6 for icons
- Google Fonts for typography
- Google Maps JS API v3 with custom markers for location pages
- jQuery UI via CDN: `https://code.jquery.com/ui/1.13.1/jquery-ui.js`

**IMPORTANT: Do NOT use React, Vue, Angular, Tailwind, CSS-in-JS, or any JS framework. No npm build step for production. No fetch API for form submissions. No SPA patterns. All pages must work as static HTML files opened directly in a browser.**

## File Structure

This structure is mandatory — it mirrors the backend developer's existing projects for seamless handoff.

```
static/theme/css/   — Bootstrap, Font Awesome, theme base styles
static/theme/js/    — jQuery, Bootstrap JS, theme plugins
static/css/         — override.css, iphone.css, ipad.css (project overrides)
static/js/          — script.js (all custom interactions)
static/fancybox/    — Fancybox CSS + JS
static/img/         — static images, map markers, SVG backgrounds
uploads/images/     — CMS-managed photos (placeholders during dev)
uploads/albums/     — photo albums (placeholders during dev)
data/               — mock JSON for development only, removed before handoff
```

## How to Write Code for This Project

- All forms use `<form method="post" action="URL">` — never AJAX, never fetch
- Responsive layout: use separate CSS files per breakpoint (`iphone.css` for ≤900px, `ipad.css` for 768-1024px) — do NOT put media queries inside main stylesheets
- Define colors and typography as CSS custom properties in `:root {}`
- Use lowercase-hyphenated class names (`apartment-card`, `status-available`, `floor-plan`)
- Mark every area where PHP will inject dynamic content with: `<!-- PHP: description -->`
- Give unique IDs to all SVG polygons for buildings, floors, apartments (`building-a`, `floor-3`, `apt-a-101`)
- Interactive SVG maps use inline `<svg>` elements, never `<img>` or `<object>`
- All apartment data during development comes from `data/mock-apartments.json` loaded via `$.getJSON`
- All code comments and variable names in English

## Detailed Context

Read these when working on specific features:

- @docs/PROJECT-CONTEXT.md — backend developer's patterns, reference sites analysis, team roles
- @docs/MOCK-DATA-STRATEGY.md — JSON schema for mock apartment data, migration path for backend
