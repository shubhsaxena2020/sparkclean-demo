# 06_FIX_AND_POLISH.md — SparkClean Recovery + Real Polish

> READ THIS ENTIRE FILE BEFORE TOUCHING ANY CODE.
> The previous polish pass broke the design. This file undoes the damage
> and does the polish correctly. Follow it EXACTLY. Do not interpret,
> do not improvise, do not "improve on" these instructions. Where a hex
> code is given, use that exact hex code. Where something is banned, it
> is banned with no exceptions.
>
> This is a FIX pass on an existing, working Next.js 16 / Tailwind 4 /
> Framer Motion site. Do NOT rescaffold. Do NOT change the stack. Do NOT
> change any copy text. Do NOT change any links. Do NOT change the
> calculator pricing math in lib/pricing.ts.

---

## PART 0 — WHY THE LAST PASS FAILED (read so you don't repeat it)

The last pass was told "add a 3D background instead of a plain white wall."
It misread that as "make the whole site black." That was wrong. It then:
- Turned every section background black/very dark. ❌
- Made body text white-on-black, which reads as a nightclub/gym/crypto
  site — the OPPOSITE of a clean, trustworthy home-cleaning brand. ❌
- Added a broken "cursor" made of scattered coloured dots that look like
  visual noise / rendering bugs. ❌
- Left distracting floating coloured dot clusters around headings. ❌

THE GROUND TRUTH (researched across 100+ real cleaning websites, 2026):
Every single high-converting cleaning company website is LIGHT — white or
near-white backgrounds, with green and fresh accent colours. There is not
one successful dark/black cleaning site, because "clean home" maps to
"bright, airy, fresh" in a customer's mind. Dark backgrounds map to
"nightlife / gaming / luxury electronics" — wrong industry entirely.
Reference roundups that confirm this:
- https://nanoglobals.com/housecleaning-company-websites/  (Tidy Casa, Better Life, MoreHands, Maid Marines — all light)
- https://www.sitebuilderreport.com/inspiration/cleaning-websites  (45 examples, all light/airy)
- https://comradeweb.com/blog/best-cleaning-websites/  (Dust Queen: "colors stay consistent and LIGHT throughout, accented by pastel overlays")
- https://colorlib.com/wp/cleaning-company-websites/

So: the site goes back to a LIGHT base. "Premium" comes from white space,
type, and SOFT pastel-mint depth — never from darkness.

---

## PART 1 — REVERT THE DAMAGE (do this first, before any polish)

### 1A. Restore the light colour system
Open `app/globals.css`. In the `@theme` block, the tokens MUST be exactly:

```
--color-bg:        #FFFFFF;   /* page background — WHITE */
--color-surface:   #F4FBF8;   /* faint mint for alternating sections */
--color-surface-2: #EFF8F3;   /* slightly deeper mint, optional */
--color-ink:       #0F1A17;   /* near-black TEXT colour (text only!) */
--color-primary:   #0FB67E;   /* brand green — accents, icons, eyebrows */
--color-primary-d: #0A8C60;   /* darker green — hovers, gradients */
--color-accent:    #FFC53D;   /* warm yellow — BOOKING CTAs ONLY */
--color-muted:     #66726E;   /* muted grey-green for sub-text */
--color-border:    #E3EAE7;   /* hairline borders */
--radius: 20px;
--maxw: 1180px;
--ease: cubic-bezier(0.22, 1, 0.36, 1);
```

Then find anywhere the last pass set a dark/black background — `body`,
section wrappers, `bg-black`, `bg-[#0...]`, dark gradients, `background:#000`,
dark `--color-bg`, `color-scheme: dark`, etc. — and remove/replace so:
- `body` background = `var(--color-bg)` (white). Text = `var(--color-ink)`.
- Every section is either white (`--color-bg`) or faint mint (`--color-surface`).
- NO section is dark EXCEPT the footer.

### 1B. Section background rhythm (light, alternating)
Apply this exact order top→bottom (this is the 60-30-10 rule: ~60% white,
~30% mint, ~10% green/accent):
1. Header — white, slightly translucent (`rgba(255,255,255,0.8)` + backdrop-blur)
2. Hero — white
3. TrustBar — faint mint (`--color-surface`)
4. Services — white
5. Calculator — faint mint panel area, white card on top (see Part 3)
6. HowItWorks — white
7. Pricing — faint mint
8. Reviews — white
9. ServiceAreas — faint mint
10. FounderStory — white (card can be mint)
11. CTABanner — GREEN gradient (the one allowed strong-colour section)
12. Footer — dark (the ONLY dark section; keep it)

### 1C. DELETE the broken cursor entirely
Find the custom cursor component the last pass added (likely
`components/Cursor.tsx` / `CursorFX` / a dots/particles canvas, and its
import in `app/layout.tsx` or `app/page.tsx`). REMOVE it completely:
- Delete the component file.
- Remove its import + usage.
- Restore the normal OS cursor (no `cursor: none` anywhere).
We will design the broom cursor properly in Part 4 — but FIRST get the site
back to a clean default cursor so nothing is broken.

### 1D. DELETE the floating dot clusters
Remove the scattered coloured dot / confetti / bokeh elements near the
headings and around the page (the multicolour blurry blobs in the
screenshots). They read as rendering bugs. Delete the elements and any
loop/animation driving them.

### 1E. Verify the revert
Run `npm run dev`. The site must now look like the LIGHT version again:
white background, dark text, green accents, normal cursor, no floating
dots. Only after this looks clean do you proceed to Part 2.

---

## PART 2 — THE REAL POLISH (light, premium, boutique)

Identity to hold the whole way: **a Toronto boutique wellness brand** — the
calm, fresh, expensive-but-friendly feeling of an Aesop store or a high-end
spa. Premium comes from THREE levers only: SPACE, TYPOGRAPHY, SOFT DEPTH.
If a change makes the page busier or darker, it is wrong.

### 2A. SPACE (biggest lever)
- Section vertical padding: `padding-block: clamp(5rem, 9vw, 9rem)` (~py-20
  to py-36). Generous. Premium brands breathe.
- Content max-width 1180px, centered, with comfortable side gutters.
- Increase the gap between grid items (services/pricing/reviews) to ~28-32px.
- Inside cards: padding ~28-32px.
- Do NOT fill the new whitespace with decoration. Emptiness is the luxury.

### 2B. TYPOGRAPHY
- Display headings (h1/h2): weight 700-800, leading tight
  (`line-height: 1.05`), letter-spacing `-0.02em`, colour `--color-ink`.
- h1 hero: `font-size: clamp(2.5rem, 6vw, 4.5rem)`.
- h2 section titles: `clamp(2rem, 4vw, 3rem)`.
- Eyebrow labels (the "WHAT WE CLEAN", "INSTANT PRICE" etc. small labels):
  `text-transform: uppercase; letter-spacing: 0.22em; font-size: 0.8rem;
  font-weight: 600; color: var(--color-primary);`
- Body text: `--color-ink` at ~85% or `--color-muted`, `line-height: 1.7`,
  size ~1.05rem. NEVER white text except on the green CTA banner + footer.
- Keep the existing fonts (Plus Jakarta Sans display, Inter body).

### 2C. SOFT DEPTH (this replaces "dark")
- One shadow language used everywhere:
  `box-shadow: 0 10px 30px -12px rgba(15, 26, 23, 0.12);`
  On hover deepen to `0 18px 44px -14px rgba(15, 26, 23, 0.18);`
- Card borders: `1px solid var(--color-border)`, radius `var(--radius)` (20px).
- Alternating white/mint sections (Part 1B) create rhythm without weight.
- OPTIONAL hero depth: a soft mint radial glow behind the hero headline,
  e.g. `radial-gradient(circle at 30% 30%, rgba(15,182,126,0.08), transparent 60%)`.
  Very subtle. This is the "3D-ish background" done right — light, not black.

---

## PART 3 — SECTION-BY-SECTION SPEC

### Header
- White, translucent, backdrop-blur. Hairline bottom border
  (`1px solid var(--color-border)`) that appears on scroll.
- Left: green sparkle logo + "SparkClean" + the `✦ DEMO` pill (keep).
- Right: nav links (ink colour), phone number with a small phone glyph
  before it, and a "Book Now" pill in `--color-accent` (yellow) with the
  soft shadow. Book Now must stay visible on mobile.

### Hero (white)
- Maximum air above and around the headline.
- Left column: eyebrow ("TORONTO'S TRUSTED HOME CLEANING") → big h1
  ("A spotless home, booked in 60 seconds." — keep exact text; the second
  line "booked in 60 seconds." stays green) → sub-paragraph (muted) → dual
  CTA: "Book Now" (yellow pill → IG DM) + "Calculate Your Price" (outline
  green, scrolls to #calculator) → the 4 trust badges as slim OUTLINED pills
  (1px green border, tiny green check, ink text) — NOT filled, NOT dark.
- Right column: a calm abstract SVG (overlapping soft mint/green circles at
  low opacity, like light through water, OR a simple friendly line
  illustration of a tidy room). Light. Optional very-subtle float (see
  motion budget). NOT a dark canvas, NOT particles.
- Behind headline: the optional soft mint radial glow from 2C.

### TrustBar (mint)
- One row, 4 items: Insured & Bonded · Eco-Friendly Products ·
  Background-Checked Cleaners · 100% Satisfaction Guarantee.
- Each: small green inline-SVG icon + ink label. Even spacing. No dark chips.

### Services (white) — "Every kind of clean your home needs."
- 6 cards, 3 columns desktop / 1 mobile. White cards, hairline border, soft
  shadow, radius 20px, generous padding.
- Each card: green inline-SVG icon in a soft mint rounded square, bold ink
  title, muted description.
- Hover: lift `translateY(-4px)` + deepen shadow + a whisper of mint at the
  card foot (subtle `linear-gradient(to bottom, #fff, #F4FBF8)`). Icon stays
  still — NO spinning.

### Calculator (mint panel, white card) — THE CENTREPIECE
- Sits on a soft panel: `linear-gradient(180deg, #fff, #F2FBF7, #fff)`.
- One big white card, radius 24px, the soft shadow, padding ~32px, max-width
  ~960px, centered.
- Left side: controls.
  - "Service type": 3 segmented pills (Standard/Deep/Move). Selected = green
    fill + white text; unselected = white + ink + border. Rounded.
  - Bedrooms / Bathrooms: labelled −/+ steppers. Rounded buttons, green focus
    ring, ink number. Custom-styled (no browser default look).
  - "How often?": 4 segmented pills (One-time/Monthly/Bi-weekly/Weekly), same
    selected/unselected styling.
  - Helper line under controls (muted), keep existing text.
- Right side: the price panel.
  - "Your estimated price" small label (muted).
  - The PRICE: very large display weight, colour `--color-ink` (NOT neon
    green-on-black). The struck-through original price in muted grey beside
    it. This number is the hero of the section.
  - Discount badge: a clean green pill, white text ("You save 12% with
    bi-weekly service"). Keep exact text logic.
  - The included line with a green check (keep text).
  - "Book this clean →" button: large yellow pill → IG DM, soft shadow.
  - Fine print (muted), keep text.
- Keep the smooth count-up on the price (the ONE signature motion). Make sure
  it still computes identical numbers — do not touch lib/pricing.ts.

### HowItWorks (white) — "Booked in 60 seconds."
- 3 steps in a row, dashed connecting line on desktop. Numbered green/mint
  circles, ink titles, muted body. Light. No dark circles.

### Pricing (mint) — "Simple, honest pricing."
- 3 cards. Standard / Deep (featured) / Move.
- Featured Deep card: slightly elevated (translateY(-6px)), a soft GREEN ring
  (`box-shadow: 0 0 0 2px var(--color-primary), <soft shadow>`), keep the
  "MOST BOOKED" green pill. NOT a glowing dark card.
- Each: plan name (ink), "from $X" (X large, ink or green), muted blurb,
  green-check feature list, a Book button → IG DM. Featured button = yellow
  pill; others = green outline.

### Reviews (white) — "GTA homeowners trust SparkClean."
- 3 quote cards. White, hairline border, soft shadow, radius 20px, generous
  padding, a thin GREEN left accent bar (`border-left: 3px solid
  var(--color-primary)`). Five soft-gold stars, italic ink quote, then a
  small round initials avatar (mint bg, green initials) + name (ink) + area ·
  date (muted). Keep the "Reviews shown are illustrative demo content." line.

### ServiceAreas (mint) — "Proudly serving the Greater Toronto Area."
- The 12 neighbourhoods as light OUTLINED pills (white bg, 1px green-ish
  border, ink text), generous gap, centered, wrapping to 2 rows. Subtle hover:
  mint fill. No dark pills.

### FounderStory (white) — "Local, and we act like it"
- Centered. The "SC" initials in a green circle. Eyebrow label. The italic
  quote (keep text) in ink. Attribution muted. The card (if any) is white or
  mint with the soft shadow — NOT dark with a green glow.

### CTABanner (GREEN) — "Ready for a spotless space?"
- This is the ONE strong-colour section. Full-width green gradient
  (`linear-gradient(135deg, #0FB67E, #0A8C60)`). Big WHITE display headline
  (white is correct HERE), white/near-white sub-line, a yellow "Book Now"
  pill → IG DM. Generous height. Optional ≤5% white dot texture. No motion.

### Footer (dark — keep)
- Keep the existing dark footer. A soft hairline divider above it
  (`linear-gradient(90deg, transparent, var(--color-primary), transparent)`).
- KEEP the required credit exactly:
  "Demo site built by Shubh Saxena — shubhbuilds.com" linking to
  https://shubhbuilds.com
- Keep the "Live booking-system integration available on request." line.

---

## PART 4 — THE BROOM CURSOR (do this LAST, and carefully)

Shubh wants a custom cursor that is a BROOM that sweeps, trailing a fine,
smooth NEON-mint dust — NOT scattered multicolour dots. Spec:

- A small broom SVG follows the real cursor position with slight smoothing
  (lerp toward the target, ~0.15 factor) so it glides rather than snaps.
- The broom tilts slightly based on horizontal movement direction (rotate a
  few degrees left when moving left, right when moving right) so it reads as
  "sweeping".
- Behind/under the broom head, emit a SOFT continuous trail of small
  semi-transparent mint-green particles (one colour only: rgba(15,182,126,…)
  fading to transparent), small radius, short life (~600ms), fading out as
  they fall. Think "fine dust", not confetti. ONE colour. Low opacity.
  Few particles. Calm.
- The trail should look smooth and premium — particles spawn along the path
  of motion and gently drift down + fade, never bright, never multicolour,
  never clustered into blobs.
- Performance: cap particle count (e.g. ≤ 40 alive), use requestAnimationFrame,
  a single absolutely-positioned canvas or pointer-events-none layer.
- Accessibility / safety:
  - On touch devices (no fine pointer): disable entirely, show normal cursor.
  - On `prefers-reduced-motion`: disable the trail (broom can still follow, or
    just fall back to normal cursor — prefer normal cursor).
  - Never hide the real cursor on interactive elements in a way that hurts
    usability; if in doubt keep the OS cursor visible alongside.
- This is an enhancement layer ONLY. If it looks even slightly messy or
  janky, fall back to the normal cursor. A clean normal cursor beats a
  broken broom. DO NOT let the cursor regress the site the way the last
  dots version did.

Reference feel (smooth single-colour trailing particles, NOT multicolour
dots): a gentle comet-tail / fairy-dust effect in ONE mint hue.

---

## PART 5 — MOTION BUDGET (use ONLY these)
1. Scroll reveal: opacity 0→1, translateY 16→0, 0.5s, `--ease`, once, 0.07s
   stagger. Applied to section eyebrows/headings/cards.
2. Hero headline: one calm rise+fade on load (lines, 0.5s, 0.08s stagger).
3. Card hover: lift + shadow deepen, 0.2s.
4. Calculator price: smooth count-up on change. ← signature moment.
5. Button hover: subtle colour/shadow shift.
6. (Allowed) Hero abstract SVG: a very slow, very subtle float (≤8px, 6-8s
   ease-in-out) — optional, must be barely noticeable.
7. (Allowed) The broom cursor trail from Part 4.

BANNED (these are what broke it before): dark/black backgrounds anywhere but
footer; white body text anywhere but CTA banner + footer; scattered
multicolour dot clusters; the old dots "cursor"; pulse rings; spinning icons;
shimmer sweeps; parallax; typewriter; any looping attention-grabbing
animation. Calm > clever.

---

## PART 6 — HARD RULES (non-negotiable)
- LIGHT site. White/mint backgrounds. Dark ONLY in footer. ✅
- Body/heading text is INK (dark) on light — never white on dark (except CTA
  banner headline + footer). ✅
- Do NOT change any copy text. ✅
- Do NOT change any links. Every Book/CTA/calculator button still opens
  https://ig.me/m/shubh_builds_ in a new tab (target="_blank"
  rel="noopener noreferrer"). ✅
- Do NOT change lib/pricing.ts or any calculator math. Default 2bd/1ba
  bi-weekly must still show $130 (was $150). ✅
- Do NOT restructure files or change the stack (Next 16 / Tailwind 4 /
  Framer Motion). ✅
- Keep the "Demo site built by Shubh Saxena — shubhbuilds.com" footer credit. ✅

---

## PART 7 — VERIFY BEFORE COMMITTING
- `npm run build` → clean, zero type errors.
- Visually: site is LIGHT (white/mint), text is dark and readable, green
  accents, yellow CTAs, normal-or-broom cursor (no dots), no floating blobs.
- Calculator: change inputs → price updates, counts up, math unchanged
  ($130 default).
- Click every Book button + "Book this clean →" → all open the IG DM.
- 360px mobile: airy, nothing overflows, header keeps phone + Book Now,
  cards stack to one column.
- `prefers-reduced-motion`: reveals/count-up become instant; cursor trail off.
- Gut check vs identity: does it feel like a calm, fresh, premium cleaning
  brand a Toronto homeowner would trust? If it feels dark, busy, or
  "techy/gaming", pull back toward light + simple.

---

## PART 8 — SHIP
```
npm run build        # must be clean
git add -A
git commit -m "fix: restore light theme, real boutique polish, broom cursor"
git push
```
Then report, per file: what you reverted, what you polished, the cursor
outcome (working broom trail, or fell back to normal cursor and why), and
the push confirmation. Do not change copy, links, or pricing math.
```
