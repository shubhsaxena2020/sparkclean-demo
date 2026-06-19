# 08_MULTIPAGE_ARCHITECTURE.md — SparkClean v2 (multi-page)

> What this is: turn the current strong single-page SparkClean into a real
> multi-page site (Home + Services + Areas + About/Reviews), inspired by the
> STRUCTURE of merrymaids.ca / mollymaid.ca / impact.ca — NOT their visuals,
> code, or copy. Keep our own light/white/green design. Keep the calculator
> math, all copy, and all booking links unchanged.
>
> Stack stays: Next.js 16 (App Router) / React 19 / TypeScript / Tailwind 4 /
> Framer Motion. No new heavy deps. No WebGL, no 3D, no cursor FX.

---

## DESIGN PRINCIPLES (hold these)
- LIGHT site: white + faint mint (#F2FBF7) sections, ink text, green accents,
  yellow booking CTAs. Dark ONLY in footer. (Unchanged from current site.)
- Premium = SPACE + TYPOGRAPHY + SOFT DEPTH + REAL PHOTOS + calm motion.
- Every page must get a visitor toward Book (IG DM) or the calculator fast.
- Mobile-first. Fast. Lighthouse perf ≥ 90, a11y ≥ 95.
- Borrow from references: sticky header w/ nav, service-area depth, "why us"
  trust density, FAQ, multi-page feel. Do NOT copy their layouts/CSS/images.

---

## ROUTES (App Router)
```
app/
  layout.tsx            # root: <Header/> + page + <Footer/>, fonts, metadata
  page.tsx              # HOME (/)
  globals.css
  services/page.tsx     # /services
  areas/page.tsx        # /areas
  about/page.tsx        # /about   (About + Why Us + Reviews + FAQ)
  not-found.tsx         # simple branded 404
```
Notes:
- Keep ONE shared Header and Footer in layout.tsx so nav is consistent.
- Each page exports its own `metadata` (title + description) for SEO.
- Reuse existing section components; don't rebuild them.

---

## SHARED CHROME

### Header (sticky, shared) — upgrade from current
- Left: green sparkle logo + "SparkClean" + `✦ DEMO` pill.
- Center/right nav links → Home, Services, Areas, About. Active link gets a
  green underline / green text (use `usePathname()` to mark active).
- Right: phone (with phone glyph) + yellow "Book Now" pill → IG DM.
- Mobile: hamburger → slide/expand menu containing nav links + phone +
  Book Now (all reachable). Keep it accessible (focus trap optional, aria).
- On scroll: subtle white bg + hairline bottom border (already have logic).

### Footer (shared) — keep current dark footer
- Columns: brand + blurb / Explore (now real page links) / Contact.
- Keep the required credit EXACTLY:
  "Demo site built by Shubh Saxena — shubhbuilds.com" → https://shubhbuilds.com
- Keep "Live booking-system integration available on request."

---

## PAGE COMPOSITION (reuse existing components)

### HOME (/)  — the strong overview, with "see more" links
1. Hero (with subtle CSS/SVG parallax — see 09 polish doc)
2. TrustBar
3. Stats band
4. Services PREVIEW: show the 6 service cards (or top 3) + a
   "View all services →" link to /services
5. Calculator (the centerpiece — full, working, unchanged math)
6. HowItWorks
7. Pricing (3 tiers)
8. Reviews PREVIEW: 3 cards + "Read more reviews →" to /about#reviews
9. "OUR WORK" photo strip (the 3 bright images — keep)
10. ServiceAreas PREVIEW: pills + "See all areas →" to /areas
11. FounderStory teaser + "About us →" to /about
12. CTABanner (green)
Home should still feel complete on its own.

### /services
- Page hero (small): eyebrow "WHAT WE CLEAN" + h1 "Cleaning services for
  every Toronto home." + short intro line. (Write neutral new copy — do not
  copy reference sites.)
- Full Services grid (all 6 cards, richer: keep icon, add the one-line
  description already in content; optionally a small bright photo per card).
- A "What's included" sub-section: reuse the pricing feature lists as
  plain check-lists (Standard/Deep/Move included items).
- Mini-calculator CTA band: "Get your instant price →" linking to /#calculator
  (or embed the calculator here too — embedding is nicer; reuse component).
- CTABanner at the bottom.

### /areas
- Page hero: eyebrow "SERVICE AREAS" + h1 "Proudly serving the Greater
  Toronto Area." + intro.
- The 12 neighbourhood pills, larger, in a clean grid (this mirrors how
  Molly Maid/Merry Maids lean on local-area depth for trust + SEO).
- A short "Don't see your area? Send us a DM" line → IG DM.
- Optional: a simple static map image OR a tidy 2-column list of areas with a
  one-line blurb each (keeps it substantial). No live map embed needed.
- CTABanner at the bottom.

### /about  (About + Why Us + Reviews + FAQ)
- Page hero: eyebrow "ABOUT" + h1 "Local, and we act like it." + intro.
- FounderStory (full, with the photo).
- "Why choose SparkClean" trust grid: Insured & Bonded, Eco-Friendly,
  Background-Checked, 100% Guarantee, Instant Pricing, Family-Owned — as
  6 small cards with green icons. (Trust density like the reference sites.)
- Stats band (reuse).
- Reviews (full section, `id="reviews"` so Home can deep-link) — all cards +
  the big quote-mark + trust pills + the demo-content disclaimer.
- FAQ: 5-6 Q&As in an accessible accordion (write NEW, original, generic
  cleaning FAQ copy — do NOT copy Merry Maids' FAQ text). Examples of topics:
  supplies/equipment, pet & kid safe products, rescheduling, what's included,
  satisfaction guarantee, service areas.
- CTABanner at the bottom.

---

## COMPONENT REUSE MAP
Existing components stay; we just compose them across pages:
- Header, Footer → layout.tsx (shared)
- Hero, TrustBar, Stats, Services, Calculator, HowItWorks, Pricing, Reviews,
  WorkStrip, ServiceAreas, FounderStory, CTABanner → imported where needed.
- New tiny components: `PageHero` (eyebrow + h1 + intro, reused on subpages),
  `FAQ` (accordion), `WhyUs` (trust grid), `ServicesFull`, `AreasFull`.
- A `SectionReveal` wrapper (already exists as Reveal) used everywhere.

---

## SEO METADATA (per page)
- / → "SparkClean — Toronto's Trusted Home Cleaning, Booked in 60 Seconds"
- /services → "Cleaning Services in the GTA | SparkClean"
- /areas → "Service Areas Across the Greater Toronto Area | SparkClean"
- /about → "About SparkClean — Local, Family-Owned GTA Cleaning"
Each with a matching description. Keep themeColor #0fb67e, icon.svg favicon.

---

## HARD RULES
- Do NOT change calculator math (lib/pricing.ts). Default 2bd/1ba bi-weekly
  = $130 (was $150).
- Do NOT change existing copy text; new pages get NEW original copy only.
- Do NOT copy any layout, CSS, code, or text from merrymaids.ca, mollymaid.ca,
  or impact.ca. Borrow structure/patterns only; design stays our own.
- All Book/CTA/calculator buttons → https://ig.me/m/shubh_builds_ (new tab).
- Keep footer credit line.
- No WebGL, 3D, particles, or custom cursor.
- Keep the light theme; dark only in footer.

---

## ACCEPTANCE
- 4 routes work: /, /services, /areas, /about (+ 404).
- Shared header nav highlights the active page; mobile menu works.
- Calculator still computes correctly (test on /services if embedded too).
- All pages: light, on-brand, fast, mobile-clean, no horizontal scroll.
- Every page can reach Book (IG DM) within one screen/scroll.
- npm run build clean, zero type errors.
