# Phase 1: Foundation + Hero - Research

**Researched:** 2026-03-13
**Domain:** HTML/CSS architecture (Bootstrap 5 boilerplate, CSS custom properties, 940px container) + full-screen video hero slider with jQuery
**Confidence:** HIGH

## Summary

This phase establishes the project's HTML/CSS foundation and builds a 3-slide full-screen hero section. The existing codebase already has a working `index.html` boilerplate with all CDN links, `override.css` with a `:root` skeleton, and `script.js` with jQuery patterns -- these need to be updated rather than built from scratch. The Webflow export provides exact design tokens (colors, typography sizes, spacing) and hero structure that must be faithfully translated into clean Bootstrap 5 + jQuery code.

The primary technical challenge is building a custom jQuery slider to replace Webflow's proprietary `w-slider` runtime. The Webflow slider uses `display: inline-block` slides inside an `overflow: hidden` mask with JavaScript-driven translateX transforms. This needs to be reimplemented as a crossfade or similar transition using jQuery and CSS. A secondary challenge is the "Metal" display font from Google Fonts, which is a Khmer-script font that has basic Latin glyphs (A-Z, a-z) but lacks Lithuanian special characters -- this must be documented as a known limitation requiring a fallback strategy.

**Primary recommendation:** Update the existing boilerplate files with Webflow design tokens, build a custom jQuery crossfade slider (3 slides, 6s auto-advance, no external slider library), and copy required assets (video, images, logos) from the Webflow export into the project's file structure.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 3 slides with different Lithuanian headings per slide -- translate English Webflow text to Lithuanian as starting point
- Same CTA button text on all 3 slides
- Slide 1: centered, full-width heading (matching Webflow `rt-v1` layout)
- Slides 2-3: left-aligned heading in narrower container (matching Webflow `rt-v2` layout)
- Hero heading size: 4.5rem (match Webflow exactly)
- Slide 1: Portrait video (1080x1920) with object-fit: cover
- Slides 2-3: Static background images from webflow-export/images/
- Dark overlay on all slides for text readability -- no Ken Burns zoom animation
- 6-second auto-advance between slides
- Video poster image fallback for browsers that block autoplay
- Scroll-down text: "Slinkite zemyn" (Lithuanian) with down-arrow icon
- Scroll-down animation: static with fade-in after hero loads -- no repeating bounce
- Body font: Inter Tight (Google Fonts) -- replaces "Inter" from CLAUDE.md
- Display font: Metal (Google Fonts) -- for hero headings and all main section headings
- Brand colors extracted from Webflow: --color-primary #0B2641, --color-accent #e07f60, --color-purple #5e186e, --color-bg #fefaf9, --color-dark #15151F
- Keep existing status colors (available/reserved/sold) in override.css
- No navbar in Phase 1
- No content sections below hero (Phase 2)

### Claude's Discretion
- Slider navigation controls (arrows, dots, or auto-advance only)
- Font weight selection for Inter Tight (based on actual Webflow usage)
- Page structure below hero (minimal footer vs empty section placeholders)
- Slide transition animation style (crossfade, slide, etc.)
- Hero overlay gradient specifics (opacity, direction)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUN-01 | HTML boilerplate uses Bootstrap 5.3.3, jQuery 3.7.1, and all required CDN/local dependencies | Existing index.html already has correct CDN links; needs font update from Inter to Inter Tight + Metal |
| FOUN-02 | CSS custom properties extracted from Webflow defined in :root in override.css | Full Webflow :root variables extracted -- see Design Tokens section below |
| FOUN-03 | Bootstrap container overridden to match Webflow 940px content width | Webflow uses `max-width: 940px` on `.w-layout-blockcontainer` -- override Bootstrap `.container` to match |
| FOUN-04 | Clean semantic HTML with no Webflow data-* attributes or w-* classes | Webflow hero HTML structure analyzed -- clean translation patterns documented |
| FOUN-05 | File structure matches backend developer's pattern | Existing structure correct; needs video/image assets copied from webflow-export/ into static/img/ |
| HERO-01 | Full-screen hero with 3-slide video background slider (MP4/WebM, autoplay, muted, loop) | Video files in webflow-export/videos/, background images identified for slides 2-3 |
| HERO-02 | Each slide has overlay text heading and CTA button | Webflow heading structure analyzed: rt-v1 (centered, 40rem max) and rt-v2 (left-aligned, 30rem max) |
| HERO-03 | Slide transitions work without Webflow runtime (custom jQuery) | Custom jQuery slider pattern documented -- crossfade recommended |
| HERO-04 | Video poster image fallback for browsers that block autoplay | Poster image available: GLA3_Website_Preview_1080x1920_25fp_komprimiert_poster.0000000.jpg |
| HERO-05 | Scroll-down indicator with smooth scroll to about section | Webflow scroll-down structure analyzed; arrow image available in export |
</phase_requirements>

## Standard Stack

### Core (already established by CLAUDE.md)
| Library | Version | Purpose | Source |
|---------|---------|---------|--------|
| Bootstrap | 5.3.3 | Grid layout, container system | CDN already in index.html |
| jQuery | 3.7.1 | DOM manipulation, slider logic | CDN already in index.html |
| Font Awesome | 6.5.1 | Icons (scroll-down arrow alternative) | CDN already in index.html |
| Inter Tight | Google Fonts | Body text font | Replaces "Inter" in current boilerplate |
| Metal | Google Fonts | Display/heading font | See Font Warning below |

### Assets to Copy from Webflow Export
| Asset | Source Path | Target Path | Purpose |
|-------|-------------|-------------|---------|
| Hero video (MP4) | webflow-export/videos/GLA3_...komprimiert_mp4.mp4 | static/img/hero-video.mp4 | Slide 1 background |
| Hero video (WebM) | webflow-export/videos/GLA3_...komprimiert_webm.webm | static/img/hero-video.webm | Slide 1 fallback format |
| Video poster | webflow-export/videos/GLA3_...poster.0000000.jpg | static/img/hero-poster.jpg | Autoplay fallback |
| Slide 2 image | webflow-export/images/Cam7-2-1.jpg | static/img/hero-slide-2.jpg | Slide 2 background |
| Slide 3 image | webflow-export/images/Crownd--Hanselmayergasse--.avif | static/img/hero-slide-3.avif | Slide 3 background |
| Down arrow | webflow-export/images/arnexo-hero-v1-button-down-arrow.webp | static/img/arrow-down.webp | Scroll indicator |
| Logo (white) | webflow-export/images/axioma-logo-white.svg | static/img/axioma-logo-white.svg | Future navbar use |
| Logo (full) | webflow-export/images/axioma-logo-full.svg | static/img/axioma-logo-full.svg | Future navbar use |

### Don't Include Yet
| Library | Reason |
|---------|--------|
| LightSlider | Hero slider is custom (not thumbnail gallery) -- LightSlider is for Phase 2+ gallery |
| Fancybox | No lightbox functionality in hero -- Phase 2+ |
| jQuery UI | No datepicker in Phase 1 -- keep the CDN link but no active usage |

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)
```
index.html                    # Main page -- updated boilerplate
static/
  css/
    override.css              # :root variables + hero styles + container override
    iphone.css                # Empty (populated in Phase 4)
    ipad.css                  # Empty (populated in Phase 4)
  js/
    script.js                 # jQuery slider logic + smooth scroll
  img/
    hero-video.mp4            # Copied from webflow export
    hero-video.webm           # Copied from webflow export
    hero-poster.jpg           # Copied from webflow export
    hero-slide-2.jpg          # Copied from webflow export
    hero-slide-3.avif         # Copied from webflow export (also provide .jpg fallback)
    arrow-down.webp           # Copied from webflow export
    axioma-logo-white.svg     # Copied from webflow export
    axioma-logo-full.svg      # Copied from webflow export
  fancybox/                   # Already exists with CSS + JS
  theme/
    css/                      # Empty (theme base if needed)
    js/                       # Empty (theme plugins if needed)
```

### Pattern 1: Clean HTML Hero Structure (replacing Webflow markup)

**What:** Translate Webflow's deeply nested div-heavy structure into semantic HTML with Bootstrap-compatible classes.

**Webflow original nesting** (simplified):
```
section.rt-hero-v1
  div.w-layout-blockcontainer.rt-container-xl.rt-change-height.w-container
    div.rt-slider.w-slider[data-delay=4000][data-animation=over]...
      div.w-slider-mask
        div.w-slide
          div.rt-hero-v1-main
            div.w-layout-hflex.rt-hero-v1-background
              div.rt-hero-v1-slider-background-wrapper
                div.rt-hero-v1-slider-background.w-background-video
                  video
                  div.rt-hero-v1-image-overlay
            div.w-layout-vflex.rt-hero-v1-content-wrap
              div.w-layout-blockcontainer.rt-container
                div.rt-hero-v1-content-block
                  div.rt-hero-v1-content-heading
                    div.rt-hero-v1-heading-wrap.rt-v1
                      h1
                      div.rt-button-wrap > a.rt-button-main
```

**Clean translation:**
```html
<section class="hero-section" id="hero">
  <div class="hero-slider">
    <!-- Slide 1: Video -->
    <div class="hero-slide active" data-slide="1">
      <div class="hero-slide-bg">
        <video autoplay muted loop playsinline poster="static/img/hero-poster.jpg">
          <source src="static/img/hero-video.mp4" type="video/mp4">
          <source src="static/img/hero-video.webm" type="video/webm">
        </video>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content hero-content-centered">
        <div class="container">
          <div class="hero-heading-wrap hero-heading-wide">
            <h1>Lithuanian heading text slide 1</h1>
            <div class="hero-cta-wrap">
              <a href="#" class="btn-cta">CTA text</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 2: Static image -->
    <div class="hero-slide" data-slide="2">
      <div class="hero-slide-bg hero-slide-bg-2"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="container">
          <div class="hero-heading-wrap">
            <h1>Lithuanian heading text slide 2</h1>
            <div class="hero-cta-wrap">
              <a href="#" class="btn-cta">CTA text</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 3: Static image -->
    <div class="hero-slide" data-slide="3">
      <!-- Same structure as slide 2 -->
    </div>
  </div>

  <!-- Scroll down indicator -->
  <div class="hero-scroll-down">
    <a href="#about" class="scroll-down-link">
      <span class="scroll-down-text">Slinkite zemyn</span>
      <span class="scroll-down-arrow">
        <img src="static/img/arrow-down.webp" alt="" width="10" height="10">
      </span>
    </a>
  </div>
</section>

<!-- PHP: about section -->
<section id="about">
  <!-- Phase 2 content placeholder -->
</section>
```

### Pattern 2: jQuery Crossfade Slider

**What:** Custom slider using opacity transitions instead of Webflow's translateX-based sliding.

**Why crossfade over sliding:** The Webflow slider uses `display: inline-block` slides in a `white-space: nowrap` mask with translateX. Crossfade is simpler to implement, looks premium for a hero section with full-screen backgrounds, and avoids complexities with video playback during slide movement.

**Example:**
```javascript
// In static/js/script.js
$(document).ready(function() {

  // Hero Slider
  var $slides = $('.hero-slide');
  var slideCount = $slides.length;
  var currentSlide = 0;
  var slideInterval = 6000; // 6 seconds per CONTEXT.md
  var timer;

  function goToSlide(index) {
    $slides.eq(currentSlide).removeClass('active');
    currentSlide = index % slideCount;
    $slides.eq(currentSlide).addClass('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoplay() {
    timer = setInterval(nextSlide, slideInterval);
  }

  // Start
  startAutoplay();

  // Smooth scroll for scroll-down indicator
  $('.scroll-down-link').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
  });

});
```

**CSS for crossfade:**
```css
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 1;
}

.hero-slide.active {
  opacity: 1;
  z-index: 2;
}
```

### Pattern 3: Bootstrap Container Override

**What:** Override Bootstrap's default container max-widths to match Webflow's 940px layout.

**Webflow evidence:** The `.w-layout-blockcontainer` class sets `max-width: 940px` (line 57 of Webflow CSS). This is the content container used throughout the design.

**Implementation:**
```css
/* Override Bootstrap container to match Webflow 940px design */
.container {
  max-width: 940px;
}

@media (max-width: 991px) {
  .container {
    max-width: 728px;
  }
}

@media (max-width: 767px) {
  .container {
    max-width: none;
  }
}
```

Note: Bootstrap 5.3.3 CDN container defaults are 540px (sm), 720px (md), 960px (lg), 1140px (xl), 1320px (xxl). The 940px override effectively constrains the lg+ breakpoints. The Webflow design uses 940px as the base content width at all desktop sizes.

### Anti-Patterns to Avoid
- **Using Webflow w-* classes:** Every `w-layout-hflex`, `w-layout-vflex`, `w-slide`, `w-slider-mask` etc. must be replaced with semantic or custom classes
- **Keeping data-w-id or data-wf-* attributes:** These are Webflow runtime hooks and must be stripped
- **Using inline style transforms from Webflow:** The Webflow export has verbose inline `style="-webkit-transform:translate3d(0, 0, 0)..."` on every element -- remove entirely
- **Building a sliding (translateX) slider:** Crossfade is simpler, more robust for mixed video/image slides, and avoids edge cases with video playback during transitions
- **Adding media queries to override.css:** Per CLAUDE.md, responsive rules go ONLY in iphone.css and ipad.css (Phase 4)

## Design Tokens (Extracted from Webflow CSS)

### Colors
```css
:root {
  /* Brand colors (from Webflow + CONTEXT.md) */
  --color-primary: #0B2641;     /* Dark navy -- primary dark (Webflow: --color-black in inline styles) */
  --color-accent: #e07f60;      /* Orange accent (Webflow: --orange, --black variable confusingly) */
  --color-purple: #5e186e;      /* Purple accent (Webflow: --purple) */
  --color-bg: #fefaf9;          /* Warm off-white background (Webflow: --white-smoke, --white) */
  --color-dark: #15151F;        /* Dark bg for footer/dark sections (from CONTEXT.md) */
  --color-text: #0B2641;        /* Body text color (same as primary) */
  --color-text-light: #666666;  /* Secondary text */
  --color-border: #dee2e6;      /* Default borders */
  --color-white: #ffffff;       /* Pure white */

  /* Status colors (keep existing) */
  --color-available: #27ae60;
  --color-reserved: #f39c12;
  --color-sold: #e74c3c;
}
```

**IMPORTANT Webflow color confusion:** In the Webflow CSS, `--black` is set to `#e07f60` (the orange accent) and `--white` is set to `#fefaf9` (the warm background). These are NOT black and white -- they are the brand accent and background colors. The CSS uses `--black` on body text color and `--orange` on body text color (both resolve to #e07f60). The actual primary dark color (#0B2641) appears in the inline `<style>` block as `--color-black`. Our override.css uses properly named variables to avoid this confusion.

### Typography
```css
:root {
  /* Font families */
  --font-body: 'Inter Tight', sans-serif;
  --font-display: 'Metal', sans-serif;

  /* Heading 1 (hero headings) */
  --font-size-h1: 4.5rem;         /* 72px */
  --line-height-h1: 108.33%;
  --letter-spacing-h1: -0.3rem;
  --font-weight-h1: 400;

  /* Heading 2 */
  --font-size-h2: 3.2rem;         /* 51.2px */
  --line-height-h2: 125%;
  --letter-spacing-h2: -0.09rem;

  /* Heading 3 */
  --font-size-h3: 2rem;           /* 32px */
  --line-height-h3: 120%;
  --letter-spacing-h3: -0.05rem;

  /* Heading 4 */
  --font-size-h4: 1.375rem;       /* 22px */
  --line-height-h4: 141.67%;
  --letter-spacing-h4: -0.0275rem;

  /* Body text */
  --font-size-body: 0.8rem;       /* 12.8px */
  --line-height-body: 162.5%;
  --letter-spacing-body: 0rem;
  --font-weight-normal: 400;

  /* Sub text (scroll-down label) */
  --font-size-sub: 1.5rem;        /* 24px */
  --line-height-sub: 171.43%;

  /* Button text */
  --font-size-button: 0.6875rem;  /* 11px */
  --font-weight-button: 600;

  /* Nav menu text */
  --font-size-nav: 1rem;          /* 16px */
  --letter-spacing-nav: 0.0875rem;
}
```

### Spacing
```css
:root {
  --gutter: 1.5rem;                 /* 24px -- Webflow gutter space */
  --section-gap: 8.125rem;          /* 130px -- between major sections */
  --section-gap-small: 7.5rem;      /* 120px -- smaller section gaps */
}
```

### Hero-Specific Values
```css
/* Hero overlay gradient (from Webflow line 979-983) */
.hero-overlay {
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(255,255,255,0) 30%),
                    linear-gradient(90deg, rgba(0,0,0,0.8), rgba(255,255,255,0) 49%);
  position: absolute;
  inset: 0;
}

/* Heading wrap widths */
.hero-heading-wide { max-width: 40rem; }   /* rt-v1: slide 1, centered */
.hero-heading-wrap { max-width: 30rem; }   /* rt-v2: slides 2-3, left-aligned */

/* Button style */
.btn-cta {
  text-transform: uppercase;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03125rem;
  line-height: 1.5rem;
  padding: 0.625rem 2.2rem;
  border: 0.0625rem solid var(--color-bg);
  background-color: var(--color-bg);        /* White variant for hero */
  color: var(--color-accent);
  transition: background-color 0.5s;
}
.btn-cta:hover {
  background-color: transparent;
  color: var(--color-bg);
}

/* Scroll-down area */
.hero-scroll-down {
  z-index: 400;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 5rem;
}

/* Scroll-down text uses display font, uppercase */
.scroll-down-text {
  font-family: var(--font-display);
  text-transform: uppercase;
  color: var(--color-bg);
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS Reset/Normalize | Custom reset | Bootstrap 5.3.3 Reboot | Already included via CDN, handles cross-browser baseline |
| Grid system | Custom flexbox grid | Bootstrap .container, .row, .col-* | Backend developer expects Bootstrap grid classes |
| Smooth scrolling | Raw scrollTo with easing math | jQuery .animate() with scrollTop | Already have jQuery; simple and cross-browser |
| Icon system | Custom SVGs for all icons | Font Awesome 6 | Already loaded via CDN; use for down arrow alternative if webp has issues |
| Video background poster fallback | Custom JS poster swap logic | Native `<video poster="...">` attribute | Browser handles poster display when autoplay fails |

## Common Pitfalls

### Pitfall 1: AVIF Image Format Compatibility
**What goes wrong:** Slide 3 background is an `.avif` file (Crownd--Hanselmayergasse--.avif). AVIF has ~93% browser support but older Safari versions (pre-16.4) and some corporate browsers lack support.
**Why it happens:** Webflow CDN serves optimized formats; the export includes AVIF which may not have a JPEG fallback in the export directory.
**How to avoid:** Provide a `.jpg` fallback. Either convert the AVIF to JPG during asset copy, or use CSS `image-set()` / `<picture>` in the background. Simplest: convert to JPG and use that as the primary format for Phase 1.
**Warning signs:** Blank slide 3 background in Safari testing.

### Pitfall 2: Metal Font Lacks Lithuanian Characters
**What goes wrong:** The "Metal" Google Font is a Khmer-script font. It has basic Latin A-Z/a-z glyphs (52 characters confirmed via font file analysis) but has ZERO Lithuanian-specific characters (no ą, č, ę, ė, į, š, ų, ū, ž).
**Why it happens:** The Webflow template uses English text where Latin-only coverage suffices. Lithuanian text with special characters will show tofu (missing glyph boxes) or fall back to the `sans-serif` generic fallback.
**How to avoid:** Accept that Metal will render the Latin portions of Lithuanian text and the sans-serif fallback (likely system sans-serif or Inter Tight if stacked) will render special characters. The font-family declaration `'Metal', 'Inter Tight', sans-serif` will cause the browser to use Metal for Latin glyphs and fall back to Inter Tight for Lithuanian special characters. This produces a mixed-font appearance in headings.
**Warning signs:** Lithuanian headings with characters like "ą" or "ž" rendering in a visibly different style/weight than surrounding Latin characters. Flag this to the user -- they may want to use Inter Tight for all headings instead, or find a Latin Extended display font.

### Pitfall 3: Portrait Video Cropping on Desktop
**What goes wrong:** The hero video is 1080x1920 (portrait/9:16). On a typical desktop viewport (16:9), `object-fit: cover` will crop the left and right sides significantly -- approximately 70% of the width is hidden.
**Why it happens:** The video was likely shot for mobile-first display. The Webflow design uses the same video on desktop with center-crop.
**How to avoid:** This is an accepted tradeoff per CONTEXT.md. Ensure `object-position: center` is set so the interesting part of the video (center) is always visible. The poster image has the same dimensions and will crop identically.
**Warning signs:** Important visual content at the edges of the video frame being cut off.

### Pitfall 4: Video Autoplay Blocked on Mobile/Low Power
**What goes wrong:** Some browsers block autoplay even when muted, particularly on low-power mode (iOS) or data-saver mode.
**Why it happens:** Browser autoplay policies are increasingly restrictive.
**How to avoid:** Always set the `poster` attribute on the `<video>` tag. The poster image serves as an acceptable static fallback. The `playsinline` attribute is critical for iOS (prevents fullscreen takeover). Required attributes: `autoplay muted loop playsinline poster="..."`.
**Warning signs:** White/black rectangle where video should be.

### Pitfall 5: Bootstrap Container Specificity
**What goes wrong:** The Bootstrap CDN CSS has higher specificity container rules at each breakpoint. A simple `.container { max-width: 940px; }` may be overridden by Bootstrap's `@media (min-width: 1200px) { .container { max-width: 1140px; } }`.
**Why it happens:** Bootstrap defines container max-widths at every breakpoint (sm: 540px, md: 720px, lg: 960px, xl: 1140px, xxl: 1320px).
**How to avoid:** Override at each relevant breakpoint in override.css, or use `!important` on the max-width (less preferred). Best approach: override at the lg and above breakpoints to cap at 940px.
**Warning signs:** Container appearing wider than 940px on large screens.

### Pitfall 6: Webflow Color Variable Confusion
**What goes wrong:** Copying Webflow variable names literally leads to `--black: #e07f60` (which is orange) and `--white: #fefaf9` (which is off-white, not white).
**Why it happens:** The Webflow template author used `--black` and `--white` as semantic brand color names, not literal color names. `--black` is the brand accent orange, `--white` is the warm background.
**How to avoid:** Use descriptive variable names in override.css as specified in CONTEXT.md: `--color-primary`, `--color-accent`, `--color-bg`, etc. Never copy Webflow variable names.
**Warning signs:** Text or backgrounds appearing in unexpected colors.

## Code Examples

### Google Fonts Link (replacing current Inter-only)
```html
<!-- Google Fonts: Inter Tight + Metal -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=Metal&display=swap" rel="stylesheet">
```

Note: Metal on Google Fonts only has weight 400. The Webflow template requests `"Metal:300,400,500,600,700"` but the font only ships with regular (400). The `font-weight: 400` in Webflow CSS confirms this -- all heading weights are 400.

### Video Element with Poster Fallback
```html
<video autoplay muted loop playsinline
       poster="static/img/hero-poster.jpg"
       class="hero-video">
  <source src="static/img/hero-video.mp4" type="video/mp4">
  <source src="static/img/hero-video.webm" type="video/webm">
</video>
```

```css
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
}
```

### Hero Button with Text-Swap Hover (Webflow pattern simplified)
The Webflow button has two text elements (`.rt-in` visible, `.rt-out` hidden below) that swap on hover. This is the ANIM-03 requirement (Phase 3), but the button structure should be built now to avoid restructuring later.

```html
<a href="#" class="btn-cta">
  <span class="btn-text-wrap">
    <span class="btn-text btn-text-in">Gauti pasiulymą</span>
    <span class="btn-text btn-text-out">Gauti pasiulymą</span>
  </span>
</a>
```

```css
.btn-text-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.btn-text {
  white-space: nowrap;
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.btn-text-out {
  position: absolute;
  left: 0;
  transform: translateY(120%);
  opacity: 0;
}
/* Hover animation will be activated in Phase 3 (ANIM-03) */
```

### Scroll-Down Indicator with Fade-In
```css
.hero-scroll-down {
  z-index: 400;
  pointer-events: none;
  position: absolute;
  inset: auto 0 0 0;
  padding-bottom: 5rem;
  opacity: 0;
  animation: fadeIn 1s ease 1.5s forwards;  /* Fade in after 1.5s delay */
}

.scroll-down-link {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 1.3125rem;
  padding-left: 0.9375rem;
  text-decoration: none;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Webflow w-slider runtime | Custom jQuery/CSS slider | This project | No dependency on webflow.js (78KB minified runtime) |
| `<img>` for background video poster | Native `<video poster="">` | HTML5 standard | Browser handles fallback natively |
| jQuery `.animate()` for scroll | `scroll-behavior: smooth` CSS | CSS standard | Can use CSS-only, but jQuery animate gives more control and IE compat |
| Multiple CSS files per breakpoint | Media queries in single file | Industry standard | This project intentionally uses separate files per backend developer convention |

## Open Questions

1. **Metal Font Lithuanian Character Rendering**
   - What we know: Metal (Google Fonts) has Latin A-Z but no Lithuanian special characters (ą, č, ę, ė, į, š, ų, ū, ž = 0 of 9 present). It will fall back to sans-serif for these.
   - What's unclear: Whether the mixed-font rendering (Metal for Latin + fallback for Lithuanian) looks acceptable or jarring. This needs visual testing.
   - Recommendation: Implement with `font-family: 'Metal', 'Inter Tight', sans-serif` for headings. If the result looks poor, the user may want to switch display headings to Inter Tight with a heavier weight or find a Latin Extended display font. **Flag this to user after Phase 1 is visually testable.**

2. **Slide 3 AVIF to JPG Conversion**
   - What we know: The slide 3 background (Crownd--Hanselmayergasse--.avif, 551KB) is AVIF only in the export.
   - What's unclear: Whether Webflow has a JPG version on their CDN or if we need to convert.
   - Recommendation: Convert to JPG using any image tool, or use the AVIF directly with awareness that ~7% of browsers won't render it. For Phase 1, converting to JPG is safest.

3. **Hero Slider Arrow Navigation**
   - What we know: Webflow has left/right arrows (`.rt-banner-arrow` positioned at bottom-right, 4.75rem x 4.7rem, background-color: accent orange). The CONTEXT.md lists slider controls as Claude's discretion.
   - Recommendation: For Phase 1, implement auto-advance only. Arrows/dots add complexity without adding to the core success criteria. Can be added later if desired.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (static HTML, no build step) |
| Config file | none |
| Quick run command | `open index.html` in browser |
| Full suite command | Manual checklist verification |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | Bootstrap 5.3.3 + jQuery 3.7.1 loaded | manual | Open DevTools > Console > `$.fn.jquery` + `bootstrap.Modal.VERSION` | N/A |
| FOUN-02 | CSS custom properties in :root | manual | DevTools > Elements > `<html>` computed styles | N/A |
| FOUN-03 | Container max-width 940px | manual | DevTools > select `.container` > verify max-width | N/A |
| FOUN-04 | No Webflow data-*/w-* in source | manual-grep | `grep -r "data-wf\|data-w-\|class=\"w-" index.html` returns 0 results | N/A |
| FOUN-05 | File structure correct | manual | `ls static/css/ static/js/ static/img/ static/fancybox/ static/theme/` | N/A |
| HERO-01 | 3-slide hero with video bg | manual | Open page, observe 3 slides auto-cycling with video on slide 1 | N/A |
| HERO-02 | Overlay text + CTA on each slide | manual | Each slide shows heading + button during auto-advance | N/A |
| HERO-03 | Transitions without Webflow runtime | manual | No webflow.js loaded; transitions are smooth | N/A |
| HERO-04 | Video poster fallback | manual | Throttle network in DevTools, reload; poster image visible | N/A |
| HERO-05 | Scroll-down smooth scrolls | manual | Click "Slinkite zemyn", page smooth-scrolls to #about | N/A |

### Sampling Rate
- **Per task commit:** Open index.html in browser, verify visual output
- **Per wave merge:** Full checklist above
- **Phase gate:** All 10 requirements verified before phase completion

### Wave 0 Gaps
None -- this is a static HTML project with no test framework. Validation is manual browser testing, which is appropriate for the stack (no npm, no build step, static HTML per CLAUDE.md).

## Sources

### Primary (HIGH confidence)
- Webflow export CSS: `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` -- all design tokens, hero layout CSS, container widths, typography scale
- Webflow export HTML: `webflow-export/index.html` -- hero structure (lines 210-331), slide content, button patterns, scroll-down indicator
- Webflow export CSS: `webflow-export/css/webflow.css` -- base slider/video styles from Webflow platform
- Existing project files: `index.html`, `static/css/override.css`, `static/js/script.js` -- current boilerplate state

### Secondary (MEDIUM confidence)
- Google Fonts Metal font file analysis (downloaded and inspected via fontTools) -- confirmed 52 Latin, 0 Lithuanian characters
- [Metal - Google Fonts](https://fonts.google.com/specimen/Metal) -- Khmer-script font
- [Bootstrap 5 Containers documentation](https://getbootstrap.com/docs/5.0/layout/containers/) -- container max-width override patterns

### Tertiary (LOW confidence)
- AVIF browser support (~93%) -- based on training data, may have improved since

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries already in place, versions confirmed from existing index.html CDN links
- Architecture: HIGH -- Webflow CSS provides exact design tokens and layout values; translation patterns are straightforward
- Pitfalls: HIGH -- Font analysis performed empirically; video format and autoplay issues well-documented
- Hero slider: MEDIUM -- jQuery crossfade is a well-known pattern but specific timing/transition details may need tuning during implementation

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable -- no fast-moving dependencies)
