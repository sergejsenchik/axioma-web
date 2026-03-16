# Phase 4: Responsive + Polish + Handoff - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the homepage work correctly on desktop, tablet, and mobile devices. Verify Lithuanian localization is complete and correct. Ensure PHP handoff markers are in place for backend developer integration. Responsive styles go in separate CSS files (iphone.css, ipad.css) — no media queries in override.css.

</domain>

<decisions>
## Implementation Decisions

### Tablet & mobile section layouts
- **Discover cards**: Stack all 3 vertically (full-width) on both tablet and mobile
- **Agent cards**: 2+2+1 grid on tablet, stack vertically on mobile
- **Timeline milestones**: Horizontal scroll strip on both tablet and mobile — preserves linear timeline feel, requires swipe interaction
- **Contact form**: Side-by-side on tablet (narrower), hide image on mobile (form only)
- **Counter cards, about section, location circle, navbar, footer**: Claude's discretion based on Webflow responsive reference (breakpoints at 991px, 767px, 479px in Webflow CSS)

### Mobile hero treatment
- **Video**: Keep playing on all devices including mobile — portrait video (1080x1920) fits mobile well. Do NOT swap to poster image on mobile (overrides RESP-05 requirement — user preference)
- **Heading text**: Keep existing fluid clamp() typography system — already configured and responsive, no changes needed
- **Slide navigation arrows**: Claude's discretion (hide and rely on auto-advance + swipe, or keep enlarged for touch)
- **Scroll-down indicator, CTA sizing**: Claude's discretion

### Touch interaction alternatives
- **Discover card hover overlay**: Disabled on touch devices — cards show content statically, tap goes directly to link
- **Button text-swap hover**: Keep everywhere — CSS :hover/:active fires on tap, adds polish
- **Hamburger menu**: Non-functional placeholder — visible but does nothing on tap. Modal menu deferred to future milestone
- **Smart header scroll behavior on mobile**: Claude's discretion

### Handoff markers
- **Current 27 PHP markers**: Sufficient coverage — no additional audit needed
- **Form action**: Claude's discretion on path convention (current `action="#"` with PHP comment, or conventional PHP path — match backend developer's other sites)
- **Meta tags, OG tags, GTM, cookie consent**: Backend developer adds these at deployment — not our scope
- **JS conflicts**: None expected — same stack (jQuery 3.x, Bootstrap 5.3, jQuery UI 1.13.1)

### Localization verification
- All visible text already in Lithuanian from Phases 1-2
- `<html lang="lt">` already set
- Verification pass to confirm correct Lithuanian characters (ą, č, ę, ė, į, š, ų, ū, ž) render properly throughout

### Desktop polish
- Skip desktop verification pass — trust Phases 1-3. Focus purely on responsive breakpoints + handoff

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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Responsive reference
- `webflow-export/css/axioma-v-2-72080f118b1b1c08cd2bbfc5d084.webflow.css` — Webflow responsive breakpoints at 991px, 767px, 479px, plus large screen rules at 1280px, 1440px, 1920px
- `webflow-export/css/webflow.css` — Base Webflow responsive rules at 991px, 767px, 479px

### Project conventions
- `docs/PROJECT-CONTEXT.md` — Backend developer's responsive approach: separate CSS files per breakpoint, NOT media queries in main stylesheets
- `CLAUDE.md` — Tech stack rules, file structure, responsive file conventions (iphone.css ≤900px, ipad.css 768-1024px)

### Backend developer reference sites
- portofranko.lt — Primary reference for responsive patterns and PHP integration conventions
- riverland.lt — Calendar/reservation responsive patterns
- romeoirdziuljeta.lt — Similar responsive patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `static/css/iphone.css`: Empty file, loaded via `<link media="screen and (max-width:900px)">` — ready for mobile styles
- `static/css/ipad.css`: Empty file, loaded via `<link media="screen and (min-width:768px) and (max-width:1024px)">` — ready for tablet styles
- `static/css/override.css`: No media queries (correct) — all responsive rules go in separate files
- Fluid clamp() typography: Already configured for responsive heading scaling
- `.navbar-hamburger`: Already built with 2-line icon, hidden on desktop via CSS

### Established Patterns
- Bootstrap 5 grid classes (`col-md-6`, `d-none d-lg-block`) already used throughout — extend with responsive breakpoint classes
- `.scroll-reveal` / `.scroll-reveal-simple`: Entrance animations — may need adjustment for mobile (reduce blur, translateY distance)
- `.texture-purple`: Used on navbar, about heading, discover overlays, timeline, footer — consistent across breakpoints
- jQuery scroll handlers: Smart header, timeline animation — check mobile scroll performance

### Integration Points
- `index.html` lines 30-31: ipad.css and iphone.css already linked with correct media attributes
- `static/js/script.js`: Hero slider, scroll handlers, IntersectionObserver — verify all work on touch devices
- 27 PHP markers throughout index.html — already positioned at all dynamic content areas

</code_context>

<specifics>
## Specific Ideas

- User wants video to play on ALL devices including mobile — portrait aspect ratio works well on phones, override RESP-05 requirement
- Fluid typography already handled — don't re-implement or change the existing clamp() system
- Timeline as horizontal scroll on mobile preserves the linear feel — not a grid reflow
- Discover card overlay is desktop-only enrichment — clean static cards on mobile
- Hamburger intentionally non-functional in v1 — modal menu is a future milestone deliverable
- User noted (in Russian): "we already configured headings and their responsiveness — can keep what we did"

</specifics>

<deferred>
## Deferred Ideas

- **Modal menu** (hamburger opens full-screen navigation) — future milestone, user will provide reference design
- **Desktop polish verification** — user chose to skip, trust Phases 1-3

</deferred>

---

*Phase: 04-responsive-polish-handoff*
*Context gathered: 2026-03-16*
