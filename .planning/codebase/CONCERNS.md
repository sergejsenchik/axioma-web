# Codebase Concerns

**Analysis Date:** 2026-03-13

## Tech Debt

**Missing Error Handling in Mock Data Loading:**
- Issue: `$.getJSON()` in `static/js/script.js` line 13 has no error callback or fallback handling
- Files: `static/js/script.js`
- Impact: If `data/mock-apartments.json` fails to load (network error, 404, malformed JSON), apartment table and SVG map remain uninitialized with no visual feedback to user; breaking core functionality silently
- Fix approach: Add `.fail()` callback to log error and display user-facing message; add conditional check for data validity before calling `initApartmentTable()` and `initSvgMap()`

**Empty Responsive CSS Files:**
- Issue: `static/css/iphone.css` and `static/css/ipad.css` contain only comments and no actual styles
- Files: `static/css/iphone.css`, `static/css/ipad.css`
- Impact: Responsive breakpoints are loaded but provide zero styling; tablet and mobile users see unstyled page; media query setup exists but implementation is missing
- Fix approach: Populate both files with viewport-specific overrides (reduce font sizes, adjust margins, reorganize layout for mobile/tablet breakpoints)

**Missing Foundation SVG Map Structure:**
- Issue: Script assumes SVG elements with class `apartment-polygon` and HTML structure `<div class="svg-hold"><svg>...</svg></div>` exist, but neither index.html nor any included files provide this markup
- Files: `static/js/script.js` lines 93-117, `index.html`
- Impact: SVG map initialization code runs but has nothing to initialize; click handlers attach to non-existent elements; interactive map feature completely non-functional
- Fix approach: Create actual apartment SVG map markup in relevant page (likely `butai` or apartment listing page) with proper building/floor/apartment polygon structure and IDs matching mock data

**Incomplete Asset Directory Structure:**
- Issue: Required directories exist but are empty: `static/img/` contains only `.gitkeep`, `uploads/images/` and `uploads/albums/` are placeholders
- Files: `static/img/`, `uploads/images/`, `uploads/albums/`
- Impact: All image references in mock data (`uploads/images/apt-a-101-1.jpg`, `static/img/plans/a-101.svg`) point to non-existent files; apartment photos and floor plan SVGs fail to load
- Fix approach: Create placeholder images or coordinate with backend developer on image directory structure; document expected image naming convention in docs

**Unused Webflow Export Directory:**
- Issue: `webflow-export/` contains 880-line HTML file with separate CSS/JS stack (webflow.js, separate Bootstrap reference) completely disconnected from active `index.html`
- Files: `webflow-export/*`, particularly `webflow-export/index.html`, `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` (16,907 lines), `webflow-export/js/webflow.js`
- Impact: Two parallel, conflicting designs; confusing repository state; wasted disk space; duplicate CSS definitions; unclear which is active; migration path unclear
- Fix approach: Decide immediately: keep webflow export for reference in separate branch/tag, or remove entirely. If keeping, document in README why it exists and its relationship to active code.

## Known Bugs

**jQuery Delegation Selector Mismatch:**
- Symptoms: Table row clicks fail to highlight SVG polygon (line 112-116 in script.js)
- Files: `static/js/script.js`
- Trigger: Click any row in `.apartment-table` with `[data-apartment-id]` attribute
- Root cause: Line 113 uses `.data('apartment-id')` to get ID, but SVG polygons are initialized with `.attr('data-apartment-id', ...)` (line 99) — data attributes set after DOM ready may not sync with jQuery `.data()` cache
- Workaround: Use `.attr('data-apartment-id')` on line 113 instead of `.data()` to force fresh DOM read
- Fix approach: Standardize on `.attr()` for data-apartment-id throughout codebase OR use `.data()` consistently during initialization

**Status Badge Missing Styles:**
- Symptoms: Status badges render with text but no visual styling
- Files: `static/css/override.css` line 33-35, `static/js/script.js` line 82
- Root cause: Styles `.status-available`, `.status-reserved`, `.status-sold` only apply color property; no background, padding, border-radius, or badge appearance
- Fix approach: Add `.status-badge` base styles (background, padding, border-radius, display:inline-block) in override.css; status colors should apply to background-color not text color

## Security Considerations

**Client-Side Mock Data Exposure:**
- Risk: All apartment data (prices, availability status, building layout) is visible in `data/mock-apartments.json` and loaded unencrypted into browser
- Files: `data/mock-apartments.json`
- Current mitigation: File is not sensitive production data (dev-only mock), but pattern shows no server-side validation
- Recommendations: In production, never serve apartment inventory via static JSON; implement server-side rendering (as planned with PHP backend). For dev: add comment in script.js warning about mock-only usage

**No Content Security Policy:**
- Risk: Multiple external CDN dependencies (Google Fonts, Bootstrap, Font Awesome, jQuery, jQuery UI, Fancybox, LightSlider from unpinned versions); no CSP headers restrict where scripts load from
- Files: `index.html` lines 9-88
- Current mitigation: Using established CDNs, but no hash verification or CSP directives
- Recommendations: Pin all CDN versions to specific releases (not floating versions); set CSP meta tag to restrict script-src; document CDN change process

**No Input Validation Framework:**
- Risk: Form markup expects POST submission with no client-side validation; backend will handle but currently no guards if field structure changes
- Files: Form structure not yet present, but project uses `<form method="post">` pattern per CLAUDE.md
- Current mitigation: Backend developer responsibility per project structure
- Recommendations: Once forms added, validate field names early; prevent unexpected form structure; document required field names for backend coordination

## Performance Bottlenecks

**Unoptimized Webflow CSS Bundle:**
- Problem: `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` is 16,907 lines; even if unused in active build, it exists in repo and increases git clone time
- Files: `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css`
- Cause: Webflow exports all component styles even if unused; design tool overhead
- Improvement path: Remove webflow-export directory entirely or move to separate git-ignored reference branch; active styles in `static/css/override.css` (52 lines) should stay

**Missing CSS Minification:**
- Problem: `override.css` is readable but not minified; no build step to optimize production assets
- Files: `static/css/override.css`, `static/css/iphone.css`, `static/css/ipad.css`
- Cause: Project deliberately has no build step (per CLAUDE.md: "No npm build step for production")
- Improvement path: If minification required, use manual tool or document production optimization process; for now acceptable given project scale

**jQuery Initialization Overhead:**
- Problem: Script checks for element existence 3 times (`$('.apartment-table').length`, `$('.svg-hold').length`, `$('.datepicker').length`) and jQuery is loaded before checking; minor but multiplicative
- Files: `static/js/script.js` lines 12, 24, 52
- Cause: Defensive programming pattern; jQuery always loaded regardless of page type
- Improvement path: Not critical for current scale; acceptable given static site nature; optimize only if performance monitoring shows issue

## Fragile Areas

**Apartment Data JSON Coupling:**
- Files: `static/js/script.js`, `data/mock-apartments.json`
- Why fragile: Script has hardcoded expectations:
  - `svg_polygon_id` must exist in JSON and match exactly with SVG element ID (line 95-99)
  - `status` values must be exactly "available", "reserved", "sold" (line 68-72)
  - Table assumes specific fields: `number`, `rooms`, `area`, `price` (line 78-81)
  - If backend changes field names or structure, script breaks silently
- Safe modification: Document JSON schema clearly (already exists in MOCK-DATA-STRATEGY.md); add schema validation in script before rendering; log warnings if expected fields missing
- Test coverage: No validation tests; no mocking strategy for different status values

**SVG Polygon ID Dependency:**
- Files: `static/js/script.js`, future apartment pages
- Why fragile: Cross-file string matching:
  - JSON `svg_polygon_id` value (e.g., "apt-a-101")
  - Must match exactly to SVG `<polygon id="apt-a-101">`
  - No validation or error if ID missing
  - Easy to typo when creating SVG or JSON
- Safe modification: Create utility function to validate polygon IDs exist before initialization; log all missing IDs; fail gracefully with partial rendering instead of silent skip
- Test coverage: No tests for polygon existence; no coverage for mismatch scenarios

**Hardcoded Lithuanian Locale:**
- Files: `static/js/script.js` lines 25-46
- Why fragile: Datepicker configuration is hardcoded for Lithuanian locale; if site needs multi-language, duplication required; locale data is inline (52 lines) with no i18n framework
- Safe modification: Extract locale object into separate `static/js/locales.js` file; document locale extension process
- Test coverage: No tests for date formatting; no edge case coverage for month names

## Scaling Limits

**Single-Page Static Structure:**
- Current capacity: 1 main index.html; referenced resources (CSS, JS) are duplicated per page in backend
- Limit: As page count grows (apartments, gallery, locations, team pages), duplication increases; no templating system for header/footer/nav
- Scaling path: Backend developer should implement PHP includes/templating; frontend provides static HTML template once, backend renders multiple pages; document exact markup for `<!-- PHP: header include -->` and footer

**Mock Data Volume:**
- Current capacity: 12 apartments in JSON
- Limit: Script loads entire JSON into memory; no pagination, filtering, or lazy loading
- Scaling path: Implement server-side pagination with `.getJSON()` parameters; add lazy loading for large apartment counts; backend will replace JSON with PHP anyway

**CSS Specificity Debt:**
- Current capacity: 52 lines in override.css; low specificity conflicts
- Limit: As more styles added, specificity creep will cause bugs; no class hierarchy or naming convention enforcement
- Scaling path: Document CSS architecture (already follows BEM-like `apartment-card`, `status-available`); maintain flat specificity; use CSS variables for colors (already done)

## Dependencies at Risk

**jQuery EOL Trajectory:**
- Risk: jQuery 3.x is in maintenance mode, large ecosystem moving to modern JS; no security patches planned for far future
- Impact: Security vulnerabilities in jQuery would require forking or modernization
- Mitigation: Project deliberately chose jQuery per CLAUDE.md and backend developer's pattern; acceptable for static site
- Migration plan: Backend developer would need to upgrade if jQuery receives critical vulnerability; provides 3-5 years runway before critical

**Fancybox Version Pinning:**
- Risk: Using local minified build in `static/fancybox/jquery.fancybox.min.js` with no version metadata
- Impact: Unknown Fancybox version makes it impossible to track if bugs exist or security patches apply
- Mitigation: Version is outdated (jQuery Fancybox is superseded by Fancybox v4) but works for current needs
- Migration plan: Document Fancybox version used; if issues arise, contact backend developer for library refresh

**CDN Dependencies Without Fallbacks:**
- Risk: Bootstrap, jQuery, jQuery UI, Font Awesome all loaded from CDN with no fallback if CDN fails
- Impact: CDN downtime breaks entire site styling and interactivity
- Mitigation: CDNs are highly available; risk is low for commercial CDNs
- Migration plan: If critical, implement service worker fallback or local copies; document process

## Missing Critical Features

**No Error Pages:**
- Problem: 404.html and 401.html exist in webflow-export but not in active codebase; no error page handling documented
- Blocks: Users see generic server error instead of branded error page
- Priority: Medium — backend will handle, but frontend should provide template

**No Image Optimization:**
- Problem: No documentation for image format (JPG, PNG, WebP), sizing, or responsive srcset
- Blocks: Apartment photos may load slowly; no mobile image optimization
- Priority: Medium — can be handled during backend image serving setup

**No Analytics Tracking:**
- Problem: CLAUDE.md mentions Google Tag Manager and Facebook Pixel should be added, but not present
- Blocks: Cannot track visitor behavior, form submissions, conversions
- Priority: High (per project context) — but will be added by backend developer

## Test Coverage Gaps

**No JavaScript Tests:**
- What's not tested: Apartment table rendering, SVG map initialization, jQuery datepicker locale, Fancybox initialization
- Files: `static/js/script.js` (119 lines, 0% coverage)
- Risk: Regression in core functionality (apartment display, interactivity) goes undetected; data loading failure silent
- Priority: Medium — small script size makes manual testing feasible, but automated tests would prevent regressions

**No Responsive CSS Validation:**
- What's not tested: Mobile and tablet layouts; breakpoint behavior; iphone.css and ipad.css are empty (no tests can pass)
- Files: `static/css/iphone.css`, `static/css/ipad.css`
- Risk: Mobile users see broken layout until styles are added; no validation that breakpoints work
- Priority: High — blocking mobile functionality

**No Cross-Browser Testing Documentation:**
- What's not tested: IE11 compatibility (jQuery 3.x dropped IE11 support in 3.5.0), Safari quirks, Edge rendering
- Files: All files
- Risk: Users on older browsers see broken site with no fallback messaging
- Priority: Low-Medium — modern browsers only, but should document minimum version

**No Form Validation Tests:**
- What's not tested: Form submission behavior, required field validation, error messaging
- Files: No form markup yet; will be added in future phases
- Risk: When forms added, validation bugs won't be caught until production
- Priority: High — should implement test strategy before adding complex forms

---

*Concerns audit: 2026-03-13*
