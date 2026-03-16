# Phase 4: Responsive + Polish + Handoff - Research

**Researched:** 2026-03-16
**Domain:** Responsive CSS (separate file approach), Lithuanian localization verification, PHP handoff preparation
**Confidence:** HIGH

## Summary

Phase 4 takes the fully built desktop homepage and makes it work on tablet and mobile, verifies Lithuanian localization, and prepares handoff markers for the backend developer. The project uses a non-standard but well-defined responsive approach: separate CSS files (`ipad.css` for 768-1024px, `iphone.css` for <=900px) loaded via `<link media="">` attributes, with zero media queries allowed inside `override.css`. This is the backend developer's established pattern, not a typical front-end convention.

The existing codebase is well-structured for responsive adaptation. Fluid typography via `clamp()` is already responsive. Bootstrap 5 grid classes are in place. The main work is writing layout overrides for each breakpoint, handling touch interaction differences (especially discover card hover), adapting scroll-linked sections (location circle, timeline) for mobile scroll behavior, and ensuring the hamburger placeholder is visible on mobile while hiding desktop navbar elements.

**Primary recommendation:** Write all responsive rules in `iphone.css` and `ipad.css` using the Webflow reference breakpoints (991px tablet, 767px/479px mobile) as design guidance, but targeting the project's own breakpoint ranges (768-1024px tablet, <=900px mobile). Focus on layout stacking first, then spacing/typography adjustments, then touch interaction fixes.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Discover cards**: Stack all 3 vertically (full-width) on both tablet and mobile
- **Agent cards**: 2+2+1 grid on tablet, stack vertically on mobile
- **Timeline milestones**: Horizontal scroll strip on both tablet and mobile -- preserves linear timeline feel, requires swipe interaction
- **Contact form**: Side-by-side on tablet (narrower), hide image on mobile (form only)
- **Mobile hero video**: Keep playing on all devices including mobile -- portrait video (1080x1920) fits mobile well. Do NOT swap to poster image on mobile (overrides RESP-05 requirement)
- **Heading text**: Keep existing fluid clamp() typography system -- no changes needed
- **Discover card hover overlay**: Disabled on touch devices -- cards show content statically, tap goes directly to link
- **Button text-swap hover**: Keep everywhere -- CSS :hover/:active fires on tap, adds polish
- **Hamburger menu**: Non-functional placeholder -- visible but does nothing on tap. Modal menu deferred to future milestone
- **Current 27 PHP markers**: Sufficient coverage -- no additional audit needed
- **Localization**: All visible text already in Lithuanian from Phases 1-2; `<html lang="lt">` already set
- **Desktop polish**: Skip desktop verification pass -- trust Phases 1-3. Focus purely on responsive breakpoints + handoff

### Claude's Discretion
- Counter cards layout on tablet/mobile
- About section responsive layout
- Location circle section responsive adaptation
- Footer responsive layout
- Navbar responsive adjustments (beyond existing hamburger)
- Hero slide arrow behavior on mobile
- Form action placeholder convention
- Smart header scroll behavior on touch devices
- All spacing, font size, and padding adjustments in responsive files
- Scroll-down indicator and CTA sizing on mobile

### Deferred Ideas (OUT OF SCOPE)
- **Modal menu** (hamburger opens full-screen navigation) -- future milestone, user will provide reference design
- **Desktop polish verification** -- user chose to skip, trust Phases 1-3
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RESP-01 | Desktop layout matches Webflow design (faithful adaptation via Bootstrap grid) | Skipped per user decision -- trust Phases 1-3, no desktop verification pass |
| RESP-02 | Tablet styles in ipad.css (768-1024px) -- loaded via media attribute in HTML | ipad.css exists, empty, linked correctly at line 30 of index.html with `media="screen and (min-width:768px) and (max-width:1024px)"` |
| RESP-03 | Mobile styles in iphone.css (<=900px) -- loaded via media attribute in HTML | iphone.css exists, empty, linked correctly at line 31 of index.html with `media="screen and (max-width:900px)"` |
| RESP-04 | No media queries inside override.css -- all responsive rules in separate files | Verified: override.css contains zero @media queries (confirmed via grep) |
| RESP-05 | Video background disabled on mobile, replaced with poster image | OVERRIDDEN by user: video stays on all devices. Mark as complete with override note |
| RESP-06 | All interactive elements touch-friendly on mobile | Discover card overlay disabled on touch; buttons keep text-swap; hamburger visible but non-functional; touch targets need min 44px |
| LANG-01 | All visible text content in Lithuanian | Already done in Phases 1-2; verification pass needed |
| LANG-02 | Correct Lithuanian characters rendered properly | UTF-8 charset set; fonts (EB Garamond, Inter Tight) support Lithuanian diacritics; verification pass needed |
| LANG-03 | HTML lang attribute set to "lt" | Already set: `<html lang="lt">` at line 2 of index.html |
| HAND-01 | PHP markers on all dynamic content areas | 28 PHP markers already in index.html; user says sufficient |
| HAND-02 | Form action URLs use placeholder paths ready for PHP replacement | Currently `action="#"` with `<!-- PHP: form action URL -->` comment; consider matching backend developer pattern |
| HAND-03 | Image paths use uploads/ convention for CMS-managed content | Already using `uploads/images/` for agent photos and contact image; static images correctly in `static/img/` |
| HAND-04 | No JavaScript dependencies that conflict with backend developer's stack | Same stack confirmed: jQuery 3.x, Bootstrap 5.3, jQuery UI 1.13.1 -- no conflicts |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Role in Phase 4 |
|---------|---------|---------|-----------------|
| Bootstrap 5 | 5.3.3 | Grid system, responsive utilities | Use `d-none`, `d-lg-block` etc. for show/hide; grid already supports breakpoints |
| jQuery | 3.7.1 | DOM manipulation, event handlers | Touch event detection for discover cards |
| CSS Custom Properties | N/A | Design tokens in `:root` | Some may need override values in responsive files |

### No New Libraries Needed
Phase 4 requires no new dependencies. All responsive work is pure CSS in separate files, with minor JS adjustments for touch detection.

## Architecture Patterns

### Responsive File Architecture
```
static/css/
├── override.css        # Desktop-only styles, NO @media queries
├── ipad.css            # Tablet: 768-1024px (loaded via media attribute)
└── iphone.css          # Mobile: <=900px (loaded via media attribute)
```

**Critical rule:** The `<link>` media attributes control when each file loads. They do NOT cascade normally -- both files can be active on a 900px screen (it matches both ranges). However, since ipad.css targets min-width:768px AND max-width:1024px, and iphone.css targets max-width:900px, there is an overlap zone at 768-900px where BOTH files apply. Specificity and order determine which wins -- iphone.css loads after ipad.css in the HTML, so mobile rules win in the overlap zone. This is correct behavior.

### Pattern 1: Layout Stacking for Mobile
**What:** Convert flex/grid row layouts to column stacking
**When to use:** Every section that has side-by-side content on desktop
**Example:**
```css
/* iphone.css */
.about-text-wrap {
  flex-direction: column;
}

.about-heading-wrap.texture-purple {
  padding: 3rem 1.5rem;
}

.about-paragraph-wrap {
  padding: 2rem 1.5rem 0;
}
```

### Pattern 2: CSS-Only Touch Detection for Discover Cards
**What:** Disable hover overlay on touch devices using media query
**When to use:** Discover card overlay that slides in on hover
**Example:**
```css
/* iphone.css -- applied on mobile screens */
.discover-card-overlay.texture-purple {
  display: none; /* Disable hover overlay entirely on mobile */
}

.discover-card {
  cursor: default; /* No pointer cursor on mobile */
}
```
Note: Since iphone.css only loads on <=900px screens (which are overwhelmingly touch devices), this effectively targets touch. No need for `@media (hover: none)` inside the file.

### Pattern 3: Horizontal Scroll Strip (Timeline)
**What:** Convert 6-column grid to horizontal scrollable strip
**When to use:** Timeline milestone cards on tablet and mobile
**Example:**
```css
/* iphone.css */
.timeline-grid {
  grid-template-columns: none;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  gap: 0;
}

.timeline-card {
  flex: 0 0 70vw; /* Each card takes ~70% of viewport width */
  scroll-snap-align: start;
}
```

### Pattern 4: Navbar Mobile Swap
**What:** Hide desktop nav elements, show hamburger
**When to use:** iphone.css
**Example:**
```css
/* iphone.css */
.navbar-left,
.navbar-right {
  display: none;
}

.navbar-center {
  width: auto;
}

.navbar-hamburger {
  display: flex;
}
```

### Webflow Breakpoint Reference Values
The Webflow design uses these breakpoints with specific variable overrides:

| Breakpoint | Webflow CSS | Our Target File | Key Changes |
|------------|-------------|-----------------|-------------|
| <= 991px | `@media (max-width: 991px)` | ipad.css (768-1024px) | section-gap: 4.375rem (was 8.125rem), body font: 0.9375rem, h1: 2.5rem, h2: 1.875rem, h3: 1.625rem, counter font: 2.5rem |
| <= 767px | `@media (max-width: 767px)` | iphone.css (<=900px) | Full stacking, scroll-down hidden, hero height changes |
| <= 479px | `@media (max-width: 479px)` | iphone.css (<=900px) | Extra-small phone adjustments, further padding reduction |

### Anti-Patterns to Avoid
- **Never put @media queries in override.css** -- all responsive rules go in ipad.css/iphone.css per project convention
- **Never use `display: none` on the hero video** -- user explicitly wants video on all devices
- **Never change the fluid clamp() values** -- typography is already responsive via the existing system
- **Never add media queries inside ipad.css or iphone.css** -- they are already conditionally loaded via `<link media="">`, so the entire file IS the breakpoint; just write normal CSS rules
- **Never use Bootstrap responsive utility classes that conflict with the separate-file approach** -- e.g., don't rely on `d-md-none` when custom CSS in iphone.css handles the same element

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Touch detection | Custom JS `touchstart` listener per element | CSS in iphone.css (all <=900px devices are touch) | Simpler, no JS required; the media-attribute approach IS the touch detection |
| Responsive typography | Manual font-size overrides per breakpoint | Existing clamp() system | Already configured in Phase 1; fluid scaling handles all sizes |
| Scroll snap for timeline | Custom JS scroll position tracking | CSS `scroll-snap-type` + `scroll-snap-align` | Native browser support, smooth, no JS needed |
| Hamburger menu animation | Full menu implementation | Non-functional placeholder per user decision | Modal menu deferred to future milestone |

## Common Pitfalls

### Pitfall 1: ipad.css and iphone.css Overlap Zone
**What goes wrong:** Styles in ipad.css (768-1024px) and iphone.css (<=900px) both apply at 768-900px, causing unexpected cascading.
**Why it happens:** The media ranges overlap by design (backend developer's convention).
**How to avoid:** Write iphone.css rules with higher specificity where needed, or ensure the natural cascade (iphone.css loads after ipad.css) resolves correctly. Test at 800px specifically.
**Warning signs:** Layout looks wrong only on small tablets / large phones.

### Pitfall 2: Scroll-Linked Sections on Mobile
**What goes wrong:** Location section (300vh scroll space) and Timeline section (400vh scroll space) create excessive scroll length on mobile, making the page feel endlessly long.
**Why it happens:** These sections use tall scroll spaces to drive pinned animations.
**How to avoid:** Consider reducing the scroll multiplier on mobile (e.g., location to 200vh, timeline to 250vh), or switch location to auto-cycling timer (already coded -- the JS already has timer-based cycling). The timeline can use a simpler layout with no scroll-driven animation on mobile.
**Warning signs:** User complains about excessive scrolling to get past a section.

### Pitfall 3: Fixed-Height Contact Form
**What goes wrong:** `.contact-form-main` has `height: 740px` which causes overflow or excessive whitespace on mobile.
**Why it happens:** Hard-coded pixel height from desktop design.
**How to avoid:** Override to `height: auto` in iphone.css and ipad.css.
**Warning signs:** Form content overflows container or has huge empty space.

### Pitfall 4: Location Circle Sizing
**What goes wrong:** `.location-circle-wrapper` is `width: 36em; height: 36em` which overflows mobile screens.
**Why it happens:** Designed for desktop viewport.
**How to avoid:** Scale down to fit viewport: `width: min(36em, 90vw); height: min(36em, 90vw)` or similar in iphone.css.
**Warning signs:** Horizontal scrollbar appears on mobile, or circle is cut off.

### Pitfall 5: Agent Cards With Dividers
**What goes wrong:** `.divider-vertical` between agent cards doesn't make sense in a stacked mobile layout.
**Why it happens:** Desktop layout uses horizontal row with vertical dividers between cards.
**How to avoid:** Hide `.agent-cards-wrap > .divider-vertical` on mobile, optionally add horizontal dividers between stacked cards via borders.
**Warning signs:** Thin vertical lines appear randomly in stacked layout.

### Pitfall 6: Circle Number Font Size
**What goes wrong:** `.circle-number` has `font-size: 140px` which is massive on mobile.
**Why it happens:** Designed to fill the large circle on desktop.
**How to avoid:** Scale proportionally with the circle wrapper. The Webflow reference uses 6.25rem (100px) at 991px breakpoint.
**Warning signs:** Numbers overflow the circle boundary on mobile.

### Pitfall 7: Video Performance on Mobile
**What goes wrong:** Portrait video (1080x1920) may cause performance issues on low-end mobile devices.
**Why it happens:** User explicitly wants video on all devices (overrides RESP-05).
**How to avoid:** The video already has `playsinline` and `muted` attributes (required for iOS autoplay). No additional changes needed. The `poster` attribute is set as fallback for browsers that block autoplay. Monitor performance but don't preemptively disable.
**Warning signs:** Page load time exceeds 5s on mobile, video stutters.

## Code Examples

### Section-by-Section Responsive Blueprint

#### Navbar (iphone.css)
```css
/* Hide desktop nav, show hamburger */
.navbar-left,
.navbar-right {
  display: none;
}

.navbar-center {
  width: auto;
  flex: 1;
  justify-content: flex-start; /* or center -- Claude's discretion */
}

.navbar-hamburger {
  display: flex;
}

.navbar-container {
  padding: 0.75rem var(--gutter);
}
```

#### About Section (iphone.css)
```css
.about-text-wrap {
  flex-direction: column;
}

.about-heading-wrap.texture-purple {
  padding: 3rem 1.5rem;
}

.about-paragraph-wrap {
  padding-top: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Hide vertical divider between columns when stacked */
.about-text-wrap > .divider-vertical {
  display: none;
}
```

#### Counter Cards (iphone.css)
```css
.counter-cards-wrap {
  flex-direction: column;
}

/* Hide vertical dividers between counter cards */
.counter-cards-wrap > .divider-vertical {
  display: none;
}

.counter-card {
  padding: 2rem 1rem;
}
```

#### Agent Cards Tablet (ipad.css)
```css
/* 2+2+1 grid on tablet */
.agent-cards-wrap {
  flex-wrap: wrap;
  justify-content: center;
}

.agent-card {
  flex: 0 0 calc(50% - 1px); /* 2 per row, account for divider */
  padding: 2rem 1.5rem;
}

/* Hide vertical dividers on tablet, use wrap-based layout */
.agent-cards-wrap > .divider-vertical {
  display: none;
}
```

#### Contact Form Mobile (iphone.css)
```css
.contact-form-main {
  flex-direction: column;
  height: auto;
  padding-right: 0;
}

/* Hide image on mobile per user decision */
.contact-form-left {
  display: none;
}

.contact-form-right {
  padding-right: 0;
}
```

#### Timeline Horizontal Scroll (iphone.css)
```css
.timeline-grid {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  grid-template-columns: none;
}

.timeline-card {
  flex: 0 0 75vw;
  scroll-snap-align: start;
  padding-right: 1.5rem;
}
```

### Webflow Reference: Key Variable Overrides at 991px
From the Webflow CSS (verified in `axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` line 10444-10496):

```css
/* Values the Webflow design uses at tablet breakpoint */
/* Translate to our variable names for ipad.css reference */
--gutter: 0.9375rem;          /* was 1.5rem */
--section-gap-small: 4.0625rem; /* was 7.5rem */
--section-gap: 4.375rem;        /* was 8.125rem */
/* Font size (Webflow uses different font, but sizes are reference): */
/* h1: 2.5rem, h2: 1.875rem, h3: 1.625rem, h4: 1.375rem */
/* h5: 1.125rem, h6: 1.0625rem, body: 0.9375rem */
/* counter-text: 2.5rem (was 3.4375rem) */
```

Note: Our project uses clamp() for typography which already handles these reductions fluidly. The section gap and gutter values are the main ones that need explicit overrides.

### PHP Marker Inventory (verified)
28 PHP markers found in index.html:
- `<!-- PHP: header include -->` (nav area)
- `<!-- PHP: menu links -->` (nav left)
- `<!-- PHP: link to apartments page -->` (Rinktis buta)
- `<!-- PHP: about section -->` (about)
- `<!-- PHP: link to Apie projekta page -->` (about CTA, x3 for discover cards)
- `<!-- PHP: walking/driving times may need verification -->` (location)
- `<!-- PHP: construction progress percentage -->` (timeline)
- `<!-- PHP: milestone status -->` (timeline)
- `<!-- PHP: contact form image -->` (contact left)
- `<!-- PHP: form action URL -->` (form)
- `<!-- PHP: link to terms and conditions page -->` (form checkbox)
- `<!-- PHP: agent data from CRM -->` (agent cards wrapper)
- `<!-- PHP: agent photo -->` (x5 for each agent)
- `<!-- PHP: dynamic content sections -->` (main closing)
- `<!-- PHP: footer include -->` (footer)
- Various link markers for footer pages

Coverage is comprehensive. No new markers needed per user decision.

### Form Action Convention
Current: `<form method="post" action="#">` with `<!-- PHP: form action URL -->` comment.

Backend developer's reference sites use:
- portofranko.lt: `action="contacts.php"` or similar PHP controller paths
- riverland.lt: `action="/submit-form"` style paths

**Recommendation (Claude's discretion):** Change to `action="/submit-form.php"` with the PHP comment retained. This matches the backend developer's convention better than `action="#"`, which could accidentally submit to the current page.

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Media queries in main CSS | Separate CSS files per breakpoint (loaded via `<link media="">`) | Project convention -- MUST follow |
| `@media (hover: none)` for touch | Mobile-only CSS file IS the touch override | Simpler, no feature queries needed |
| Webflow IX2 scroll-linked animations | jQuery + requestAnimationFrame | May need mobile-specific scroll behavior adjustments |
| GSAP ScrollTrigger (Webflow uses) | CSS scroll-snap + simplified JS | Lighter weight, no GSAP dependency |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework in project) |
| Config file | none |
| Quick run command | Open `index.html` in browser with DevTools responsive mode |
| Full suite command | Test at 375px, 768px, 900px, 1024px, 1440px widths |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RESP-01 | Desktop layout matches Webflow | manual-only | Open at 1440px, visual compare | N/A -- skipped per user |
| RESP-02 | Tablet styles from ipad.css | manual-only | DevTools at 768px, 1024px | N/A -- Wave 0 |
| RESP-03 | Mobile styles from iphone.css | manual-only | DevTools at 375px, 900px | N/A -- Wave 0 |
| RESP-04 | No @media in override.css | smoke | `grep -c "@media" static/css/override.css` -- expect 0 | Can run anytime |
| RESP-05 | Video stays on mobile (overridden) | manual-only | Load on mobile device, verify video plays | N/A |
| RESP-06 | Touch-friendly elements | manual-only | Tap test on actual device or emulator | N/A |
| LANG-01 | All text in Lithuanian | manual-only | Visual scan of page content | N/A |
| LANG-02 | Lithuanian characters render | manual-only | Check for mojibake on special chars | N/A |
| LANG-03 | lang="lt" set | smoke | `grep 'lang="lt"' index.html` -- expect match | Can run anytime |
| HAND-01 | PHP markers present | smoke | `grep -c "PHP:" index.html` -- expect 28 | Can run anytime |
| HAND-02 | Form action placeholder | manual-only | Check `<form action>` in source | N/A |
| HAND-03 | uploads/ convention | manual-only | Check all CMS image paths | N/A |
| HAND-04 | No JS conflicts | smoke | Open browser console, check for errors | Can run anytime |

### Sampling Rate
- **Per task commit:** Open in browser, test at 375px and 1024px
- **Per wave merge:** Test at 375px, 768px, 800px (overlap zone), 900px, 1024px, 1440px
- **Phase gate:** Full breakpoint suite + actual mobile device test

### Wave 0 Gaps
- None -- this is a CSS-only phase with manual testing. No test infrastructure needed.

## Open Questions

1. **Location section scroll behavior on mobile**
   - What we know: Desktop uses 300vh scroll space with sticky pinning for scroll-linked animation
   - What's unclear: Should mobile keep this (long scroll) or switch to auto-cycling timer? The auto-cycling JS code already exists in script.js
   - Recommendation: Claude's discretion. Likely reduce scroll height significantly (100vh) and rely more on auto-cycling, or use a simpler layout without the large scroll space

2. **Timeline scroll-linked animation on mobile**
   - What we know: Desktop uses 400vh scroll space for the reveal animation
   - What's unclear: Should mobile keep the full animation or simplify?
   - Recommendation: Claude's discretion. On mobile, show the timeline content immediately (no scroll-linked rotateX animation) since the 3D perspective effect is less impactful on small screens. Keep horizontal scroll for milestones

3. **800px overlap zone testing**
   - What we know: ipad.css (768-1024px) and iphone.css (<=900px) both apply at 768-900px
   - What's unclear: Whether any conflicting rules exist
   - Recommendation: Test specifically at 800px width after writing both files; resolve any conflicts

## Sources

### Primary (HIGH confidence)
- `/Users/sergej/DEV/MY/axioma-web/index.html` -- Current HTML structure, PHP markers, link tags
- `/Users/sergej/DEV/MY/axioma-web/static/css/override.css` -- All current desktop styles, verified zero @media queries
- `/Users/sergej/DEV/MY/axioma-web/static/css/iphone.css` -- Empty, ready for mobile styles
- `/Users/sergej/DEV/MY/axioma-web/static/css/ipad.css` -- Empty, ready for tablet styles
- `/Users/sergej/DEV/MY/axioma-web/static/js/script.js` -- Current JS interactions, scroll handlers
- `/Users/sergej/DEV/MY/axioma-web/webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` -- Webflow responsive breakpoint reference values (lines 10444-16900)
- `/Users/sergej/DEV/MY/axioma-web/webflow-export/index.html` -- Webflow source structure for responsive reference

### Secondary (MEDIUM confidence)
- `docs/PROJECT-CONTEXT.md` -- Backend developer's responsive approach documentation
- `CLAUDE.md` -- Project conventions and file structure rules

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries needed, existing stack verified
- Architecture: HIGH -- separate CSS file approach is documented and verified in codebase
- Responsive patterns: HIGH -- based on direct analysis of current CSS and Webflow reference
- Pitfalls: HIGH -- based on direct code analysis identifying concrete issues (fixed heights, overflow, overlapping breakpoints)
- Localization: HIGH -- already implemented, just needs verification pass
- Handoff: HIGH -- 28 markers verified, same JS stack confirmed

**Research date:** 2026-03-16
**Valid until:** 2026-04-16 (stable -- no external dependencies changing)
