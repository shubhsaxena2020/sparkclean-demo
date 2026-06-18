# 05_ANTIGRAVITY_POLISH.md — SparkClean Premium Polish

> For Antigravity. Run AFTER Claude Code's base is built and verified.
> POLISH ONLY — do not rescaffold, change copy, links, or calculator logic.
> Base stack stays: Next.js 16 / Tailwind 4 / Framer Motion.

---

## THE IDENTITY (read this first — everything serves it)
One reference, hold it the whole way: **a Toronto boutique wellness brand**
— the calm, expensive feeling of an Aesop store or a high-end spa website.
Not "cleaning company with animations." A premium *care* brand that happens
to clean homes.

The feeling we're buying: **calm confidence and lots of air.** Premium here
comes from restraint, space, and typography — NOT from effects. If a change
makes the page busier, it's wrong. If it makes the page feel calmer and more
expensive, it's right. When in doubt, remove rather than add.

Still light, still white, still trustworthy. Never dark (except the footer
that already is). Never the portfolio's space/3D aesthetic — this is a
different universe.

## THE THREE LEVERS (this is where 90% of "premium" comes from)

### 1. Space
Premium brands breathe. This is the single biggest lever.
- Increase every section's vertical padding generously (~py-28 to py-36).
- Hero gets the most air — tall, headline sitting in calm whitespace.
- More internal padding inside cards; more gap between grid items.
- Don't fill the space you create. Empty space IS the luxury.

### 2. Typography
A confident type hierarchy reads more expensive than any animation.
- Display headings: weight 700-800, tight leading (~1.0 on big sizes),
  slightly larger than now. Editorial, calm, commanding — not shouty.
- Eyebrow labels (WHAT WE CLEAN, etc.): small, uppercase, wide tracking
  (~0.22em), in primary green. This one detail creates the editorial rhythm
  that separates boutique from generic.
- Body: keep Inter, comfortable size, relaxed line-height (~1.7), muted color.
- The contrast between big-calm-display and small-wide-label is the whole look.

### 3. Soft depth (subtle, never heavy)
- Section backgrounds alternate gently: white -> faint mint (#F2FBF7) -> white.
  Rhythm without color weight.
- Shadows: soft, large, low-opacity (think 0 20px 40px rgba at ~6-8%). One
  consistent shadow language across all cards. No hard/dark shadows.
- Border radius: generous and consistent (20-24px) on cards/buttons/inputs.
- Optional: a *barely-there* grain on the hero only (<=4% opacity). If it
  reads at all, it's too strong — dial down or skip.

## SECTION TOUCHES (apply the levers; don't add gimmicks)

- **Header:** Book Now becomes a soft pill in accent yellow with a gentle
  shadow. On scroll, header gets white bg + a hairline bottom border (use a
  faint green, 1px) — NOT a rainbow gradient line. Small phone glyph before
  the number.
- **Hero:** maximum air. Big calm H1. The inline-SVG art -> a quiet abstract
  composition (a few overlapping soft circles in greens, low opacity, like
  light through water) sitting behind/beside the headline — atmospheric, not
  a logo. Trust badges become slim outlined pills with a tiny check.
- **Calculator (the centerpiece):** give it a single elevated card on a soft
  white->mint->white gradient panel so the eye knows it matters. Custom-styled
  inputs (rounded, green focus ring, no browser defaults). The price output is
  the hero of this card: large display weight, prominent. Frequency-discount
  badge = a clean green pill. Keep the count-up on price change (it's already
  spec'd) — that is the ONE signature motion of this site; make it smooth.
- **Services:** cards lift gently on hover (y -4px + soft shadow deepen) with
  a whisper of mint at the card foot. Consistent radius + padding. Icons stay
  calm — no spinning.
- **Pricing:** featured (Deep Clean) card sits slightly elevated with a soft
  green ring + the softer shadow; others plain. No loud badges beyond the
  existing "MOST BOOKED" pill.
- **Reviews:** quote-style cards — thin green left accent bar, faint mint bg,
  five soft-gold stars, generous padding. Calm, credible.
- **Service Areas:** neighbourhood names as light outlined pills, lots of gap.
- **CTA Banner:** a rich green->deeper-green gradient, generous height, big
  white calm display headline, accent-pill CTA. Optional <=5% dot texture.
  No flashing, no movement.
- **Footer:** a soft hairline divider above it (green->transparent->green), the
  required "Demo site built by Shubh Saxena — shubhbuilds.com" credit kept.

## MOTION BUDGET (deliberately small — this is the discipline)
Premium = restraint. Use ONLY these, nothing else:
1. Scroll reveal: opacity 0->1, y 16->0, ~0.5s, --ease, once, light stagger
   (0.07s). Applied uniformly to section headers + items.
2. Hero headline: a single calm rise+fade on load (lines, ~0.5s, 0.08s
   stagger). No blur theatrics.
3. Card hover: gentle lift + shadow, 0.2s.
4. Calculator price: smooth count-up on change. <- the signature moment.
5. Button hover: subtle color/shadow shift only.

Explicitly DO NOT add: pulse rings, spinning icons, shimmer sweeps, parallax,
typewriter effects, or any continuously-looping animation. If it loops forever
or draws attention to itself, it's banned. Calm > clever.

## HARD RULES
- NO dark background (footer excepted). No 3D, particles, cursor FX.
- Don't touch copy, links, or calculator pricing math.
- Don't restructure files or change the stack.
- No looping/attention-grabbing animations (see motion budget).
- Don't make it busy. Every addition must make it calmer/more expensive,
  or it's reverted.
- All Book/CTA buttons + calculator final button still open
  https://ig.me/m/shubh_builds_ (new tab).

## VERIFY
- npm run build clean, zero type errors.
- 360px mobile: airy still holds, nothing overflows, header collapses.
- prefers-reduced-motion: reveals + count-up become instant final states.
- Lighthouse >= 95 (perf is part of "premium").
- Gut check against THE IDENTITY: does it feel like a calm, expensive care
  brand? If it feels like a cleaning site with effects bolted on, pull back.

---

## PASTE THIS INTO ANTIGRAVITY:

Read docs/05_ANTIGRAVITY_POLISH.md fully, then docs/00_RESEARCH.md for context,
before changing anything.

This is a POLISH PASS ONLY on an existing, working Next.js 16 / Tailwind 4 /
Framer Motion site. Do NOT rescaffold, change the stack, change any copy,
links, or the calculator pricing logic.

Hold ONE identity the whole way: a Toronto boutique wellness brand — the calm,
expensive feeling of an Aesop store or high-end spa site. Premium comes from
SPACE, TYPOGRAPHY, and SOFT DEPTH — not from effects. If a change makes the
page busier, it's wrong; if it makes it calmer and more expensive, it's right.
Still light/white/trustworthy. Never dark (footer excepted), never 3D, never
the portfolio's space aesthetic.

Apply the three levers from the doc:
1. SPACE — increase section padding generously (~py-28 to py-36), more air in
   the hero, more padding in cards. Don't fill the new space.
2. TYPOGRAPHY — display headings weight 700-800 with tight leading; eyebrow
   labels small/uppercase/wide-tracked (~0.22em) in primary green; relaxed
   body line-height. The big-calm-display vs small-wide-label contrast is the
   whole look.
3. SOFT DEPTH — gentle alternating section backgrounds (white -> faint mint ->
   white), one soft large low-opacity shadow language, consistent 20-24px
   radius, optional <=4% hero grain.

Section touches (per doc): pill Book Now + hairline scrolled header; airy hero
with a quiet abstract green SVG composition + outlined trust-badge pills;
the Calculator as an elevated card on a soft gradient panel with custom inputs
and a large prominent price output; gentle service-card hover lifts; softly
elevated featured pricing card; quote-style review cards with a green left
accent; outlined service-area pills; a green-gradient CTA banner with a calm
display headline; a hairline divider above the footer (keep the "built by
Shubh Saxena — shubhbuilds.com" credit).

MOTION BUDGET — use ONLY: (1) uniform scroll reveal (opacity/y 16, ~0.5s,
0.07s stagger, once), (2) one calm hero headline rise+fade on load, (3) gentle
card hover lift, (4) smooth count-up on the calculator price (the signature
moment), (5) subtle button hover shift. DO NOT add pulse rings, spinning
icons, shimmer sweeps, parallax, typewriter, or any looping animation.

All Book/CTA buttons + the calculator's final button must still open
https://ig.me/m/shubh_builds_ in a new tab.

Then: npm run build (must be clean) -> git add -A -> git commit -m "polish:
premium boutique visual pass" -> git push. Report what changed per file,
anything skipped, and the push confirmation. Do not change copy or logic.

---

## AFTER ANTIGRAVITY
1. npm run dev -> screenshot every section.
2. Mobile 360px check + test all Book buttons -> your Instagram DM.
3. Anything broken -> fix in Claude Code.
4. vercel --prod -> screenshot for the portfolio (build_04).
