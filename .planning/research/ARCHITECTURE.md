# Architecture Research

**Domain:** Webflow-to-Bootstrap homepage refactor (marketing site for residential complex)
**Researched:** 2026-03-13
**Confidence:** HIGH

## System Overview

```
index.html
 |
 |--- <head>
 |     |--- CDN: Bootstrap 5.3 CSS, Font Awesome 6, jQuery UI CSS, Google Fonts
 |     |--- Local: fancybox.css
 |     |--- Local: override.css (desktop-first, all custom styles)
 |     |--- Local: ipad.css   (media: 768-1024px, tablet overrides only)
 |     |--- Local: iphone.css (media: <=900px, mobile overrides only)
 |
 |--- <body>
 |     |--- <header>  Navbar (sticky, logo-swap, mobile hamburger)
 |     |--- <main>
 |     |     |--- Section: Hero (video background slider, 3 slides)
 |     |     |--- Section: About (text + counter animation)
 |     |     |--- Section: Discover (3 feature cards with images)
 |     |     |--- Section: Picnic Spot / Location proximity (circle animation)
 |     |     |--- Section: Construction Progress (timeline + background image)
 |     |     |--- Section: Contact (form + team member cards)
 |     |--- <footer>  Links, social icons, partner logos, copyright
 |     |--- Floating: Popup CTA widget (phone, social links)
 |
 |--- <scripts>
       |--- CDN: jQuery 3.x, jQuery UI 1.13.1, Bootstrap 5 bundle
       |--- Local: fancybox.js, lightslider.js
       |--- Local: script.js (all custom JS)
```

## Component Map: Webflow Sections to Bootstrap Components

The Webflow export contains 7 distinct page sections plus 2 floating/global components. Each section is architecturally independent -- no section depends on another section's DOM or state. This is the key structural insight: **sections can be built and tested in isolation**.

### Component Responsibilities

| Component | Webflow Class | Bootstrap Equivalent | Complexity | Independence |
|-----------|--------------|---------------------|------------|--------------|
| **Navbar** | `.navbar` / `.section.nav-bar` | Bootstrap Navbar component | Medium | Fully independent |
| **Hero Slider** | `.rt-hero-v1` / `.w-slider` | Custom slider (no Bootstrap carousel -- video backgrounds) | High | Fully independent |
| **About** | `.rt-creativity-v2` | Bootstrap grid (row/col) + custom counter JS | Medium | Fully independent |
| **Discover** | `.rt-discover-v2` | Bootstrap grid + custom card layout | Medium | Fully independent |
| **Picnic Spot** | `.section-2.picnic-spot` | Fully custom (circle animation, Lottie) | High | Fully independent |
| **Construction Progress** | `.rt-newsletter` | Bootstrap grid + custom timeline | Medium | Fully independent |
| **Contact** | `.rt-contact-v3` | Bootstrap form + grid for team cards | Medium | Fully independent |
| **Footer** | `.rt-footer` | Bootstrap grid + custom styling | Low | Fully independent |
| **Popup CTA** | `.popup-container` | Fully custom (fixed position, scroll-triggered) | Medium | Fully independent |

## CSS Architecture

### Strategy: Desktop-First in override.css, Overrides-Only in Breakpoint Files

The CSS architecture is dictated by the backend developer's pattern. No media queries go inside override.css. Instead:

```
override.css    -- ALL component styles, desktop layout, animations, colors, typography
                   CSS custom properties in :root {}
                   Organized by section (top-to-bottom page order)

ipad.css        -- ONLY overrides for 768-1024px
                   Loaded via <link media="screen and (min-width:768px) and (max-width:1024px)">
                   Typical changes: reduce font sizes, stack columns, adjust spacing

iphone.css      -- ONLY overrides for <=900px
                   Loaded via <link media="screen and (max-width:900px)">
                   Typical changes: single-column, hide decorative elements, smaller hero
```

### override.css Internal Organization

Organize by page flow (top to bottom), not by CSS property type. Each section gets a clearly commented block. This matches how the backend developer organizes CSS in portofranko.lt.

```css
/* ============================================
   0. CSS Custom Properties
   ============================================ */
:root { /* colors, fonts, spacing */ }

/* ============================================
   1. Global / Reset / Typography
   ============================================ */
body { }
h1, h2, h3, h4, h5, h6 { }
a { }

/* ============================================
   2. Navbar
   ============================================ */
.site-header { }
.navbar { }
.navbar-brand { }
/* ... sticky behavior, logo swap, CTA button */

/* ============================================
   3. Hero Section
   ============================================ */
.hero-section { }
.hero-slider { }
.hero-slide { }
.hero-video-bg { }
.hero-overlay { }
.hero-content { }
.scroll-down { }

/* ============================================
   4. About Section
   ============================================ */
.about-section { }
.counter-box { }
.counter-train { }

/* ============================================
   5. Discover Section
   ============================================ */
.discover-section { }
.discover-card { }
.discover-card-image { }

/* ============================================
   6. Picnic Spot / Location Section
   ============================================ */
.picnic-section { }
.circle-animation { }

/* ============================================
   7. Construction Progress Section
   ============================================ */
.progress-section { }
.progress-timeline { }

/* ============================================
   8. Contact Section
   ============================================ */
.contact-section { }
.contact-form { }
.team-card { }

/* ============================================
   9. Footer
   ============================================ */
.site-footer { }

/* ============================================
   10. Popup CTA Widget
   ============================================ */
.popup-container { }

/* ============================================
   11. Shared Components & Utilities
   ============================================ */
.btn-axioma { }
.text-wrap { }       /* hover text swap animation */
.div-horizontal { }  /* decorative horizontal line */
.div-vertical { }    /* decorative vertical divider */

/* ============================================
   12. Animations
   ============================================ */
.fade-in { }
.slide-up { }
/* scroll-triggered animation base classes */
```

### CSS Custom Properties: What to Extract from Webflow

The Webflow export uses these brand values (found in inline styles and CSS):

```css
:root {
  /* Brand colors (from Webflow export) */
  --color-primary: #0B2641;       /* Webflow --color-black: dark navy */
  --color-white: #ffffff;
  --color-accent-gradient: linear-gradient(130deg, #5B50FF 0%, #F4604A 100%);  /* popup CTA gradient */

  /* The "texture-purple" overlay is used on multiple sections */
  /* Extract the actual color from the Webflow CSS for this class */

  /* Typography */
  --font-heading: 'Inter', sans-serif;  /* Webflow uses "Inter Tight" + "Metal" -- map to "Inter" */
  --font-body: 'Inter', sans-serif;

  /* Status colors (already defined, keep as-is) */
  --color-available: #27ae60;
  --color-reserved: #f39c12;
  --color-sold: #e74c3c;
}
```

## Architectural Patterns

### Pattern 1: Section-as-Component

**What:** Each homepage section is a self-contained `<section>` element with its own CSS namespace and no coupling to other sections.

**When to use:** Every section on this page.

**Example:**
```html
<section class="about-section" id="about">
  <div class="container">
    <!-- PHP: about section content -->
    <div class="row">
      <div class="col-lg-6"><!-- heading + CTA --></div>
      <div class="col-lg-6"><!-- paragraph text --></div>
    </div>
    <div class="row counter-row">
      <div class="col-lg-4 counter-box"><!-- counter 1 --></div>
      <div class="col-lg-4 counter-box"><!-- counter 2 --></div>
      <div class="col-lg-4 counter-box"><!-- counter 3 --></div>
    </div>
  </div>
</section>
```

**Trade-offs:** Slight CSS repetition between sections is acceptable because it keeps each section portable. The backend developer may extract sections into PHP includes.

### Pattern 2: Bootstrap Grid for Layout, Custom CSS for Visual Design

**What:** Use Bootstrap's container/row/col system for all horizontal layouts. Use custom CSS only for visual design (colors, fonts, spacing, animations), never for layout.

**When to use:** Every section. The Webflow export uses `w-layout-hflex` and `w-layout-vflex` extensively -- these map directly to Bootstrap `row` and `col`.

**Mapping:**
```
Webflow                          Bootstrap
-----------------------------------  ----------------------------------
w-layout-hflex                   → row (or d-flex)
w-layout-vflex                   → col (or d-flex flex-column)
w-layout-blockcontainer          → container
rt-container-xl                  → container-xl
rt-container                     → container
rt-container-large               → container-lg
```

**Trade-offs:** Bootstrap's grid breakpoints may not match Webflow's exactly, so minor layout shifts at certain widths are expected. This is acceptable per project constraints ("faithful adaptation, not pixel-match").

### Pattern 3: Scroll-Triggered Fade-In via Intersection Observer (jQuery wrapper)

**What:** The Webflow export uses GSAP ScrollTrigger for fade-in animations. Replace with a lightweight jQuery-based Intersection Observer pattern. No need to ship GSAP (180KB) for simple opacity/transform transitions.

**When to use:** Elements that have `style="opacity:0"` and `data-w-id` in the Webflow export (headings, cards, images, form sections).

**Example:**
```javascript
// In script.js
function initScrollAnimations() {
  var $animElements = $('.fade-in');
  if (!$animElements.length || !('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    $animElements.css('opacity', 1);
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $animElements.each(function() {
    observer.observe(this);
  });
}
```

```css
/* In override.css */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.fade-in:nth-child(2) { transition-delay: 0.1s; }
.fade-in:nth-child(3) { transition-delay: 0.2s; }
```

**Trade-offs:** Less granular control than GSAP, but covers 95% of the Webflow animations (which are mostly opacity + translateY). Counter animations and the circle loader need dedicated JS, but these are small, localized effects.

### Pattern 4: Video Background Hero (No Webflow Slider)

**What:** The Webflow hero uses `w-slider` with 3 slides, each containing a fullscreen video or image background. Replace with a custom implementation -- Bootstrap Carousel is not appropriate because it does not support seamless video background transitions.

**Implementation approach:**
```html
<section class="hero-section">
  <div class="hero-slider">
    <div class="hero-slide active">
      <video class="hero-video-bg" autoplay muted loop playsinline>
        <source src="videos/slide-1.mp4" type="video/mp4">
        <source src="videos/slide-1.webm" type="video/webm">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content container">
        <h1>...</h1>
        <a href="#" class="btn-axioma">...</a>
      </div>
    </div>
    <!-- slides 2, 3 use background-image instead of video -->
  </div>
  <div class="hero-nav">
    <button class="hero-prev"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="hero-next"><i class="fa-solid fa-chevron-right"></i></button>
  </div>
  <div class="scroll-down">
    <a href="#about">Scroll down</a>
  </div>
</section>
```

**Trade-offs:** Custom slider requires ~40 lines of jQuery for slide transitions. This is less code than including a slider library and more maintainable than fighting Bootstrap Carousel's assumptions about content.

### Pattern 5: Animated Counters on Scroll

**What:** The About section has 3 animated number counters (60+, 120, 1,050) that "roll" digits when scrolled into view. Webflow achieves this with stacked digit divs that translateY. Replicate the same DOM structure.

**Implementation:** Keep the same "digit train" approach from Webflow -- stacked divs with overflow hidden, animated via CSS transform. Trigger with IntersectionObserver (same pattern as fade-in). This is simpler than calculating and rendering numbers in JS.

## Data Flow

### Page Load Sequence

```
1. Browser loads index.html
2. CSS loads (Bootstrap CDN, then override.css, conditionally ipad.css/iphone.css)
3. Fonts load (Google Fonts "Inter")
4. DOM renders (all sections visible with initial state)
5. jQuery + plugins load (CDN scripts, then local fancybox, then script.js)
6. $(document).ready() fires
7. script.js initializes:
   a. initNavbar()         -- sticky behavior, logo swap, mobile menu
   b. initHeroSlider()     -- video play, slide transitions, arrow controls
   c. initScrollAnimations() -- IntersectionObserver for fade-ins
   d. initCounters()       -- digit train animation (triggered by scroll)
   e. initCircleLoader()   -- Lottie/SVG circle animation (picnic section)
   f. initPopupCta()       -- show/hide on scroll threshold
   g. initContactForm()    -- form validation if needed
```

### No Shared State

There is no shared state between sections. Each initializer function is independent. If a section's DOM element is not present, its initializer exits early (defensive `.length` check). This means sections can be added, removed, or reordered without breaking the page.

### User Interaction Flows

```
Scroll Down
    |
    v
IntersectionObserver fires --> add .is-visible class --> CSS transition plays
                                                          (one-time, unobserved after)

Scroll Past Hero (200px threshold)
    |
    v
Navbar becomes sticky --> .navbar-scrolled class --> background changes, logo swaps

Scroll Past 500px
    |
    v
Popup CTA slides in --> .popup-container.show class --> CSS transition

Hero Arrow Click
    |
    v
Current slide fades out --> next slide fades in --> video autoplay starts
```

## Component Boundaries and Dependencies

```
                    SHARED (global)
                    ├── :root CSS variables
                    ├── Bootstrap grid classes
                    ├── .fade-in animation class
                    ├── .btn-axioma button style
                    ├── .text-wrap hover animation
                    ├── .div-horizontal / .div-vertical decorative elements
                    └── Typography base styles

 ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
 │  Navbar  │  │   Hero   │  │  About   │  │ Discover │
 │  -----   │  │  ------  │  │  ------  │  │  ------  │
 │ Sticky   │  │ Video BG │  │ Counters │  │ Cards    │
 │ Logo     │  │ Slider   │  │ FadeIn   │  │ Images   │
 │ Mobile   │  │ Arrows   │  │          │  │ FadeIn   │
 └─────────┘  └──────────┘  └──────────┘  └──────────┘
     (0)           (1)           (2)           (3)

 ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
 │  Picnic  │  │ Progress │  │ Contact  │  │  Footer  │
 │  ------  │  │  ------  │  │  ------  │  │  ------  │
 │ Circle   │  │ Timeline │  │ Form     │  │ Links    │
 │ Lottie   │  │ BG Image │  │ Team     │  │ Social   │
 │ Text Swap│  │ FadeIn   │  │ FadeIn   │  │ Partners │
 └──────────┘  └──────────┘  └──────────┘  └──────────┘
     (4)           (5)           (6)           (7)

 ┌──────────────┐
 │  Popup CTA   │  (floating, position: fixed)
 │  ----------  │
 │  Scroll show │
 │  Confetti    │
 │  Phone/Social│
 └──────────────┘
     (global)
```

Numbers in parentheses indicate suggested build order (see below).

## Suggested Build Order

Build order is driven by three factors: (1) shared infrastructure must come first, (2) complex components with uncertainty should come early to surface issues, (3) independent sections can be parallelized.

### Phase 0: Foundation (must be first)

**Build: CSS custom properties, typography, shared classes, page skeleton**

- Extract brand colors from Webflow CSS into `:root {}`
- Set up typography (Inter font, heading sizes matching Webflow)
- Create shared utility classes: `.btn-axioma`, `.text-wrap`, `.div-horizontal`, `.div-vertical`, `.fade-in`
- Set up `index.html` skeleton with all `<section>` elements (empty content, correct classes)
- Set up `script.js` skeleton with `$(document).ready()` and stub functions

**Rationale:** Every section depends on these. Getting typography and colors right first means every subsequent section looks correct immediately.

### Phase 1: Navbar

**Build: Header, navigation, sticky behavior, mobile hamburger, logo swap**

- Bootstrap Navbar component as the base
- Sticky behavior via scroll event handler (add/remove `.navbar-scrolled` class)
- Logo swap on scroll (white logo for transparent hero overlay, dark logo on scroll)
- Mobile hamburger uses Bootstrap collapse
- CTA button with hover text-swap animation

**Rationale:** Navbar is visible on every page state. Building it first establishes the visual frame that all other sections sit within. The sticky behavior needs testing with actual page content height. Also, the navbar's transparent-over-hero state creates a visual dependency with the Hero section.

### Phase 2: Hero Section

**Build: Video background slider with 3 slides, overlay, content, arrow navigation, scroll-down indicator**

- Fullscreen section with `position: relative` and `overflow: hidden`
- `<video>` element with `object-fit: cover`, `autoplay`, `muted`, `loop`, `playsinline`
- Dark overlay for text readability
- Custom slide transitions in jQuery (fade or crossfade)
- Arrow buttons for manual navigation
- "Scroll down" animated indicator linking to `#about`
- Video files copied from `webflow-export/videos/` to local path

**Rationale:** Highest visual complexity. Video backgrounds have cross-browser quirks (iOS autoplay restrictions, object-fit in older browsers). Build this early to catch issues. The hero establishes the premium visual tone for the entire page.

**Dependencies:** Navbar (transparent overlay interaction).

### Phase 3: About Section

**Build: Two-column text layout + 3 animated counters**

- Bootstrap row/col for heading + paragraph layout
- Counter "digit train" animation (stacked numbers with `overflow: hidden` and `translateY`)
- IntersectionObserver to trigger counter animation on scroll
- Decorative horizontal/vertical dividers

**Rationale:** First section that uses the scroll-animation pattern. Getting IntersectionObserver + CSS transitions working here establishes the pattern for all subsequent sections. Counter animation is the second-most complex JS after the hero slider.

**Dependencies:** Shared `.fade-in` class and IntersectionObserver utility.

### Phase 4: Discover Section

**Build: 3 feature cards with images, number labels, text, hover effects**

- Bootstrap grid for card layout (3 full-width cards stacked vertically, each with 3 columns: number+heading, image, text+link)
- Image hover zoom effect (CSS `transform: scale(1.2)` on hover)
- Image reveal animation (overlay layers that slide away)
- Fade-in on scroll

**Rationale:** Straightforward grid layout. Tests the image-hover patterns that are reused elsewhere. Low risk.

**Dependencies:** Shared `.fade-in`, shared image-effect CSS.

### Phase 5: Picnic Spot / Location Section

**Build: Circle animation with distance numbers, text-swap animation, Lottie circle loader**

- Custom radial layout for distance numbers (5, 8, 10, 15, 20 minutes)
- Text that swaps through destinations (park, city center, shopping mall, etc.)
- Lottie animation for the progress circle (use lottie-web or inline SVG)
- Scroll-triggered activation

**Rationale:** Most unique component on the page. No Bootstrap equivalent. The Lottie animation and text-swap need careful attention. Building this after the counter animation (Phase 3) allows reusing scroll-trigger patterns.

**Dependencies:** IntersectionObserver pattern from Phase 3. Lottie-web library (small, ~40KB, or convert to pure CSS animation).

### Phase 6: Construction Progress Section

**Build: Background image with overlay, timeline cards, construction milestones**

- Background image section with dark overlay
- Horizontal timeline with 6 milestones (2024 Q4 through 2026 Q4)
- Progress line indicator
- Fade-in animations

**Rationale:** Relatively straightforward. Background image + overlay is a common pattern. Timeline is a simple horizontal flex layout.

**Dependencies:** Shared `.fade-in`.

### Phase 7: Contact Section

**Build: Contact form + 5 team member cards**

- Two-column layout: image on left, form on right
- Form with `method="post"` (name, email, phone, message, checkbox, submit)
- No AJAX -- standard POST
- Team member cards in horizontal row (photo, name, phone, email)
- Fade-in animations

**Rationale:** Forms are functionally critical but visually simple. The PHP developer needs correct form structure and field names. Team cards reuse the grid pattern.

**Dependencies:** None beyond shared styles.

### Phase 8: Footer

**Build: Links, social icons, partner project logos, copyright**

- Multi-column footer layout with Bootstrap grid
- Quick links with hover animation (text-swap pattern)
- Social media icons (Facebook, Instagram)
- Partner project logos (Riverland, Porto Franko)
- Copyright and developer credit

**Rationale:** Last visible section. Lowest priority. Simple grid layout.

**Dependencies:** Shared `.text-wrap` hover pattern (same as navbar links).

### Phase 9: Popup CTA Widget

**Build: Fixed-position floating widget with phone/social links, confetti animation**

- `position: fixed`, right edge, bottom area
- Show/hide on scroll threshold (jQuery scroll handler)
- Staggered slide-in animation for child items
- Gradient background on primary CTA with confetti Lottie on hover
- Hidden on mobile (<=998px per Webflow CSS)

**Rationale:** Built last because it floats above all content and is invisible until scroll. Does not affect any section's layout. Confetti animation is a nice-to-have detail.

**Dependencies:** Scroll event handler (shared with navbar sticky).

### Phase 10: Responsive (ipad.css + iphone.css)

**Build: Tablet and mobile overrides for ALL sections**

- Do this last, after all desktop sections are complete
- Test each section at tablet (768-1024px) and mobile (<=900px) widths
- Write overrides ONLY in ipad.css and iphone.css, never in override.css
- Common mobile changes: stack columns, reduce font sizes, hide decorative elements, full-width images, simplified hero (poster image instead of video on very small screens)

**Rationale:** Responsive adjustments are fastest to write when you can see the desktop version and identify what breaks. Writing responsive CSS section-by-section during desktop build leads to constant context-switching and is slower overall.

**Dependencies:** ALL desktop sections must be complete.

## Responsive CSS File Structure

### ipad.css (768-1024px)

```css
/* Axioma -- Tablet overrides */

/* Navbar: smaller logo, compact CTA */
.navbar-brand img { }

/* Hero: reduce heading size */
.hero-content h1 { font-size: 2.5rem; }

/* About: stack counter cards */
.counter-row .counter-box { }

/* Discover: cards go full-width, image beside text */
.discover-card { }

/* Picnic: reduce circle size */
.circle-animation { }

/* Contact: stack form and image */
.contact-section .row { }

/* Footer: 2-column */
.site-footer .row { }
```

### iphone.css (<=900px)

```css
/* Axioma -- Mobile overrides */

/* Navbar: hamburger visible, hide CTA button text */
.navbar .btn-axioma span { display: none; }

/* Hero: smaller heading, poster fallback for video, hide arrows */
.hero-section h1 { font-size: 1.8rem; }
.hero-nav { display: none; }

/* About: single column, counters stack vertically */

/* Discover: cards stack, image above text */

/* Picnic: simplified or hidden on very small screens */
/* Popup CTA: hidden (matches Webflow behavior) */
.popup-container { display: none; }

/* Contact: single column, team cards 2-per-row or stacked */

/* Footer: single column */
```

## Anti-Patterns

### Anti-Pattern 1: Copying Webflow Classes

**What people do:** Keep `rt-*` and `w-*` class names from the Webflow export to "save time."
**Why it is wrong:** These classes are meaningless outside Webflow's CSS. They create a maintenance nightmare -- no one can read `w-layout-hflex rt-hero-v1-slider-background-wrapper rt-overflow-hidden` and understand what it does. The Webflow CSS file is 322KB of generated rules that cannot be maintained by hand.
**Do this instead:** Create semantic class names (`hero-section`, `hero-slide`, `hero-video-bg`) that describe what the element IS, not what CSS properties it has.

### Anti-Pattern 2: Importing Webflow CSS Wholesale

**What people do:** Include the Webflow CSS file alongside Bootstrap to "preserve the design" and gradually remove it.
**Why it is wrong:** The Webflow CSS (322KB) conflicts with Bootstrap classes. Both define `.container`, grid systems, and utility classes. Specificity wars make debugging impossible. You end up fighting two frameworks.
**Do this instead:** Treat the Webflow CSS as a visual reference only. Open it in a browser tab, inspect computed styles, and manually extract values (colors, font sizes, spacing) into your own CSS custom properties and rules.

### Anti-Pattern 3: Media Queries Inside override.css

**What people do:** Add `@media (max-width: 900px) { }` blocks inside override.css because it feels natural.
**Why it is wrong:** The backend developer's pattern (and project constraint) requires separate files loaded via `<link media="">`. Mixing approaches means some responsive rules apply twice, creating specificity issues.
**Do this instead:** All mobile/tablet overrides go exclusively in iphone.css and ipad.css.

### Anti-Pattern 4: Building Responsive Per-Section During Desktop Phase

**What people do:** Build the hero desktop, then immediately build hero tablet and mobile, then move to the next section.
**Why it is wrong:** You cannot assess responsive behavior of one section in isolation -- the interaction between navbar + hero + about matters (scroll behavior, cumulative height, etc.). Also, you write duplicate test cycles.
**Do this instead:** Build all sections desktop-first. Then do a single responsive pass through the entire page for tablet, then another for mobile.

### Anti-Pattern 5: Using GSAP/ScrollTrigger from the Webflow Export

**What people do:** Include GSAP and ScrollTrigger CDN scripts from the Webflow export because "it already works."
**Why it is wrong:** GSAP adds ~180KB of JavaScript for effects that are 95% simple opacity + translateY transitions. It is a dependency the backend developer does not use or expect. It complicates the handoff.
**Do this instead:** Use IntersectionObserver (native browser API, zero dependencies) wrapped in a small jQuery helper for scroll-triggered animations. Use CSS transitions for the actual visual effects.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Fonts (Inter) | `<link>` in `<head>` | Already configured in current index.html |
| Lottie (circle loader) | lottie-web via CDN OR convert to CSS animation | The Webflow export uses `cirlce_loader.json` (3.9KB). Can use lottie-web (~40KB) or hand-convert to SVG+CSS |
| Video files | Local `<video>` elements | Copy from webflow-export/videos/ to project videos/ directory |

### Backend Developer Handoff Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Navbar links | `<!-- PHP: navigation include -->` | PHP will generate nav from CMS |
| Contact form | `<form method="post" action="URL">` | PHP handles submission, field names must be agreed |
| Team member cards | `<!-- PHP: team members loop -->` | PHP will loop through CMS data |
| Construction timeline | `<!-- PHP: timeline data -->` | Milestones may come from CMS |
| Footer links | `<!-- PHP: footer include -->` | PHP generates from CMS |
| All text content | Hardcoded Lithuanian for now | PHP replaces with CMS content |

## Webflow-to-Bootstrap Translation Reference

Key mappings for the implementer:

| Webflow Pattern | Bootstrap/Custom Equivalent |
|----------------|---------------------------|
| `<div class="w-layout-blockcontainer ... w-container">` | `<div class="container">` |
| `<div class="w-layout-hflex ...">` | `<div class="row">` or `<div class="d-flex">` |
| `<div class="w-layout-vflex ...">` | `<div class="col-*">` or `<div class="d-flex flex-column">` |
| `<div class="w-slider">` | Custom hero slider (jQuery) |
| `style="opacity:0"` + `data-w-id` | `.fade-in` class + IntersectionObserver |
| `class="rt-position-relative"` | `class="position-relative"` (Bootstrap utility) |
| `class="rt-overflow-hidden"` | `class="overflow-hidden"` (Bootstrap utility) |
| `class="rt-text-color-white"` | `class="text-white"` (Bootstrap utility) |
| `class="rt-desktop-text-center"` | `class="text-center"` (Bootstrap utility) |
| `class="rt-gap-off"` | `class="mb-0"` (Bootstrap utility) |
| `class="rt-border-top"` | `class="border-top"` (Bootstrap utility) |
| `class="rt-border-bottom"` | `class="border-bottom"` (Bootstrap utility) |
| `class="rt-border-right"` | `class="border-end"` (Bootstrap utility) |
| `class="texture-purple"` | Custom CSS class for brand gradient/texture overlay |
| Inline `transform: translate3d(...)` | CSS classes with transitions, triggered by JS |

## Sources

- Webflow export analysis: `/Users/sergej/DEV/MY/axioma-web/webflow-export/index.html` (880 lines, direct inspection)
- Webflow CSS: `/Users/sergej/DEV/MY/axioma-web/webflow-export/css/axioma-v-2-*.webflow.css` (322KB, class analysis)
- Backend developer patterns: portofranko.lt (live site inspection, confirmed Bootstrap 5 + jQuery + Fancybox patterns)
- Project constraints: `CLAUDE.md`, `docs/PROJECT-CONTEXT.md`
- Current codebase: `index.html`, `static/css/override.css`, `static/js/script.js`

---
*Architecture research for: Axioma homepage Webflow-to-Bootstrap refactor*
*Researched: 2026-03-13*
