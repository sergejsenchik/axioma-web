# Axioma — Homepage Refactor

## What This Is

Marketing homepage for Axioma residential complex in Lithuania, refactored from a Webflow export into production-ready HTML using Bootstrap 5 + jQuery. This is a frontend-only deliverable — a separate PHP developer handles backend CMS, hosting, and dynamic content. The homepage is the first milestone; other pages (apartments, gallery, location, contacts, etc.) follow in future milestones.

## Core Value

The homepage must faithfully reproduce the Webflow design using the backend developer's expected stack (Bootstrap 5, jQuery, specific file structure) so it can be seamlessly integrated into the PHP CMS without rework.

## Requirements

### Validated

<!-- Existing codebase already provides these -->

- ✓ Project file structure matches backend developer's pattern — existing
- ✓ CSS custom properties defined in `:root` for brand colors, status colors, typography — existing
- ✓ Responsive CSS architecture with separate files (override.css, iphone.css, ipad.css) — existing
- ✓ Mock apartment data schema defined (data/mock-apartments.json) — existing
- ✓ Fancybox lightbox bundled locally — existing
- ✓ CDN endpoints configured for Bootstrap, jQuery, jQuery UI, Font Awesome, LightSlider — existing
- ✓ PHP handoff markers documented (<!-- PHP: ... --> convention) — existing

### Active

- [ ] Hero section with video background slider (3 slides, MP4/WebM, autoplay, loop)
- [ ] Navbar with sticky behavior, logo swap, mobile hamburger menu
- [ ] About section with content layout and imagery
- [ ] Discover section with interactive elements
- [ ] Picnic Spot / amenities section
- [ ] Newsletter signup section with POST form
- [ ] Contact section with form (POST method, no AJAX)
- [ ] Footer with navigation links, contact info, social icons
- [ ] All hover animations recreated (button effects, text transitions, card hovers)
- [ ] Scroll-triggered animations (fade-in, parallax effects)
- [ ] Confetti Lottie animation on popup interaction
- [ ] Floating popup/CTA widget (phone, social links) with show/hide on scroll
- [ ] Lithuanian language for all visible text content
- [ ] Responsive layout: desktop, tablet (ipad.css), mobile (iphone.css)
- [ ] All images and videos stored locally (static/img/, uploads/images/, videos/)
- [ ] PHP markers (<!-- PHP: ... -->) on all dynamic content areas
- [ ] Bootstrap 5 grid replaces Webflow layout classes
- [ ] Clean semantic HTML (no Webflow data-* attributes or w-* classes)

### Out of Scope

- Other pages (apartments list, apartment detail, gallery, location, contacts, reservation) — future milestones
- Interactive SVG apartment maps — future milestone
- Mock apartment data rendering on homepage — no apartment listing on homepage
- Backend PHP integration — separate developer
- Google Maps integration — location page milestone
- SEO optimization beyond basic meta tags — later
- Google Analytics / Facebook Pixel — backend developer adds at deployment

## Context

- **Webflow export location**: `webflow-export/index.html` (880 lines, reference for design)
- **Webflow CSS**: Custom Webflow classes (rt-*, w-*) need complete replacement with Bootstrap equivalents
- **Fonts**: "EB Garamond" for display headings (h1-h4), "Inter Tight" for body text and smaller headings (h5-h6), loaded via Google Fonts CDN
- **Backend developer's reference sites**: portofranko.lt (primary), riverland.lt, romeoirdziuljeta.lt — same patterns expected
- **Building info**: 1 building (details TBD for apartment pages)
- **Video assets**: Hero background video files (MP4 + WebM) included in webflow-export/videos/

## Constraints

- **Tech stack**: Bootstrap 5.3+, jQuery 3.x, jQuery UI 1.13.1 — no React/Vue/Angular/Tailwind, no npm build
- **File structure**: Must match backend developer's pattern (static/theme/, static/css/, static/js/, uploads/)
- **Forms**: `<form method="post" action="URL">` only — no AJAX, no fetch API
- **Responsive**: Separate CSS files per breakpoint, NOT media queries in main stylesheets
- **Static HTML**: Pages must work opened directly in browser, no SPA patterns
- **Language**: All UI text in Lithuanian

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Homepage only for v1 milestone | Other pages need additional design/planning | — Pending |
| Faithful adaptation (not pixel-match) | Bootstrap grid may cause minor layout differences vs Webflow | — Pending |
| Keep all animations | Client expects premium feel matching Webflow version | — Pending |
| Local video files | Backend dev will move to production hosting at handoff | — Pending |
| Lithuanian text now | Final site is Lithuanian, avoid double translation work | — Pending |

---
*Last updated: 2026-03-13 after initialization*
