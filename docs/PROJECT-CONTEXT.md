# Project Context — Axioma

## Team Roles

- **Frontend (me)**: HTML/CSS/JS pages, interactive SVG maps, responsive layout, all visual components
- **Backend developer**: Custom PHP CMS, CRM integration, reservation system, hosting, deployment
- **Handoff**: I deliver static HTML pages with `<!-- PHP: ... -->` markers; backend developer replaces mock data with PHP server-rendering

## Backend Developer's Tech Stack

Confirmed by analyzing his existing projects:

- **CSS framework**: Bootstrap 5.3+
- **JS libraries**: jQuery 3.x, jQuery UI 1.13.1, Bootstrap 5 JS bundle
- **Lightbox**: Fancybox (custom build in `/static/fancybox/`)
- **Gallery**: LightSlider for thumbnail carousels
- **Maps**: Google Maps JS API v3 with custom markers and info windows
- **Icons**: Font Awesome 6 (CDN)
- **Forms**: Standard `<form method="post">`, no AJAX
- **CMS**: Custom PHP, no WordPress/Laravel

## Reference Sites (same backend developer)

1. **portofranko.lt** — Primary reference (newest, Bootstrap 5, cleanest code)
2. **riverland.lt** — Calendar reservation system, interactive SVG floor plans
3. **romeoirdziuljeta.lt** — Similar patterns, SVG building maps

## Common Patterns Across Reference Sites

### SVG Interactive Maps
Two-layer structure:
- `div.svg-hold` — container with aspect ratio
- `svg` — inline SVG element
- `g.korpusai` — group for all buildings
- `g#building-X` — individual building group
- `polygon` elements with unique IDs for each apartment

Hover states via CSS classes, click handlers via jQuery delegated events.

### Forms
- `fieldset.user-form` wraps form sections
- `div.field` wraps each label+input pair
- Submit via standard POST, never AJAX
- Date pickers use jQuery UI datepicker with Lithuanian locale (`lt`)

### Google Maps
- `div.map-holder` container
- `div#gmap` for the map instance
- Custom marker images from `static/img/`
- Info windows with HTML content

### Responsive Approach
- Separate CSS files per breakpoint, NOT media queries in main stylesheets
- `iphone.css` — screens ≤900px
- `ipad.css` — screens 768-1024px
- Files loaded via `<link>` with `media` attribute in HTML head

### Analytics
- Google Tag Manager
- Facebook Pixel
- Standard event tracking on form submissions and key interactions
