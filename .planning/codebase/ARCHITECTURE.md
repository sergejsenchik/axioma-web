# Architecture

**Analysis Date:** 2026-03-13

## Pattern Overview

**Overall:** Progressive Enhancement / Static HTML with jQuery Interactivity

**Key Characteristics:**
- Server-agnostic: All pages work as static HTML files opened directly in browser
- Data-driven rendering: Mock JSON data (`data/mock-apartments.json`) populates tables and SVG maps
- jQuery-based interaction: All event handlers and DOM manipulation via jQuery
- Framework-free: No React, Vue, Angular, or build tooling required
- CMS-ready: Marked locations for PHP server-rendering at handoff (`<!-- PHP: ... -->`)

## Layers

**Presentation Layer:**
- Purpose: HTML markup, Bootstrap grid layout, semantic structure
- Location: `index.html` and other page files (to be created)
- Contains: `<header>`, `<main>`, `<footer>` with Bootstrap 5 layout
- Depends on: CSS files, theme assets
- Used by: Rendering engine (browser)

**Styling Layer:**
- Purpose: Visual design, responsive breakpoints, component styling
- Location: `static/css/` (override.css, iphone.css, ipad.css)
- Contains: CSS custom properties, status colors, interactive element styles
- Depends on: Bootstrap 5 CDN, Google Fonts, Font Awesome
- Used by: Presentation layer

**Script Layer:**
- Purpose: DOM manipulation, event handling, data loading
- Location: `static/js/script.js`
- Contains: jQuery initialization, apartment data rendering, SVG map interaction
- Depends on: jQuery 3.x, jQuery UI 1.13.1, Fancybox, LightSlider
- Used by: Browser runtime on page load

**Data Layer (Development):**
- Purpose: Mock apartment data for frontend development
- Location: `data/mock-apartments.json`
- Contains: 12 apartment records with metadata (building, floor, rooms, price, status, photos, SVG polygon ID)
- Depends on: Nothing (static JSON file)
- Used by: `initApartmentTable()` and `initSvgMap()` functions in script.js

**Asset Layer:**
- Purpose: Static media and vendor libraries
- Location: `static/fancybox/`, `static/img/`, `uploads/images/`, `uploads/albums/`
- Contains: Fancybox JS/CSS, map markers, building SVGs, apartment photos
- Depends on: Nothing (served as-is)
- Used by: HTML pages and script.js

## Data Flow

**Page Load → Apartment Data Display:**

1. Browser loads `index.html` with Bootstrap 5, jQuery, and custom script.js
2. jQuery `$(document).ready())` triggers
3. If page contains `.apartment-table` or `.svg-hold`, script initiates data load
4. `$.getJSON('data/mock-apartments.json')` fetches mock apartment data
5. `initApartmentTable(apartments)` renders HTML rows with status styling (`tr-status-{available|reserved|sold}`)
6. `initSvgMap(apartments)` applies status classes to SVG polygons matching `svg_polygon_id` values
7. CSS classes (`status-available`, `status-reserved`, `status-sold`) determine colors and opacity

**User Interaction — SVG Map:**

1. User clicks SVG polygon element with class `.apartment-polygon`
2. jQuery delegated event handler on `$(document).on('click', '.apartment-polygon')`
3. Apartment ID extracted from polygon `id` attribute
4. Corresponding table row highlighted: `tr[data-apartment-id="apt-a-301"]`
5. All other rows de-highlighted by removing `.active` class

**User Interaction — Table Row:**

1. User clicks table row with `data-apartment-id` attribute
2. jQuery delegated event handler on `$(document).on('click', '.apartment-table tr[data-apartment-id]')`
3. SVG polygon ID extracted from row data attribute
4. Matching polygon highlighted with `.active` class, others de-highlighted

**Form Submission:**

- All forms use standard HTML `<form method="post" action="URL">`
- No AJAX or fetch API used
- jQuery UI Datepicker attached to `.datepicker` elements with Lithuanian locale configuration
- Form processing delegated to backend PHP

**Lightbox Gallery:**

1. Elements with `[data-fancybox]` attribute detected on page load
2. `$.fancybox()` initialization wraps them with lightbox functionality
3. Fancybox config enables loop, zoom, close buttons, and thumbnail preview

**State Management:**
- No centralized state management (no Redux, Vuex, etc.)
- DOM-driven state: table row highlighting via `.active` class, polygon opacity via `.status-*` classes
- Apartment data loaded once per page into JavaScript array, rendered to DOM
- Interaction state persists only within current page session (no persistence layer)

## Key Abstractions

**Apartment Entity:**
- Purpose: Represents a single residential unit with all associated metadata
- Examples: `data/mock-apartments.json` (source), HTML table rows, SVG polygon elements
- Pattern: Each apartment has unique `svg_polygon_id` linking table row and polygon element
- Schema: id, building, floor, number, rooms, area, price, status, balcony_area, orientation, photos, plan_image, svg_polygon_id

**Status Classification:**
- Purpose: Categorizes apartments into availability states
- Values: "available", "reserved", "sold"
- Implementation: Applied as CSS class (`status-available`) to both SVG polygons and table rows
- Visual encoding: Color + opacity for polygons, left border + badge color for table rows

**SVG Interactive Map:**
- Purpose: Spatial representation of building apartments with click interactivity
- Implementation: Inline `<svg>` element containing `<polygon>` elements with unique IDs
- Link to data: Polygon `id` matches apartment `svg_polygon_id` from JSON
- Styling: Status classes determine fill color and opacity; `.active` class highlights on selection

**Responsive Design:**
- Purpose: Adapt layout to different screen sizes
- Breakpoints:
  - Desktop (≥1025px): `override.css` only
  - Tablet (768-1024px): `override.css` + `ipad.css`
  - Mobile (≤900px): `override.css` + `iphone.css`
- Implementation: Separate CSS files loaded via media query attributes on `<link>` tags, not media queries within CSS

**Fancybox Lightbox:**
- Purpose: Display apartment photos in full-screen gallery with navigation
- Implementation: jQuery plugin wrapping any element with `[data-fancybox]` attribute
- Configuration: Loop enabled, zoom/close buttons visible, auto-start thumbnails

**jQuery UI Datepicker:**
- Purpose: Provide calendar widget for reservation date selection
- Implementation: Initialized on `.datepicker` input elements
- Configuration: Lithuanian locale with month/day names in Lithuanian

## Entry Points

**Main Page:**
- Location: `index.html`
- Triggers: Direct browser load
- Responsibilities:
  - Load all CSS (Bootstrap, Font Awesome, jQuery UI, Fancybox, project styles)
  - Render header with navigation
  - Define hero section and content placeholders with `<!-- PHP: ... -->` markers
  - Load jQuery, Bootstrap JS, Fancybox, LightSlider, and custom script.js
  - Initialize all page interactions via script.js

**Apartment Listing Page (to be created):**
- Location: `/butai` (path referenced in header nav)
- Responsibilities:
  - Render `.apartment-table` with thead/tbody for mock data binding
  - Include `.svg-hold` container for building SVG map
  - Load mock data and trigger `initApartmentTable()` and `initSvgMap()`

**Gallery Page (to be created):**
- Location: `/galerija` (path referenced in header nav)
- Responsibilities:
  - Display photo galleries with `[data-fancybox]` attributes
  - Use LightSlider for thumbnail carousels

**Location Page (to be created):**
- Location: `/vieta` (path referenced in header nav)
- Responsibilities:
  - Embed Google Maps JS API v3 container
  - Add custom markers with apartment/amenity info windows

**Contact Page (to be created):**
- Location: `/kontaktai` (path referenced in header nav)
- Responsibilities:
  - Render contact form with `fieldset.user-form`, `div.field` structure
  - Include `.datepicker` for date input if booking functionality present
  - POST form data to backend handler

## Error Handling

**Strategy:** Graceful degradation with console warnings

**Patterns:**
- Mock data load fails ($.getJSON error): Console error logged, page displays empty tables/maps without crashing
- SVG polygon not found: Loop continues, other apartments render normally
- jQuery plugins not available: Check `typeof $.fancybox !== 'undefined'` before initialization
- Datepicker element not present: Initialization skipped via `.length` check
- Form submission: Delegated to backend (no client-side validation shown, will be added as needed)

## Cross-Cutting Concerns

**Logging:**
- Console logs (if needed) only via `console.log()` in custom code
- Third-party libraries (Bootstrap, jQuery) output debugging to console if verbose

**Validation:**
- Form validation: Deferred to backend PHP (no client-side validation in current implementation)
- Data validation: Mock JSON is assumed valid; no schema validation in script.js
- SVG mapping: Element existence checked via `.length` before manipulation

**Authentication:**
- Not implemented in frontend (deferred to backend PHP/CRM)
- Placeholder for authenticated endpoints in `<!-- PHP: ... -->` comments

**Analytics & Tracking:**
- Google Tag Manager and Facebook Pixel mentioned in PROJECT-CONTEXT.md but not yet implemented
- Ready for backend developer to inject tracking code via PHP

**Localization:**
- HTML language attribute: `<html lang="lt">` (Lithuanian)
- UI strings: Hardcoded Lithuanian text in status badge translations (script.js lines 68-71)
- jQuery UI Datepicker: Lithuanian locale configuration provided (script.js lines 25-45)
- Future: Apartment data and backend content will be translatable via CMS

---

*Architecture analysis: 2026-03-13*
