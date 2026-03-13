---
phase: 1
slug: foundation-hero
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing (static HTML, no build step) |
| **Config file** | none |
| **Quick run command** | `open index.html` in browser |
| **Full suite command** | Manual checklist verification (all 10 requirements) |
| **Estimated runtime** | ~2 minutes (manual visual inspection) |

---

## Sampling Rate

- **After every task commit:** Open `index.html` in browser, verify visual output
- **After every plan wave:** Full checklist below
- **Before `/gsd:verify-work`:** All 10 requirements verified
- **Max feedback latency:** ~30 seconds (open file in browser)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FOUN-01 | manual | DevTools Console: `$.fn.jquery` + `bootstrap.Modal.VERSION` | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | FOUN-02 | manual | DevTools Elements: inspect `:root` computed styles | N/A | ⬜ pending |
| 01-01-03 | 01 | 1 | FOUN-03 | manual | DevTools: select `.container` → verify `max-width: 940px` | N/A | ⬜ pending |
| 01-01-04 | 01 | 1 | FOUN-04 | manual-grep | `grep -r "data-wf\|data-w-\|class=\"w-" index.html` → 0 results | N/A | ⬜ pending |
| 01-01-05 | 01 | 1 | FOUN-05 | manual | `ls static/css/ static/js/ static/img/` | N/A | ⬜ pending |
| 01-02-01 | 02 | 1 | HERO-01 | manual | Open page → observe 3 slides auto-cycling, video on slide 1 | N/A | ⬜ pending |
| 01-02-02 | 02 | 1 | HERO-02 | manual | Each slide shows heading + CTA button during auto-advance | N/A | ⬜ pending |
| 01-02-03 | 02 | 1 | HERO-03 | manual | No webflow.js loaded; transitions smooth | N/A | ⬜ pending |
| 01-02-04 | 02 | 1 | HERO-04 | manual | Throttle network in DevTools → reload → poster image visible | N/A | ⬜ pending |
| 01-02-05 | 02 | 1 | HERO-05 | manual | Click "Slinkite zemyn" → page smooth-scrolls to `#about` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* This is a static HTML project with no test framework — validation is manual browser testing, appropriate for the stack (no npm, no build step, static HTML per CLAUDE.md).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Bootstrap + jQuery loaded | FOUN-01 | Static HTML, no test runner | Open DevTools Console, check `$.fn.jquery` and `bootstrap.Modal.VERSION` |
| CSS custom properties | FOUN-02 | Visual/computed style check | Inspect `<html>` element computed styles for `--color-*` vars |
| Container 940px | FOUN-03 | Layout measurement | Select `.container`, verify computed `max-width` |
| No Webflow artifacts | FOUN-04 | Source grep | `grep -r "data-wf\|data-w-\|class=\"w-" index.html` |
| File structure | FOUN-05 | Directory listing | Verify `static/css/`, `static/js/`, `static/img/` exist with expected files |
| 3-slide video hero | HERO-01 | Visual verification | Watch page for ~20s, observe 3 slides cycling |
| Overlay text + CTA | HERO-02 | Visual verification | Each slide shows heading text and button |
| Custom transitions | HERO-03 | Visual + DevTools | Smooth crossfade; no webflow.js in Network tab |
| Video poster fallback | HERO-04 | Network throttle | Slow 3G in DevTools, reload page |
| Scroll-down smooth scroll | HERO-05 | Interaction test | Click scroll indicator, observe smooth scroll to #about |

---

## Validation Sign-Off

- [ ] All tasks have manual verification steps defined
- [ ] Sampling continuity: every task verifiable after commit
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
