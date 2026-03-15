---
created: 2026-03-15T09:38:03.672Z
title: Improve typography system to match Webflow sizing
area: ui
files:
  - static/css/override.css
  - index.html
---

## Problem

Font sizes across the project are smaller than the Webflow reference (https://axioma-v-2.webflow.io/). The Webflow project has chaotic/inconsistent styles — our new project needs a clean, hierarchical typography system while visually matching the Webflow sizing.

Key requirements:
- Analyze Webflow heading styles per section (size, color, font-weight, line-height)
- Keep our font choice (EB Garamond for h1-h4, Inter Tight for body/h5-h6) — do NOT switch to Webflow fonts
- Build a clean CSS custom properties-based type scale with responsive sizing
- Follow modern best practices: clamp(), rem units, consistent scale
- Increase sizes to match Webflow visual proportions without copying their class chaos
- Ensure responsive behavior across breakpoints (desktop, tablet, mobile)

## Solution

1. Fetch and analyze Webflow computed styles for all headings per section
2. Audit current override.css typography variables and heading rules
3. Create a unified type scale using CSS clamp() for fluid responsive sizing
4. Map Webflow sizes to our clean hierarchy (h1-h6 + utility classes)
5. Update :root CSS custom properties and heading styles
6. Test across breakpoints
