# Coding Conventions

**Analysis Date:** 2026-03-13

## Naming Patterns

**Files:**
- HTML files: lowercase with hyphens (e.g., `index.html`)
- CSS files: lowercase with hyphens (e.g., `override.css`, `iphone.css`, `ipad.css`)
- JavaScript files: lowercase with hyphens (e.g., `script.js`)
- Directories: lowercase with hyphens (e.g., `static/theme/css`, `static/theme/js`)
- JSON data files: lowercase with hyphens (e.g., `mock-apartments.json`)

**CSS Classes:**
- Lowercase with hyphens: `apartment-table`, `status-available`, `apartment-polygon`, `svg-hold`, `site-header`, `site-footer`
- Status classes: `status-{status}` (e.g., `status-available`, `status-reserved`, `status-sold`)
- Table row status: `tr-status-{status}` (e.g., `tr-status-available`)
- Functional classes: `datepicker`, `navbar-toggler`, `collapse`
- Data attributes: `data-apartment-id`, `data-fancybox`

**JavaScript Variables:**
- jQuery-wrapped elements prefixed with `$`: `$tbody`, `$polygon`, `$row`
- Regular variables: camelCase (e.g., `apartments`, `statusText`, `aptId`)
- Function names: camelCase (e.g., `initApartmentTable`, `initSvgMap`)
- Object properties: camelCase (e.g., `svg_polygon_id`, `balcony_area`, `orientation`)

**HTML IDs:**
- Lowercase with hyphens for major sections: `mainNav`
- Apartment SVG polygon IDs: `apt-{building}-{number}` (e.g., `apt-a-101`, `apt-b-202`)
- Container IDs: `gmap`, `apartment-table`

**JSON Data Fields:**
- Snake_case for data fields: `svg_polygon_id`, `balcony_area`, `plan_image`
- Lowercase enum values: `available`, `reserved`, `sold` (for status)
- Lowercase building codes: `"A"`, `"B"`, `"C"`

## Code Style

**Formatting:**
- No automated formatter configured; JavaScript uses standard jQuery conventions
- Indentation: 2 spaces (observed in HTML and CSS files)
- Line length: no strict limit, but keep readable

**Linting:**
- No linter (ESLint, etc.) configured
- No automated style checker active
- Manual code review required before handoff to backend developer

**Comment Style:**
```javascript
// Section headers — dashed lines for major blocks
// -----------------------------------------------
// Load mock apartment data (dev only)
// Backend will replace with PHP server-rendering
// -----------------------------------------------

// Inline comments for complex logic
```

## Import Organization

**Script Loading Order (HTML head):**
1. Meta tags and preconnect
2. Google Fonts
3. Framework CSS (Bootstrap)
4. Icon library (Font Awesome)
5. Component CSS (jQuery UI, Fancybox, LightSlider)
6. Project overrides (override.css)
7. Responsive breakpoint overrides (ipad.css, iphone.css)

**Script Loading Order (HTML body end):**
1. jQuery core
2. jQuery UI
3. Bootstrap JS
4. Plugin libraries (Fancybox, LightSlider)
5. Project scripts (script.js)

**No module imports or ES6 modules** — all scripts loaded globally via `<script src>` tags.

## Error Handling

**jQuery AJAX/JSON:**
- Use `.getJSON()` without explicit error handler
- Defensive check for DOM elements before initialization: `if ($('.apartment-table').length)`
- Defensive check for data existence: `if (data && data.apartments)`

**Plugin Initialization:**
- Check plugin availability before use: `if (typeof $.fancybox !== 'undefined')`
- Check element existence before applying methods: `if ($polygon.length)`

**No try/catch blocks** — jQuery errors logged to browser console; form submissions fail silently with no explicit error display.

## Logging

**Framework:** Native browser `console` (no custom logger)

**Patterns:**
- No explicit logging in production code
- Errors from `.getJSON()` and other jQuery methods appear in browser DevTools console
- Datepicker and plugin errors logged automatically by their respective libraries

**Development only:**
- Add `console.log()` as needed during development
- Remove before handoff to backend

## Comments

**When to Comment:**
- Section dividers for major functional blocks
- Complex jQuery selectors or chained operations
- Business logic for status-to-text mappings
- Notes about handoff to backend (e.g., "Backend will replace with PHP server-rendering")

**No JSDoc/TSDoc** — lightweight jQuery code without formal documentation requirements.

**Example Comment Pattern:**
```javascript
// -----------------------------------------------
// SVG map initialization
// -----------------------------------------------
function initSvgMap(apartments) {
  apartments.forEach(function (apt) {
    var $polygon = $('#' + apt.svg_polygon_id);
    if ($polygon.length) {
      $polygon
        .addClass('status-' + apt.status)
        .attr('data-apartment-id', apt.svg_polygon_id);
    }
  });
}
```

## Function Design

**Size:** 10-30 lines typical for utility functions

**Parameters:**
- Single parameter for arrays: `function initApartmentTable(apartments)`
- Pass full data objects, not primitive values
- jQuery selections passed as-is: `var $tbody = $('.apartment-table tbody')`

**Return Values:**
- Most functions perform DOM operations and don't return values
- Data retrieval uses jQuery callbacks, not return statements
- Early returns for guard clauses: `if (!$tbody.length) return;`

**Function Scope:**
- Functions declared inside `$(document).ready()` block (not hoisted to global)
- Private utility functions (e.g., `initApartmentTable`, `initSvgMap`)
- No explicit export/module pattern

## Module Design

**No Explicit Modules** — all code in single `static/js/script.js` file.

**Organization:**
1. IIFE wrapper via `$(document).ready()`
2. Feature initialization (datepicker, fancybox)
3. Utility functions defined inline
4. Event delegation at end

**Exports:** None — direct DOM manipulation

**Barrel Files:** Not applicable

## CSS Variables

**Location:** `static/css/override.css` in `:root {}`

**Naming Convention:** `--color-{name}`, `--font-{property}`, `--font-size-{size}`

**Color Variables:**
```css
--color-primary: #2c3e50;
--color-secondary: #e67e22;
--color-available: #27ae60;
--color-reserved: #f39c12;
--color-sold: #e74c3c;
```

**Typography Variables:**
```css
--font-primary: 'Inter', sans-serif;
--font-size-base: 16px;
--line-height-base: 1.6;
```

## Responsive Design Conventions

**Breakpoints:**
- iPhone (mobile): ≤900px — `static/css/iphone.css`
- iPad (tablet): 768-1024px — `static/css/ipad.css`
- Desktop: >1024px — `static/css/override.css`

**Loading Method:**
```html
<link href="static/css/override.css" rel="stylesheet">
<link href="static/css/ipad.css" rel="stylesheet" media="screen and (min-width:768px) and (max-width:1024px)">
<link href="static/css/iphone.css" rel="stylesheet" media="screen and (max-width:900px)">
```

**Avoid media queries inside stylesheets** — use separate files instead.

## HTML Markup Conventions

**PHP Integration Markers:**
```html
<!-- PHP: {description} -->
```

Used to mark locations where backend will inject dynamic content (headers, footers, dynamic sections).

**SVG Integration:**
- Inline `<svg>` elements in HTML, never `<img>` or `<object>` tags
- Apartment polygons have unique IDs: `id="apt-a-101"`
- Parent group: `<g class="korpusai">` for all buildings

**Form Structure:**
```html
<form method="post" action="URL">
  <fieldset class="user-form">
    <div class="field">
      <label>Field Name</label>
      <input type="..." class="form-control">
    </div>
  </fieldset>
</form>
```

**Data Attributes:**
- Always use `data-*` attributes for JavaScript bindings
- `data-apartment-id` links table rows to SVG polygons
- `data-fancybox` links images to lightbox

## Bootstrap Integration

**Version:** Bootstrap 5.3+

**Class Conventions:**
- Grid classes: `container`, `row`, `col-*`
- Utilities: `ms-auto`, `text-center`, `py-5`
- Components: `navbar`, `navbar-brand`, `navbar-toggler`, `collapse`
- Form controls: `form-control`, `btn`, `btn-primary`

**No custom grid system** — all layout uses Bootstrap.

---

*Convention analysis: 2026-03-13*
