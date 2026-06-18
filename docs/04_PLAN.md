# 04_PLAN.md — SparkClean Build Plan

## The one-line thesis
Most GTA cleaning sites still say "call for a quote" and lose after-hours
leads. SparkClean prices the job instantly and captures the booking 24/7.
The **instant price calculator** is the whole pitch — it's what turns a demo
into proof you can build a site that books jobs, which is what justifies
$300–$1,000.

## Why this demo (vs a generic cleaning site)
Research showed the fastest-converting indie cleaning sites all share the same
spine: pricing upfront, dual hero CTA, phone+book in the header, hard local
trust signals, and real-looking reviews. We're not guessing a "nice cleaning
site" — we're rebuilding the exact pattern that converts in this market, so
when a real GTA operator (or the Discord network) sees it, it reads as someone
who understands their business, not just a designer.

## Locked decisions
- Light/green/Stripe-clean aesthetic. No dark, no 3D, no cursor FX.
- Calculator is the centerpiece feature, not an afterthought.
- All booking → Instagram DM (ig.me/m/shubh_builds_). No SaaS, no forms.
- Reviews are clearly demo content; pricing sits in the real GTA band.
- Footer carries the "built by Shubh Saxena — shubhbuilds.com" credit =
  free advertising on every demo someone views.
- Separate repo + Vercel project from the portfolio.

## Pre-flight (before Claude Code)
- [ ] Terminal: `cd ~`, `mkdir sparkclean`, `cd sparkclean`.
- [ ] Make a `docs/` folder inside it; drop in 00/01/02/03.
- [ ] Open Claude Code pointed at the sparkclean folder.
- [ ] gh is already authenticated from the portfolio setup (reuse it).

## Build sequence
1. Paste 03_BUILD_PROMPT.md → Claude Code builds + self-verifies.
2. `npm run dev` → eyeball every section; the calculator math especially.
3. Fix anything off via Claude Code.
4. Create repo + push + `vercel --prod` (commands come from Claude Code).
5. Open the live URL; test calculator + all Book buttons (→ your IG DM).
6. Screenshot for the portfolio.

## After it's live — wire into the portfolio
- Save a screenshot to portfolio `public/work/sparkclean.png`.
- In portfolio `lib/projects.ts`, fill the build_04 SparkClean record:
  category "Business Website", the live Vercel URL, tech chips
  (Next.js · Tailwind · Framer Motion), set hasImage:true.
- Commit + push the portfolio → it auto-deploys with the new project shown.
- Now shubhbuilds.com shows real engineering AND a polished client demo.

## What "done" looks like
- sparkclean-*.vercel.app live, calculator works, all CTAs open your IG DM.
- Mobile clean at 360px, Lighthouse ~95+.
- Linked inside the portfolio as build_04.
- One screenshot ready for an Instagram post.

## Honest scope note
This demo deliberately stops at the calculator + IG-DM booking. Real recurring
booking, payments, and scheduling are paid SaaS (Zenbooker/Launch27/Jobber)
that a paying client integrates later — that's an upsell, not part of a free
demo. If a lead asks "can it really take bookings?", the answer is: "Yes —
this demo captures the lead instantly; for live scheduling and payments I
integrate a booking system as part of the build." That's a real, honest
selling point, not a gap.
