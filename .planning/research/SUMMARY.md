# Research Summary: Axioma Homepage Refactor

**Domain:** Webflow-to-Bootstrap conversion for residential complex marketing homepage
**Researched:** 2026-03-13
**Overall confidence:** HIGH

## Executive Summary

The Axioma homepage refactor is a well-scoped brownfield conversion: taking an 880-line Webflow HTML export with 16,900 lines of Webflow CSS and rebuilding it as clean Bootstrap 5 + jQuery HTML that matches the backend PHP developer's established patterns. The core stack is fixed (Bootstrap 5.3.3, jQuery 3.7.1, jQuery UI 1.13.1, Fancybox, Font Awesome 6.5.1) and does not require technology decisions — the research focus is on conversion strategy and the small set of additional libraries needed.

The Webflow export uses two animation systems that need replacement: Webflow Interactions IX2 (proprietary scroll-triggered animations) and GSAP 3.14.2 with ScrollTrigger. Both are replaced by a lightweight combination of Animate.css 4.1.1 (pure CSS entrance animations) triggered by IntersectionObserver via jQuery. This covers 10 of the 14 distinct animation patterns in the export. The remaining 4 (counter ticker, hero slider, Lottie animations, text rotation) require small amounts of custom jQuery.

The only genuinely new library needed is Animate.css (16KB CSS, zero JS) and lottie-player (for 2 Lottie JSON animations embedded in the Webflow design). Everything else is either already in the project stack or implementable with native browser APIs + jQuery.

The conversion is NOT a mechanical CSS translation. The Webflow HTML is deeply nested (7-8 levels of wrapper divs for simple layout), uses Webflow-proprietary classes (w-layout-*, w-slider, data-w-*), and embeds animation state in inline styles. The correct approach is to write new semantic HTML from scratch using the Webflow export as a visual design reference, extracting spacing values, colors, and typography metrics from the Webflow CSS into CSS custom properties.

## Key Findings

**Stack:** Core stack is fixed. Add only Animate.css 4.1.1 (scroll animations) and lottie-player 2.0.12 (2 Lottie effects). Do not add GSAP, AOS, Slick, Swiper, or any heavy library.

**Architecture:** Rewrite HTML from scratch using Webflow as design spec. Do not attempt mechanical Webflow-to-Bootstrap class mapping.

**Critical pitfall:** The Webflow container is 940px; Bootstrap default is 1140px. Override Bootstrap container width in override.css or the layout will be 21% wider than the design.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation + Hero** - Set up HTML boilerplate, CSS architecture (custom properties from Webflow values), Bootstrap container override, hero section with video background slider
   - Addresses: HTML structure, CSS custom properties, video background, hero slider
   - Avoids: Building on wrong container width, missing design tokens

2. **Content Sections** - About section, Discover section, "Measured in minutes" amenities section, construction timeline
   - Addresses: Grid layout conversion, image reveal effects, counter animations, text rotation
   - Avoids: Animation work before layout is solid

3. **Interactive Elements + Forms** - Contact form, newsletter, floating popup/CTA, Lottie animations, all scroll animations
   - Addresses: Form styling, popup behavior, Lottie integration, scroll-triggered entrances
   - Avoids: Adding interactivity before static layout is verified

4. **Navigation + Footer + Responsive** - Sticky navbar with logo swap, mobile menu, footer, iphone.css, ipad.css
   - Addresses: Responsive breakpoints, mobile video disable, navigation behavior
   - Avoids: Responsive work before desktop is stable

**Phase ordering rationale:**
- Foundation first because container width and CSS custom properties affect everything downstream
- Content sections before interactive elements because layout must be correct before animations are layered on
- Navigation and responsive last because the backend developer's reference sites show these are standard patterns that can be ported from existing projects

**Research flags for phases:**
- Phase 1: Video orientation is portrait (1080x1920) — may need landscape versions for desktop hero. Flag for client clarification.
- Phase 1: "Metal" display font needs visual verification against Webflow preview — may be template artifact.
- Phase 3: Lottie JSON files (circle_loader.json, confetti) need testing with lottie-player to confirm rendering.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core stack is fixed. Only 2 new additions (Animate.css, lottie-player), both well-established. |
| Features | HIGH | All 14 animations inventoried from Webflow source. Implementation patterns identified for each. |
| Architecture | HIGH | Rewrite approach is standard for Webflow-to-framework conversions. No novel technical challenges. |
| Pitfalls | MEDIUM | Container width mismatch and font uncertainty are the main risks. Video orientation may need client input. |

## Gaps to Address

- **"Metal" font verification** — Need visual confirmation that this is the intended display font, not a Webflow template default
- **Video orientation** — The hero video is portrait (1080x1920). Need to confirm if landscape versions will be provided or if the current portrait videos should be cropped via object-fit:cover
- **Confetti Lottie JSON** — The Webflow export references a confetti effect on the popup but no JSON file is included in the export. May need to source or create this animation.
- **Exact animation timings** — Webflow IX2 timing data is embedded in the webflow.js runtime and cannot be easily extracted. Implementation will approximate from visual observation.

---

*Research completed: 2026-03-13*
