# Codebase Structure

**Analysis Date:** 2026-03-13

## Directory Layout

```
axioma-web/
├── .claude/                    # Claude Code settings
├── .planning/                  # Planning documents (this directory)
│   └── codebase/
├── .git/                       # Git repository
├── docs/                       # Project documentation for team
│   ├── PROJECT-CONTEXT.md      # Backend developer patterns, team roles
│   └── MOCK-DATA-STRATEGY.md   # JSON schema, migration path
├── data/                       # Development-only mock data
│   └── mock-apartments.json    # Apartment data fixture (removed at handoff)
├── static/                     # Versioned theme and library files
│   ├── theme/                  # Bootstrap, Font Awesome, core libraries
│   │   ├── css/                # (future: theme CSS)
│   │   └── js/                 # (future: theme JS plugins)
│   ├── css/                    # Project-specific stylesheets
│   │   ├── override.css        # Main styles, CSS custom properties, responsive
│   │   ├── iphone.css          # Mobile overrides (≤900px)
│   │   └── ipad.css            # Tablet overrides (768-1024px)
│   ├── js/                     # Custom JavaScript
│   │   └── script.js           # All jQuery interactions and initialization
│   ├── fancybox/               # Lightbox library
│   │   ├── jquery.fancybox.min.css
│   │   └── jquery.fancybox.min.js
│   └── img/                    # Static assets (markers, SVG backgrounds, placeholders)
│       └── plans/              # (future: floor plan SVGs)
├── uploads/                    # CMS-managed files (placeholders during dev)
│   ├── images/                 # Apartment photos (content)
│   └── albums/                 # Photo album sets (content)
├── webflow-export/             # Webflow export (archive reference, not used)
├── index.html                  # Homepage (entry point)
├── CLAUDE.md                   # Tech stack requirements and patterns
└── README.md                   # (if present)
```

## Directory Purposes

**`data/`:**
- Purpose: Development-only mock data for frontend testing
- Contains: JSON files with apartment records, amenity lists, or other content fixtures
- Key files: `mock-apartments.json` (12 apartment records with rooms, price, status, photos)
- Lifecycle: Removed before backend handoff; backend PHP replaces with server-rendering
- Committed: Yes (needed for development)

**`static/css/`:**
- Purpose: Project-specific CSS that overrides or extends Bootstrap
- Contains: Custom color schemes, component styling, responsive adaptations
- Key files: `override.css` (main styles with CSS custom properties), `iphone.css` (mobile), `ipad.css` (tablet)
- Pattern: Separate file per breakpoint, not media queries inside main CSS (see CLAUDE.md)
- Committed: Yes

**`static/js/`:**
- Purpose: All custom JavaScript interactions (no npm build step)
- Contains: jQuery initialization, event handlers, data rendering, plugin configuration
- Key files: `script.js` (single monolithic file, all interactions)
- Lifecycle: Static file, loaded via `<script>` tag in HTML
- Committed: Yes

**`static/fancybox/`:**
- Purpose: Lightbox gallery vendor library
- Contains: Minified Fancybox CSS and JS (custom build)
- Key files: `jquery.fancybox.min.css`, `jquery.fancybox.min.js`
- Note: Custom build maintained by backend developer for consistency across projects
- Committed: Yes

**`static/img/`:**
- Purpose: Static image assets (building maps, custom map markers, SVG backgrounds, logo)
- Contains: SVG files for building floor plans, PNG/JPG marker icons, visual backgrounds
- Key files: (currently empty, use `.gitkeep` placeholder)
- Structure:
  - `plans/` subdirectory for floor plan SVGs (e.g., `a-301.svg`)
  - Root level for markers, logos, decoration images
- Committed: Yes (SVG and minimal icons)

**`uploads/images/`:**
- Purpose: CMS-managed apartment photos (content)
- Contains: JPG/PNG apartment photos linked from mock JSON and backend database
- Lifecycle: Populated by CMS during development, replaced by real photos in production
- Committed: No (content, not code)
- Path convention: `uploads/images/apt-{building}-{floor}{unit}-{photo-number}.jpg` (e.g., `apt-a-301-1.jpg`)

**`uploads/albums/`:**
- Purpose: CMS-managed photo album sets (e.g., construction progress, amenities)
- Contains: Organized photo collections by album
- Lifecycle: Populated by backend CMS
- Committed: No (content)

**`static/theme/css/` and `static/theme/js/`:**
- Purpose: Framework libraries and theme base (Bootstrap, Font Awesome, jQuery UI) — loaded via CDN in current setup
- Future use: Backend developer may place custom theme overrides here
- Committed: Yes (if used)

**`docs/`:**
- Purpose: Team documentation (not frontend code)
- Contains: PROJECT-CONTEXT.md (backend patterns, reference sites), MOCK-DATA-STRATEGY.md (JSON schema, migration path)
- Committed: Yes

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md
- Generated by: GSD mapper tool, consumed by planner/executor tools
- Committed: Yes

**`.claude/`:**
- Purpose: Claude Code local settings
- Contains: Claude-specific rules and configurations
- Committed: Yes (local preferences)

**`webflow-export/`:**
- Purpose: Archive of Webflow export (reference only, not used in production)
- Lifecycle: Kept for comparison with final build, can be removed after project handoff
- Committed: Yes (for team reference)

## Key File Locations

**Entry Points:**
- `index.html`: Main homepage entry point
- Navigation links to future pages: `/butai` (apartments), `/galerija` (gallery), `/vieta` (location), `/kontaktai` (contact)

**Configuration:**
- `CLAUDE.md`: Tech stack requirements, coding rules, file structure (MUST READ before implementing)
- `docs/PROJECT-CONTEXT.md`: Backend developer patterns, reference sites, team coordination
- `docs/MOCK-DATA-STRATEGY.md`: JSON schema for mock data, migration strategy for handoff

**Core Logic:**
- `static/js/script.js`: All custom interactions (apartment table rendering, SVG map, datepicker, fancybox)
- `static/css/override.css`: Main stylesheet with CSS custom properties (colors, typography), component styles
- `static/css/iphone.css`: Mobile-specific overrides (loaded on screens ≤900px)
- `static/css/ipad.css`: Tablet-specific overrides (loaded on screens 768-1024px)

**Data:**
- `data/mock-apartments.json`: Mock apartment records for development (12 apartments across 2 buildings, 3 floors each)

**Assets:**
- `static/fancybox/jquery.fancybox.min.js`: Lightbox initialization
- `static/img/`: Map markers, floor plan SVGs, logo, backgrounds
- `uploads/images/`: Apartment photos (paths referenced in JSON)

**Vendor & Third-party:**
- Bootstrap 5.3 CSS/JS: Loaded via CDN
- jQuery 3.x: Loaded via CDN
- jQuery UI 1.13.1: Loaded via CDN (includes Datepicker)
- Font Awesome 6: Loaded via CDN
- Google Fonts: Inter font family via CDN

## Naming Conventions

**Files:**
- HTML files: lowercase, hyphens for multi-word names (future: `apartments.html`, `contact.html`)
- CSS files: lowercase (override.css, iphone.css, ipad.css)
- JavaScript files: lowercase (script.js, no module files)
- JSON data: lowercase (mock-apartments.json)
- Images: lowercase with hyphens (`apt-a-301-1.jpg`, `floor-plan-a.svg`)

**Directories:**
- All lowercase, plural for collections (css/, js/, images/, albums/, uploads/)
- Semantic names matching function (static/, data/, docs/, uploads/)
- Structure mirrors backend developer's existing projects for familiarity

**CSS Classes:**
- Lowercase with hyphens: `.apartment-table`, `.status-available`, `.floor-plan`, `.svg-hold`
- Convention: `{component}-{state}` (e.g., `.apartment-polygon`, `.active`, `.status-reserved`)
- Status states: `.status-available`, `.status-reserved`, `.status-sold`
- Table row status: `.tr-status-available`, `.tr-status-reserved`, `.tr-status-sold`

**HTML IDs:**
- Lowercase with hyphens for SVG elements: `#apt-a-301`, `#building-a`, `#floor-3`
- Functional IDs: `#mainNav` (navbar collapse target), `#gmap` (Google Maps container)

**JavaScript Variables:**
- camelCase for all variables: `apartmentData`, `apartmentTable`, `statusText`
- jQuery objects prefixed with `$`: `$tbody`, `$polygon`, `$row`
- Function names: camelCase (`initApartmentTable`, `initSvgMap`)

**Data Attributes:**
- Lowercase with hyphens: `data-apartment-id`, `data-fancybox`, `data-bs-toggle`
- Used for linking DOM elements to data (SVG ID ↔ table row ↔ apartment record)

## Where to Add New Code

**New Feature (e.g., reservation system, contact form):**
- Primary code: Add markup to `index.html` (or new page file)
- Styling: Add CSS to `static/css/override.css`
- Interactivity: Add jQuery handlers to `static/js/script.js`
- Responsive overrides: Add mobile/tablet rules to `static/css/iphone.css` or `static/css/ipad.css`
- Example: For a reservation form, add `<form>` HTML, `.user-form` CSS styling, form submission handler in script.js

**New Page/Section:**
- Create new HTML file in project root (e.g., `apartments.html`, `contact.html`)
- Duplicate `index.html` structure: same `<head>` with all CSS/JS dependencies
- Add content to `<main>` section
- Update header navigation in `index.html` to link to new page
- If page needs data: Add data fetch to `script.js` with conditional check (`if ($('.page-specific-class').length)`)

**New Component (e.g., apartment card, photo gallery):**
- Implementation: Add HTML markup and CSS class structure to `static/css/override.css`
- Pattern: Define colors/typography via CSS custom properties (`:root {}`)
- Example: For apartment cards, add `.apartment-card { }` with child selectors for `.card-title`, `.card-price`, `.card-status`
- Interactivity: Add jQuery delegated event handlers if needed

**Utilities and Helpers:**
- Shared helpers: Keep in `static/js/script.js` (no separate utility files; single file approach required)
- Function organization: Group by feature (all apartment functions together, all form handlers together)
- Comments: Mark sections with multiline comments (`// -----------------------------------------------`)

**SVG Maps:**
- Building floor plan: Add inline `<svg>` to HTML (never `<img>` or `<object>`)
- Polygons: Each apartment unit is a `<polygon>` element with unique `id="apt-{building}-{floor}{unit}"`
- Styling: SVG polygons get CSS classes `apartment-polygon`, `status-{available|reserved|sold}`, `.active` (highlighted)
- Data linking: Polygon `id` must match apartment `svg_polygon_id` from JSON

**Mock Data:**
- Add apartment records to `data/mock-apartments.json` in same schema (fields: id, building, floor, number, rooms, area, price, status, balcony_area, orientation, photos, plan_image, svg_polygon_id)
- Photos: Path format `uploads/images/apt-{building}-{number}-{photo-index}.jpg`
- SVG polygon ID format: `apt-{building}-{floor}{unit}` (matches polygon `id` in inline SVG)

## Special Directories

**`data/`:**
- Purpose: Development-only fixtures
- Generated: No (manually created JSON)
- Committed: Yes
- Lifecycle: `data/mock-apartments.json` removed before backend handoff; PHP CMS takes over data delivery

**`uploads/`:**
- Purpose: CMS-managed content
- Generated: Yes (CMS populates with real content)
- Committed: No (`.gitignore` excludes this directory)
- Lifecycle: Placeholder images during dev, replaced with real photos in production

**`.planning/codebase/`:**
- Purpose: GSD analysis documents
- Generated: Yes (GSD mapper generates ARCHITECTURE.md, STRUCTURE.md, etc.)
- Committed: Yes
- Lifecycle: Updated when codebase structure changes significantly

**`webflow-export/`:**
- Purpose: Archive of original Webflow design export
- Generated: No (one-time Webflow export)
- Committed: Yes (for team reference)
- Lifecycle: Can be deleted after project handoff if not needed for comparison

**`static/theme/`:**
- Purpose: Framework and theme libraries
- Generated: No (manually placed CDN links or vendor files)
- Committed: Yes (if custom overrides added)
- Lifecycle: Persistent, updated only when upgrading Bootstrap/jQuery versions

---

*Structure analysis: 2026-03-13*
