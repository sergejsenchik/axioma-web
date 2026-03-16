---
phase: 4
slug: responsive-polish-handoff
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing (no automated test framework) |
| **Config file** | none |
| **Quick run command** | Open `index.html` in browser with DevTools responsive mode |
| **Full suite command** | Test at 375px, 768px, 800px, 900px, 1024px, 1440px widths |
| **Estimated runtime** | ~120 seconds (manual) |

---

## Sampling Rate

- **After every task commit:** Open in browser, test at 375px and 1024px
- **After every plan wave:** Test at 375px, 768px, 800px (overlap zone), 900px, 1024px, 1440px
- **Before `/gsd:verify-work`:** Full breakpoint suite + actual mobile device test
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | RESP-02 | manual | DevTools at 768px, 1024px | N/A | ⬜ pending |
| 04-01-02 | 01 | 1 | RESP-03 | manual | DevTools at 375px, 900px | N/A | ⬜ pending |
| 04-01-03 | 01 | 1 | RESP-04 | smoke | `grep -c "@media" static/css/override.css` — expect 0 | ✅ | ⬜ pending |
| 04-01-04 | 01 | 1 | RESP-06 | manual | Tap test on actual device or emulator | N/A | ⬜ pending |
| 04-02-01 | 02 | 2 | LANG-01 | manual | Visual scan of page content | N/A | ⬜ pending |
| 04-02-02 | 02 | 2 | LANG-02 | manual | Check for mojibake on special chars | N/A | ⬜ pending |
| 04-02-03 | 02 | 2 | LANG-03 | smoke | `grep 'lang="lt"' index.html` — expect match | ✅ | ⬜ pending |
| 04-02-04 | 02 | 2 | HAND-01 | smoke | `grep -c "PHP:" index.html` — expect ≥28 | ✅ | ⬜ pending |
| 04-02-05 | 02 | 2 | HAND-02 | manual | Check `<form action>` in source | N/A | ⬜ pending |
| 04-02-06 | 02 | 2 | HAND-03 | manual | Check all CMS image paths | N/A | ⬜ pending |
| 04-02-07 | 02 | 2 | HAND-04 | smoke | Open browser console, check for errors | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. This is a CSS-only phase with manual testing — no test framework installation needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Tablet layout correct | RESP-02 | Visual layout comparison | Open at 768px and 1024px in DevTools, compare to Webflow reference |
| Mobile layout correct | RESP-03 | Visual layout comparison | Open at 375px and 900px in DevTools, compare to Webflow reference |
| Touch-friendly elements | RESP-06 | Requires touch interaction | Test tap targets ≥44px, discover card overlay disabled, hamburger visible |
| Video plays on mobile | RESP-05 (overridden) | Requires actual device | Load on real mobile device, verify autoplay works |
| Lithuanian text complete | LANG-01 | Visual scan | Read all visible text, check for English remnants |
| Lithuanian chars render | LANG-02 | Visual check | Look for mojibake on ą, č, ę, ė, į, š, ų, ū, ž characters |
| Form action placeholder | HAND-02 | Semantic check | View source, verify form action is `/submit-form.php` with PHP comment |
| Image paths convention | HAND-03 | Path audit | View source, verify CMS images use `uploads/` prefix |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
