# Phase 3: Navigation + Animations - Research

**Researched:** 2026-03-14
**Domain:** Sticky navbar, scroll-triggered CSS animations, button hover effects, scroll-linked timeline animation
**Confidence:** HIGH

## Summary

Phase 3 adds the sticky smart navbar with purple texture background, enhances all scroll-triggered entrance animations with stagger and blur effects, implements the button text-swap hover effect on all CTAs, and builds a scroll-linked timeline animation with perspective distortion. The project uses vanilla CSS transitions with IntersectionObserver (already implemented), jQuery for scroll handlers, and no external animation libraries.

The existing codebase already has working `.scroll-reveal` / `.scroll-reveal-simple` CSS classes and IntersectionObserver JS, `.btn-text-wrap` / `.btn-text-in` / `.btn-text-out` HTML structure on all buttons, `.texture-purple` utility, and the timeline section with `perspective` CSS properties ready. The navbar placeholder at index.html line 36 is ready for replacement.

**Primary recommendation:** Build the navbar as a fixed-position element with `.texture-purple` background and jQuery scroll-direction detection for show/hide behavior. Button text-swap is pure CSS (no JS). Timeline scroll-linked animation uses jQuery scroll handler with `requestAnimationFrame` for the perspective distortion effect tied to scroll position. All work modifies `index.html`, `override.css`, and `script.js` only.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Navbar has **purple texture background** (`.texture-purple`) at ALL times -- NOT transparent-over-hero to solid-on-scroll
- **Smart header**: hides on scroll down, slides in from top on scroll up (scroll direction detection)
- Slide animation: **0.3s ease** transition
- **No border or shadow** on navbar
- Logo stays **white** (`axioma-logo-white.svg`) at all times -- no logo swap
- "Meniu" text is **non-clickable placeholder** in v1
- Navbar layout: left = "Meniu" text + "Rinktis buta" link, center = logo, right = CTA button "Registruotis i apziura"
- Button text-swap: **same text** on both `.btn-text-in` and `.btn-text-out`, timing **0.35s ease**
- Applied to **all CTA variants**: `.btn-cta`, `.btn-cta-light`, `.btn-cta-dark`, and navbar CTA
- Keep **blur(5px) + translateY(50px)** on `.scroll-reveal`
- **Stagger within sections** -- heading first, paragraph ~100ms, CTA ~200ms
- Timeline: **full scroll-linked animation** (NOT one-shot IntersectionObserver reveal)
  - Background image mask expands on scroll
  - Purple overlay appears with perspective distortion (3D rotateX transform)
  - Animation tied to scroll position
- Progress line: **fixed at ~42%** position, NOT calculated from current date
- Progress line: add PHP marker for backend to set actual value
- Location section: **keep current auto-cycle** behavior, just add scroll-reveal entrance animation

### Claude's Discretion
- Smart header scroll threshold and debounce behavior
- Animation variation per section type (uniform vs varied entrances)
- Scroll-linked implementation approach for Timeline (CSS scroll-driven vs jQuery scroll handler)
- Discover card hover animation refinements after Webflow study
- Stagger timing details per section

### Deferred Ideas (OUT OF SCOPE)
- Modal menu (hamburger opens full-screen navigation modal) -- user will provide reference design in future milestone
- Logo swap (NAV-02) -- not needed since navbar is always purple with white logo
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky navbar that transitions from transparent to solid background on scroll | User overrode: purple texture at all times, smart header hide/show on scroll direction |
| NAV-02 | Logo swaps from white to colored version | User overrode: logo stays white at all times (purple bg) |
| NAV-03 | Mobile hamburger menu for screens <=900px | Include hamburger button in HTML (hidden on desktop), modal menu content deferred |
| NAV-04 | Primary CTA button always visible in navbar | Navbar right side: "Registruotis i apziura" with btn-cta styling and text-swap structure |
| NAV-05 | Navigation links to page sections and future pages | Left side: "Meniu" placeholder text + "Rinktis buta" link (both href="#" with PHP markers) |
| ANIM-01 | Scroll-triggered fade-in + translateY entrance animations on all content sections | Enhance existing .scroll-reveal with stagger delays per section; add .scroll-reveal to sections missing it |
| ANIM-02 | Animations use IntersectionObserver + CSS transitions (no GSAP) | Already implemented; extend with stagger delay pattern from agent cards |
| ANIM-03 | Button text-swap hover effect on all CTA buttons | Pure CSS hover on .btn-cta/.btn-cta-light/.btn-cta-dark; 0.35s ease translateY + opacity |
| ANIM-04 | Smooth, premium feel matching Webflow design intent | Timeline scroll-linked perspective animation, staggered reveals, refined discover card hover |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| jQuery | 3.7.1 | Scroll handlers, DOM manipulation | Project requirement (CLAUDE.md) |
| Bootstrap 5 | 5.3.3 | Grid for navbar layout | Project requirement |
| CSS transitions | N/A | All animations | No GSAP allowed per REQUIREMENTS.md |
| IntersectionObserver | Native API | Scroll-triggered reveals | Already in script.js, well-supported |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| requestAnimationFrame | Native API | Smooth scroll-linked timeline animation | Throttle scroll handler for 60fps performance |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| jQuery scroll handler | CSS scroll-driven animations (`animation-timeline: scroll()`) | CSS scroll-driven animations lack Safari < 17.5 support and have no jQuery fallback path; jQuery handler is more reliable for this project's browser targets |

**No installation needed** -- all libraries are already loaded via CDN in index.html.

## Architecture Patterns

### File Modification Map
```
index.html          -- Replace navbar placeholder (line 36) with navbar HTML
static/css/override.css -- Add navbar styles, button text-swap hover CSS, timeline scroll animation CSS
static/js/script.js     -- Add smart header scroll handler, timeline scroll-linked animation
```

### Pattern 1: Smart Header (Hide/Show on Scroll Direction)
**What:** Track scroll direction with `lastScrollY` variable. On scroll down past threshold, add `.navbar-hidden` class (translateY(-100%)). On scroll up, remove it.
**When to use:** For the navbar show/hide behavior.
**Example:**
```javascript
// Source: Webflow reference + established pattern
var lastScrollY = 0;
var scrollThreshold = 50; // Pixels before triggering hide

$(window).on('scroll', function() {
  var currentScrollY = window.pageYOffset;

  if (currentScrollY > scrollThreshold) {
    if (currentScrollY > lastScrollY) {
      // Scrolling down -- hide
      $('.site-navbar').addClass('navbar-hidden');
    } else {
      // Scrolling up -- show
      $('.site-navbar').removeClass('navbar-hidden');
    }
  } else {
    // At top -- always show
    $('.site-navbar').removeClass('navbar-hidden');
  }

  lastScrollY = currentScrollY;
});
```

### Pattern 2: Button Text-Swap (Pure CSS Hover)
**What:** On hover, `.btn-text-in` slides up and fades out, `.btn-text-out` slides in from below and fades in. No JS needed.
**When to use:** All `.btn-cta`, `.btn-cta-light`, `.btn-cta-dark` buttons.
**Example:**
```css
/* Source: Webflow inline <style> block - .text-wrap/.text/.alt-text pattern */
.btn-text-in {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.btn-text-out {
  position: absolute;
  transform: translateY(120%);
  opacity: 0;
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.btn-cta:hover .btn-text-in,
.btn-cta-light:hover .btn-text-in,
.btn-cta-dark:hover .btn-text-in {
  transform: translateY(-120%);
  opacity: 0;
}

.btn-cta:hover .btn-text-out,
.btn-cta-light:hover .btn-text-out,
.btn-cta-dark:hover .btn-text-out {
  transform: translateY(0);
  opacity: 1;
}
```

### Pattern 3: Scroll-Linked Timeline Animation (jQuery + rAF)
**What:** The timeline section uses a tall scroll container. As user scrolls through it, the background image mask expands and the purple overlay rotates in with 3D perspective. jQuery scroll handler + `requestAnimationFrame` for smooth 60fps updates.
**When to use:** Timeline/construction progress section only.
**Example:**
```javascript
// Source: Webflow export analysis - rt-discover-wrapper (300vh) + sticky inner
// Simplified for jQuery: use scroll position relative to section
$(window).on('scroll', function() {
  requestAnimationFrame(function() {
    var $section = $('.timeline-section');
    var sectionTop = $section.offset().top;
    var sectionHeight = $section.outerHeight();
    var scrollY = window.pageYOffset;
    var viewH = window.innerHeight;

    // Calculate progress 0-1 through the section
    var progress = Math.max(0, Math.min(1,
      (scrollY - sectionTop + viewH) / (sectionHeight + viewH)
    ));

    // Apply transforms based on progress
    // Background image: clip-path expand from center
    // Purple overlay: rotateX from tilted to flat
  });
});
```

### Pattern 4: Stagger Delays via CSS nth-child or Sibling Selectors
**What:** Within each section, heading gets `transition-delay: 0s`, paragraphs get `0.1s`, CTA gets `0.2s`. Use specific selectors per section.
**When to use:** All content sections for entrance animation cascade.
**Example:**
```css
/* Source: Existing agent-card stagger pattern in override.css (line 1496-1500) */
.about-heading h3.scroll-reveal-simple { transition-delay: 0s; }
.about-paragraph-wrap p:nth-child(1).scroll-reveal-simple { transition-delay: 0.1s; }
.about-paragraph-wrap p:nth-child(2).scroll-reveal-simple { transition-delay: 0.2s; }
.about-cta-wrap.scroll-reveal-simple { transition-delay: 0.3s; }
```

### Anti-Patterns to Avoid
- **Do NOT use `setInterval` or `setTimeout` for scroll-linked animations:** Use `requestAnimationFrame` for smooth 60fps.
- **Do NOT add scroll listeners without throttling:** Scroll events fire at 60+ fps; batch with rAF.
- **Do NOT use CSS `position: sticky` for the scroll-linked timeline wrapper:** The Webflow pattern uses `height: 300vh` wrapper with `position: sticky` inner -- this is valid but requires careful z-index management. The simpler approach for this project is a jQuery scroll handler that calculates progress through the section without the sticky wrapper.
- **Do NOT put media queries inside override.css:** Responsive adjustments go in iphone.css / ipad.css (CLAUDE.md rule).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll direction detection | Complex event debouncing system | Simple lastScrollY comparison in scroll handler | 5 lines of code, no edge cases |
| Button text-swap animation | JS-driven animation with timers | Pure CSS :hover transitions on .btn-text-in/.btn-text-out | Zero JS, hardware-accelerated, matches Webflow exactly |
| Scroll position throttling | Manual throttle/debounce function | `requestAnimationFrame` wrapper | Browser-native, ensures 60fps sync |
| Timeline progress calculation | Date-based JS calculation | Fixed 42% value with PHP marker | User explicitly requested fixed value |

**Key insight:** The button text-swap effect is 100% CSS -- the Webflow inline style block confirms this with `.text-wrap`, `.text`, `.alt-text` using CSS transitions. The existing HTML structure (`.btn-text-wrap`, `.btn-text-in`, `.btn-text-out`) already matches. Only CSS hover rules are needed.

## Common Pitfalls

### Pitfall 1: Navbar z-index Conflicts
**What goes wrong:** Navbar gets hidden behind hero video, Fancybox overlays, or the timeline section.
**Why it happens:** Hero section has z-index layers for slides, and timeline has perspective which creates new stacking contexts.
**How to avoid:** Set `.site-navbar { z-index: 999; }` matching the Webflow `.navbar { z-index: 999 }` value. This is above all section content but below Fancybox (which uses z-index 99999).
**Warning signs:** Navbar disappears when scrolling to certain sections.

### Pitfall 2: Scroll Handler Performance
**What goes wrong:** Page becomes janky during scroll, especially on the timeline scroll-linked animation.
**Why it happens:** Scroll events fire at high frequency; DOM reads (offset, height) trigger layout recalculation.
**How to avoid:** Wrap scroll handlers in `requestAnimationFrame`. Cache DOM measurements (section offsets) and only recalculate on resize. Avoid reading layout properties inside scroll callbacks when possible.
**Warning signs:** FPS drops below 30 during scrolling.

### Pitfall 3: Transform + Transition Conflicts on Navbar
**What goes wrong:** Adding `translateY(-100%)` for hide conflicts with other transforms.
**Why it happens:** CSS `transform` property is not additive -- setting one value replaces the other.
**How to avoid:** Use a single transform property for the navbar. Since the navbar only needs translateY for show/hide, this is straightforward. Do NOT add other transforms to the same element.
**Warning signs:** Navbar position jumps or snaps instead of sliding.

### Pitfall 4: Scroll-Reveal Firing Before Elements Are Ready
**What goes wrong:** Elements flash or pop in without animation on page load.
**Why it happens:** IntersectionObserver fires immediately for elements in the viewport on load.
**How to avoid:** The existing code already handles this (threshold: 0.15). For new sections, ensure `.scroll-reveal` elements start with `opacity: 0` and `transform: translateY(50px)` in CSS, and the `.revealed` class removes these.
**Warning signs:** Sections near the top of the page appear without animation on reload.

### Pitfall 5: Timeline Scroll Animation -- Mobile Performance
**What goes wrong:** 3D transforms with perspective cause GPU memory pressure on mobile devices.
**Why it happens:** `perspective` + `rotateX` + `scale` all require GPU compositing layers.
**How to avoid:** Consider disabling the scroll-linked perspective animation on mobile (<=900px) and falling back to a simple IntersectionObserver reveal. The responsive phase (Phase 4) will handle this, but keep it in mind during implementation.
**Warning signs:** Page crashes or becomes very sluggish on iOS Safari.

### Pitfall 6: Progress Line Calculation Override
**What goes wrong:** The existing script.js calculates progress from current date (lines 192-211). This must be replaced with fixed 42% value.
**Why it happens:** Phase 2 implemented date-based calculation; user now wants fixed value with PHP marker.
**How to avoid:** Remove the date calculation, set fixed `width: 42%` with a PHP marker comment. Keep the IntersectionObserver for the entrance animation of the progress line.
**Warning signs:** Progress line shows different values than 42%.

## Code Examples

### Navbar HTML Structure
```html
<!-- Source: Webflow export index.html lines 154-207, adapted per CONTEXT.md decisions -->
<nav class="site-navbar texture-purple">
  <div class="container navbar-container">
    <div class="navbar-left">
      <!-- PHP: menu links -->
      <span class="navbar-menu-text">Meniu</span>
      <a href="#" class="navbar-link">Rinktis buta</a><!-- PHP: link to apartments page -->
    </div>
    <div class="navbar-center">
      <a href="/" class="navbar-logo-link">
        <img src="static/img/axioma-logo-white.svg" alt="Axioma" class="navbar-logo">
      </a>
    </div>
    <div class="navbar-right">
      <a href="#contact" class="btn-cta navbar-cta">
        <span class="btn-text-wrap">
          <span class="btn-text btn-text-in">Registruotis i apziura</span>
          <span class="btn-text btn-text-out">Registruotis i apziura</span>
        </span>
      </a>
    </div>
    <!-- Mobile hamburger (hidden on desktop, functional in Phase 4) -->
    <button class="navbar-hamburger" aria-label="Menu">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>
</nav>
```

### Navbar CSS
```css
/* Source: Webflow .section.nav-bar (line 8627) adapted for project */
.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: transform 0.3s ease;
}

.site-navbar.navbar-hidden {
  transform: translateY(-100%);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  width: 45%;
}

.navbar-center {
  width: 10%;
  display: flex;
  justify-content: center;
}

.navbar-right {
  width: 45%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.navbar-logo {
  width: 8rem;
  height: auto;
}
```

### Timeline Scroll-Linked Animation (Recommended Approach)
```javascript
// Source: Analysis of Webflow IX2 scroll animation pattern
// Webflow uses: height:300vh wrapper + position:sticky inner + IX2 scroll triggers
// Our approach: jQuery scroll handler + rAF for same visual effect without sticky complexity

var $timelineSection = $('.timeline-section');
var timelineCached = null;

function cacheTimelinePositions() {
  if ($timelineSection.length) {
    timelineCached = {
      top: $timelineSection.offset().top,
      height: $timelineSection.outerHeight()
    };
  }
}

$(window).on('resize', cacheTimelinePositions);
cacheTimelinePositions();

// Timeline scroll animation
var timelineRafId = null;
$(window).on('scroll', function() {
  if (!timelineCached) return;
  if (timelineRafId) return; // Already queued

  timelineRafId = requestAnimationFrame(function() {
    timelineRafId = null;
    var scrollY = window.pageYOffset;
    var viewH = window.innerHeight;
    var start = timelineCached.top - viewH;
    var end = timelineCached.top + timelineCached.height;

    if (scrollY < start || scrollY > end) return;

    var progress = (scrollY - start) / (end - start); // 0 to 1

    // Background image: expand clip-path from center
    var clipSize = Math.min(100, progress * 200); // 0% to 100%
    $('.timeline-background-image').css(
      'clip-path', 'inset(' + (50 - clipSize/2) + '% ' + (50 - clipSize/2) + '% ' + (50 - clipSize/2) + '% ' + (50 - clipSize/2) + '%)'
    );

    // Purple overlay: rotateX from tilted to flat
    var rotateX = Math.max(0, 15 * (1 - progress * 2)); // 15deg to 0deg
    $('.timeline-content').css(
      'transform', 'rotateX(' + rotateX + 'deg)'
    );
  });
});
```

### Button Text-Swap (Complete CSS)
```css
/* Source: Webflow inline style block (.text-wrap/.text/.alt-text pattern) */
/* Applied to ALL button variants via compound selector */

.btn-text-in {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.btn-text-out {
  position: absolute;
  transform: translateY(120%);
  opacity: 0;
  transition: transform 0.35s ease, opacity 0.35s ease;
}

/* Hover effect for all CTA variants */
.btn-cta:hover .btn-text-in,
.btn-cta-light:hover .btn-text-in,
.btn-cta-dark:hover .btn-text-in {
  transform: translateY(-120%);
  opacity: 0;
}

.btn-cta:hover .btn-text-out,
.btn-cta-light:hover .btn-text-out,
.btn-cta-dark:hover .btn-text-out {
  transform: translateY(0);
  opacity: 1;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery `.animate()` for scroll effects | CSS transitions + IntersectionObserver | 2020+ | Hardware acceleration, no jQuery animation queue overhead |
| `$(window).scroll()` without throttling | `requestAnimationFrame` wrapping | 2018+ | Smooth 60fps, no jank |
| CSS scroll-driven animations (`animation-timeline: scroll()`) | jQuery scroll handlers | CSS spec still maturing (2024) | jQuery is more reliable for cross-browser support in this stack; CSS scroll-driven lacks Safari < 17.5 |
| Date-calculated progress | Fixed 42% + PHP marker | User decision | Simpler, backend-controlled |

**Deprecated/outdated:**
- The existing date-based timeline progress calculation (script.js lines 192-211) must be replaced with fixed 42% value per user decision.

## Webflow Animation Analysis

### Discover Card Hover (Comparison with Current Implementation)
**Current implementation has:**
1. `.rt-imagr-appearance-layer-one` (accent color) slides in from left (`translateX(-101%)` to `translateX(0)`) on card hover
2. `.rt-imagr-appearance-layer-two` (purple) slides in from left with 0.1s delay
3. `.discover-card-image` scales to 1.05
4. `.discover-card-overlay.texture-purple` fades in (opacity 0 to 1)
5. Text colors change to white

**Webflow IX2 adds (via JS interactions):**
1. The overlay layers (`rt-imagr-appearance-layer-one/two`) use Webflow IX2 mouse-hover triggers with transform animations -- similar to our CSS `:hover` but with easing control
2. The card overlay (`.rt-discover-v2-card-overlay`) has `rt-active`/`rt-inactive` class toggling via IX2
3. Text color changes are triggered by IX2 interaction, not CSS `:hover`

**Gap assessment:** The current CSS implementation already covers the core visual effect. The primary difference is that Webflow IX2 uses JavaScript-driven animations for more precise easing curves, but the visual result is nearly identical to our CSS transitions. **No significant refinements needed** -- the current implementation faithfully reproduces the Webflow behavior.

### Timeline Scroll-Linked Animation (Webflow Structure)
**Webflow uses:**
- `.rt-discover-wrapper { height: 300vh }` -- creates scroll space
- `.rt-newsletter-main { position: sticky; top: 0; height: 100vh; perspective: 5000px; overflow: hidden }` -- pins content while scrolling through
- `.rt-newsletter-form-wrap { perspective: 3000px; position: absolute; inset: 0; }` -- 3D perspective container
- `.rt-newsletter-form-content.texture-purple { width: 88%; max-width: 100rem; padding: 7rem 2rem 6rem; }` -- purple overlay block
- `.rt-newsletter-background-image { width: 50%; height: 70%; }` -- construction photo with contained size
- IX2 animations triggered by scroll position within the 300vh wrapper:
  1. Background image scales/expands
  2. Purple overlay rotates in from 3D perspective (rotateX)
  3. Content fades in

**Recommended implementation approach:** Use jQuery scroll handler (not CSS `animation-timeline: scroll()`) because:
1. CSS scroll-driven animations lack Safari < 17.5 support
2. The project already uses jQuery for all interactions
3. jQuery scroll + rAF provides fine-grained control over multiple synchronized transforms
4. The 300vh scroll-pin pattern can be implemented with a taller section + sticky inner, or simplified to a shorter scroll-progress range

## Open Questions

1. **Timeline section height for scroll-linked animation**
   - What we know: Webflow uses 300vh wrapper with sticky inner. Current implementation has min-height: 100vh.
   - What's unclear: Whether to increase the section height to create scroll space for the animation, or use a shorter progress range.
   - Recommendation: Increase `.timeline-section` to ~200vh with sticky inner content (matching Webflow pattern but shorter). This gives enough scroll space for the animation without excessive blank scrolling.

2. **Hamburger button styling for NAV-03**
   - What we know: Need a hamburger button visible on mobile (<=900px), but modal menu is deferred.
   - What's unclear: Exact hamburger design (lines vs icon).
   - Recommendation: Two parallel lines (matching the Webflow pattern). Hidden on desktop with `display: none`. Clicking it does nothing in v1 (functionality deferred).

3. **Discover card hover -- Webflow IX2 easing differences**
   - What we know: Current CSS transitions use `ease` timing. Webflow IX2 may use custom cubic-bezier curves.
   - What's unclear: Whether the visual difference is noticeable to users.
   - Recommendation: Keep current `ease` timing. The difference is imperceptible at 0.3-0.4s durations.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework for static HTML) |
| Config file | none |
| Quick run command | Open `index.html` in browser, scroll through page |
| Full suite command | Test in Chrome, Firefox, Safari on desktop |

### Phase Requirements - Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar with purple texture, hides on scroll down, shows on scroll up | manual | Scroll page up and down, verify navbar behavior | N/A |
| NAV-02 | Logo stays white (user override) | manual | Visual check -- logo should always be white on purple | N/A |
| NAV-03 | Hamburger button exists, hidden on desktop | manual | Resize browser to <=900px, verify hamburger appears | N/A |
| NAV-04 | CTA button visible in navbar | manual | Scroll page, verify "Registruotis i apziura" always visible | N/A |
| NAV-05 | Menu text and link placeholders | manual | Inspect navbar left side for "Meniu" and "Rinktis buta" | N/A |
| ANIM-01 | Scroll-triggered fade+translateY with stagger | manual | Scroll to each section, verify cascade reveal effect | N/A |
| ANIM-02 | IntersectionObserver + CSS transitions | manual | Verify no GSAP in script.js; animations use CSS classes | N/A |
| ANIM-03 | Button text-swap hover | manual | Hover each CTA button, verify text slides up/in | N/A |
| ANIM-04 | Premium feel, timeline scroll animation | manual | Scroll through timeline, verify perspective distortion effect | N/A |

### Sampling Rate
- **Per task commit:** Open `index.html` in browser, test modified features
- **Per wave merge:** Full page scroll-through in Chrome + Safari
- **Phase gate:** All sections animate correctly, navbar shows/hides, buttons have hover effect

### Wave 0 Gaps
None -- this is a static HTML project with no test framework. All validation is manual browser testing.

## Sources

### Primary (HIGH confidence)
- Webflow export `webflow-export/index.html` lines 154-207 -- navbar HTML structure
- Webflow export `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` lines 8627-8638 -- `.section.nav-bar` fixed positioning
- Webflow export CSS lines 790-877 -- `.rt-button-style`, `.rt-button-main` hover behavior
- Webflow export CSS lines 640-685 -- `.rt-button-text` `.rt-in`/`.rt-out` positioning
- Webflow export CSS lines 1819-1917 -- timeline `.rt-newsletter-form-wrap` perspective, `.rt-newsletter-main` sticky
- Webflow export CSS line 8321 -- `.rt-discover-wrapper { height: 300vh }`
- Webflow export inline `<style>` block lines 27-51 -- `.text-wrap`/`.text`/`.alt-text` text-swap pattern
- Webflow export CSS lines 7309-7337 -- `.rt-imagr-appearance-layer-one/two` and `.rt-image-overlay`
- Project `override.css` lines 1473-1500 -- existing `.scroll-reveal` and stagger patterns
- Project `script.js` lines 73-88 -- existing IntersectionObserver implementation

### Secondary (MEDIUM confidence)
- CSS scroll-driven animations browser support assessment -- based on caniuse.com data from training (Safari 17.5+, Chrome 115+, Firefox 128+)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already loaded in project, no new dependencies
- Architecture: HIGH - patterns verified against Webflow export CSS/HTML
- Pitfalls: HIGH - based on direct code analysis and established CSS animation knowledge
- Timeline scroll animation: MEDIUM - specific implementation will require iterating on clip-path and rotateX values to match Webflow visual

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable -- no fast-moving dependencies)
