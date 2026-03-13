---
phase: 2
slug: content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing (no automated test framework — static HTML project) |
| **Config file** | none |
| **Quick run command** | Open `index.html` in browser, scroll through all sections |
| **Full suite command** | Check all sections visually + test form submit + test hover effects + test counter animation |
| **Estimated runtime** | ~60 seconds (manual visual scan) |

---

## Sampling Rate

- **After every task commit:** Open `index.html` in browser, scroll through all sections
- **After every plan wave:** Full visual comparison with Webflow design
- **Before `/gsd:verify-work`:** All 22 requirements visually verified
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | ABOU-01 | manual-only | Open `index.html`, scroll to #about | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | ABOU-02 | manual-only | Scroll to counter section, verify animation triggers | N/A | ⬜ pending |
| 02-01-03 | 01 | 1 | ABOU-03 | manual-only | Visual comparison with Webflow design | N/A | ⬜ pending |
| 02-01-04 | 01 | 1 | ABOU-04 | manual-only | Verify button exists with PHP marker | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | DISC-01 | manual-only | Scroll to Discover, verify 3 cards with 01/02/03 | N/A | ⬜ pending |
| 02-02-02 | 02 | 1 | DISC-02 | manual-only | Hover each card, verify 2-layer animation | N/A | ⬜ pending |
| 02-02-03 | 02 | 1 | DISC-03 | manual-only | Resize browser, check grid behavior | N/A | ⬜ pending |
| 02-03-01 | 03 | 1 | LOCN-01 | manual-only | Scroll to section, verify 5/8/10/15/20 min values | N/A | ⬜ pending |
| 02-03-02 | 03 | 1 | LOCN-02 | manual-only | Verify circle animation plays on viewport entry | N/A | ⬜ pending |
| 02-03-03 | 03 | 1 | LOCN-03 | manual-only | Watch text cycle through 5 locations | N/A | ⬜ pending |
| 02-03-04 | 03 | 1 | LOCN-04 | manual-only | Verify numbers appear/change with each step | N/A | ⬜ pending |
| 02-04-01 | 04 | 2 | TIME-01 | manual-only | Verify 6 milestones Q4 2024 - Q4 2026 | N/A | ⬜ pending |
| 02-04-02 | 04 | 2 | TIME-02 | manual-only | Verify progress line width reflects current date | N/A | ⬜ pending |
| 02-04-03 | 04 | 2 | TIME-03 | manual-only | Verify background image visible | N/A | ⬜ pending |
| 02-04-04 | 04 | 2 | TIME-04 | manual-only | Inspect HTML source for PHP markers | N/A | ⬜ pending |
| 02-05-01 | 05 | 2 | CONT-01 | manual-only | Count: name, email, phone, message, checkbox | N/A | ⬜ pending |
| 02-05-02 | 05 | 2 | CONT-02 | manual-only | Inspect HTML: `method="post"` | N/A | ⬜ pending |
| 02-05-03 | 05 | 2 | CONT-03 | manual-only | Count agents, verify phone/email links work | N/A | ⬜ pending |
| 02-05-04 | 05 | 2 | CONT-04 | manual-only | Inspect HTML source | N/A | ⬜ pending |
| 02-06-01 | 06 | 3 | FOOT-01 | manual-only | Scroll to bottom, verify all elements | N/A | ⬜ pending |
| 02-06-02 | 06 | 3 | FOOT-02 | manual-only | Verify copyright text and privacy link | N/A | ⬜ pending |
| 02-06-03 | 06 | 3 | FOOT-03 | manual-only | Verify Riverland + Porto Franko logos visible | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. This is a static HTML project — validation is manual browser testing. The only prerequisite is having all asset files copied to correct locations before testing.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All 6 sections render in correct order | ALL | Static HTML, no test runner | Scroll through page, verify section order |
| Digit-train counter animation | ABOU-02, ABOU-03 | CSS animation requires visual check | Scroll counters into view, verify count-up animation |
| Discover card hover effects | DISC-02 | Mouse interaction required | Hover each card, verify overlay layers |
| Lottie circle animation | LOCN-02 | Canvas/SVG animation visual | Scroll to location, verify circle plays |
| Location text cycling | LOCN-03, LOCN-04 | Timer-based animation | Wait and observe text/number cycling |
| Form POST method | CONT-02 | Inspect source | View page source, verify `method="post"` |
| Responsive grid layout | DISC-03 | Requires viewport resizing | Resize browser, check Bootstrap grid behavior |

---

## Validation Sign-Off

- [ ] All tasks have manual verification instructions
- [ ] Sampling continuity: visual check after every task commit
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending