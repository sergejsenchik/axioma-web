# Testing Patterns

**Analysis Date:** 2026-03-13

## Test Framework

**Status:** No testing framework configured

- No test runner (Jest, Vitest, Mocha, etc.) installed
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)
- No package.json with dev dependencies
- No test files (`.test.js`, `.spec.js`) present
- No assertion library configured

**Implication:** Testing deferred to backend developer or manual QA.

## Manual Testing Approach

**Browser Testing:**
- Open `index.html` directly in browser (no build step)
- Test locally at file:// protocol or via simple HTTP server
- Verify in modern browsers (Chrome, Firefox, Safari, Edge)

**Development Testing Commands:**
```bash
# No npm scripts configured
# Manual browser reload required for changes
# Use browser DevTools console for error inspection
```

**Verification Points:**
- CSS loads correctly via cascading link tags
- jQuery plugins (datepicker, fancybox) initialize without errors
- SVG polygons render with correct status colors
- Table rows populate from mock JSON data
- Click interactions highlight apartments in both table and SVG

## Test File Organization

**Not Applicable** — No test files in codebase.

**If tests are added in future:**
- Place alongside source files: `static/js/script.test.js`
- Naming pattern: `{file}.test.js`
- Test data: use mock JSON in `data/mock-apartments.json` as fixtures

## Mocking

**Mock Data Strategy:**
- Location: `data/mock-apartments.json`
- Purpose: Simulate apartment database during development
- Removed before handoff to backend

**Mock Data Loading:**
```javascript
if ($('.apartment-table').length || $('.svg-hold').length) {
  $.getJSON('data/mock-apartments.json', function (data) {
    if (data && data.apartments) {
      initApartmentTable(data.apartments);
      initSvgMap(data.apartments);
    }
  });
}
```

**Mock Data Schema:**
```json
{
  "apartments": [
    {
      "id": 1,
      "building": "A",
      "floor": 1,
      "number": "A-101",
      "rooms": 2,
      "area": 54.2,
      "price": 125000,
      "status": "sold",
      "balcony_area": 5.8,
      "orientation": "south",
      "photos": ["uploads/images/apt-a-101-1.jpg"],
      "plan_image": "static/img/plans/a-101.svg",
      "svg_polygon_id": "apt-a-101"
    }
  ]
}
```

**Current Data:**
- 12 apartments across 2 buildings (A, B)
- 3 floors per building
- Mix of 1-4 room apartments
- Status distribution: ~58% available, ~25% reserved, ~17% sold

**What to Mock:**
- Apartment data (always from JSON, never hardcoded)
- External API responses (if added later)

**What NOT to Mock:**
- Browser APIs (DOM methods work with real elements)
- jQuery library itself
- CSS styles (test visually in browser)

## Fixtures and Factories

**Test Data:**
Located at: `data/mock-apartments.json`

Sample apartment fixture:
```json
{
  "id": 1,
  "building": "A",
  "floor": 1,
  "number": "A-101",
  "rooms": 2,
  "area": 54.2,
  "price": 125000,
  "status": "sold",
  "balcony_area": 5.8,
  "orientation": "south",
  "photos": ["uploads/images/apt-a-101-1.jpg"],
  "plan_image": "static/img/plans/a-101.svg",
  "svg_polygon_id": "apt-a-101"
}
```

**Location:** `data/` directory

**Management:**
- Edit JSON manually for new test scenarios
- Keep realistic Lithuanian market prices (80,000-200,000 EUR)
- Match status distribution: 60% available, 25% reserved, 15% sold
- Ensure `svg_polygon_id` matches actual SVG polygon IDs in HTML

**Migration:** Backend developer replaces JSON loading with PHP loops at handoff.

## Coverage

**Requirements:** None enforced

**Current Status:** No automated coverage measurement

**Future Implementation:**
If tests are added, measure coverage for:
- Table rendering logic (`initApartmentTable`)
- SVG map highlighting (`initSvgMap`)
- Event handler binding and delegation
- Plugin initialization (datepicker, fancybox)

## Test Types

**Manual Browser Testing (Current):**
- Open index.html in Firefox/Chrome
- Verify form inputs (datepicker calendar)
- Click apartment table rows → verify SVG highlight
- Click SVG polygons → verify table row highlight
- Hover effects on polygons
- Fancybox opens on image click
- Status badges display correct colors

**If Unit Tests Added (Future):**
```javascript
// Example pattern (not currently implemented)
describe('initApartmentTable', () => {
  it('should render apartment rows from data', () => {
    const apartments = [
      { id: 1, number: 'A-101', rooms: 2, area: 54.2, price: 125000, status: 'available', svg_polygon_id: 'apt-a-101' }
    ];
    initApartmentTable(apartments);
    expect($('.apartment-table tbody tr').length).toBe(1);
    expect($('.apartment-table tbody tr').hasClass('tr-status-available')).toBe(true);
  });
});
```

**If Integration Tests Added (Future):**
```javascript
// Example pattern (not currently implemented)
describe('SVG + Table Interaction', () => {
  it('should highlight table row when SVG polygon clicked', () => {
    $('#apt-a-101').click();
    expect($('tr[data-apartment-id="apt-a-101"]').hasClass('active')).toBe(true);
  });
});
```

**No E2E Tests Configured** — Manual browser testing is current QA approach.

## DOM Testing Patterns

**Checking for Elements Before Initialization:**
```javascript
if ($('.apartment-table').length || $('.svg-hold').length) {
  // Only load data if DOM element exists
  $.getJSON('data/mock-apartments.json', function (data) { ... });
}
```

**Defensive Property Access:**
```javascript
if ($polygon.length) {
  // Element exists before manipulation
  $polygon.addClass('status-' + apt.status);
}
```

**jQuery Assertion Patterns (if tests added):**
```javascript
// Check class application
$('.apartment-polygon').hasClass('status-available');

// Check attribute binding
$('tr[data-apartment-id="apt-a-101"]').attr('data-apartment-id');

// Check text content
$('.status-badge').text();

// Check count
$('.apartment-table tbody tr').length;
```

## Plugin Initialization Testing

**Datepicker:**
```javascript
// Verify initialization
if ($('.datepicker').length) {
  // Check that datepicker applied
  $('.datepicker').data('datepicker'); // Plugin data object
}
```

**Fancybox:**
```javascript
// Verify plugin loaded
if (typeof $.fancybox !== 'undefined') {
  // Check that binding applied
  $('[data-fancybox]').data('fancybox');
}
```

**Manual Testing Checklist:**
- [ ] Datepicker opens on `.datepicker` input focus
- [ ] Lithuanian locale shows correct month/day names
- [ ] Fancybox opens on link click with `[data-fancybox]`
- [ ] Lightslider initializes if present on page

## Error Inspection

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for errors
- Verify network requests for JSON load success
- Check for plugin initialization warnings

**Common Issues to Check:**
- `Uncaught TypeError: $.getJSON is not a function` → jQuery not loaded before script.js
- `Datepicker not a function` → jQuery UI not loaded
- `Cannot read property 'apartments' of undefined` → JSON file missing or malformed
- SVG polygons not highlighting → `svg_polygon_id` mismatch with HTML IDs

## Testing During Handoff

**Before Handoff to Backend:**
1. Verify all mock data loads correctly
2. Test responsive layout on multiple screen sizes
3. Verify all interactive elements (table clicks, SVG clicks, form inputs)
4. Check that all `<!-- PHP: ... -->` markers are in place
5. Ensure JSON data paths relative to project root
6. Test in multiple browsers for compatibility

**Backend Developer Takes Over:**
1. Replaces `$.getJSON()` calls with PHP server-rendering
2. Maintains same HTML structure and class names
3. Preserves `svg_polygon_id` matching
4. Implements actual CRM/reservation backend
5. Adds automated testing as needed

---

*Testing analysis: 2026-03-13*
