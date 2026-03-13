# Phase 2: Content Sections - Research

**Researched:** 2026-03-13
**Domain:** Bootstrap 5 grid layout for 6 content sections (About, Discover, Location, Timeline, Contact, Footer) with digit-train counter animation, Lottie integration, and multi-layer hover effects
**Confidence:** HIGH

## Summary

This phase builds all homepage content below the hero: six distinct sections each with unique interactive/visual features. The Webflow export (`index.html` lines 332-874) provides exact HTML structure, CSS values, and animation patterns that must be faithfully adapted to Bootstrap 5 + jQuery. The existing `override.css` already has all design tokens (colors, typography, spacing) and the `script.js` has the jQuery document.ready pattern ready for new section code.

The primary technical challenges are: (1) the digit-train counter animation in the About section, which uses a "slot machine" pattern of vertically stacked digits animated via CSS `transform: translate3d(0, -N%, 0)` triggered by IntersectionObserver; (2) the Location "Measured in minutes" section requiring lottie-web for the circular progress ring plus coordinated text rotation; and (3) the Discover card 2-layer hover reveal effect using absolute-positioned overlay layers with staggered transitions.

All content text in the Webflow is English and must be translated to Lithuanian. Purple texture (`texture-purple.jpg`, 22KB) is used across four sections (About heading area, Discover card overlays, Timeline, Footer) as a repeating `background-image` at 200px tile size. Multiple images from `webflow-export/images/` need conversion (AVIF to JPG) and copying to `static/img/` and `uploads/images/`.

**Primary recommendation:** Build sections top-to-bottom in order (About, Discover, Location, Timeline, Contact, Footer), adding HTML to `index.html` and CSS to `override.css` and JS to `script.js`. Use lottie-web 5.13.0 from cdnjs CDN. Implement digit-train counters with pure CSS transforms + jQuery/IntersectionObserver trigger. Copy `texture-purple.jpg` and all section images into `static/img/`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Location section animation uses **Lottie library** (lottie-web) for the circular progress ring -- `cirlce_loader.json` exists in `webflow-export/documents/`
- Text labels **rotate in sequence** timed with Lottie progress: "TO THE PARK / BY THE RIVER", "CITY CENTER / ON FOOT", "NEAREST SHOPPING MALL", "HIGHSCHOOL CAMPUS", "AIRPORT WITH CAR"
- Walking/driving times (5, 8, 10, 15, 20 minutes) -- use Webflow values + add **PHP markers** for backend to verify/update
- Location animation **triggers on scroll** into viewport via IntersectionObserver
- Stat counters: **60+** (residences), **1205** (m2 area), **2025** (year) -- confirmed real data
- Sales agents: 5 agents (Valius, Elona, Vladimir, Ovidijus, Konstantinas) with real phone numbers and @ntligence.lt emails
- Construction timeline: Q4 2024 - Q4 2026 with Lithuanian milestone descriptions
- Footer "Other projects": Riverland and Porto Franko logos
- All English Webflow text **translated to Lithuanian**
- Use actual **`texture-purple.jpg`** image file (22KB) -- NOT a CSS gradient
- Applied as **repeating background-image** at 200px tile size: `background-size: 200px`
- Applied uniformly across: About heading area, Discover card overlays, Timeline/Construction progress section, Footer
- Copy `texture-purple.jpg` to `static/img/`
- Discover card hover: **Full 2-layer reveal animation** (layer-one slides in with purple overlay, then layer-two slides in, image has subtle scale)
- Discover card images are **visible by default** -- differs from Webflow which hides them
- "View more" links use `href="#"` with `<!-- PHP: link to Apie projekta page -->` markers
- Three cards: 01 "Mathematical Spatial Comfort", 02 "Engineering as a Constant", 03 "The Axiom of Location" -- translated to Lithuanian

### Claude's Discretion
- Digit-train counter animation implementation details (CSS transform approach, timing)
- Contact form layout (image left + form right matching Webflow)
- Footer layout structure (logo, quick links, social icons, other projects, copyright)
- Section spacing and visual hierarchy
- Timeline progress line indicator implementation
- Lottie library CDN choice (unpkg, cdnjs, etc.)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOU-01 | About section with project philosophy heading and descriptive text | Webflow lines 332-357: h3 heading in texture-purple area + two paragraphs. Bootstrap row/col layout replaces Webflow flex |
| ABOU-02 | Animated stat counters that count up on scroll into viewport (units, area, year) | Webflow lines 359-526: three counter cards with digit-train pattern. IntersectionObserver triggers CSS transform animation |
| ABOU-03 | Counter uses digit-train animation style matching Webflow design | Webflow uses `rt-counter-train-wrap` > `rt-counter-train` > digit divs with `transform: translate3d(0, -N%, 0)`. Replicate with CSS transitions |
| ABOU-04 | "About project" link/CTA for future about page | Webflow lines 341-350: btn-cta with text-swap pattern (already built in Phase 1). Add PHP marker for link |
| DISC-01 | Three numbered content cards (01, 02, 03) presenting project pillars | Webflow lines 531-610: cards with number, h3 title, image, paragraph, "View more" link. Use Bootstrap container |
| DISC-02 | Hover effect with image reveal/overlay animation on each card | Webflow `rt-image-overlay` with two layers (orange layer-one z:2, purple layer-two z:1). CSS transitions on hover |
| DISC-03 | Cards use Bootstrap grid for responsive layout | Replace Webflow `w-layout-hflex` with Bootstrap `row`/`col` grid. Cards stack full-width with borders |
| LOCN-01 | "Measured in minutes" section showing walking/driving times | Webflow lines 614-663: circle wrapper with 5 number circles and rotating text labels |
| LOCN-02 | Animated circular progress indicators (Lottie) | lottie-web 5.13.0 via cdnjs CDN. Load `cirlce_loader.json` (4KB, 30 frames). Control playback frame-by-frame synced to text rotation |
| LOCN-03 | Rotating text labels for amenity names | Webflow heading-mask pattern with absolute-positioned text that swaps. jQuery timed rotation synced with Lottie progress |
| LOCN-04 | Expanding number circles for time values | 5 circles (5, 8, 10, 15, 20 min) in `circle-numbers-wrapper`. Scale/opacity animation synced with text rotation step |
| TIME-01 | Construction progress timeline (Q4 2024 - Q4 2026) | Webflow lines 664-722: 6-column CSS grid of milestone cards over construction photo background |
| TIME-02 | Visual progress line indicator showing current position | Webflow `progress-line` element (white 1.5px line). Animate width based on current date relative to timeline span |
| TIME-03 | Construction photo background | `construction-update.jpeg` from Webflow images. Full-width background behind timeline overlay |
| TIME-04 | PHP marker for backend to update progress dynamically | Add `<!-- PHP: construction progress percentage -->` and `<!-- PHP: milestone status -->` markers |
| CONT-01 | Contact form with fields: name, email, phone, message, terms checkbox | Webflow lines 723-761: form with input fields, 2-col email/phone grid, textarea, checkbox, submit button |
| CONT-02 | Form uses `<form method="post" action="URL">` -- no AJAX | Replace Webflow `method="get"` with `method="post"`. Add PHP marker for action URL |
| CONT-03 | Five sales agent cards with photo, name, phone, email | Webflow lines 763-802: 5 agent cards in flex row with team photo, name, tel: link, mailto: link |
| CONT-04 | PHP markers on form action URL and agent data areas | Mark form action, agent photos, agent contact details as PHP-replaceable |
| FOOT-01 | Footer with logo, quick navigation links, social media icons | Webflow lines 808-851: purple background footer with axioma-logo-full.svg, 5 quick links, Facebook + Instagram icons |
| FOOT-02 | Copyright, developer credit, privacy policy link | Webflow lines 865-869: copyright + UAB NTligence credit + privacy policy link |
| FOOT-03 | Links to other project logos/sites | Webflow lines 857-861: Riverland and Porto Franko SVG logos |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Bootstrap 5.3.3 | CDN | Grid layout for all sections | Already linked |
| jQuery 3.7.1 | CDN | DOM manipulation, event handling, animation triggers | Already linked |
| Lucide Icons | latest | Icon rendering (already used in hero nav) | Already linked |
| Font Awesome 6.5.1 | CDN | Social icons in footer | Already linked |

### New Addition
| Library | Version | Purpose | CDN URL |
|---------|---------|---------|---------|
| lottie-web | 5.13.0 | Location section circular progress animation | `https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.13.0/lottie.min.js` |

**Why cdnjs for lottie-web:** cdnjs pins exact versions (unlike unpkg `@latest`), is backed by Cloudflare infrastructure, and follows the same CDN provider pattern as Font Awesome already in the project. The `lottie.min.js` file (~250KB) includes the SVG renderer needed for the circle loader.

**Installation:** Add to `index.html` before `script.js`:
```html
<!-- Lottie (for location section animation) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.13.0/lottie.min.js"></script>
```

### No New Libraries Needed
The digit-train counter, hover effects, timeline progress, and all other animations use pure CSS transitions + jQuery + IntersectionObserver (native browser API). No additional libraries required.

## Architecture Patterns

### File Modification Map

All Phase 2 work modifies exactly 3 existing files + copies assets:

```
index.html              -- Replace placeholder #about section + add all new sections + add lottie CDN script tag
static/css/override.css -- Add CSS for all 6 sections (after existing hero styles)
static/js/script.js     -- Add jQuery code for counters, Lottie, discover hover, timeline progress

Assets to copy:
  webflow-export/images/texture-purple.jpg     -> static/img/texture-purple.jpg
  webflow-export/images/01.jpg                 -> static/img/discover-01.jpg
  webflow-export/images/05.jpg                 -> static/img/discover-02.jpg
  webflow-export/images/06.jpg                 -> static/img/discover-03.jpg
  webflow-export/images/construction-update.jpeg -> static/img/construction-update.jpg
  webflow-export/images/photo-valius.jpg       -> uploads/images/photo-valius.jpg
  webflow-export/images/photo-elona.jpg        -> uploads/images/photo-elona.jpg
  webflow-export/images/photo-vladimir.jpg     -> uploads/images/photo-vladimir.jpg
  webflow-export/images/photo-ovidijus.jpg     -> uploads/images/photo-ovidijus.jpg
  webflow-export/images/photo-konstantinas.jpg -> uploads/images/photo-konstantinas.jpg
  webflow-export/images/230401_crownd_...avif  -> uploads/images/contact-form-image.jpg (convert AVIF->JPG)
  webflow-export/images/arnexo-home-one-footer-facebook-icon.webp -> static/img/icon-facebook.webp
  webflow-export/images/arnexo-home-one-footer-instagram-icon.webp -> static/img/icon-instagram.webp
  webflow-export/images/riverland.svg          -> static/img/logo-riverland.svg
  webflow-export/images/porto-franko.svg       -> static/img/logo-porto-franko.svg
  webflow-export/documents/cirlce_loader.json  -> static/img/circle-loader.json
```

Note: Agent photos go to `uploads/images/` (CMS-managed content convention per CLAUDE.md). Static design assets go to `static/img/`.

### CSS Organization in override.css

Append section styles after the existing hero section styles:

```css
/* ----------------------------------------------- */
/* About section                                    */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Discover section                                 */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Location / Measured in minutes                   */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Timeline / Construction progress                 */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Contact section                                  */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Footer                                           */
/* ----------------------------------------------- */
```

### Pattern 1: Texture Purple Reusable Class

**What:** A utility class applied to multiple elements across sections for the purple textured background.
**When to use:** About heading area, Discover card overlays, Timeline content overlay, Footer wrapper.

```css
/* Source: webflow-export/css/axioma...webflow.css line 9284 */
.texture-purple {
  background-image: url('../img/texture-purple.jpg');
  background-position: 0 0;
  background-size: 200px;
}
```

### Pattern 2: Digit-Train Counter Animation

**What:** "Slot machine" style number counter where each digit position has a vertical column of numbers that slides into position via CSS transform.
**When to use:** About section stat counters (60+, 1205, 2025).

The Webflow implementation uses:
- `rt-counter-train-wrap`: outer container with `overflow: hidden`, fixed height = one digit height
- `rt-counter-train`: inner column containing stacked digit divs, initially positioned at `transform: translate3d(0, 0%, 0)` (showing first digit)
- Animation: `transform: translate3d(0, -N%, 0)` where N depends on which digit to show (e.g., -100% = second digit, -500% for showing digit at index 5 in a 0-9 train)
- Class `.two` on `rt-counter-train` indicates a shorter train (not 0-9) -- used when the digit range is known (e.g., for the "6" in "60+", only digits 1-6 needed)

**Implementation approach for Bootstrap/jQuery:**

```html
<!-- Counter card: "60+" residences -->
<div class="counter-card">
  <div class="counter-box">
    <!-- Tens digit: needs to show "6" -->
    <div class="counter-train-wrap">
      <div class="counter-train" data-target="5">
        <!-- Index 0-5: need to land on index 5 = "6" -->
        <div class="counter-digit">1</div>
        <div class="counter-digit">2</div>
        <div class="counter-digit">3</div>
        <div class="counter-digit">4</div>
        <div class="counter-digit">5</div>
        <div class="counter-digit">6</div>
      </div>
    </div>
    <!-- Ones digit: needs to show "0" -->
    <div class="counter-train-wrap">
      <div class="counter-train" data-target="9">
        <div class="counter-digit">0</div>
        <div class="counter-digit">1</div>
        <!-- ... 2-8 ... -->
        <div class="counter-digit">9</div>
        <div class="counter-digit">0</div>
      </div>
    </div>
    <div class="counter-suffix">+</div>
  </div>
  <div class="counter-label">Apgalvoto dizaino rezidencijos</div>
</div>
```

```css
.counter-train-wrap {
  overflow: hidden;
  height: 3.4375rem; /* matches one digit line-height */
}

.counter-train {
  display: flex;
  flex-direction: column;
  transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.counter-digit {
  font-size: 3.4375rem;
  line-height: 1;
  font-weight: 500;
  height: 3.4375rem;
}
```

```javascript
// Trigger via IntersectionObserver
var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      $(entry.target).find('.counter-train').each(function() {
        var target = parseInt($(this).data('target'), 10);
        var percentage = target * 100;
        $(this).css('transform', 'translate3d(0, -' + percentage + '%, 0)');
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
```

### Pattern 3: Discover Card 2-Layer Hover Effect

**What:** On card hover, a purple overlay slides in (layer-one = orange accent, layer-two = purple), while the card image does a subtle scale. Images visible by default (user decision).
**When to use:** Three Discover cards.

```css
/* Source: webflow-export/css lines 7309-7337 */
.discover-card-image-wrap {
  position: relative;
  overflow: hidden;
  flex: 1;
}

.discover-card-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.rt-image-overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.rt-imagr-appearance-layer-one {
  z-index: 2;
  background-color: var(--color-accent); /* orange #e07f60 */
  position: absolute;
  inset: 0;
  transform: translateX(-101%);
  transition: transform 0.4s ease;
}

.rt-imagr-appearance-layer-two {
  z-index: 1;
  background-color: var(--color-purple); /* #5e186e */
  position: absolute;
  inset: 0;
  transform: translateX(-101%);
  transition: transform 0.4s ease 0.1s; /* slight delay */
}

/* Hover triggers */
.discover-card:hover .rt-imagr-appearance-layer-one {
  transform: translateX(0);
}

.discover-card:hover .rt-imagr-appearance-layer-two {
  transform: translateX(0);
}

.discover-card:hover .discover-card-image-wrap img {
  transform: scale(1.05);
}
```

The full-card overlay (`rt-discover-v2-card-overlay.texture-purple`) also needs attention -- in Webflow it sits behind the content at z-index:1 and is always visible as the card background with the purple texture.

### Pattern 4: Lottie Circle + Text Rotation

**What:** The Location section has a circular Lottie animation (progress ring) with text labels that rotate in sequence, timed to the Lottie frame progress.
**When to use:** Location "Measured in minutes" section.

The Lottie file (`cirlce_loader.json`) is 30 frames total (30fps, 1 second). The animation shows a circular loading ring. In Webflow, playback is controlled manually (autoplay=0) and tied to scroll/interaction.

**Implementation approach:**

```javascript
// Load Lottie animation
var circleAnim = lottie.loadAnimation({
  container: document.getElementById('circle-loading'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'static/img/circle-loader.json'
});

// 5 steps: frames 0-5, 6-11, 12-17, 18-23, 24-29
var locationSteps = [
  { frame: 6, label: ['IKI PARKO', 'PRIE UPES'] },
  { frame: 12, label: ['MIESTO CENTRAS', 'PESCIOMIS'] },
  { frame: 18, label: ['ARTIMIAUSIA', 'PREKYBOS CENTRAS'] },
  { frame: 24, label: ['GIMNAZIJOS', 'KAMPUSAS'] },
  { frame: 30, label: ['ORO UOSTAS', 'AUTOMOBILIU'] }
];

// Cycle through steps on interval (triggered by IntersectionObserver)
var currentStep = 0;
function advanceLocationStep() {
  var step = locationSteps[currentStep];
  circleAnim.goToAndPlay(step.frame - 6, true); // play 6 frames
  // Swap text labels and number circles
  // ... jQuery show/hide with transitions
  currentStep = (currentStep + 1) % locationSteps.length;
}
```

### Pattern 5: Timeline Progress Line

**What:** A horizontal progress line above the 6-column milestone grid that visually indicates current construction position.
**When to use:** Timeline section.

The Webflow CSS shows a 6-column CSS grid (`grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr`) for the milestones. The progress line sits above them. The current progress percentage can be calculated from the date:

```javascript
// Q4 2024 start = Oct 2024, Q4 2026 end = Dec 2026
// Total: ~26 months. Current position based on today's date.
var startDate = new Date(2024, 9, 1); // Oct 2024
var endDate = new Date(2026, 11, 31); // Dec 2026
var now = new Date();
var progress = Math.min(100, Math.max(0,
  ((now - startDate) / (endDate - startDate)) * 100
));
$('.progress-line-fill').css('width', progress + '%');
```

Add `<!-- PHP: construction progress percentage -->` marker for backend to compute server-side.

### Anti-Patterns to Avoid
- **Using Webflow class names verbatim:** Clean up `w-layout-vflex`, `w-layout-hflex`, `rt-` prefixes. Use descriptive Bootstrap-compatible names (`about-section`, `counter-card`, `discover-card`, etc.)
- **Inline styles from Webflow:** The export has `style="opacity:0"` and `transform: translate3d(...)` inline on many elements. These are Webflow Interactions (animation initial states). Remove them -- Phase 3 handles scroll-triggered entrance animations.
- **GSAP dependency:** The Webflow export loads GSAP + ScrollTrigger (lines 878-879). Do NOT include these. Use IntersectionObserver + CSS transitions instead.
- **Using `data-w-id` or `data-wf-*` attributes:** These are Webflow-specific and serve no purpose in the production site.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Circular progress animation | Custom SVG stroke-dashoffset animation | lottie-web with existing JSON | The Lottie file already has the exact visual. Recreating it manually would be pixel-imperfect and waste time |
| Icon rendering | Custom SVG icon sprites | Font Awesome 6 (social icons) + Lucide (UI icons) | Both already loaded in project CDN links |
| Grid layout | Custom CSS flexbox grid system | Bootstrap 5 `row`/`col-*` classes | Bootstrap is the mandated framework. Use its grid for all section layouts |
| Form validation styling | Custom validation JavaScript | Browser native validation + CSS `:invalid` | Form submits via POST. Backend handles real validation. Frontend just needs `required` attributes |

## Common Pitfalls

### Pitfall 1: Digit-Train Height Mismatch
**What goes wrong:** Counter digits don't align or clip incorrectly because the container height doesn't match the digit line-height exactly.
**Why it happens:** The Webflow counter uses `font-size: 3.4375rem` with `line-height` from a CSS variable. If the wrapper height doesn't match exactly one digit's rendered height, digits will be partially visible or cut off.
**How to avoid:** Set `counter-train-wrap` height to exactly the `line-height` value used for `counter-digit`. Both must use the same unit and value. Use the Webflow-extracted value of `3.4375rem` (55px) for font-size, and set `line-height: 1` so height = font-size.
**Warning signs:** Digits appear cropped at top/bottom, or a sliver of the next digit is visible.

### Pitfall 2: Lottie Container Sizing
**What goes wrong:** The Lottie SVG renders at its native 698x698 dimensions and breaks the circle layout.
**Why it happens:** lottie-web's SVG renderer creates an SVG element that takes the container's size. If the container doesn't have explicit dimensions, it may overflow or collapse.
**How to avoid:** Set the Lottie container (`#circle-loading`) to `position: absolute; inset: 0; width: 101%; height: 101%;` matching the Webflow pattern. The parent circle wrapper needs `position: relative` and explicit aspect-ratio sizing.
**Warning signs:** Circle animation is too large, overlaps text, or doesn't appear at all.

### Pitfall 3: Texture-Purple on Dark Backgrounds
**What goes wrong:** The texture-purple image is designed to work on the purple (#5e186e) background color. If applied without a background-color, it looks wrong because the texture has transparency/alpha.
**Why it happens:** The texture image is a subtle pattern overlay that relies on the underlying purple color.
**How to avoid:** Always pair `.texture-purple` with `background-color: var(--color-purple)` on the same element or a parent.
**Warning signs:** Texture appears washed out or the wrong color tone.

### Pitfall 4: Contact Form Image AVIF Format
**What goes wrong:** The contact form side image is `230401_crownd_glanzingasse_0009_Bearb_1230401_crownd_glanzingasse_0009_Bearb.avif` which has limited browser support.
**Why it happens:** Webflow exported in AVIF format. Not all browsers support AVIF natively.
**How to avoid:** Convert AVIF to JPG using macOS `sips` (proven in Phase 1): `sips -s format jpeg input.avif --out output.jpg`. This ensures universal browser compatibility.
**Warning signs:** Image shows as broken in Safari or older browsers.

### Pitfall 5: Location Section Scroll Height
**What goes wrong:** The Webflow location section uses `height: 300vh` on the container and `position: sticky` on the inner wrapper to create a scroll-pinned effect.
**Why it happens:** This is a GSAP ScrollTrigger pattern that pins the section while the user scrolls through 300vh of content.
**How to avoid:** Since we're NOT using GSAP, simplify the layout. Don't replicate the 300vh scroll-pin. Instead, use a standard section height with the Lottie animation triggered by IntersectionObserver and auto-cycling through steps on a timer.
**Warning signs:** Empty whitespace above/below the section, or the section takes up 3x viewport height with no content.

### Pitfall 6: Agent Phone Links Use Placeholder Numbers
**What goes wrong:** The Webflow export has `href="tel:8881234567"` on all agent phone links (placeholder), even though the displayed phone numbers are real.
**Why it happens:** Webflow developer used placeholder `tel:` hrefs.
**How to avoid:** Use the real phone numbers in the `tel:` links: match the displayed number (e.g., `href="tel:+37069198352"` for Valius). Similarly, update `mailto:` links to match actual emails.
**Warning signs:** Clicking phone links calls a wrong number.

## Code Examples

### About Section HTML Structure (Bootstrap adaptation)
```html
<!-- Source: Webflow index.html lines 332-530, adapted to Bootstrap -->
<section id="about" class="about-section">
  <div class="container">
    <div class="divider-horizontal"></div>
    <div class="row about-text-wrap">
      <!-- Left: heading + CTA with purple texture -->
      <div class="col-lg-5 about-heading-wrap texture-purple">
        <h3>Pagrindine gyvenimo tiesa nereikalauja pagrindimo</h3>
        <div class="about-cta-wrap">
          <a href="#" class="btn-cta"><!-- PHP: link to Apie projekta page -->
            <span class="btn-text-wrap">
              <span class="btn-text btn-text-in">Apie projekta</span>
              <span class="btn-text btn-text-out">Apie projekta</span>
            </span>
          </a>
        </div>
      </div>
      <!-- Right: description paragraphs -->
      <div class="col-lg-6 offset-lg-1 about-paragraph-wrap">
        <p>AXIOMA pastatyta ant principo, kad tobulumo negalima vertinti subjektyviai...</p>
        <p>Mes suteikiame pagrinda gyvenimui, gyvenamam tikslingai...</p>
      </div>
    </div>
    <div class="divider-horizontal"></div>
    <!-- Counter cards row -->
    <div class="row counter-cards-wrap">
      <!-- 3 counter cards -->
    </div>
    <div class="divider-horizontal"></div>
  </div>
</section>
```

### Discover Card HTML Structure
```html
<!-- Source: Webflow index.html lines 531-610, adapted -->
<section class="discover-section">
  <div class="container-wide">
    <div class="discover-main">
      <div class="discover-heading-wrap">
        <h2 class="text-center">Galutinis pozuris</h2>
      </div>
      <div class="discover-card-wrap">
        <!-- Card 1 -->
        <div class="discover-card border-top border-bottom">
          <div class="container">
            <div class="row align-items-center discover-card-content">
              <div class="col-lg-3 discover-card-heading-wrap">
                <div class="sub-text">01</div>
                <h4>Matematinis erdves komfortas</h4>
              </div>
              <div class="col-lg-5 discover-card-image-wrap">
                <img src="static/img/discover-01.jpg" alt="" class="discover-card-image">
                <div class="rt-image-overlay">
                  <div class="rt-imagr-appearance-layer-one"></div>
                  <div class="rt-imagr-appearance-layer-two"></div>
                </div>
              </div>
              <div class="col-lg-4 discover-card-paragraph-wrap">
                <p>Planuotes skaiciavimai maksimaliai isnaudoja...</p>
                <a href="#" class="discover-card-link">
                  <!-- PHP: link to Apie projekta page -->
                  <span>Placiiau</span>
                  <img src="static/img/arrow-down.webp" alt="" class="discover-arrow">
                </a>
              </div>
            </div>
          </div>
          <div class="discover-card-overlay texture-purple"></div>
        </div>
        <!-- Cards 2, 3 follow same pattern -->
      </div>
    </div>
  </div>
</section>
```

### Location Section Lottie Integration
```javascript
// Source: Webflow data attributes + lottie-web API docs
$(document).ready(function() {
  var $locationSection = $('.location-section');
  if (!$locationSection.length) return;

  var circleAnim = lottie.loadAnimation({
    container: document.getElementById('circle-loading'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'static/img/circle-loader.json'
  });

  // Trigger animation cycle when section enters viewport
  var locationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        startLocationCycle();
        locationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  locationObserver.observe($locationSection[0]);
});
```

### Contact Form (method="post", no AJAX)
```html
<!-- Source: Webflow lines 738-752, adapted to project convention -->
<form method="post" action="#">
  <!-- PHP: form action URL -->
  <input type="text" name="name" placeholder="Jusu vardas*" required>
  <div class="row">
    <div class="col-md-6">
      <input type="email" name="email" placeholder="El. pastas*" required>
    </div>
    <div class="col-md-6">
      <input type="tel" name="phone" placeholder="Telefonas*" required>
    </div>
  </div>
  <textarea name="message" placeholder="Zinute"></textarea>
  <label class="checkbox-field">
    <input type="checkbox" name="terms" required>
    <span>Sutinku su <a href="#">salygomis ir taisyklemis</a></span>
  </label>
  <button type="submit" class="btn-cta">
    <span class="btn-text-wrap">
      <span class="btn-text btn-text-in">Siusti</span>
      <span class="btn-text btn-text-out">Siusti</span>
    </span>
  </button>
</form>
```

### Footer Structure
```html
<!-- Source: Webflow lines 808-874, adapted -->
<footer class="site-footer">
  <div class="container-wide">
    <div class="footer-wrap texture-purple">
      <div class="footer-block">
        <!-- Logo -->
        <div class="footer-top">
          <img src="static/img/axioma-logo-full.svg" alt="Axioma" class="footer-logo">
        </div>
        <!-- Links + Social -->
        <div class="footer-links-container">
          <div class="footer-links-block">
            <div class="sub-text">Greitos nuorodos</div>
            <div class="footer-links-wrap">
              <a href="#">Apie</a>
              <a href="#">Butai</a>
              <a href="#">Vieta</a>
              <a href="#">Galerija</a>
              <a href="#">Kontaktai</a>
            </div>
          </div>
          <div class="footer-links-block">
            <div class="sub-text">Sekite mus</div>
            <div class="footer-social-wrap">
              <a href="https://www.facebook.com" class="social-icon">
                <img src="static/img/icon-facebook.webp" alt="Facebook">
              </a>
              <a href="https://www.instagram.com" class="social-icon">
                <img src="static/img/icon-instagram.webp" alt="Instagram">
              </a>
            </div>
          </div>
        </div>
        <!-- Other projects -->
        <div class="footer-main">
          <div class="sub-text">Kiti musu projektai:</div>
          <div class="footer-projects-wrap">
            <a href="#"><img src="static/img/logo-riverland.svg" alt="Riverland"></a>
            <a href="#"><img src="static/img/logo-porto-franko.svg" alt="Porto Franko"></a>
          </div>
        </div>
        <!-- Copyright -->
        <div class="footer-bottom">
          <div>&copy; 2026 Axioma. Visos teises saugomos. <a href="#">Privatumo politika</a></div>
          <div>Projekta vysto: <a href="https://ntligence.lt/">UAB NTligence</a></div>
        </div>
      </div>
    </div>
  </div>
</footer>
```

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Webflow w-layout-vflex/hflex | Bootstrap row/col grid | Replaces proprietary Webflow layout with standard Bootstrap |
| GSAP ScrollTrigger (Webflow lines 878-879) | IntersectionObserver + CSS transitions | No dependency on GSAP. Native browser API. Per project requirements |
| Webflow Interactions (data-w-id animations) | jQuery-triggered CSS transitions | Webflow's proprietary animation system replaced with standard jQuery |
| Metal font (Webflow theme default) | EB Garamond italic (Phase 1 decision) | Lithuanian character support |

## Key Design Values Extracted from Webflow CSS

| Token | Value | Used In |
|-------|-------|---------|
| Section gap | `8.125rem` (130px) | Top/bottom padding on most sections |
| Section gap small | `7.5rem` (120px) | Contact section padding |
| Counter font size | `3.4375rem` (55px) | Digit-train numbers |
| Circle number font size | `140px` | Location section time numbers |
| Circle wrapper size | `36em` (576px) | Location circle diameter |
| Circle border | `1px solid #e07f604a` | Location circle outline (accent color at 29% opacity) |
| Discover card padding | `1.875rem` top/bottom | Card vertical spacing |
| Discover card gap | `5rem` between columns | Space between card content columns |
| Discover section max-width | uses `rt-container-xl` | Maps to `.container-wide` (1600px) |
| Contact form height | `740px` | Fixed height contact form area |
| Contact form gap | `50px` | Between image and form |
| Agent card padding | `35px` | Agent card internal padding |
| Footer background | `var(--purple)` (#5e186e) | Footer wrap background color |
| Footer block padding | `4rem` top, `0.9375rem` sides | Footer internal spacing |
| Progress line | `1.5px` white | Timeline progress indicator |
| Timeline grid | `1fr 1fr 1fr 1fr 1fr 1fr` | 6-column grid for milestones |
| Divider horizontal | accent color, `1px` height | Section internal dividers |
| Divider vertical | accent color, `1px` width | Between adjacent elements |

## Open Questions

1. **Location section scroll-pin behavior**
   - What we know: Webflow uses 300vh height + sticky positioning + GSAP ScrollTrigger to pin the circle while user scrolls through steps. We cannot use GSAP.
   - What's unclear: Should the location section auto-cycle through the 5 steps on a timer (simpler), or should each step trigger as the user scrolls (more complex, requires custom scroll logic)?
   - Recommendation: Use auto-cycling timer (3-4 seconds per step) triggered once when section enters viewport via IntersectionObserver. This is simpler, works without GSAP, and still looks premium. The scroll-pin approach adds complexity that belongs in Phase 3 (animations) if needed at all.

2. **Counter final values and digit layout**
   - What we know: Three counters: "60+" (residences), "1205" (area m2), "2025" (year). The Webflow HTML shows specific digit trains for each position.
   - What's unclear: The Webflow counter for "60+" shows trains for digits 7->6 (tens) and 0->0 (ones, with wrapping). For "1205", the trains are more complex with 4 digit positions. The exact train composition (which digits are in each column) needs careful mapping.
   - Recommendation: Analyze the Webflow HTML digit-by-digit for each counter and replicate the exact train sequences. The "two" class indicates a shorter train (fewer digits to cycle through). Map each `data-target` value to the correct final digit position.

3. **Footer quick link URLs**
   - What we know: Five quick links (About, Apartments, Location, Gallery, Contacts) all use `href="#"` in Webflow.
   - What's unclear: Should these point to section anchors on the current page, or use PHP markers for future pages?
   - Recommendation: Use section anchors where sections exist on the homepage (`#about`, `#contact`), and add `<!-- PHP: link to page -->` markers for pages that don't exist yet (Apartments, Location, Gallery).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework -- static HTML project) |
| Config file | none |
| Quick run command | Open `index.html` in browser, scroll through all sections |
| Full suite command | Check all sections visually + test form submit + test hover effects + test counter animation |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOU-01 | About heading + text renders | manual-only | Open `index.html`, scroll to #about | N/A |
| ABOU-02 | Counters animate on scroll | manual-only | Scroll to counter section, verify animation triggers | N/A |
| ABOU-03 | Digit-train style animation | manual-only | Visual comparison with Webflow design | N/A |
| ABOU-04 | "About project" CTA present | manual-only | Verify button exists with PHP marker | N/A |
| DISC-01 | Three numbered cards render | manual-only | Scroll to Discover, verify 3 cards with 01/02/03 | N/A |
| DISC-02 | Hover reveals overlay layers | manual-only | Hover each card, verify 2-layer animation | N/A |
| DISC-03 | Bootstrap grid layout | manual-only | Resize browser, check grid behavior | N/A |
| LOCN-01 | Location section with times | manual-only | Scroll to section, verify 5/8/10/15/20 min values | N/A |
| LOCN-02 | Lottie circle animates | manual-only | Verify circle animation plays when section enters viewport | N/A |
| LOCN-03 | Text labels rotate | manual-only | Watch text cycle through 5 locations | N/A |
| LOCN-04 | Number circles animate | manual-only | Verify numbers appear/change with each step | N/A |
| TIME-01 | Timeline milestones render | manual-only | Verify 6 milestones Q4 2024 - Q4 2026 | N/A |
| TIME-02 | Progress line shows position | manual-only | Verify progress line width reflects current date | N/A |
| TIME-03 | Construction photo background | manual-only | Verify background image visible | N/A |
| TIME-04 | PHP markers present | manual-only | Inspect HTML source for PHP markers | N/A |
| CONT-01 | Form fields all present | manual-only | Count: name, email, phone, message, checkbox | N/A |
| CONT-02 | Form uses POST method | manual-only | Inspect HTML: `method="post"` | N/A |
| CONT-03 | 5 agent cards render | manual-only | Count agents, verify phone/email links work | N/A |
| CONT-04 | PHP markers on form + agents | manual-only | Inspect HTML source | N/A |
| FOOT-01 | Footer with logo, links, social | manual-only | Scroll to bottom, verify all elements | N/A |
| FOOT-02 | Copyright + privacy link | manual-only | Verify copyright text and privacy link | N/A |
| FOOT-03 | Other project logos | manual-only | Verify Riverland + Porto Franko logos visible | N/A |

### Sampling Rate
- **Per task commit:** Open `index.html` in browser, scroll through all sections
- **Per wave merge:** Full visual comparison with Webflow design
- **Phase gate:** All 22 requirements visually verified before `/gsd:verify-work`

### Wave 0 Gaps
None -- this is a static HTML project with no automated test infrastructure. Validation is visual browser testing. The only prerequisite is having all asset files copied to their correct locations before testing.

## Sources

### Primary (HIGH confidence)
- Webflow export `index.html` lines 332-874 -- exact HTML structure for all sections
- Webflow export CSS `axioma-v-2-...webflow.css` -- exact CSS values (spacing, colors, dimensions, grid)
- `webflow-export/documents/cirlce_loader.json` -- Lottie animation file (30 frames, 698x698, 4KB)
- `webflow-export/images/` -- all required image assets with original filenames
- Project `CLAUDE.md` -- mandatory tech stack constraints
- Project `docs/PROJECT-CONTEXT.md` -- backend developer patterns

### Secondary (MEDIUM confidence)
- [cdnjs lottie-web 5.13.0](https://cdnjs.com/libraries/lottie-web) -- latest version and CDN URL
- [jsDelivr lottie-web](https://www.jsdelivr.com/package/npm/lottie-web) -- version verification

### Tertiary (LOW confidence)
- CSS digit-train counter patterns from community examples -- implementation approach verified against Webflow's actual HTML structure

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already loaded in project, only adding lottie-web CDN
- Architecture: HIGH -- Webflow export provides exact structure, CSS values, and content for all sections
- Pitfalls: HIGH -- identified through direct analysis of Webflow code patterns and asset formats
- Animation patterns: MEDIUM -- digit-train and Lottie integration based on Webflow HTML analysis + library docs, but exact timing/easing may need tuning

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable -- Bootstrap 5.3, jQuery 3.x, lottie-web 5.x are all mature)
