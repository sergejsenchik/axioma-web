# External Integrations

**Analysis Date:** 2026-03-13

## APIs & External Services

**Google Fonts:**
- Service: Google Fonts API (typography)
- What it's used for: Load Inter font family (weights 300-700)
- CDN: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700`
- Auth: None (public API, no key required)
- Note: Preconnect DNS resolution at `https://fonts.gstatic.com`

**Google Maps JS API v3:**
- Service: Google Maps API (location pages)
- What it's used for: Interactive maps with custom markers and info windows
- Reference: `div#gmap` container for map instance
- Marker images: Located in `static/img/`
- Auth: API key required - Will be provided by backend developer at deployment
- Status: Planned for future implementation (documented in PROJECT-CONTEXT.md)

## Data Storage

**Databases:**
- None - Frontend only
- Backend developer will implement PHP CMS database
- Mock data during development: `data/mock-apartments.json`

**File Storage:**
- Local filesystem during development
- Upload directories (placeholders): `uploads/images/`, `uploads/albums/`
- Static assets: `static/img/`, `static/css/`, `static/js/`
- Mock data: `data/mock-apartments.json`

**Caching:**
- Browser caching via HTTP headers (configured by backend/server)
- No explicit client-side caching in frontend code

## Data Management

**Mock Apartment Data:**
- Location: `data/mock-apartments.json`
- Loading method: jQuery `$.getJSON()` in `static/js/script.js` line 13
- Schema: Apartment objects with id, building, floor, number, rooms, area, price, status, photos, plan_image, svg_polygon_id
- Development only: Removed before handoff to backend developer
- Migration path: Backend replaces `$.getJSON()` with server-rendered PHP loops

## Authentication & Identity

**Auth Provider:**
- None - Frontend is public/anonymous
- Custom PHP authentication will be implemented by backend developer
- No user accounts or login required for apartment browsing
- Forms use standard POST submission (no AJAX)

## Monitoring & Observability

**Error Tracking:**
- Not currently integrated
- Planned for implementation: Google Tag Manager and Facebook Pixel (documented in PROJECT-CONTEXT.md as reference site analytics)

**Logs:**
- Browser console logs (developer use only)
- No production logging configured
- Backend developer will handle error tracking and logging

**Analytics (Planned):**
- Google Tag Manager - Event tracking on form submissions and key interactions
- Facebook Pixel - Conversion tracking
- Implementation details: To be added by backend developer

## CI/CD & Deployment

**Hosting:**
- Backend developer's server (project-specific PHP hosting)
- Static files served by web server (Apache/Nginx)
- No special deployment pipeline for frontend

**CI Pipeline:**
- None - Static HTML files, no build process
- Backend developer handles deployment of final PHP application

**Deployment Process:**
- Frontend developer delivers: HTML pages with `<!-- PHP: ... -->` markers
- Backend developer: Replaces markers with PHP server-rendering

## Environment Configuration

**Required env vars:**
- None for frontend (static files)
- Backend will use: Google Maps API key, database credentials, CRM integration settings

**Secrets location:**
- Not applicable for frontend
- Backend developer manages secrets server-side

## Form Submissions

**Method:**
- Standard HTML form submission: `<form method="post" action="URL">`
- NO AJAX, NO fetch API
- Form sections wrapped in `fieldset.user-form`
- Each input wrapped in `div.field` with label

**Date Input:**
- jQuery UI datepicker with Lithuanian locale
- Implementation: `static/js/script.js` lines 24-46
- Locale configuration includes full month/day names in Lithuanian

**Apartment Data Submission:**
- Contact/inquiry forms: Standard POST (backend handles)
- Reservation system: Will be implemented by backend with form submission

## Webhooks & Callbacks

**Incoming:**
- None - Frontend is read-only from user perspective

**Outgoing:**
- Form submissions POST to backend endpoints (URLs defined in HTML action attributes)
- Backend developer will configure CRM webhook destinations
- Reservation data: Submitted via form POST to backend

## SVG Interactive Maps

**Technology:**
- Inline SVG elements (never `<img>` or `<object>`)
- jQuery event delegation for click handlers
- CSS class-based styling for hover/status states

**Structure:**
- Container: `div.svg-hold`
- SVG element: Inline in HTML
- Building groups: `g#building-X` (e.g., `g#building-a`)
- Apartment polygons: Unique IDs matching `svg_polygon_id` from mock data
- Coordination: `static/js/script.js` lines 93-117 (initSvgMap function)

**Data Binding:**
- SVG polygon IDs match apartment IDs in mock data
- CSS status classes: `.status-available`, `.status-reserved`, `.status-sold`
- Click handler highlights corresponding table row
- Table row click highlights corresponding SVG polygon

## Content Delivery

**CDN Providers Used:**
- jsDelivr (Bootstrap)
- cdnjs.cloudflare.com (Font Awesome, LightSlider)
- code.jquery.com (jQuery, jQuery UI)
- Google APIs (Fonts)

**Fallback Strategy:**
- All libraries loaded from CDN without fallbacks
- Backend developer will assess and implement CDN failover if needed

---

*Integration audit: 2026-03-13*
