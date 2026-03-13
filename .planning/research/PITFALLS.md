# Domain Pitfalls

**Domain:** Webflow-to-Bootstrap homepage refactor for Lithuanian residential complex
**Researched:** 2026-03-13

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Webflow Global Element Styles Override Bootstrap Reboot

**What goes wrong:** The Webflow export CSS (`axioma-v-2-*.webflow.css`) applies aggressive global styles to bare element selectors -- `body`, `h1`-`h6`, `p`, `a`, `img`, `li`, `blockquote`, `strong`, `em` (lines 145-323 of the Webflow CSS). These set font-family, color, font-size, line-height, letter-spacing, and font-weight on every element. Bootstrap 5 also applies global element styles through its Reboot layer. If any Webflow CSS is carried forward (even temporarily as reference), these two systems will fight. The Webflow CSS also includes `normalize.css` separately, which conflicts with Bootstrap's built-in Reboot (Bootstrap's Reboot is built on normalize.css but diverges in several areas).

Specifically dangerous: Webflow's `img { object-fit: cover; width: 100%; height: 100%; }` (line 295) will break any Bootstrap component that contains images -- cards, navbars, modals -- because Bootstrap expects `img { max-width: 100%; height: auto; }`.

**Why it happens:** Developers copy snippets from the Webflow CSS for reference and accidentally include element-level selectors. Or they load the Webflow CSS alongside Bootstrap "temporarily" during development and never fully remove it.

**Consequences:** Layout breaks everywhere. Images stretch or distort. Typography looks wrong. Debugging becomes a cascade-specificity hunt across two competing systems.

**Prevention:**
- Never load any Webflow CSS file alongside Bootstrap. Not even temporarily.
- Extract only the design token values (colors, font sizes, spacing) from Webflow's `:root` block and port them into `override.css` as new CSS custom properties that match the project's naming convention (`--color-*`, `--font-*`).
- Treat the Webflow export as a read-only visual reference and data source, never as code to include.

**Detection:** If you see double font declarations in DevTools for the same element, or images displaying with `object-fit: cover` when they should be `height: auto`, Webflow CSS contamination has leaked in.

**Phase relevance:** Must be addressed in the very first phase -- project scaffolding and CSS architecture setup.

---

### Pitfall 2: Webflow Interaction Animations Encoded in Inline Styles Are Not Portable

**What goes wrong:** The Webflow export has 59 instances of inline `style` attributes containing `transform: translate3d(...)`, `opacity: 0`, `filter: blur(5px)`, and `scale3d(...)` values. These are the initial states for Webflow Interactions (IX2/IX3). In the live Webflow site, the `webflow.js` runtime (937KB minified) reads `data-w-id` attributes, looks up animation definitions from an internal JSON manifest, and animates elements on scroll/hover/click. The exported HTML contains the initial animation states frozen as inline styles, but the animation logic is baked into webflow.js and is not extractable.

This means every element with `style="opacity:0"` or `style="transform:translate3d(0, 50px, 0)...;filter:blur(5px);opacity:0"` will be invisible or displaced if you copy the HTML structure without rebuilding the animation system.

**Why it happens:** Developers copy the Webflow HTML "as-is" expecting the inline styles to be decorative. They then wonder why half the page is invisible on load.

**Consequences:** Content invisible on page load. Elements stuck at their animation start positions (translated off-screen, opacity 0, blurred). The entire "premium feel" of scroll-triggered reveals is lost.

**Prevention:**
- Catalog every `data-w-id` element in the Webflow export and document its animation behavior (fade in, slide up, counter scroll, parallax zoom).
- Strip all Webflow inline `style` attributes and `data-w-id` / `data-wf-*` attributes from the new HTML.
- Rebuild animations from scratch using jQuery + CSS transitions for simple effects (fade-in on scroll) and GSAP + ScrollTrigger for complex effects (counter train animations, parallax image zoom, staggered reveals). GSAP is now fully free for commercial use since Webflow acquired GreenSock in 2024.
- Build animations incrementally: get static layout working first, then layer animations on top.

**Detection:** Open the page and look for large blank white areas where content should be. Inspect elements -- if they have `opacity: 0` or large `translateY` values in their computed styles, the animation initial states were copied without the animation engine.

**Phase relevance:** Must be planned during scaffolding (animation strategy decision) and executed section-by-section during each build phase.

---

### Pitfall 3: Webflow Breakpoints vs Bootstrap Breakpoints vs Backend Developer's Custom Breakpoints -- Three-Way Mismatch

**What goes wrong:** Three different breakpoint systems are in play:

| System | Breakpoints |
|--------|------------|
| **Webflow** (source design) | Desktop 992-1920px, Tablet 768-991px, Mobile Landscape 480-767px, Mobile Portrait 320-479px. Plus custom upscale: 1280px, 1440px, 1920px. Desktop-first cascade. |
| **Bootstrap 5** (target framework) | xs 0, sm 576px, md 768px, lg 992px, xl 1200px, xxl 1400px. Mobile-first (min-width) cascade. |
| **Backend developer's pattern** (handoff requirement) | `iphone.css` at <=900px, `ipad.css` at 768-1024px. Loaded via `<link media="">` attributes. No media queries inside main stylesheets. |

The backend developer's breakpoints do not align with either system. Bootstrap's `lg` starts at 992px; the backend's `iphone.css` triggers at 900px, leaving a 92px gap (900-991px) where neither mobile nor tablet styles may apply correctly. Webflow's responsive CSS has 6 breakpoint ranges (some using `min-width`, some `max-width`) while the target project uses only 2 external files plus a base stylesheet.

**Why it happens:** Developers convert Webflow layouts using Bootstrap responsive classes (`col-lg-6`, `col-md-12`), but the actual design breaks were tuned for Webflow's 991px tablet threshold. Meanwhile, the backend developer's iphone.css kicks in at 900px, creating a dead zone.

**Consequences:** Layout looks correct at extremes (full desktop, small mobile) but breaks in the 768-1024px "tablet" range. Elements stack too early or too late. The backend developer's existing sites look fine at these sizes, but the new homepage does not.

**Prevention:**
- Use the backend developer's breakpoint system as the authority, not Bootstrap's or Webflow's.
- Write all responsive overrides in `iphone.css` (<=900px) and `ipad.css` (768-1024px). Do not put media queries inside `override.css`.
- Use Bootstrap's grid classes for column layout (`col-lg-`, `col-md-`) but override specific spacing, typography, and visibility in the separate breakpoint files.
- Test explicitly at 900px, 768px, 991px, and 1024px -- these are the boundary zones where all three systems disagree.
- Study portofranko.lt's responsive behavior at these widths as the gold standard.

**Detection:** Resize browser slowly through 750px-1050px range. Watch for sudden jumps, overlapping elements, or elements that should have stacked but didn't.

**Phase relevance:** Must be established in the CSS architecture phase and validated after every section is built.

---

### Pitfall 4: Video Background Fails on Mobile iOS

**What goes wrong:** The hero section uses fullscreen background video (MP4 + WebM, autoplay, loop). iOS Safari has strict policies: videos must be `muted`, `playsinline`, and use H.264 MP4 (WebM is not supported in Safari). Even with correct attributes, iOS may pause background video when the page is not visible, and older/low-power iOS devices may refuse to autoplay entirely. The Webflow export uses `w-background-video` component which has its own autoplay handling baked into webflow.js -- this logic disappears in the refactor.

The export also includes poster images via CDN URLs (`cdn.prod.website-files.com/...`) which will be dead links in production.

**Why it happens:** Developers test video in Chrome desktop where everything works, then discover on iPhone launch day that the hero is a black rectangle. Or they include `autoplay` without `muted` and `playsinline`, which iOS blocks silently (no error, just no playback).

**Consequences:** Hero section shows blank/black on mobile. No fallback, so users see an empty banner. This is the first thing visitors see -- a broken hero destroys credibility for a premium residential complex.

**Prevention:**
- Always include all three attributes: `autoplay muted playsinline loop`.
- Download poster images locally to `static/img/` -- never reference Webflow CDN URLs.
- Implement a static poster image fallback that displays if video fails to load or autoplay is blocked.
- Use the locally available video files (MP4 at 1.9MB, WebM at 1.8MB -- reasonable sizes) but consider whether the 6.4MB higher-quality MP4 is needed.
- Test on a real iOS device, not just Chrome DevTools mobile emulation (emulation does not replicate autoplay restrictions).
- Consider hiding video on mobile entirely (<=900px) and showing a high-quality static image instead -- this is what many premium property sites do, and it avoids battery drain complaints.

**Detection:** Test on a physical iPhone in Safari. If the hero is black or shows a play button overlay, the video attributes are wrong or the format is unsupported.

**Phase relevance:** Hero section build phase. Must be tested on real devices before that phase is considered complete.

---

### Pitfall 5: Webflow Slider (w-slider) Cannot Be Ported -- Requires Full Rebuild

**What goes wrong:** The hero uses Webflow's native slider component (`w-slider`) which depends entirely on `webflow.js` for slide transitions, touch handling, autoplay, and arrow navigation. The exported HTML contains `w-slider-mask`, `w-slider-arrow-left`, `w-slider-arrow-right`, and `w-slider-nav` classes with `data-delay`, `data-animation`, `data-easing` attributes. None of this works without `webflow.js`. There is no partial extraction possible.

Each slide contains a different video background with its own overlay and content structure. This is not a simple image carousel -- it is three full-screen video slides with text overlays and CTA buttons.

**Why it happens:** Developers try to keep the Webflow slider markup and swap in a jQuery carousel plugin, but the DOM structure is incompatible. Or they include `webflow.js` alongside Bootstrap JS, causing jQuery version conflicts (Webflow bundles jQuery 3.5.1 while the project uses jQuery 3.x from CDN) and Bootstrap JavaScript conflicts.

**Consequences:** Slider does not transition between slides. Arrow buttons are non-functional. Autoplay does not work. If webflow.js is included as a shortcut, it conflicts with Bootstrap's own JavaScript components (collapse, dropdown, modal).

**Prevention:**
- Build the hero slider from scratch using Bootstrap 5 Carousel component (it supports video backgrounds, custom controls, and fade transitions natively).
- Bootstrap Carousel already handles touch swipe on mobile, autoplay with `data-bs-interval`, and fade transitions with `.carousel-fade`.
- Structure each slide with `<video>` background using the poster + fallback pattern from Pitfall 4.
- Do NOT include `webflow.js` for any reason. It is 937KB of Webflow runtime code that conflicts with the target stack.

**Detection:** If slider arrows do nothing and slides are all stacked vertically, the slider component was not rebuilt.

**Phase relevance:** Hero section build phase -- this should be tackled first as it is the highest-risk, highest-visibility section.

---

### Pitfall 6: Webflow Layout Classes Have No Bootstrap Equivalent -- Manual Mapping Required

**What goes wrong:** The Webflow export uses 164 instances of Webflow layout classes across the HTML: `w-layout-blockcontainer`, `w-layout-hflex`, `w-layout-vflex`, `w-layout-grid`, `w-container`, `w-inline-block`, `w-form`. Each has specific CSS in `webflow.css` with properties like `max-width: 940px` for containers, `flex-direction: row/column` for flex layouts, and custom grid templates. These do NOT map 1:1 to Bootstrap classes.

For example:
- `w-layout-blockcontainer` + `rt-container` = Webflow's 940px container. Bootstrap's `.container` at `lg` is 960px. Close but not identical.
- `w-layout-hflex` = `display: flex; flex-direction: row`. Bootstrap uses `d-flex` or the grid system, but with different default alignment.
- `w-layout-vflex` = `display: flex; flex-direction: column`. Bootstrap equivalent is `d-flex flex-column`.

**Why it happens:** Developers do a naive find-and-replace of `w-container` to `container` and `w-layout-hflex` to `d-flex`, but miss the nuanced differences in max-widths, padding, and alignment defaults. The layout looks "close but off" at every breakpoint.

**Consequences:** Sections are slightly wider or narrower than the design. Content does not center correctly. Flex items wrap at unexpected breakpoints. The page looks "almost right" which is worse than obviously broken because it is harder to diagnose.

**Prevention:**
- Create a mapping document before writing any HTML. For each Webflow layout class used in the export, document the exact CSS properties and identify the Bootstrap equivalent (or note where custom CSS is needed in `override.css`).
- Key mappings to establish upfront:
  - `w-layout-blockcontainer` + `rt-container` -> `container` (940px vs 960px -- decide whether to accept 960px or override `.container { max-width: 940px }` in `override.css`)
  - `w-layout-blockcontainer` + `rt-container-xl` -> `container-fluid` or `container-xxl`
  - `w-layout-hflex` -> `d-flex` (check align-items default: Webflow uses `flex-start`, Bootstrap flexbox has no default)
  - `w-layout-vflex` -> `d-flex flex-column`
  - `w-layout-grid` -> Bootstrap's `row`/`col` system (completely different approach)
- Accept that this is a "faithful adaptation, not pixel-match" (per PROJECT.md) and document the acceptable differences.

**Detection:** Overlay a screenshot of the Webflow page at 1440px wide against the Bootstrap version. Differences in section widths, content alignment, and spacing indicate unmapped layout classes.

**Phase relevance:** CSS architecture and scaffolding phase. The mapping must exist before any section HTML is written.

---

## Moderate Pitfalls

### Pitfall 7: Counter Train Scroll Animation Is the Hardest Element to Recreate

**What goes wrong:** The about section features "counter train" animations -- columns of stacked numbers (0-9) that scroll vertically via `translateY` to reveal specific digits, creating an animated counter effect (e.g., "60+", "105", "12,150"). The Webflow implementation uses deeply nested div structures (`rt-counter-train-wrap` > `rt-counter-train` > individual digit divs) with `transform: translate3d(0, -100%, 0)` initial states. The animation timing is tied to Webflow's scroll-based interaction system.

This is by far the most complex visual element in the export. It requires:
1. Intersection Observer or scroll position detection to trigger
2. Sequential `translateY` animations on multiple digit columns
3. Proper timing so digits "roll" in the correct order to display the target number
4. All orchestrated without the Webflow IX2 engine

**Prevention:**
- Use GSAP ScrollTrigger (free, already referenced in the Webflow export's script tags) to trigger counter animations on scroll-into-view.
- Build a reusable counter component function in `script.js` that takes a target number and animates digit columns.
- Alternative: use a simpler counter animation (numbers counting up from 0 to target) instead of the rolling digit train. This is visually effective and far simpler to implement. Confirm with stakeholders whether the exact rolling digit effect is required.

**Phase relevance:** About section build phase. Flag for deeper implementation research.

### Pitfall 8: Font Substitution -- "Inter Tight" and "Metal" Are Not "Inter"

**What goes wrong:** The Webflow design uses two fonts: "Inter Tight" (body text) and "Metal" (headings/display). The project spec says to use Google Fonts "Inter" family. While "Inter Tight" and "Inter" share the same glyph shapes, "Inter Tight" has tighter letter-spacing baked into the font metrics. "Metal" is a display font with no relationship to Inter at all.

Swapping "Inter Tight" for "Inter" means all body text will appear slightly wider/looser. Headings using "Metal" will look completely different with "Inter" -- the design's visual identity depends heavily on the display font for headings.

**Prevention:**
- Verify with stakeholders: is "Metal" the intended production font for headings, or was it a Webflow design placeholder? If it is the real font, it must be sourced (Google Fonts does host "Metal" -- check availability).
- If using "Inter" instead of "Inter Tight": apply negative `letter-spacing` to body text via CSS custom properties to approximate the tighter spacing. The Webflow CSS already defines these values in its `:root` block -- extract them.
- Both "Inter Tight" and "Metal" are available on Google Fonts. Using them directly avoids substitution issues. Verify with the backend developer whether portofranko.lt or other reference sites use "Inter" or "Inter Tight".

**Detection:** Compare heading typography side-by-side with the Webflow version. If headings look generic/corporate instead of distinctive, the display font was not carried over.

**Phase relevance:** CSS architecture phase (font loading setup in `<head>`).

### Pitfall 9: Lottie Animation Dependency Buried in Webflow Runtime

**What goes wrong:** The "picnic spot" section contains a Lottie animation (`data-animation-type="lottie"`, `data-src="documents/cirlce_loader.json"`) that renders an animated circle/progress loader. In Webflow, Lottie rendering is handled by webflow.js internally. Without it, the animation container is an empty div.

The Lottie JSON file (`cirlce_loader.json`, 3.9KB) exists in the export, but the rendering engine does not.

**Prevention:**
- Include `lottie-web` (or the lighter `jlottie` from LottieFiles) as a standalone library loaded via CDN.
- Use `lottie.loadAnimation()` directly in `script.js` to render the circle animation.
- Control playback via GSAP ScrollTrigger to sync the animation progress with the scroll position of the "picnic spot" section (matching the Webflow behavior where it plays on scroll-into-view).
- Keep it simple: load the JSON, render SVG, control play/pause on visibility.

**Detection:** If the circle area in the picnic section is blank or shows nothing, the Lottie renderer was not included.

**Phase relevance:** Picnic spot section build phase.

### Pitfall 10: Contact Form Method Mismatch

**What goes wrong:** The Webflow export form uses `method="get"` and includes Webflow-specific attributes (`data-wf-page-id`, `data-wf-element-id`) plus Webflow's success/error message divs (`.w-form-done`, `.w-form-fail`). The project requirement is strictly `<form method="post" action="URL">` with no AJAX. Developers may copy the Webflow form markup without changing the method, or may try to keep the Webflow success/error message pattern which depends on Webflow's form handling JavaScript.

**Prevention:**
- Rewrite forms from scratch following the backend developer's pattern: `fieldset.user-form` > `div.field` > label + input. (See PROJECT-CONTEXT.md).
- Set `method="post"` and `action="<!-- PHP: form handler URL -->"` with a PHP marker.
- Remove all `data-wf-*` attributes and Webflow form classes.
- Do not implement client-side success/error messages -- the PHP backend handles form submission feedback via server-side rendering.
- Add `required` attributes for HTML5 validation on mandatory fields (name, email, phone, checkbox).

**Detection:** Check the `<form>` tag -- if it says `method="get"` or has any `data-wf-*` attributes, it was not properly rewritten.

**Phase relevance:** Contact section build phase.

### Pitfall 11: Webflow CDN Asset References Left in Production Code

**What goes wrong:** The Webflow export contains references to Webflow CDN assets:
- jQuery from `d3e54v103j8qbb.cloudfront.net` (Webflow's CDN)
- GSAP from `cdn.prod.website-files.com`
- Poster images from `cdn.prod.website-files.com`
- Webflow icons font as a base64 data URI in `webflow.css`
- WebFont loader from Google (`ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js`)

These URLs will either break (Webflow CDN may rate-limit or block non-Webflow domains) or add unnecessary dependencies.

**Prevention:**
- Audit every `src`, `href`, and `url()` in the exported code.
- Replace all external references with the project's established CDN sources (per CLAUDE.md: jQuery from standard CDN, Bootstrap from CDN, Font Awesome from CDN).
- Download GSAP locally if using it, or load from the official `gsap.com` CDN.
- Replace poster images with local copies in `static/img/`.
- Remove the WebFont loader script -- use standard Google Fonts `<link>` tags instead.

**Detection:** Open browser DevTools Network tab. Any requests to `d3e54v103j8qbb.cloudfront.net` or `cdn.prod.website-files.com` indicate unreplaced Webflow CDN references.

**Phase relevance:** Project scaffolding phase (HTML head setup).

---

## Minor Pitfalls

### Pitfall 12: Webflow's Custom CSS-in-HTML Blocks

**What goes wrong:** The Webflow export embeds CSS directly in `<style>` blocks within the HTML body (lines 27-150 of index.html) and inside `<div class="w-embed">` elements (lines 155-166). This includes the popup container styles, confetti animation styles, and media query overrides. These are easy to miss during refactoring because they are not in external CSS files.

**Prevention:** Extract all inline `<style>` blocks into the appropriate CSS files (`override.css` for desktop, `iphone.css` for mobile popup hiding at <=998px). Search the HTML for all `<style>` tags and `w-embed` divs.

**Phase relevance:** CSS architecture phase.

### Pitfall 13: Lithuanian Characters in HTML Without Proper Encoding

**What goes wrong:** The Webflow export sets `lang="en"` on the `<html>` tag despite the content being largely Lithuanian (visible in the construction timeline: "Statybos pradzia", "Fasadas", contact names). Lithuanian characters (letters with diacritics like a, c, e, i, s, u, z, and their uppercase forms) need UTF-8 encoding. If the `<meta charset="utf-8">` is missing or the file is saved in a different encoding, diacritical characters will display as garbled text.

**Prevention:**
- Set `lang="lt"` on the `<html>` tag.
- Ensure `<meta charset="utf-8">` is the first element in `<head>`.
- Save all HTML files as UTF-8 without BOM.
- Verify Lithuanian text renders correctly for characters like: ą, č, ę, ė, į, š, ų, ū, ž (and uppercase equivalents).

**Detection:** Look for garbled characters (diamond with question mark, random accented characters) in the browser, especially in navigation, headings, and form labels.

**Phase relevance:** HTML scaffolding phase. Quick fix but easy to forget.

### Pitfall 14: Duplicate Button Markup Pattern Creates Maintenance Burden

**What goes wrong:** Every button in the Webflow export uses a dual-text hover animation pattern where the button text is duplicated:
```html
<div class="rt-button-text rt-in">Get a quote</div>
<div class="rt-button-text rt-out">Get a quote</div>
```
This creates a slide-up hover effect where the "out" text slides up as the "in" text slides down. If carried into production, every button text change requires updating two elements. Footer links use the same pattern (`menu_p` + `menu-p-hide`).

**Prevention:**
- Decide whether to keep this hover effect. If yes, simplify by using CSS `::before`/`::after` pseudo-elements with `content: attr(data-text)` to avoid duplicating the actual text in HTML.
- If the effect is not critical, use a simpler hover transition (color change, background shift, underline) that does not require duplicate text elements.
- Whichever approach: use a consistent, documented pattern so the backend developer can maintain buttons easily.

**Phase relevance:** Component design phase (buttons are used in every section).

### Pitfall 15: The "Picnic Spot" Section Uses Complex Scroll-Driven Text Swapping

**What goes wrong:** The "Measured in minutes" section swaps multiple text labels ("PARK" / "CITY CENTER" / "NEAREST" / etc.) and numbers (5, 8, 10, 15, 20) in sync with a circular Lottie progress animation. This is driven by Webflow's scroll-based interactions that coordinate multiple elements simultaneously. Recreating this requires precise scroll-position-to-animation-progress mapping.

**Prevention:**
- Use GSAP ScrollTrigger's `scrub` feature to tie animation progress to scroll position.
- Build a timeline that sequences text swaps and number reveals at defined scroll progress percentages.
- Alternatively, simplify to a static info-graphic with hover interactions (less dramatic but far simpler and less error-prone).
- Test scroll behavior on both mouse-wheel (desktop) and touch-swipe (mobile) as they produce different scroll event patterns.

**Phase relevance:** Picnic spot section build phase. Flag for potential simplification.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project scaffolding / CSS architecture | Webflow CSS contamination (Pitfall 1), CDN references (Pitfall 11), encoding (Pitfall 13), inline styles (Pitfall 12) | Clean break from Webflow code. Extract only design tokens. Set up correct `<html lang="lt">`, charset, font loading, and CDN links from scratch. |
| Hero section | Video autoplay iOS (Pitfall 4), slider rebuild (Pitfall 5), animation initial states (Pitfall 2) | Build hero as Bootstrap Carousel with video backgrounds. Test on real iOS device. Implement poster fallback. Strip all Webflow inline styles. |
| Navbar / sticky behavior | Webflow navbar depends on webflow.js for scroll-triggered class toggle | Rebuild with Bootstrap navbar component + jQuery scroll handler for sticky logo swap. |
| About section | Counter train animation (Pitfall 7), scroll-triggered fade-ins (Pitfall 2) | Use GSAP ScrollTrigger. Evaluate whether rolling digit counters or simple counting animation is acceptable. |
| Discover section | Image reveal animations, card hover effects (Pitfall 2) | CSS transitions for hover, GSAP for scroll-triggered reveals. |
| Picnic spot section | Lottie dependency (Pitfall 9), scroll-driven text swap (Pitfall 15) | Include lottie-web standalone. Evaluate simplification option. |
| Contact section | Form method and structure (Pitfall 10) | Rewrite form from scratch matching backend developer's pattern. |
| Footer | Duplicate text hover pattern (Pitfall 14) | Simplify link hover effects. |
| Responsive testing | Three-way breakpoint mismatch (Pitfall 3) | Test at 768, 900, 991, 1024px. Use backend developer's breakpoint files as authority. |
| Font setup | Font substitution (Pitfall 8) | Verify which fonts are intended for production. Use Google Fonts `<link>` tags. |

## Sources

- Webflow export analysis: `/Users/sergej/DEV/MY/axioma-web/webflow-export/` (index.html, CSS files, videos, documents)
- Backend developer patterns: portofranko.lt (verified via WebFetch -- uses Bootstrap, jQuery, FancyBox, jQuery UI datepicker with Lithuanian locale)
- [iOS video autoplay policies](https://webkit.org/blog/6784/new-video-policies-for-ios/) -- WebKit official blog
- [Webflow breakpoints overview](https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview) -- Webflow Help Center
- [Bootstrap 5 breakpoints](https://getbootstrap.com/docs/5.0/layout/breakpoints/) -- Bootstrap official docs
- [GSAP free license since Webflow acquisition](https://gsap.com/pricing/) -- GSAP official (confirmed free for all commercial use)
- [Inter Tight font](https://fonts.google.com/specimen/Inter+Tight) -- Google Fonts (specialized tighter-spacing version of Inter)
- [lottie-web](https://github.com/airbnb/lottie-web) -- Airbnb/GitHub (standalone Lottie renderer)
- [Webflow data-w-id attribute](https://discourse.webflow.com/t/how-does-data-w-id-attribute-work/188480) -- Webflow community (confirms attributes are tied to IX2 runtime)
- Project docs: `CLAUDE.md`, `docs/PROJECT-CONTEXT.md`, `docs/MOCK-DATA-STRATEGY.md`, `.planning/PROJECT.md`
