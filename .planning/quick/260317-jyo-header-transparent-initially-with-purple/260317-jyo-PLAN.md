---
phase: quick
plan: 260317-jyo
type: execute
wave: 1
depends_on: []
files_modified:
  - index.html
  - static/css/override.css
  - static/js/script.js
  - static/css/iphone.css
  - static/css/ipad.css
autonomous: true
requirements: [quick-task]
must_haves:
  truths:
    - "At page top, navbar background is fully transparent except for a purple pill/block behind the logo"
    - "On scroll past threshold, entire navbar smoothly transitions to full purple textured bar"
    - "Navbar is always visible (sticky) — never hides on scroll down"
    - "Scrolling back to top restores the transparent state with purple logo area only"
  artifacts:
    - path: "static/css/override.css"
      provides: "Transparent default navbar, .navbar-center purple pill, .navbar-scrolled full purple"
    - path: "static/js/script.js"
      provides: "Scroll listener toggling .navbar-scrolled class"
    - path: "index.html"
      provides: "Nav element without texture-purple class"
  key_links:
    - from: "static/js/script.js"
      to: ".site-navbar"
      via: "addClass/removeClass navbar-scrolled on scroll"
      pattern: "navbar-scrolled"
    - from: "static/css/override.css"
      to: ".site-navbar.navbar-scrolled"
      via: "CSS class applying texture-purple styles"
      pattern: "\\.site-navbar\\.navbar-scrolled"
---

<objective>
Transform the header from always-purple with hide-on-scroll to transparent-initially with a purple logo pill, transitioning to full purple bar on scroll, always sticky.

Purpose: Gives the hero section more visual impact by letting it show through the header, while maintaining brand presence via the purple logo area.
Output: Updated navbar CSS, JS scroll behavior, and HTML class.
</objective>

<execution_context>
@/Users/sergej/.claude/get-shit-done/workflows/execute-plan.md
@/Users/sergej/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@index.html (lines 40-81 — nav markup)
@static/css/override.css (lines 396-455 — navbar styles, lines 544-549 — .texture-purple)
@static/js/script.js (lines 128-151 — smart header scroll logic)
@static/css/iphone.css (lines 27-46 — mobile navbar)
@static/css/ipad.css (lines 18-25 — tablet navbar)

<interfaces>
<!-- Current navbar structure in index.html -->
```html
<nav class="site-navbar texture-purple">
  <div class="container navbar-container">
    <div class="navbar-left">...</div>
    <div class="navbar-center">
      <a href="/" class="navbar-logo-link">
        <img src="static/img/axioma-logo-white.svg" alt="Axioma" class="navbar-logo">
      </a>
    </div>
    <div class="navbar-right">...</div>
    <button class="navbar-hamburger">...</button>
  </div>
</nav>
```

<!-- Current CSS custom properties -->
```css
--color-purple: #5e186e;
```

<!-- Current .texture-purple utility -->
```css
.texture-purple {
  background-color: var(--color-purple);
  background-image: url('../img/texture-purple.jpg');
  background-position: 0 0;
  background-size: 200px;
}
```

<!-- Current .site-navbar styles -->
```css
.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: transform 0.3s ease;
}
.site-navbar.navbar-hidden {
  transform: translateY(-100%);
}
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update HTML and CSS for transparent-to-purple header transition</name>
  <files>index.html, static/css/override.css, static/css/iphone.css, static/css/ipad.css</files>
  <action>
**index.html (line 41):**
Remove `texture-purple` class from the nav element. Change:
`<nav class="site-navbar texture-purple">` to `<nav class="site-navbar">`

**static/css/override.css — navbar section (around lines 399-410):**

1. Update `.site-navbar` — make transparent by default:
```css
.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: transparent;
  transition: background-color 0.4s ease, background-image 0.4s ease;
}
```

2. Delete the `.site-navbar.navbar-hidden` rule entirely (lines 408-410). Hide-on-scroll is being removed.

3. Add `.navbar-center` purple pill styling. Update the existing `.navbar-center` rule (lines 426-430) to include the purple textured background as a contained shape:
```css
.navbar-center {
  width: auto;
  min-width: 5rem;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 0 0 1rem 1rem;
  background-color: var(--color-purple);
  background-image: url('../img/texture-purple.jpg');
  background-position: 0 0;
  background-size: 200px;
  transition: background-color 0.4s ease, padding 0.4s ease, border-radius 0.4s ease;
}
```

4. Add the scrolled state — full purple bar. Place right after `.site-navbar`:
```css
.site-navbar.navbar-scrolled {
  background-color: var(--color-purple);
  background-image: url('../img/texture-purple.jpg');
  background-position: 0 0;
  background-size: 200px;
}
```

5. When scrolled, the navbar-center pill merges into the bar (remove its standalone pill look):
```css
.site-navbar.navbar-scrolled .navbar-center {
  background-color: transparent;
  background-image: none;
  border-radius: 0;
  padding: 0.5rem 0;
}
```

**static/css/iphone.css:**
No changes needed to `.navbar-center` mobile override (it already uses `width: auto; flex: 1; justify-content: flex-start`). The purple pill and scrolled states will work naturally. However, ensure `.navbar-center` on mobile also has the pill styling — add after the existing `.navbar-center` rule:
```css
.site-navbar.navbar-scrolled .navbar-center {
  background-color: transparent;
  background-image: none;
  border-radius: 0;
}
```

**static/css/ipad.css:**
Add the same scrolled override for consistency:
```css
.site-navbar.navbar-scrolled .navbar-center {
  background-color: transparent;
  background-image: none;
  border-radius: 0;
}
```

**Key considerations:**
- The white logo SVG works on both transparent (over hero imagery) and purple backgrounds, so no logo swap is needed.
- The `.navbar-left` and `.navbar-right` text/buttons are white, which works on both transparent (hero) and purple backgrounds. If contrast is an issue on transparent state, that is a visual check for the user.
- The `transition` on `.site-navbar` uses `background-color` and `background-image` instead of the old `transform` (which was for hide/show).
  </action>
  <verify>
    <automated>grep -c "navbar-hidden" /Users/sergej/DEV/MY/axioma-web/static/css/override.css | xargs test 0 -eq && grep -c "navbar-scrolled" /Users/sergej/DEV/MY/axioma-web/static/css/override.css | xargs test 0 -lt && grep -c "texture-purple" /Users/sergej/DEV/MY/axioma-web/index.html | head -1 && echo "CSS check passed"</automated>
  </verify>
  <done>
- Nav element in index.html has no `texture-purple` class
- `.site-navbar` defaults to transparent background
- `.navbar-center` has purple textured pill shape (rounded bottom corners)
- `.site-navbar.navbar-scrolled` applies full purple textured bar
- `.navbar-center` pill styling dissolves when `.navbar-scrolled` is active
- `.navbar-hidden` CSS rule is removed
- Responsive files updated for scrolled state
  </done>
</task>

<task type="auto">
  <name>Task 2: Replace hide-on-scroll JS with transparent-to-purple scroll toggle</name>
  <files>static/js/script.js</files>
  <action>
**static/js/script.js (lines 128-151):**

Replace the entire "Smart header" block (lines 128-151) with a new scroll listener that toggles `.navbar-scrolled`:

```javascript
// -----------------------------------------------
// Navbar: transparent at top, purple on scroll
// -----------------------------------------------
var navbarScrollThreshold = 50;

$(window).on('scroll', function () {
  var currentScrollY = window.pageYOffset;

  if (currentScrollY > navbarScrollThreshold) {
    $('.site-navbar').addClass('navbar-scrolled');
  } else {
    $('.site-navbar').removeClass('navbar-scrolled');
  }
});
```

This removes:
- The `lastScrollY` variable
- The directional scroll detection (up vs down)
- All `navbar-hidden` class toggling
- The header is always visible (sticky), never hidden

The threshold of 50px keeps a small buffer before the transition triggers, preventing flicker at the very top.
  </action>
  <verify>
    <automated>grep -c "navbar-hidden" /Users/sergej/DEV/MY/axioma-web/static/js/script.js | xargs test 0 -eq && grep -c "navbar-scrolled" /Users/sergej/DEV/MY/axioma-web/static/js/script.js | xargs test 0 -lt && echo "JS check passed"</automated>
  </verify>
  <done>
- Old hide-on-scroll logic is completely removed (no `navbar-hidden` references in script.js)
- New scroll listener toggles `navbar-scrolled` class on `.site-navbar`
- Scrolling past 50px adds the class; scrolling back to top removes it
- Header never hides — always visible and sticky
  </done>
</task>

</tasks>

<verification>
1. Open index.html in browser
2. At page top: header should be transparent with only a purple pill behind the logo
3. Scroll down past ~50px: entire header smoothly transitions to full purple textured bar
4. The purple pill on the logo area should visually merge into the full bar
5. Scroll back to top: header returns to transparent with purple pill only
6. At no point should the header hide or slide up — always sticky
7. Test on mobile viewport: same transparent-to-purple behavior
</verification>

<success_criteria>
- Header is transparent at page load with purple logo pill
- Smooth transition to full purple bar on scroll
- Header never hides (always sticky at top)
- Transition reverses when scrolling back to top
- No references to `navbar-hidden` in CSS or JS
- Works on desktop, tablet, and mobile viewports
</success_criteria>

<output>
After completion, create `.planning/quick/260317-jyo-header-transparent-initially-with-purple/260317-jyo-SUMMARY.md`
</output>
