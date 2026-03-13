# Phase 1: Foundation + Hero - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

HTML/CSS architecture (Bootstrap 5 boilerplate, CSS custom properties, 940px container override, clean semantic markup, correct file structure) and a working full-screen video hero slider with 3 auto-advancing slides. No navbar (Phase 3), no content sections below hero (Phase 2).

</domain>

<decisions>
## Implementation Decisions

### Hero slide content
- 3 slides with **different Lithuanian headings** per slide — translate the English Webflow text ("Rational Living Meets Premium Comfort", "Get a quote") to Lithuanian as starting point
- **Same CTA button text** on all 3 slides (consistent across slides, matching the navbar CTA pattern)
- Slide 1: centered, full-width heading (matching Webflow `rt-v1` layout)
- Slides 2-3: left-aligned heading in narrower container (matching Webflow `rt-v2` layout)
- Hero heading size: **4.5rem** (match Webflow exactly)

### Video & background handling
- **Slide 1**: Portrait video (1080x1920) with `object-fit: cover` — crops sides on desktop, center of video visible
- **Slides 2-3**: Static background images sourced from `webflow-export/images/` (3D building renders, architectural images)
- **Dark overlay** on all slides for text readability — no Ken Burns zoom animation on backgrounds
- **6-second auto-advance** between slides (longer than Webflow's 4s to accommodate Lithuanian text)
- Video poster image fallback for browsers that block autoplay

### Scroll-down indicator
- Text: **"Slinkite zemyn"** (Lithuanian) with down-arrow icon
- Animation: **Static with fade-in** after hero loads — no repeating bounce
- Smooth scrolls to content area below hero on click

### Brand typography
- **Body font**: Inter Tight (Google Fonts) — replaces "Inter" from CLAUDE.md to match Webflow design
- **Display font**: Metal (Google Fonts) — used for hero headings AND all main section headings
- Font weights: Claude's discretion based on what the Webflow design actually uses

### Brand colors
- Extract exact Webflow palette into CSS custom properties:
  - `--color-primary`: `#0B2641` (dark navy — primary dark)
  - `--color-accent`: `#e07f60` (orange accent)
  - `--color-purple`: `#5e186e` (purple accent)
  - `--color-bg`: `#fefaf9` (warm off-white — NOT pure white)
  - `--color-dark`: `#15151F` (dark background for footer/dark sections)
  - `--color-text`: derive from Webflow usage
- **Keep existing status colors** (available/reserved/sold) in override.css for future apartment pages
- Background tone: warm off-white `#fefaf9` for premium residential feel

### Page shell structure
- No navbar in Phase 1 (full navbar comes in Phase 3)
- Page structure below hero: Claude's discretion (minimal footer or section placeholders)

### Claude's Discretion
- Slider navigation controls (arrows, dots, or auto-advance only)
- Font weight selection for Inter Tight (based on actual Webflow usage)
- Page structure below hero (minimal footer vs empty section placeholders)
- Slide transition animation style (crossfade, slide, etc.)
- Hero overlay gradient specifics (opacity, direction)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `index.html`: Full HTML boilerplate with all CDN links (Bootstrap 5.3.3, jQuery 3.7.1, jQuery UI, Font Awesome 6, Fancybox, LightSlider) — needs font update from Inter to Inter Tight + Metal
- `static/css/override.css`: CSS custom properties skeleton with `:root {}` — needs color values replaced with Webflow palette
- `static/js/script.js`: jQuery document.ready pattern, Lithuanian datepicker locale, Fancybox init — hero slider JS will be added here
- `static/css/iphone.css` and `static/css/ipad.css`: Empty responsive files with correct `media` attribute loading in HTML head

### Established Patterns
- Responsive CSS: separate files per breakpoint loaded via `<link media="">` — NOT media queries in main stylesheet
- Forms: `<form method="post">` only
- PHP markers: `<!-- PHP: description -->` on dynamic content areas
- Lithuanian locale: already configured for jQuery UI datepicker

### Integration Points
- `webflow-export/index.html`: 880-line reference for all design elements — hero structure at lines 210-327
- `webflow-export/videos/`: Single video file (MP4 + WebM + poster) for hero slide 1
- `webflow-export/images/`: Background images for hero slides 2-3, plus logos and icons
- `webflow-export/css/axioma-v-2-*.webflow.css`: Complete Webflow CSS with font sizes, spacing tokens, and color definitions at `:root`

</code_context>

<specifics>
## Specific Ideas

- Translate Webflow English text to Lithuanian (not original Lithuanian copy — starting point for client review)
- Match Webflow's slide 1 centered / slides 2-3 left-aligned text layout variety
- Warm off-white (#fefaf9) background gives premium residential feel — important for brand consistency
- Hero video is portrait (1080x1920) — object-fit:cover will crop significantly on desktop widescreen, acceptable tradeoff

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-hero*
*Context gathered: 2026-03-13*
