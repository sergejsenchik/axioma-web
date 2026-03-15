# Technology Stack

**Project:** Axioma Homepage — Webflow-to-Bootstrap Refactor
**Researched:** 2026-03-13

## Recommended Stack

### Core Framework (Fixed — Backend Developer Compatibility)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Bootstrap | 5.3.3 | Grid, layout, responsive utilities | Pinned in project spec for backend developer compatibility. Note: 5.3.8 is latest (Aug 2025), but use 5.3.3 to match backend dev's existing projects exactly. Upgrading would require backend dev coordination. |
| jQuery | 3.7.1 | DOM manipulation, event delegation, animation | Required for jQuery UI datepicker, Fancybox, and all interactive behavior per project constraints. |
| jQuery UI | 1.13.1 | Datepicker with Lithuanian locale | Backend developer uses this exact version across all reference sites. |

**Confidence: HIGH** — Versions verified from existing `index.html` CDN links and `CLAUDE.md` constraints.

### Typography

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Google Fonts: Inter | Variable/400-700 | Body text, UI elements | Already defined in `override.css` as `--font-primary`. "Inter" replaces Webflow's "Inter Tight" — both share identical glyph shapes but "Inter" is the actively maintained general-purpose version while "Inter Tight" is a frozen variant originally made for Google Workspace. |
| Google Fonts: EB Garamond | 400 Italic | Display headings (h1-h4) | Replaces "Metal" from Webflow export. EB Garamond is a serif display font, always used as 400 Italic. Smaller headings (h5-h6) use Inter Tight. |

**Confidence: HIGH** — Font choice confirmed by user. EB Garamond for h1-h4, Inter Tight for body and h5-h6.

**Font loading approach:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,500&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Do NOT use WebFont.load() (Webflow's approach). The Google Fonts `<link>` tag with `display=swap` is simpler, has no JS dependency, and matches the backend developer's pattern.

### Animation Libraries

| Library | Version | CDN | Purpose | Why |
|---------|---------|-----|---------|-----|
| Animate.css | 4.1.1 | `cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css` | Scroll-triggered entrance animations (fadeIn, slideInUp, fadeInLeft, etc.) | Pure CSS, zero JS dependency, 80+ built-in animations. Used with IntersectionObserver to add classes on scroll. Covers ~80% of the Webflow fade-in/slide-up interactions. ~16KB minified. |
| CSS transitions (custom) | N/A | N/A | Button hover effects, text swap animations, image zoom on hover | The Webflow export already uses CSS transitions for hovers (transform .35s ease, opacity .35s ease). These translate 1:1 into custom CSS — no library needed. |

**Confidence: HIGH** — Animate.css is the standard for CSS-only entrance animations without a build step. Version 4.1.1 confirmed current on cdnjs.

#### What About GSAP?

The Webflow export loads GSAP 3.14.2 and ScrollTrigger for scroll-driven animations. As of April 2025, GSAP is **free for all commercial use** (Webflow acquired GreenSock).

**Recommendation: Do NOT use GSAP.** Reasons:
1. **Stack conflict.** The project mandates jQuery for all JS interactions. Adding GSAP introduces a second animation paradigm. The backend developer will not maintain GSAP code.
2. **Overkill.** The homepage animations are simple: fade-in on scroll, translate-Y entrance, opacity transitions, counter number animations. These do not require a 68KB animation engine.
3. **License restriction still applies.** GSAP's free license prohibits use in tools that compete with Webflow's visual builder — not relevant here, but the dependency on Webflow's continued licensing goodwill is a consideration.

The correct approach: Replace GSAP ScrollTrigger with **IntersectionObserver + Animate.css classes** triggered by jQuery. This is lightweight, maintainable, and consistent with the jQuery-first architecture.

### Lottie Animation Player

| Library | Version | CDN | Purpose | Why |
|---------|---------|-----|---------|-----|
| lottie-player (web component) | 2.0.12 | `unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js` | Confetti animation on popup hover, circle loader in "Measured in minutes" section | The Webflow export references two Lottie JSON animations: `cirlce_loader.json` (progress ring) and an implied confetti effect. The web component approach uses `<lottie-player>` custom element — no jQuery integration needed, works alongside jQuery without conflict. |

**Alternative considered:** jLottie (15KB vs ~300KB for lottie-player). jLottie only supports a subset of Lottie features. Since the circle_loader.json complexity is unknown, use the full lottie-player to avoid rendering gaps. If bundle size becomes a concern, test with jLottie later.

**Confidence: HIGH** — lottie-player is the standard approach, version verified on npm/jsdelivr.

### Existing Libraries (Already in Project)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Fancybox | Custom build | Lightbox (future gallery pages) | Already bundled in `static/fancybox/`. Not needed for homepage but keep loaded for consistency. |
| LightSlider | 1.1.6 | Thumbnail carousels (future pages) | Already in CDN config. Not needed for homepage. |
| Font Awesome | 6.5.1 | Icons | Used for social icons, UI elements. Already configured. |

### Video Background

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Native HTML5 `<video>` | N/A | Hero background video slider | No library needed. The `<video autoplay muted loop playsinline>` pattern with `<source>` fallbacks is universally supported. The Webflow export already uses this exact pattern. |

**Confidence: HIGH** — HTML5 video background is the established standard. No additional library required.

## Webflow-to-Bootstrap Conversion Strategy

### CSS Architecture for the Transition

The Webflow export contains ~16,900 lines of CSS with these class patterns that must be completely replaced:

| Webflow Pattern | Bootstrap Equivalent | Notes |
|----------------|---------------------|-------|
| `w-layout-blockcontainer` | `.container` / `.container-xl` | Webflow uses 940px max-width; Bootstrap 5 uses 1140px by default. Override Bootstrap container to 940px in `override.css` to match design. |
| `w-layout-hflex` | `.d-flex` | Direct mapping. |
| `w-layout-vflex` | `.d-flex .flex-column` | Direct mapping. |
| `w-layout-grid` | `.row` + `.col-*` | Webflow CSS Grid to Bootstrap flexbox grid. |
| `w-container` | `.container` | Drop entirely, use Bootstrap container. |
| `w-slider` / `w-slide` | Custom jQuery slider | No Bootstrap carousel — build a minimal custom slider (see below). |
| `w-background-video` | Native `<video>` element | Webflow wraps video in JS-managed container; replace with plain HTML5 video. |
| `w-inline-block` | `.d-inline-block` or remove | Usually unnecessary with proper semantic HTML. |
| `w-form` / `w-input` | Bootstrap form classes | `.form-control`, `.form-check`, etc. |
| `w-checkbox` | `.form-check` | Bootstrap checkbox pattern. |
| `rt-*` classes | Rename to lowercase-hyphenated | `rt-hero-v1` becomes `hero`, `rt-button-main` becomes `btn-primary` or `btn-axioma`, etc. |
| `data-w-id`, `data-wf-*` | Remove entirely | Webflow interaction engine identifiers. Not needed. |

**Container width decision:** Override Bootstrap's default container to match the Webflow design's 940px layout:
```css
/* In override.css */
.container {
  max-width: 940px;
}
.container-xl {
  max-width: 1200px; /* for full-width sections */
}
```

### Class Mapping Strategy

**Do NOT attempt a mechanical find-and-replace.** The Webflow HTML structure is deeply nested with unnecessary wrapper divs. The conversion approach is:

1. **Write new HTML from scratch** using the Webflow export as a visual reference (layout, spacing, typography).
2. **Use Bootstrap grid** for all layout (`.container`, `.row`, `.col-*`).
3. **Extract visual values** from Webflow CSS (colors, spacing, font sizes, border-radius) into CSS custom properties in `override.css`.
4. **Name classes** using the project convention: lowercase-hyphenated (`hero-section`, `about-content`, `contact-form`).
5. **Strip all `data-w-*` attributes** — these are Webflow's interaction engine hooks and are meaningless outside Webflow.

This is a **rewrite using the Webflow export as a design spec**, not a mechanical CSS translation.

**Confidence: HIGH** — This is the standard approach. Mechanical conversion produces unmaintainable code.

### Hero Video Slider Implementation

The Webflow export uses `w-slider` (Webflow's proprietary slider) with 3 slides, each having a video/image background. Replace with a custom jQuery implementation:

```javascript
// Custom hero slider — replaces Webflow w-slider
// Slides are plain divs; crossfade with CSS opacity transition
var currentSlide = 0;
var $slides = $('.hero-slide');
var slideCount = $slides.length;
var slideInterval = 4000; // 4s per slide, matching Webflow's data-delay="4000"

function showSlide(index) {
  $slides.removeClass('active');
  $slides.eq(index).addClass('active');
}

setInterval(function() {
  currentSlide = (currentSlide + 1) % slideCount;
  showSlide(currentSlide);
}, slideInterval);
```

**Do NOT use Bootstrap Carousel** for this because:
- Bootstrap Carousel uses horizontal sliding; the Webflow design uses crossfade (overlay transition).
- The slides contain full-viewport video backgrounds — simpler to handle with absolute-positioned slides + opacity toggling.
- Adding Bootstrap Carousel's JS for 3 background slides is unnecessary weight.

**Do NOT use Slick, Swiper, or Owl Carousel** — they are massive libraries for a 3-slide hero with no user interaction (auto-advance only, no swipe needed).

### Scroll Animation Implementation

The Webflow export uses ~30 elements with `data-w-id` and inline `style="opacity:0"` indicating scroll-triggered fade-in animations. Replace with:

```javascript
// IntersectionObserver + Animate.css
// Elements start hidden, get animated class when scrolled into view
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var $el = $(entry.target);
      var animation = $el.data('animation') || 'animate__fadeInUp';
      $el.addClass('animate__animated ' + animation);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

$('[data-animation]').each(function() {
  observer.observe(this);
});
```

HTML pattern:
```html
<h3 class="animate__animated" data-animation="animate__fadeInUp" style="opacity: 0;">
  Section heading
</h3>
```

Add to `override.css`:
```css
/* Elements with animation start invisible */
[data-animation] {
  opacity: 0;
}
/* Animate.css sets opacity: 1 during animation */
.animate__animated {
  opacity: 1;
}
```

**Confidence: HIGH** — IntersectionObserver has 97%+ browser support. Combined with Animate.css, this replicates the Webflow scroll-trigger behavior without any heavy library.

### Counter Animation (Number Ticker)

The Webflow export uses a "counter train" approach — vertically stacked digits that translateY to reveal the target number. This is a CSS-only animation triggered on scroll:

```javascript
// Counter animation using jQuery .animate()
function animateCounter($el, target) {
  $({ count: 0 }).animate({ count: target }, {
    duration: 1500,
    easing: 'swing',
    step: function() {
      $el.text(Math.floor(this.count));
    },
    complete: function() {
      $el.text(target);
    }
  });
}
```

Use jQuery's built-in `.animate()` with the step callback — no additional library needed. This is simpler and more maintainable than the Webflow "counter train" DOM structure (which stacks multiple `<div>` elements for each digit).

### Button Hover Effect

The Webflow export uses a dual-text button pattern:
```html
<div class="rt-button-text rt-in">Text</div>   <!-- visible -->
<div class="rt-button-text rt-out">Text</div>  <!-- hidden below -->
```

On hover, the first text slides up and the second slides in from below. Recreate with pure CSS:

```css
.btn-axioma .btn-text {
  transition: transform 0.35s ease;
}
.btn-axioma .btn-text-alt {
  position: absolute;
  transform: translateY(120%);
  transition: transform 0.35s ease;
}
.btn-axioma:hover .btn-text {
  transform: translateY(-120%);
}
.btn-axioma:hover .btn-text-alt {
  transform: translateY(0);
}
```

No animation library needed — this is a direct CSS transition mapping from the Webflow inline styles.

### Image Reveal Effect

The Webflow export uses a two-layer overlay that slides away to reveal images:
```html
<div class="rt-image-overlay">
  <div class="rt-imagr-appearance-layer-one"></div>
  <div class="rt-imagr-appearance-layer-two"></div>
</div>
```

Recreate with CSS `@keyframes`:
```css
@keyframes imageReveal {
  0% { transform: scaleX(1); transform-origin: left; }
  50% { transform: scaleX(0); transform-origin: left; }
  100% { transform: scaleX(0); transform-origin: left; }
}
```

Triggered by IntersectionObserver adding a class. Pure CSS, no library.

## Video Background Best Practices

### HTML Pattern
```html
<div class="hero-slide active">
  <video autoplay muted loop playsinline
         preload="metadata"
         poster="static/img/hero-poster.jpg">
    <source src="videos/hero-1.webm" type="video/webm">
    <source src="videos/hero-1.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>
</div>
```

### Critical Requirements
1. **`muted` is mandatory** — browsers block autoplay for unmuted video.
2. **`playsinline` is mandatory** — iOS Safari forces fullscreen without it.
3. **`poster` attribute** — shows immediately while video loads; critical for perceived performance.
4. **WebM first, MP4 fallback** — WebM (VP9) is ~30% smaller than MP4 (H.264) at equivalent quality. Safari falls back to MP4.
5. **`preload="metadata"`** for hero (above-fold). Do NOT use `preload="auto"` — it downloads the entire video immediately.

### Mobile Strategy
Disable video on mobile (<=768px), show poster image instead:
```css
/* In iphone.css */
.hero-slide video {
  display: none;
}
.hero-slide {
  background-image: url('../img/hero-poster.jpg');
  background-size: cover;
  background-position: center;
}
```

This avoids mobile data consumption and battery drain. The existing video files are portrait-oriented (1080x1920) which is ideal for mobile poster extraction but unusual for desktop hero — verify if landscape versions exist or will be provided.

### Video File Optimization
Current files: MP4 (1.8MB), WebM (1.7MB) — already well-compressed. The 1080x1920 (portrait) resolution is unusual for a hero background. For desktop, consider:
- Requesting landscape (1920x1080) versions for desktop display
- Using `object-fit: cover` to crop portrait video to landscape viewport (current Webflow approach)

**Confidence: HIGH** — HTML5 video background is a solved problem with wide browser support.

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Scroll animations | Animate.css + IntersectionObserver | GSAP + ScrollTrigger | Adds 68KB+ JS, second animation paradigm, backend dev won't maintain |
| Scroll animations | Animate.css + IntersectionObserver | AOS (Animate on Scroll) | AOS is 14KB JS + CSS but hasn't been updated since 2021. Essentially does what IntersectionObserver + Animate.css does but with more abstraction. Not worth the dependency on an unmaintained library. |
| Hero slider | Custom jQuery (20 lines) | Slick/Swiper/Owl Carousel | Massive libraries (100KB+) for a simple 3-slide auto-advance crossfade with no user interaction |
| Hero slider | Custom jQuery (20 lines) | Bootstrap Carousel | Bootstrap Carousel uses horizontal slide, not crossfade overlay. Would need extensive CSS override. |
| Lottie | lottie-player 2.0.12 | jLottie (15KB) | jLottie supports subset of Lottie features; risk of rendering gaps with unknown JSON complexity |
| Lottie | lottie-player 2.0.12 | lottie-web (bodymovin) | Heavier (~250KB), more API surface than needed for 2 simple animations |
| Animation engine | CSS transitions + jQuery.animate() | Velocity.js | Velocity.js (45KB) replaces jQuery.animate() with better performance, but jQuery's native animate() is sufficient for counter animations. Not worth adding another library. |
| Font loading | Google Fonts `<link>` | WebFont.load() (Webflow approach) | Adds JS dependency for font loading. The `<link>` approach with `display=swap` is simpler and standard. |

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| GSAP | Second animation paradigm, backend dev won't maintain, overkill for these animations |
| AOS (Animate on Scroll) | Unmaintained since 2021, does the same thing as IntersectionObserver + Animate.css |
| Slick/Swiper/Owl Carousel | Massive libraries for a 3-slide crossfade |
| Tailwind CSS | Explicitly forbidden in project constraints |
| React/Vue/Angular | Explicitly forbidden in project constraints |
| fetch API | Explicitly forbidden for form submissions |
| CSS-in-JS | Explicitly forbidden in project constraints |
| npm/build tools | Explicitly forbidden — all files served as-is |
| WebFont.load() | Unnecessary JS dependency for font loading |
| normalize.css | Bootstrap includes its own reset (Reboot). The Webflow export includes normalize.css separately but Bootstrap handles this. |

## Installation

No npm. All libraries loaded via CDN or local files.

### CDN Resources (add to HTML `<head>`)
```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Animate.css -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">

<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,500&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### CDN Resources (add before `</body>`)
```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Lottie Player (web component) -->
<script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js"></script>

<!-- Custom Script -->
<script src="static/js/script.js"></script>
```

### Local Files (already in project)
```
static/fancybox/jquery.fancybox.min.css
static/fancybox/jquery.fancybox.min.js
static/css/override.css          (main styles + CSS custom properties)
static/css/iphone.css            (mobile <= 900px)
static/css/ipad.css              (tablet 768-1024px)
static/js/script.js              (all custom JS)
```

### New CSS Custom Properties to Add

Based on the Webflow export's `:root` variables, add these to `override.css`:

```css
:root {
  /* Brand colors (from Webflow export) */
  --color-primary: #0B2641;     /* dark navy — main text */
  --color-secondary: #5e186e;   /* purple — accent/texture */
  --color-accent: #e07f60;      /* orange/coral — links, highlights */
  --color-bg: #fefaf9;          /* warm white — page background */
  --color-white: #ffffff;
  --color-gradient-start: #5B50FF;
  --color-gradient-end: #F4604A;

  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-display: 'EB Garamond', 'Inter Tight', serif;

  /* Spacing (from Webflow) */
  --section-gap: 8.125rem;
  --section-gap-small: 7.5rem;
  --gutter: 1.5rem;
}
```

## Webflow Animation Inventory

Specific animations found in the Webflow export that need recreation:

| Animation | Webflow Method | Replacement Method | Complexity |
|-----------|---------------|-------------------|------------|
| Fade-in on scroll (headings, paragraphs, cards) | IX2 + `data-w-id`, inline `opacity:0` | IntersectionObserver + `animate__fadeInUp` | Low |
| Slide-up on scroll (form section, contact cards) | IX2 + `translateY(50px)` + `blur(5px)` | IntersectionObserver + custom CSS keyframe (fadeInUp + blur) | Low |
| Button text swap on hover | CSS transition `translateY` | CSS transition (direct port) | Low |
| Image zoom on hover | `scale3d(1.2, 1.2, 1)` on `.rt-image-effect` | CSS `transform: scale(1.2)` on hover | Low |
| Image reveal (overlay slide) | IX2 two-layer overlay | CSS `@keyframes` + IntersectionObserver trigger | Medium |
| Counter number animation | "Counter train" — stacked digits with translateY | jQuery `.animate()` with step callback | Medium |
| Hero slide crossfade | Webflow w-slider with `data-animation="over"` | Custom jQuery: toggle `.active` class, CSS opacity transition | Medium |
| Popup container show/hide on scroll | CSS class toggle `.show` with transition | jQuery scroll handler + `.show` class toggle | Low |
| Popup staggered entrance | `transition-delay: .12s, .24s` on children | CSS transition-delay (direct port) | Low |
| Circle loader (Lottie) | Webflow IX2 Lottie integration | `<lottie-player>` web component | Low |
| Confetti on hover (Lottie) | Webflow IX2 Lottie integration | `<lottie-player>` triggered by jQuery hover | Medium |
| "Measured in minutes" text rotation | IX2 sequential text swap animation | jQuery `setInterval` + CSS transition | Medium |
| Sticky navbar with logo swap | Webflow scroll trigger | jQuery scroll handler + class toggle | Low |
| Navbar texture background | CSS class `texture-purple absolute` | CSS (direct port of gradient/pattern) | Low |

**Total: 14 distinct animations.** 10 are Low complexity (CSS-only or trivial jQuery), 4 are Medium (require ~20-40 lines of jQuery + CSS each).

## Sources

- [Animate.css official site](https://animate.style/) — Version 4.1.1 confirmed
- [Animate.css on cdnjs](https://cdnjs.com/libraries/animate.css/) — CDN URL verified
- [Bootstrap versions](https://getbootstrap.com/docs/versions/) — 5.3.8 is latest, 5.3.3 per project spec
- [GSAP licensing — now free via Webflow](https://webflow.com/blog/gsap-becomes-free) — Free but not recommended for this project
- [GSAP standard license restrictions](https://gsap.com/community/standard-license/) — Cannot build visual animation tools competing with Webflow
- [lottie-player on npm](https://www.npmjs.com/package/@lottiefiles/lottie-player) — Version 2.0.12 confirmed
- [jLottie on GitHub](https://github.com/LottieFiles/jlottie) — 15KB alternative, subset features
- [HTML5 video autoplay best practices](https://cloudinary.com/guides/video-effects/video-autoplay-in-html) — muted + playsinline required
- [Video background optimization](https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/) — 720p-1080p, MP4+WebM
- [IntersectionObserver scroll animations](https://dev.to/ljcdev/introduction-to-scroll-animations-with-intersection-observer-d05) — Pattern reference
- [Inter Tight vs Inter on Google Fonts](https://github.com/googlefonts/inter-gf-tight) — Inter Tight is a frozen fork of Inter with tighter spacing
- [EB Garamond on Google Fonts](https://fonts.google.com/specimen/EB+Garamond) — Serif display font for h1-h4 headings

---

*Stack analysis: 2026-03-13*
