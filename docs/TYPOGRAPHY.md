# Typography System — Axioma

## Font Families

| Role | Font | Usage |
|------|------|-------|
| Display (headings h1-h4) | **EB Garamond** (italic, 400) | Hero headings, section titles, card titles, contact headings |
| Body (text, h5-h6) | **Inter Tight** (300-700) | Paragraphs, labels, buttons, navigation, form inputs |

Loaded via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,400&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Note: The Webflow reference project uses Inter Tight for everything. We use EB Garamond for display headings as a design decision to differentiate from the template.

## Fluid Type Scale

All heading sizes use `clamp()` for fluid responsive scaling between 375px and 1920px viewport width. No media queries are needed for typography — `clamp()` handles the transition smoothly.

**Formula:** `clamp(min, base + rate * 1vw, max)`

Where `base` and `rate` are calculated so the value equals `min` at 375px and `max` at 1920px.

### CSS Custom Properties

```css
:root {
  --font-size-h1: clamp(2.5rem,   1.65rem + 3.63vw, 6rem);     /* 40px → 96px */
  --font-size-h2: clamp(2rem,     1.17rem + 3.54vw, 5.4rem);    /* 32px → 87px */
  --font-size-h3: clamp(1.5rem,   1.09rem + 1.76vw, 3.2rem);   /* 24px → 51px */
  --font-size-h4: clamp(1.25rem,  1.01rem + 1.04vw, 2.25rem);  /* 20px → 36px */
  --font-size-h5: clamp(1rem,     0.88rem + 0.52vw, 1.5rem);   /* 16px → 24px */
  --font-size-h6: clamp(0.875rem, 0.81rem + 0.26vw, 1.125rem); /* 14px → 18px */
  --font-size-sub: clamp(1.125rem, 0.97rem + 0.65vw, 1.75rem); /* 18px → 28px */
  --font-size-body: 0.8rem;                                     /* 12.8px fixed */
  --font-size-button: 0.6875rem;                                 /* 11px fixed */
}
```

### Size at Key Breakpoints

| Level | Variable | 375px | 768px | 1024px | 1280px | 1440px | 1920px | Growth |
|-------|----------|-------|-------|--------|--------|--------|--------|--------|
| h1 | `--font-size-h1` | 2.5rem (40px) | 3.4rem (54px) | 4.0rem (64px) | 4.6rem (73px) | 4.9rem (79px) | 6rem (96px) | 2.4x |
| h2 | `--font-size-h2` | 2rem (32px) | 2.9rem (46px) | 3.4rem (55px) | 4rem (64px) | 4.4rem (70px) | 5.4rem (87px) | 2.7x |
| h3 | `--font-size-h3` | 1.5rem (24px) | 1.9rem (31px) | 2.2rem (35px) | 2.5rem (40px) | 2.7rem (43px) | 3.2rem (51px) | 2.1x |
| h4 | `--font-size-h4` | 1.25rem (20px) | 1.4rem (23px) | 1.6rem (25px) | 1.7rem (27px) | 1.8rem (29px) | 2.25rem (36px) | 1.8x |
| h5 | `--font-size-h5` | 1rem (16px) | 1.1rem (18px) | 1.2rem (19px) | 1.3rem (21px) | 1.3rem (21px) | 1.5rem (24px) | 1.5x |
| h6 | `--font-size-h6` | 0.875rem (14px) | 0.9rem (15px) | 1.0rem (16px) | 1.0rem (16px) | 1.1rem (17px) | 1.125rem (18px) | 1.3x |
| sub | `--font-size-sub` | 1.125rem (18px) | 1.3rem (20px) | 1.4rem (22px) | 1.5rem (24px) | 1.6rem (25px) | 1.75rem (28px) | 1.6x |
| body | `--font-size-body` | 0.8rem (13px) | 0.8rem (13px) | 0.8rem (13px) | 0.8rem (13px) | 0.8rem (13px) | 0.8rem (13px) | 1x |

### Progressive Scaling

Larger headings grow more aggressively with viewport width. This is intentional:

- **h1** scales 2.4x from mobile to desktop — creates hero impact on large screens
- **h6** scales only 1.3x — small labels stay readable without becoming oversized
- **body** is fixed — paragraph text maintains consistent readability at all viewports

This progressive approach ensures the visual hierarchy strengthens on larger screens while remaining comfortable on mobile.

## Line Heights & Letter Spacing

| Level | Line Height | Letter Spacing |
|-------|-------------|----------------|
| h1 | 108.33% | -0.3rem |
| h2 | 125% | -0.09rem |
| h3 | 120% | -0.05rem |
| h4 | 141.67% | -0.0275rem |
| h5 | 150% | -0.0225rem |
| h6 | 156% | -0.02125rem |
| body | 162.5% | 0 |
| sub | 171.43% | 0 |

Pattern: larger headings have tighter line-height and stronger negative letter-spacing (optical adjustment for large text).

## Heading Usage by Section

| Section | Element | Variable | Font |
|---------|---------|----------|------|
| Hero | `h1` | `--font-size-h1` | EB Garamond italic |
| About | `h3` | `--font-size-h3` | EB Garamond italic |
| Discover title | `h2` | `--font-size-h2` | EB Garamond italic |
| Discover cards | `h4` | `--font-size-h4` | EB Garamond italic |
| Location title | `h2` | `--font-size-h2` | EB Garamond italic |
| Location labels | `h6` (.location-h6) | `--font-size-h4` | EB Garamond |
| Timeline title | `h2` | `--font-size-h2` | EB Garamond italic |
| Timeline quarters | `.timeline-quarter` | `--font-size-h5` | Inter Tight |
| Contact heading | `h3` | `--font-size-h3` | EB Garamond italic |
| Agent names | `.agent-name` | `--font-size-h5` | EB Garamond |
| Agent phone | `.agent-phone` | `--font-size-h5` | Inter Tight |
| Counter digits | `.counter-digit` | 3.4375rem (fixed) | Inter Tight |
| Counter labels | `.counter-label` | `--font-size-h6` | Inter Tight |
| Sub-text labels | `.sub-text` | `--font-size-sub` | Inter Tight |
| Body paragraphs | `p` | `--font-size-body` | Inter Tight |
| Buttons | `.btn-cta` | `--font-size-button` | Inter Tight |
| Footer links | `.footer-link` | `--font-size-body` | Inter Tight |

## Comparison with Webflow Reference

The Webflow project (axioma-v-2.webflow.io) uses the same CSS variable values in `:root`, but applies override classes that break heading hierarchy:

| Webflow Class | Actual Size Used | Effect |
|---------------|-----------------|--------|
| `rt-text-style-h3` | `--heading-two` (3.2rem) | h3 renders at h2 size |
| `rt-text-style-h5` | `--heading-three` (2rem) | h5 renders at h3 size |
| h2 tag directly | `--heading-one` (4.5rem) | h2 renders at h1 size |

Our approach differs by:

1. **Clean hierarchy** — h1 > h2 > h3 > h4 > h5 > h6 always holds true
2. **Fluid responsive** — headings scale with viewport (Webflow uses fixed sizes)
3. **Progressive scaling** — larger headings grow faster (premium feel on large screens)
4. **Variable-driven** — all sizes reference `:root` custom properties, no hardcoded overrides

## Responsive Files

Typography is fully handled by `clamp()` in `override.css`. The separate responsive files have different roles:

- `iphone.css` (max-width: 900px) — layout changes only (stack columns, hide elements)
- `ipad.css` (768px-1024px) — layout adjustments only

No typography overrides should be needed in these files. If a specific heading needs a different size at a breakpoint, prefer adjusting the `clamp()` parameters in `:root` over adding a media query override.
