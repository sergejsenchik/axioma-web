---
phase: 3
slug: navigation-animations
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing (no automated test framework for static HTML) |
| **Config file** | none |
| **Quick run command** | Open `index.html` in browser, scroll through page |
| **Full suite command** | Test in Chrome, Firefox, Safari on desktop |
| **Estimated runtime** | ~2 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Open `index.html` in browser, test modified features
- **After every plan wave:** Full page scroll-through in Chrome + Safari
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~30 seconds (page reload)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | NAV-01 | manual | Scroll page up/down, verify navbar hides/shows | N/A | ⬜ pending |
| 03-01-02 | 01 | 1 | NAV-02 | manual | Visual check — logo white on purple at all times | N/A | ⬜ pending |
| 03-01-03 | 01 | 1 | NAV-03 | manual | Resize to ≤900px, verify hamburger appears | N/A | ⬜ pending |
| 03-01-04 | 01 | 1 | NAV-04 | manual | Scroll page, verify CTA always visible in navbar | N/A | ⬜ pending |
| 03-01-05 | 01 | 1 | NAV-05 | manual | Inspect navbar left for "Meniu" and "Rinktis buta" | N/A | ⬜ pending |
| 03-02-01 | 02 | 1 | ANIM-01 | manual | Scroll to sections, verify cascade reveal | N/A | ⬜ pending |
| 03-02-02 | 02 | 1 | ANIM-02 | manual | Verify no GSAP; animations use CSS classes | N/A | ⬜ pending |
| 03-02-03 | 02 | 1 | ANIM-03 | manual | Hover each CTA, verify text slides up/in | N/A | ⬜ pending |
| 03-02-04 | 02 | 1 | ANIM-04 | manual | Scroll through timeline, verify perspective effect | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* No test framework needed — this is a static HTML project with manual browser validation.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Smart header hide/show | NAV-01 | Requires scroll interaction | Scroll down 200px+ — navbar hides. Scroll up — navbar slides in from top. |
| Logo stays white | NAV-02 | Visual check | Logo should always be white SVG on purple texture |
| Hamburger responsive | NAV-03 | Requires viewport resize | Resize to ≤900px, hamburger button appears |
| CTA always visible | NAV-04 | Scroll interaction | Scroll entire page, CTA button always in navbar |
| Scroll-reveal stagger | ANIM-01 | Requires scroll interaction | Scroll to each section, heading→paragraph→CTA cascade |
| CSS-only animations | ANIM-02 | Code inspection | No GSAP imports; IntersectionObserver + CSS transitions |
| Button text-swap | ANIM-03 | Requires hover | Hover all CTA buttons, text slides up with 0.35s ease |
| Timeline scroll-linked | ANIM-04 | Requires scroll interaction | Scroll through timeline — mask expands, purple overlay rotates in |

---

## Validation Sign-Off

- [ ] All tasks have manual verify instructions
- [ ] Sampling continuity: every task tested via browser
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
