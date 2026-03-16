# Roadmap: Axioma Homepage Refactor

## Overview

Rebuild the Axioma residential complex homepage from a Webflow export into production-ready Bootstrap 5 + jQuery HTML. The work proceeds from structural foundation through content, then layers on navigation and animations, and finishes with responsive breakpoints and backend handoff preparation. Each phase produces a visually verifiable result in the browser.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation + Hero** - HTML/CSS architecture and full-screen video hero section
- [x] **Phase 2: Content Sections** - All page sections from About through Footer
- [ ] **Phase 3: Navigation + Animations** - Smart navbar with purple texture, scroll-linked timeline animation, button text-swap hover, staggered entrance animations
- [ ] **Phase 4: Responsive + Polish + Handoff** - Device breakpoints, localization verification, PHP markers

## Phase Details

### Phase 1: Foundation + Hero
**Goal**: A browser-viewable page with correct CSS architecture and a working full-screen video hero slider
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05
**Success Criteria** (what must be TRUE):
  1. Opening index.html in a browser shows a full-screen video background hero with three slides that auto-advance
  2. Each hero slide displays overlay text and a CTA button; slide transitions are smooth without Webflow runtime
  3. The page uses Bootstrap 5.3.3 grid with a 940px container override, and all CSS custom properties (colors, typography, spacing) are defined in override.css
  4. The HTML source contains no Webflow data-* attributes, no w-* classes, and uses clean semantic markup
  5. A "scroll down" indicator is visible on the hero and smooth-scrolls to the content below
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- Foundation: asset copy, HTML boilerplate update, CSS design tokens, 940px container override
- [x] 01-02-PLAN.md -- Hero: 3-slide video/image slider with crossfade, overlay text, CTA buttons, scroll-down indicator

### Phase 2: Content Sections
**Goal**: A complete scrollable homepage with all content sections rendered using Bootstrap grid layout
**Depends on**: Phase 1
**Requirements**: ABOU-01, ABOU-02, ABOU-03, ABOU-04, DISC-01, DISC-02, DISC-03, LOCN-01, LOCN-02, LOCN-03, LOCN-04, TIME-01, TIME-02, TIME-03, TIME-04, CONT-01, CONT-02, CONT-03, CONT-04, FOOT-01, FOOT-02, FOOT-03
**Success Criteria** (what must be TRUE):
  1. Scrolling down from the hero reveals About, Discover, Location ("Measured in minutes"), Timeline, Contact, and Footer sections in order -- each with content matching the Webflow design
  2. The About section displays animated stat counters (units, area, year) that count up when scrolled into view using a digit-train animation
  3. The Discover section shows three numbered cards (01, 02, 03) with image reveal hover effects, laid out on Bootstrap grid
  4. The contact form has all fields (name, email, phone, message, terms checkbox) and submits via POST (no AJAX); five sales agent cards display with clickable phone and email links
  5. The footer displays logo, navigation links, social icons, copyright, and privacy policy link
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Assets + About section (digit-train counters) + Discover section (2-layer hover cards)
- [x] 02-02-PLAN.md -- Location section (Lottie circle animation + text rotation) + Timeline section (milestone grid + progress line)
- [x] 02-03-PLAN.md -- Contact section (form + 5 agent cards) + Footer (logo, links, social, other projects, copyright)

### Phase 3: Navigation + Animations
**Goal**: The page feels polished and interactive with a smart sticky navbar, scroll-linked timeline animation, and premium hover/entrance effects
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, ANIM-01, ANIM-02, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. The navbar has a purple texture background at all times, hides on scroll down, and slides back in on scroll up (smart header)
  2. A primary CTA button ("Registruotis i apziura") is always visible in the navbar; navigation links and menu text are placeholder stubs with PHP markers
  3. All content sections fade in with staggered translateY entrance animations as the user scrolls, triggered by IntersectionObserver with CSS transitions (no GSAP)
  4. All CTA buttons have a text-swap hover effect where text slides up and alternate text slides in
  5. The timeline section has a scroll-linked animation: background image expands and purple overlay rotates in with 3D perspective distortion
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md -- Navbar HTML/CSS/JS (smart header, purple texture, white logo, CTA) + button text-swap hover on all CTAs
- [ ] 03-02-PLAN.md -- Timeline scroll-linked perspective animation + staggered entrance animations across all sections

### Phase 4: Responsive + Polish + Handoff
**Goal**: The homepage works correctly on desktop, tablet, and mobile, with all text in Lithuanian and PHP handoff markers in place
**Depends on**: Phase 3
**Requirements**: RESP-01, RESP-02, RESP-03, RESP-04, RESP-05, RESP-06, LANG-01, LANG-02, LANG-03, HAND-01, HAND-02, HAND-03, HAND-04
**Success Criteria** (what must be TRUE):
  1. Desktop layout faithfully matches the Webflow design; tablet styles load from ipad.css (768-1024px) and mobile styles from iphone.css (<=900px) via media attribute -- no media queries exist inside override.css
  2. On mobile, the video background is replaced with a poster image, the hamburger menu works, and all interactive elements are touch-friendly
  3. All visible text is in Lithuanian with correct special characters; the HTML lang attribute is set to "lt"
  4. Every dynamic content area has a PHP marker comment; form action URLs use placeholder paths; image paths follow the uploads/ convention; no JS conflicts with the backend developer's stack
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md -- Tablet (ipad.css) + mobile (iphone.css) responsive styles with JS touch adjustments
- [ ] 04-02-PLAN.md -- Lithuanian localization verification + PHP handoff markers + visual checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Hero | 2/2 | Complete | 2026-03-13 |
| 2. Content Sections | 3/3 | Complete | 2026-03-13 |
| 3. Navigation + Animations | 0/2 | Not started | - |
| 4. Responsive + Polish + Handoff | 0/2 | Not started | - |
