# Feature Research

**Domain:** Residential complex marketing homepage (new-build, Lithuanian market)
**Researched:** 2026-03-13
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features visitors assume a residential complex homepage has. Missing any of these means the page feels unfinished or untrustworthy, and visitors leave before converting.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-screen hero with video/image slider | First impression is everything in real estate; every competitor (portofranko.lt, riverland.lt, romeoirdziuljeta.lt) uses a hero slider. Video background communicates premium quality. | MEDIUM | 3 slides with video backgrounds (MP4/WebM), autoplay, loop, overlay text + CTA. Already in Webflow export. Main complexity: custom slider without Webflow runtime. |
| Sticky navigation with logo + primary CTA | Visitors need persistent access to navigation and the primary action ("Register for viewing"). All three reference sites have sticky navs with CTA buttons. | MEDIUM | Logo swap on scroll (white to colored), mobile hamburger menu, "Registruotis i apziura" button always visible. |
| About / project philosophy section | Buyers need to understand what makes this development unique before looking at apartments. Every reference site has this. | LOW | Heading, 2 paragraphs, "About project" link. Animated counters (60+ residences, area m2, completion year). |
| Key stats / animated counters | Numbers build credibility and communicate scale. portofranko.lt shows sales progress; Axioma Webflow shows unit count, area, timeline. | MEDIUM | Scroll-triggered number animation (counter "train" effect from Webflow). Three stat cards. |
| Contact form with POST submission | Lead capture is the primary conversion goal. All reference sites have contact forms. | LOW | Name, email, phone, message, checkbox for terms consent. `<form method="post">`. No AJAX per project constraints. |
| Sales team contact cards | Named contacts with photos, phone numbers, and emails build trust. portofranko.lt has 5 agents; Axioma Webflow has 5. romeoirdziuljeta.lt has 2. | LOW | Photo, name, phone (tel: link), email (mailto: link) for each agent. |
| Responsive layout (desktop, tablet, mobile) | Over 58% of traffic is mobile. Non-negotiable. | MEDIUM | Separate CSS files: override.css (desktop), ipad.css (768-1024px), iphone.css (<=900px). No inline media queries per project convention. |
| Footer with navigation, social links, legal | Standard website hygiene. All reference sites include quick links, social icons, developer attribution, privacy policy link. | LOW | Logo, quick links (About, Apartments, Location, Gallery, Contacts), Facebook + Instagram, copyright, developer credit, other project logos. |
| Lithuanian language throughout | Target market is Lithuanian buyers. All reference sites are in Lithuanian. | LOW | All UI text, headings, form labels, CTAs in Lithuanian. Already partially in Webflow export. |
| Scroll-triggered fade-in animations | Premium feel expected for new-build marketing. All reference sites use entry animations on scroll. Absence makes the page feel flat/cheap. | MEDIUM | Elements fade in + translate up on scroll into viewport. Webflow uses GSAP ScrollTrigger; production needs jQuery-based equivalent or CSS-only intersection observer approach. |

### Differentiators (Competitive Advantage)

Features that set Axioma apart from the competitor reference sites and improve conversion rate. Not strictly required, but valuable for lead generation.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "Discover" content cards with hover image reveals | Communicates project pillars (spatial comfort, engineering, location) in an engaging visual format. More sophisticated than plain text sections on reference sites. | MEDIUM | Three numbered cards (01, 02, 03) with image + overlay animation on hover. Webflow has image reveal layers. |
| Location proximity section ("Measured in minutes") | Interactive display showing walking times to amenities (park, city center, mall, school, airport). More engaging than static text on reference sites. | HIGH | Animated circular progress loader (Lottie), rotating text labels, expanding number circles. Most complex section to reproduce without Webflow interactions. |
| Construction progress timeline | Builds buyer confidence that the project is real and on schedule. portofranko.lt shows sales progress %; Axioma shows a quarter-by-quarter build timeline (Q4 2024 through Q4 2026). | MEDIUM | Horizontal timeline with quarterly milestones, progress line indicator, construction photo background. Content is semi-dynamic (PHP marker for updates). |
| Floating popup/CTA widget | Persistent contact options (phone, social links) without cluttering the page. Scroll-triggered appearance creates urgency at the right moment. | MEDIUM | Fixed-position widget on right side, slides in after scrolling past hero. Contains phone CTA with confetti Lottie animation on hover, social link, promotional image. Hidden on mobile (<998px). |
| Animated button hover effects (text swap) | Micro-interactions signal premium quality. Two-line text swap on hover (text slides up, alternate text slides in) is more polished than simple color changes on reference sites. | LOW | CSS transition on `.text-wrap` elements. Both "in" and "out" text divs with translateY transition. |
| Hero "scroll down" indicator | Reduces bounce rate by signaling there is more content below the fold. Subtle but effective. | LOW | Animated arrow + "Scroll down" text at bottom of hero, smooth scroll to #about section. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem like good ideas for a homepage but should be deliberately excluded from this milestone.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Apartment listing / price table on homepage | "Show apartments immediately" | Homepage job is to create desire and capture leads, not to be a product catalog. Premature detail kills the narrative flow. Price tables on the homepage also get outdated and create PHP dependency for a homepage-only milestone. | Link "Rinktis buta" (Choose apartment) to the future apartments page. Keep homepage focused on brand story and lead capture. |
| Interactive SVG apartment map on homepage | Reference sites have SVG maps | Maps are a feature for the dedicated apartments page. Adding one to the homepage adds massive complexity (SVG polygon interactions, tooltip data, status rendering) to a page that should be clean marketing. | Reserve SVG maps for the apartments milestone. Homepage CTA drives visitors to that page. |
| Live chat widget | "Instant communication" | Requires backend infrastructure (chat server, agent availability), ongoing operational commitment, and adds JS payload. The floating phone/social CTA widget already provides instant contact paths. | Floating CTA widget with direct phone link + social links. Phone calls convert better than chat for real estate. |
| Newsletter subscription form (separate from contact) | portofranko.lt and romeoirdziuljeta.lt have email subscription | Splits the lead funnel. Two forms on one page confuse the conversion goal. The contact form already captures email. A separate newsletter adds form fatigue and requires email marketing infrastructure (Omnisend, Mailchimp) which is backend developer's domain. | Single contact form captures all leads. Backend developer can add newsletter opt-in checkbox to the contact form later. |
| Parallax scrolling backgrounds | "Premium feel" | Heavy parallax creates performance issues on mobile, conflicts with the separate-CSS-file responsive approach, and is a major accessibility concern (motion sensitivity). Subtle fade-ins achieve the same premium effect. | Scroll-triggered fade-in animations + subtle scale effects on images. Achievable with CSS transitions + Intersection Observer. |
| Apartment search/filter on homepage | "Let users find apartments quickly" | Requires mock data rendering, filtering logic, and creates a mini-app on what should be a static marketing page. Adds JavaScript complexity and PHP handoff burden. | CTA button linking to future apartments page with full search functionality. |
| Video autoplay with sound | "Immersive experience" | Browsers block autoplay with sound. Users find unexpected audio annoying and immediately leave. Damages trust. | Muted autoplay with optional unmute button (current Webflow approach is correct: muted + playsinline). |
| Cookie consent banner | GDPR compliance | Important but belongs to the backend developer's deployment scope. Adding it in the frontend milestone creates PHP handoff conflicts since the banner needs to actually control cookies (analytics, pixels). | Add `<!-- PHP: cookie consent banner -->` marker. Backend developer implements with actual cookie management at deployment. |

## Feature Dependencies

```
[Sticky Navbar]
    └──requires──> [Hero Section] (scroll offset detection needs hero height)

[Scroll-triggered Animations]
    └──requires──> [All Content Sections] (animations apply to section elements)

[Floating CTA Widget]
    └──requires──> [Hero Section] (appears after scrolling past hero)

[Construction Timeline]
    └──requires──> [About Section] (narrative flow: who we are → what we build → when it's done)

[Contact Form]
    └──requires──> [Sales Team Cards] (form establishes intent, team cards personalize follow-up)

[Animated Counters]
    └──enhances──> [About Section] (counters add quantitative proof to qualitative claims)

[Location Proximity Section]
    └──enhances──> [Discover Cards] (discover cards introduce location as a pillar, proximity section proves it)

[Button Hover Effects]
    └──enhances──> [All CTAs] (applied uniformly across hero, navbar, discover cards)
```

### Dependency Notes

- **Sticky Navbar requires Hero Section:** The navbar transition (transparent to solid background) triggers based on scroll position relative to the hero section height. Hero must be implemented first.
- **Floating CTA Widget requires Hero Section:** Widget visibility is toggled by scroll position past the hero. Without the hero, there is no trigger point.
- **Scroll-triggered Animations require All Content Sections:** Animations are decorative enhancements applied after structural HTML/CSS is complete. Building animations before content leads to rework.
- **Construction Timeline requires About Section:** In the page narrative, the about section establishes the project identity; the timeline then proves execution commitment. Building the timeline before the about section breaks the storytelling flow and makes testing harder.

## MVP Definition

### Launch With (v1 — Homepage Milestone)

Minimum viable homepage that converts visitors to leads while matching the Webflow design.

- [x] Hero with video slider (3 slides, video backgrounds, CTA) — first impression drives or kills engagement
- [x] Sticky navbar with logo, navigation links, primary CTA button — persistent navigation and conversion path
- [x] About section with animated counters — establishes project credibility
- [x] Discover section (3 content cards) — communicates value pillars
- [x] Contact form with sales team cards — primary lead capture mechanism
- [x] Footer with links, social icons, legal — standard page completion
- [x] Responsive layout (desktop, tablet, mobile) — majority of traffic is mobile
- [x] Scroll-triggered fade-in animations — premium feel, expected in this market
- [x] Lithuanian text throughout — target market requirement
- [x] PHP handoff markers on all dynamic content — enables backend integration

### Add After Core Is Working (v1.x — Same Milestone, Later Phase)

Features to layer on after the structural sections are solid and responsive.

- [ ] Location proximity section ("Measured in minutes") — most complex animation, can be added after core sections work
- [ ] Construction progress timeline — semi-dynamic content, add after static sections are stable
- [ ] Floating CTA popup widget — enhancement layer, add after page scroll behavior is finalized
- [ ] Confetti Lottie animation on popup hover — decorative polish, last priority
- [ ] Button text-swap hover effects — micro-interaction polish, can be added globally once all buttons exist

### Future Consideration (v2+ — Other Milestones)

Features that belong to other pages or require backend infrastructure.

- [ ] Interactive SVG apartment maps — apartments page milestone
- [ ] Apartment listing with filters — apartments page milestone
- [ ] Photo gallery with Fancybox lightbox — gallery page milestone
- [ ] Google Maps with custom markers — location page milestone
- [ ] jQuery UI datepicker viewing registration — contacts page or popup milestone
- [ ] Cookie consent implementation — backend deployment scope

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero with video slider | HIGH | HIGH | P1 |
| Sticky navbar + mobile menu | HIGH | MEDIUM | P1 |
| About section + counters | HIGH | MEDIUM | P1 |
| Contact form + team cards | HIGH | LOW | P1 |
| Footer | MEDIUM | LOW | P1 |
| Responsive layout | HIGH | MEDIUM | P1 |
| Scroll-triggered animations | MEDIUM | MEDIUM | P1 |
| Discover content cards | MEDIUM | MEDIUM | P1 |
| Lithuanian localization | HIGH | LOW | P1 |
| PHP handoff markers | HIGH | LOW | P1 |
| Construction timeline | MEDIUM | MEDIUM | P2 |
| Location proximity section | MEDIUM | HIGH | P2 |
| Floating CTA widget | MEDIUM | MEDIUM | P2 |
| Button hover animations | LOW | LOW | P2 |
| Confetti Lottie animation | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for homepage launch — structural sections, lead capture, responsiveness
- P2: Should have, add in later phase of same milestone — enhances conversion and polish
- P3: Nice to have, lowest priority — decorative effects that don't impact conversion

## Competitor Feature Analysis

| Feature | portofranko.lt | riverland.lt | romeoirdziuljeta.lt | Axioma (Our Approach) |
|---------|---------------|--------------|---------------------|-----------------------|
| Hero section | Image slider with CTA | Image with price highlights | Image with tagline | Video slider with CTA (premium differentiator) |
| Sales progress | Percentage bars (38% available) | Phase messaging ("Phase 3 is final") | Not prominent | Construction timeline (more informative than percentages) |
| Agent contacts | 5 agents with photo/phone/email | 5 agents with photo/phone/email | 2 agents with phone/email | 5 agents with photo/phone/email (matches market standard) |
| Contact form | Yes, with calendar booking | Yes, basic form | Yes, email subscription | Basic form (calendar booking is future milestone) |
| Location info | Text description | Distance metrics, amenities list | Walking time distances | Animated proximity circles (more engaging) |
| Amenities section | Text with icons | Detailed with EV charging, sports | Brief highlights | Discover cards with image reveals (premium feel) |
| Floating CTA | Not observed | Phone button on mobile | Not observed | Floating widget with phone + social (competitive advantage) |
| Construction updates | Not prominent on homepage | Phase-based messaging | Not on homepage | Timeline with quarterly milestones (transparency differentiator) |
| Animations | Standard fade-ins | Minimal | Minimal | GSAP-level scroll animations (premium differentiator) |
| Mobile optimization | Responsive | Responsive with phone CTA | Responsive | Three-tier responsive (desktop/tablet/phone separate CSS) |

## Sources

- portofranko.lt — Primary reference site, same backend developer (fetched 2026-03-13)
- riverland.lt — Reference site with calendar booking, same developer (fetched 2026-03-13)
- romeoirdziuljeta.lt — Reference site with SVG maps, same developer (fetched 2026-03-13)
- [8 Features to Make Your Apartment Website Design More Engaging | StrategyBeam](https://www.strategybeam.com/blog/8-features-to-make-your-apartment-website-design-more-engaging/)
- [What Worked in 2025: Proven Marketing Strategies That Filled Apartments Faster | Conversion Logix](https://conversionlogix.com/blog/what-worked-in-2025-proven-marketing-strategies-that-filled-apartments-faster/)
- [15 Real Estate Landing Page Best Practices | Landingi](https://landingi.com/landing-page/real-estate-best-practices/)
- [53 Real Estate Website Call-to-Action Examples | Agent Image](https://www.agentimage.com/blog/real-estate-website-call-to-action/)
- Axioma Webflow export (webflow-export/index.html) — design reference

---
*Feature research for: Axioma residential complex homepage*
*Researched: 2026-03-13*
