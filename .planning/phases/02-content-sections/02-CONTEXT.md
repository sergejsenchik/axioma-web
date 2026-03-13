# Phase 2: Content Sections - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all homepage sections below the hero: About (with digit-train stat counters), Discover (3 numbered cards with hover effects), Location/"Measured in minutes" (Lottie circle animation + rotating text), Timeline/Construction Progress, Contact (form + 5 agent cards), and Footer. Each section uses Bootstrap grid layout matching the Webflow design. Scroll-triggered entrance animations and navbar are Phase 3 scope.

</domain>

<decisions>
## Implementation Decisions

### Location section animation
- Use **Lottie library** (lottie-web) for the circular progress ring — `cirlce_loader.json` exists in `webflow-export/documents/`
- Text labels **rotate in sequence** timed with Lottie progress, matching Webflow behavior: "TO THE PARK / BY THE RIVER", "CITY CENTER / ON FOOT", "NEAREST SHOPPING MALL", "HIGHSCHOOL CAMPUS", "AIRPORT WITH CAR"
- Walking/driving times (5, 8, 10, 15, 20 minutes) — use Webflow values as starting point + add **PHP markers** for backend to verify/update
- Animation **triggers on scroll** into viewport via IntersectionObserver

### Content data accuracy
- Stat counters: **60+** (residences), **1205** (m² area), **2025** (year) — confirmed real data, use as-is
- Sales agents: 5 agents (Valius, Elona, Vladimir, Ovidijus, Konstantinas) with real phone numbers and @ntligence.lt emails — use as-is
- Construction timeline: Q4 2024 – Q4 2026 with Lithuanian milestone descriptions — confirmed real data, use as-is
- Footer "Other projects": Riverland and Porto Franko logos — confirmed real data, use as-is
- All English Webflow text **translated to Lithuanian** as starting point for client review (consistent with Phase 1 approach)

### Purple texture overlay
- Use actual **`texture-purple.jpg`** image file (22KB) from `webflow-export/images/` — NOT a CSS gradient
- Applied as **repeating background-image** at 200px tile size, matching Webflow CSS: `background-size: 200px`
- Applied **uniformly** across: About heading area, Discover card overlays, Timeline/Construction progress section, Footer
- Copy `texture-purple.jpg` to `static/img/`

### Discover card hover effect
- **Full 2-layer reveal animation** faithful to Webflow: layer-one slides in (purple overlay), then layer-two slides in, image has subtle scale
- Images are **visible by default** — hover adds overlay effect (deviation from Webflow which hides images by default)
- "View more" links use `href="#"` with `<!-- PHP: link to Apie projektą page -->` markers — future about page
- Three cards: 01 "Mathematical Spatial Comfort", 02 "Engineering as a Constant", 03 "The Axiom of Location" — translated to Lithuanian

### Claude's Discretion
- Digit-train counter animation implementation details (CSS transform approach, timing)
- Contact form layout (image left + form right matching Webflow)
- Footer layout structure (logo, quick links, social icons, other projects, copyright)
- Section spacing and visual hierarchy
- Timeline progress line indicator implementation
- Lottie library CDN choice (unpkg, cdnjs, etc.)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `btn-cta` with text-swap structure: already built in Phase 1 — reuse for "About project" CTA and contact form submit
- CSS custom properties: all brand colors, typography tokens, spacing defined in `override.css`
- `.container-wide` (1600px) class: available for wider sections like Discover
- `hero-overlay` gradient pattern: reference for dark overlays on sections
- Arrow icon `static/img/arrow-down.webp`: reusable for "View more" rotated arrows
- Logo files: `axioma-logo-full.svg`, `axioma-logo-white.svg` in `static/img/`

### Established Patterns
- EB Garamond italic for display headings (h1-h4), Inter Tight for body/h5-h6
- Warm off-white (#fefaf9) background throughout
- Separate responsive CSS files (iphone.css, ipad.css) — no media queries in override.css
- jQuery document.ready pattern in script.js
- PHP markers: `<!-- PHP: description -->` on dynamic content areas
- Forms: `<form method="post" action="URL">` only, no AJAX

### Integration Points
- `webflow-export/index.html` lines 332-874: complete reference for all content sections
- `webflow-export/images/`: Discover card images (01.jpg, 05.jpg, 06.jpg), agent photos, construction photo, other project logos, texture-purple.jpg
- `webflow-export/documents/cirlce_loader.json`: Lottie animation for location section
- `webflow-export/css/*.webflow.css` line 9284-9288: texture-purple CSS definition
- `static/js/script.js`: hero slider + smooth scroll already present — new section JS added here
- `index.html` line 134-141: placeholder `#about` section ready to be replaced with full content

</code_context>

<specifics>
## Specific Ideas

- Purple texture is an **actual image pattern** (`texture-purple.jpg`), not a CSS gradient — client specifically requested this treatment
- Discover card images visible by default (user preference) — differs from Webflow which hides them
- "View more" links on Discover cards will lead to a future "Apie projektą" (About the project) page
- Location section times are unconfirmed — add PHP markers for backend to verify the actual walking/driving distances
- Timeline milestones already have Lithuanian text in the Webflow (Statybų pradžia, Požeminės automobilių aikštelės konstrukcijos, etc.)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-sections*
*Context gathered: 2026-03-13*
