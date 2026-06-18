# 03_BUILD_PROMPT.md — Paste Into Claude Code

> SETUP FIRST (terminal):
>   cd C:\Users\shubh.LAPTOP-FDPKIM1J
>   mkdir sparkclean
>   cd sparkclean
> Then drop docs 00/01/02 into a docs/ folder inside it, open Claude Code
> pointed at the sparkclean folder, and paste everything between === lines.

===

Read docs/00_RESEARCH.md, docs/01_ARCHITECTURE.md, and docs/02_CONTENT.md
fully before writing any code. They are the contract.
- 00 is WHY (GTA cleaning conversion research) — it justifies every feature.
- 01 is the technical spec, tokens, file tree, component contracts, and the
  calculator logic.
- 02 is the exact copy and the demo reviews.

PROJECT: Build a complete, production-ready demo website for a fictional
Toronto/GTA cleaning company called SparkClean. This is a portfolio piece that
must look like real, paid client work — specifically the kind that justifies a
$300–$1,000 build. It is a SEPARATE project from my portfolio: fresh Next.js
app, its own repo, its own Vercel deploy.

STACK (per 01, current June 2026 — do NOT use Next 14, it's EOL):
Next.js ^16.2 App Router, React ^19, TypeScript ^5 strict, Tailwind ^4
(CSS-first @theme in globals.css), Framer Motion ^12, next/font/google
(Plus Jakarta Sans + Inter). NO 3D, NO particle cursor, NO icon library,
NO stock photos — inline SVG only.

DESIGN: light, fresh, trustworthy — Stripe/Airbnb cleanliness. White space,
soft shadows, rounded corners, fresh green (--color-primary) accents, one
warm-yellow (--color-accent) used ONLY for booking CTAs. Put the exact tokens
from 01 into globals.css as the single source of truth.

BUILD ALL SECTIONS per 01's file tree and component contracts:
Header (sticky, phone + Book Now + ✦DEMO pill, always visible) · Hero (dual
CTA: Book Now + Calculate Your Price, trust badges, inline-SVG art) ·
TrustBar · Services · ★Calculator · HowItWorks · Pricing · Reviews ·
ServiceAreas · FounderStory · CTABanner · Footer (with the REQUIRED "Demo site
built by Shubh Saxena — shubhbuilds.com" credit).

★ THE CENTERPIECE — the instant price Calculator (build this really well):
Implement exactly the inputs + pricing logic in 01 (service type, bedrooms,
bathrooms, frequency; base+per-room math; frequency discount; round to $5;
clamp to the ~$120–$520 GTA band). Live-updating price with a count/roll
animation on change (instant if reduced-motion). Show the "what's included"
line, the frequency-discount badge, the "Book this clean →" button (opens the
IG DM link), the helper text, and the "estimate only" fine print. Put the
pricing rules in lib/pricing.ts (typed). Per the research, THIS feature is the
main thing that makes the demo read as real conversion-grade work — give it
the most polish.

BOOKING (demo): every Book/CTA button AND the calculator's final button opens
https://ig.me/m/shubh_builds_ in a new tab (rel="noopener noreferrer").
No forms, no booking SaaS.

QUALITY FLOOR (build in, don't announce):
- Responsive to 360px; sticky header → hamburger but phone + Book Now stay
  reachable; all card grids collapse to single column.
- Calculator inputs have real <label>s; price output has aria-live; the
  number-roll respects prefers-reduced-motion.
- focus-visible rings in primary green; semantic landmarks; single h1;
  ordered headings.
- Inline SVG only → keep it fast. Target Lighthouse 95+.
- Scroll reveals via Framer whileInView (opacity/y, 0.5s, stagger), card
  hover lifts; NO cursor FX, NO 3D, NO parallax.

AFTER BUILDING — verify, fix, THEN report:
1. npm install; npm run build → must compile clean, zero type errors.
2. npm run dev → 200; note anything you couldn't verify headlessly.
3. Re-check against 00's "What to consciously AVOID" list.
4. git init + Next .gitignore + git add -A + commit
   "initial build: SparkClean GTA cleaning demo".

THEN REPORT:
1. Section-by-section confirmation (esp. the calculator math working).
2. Exact terminal commands to: create public repo
   shubhsaxena2020/sparkclean-demo, push, and deploy to Vercel (vercel --prod).
3. Any decisions you made or anything unverifiable headlessly.

Do NOT ask questions mid-build. Make reasonable calls, note them at the end.
One pass, verify, report.

===
