# Requirements: Axioma Homepage Refactor

**Defined:** 2026-03-13
**Core Value:** Faithfully reproduce the Webflow homepage design using the backend developer's expected Bootstrap 5 + jQuery stack for seamless PHP CMS integration.

## v1 Requirements

Requirements for homepage milestone. Each maps to roadmap phases.

### Foundation

- [x] **FOUN-01**: HTML boilerplate uses Bootstrap 5.3.3 grid, jQuery 3.7.1, and all required CDN/local dependencies
- [x] **FOUN-02**: CSS custom properties extracted from Webflow (colors, typography, spacing) defined in `:root` in override.css
- [x] **FOUN-03**: Bootstrap container overridden to match Webflow's 940px content width
- [x] **FOUN-04**: Clean semantic HTML structure with no Webflow data-* attributes or w-* classes
- [x] **FOUN-05**: File structure matches backend developer's pattern (static/css/, static/js/, static/theme/, uploads/)

### Hero

- [ ] **HERO-01**: Full-screen hero section with 3-slide video background slider (MP4/WebM, autoplay, muted, loop)
- [ ] **HERO-02**: Each slide has overlay text heading and CTA button
- [ ] **HERO-03**: Slide transitions work without Webflow runtime (custom jQuery)
- [ ] **HERO-04**: Video poster image fallback for browsers that block autoplay
- [ ] **HERO-05**: "Scroll down" indicator with smooth scroll to about section

### Navigation

- [x] **NAV-01**: Sticky navbar that transitions from transparent to solid background on scroll
- [x] **NAV-02**: Logo swaps from white (over hero) to colored (on scroll) version
- [x] **NAV-03**: Mobile hamburger menu for screens ≤900px
- [x] **NAV-04**: Primary CTA button ("Registruotis i apziura") always visible in navbar
- [x] **NAV-05**: Navigation links to page sections and future pages (Meniu dropdown, Rinktis buta)

### About

- [x] **ABOU-01**: About section with project philosophy heading and descriptive text
- [x] **ABOU-02**: Animated stat counters that count up on scroll into viewport (units, area, year)
- [x] **ABOU-03**: Counter uses digit-train animation style matching Webflow design
- [x] **ABOU-04**: "About project" link/CTA for future about page

### Discover

- [x] **DISC-01**: Three numbered content cards (01, 02, 03) presenting project pillars
- [x] **DISC-02**: Hover effect with image reveal/overlay animation on each card
- [x] **DISC-03**: Cards use Bootstrap grid for responsive layout

### Location

- [x] **LOCN-01**: "Measured in minutes" section showing walking/driving times to amenities
- [x] **LOCN-02**: Animated circular progress indicators (Lottie or CSS)
- [x] **LOCN-03**: Rotating text labels for amenity names
- [x] **LOCN-04**: Expanding number circles for time values

### Timeline

- [x] **TIME-01**: Construction progress timeline with quarterly milestones (Q4 2024 -- Q4 2026)
- [x] **TIME-02**: Visual progress line indicator showing current position
- [x] **TIME-03**: Construction photo background
- [x] **TIME-04**: PHP marker for backend to update progress dynamically

### Contact

- [x] **CONT-01**: Contact form with fields: name, email, phone, message, terms consent checkbox
- [x] **CONT-02**: Form uses `<form method="post" action="URL">` -- no AJAX, no fetch
- [x] **CONT-03**: Five sales agent cards with photo, name, phone (tel: link), email (mailto: link)
- [x] **CONT-04**: PHP markers on form action URL and agent data areas

### Footer

- [x] **FOOT-01**: Footer with logo, quick navigation links, social media icons (Facebook, Instagram)
- [x] **FOOT-02**: Copyright, developer credit, privacy policy link
- [x] **FOOT-03**: Links to other project logos/sites if applicable

### Animations

- [ ] **ANIM-01**: Scroll-triggered fade-in + translateY entrance animations on all content sections
- [ ] **ANIM-02**: Animations use IntersectionObserver + CSS transitions (no GSAP dependency)
- [x] **ANIM-03**: Button text-swap hover effect on all CTA buttons (text slides up, alternate slides in)
- [ ] **ANIM-04**: Smooth, premium feel matching Webflow design intent

### Responsive

- [ ] **RESP-01**: Desktop layout matches Webflow design (faithful adaptation via Bootstrap grid)
- [ ] **RESP-02**: Tablet styles in ipad.css (768-1024px) -- loaded via media attribute in HTML
- [ ] **RESP-03**: Mobile styles in iphone.css (<=900px) -- loaded via media attribute in HTML
- [ ] **RESP-04**: No media queries inside override.css -- all responsive rules in separate files
- [ ] **RESP-05**: Video background disabled on mobile, replaced with poster image
- [ ] **RESP-06**: All interactive elements touch-friendly on mobile

### Localization

- [ ] **LANG-01**: All visible text content in Lithuanian
- [ ] **LANG-02**: Correct Lithuanian characters rendered properly
- [ ] **LANG-03**: HTML lang attribute set to "lt"

### Handoff

- [ ] **HAND-01**: PHP markers (`<!-- PHP: description -->`) on all dynamic content areas
- [ ] **HAND-02**: Form action URLs use placeholder paths ready for PHP replacement
- [ ] **HAND-03**: Image paths use uploads/ convention for CMS-managed content
- [ ] **HAND-04**: No JavaScript dependencies that conflict with backend developer's stack

## v2 Requirements

Deferred to future phases of this milestone or future milestones.

### Homepage Enhancements

- **POPUP-01**: Floating CTA popup widget with phone/social links (scroll-triggered)
- **POPUP-02**: Confetti Lottie animation on popup hover interaction

### Future Pages

- **PAGE-01**: Apartments list page with SVG interactive map
- **PAGE-02**: Apartment detail page with floor plans and gallery
- **PAGE-03**: Gallery page with Fancybox lightbox
- **PAGE-04**: Location page with Google Maps integration
- **PAGE-05**: Contacts page with jQuery UI datepicker (Lithuanian locale)
- **PAGE-06**: Reservation calendar page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Interactive SVG apartment maps | Apartments page milestone, not homepage |
| Apartment listing / price table | Homepage is marketing + lead capture, not catalog |
| Live chat widget | Requires backend infrastructure; phone CTA suffices |
| Newsletter form (separate from contact) | Splits lead funnel; contact form captures email |
| Parallax scrolling | Performance issues on mobile, accessibility concerns |
| Cookie consent banner | Backend developer's deployment scope (needs actual cookie management) |
| Google Analytics / Facebook Pixel | Backend developer adds at deployment |
| GSAP library | Unnecessary dependency; CSS transitions + IntersectionObserver sufficient |
| Video autoplay with sound | Browsers block it; damages user trust |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| FOUN-05 | Phase 1 | Complete |
| HERO-01 | Phase 1 | Pending |
| HERO-02 | Phase 1 | Pending |
| HERO-03 | Phase 1 | Pending |
| HERO-04 | Phase 1 | Pending |
| HERO-05 | Phase 1 | Pending |
| NAV-01 | Phase 3 | Complete |
| NAV-02 | Phase 3 | Complete |
| NAV-03 | Phase 3 | Complete |
| NAV-04 | Phase 3 | Complete |
| NAV-05 | Phase 3 | Complete |
| ABOU-01 | Phase 2 | Complete |
| ABOU-02 | Phase 2 | Complete |
| ABOU-03 | Phase 2 | Complete |
| ABOU-04 | Phase 2 | Complete |
| DISC-01 | Phase 2 | Complete |
| DISC-02 | Phase 2 | Complete |
| DISC-03 | Phase 2 | Complete |
| LOCN-01 | Phase 2 | Complete |
| LOCN-02 | Phase 2 | Complete |
| LOCN-03 | Phase 2 | Complete |
| LOCN-04 | Phase 2 | Complete |
| TIME-01 | Phase 2 | Complete |
| TIME-02 | Phase 2 | Complete |
| TIME-03 | Phase 2 | Complete |
| TIME-04 | Phase 2 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| FOOT-01 | Phase 2 | Complete |
| FOOT-02 | Phase 2 | Complete |
| FOOT-03 | Phase 2 | Complete |
| ANIM-01 | Phase 3 | Pending |
| ANIM-02 | Phase 3 | Pending |
| ANIM-03 | Phase 3 | Complete |
| ANIM-04 | Phase 3 | Pending |
| RESP-01 | Phase 4 | Pending |
| RESP-02 | Phase 4 | Pending |
| RESP-03 | Phase 4 | Pending |
| RESP-04 | Phase 4 | Pending |
| RESP-05 | Phase 4 | Pending |
| RESP-06 | Phase 4 | Pending |
| LANG-01 | Phase 4 | Pending |
| LANG-02 | Phase 4 | Pending |
| LANG-03 | Phase 4 | Pending |
| HAND-01 | Phase 4 | Pending |
| HAND-02 | Phase 4 | Pending |
| HAND-03 | Phase 4 | Pending |
| HAND-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 54 total
- Mapped to phases: 54
- Unmapped: 0

---
*Requirements defined: 2026-03-13*
*Last updated: 2026-03-13 after roadmap phase mapping*
