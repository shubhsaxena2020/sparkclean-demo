# 01_ARCHITECTURE.md — SparkClean Technical Spec

> Derives from 00_RESEARCH.md. Separate project from the portfolio.
> Stack pinned to current stable (June 2026), same as portfolio so Claude
> Code is on familiar ground.

## Identity
- Business: SparkClean (fictional demo)
- Positioning: "Toronto's trusted home cleaning — eco-friendly, insured,
  booked online in 60 seconds."
- Local & family-owned framing. Serves the GTA.
- Phone (fake, real format): (416) 555-0192
- Email (fake): hello@sparkclean.ca
- This is a DEMO portfolio piece. A small "✦ DEMO" pill sits in the header.

## Stack
| Layer | Choice | Target |
|------|--------|--------|
| Framework | Next.js App Router | ^16.2 (NOT 14 — EOL) |
| Runtime | React / React DOM | ^19 |
| Node | Node.js | ≥20 |
| Language | TypeScript | ^5 strict |
| Styling | Tailwind CSS | ^4 (CSS-first @theme) |
| Motion | Framer Motion | ^12 (scroll reveals, hovers) |
| Fonts | next/font/google | Plus Jakarta Sans + Inter |
| Calculator | pure React state | no backend |
| Deploy | Vercel (separate project) | free subdomain |
| Repo | github.com/shubhsaxena2020/sparkclean-demo | public |

NO 3D, NO particle cursor, NO heavy libs. NO stock images — inline SVG only.

## Design tokens (globals.css @theme)
```
--color-bg:        #FFFFFF
--color-surface:   #F4FBF8   /* faint mint card bg */
--color-ink:       #0F1A17   /* near-black green-tinted text */
--color-primary:   #0FB67E   /* fresh clean green */
--color-primary-d: #0A8C60   /* darker green (hover/headings accents) */
--color-accent:    #FFC53D   /* warm yellow — booking CTAs */
--color-muted:     #66726E
--color-border:    #E3EAE7
--radius: 16px
--maxw: 1180px
--ease: cubic-bezier(0.22, 1, 0.36, 1)
```
Fonts: Plus Jakarta Sans (display/headings, friendly-modern), Inter (body).
Feel target: Stripe/Airbnb cleanliness — white space, soft shadows, rounded,
green accents, one warm-yellow CTA color used only for booking actions.

## File structure
```
sparkclean/
├── app/
│   ├── layout.tsx        # fonts, metadata, header, footer wrap
│   ├── page.tsx          # composes all sections
│   └── globals.css       # @theme tokens + base
├── components/
│   ├── Header.tsx        # sticky; logo + nav + phone + Book Now + DEMO pill
│   ├── Hero.tsx          # dual CTA + trust badges + clean SVG art
│   ├── TrustBar.tsx      # insured / eco / screened / guarantee strip
│   ├── Services.tsx      # service cards (residential menu)
│   ├── Calculator.tsx    # ★ instant price estimator (the hero feature)
│   ├── HowItWorks.tsx    # 3 steps
│   ├── Pricing.tsx       # plan cards w/ recurring discount note
│   ├── Reviews.tsx       # Google-style reviews, name+area+date
│   ├── ServiceAreas.tsx  # GTA neighbourhood list
│   ├── FounderStory.tsx  # local family-owned block
│   ├── CTABanner.tsx     # full-width green conversion band
│   └── Footer.tsx        # contact + areas + "built by Shubh" credit
├── lib/
│   └── pricing.ts        # typed pricing rules for the calculator
├── public/               # favicon, og.png (SVG art inline, no photos)
└── config files
```

## ★ Calculator spec (the centerpiece — build this well)
Pure client-side React. No backend. Lives in its own section AND is the
target of the hero "Calculate Your Price" CTA (smooth-scroll to it).

Inputs (simple, few — research says short flows convert):
- Service type: Standard Clean / Deep Clean / Move-in-out (select)
- Bedrooms: 0(studio)–5+ (stepper or select)
- Bathrooms: 1–4+ (stepper or select)
- Frequency: One-time / Weekly / Bi-weekly / Monthly (select)

Pricing logic (lib/pricing.ts, lands in real GTA band ~$120–$520):
```
base by service:  Standard 109 | Deep 179 | Move 229
+ per bedroom:    Standard 20 | Deep 30 | Move 35   (studio counts as 0)
+ per bathroom beyond 1: Standard 18 | Deep 25 | Move 30
frequency discount applied to the total:
  One-time 0% | Monthly 5% | Bi-weekly 12% | Weekly 18%
Round to nearest $5. Clamp display to the real band.
```
Output: a live-updating estimated price (animate the number when it changes),
a short "what's included" line for the chosen service, the frequency-discount
badge ("save 18% with weekly"), and a primary **"Book this clean →"** button
that opens https://ig.me/m/shubh_builds_ in a new tab with the selection
summarized in nearby helper text ("Tell us your address and preferred time in
the DM"). Show a small "estimate only — final quote confirmed on booking" note
(honest + matches how real GTA sites word it).
Fully responsive; keyboard accessible; reduced-motion safe (no number-roll
animation when reduced).

## Component contracts (brief)
- **Header:** sticky, white + subtle shadow after scroll. Left: SparkClean
  wordmark (primary green). Center (desktop): Services · Pricing · Reviews ·
  Areas. Right: phone `(416) 555-0192` as a tel: link + **Book Now** (accent)
  + small muted "✦ DEMO" pill. Mobile: hamburger; phone + Book Now stay
  visible.
- **Hero:** H1 "A spotless home, booked in 60 seconds." Sub: eco/insured/GTA
  line. Dual CTA: **Book Now** (accent, → IG DM) + **Calculate Price**
  (outline green, → scroll to Calculator). Trust badge row under CTAs. Right:
  clean inline-SVG illustration (sparkle/leaf/home motif — NOT a photo).
- **TrustBar:** horizontal strip: ✓ Insured & Bonded · ✓ Eco-Friendly
  Products · ✓ Background-Checked Cleaners · ✓ 100% Satisfaction Guarantee.
- **Services:** "What we clean." Cards: Recurring Home Clean, Deep Clean,
  Move-In/Out, Condo & Apartment, Post-Construction, Office (secondary).
  Inline SVG icon each; hover lift + green top-border.
- **HowItWorks:** "Booked in 60 seconds." 3 steps: Pick service & get instant
  price → Choose a time → Insured pros show up (eco products). Connecting line
  desktop.
- **Pricing:** 3 plan cards mapped to calculator base tiers; middle (Deep)
  featured "MOST BOOKED"; note "recurring plans save up to 18%". CTAs → IG DM.
- **Reviews:** "GTA homeowners trust SparkClean." 3 Google-style cards: 5
  gold stars, quote, "Name · Neighbourhood · date". Use the realistic ones in
  02_CONTENT.
- **ServiceAreas:** "Proudly serving the GTA." Pill/grid list of
  neighbourhoods (from 00_RESEARCH list).
- **FounderStory:** short "local & family-owned" paragraph + a small founder
  avatar (initials block, no fake face). Indie-edge trust.
- **CTABanner:** full-width primary-green band, white headline "Ready for a
  spotless space?", Book Now (accent) → IG DM.
- **Footer:** dark (--ink). Logo + tagline, quick links, phone/email, GTA
  areas line, and REQUIRED credit: "Demo site built by Shubh Saxena —
  shubhbuilds.com" (link). Tiny line: "Booking-system integration available
  on request."

## Booking behaviour (demo)
Every Book/CTA and the calculator's final button → open
`https://ig.me/m/shubh_builds_` in a new tab (noopener,noreferrer). No forms,
no SaaS. (00_RESEARCH explains why real booking SaaS is out of scope for the
demo.)

## Motion (professional, restrained)
- Scroll reveals (Framer whileInView): opacity 0→1, y 20→0, 0.5s, --ease,
  once; stagger 0.08–0.1s in groups.
- Card hover: y -4px + shadow, 0.2s.
- Calculator price: count/roll animation on change (skip on reduced-motion).
- NO cursor FX, NO 3D, NO parallax planets. Speed + polish = premium here.

## Accessibility & perf
- 360px min; sticky header collapses to hamburger; cards single-column.
- Labels on all calculator inputs; aria-live on the price output.
- focus-visible rings in primary green. Semantic landmarks, one h1.
- Inline SVG only (no images) → fast. Target Lighthouse 95+.
- prefers-reduced-motion → reveals/number-roll become instant final states.

## Deploy
Separate repo + Vercel project. `vercel --prod` or GitHub import. Free
subdomain (e.g. sparkclean-gta.vercel.app). After live: screenshot →
portfolio public/work/sparkclean.png, add as build_04 in portfolio
lib/projects.ts, set hasImage:true, link the live URL.
