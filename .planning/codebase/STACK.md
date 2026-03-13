# Technology Stack

**Analysis Date:** 2026-03-13

## Languages

**Primary:**
- HTML5 - Markup for all pages
- CSS3 - Styling with custom properties and responsive design
- JavaScript (ES5/ES6) - Client-side interactions via jQuery

**Secondary:**
- JSON - Mock apartment data structure (`data/mock-apartments.json`)

## Runtime

**Environment:**
- Browser (client-side only) - No server-side runtime for frontend
- All pages designed to work as static HTML files opened directly in browser

**Package Manager:**
- Not used - No npm build step for production
- All dependencies loaded via CDN or local files

## Frameworks

**Core:**
- Bootstrap 5.3.3 - Grid system and layout (`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3`)
- jQuery 3.7.1 - DOM manipulation and AJAX (`https://code.jquery.com/jquery-3.7.1.min.js`)
- jQuery UI 1.13.1 - Interactive components, datepicker with Lithuanian locale (`https://code.jquery.com/ui/1.13.1/`)

**UI Components:**
- Fancybox (custom build) - Lightbox gallery functionality
  - Files: `static/fancybox/jquery.fancybox.min.js`, `static/fancybox/jquery.fancybox.min.css`
- LightSlider 1.1.6 - Thumbnail carousel galleries (`https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/`)

**Icons:**
- Font Awesome 6.5.1 - Icon library (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/`)

**Typography:**
- Google Fonts API - Inter font family (`https://fonts.googleapis.com`)

## Key Dependencies

**Critical:**
- jQuery 3.7.1 - Required for all interactive behavior, datepicker, SVG map handling
- Bootstrap 5.3.3 - Grid, navigation, responsive utilities
- jQuery UI 1.13.1 - Datepicker component with Lithuanian locale configuration
- Fancybox - Lightbox for image galleries and photo viewing

**UI/UX:**
- LightSlider 1.1.6 - Gallery thumbnail carousels
- Font Awesome 6.5.1 - Icon assets throughout site

**Typography:**
- Google Fonts - Inter (weights: 300, 400, 500, 600, 700)

## Configuration

**Environment:**
- Frontend is static HTML - No environment variables required
- Backend will handle database and PHP configuration at handoff
- All mock data currently loaded from `data/mock-apartments.json` via `$.getJSON()`

**Build:**
- No build system - Files served as-is
- No transpilation or bundling required
- All CSS and JS inline or in `<script>`/`<link>` tags

**CSS Custom Properties (`:root`):**
- Location: `static/css/override.css`
- Brand colors: `--color-primary`, `--color-secondary`, `--color-accent`
- Status colors: `--color-available`, `--color-reserved`, `--color-sold`
- Typography: `--font-primary`, `--font-size-base`, `--line-height-base`

## Platform Requirements

**Development:**
- Any text editor (HTML/CSS/JS)
- Browser with JavaScript enabled (all modern browsers)
- No Node.js, npm, or build tools required
- JSON file support for mock data loading

**Production:**
- Static file hosting (Apache, Nginx, or any web server)
- Backend developer will deploy with PHP CMS replacing mock data
- No special server configuration needed for frontend files
- Browser compatibility: ES5+ JavaScript, CSS3 support

## Asset Loading

**CDN Endpoints:**
- Bootstrap: `cdn.jsdelivr.net`
- jQuery/jQuery UI: `code.jquery.com`
- Font Awesome: `cdnjs.cloudflare.com`
- Google Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`
- LightSlider: `cdnjs.cloudflare.com`

**Local Files:**
- Fancybox bundled locally in `static/fancybox/`
- Theme assets in `static/theme/css/`, `static/theme/js/`
- Project overrides in `static/css/` (override.css, iphone.css, ipad.css)
- Custom JavaScript in `static/js/script.js`
- Images and icons in `static/img/`

## Version Constraints

**Fixed Versions (Must Match):**
- Bootstrap 5.3.3 (specified in HTML)
- jQuery 3.7.1 (specified in HTML)
- jQuery UI 1.13.1 (specified in HTML and backend reference)
- Font Awesome 6.5.1 (specified in HTML)
- LightSlider 1.1.6 (specified in HTML)
- Google Fonts API v2 (CSS v2 query format)
- Fancybox (custom build, version in `static/fancybox/`)

---

*Stack analysis: 2026-03-13*
