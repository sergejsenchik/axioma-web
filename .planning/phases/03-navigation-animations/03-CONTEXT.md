# Phase 3: Navigation + Animations - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Sticky-smart navbar with purple texture background (hide on scroll down, show on scroll up), scroll-triggered entrance animations on all content sections, button text-swap hover effects on all CTAs, scroll-linked timeline animation with perspective distortion, and refined Discover card hover effects. Mobile hamburger menu is included (NAV-03) but modal menu content is deferred to future milestone.

</domain>

<decisions>
## Implementation Decisions

### Navbar layout & menu items
- Match Webflow layout: left = "Meniu" text + "Rinktis butą" link, center = logo, right = CTA button "Registruotis į apžiūrą"
- All menu links are `href="#"` placeholder stubs with PHP markers — will link to real pages in future milestones
- "Meniu" text is **non-clickable placeholder** in v1 — no dropdown, no modal menu
- The modal menu (hamburger opens full-screen modal with navigation) is **deferred to future milestone** — user will provide a specific reference when ready

### Navbar behavior & styling
- **Purple texture background** (`.texture-purple`) at all times — NOT transparent-over-hero → solid-on-scroll
- **Smart header**: hides on scroll down, slides in from top on scroll up (scroll direction detection)
- Slide animation: **0.3s ease** transition
- **No border or shadow** — purple texture provides sufficient contrast
- Logo stays **white** (`axioma-logo-white.svg`) at all times since background is always purple
- No logo swap needed (overrides original NAV-02 requirement — user preference)

### Button text-swap hover effect
- **Same text** on both `.btn-text-in` and `.btn-text-out` — purely visual slide motion effect
- On hover: text-in slides up + fades out, text-out slides in from below + fades in
- Animation timing: **0.35s ease** (match Webflow)
- Applied to **all CTA variants**: `.btn-cta`, `.btn-cta-light`, `.btn-cta-dark`, and navbar CTA

### Scroll entrance animations
- **Keep blur(5px) + translateY(50px)** on `.scroll-reveal` — cinematic focus-pull effect
- Distance: **50px** translateY (keep current)
- **Stagger within sections** — heading first, then paragraph ~100ms later, then CTA ~200ms later (cascade effect)
- Agent cards already have stagger delays — extend this pattern to other sections
- Animation variation per section type: **Claude's discretion**

### Timeline scroll-linked animation
- **Full Webflow scroll-linked animation**: NOT just IntersectionObserver one-shot reveal
  1. Background image mask **expands on scroll** (clip-path or similar)
  2. Purple overlay block appears with **perspective distortion** (3D rotateX transform)
  3. Animation is **tied to scroll position** (scroll-driven)
- Implementation approach: **Claude's discretion** (CSS scroll-driven animations with jQuery fallback, or jQuery scroll handler — pick best cross-browser + performance approach)
- Progress line: **fixed at ~42%** position (midpoint between Q3 2025 and Q1 2026), NOT calculated from current date
- Progress line animates smoothly when section enters viewport
- Add PHP marker for backend to set actual construction progress value

### Discover card hover refinement
- Study the **exact Webflow IX2 animation** for Discover card hover and refine current implementation to match more closely
- Current implementation has 2-layer slide overlay + image scale + text color change — needs researcher to identify gaps vs Webflow behavior

### Location section
- **Keep current auto-cycle** behavior (3.5s timer, Lottie segments, text rotation, number swap)
- Just needs scroll-reveal entrance animation added (consistent with other sections)

### Claude's Discretion
- Smart header scroll threshold and debounce behavior
- Animation variation per section type (uniform vs varied entrances)
- Scroll-linked implementation approach for Timeline (CSS scroll-driven vs jQuery scroll handler)
- Discover card hover animation refinements after Webflow study
- Stagger timing details per section

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.scroll-reveal` / `.scroll-reveal-simple` CSS classes: blur+translateY+fade and simple fade — already working
- IntersectionObserver JS in `script.js`: adds `.revealed` class, threshold 0.15 — already working for all `.scroll-reveal` elements
- `.btn-text-wrap`, `.btn-text-in`, `.btn-text-out` HTML structure: on ALL CTA buttons (hero, about, contact form, navbar CTA will use same)
- `.texture-purple` utility class: purple bg + texture-purple.jpg pattern at 200px — reuse for navbar
- Logo files: `axioma-logo-white.svg` (white for purple bg), `axioma-logo-full.svg` (colored, not needed for navbar)
- Agent card stagger CSS: `.agent-card:nth-child(N) .scroll-reveal { transition-delay }` — pattern to extend

### Established Patterns
- jQuery `$(document).ready()` pattern in script.js for all interactions
- IntersectionObserver for scroll triggers (counters, location, timeline, reveal)
- CSS transitions for animations (no GSAP)
- Webflow IX2 reference at `webflow-export/index.html` for exact animation behaviors
- `.timeline-content-wrap` already has `perspective: 3000px` CSS property ready for 3D transforms
- `.timeline-main` has `perspective: 5000px` — designed for the perspective distortion effect

### Integration Points
- `index.html` line 36-37: navbar placeholder comment `<!-- Navbar deferred to Phase 3 -->` — replace with actual navbar HTML
- `script.js`: add smart header scroll handler, button text-swap CSS hover (pure CSS, no JS needed), timeline scroll-linked animation
- `override.css`: add navbar styles, button hover animation, timeline scroll animation CSS
- `webflow-export/index.html` lines 154-207: complete Webflow navbar reference
- `webflow-export/css/*.webflow.css`: Webflow timeline animation properties and discover card hover details

</code_context>

<specifics>
## Specific Ideas

- Navbar purple texture is a deliberate deviation from Webflow (which has transparent → solid). User specifically requested this for brand consistency
- "Meniu" text is non-functional in v1 — user will provide a specific modal menu reference for future milestone
- Timeline perspective distortion should match the Webflow IX2 animation (3D rotateX entrance tied to scroll)
- Progress line fixed at 42% because that represents actual construction status, not a date calculation
- Discover card hover needs researcher to compare current CSS implementation against Webflow IX2 animation frame-by-frame

</specifics>

<deferred>
## Deferred Ideas

- **Modal menu** (hamburger click opens full-screen navigation modal) — user will provide reference design in future milestone
- Logo swap (NAV-02) — not needed since navbar is always purple with white logo

</deferred>

---

*Phase: 03-navigation-animations*
*Context gathered: 2026-03-14*
