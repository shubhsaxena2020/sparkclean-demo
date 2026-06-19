# 07_PREMIUM_UPGRADE.md — SparkClean: make it feel like a $10k site

> READ THIS WHOLE FILE BEFORE TOUCHING CODE. Follow it exactly, in order.
> Do NOT interpret, do NOT improvise, do NOT add anything not listed here.
> This is an upgrade on the CURRENT LIGHT site (white/mint/green). That
> light theme is correct — KEEP IT. Do not go dark anywhere except the
> footer. Do not change copy text, links, or calculator math (lib/pricing.ts).

---

## PART 0 — THE CORE INSIGHT (read so you build the right thing)

The reference the client loves is https://southcliffdentalgroup.com/
We inspected it. Here is what actually makes it feel premium/expensive —
and it is NOT 3D and NOT flashy animation:

1. REAL PHOTOGRAPHY — large warm images of people/spaces. This is the #1
   thing our site is missing. Our site is currently all text + SVG icons on
   white, which is why it still feels "template/average".
2. A big confident STATS band (e.g. "45 yrs · 546K patients · 100+ 5★ ·
   100% recommend").
3. An award / partner LOGO STRIP near the top for instant credibility.
4. A real TESTIMONIAL treatment with a large quote-mark graphic.
5. CALM, SLOW scroll-reveal animation only. No 3D. No particles. No cursor FX.

So the upgrade is NOT "add 3D / motion graphics". The upgrade is: add
imagery + trust density + a few calm reveals. That is what closes the gap
between "fine template" and "$10k site". Do exactly that. Adding 3D/particles
will make it WORSE and less trustworthy (every top cleaning site is calm and
image-led). Hold this the whole way.

---

## PART 1 — REMOVE THE BROOM CURSOR (do first)

It's laggy and gimmicky. Remove it completely:
- Delete `components/CustomCursor.tsx`.
- Remove its import and usage in `app/layout.tsx`.
- Ensure no `cursor: none` remains anywhere in globals.css or components.
- Restore the normal OS cursor everywhere.
Verify the site still builds and the normal cursor is back before continuing.

---

## PART 2 — ADD REAL PHOTOGRAPHY (the biggest lever)

This is what will make it feel expensive. Use free, license-clear photos.

### 2A. Source images
Use Unsplash Source URLs (no API key, hotlinkable) OR download a few and put
them in `public/img/`. Prefer downloading into `public/img/` for reliability.
Search terms that fit a bright, premium cleaning brand:
- bright clean modern living room, sunlight
- tidy minimal kitchen, white, plants
- person cleaning window / wiping counter (hands, friendly, not stocky)
- folded towels / fresh bedroom, airy
- smiling cleaner in apron (warm, real, not corporate)

Good sources (all free, commercial-ok, attribution-free):
- https://unsplash.com/s/photos/clean-home
- https://www.pexels.com/search/house%20cleaning/
- https://burst.shopify.com/cleaning

Pick 5-6 images that are BRIGHT and AIRY (lots of white/light in the photo
itself, so they blend with the white theme). Avoid dark or moody photos.
Optimize: max width ~1600px, compressed. Use next/image with width/height
and `alt` text. Lazy-load below-the-fold images.

### 2B. Where the images go
- HERO: replace the abstract SVG circle blob in the right column with a real
  photo — a bright, tidy living room or a friendly cleaner — in a rounded
  (radius 24px) frame with the soft premium shadow. Optionally a small
  rounded "badge" overlapping the image corner (e.g. a green pill reading
  "★ 4.9 average" — allowed, it's a trust signal, keep it subtle and TRUE-to-
  demo: it can stay since reviews are labelled demo). Keep hero text on the
  left. This single change does the most.
- SERVICES: optional small photo at top of each service card OR keep the
  icon. If adding photos, keep them uniform aspect (4:3), rounded top corners.
  If it risks looking busy, keep the existing clean icon cards — icons are
  fine here. (Prefer: keep icons on service cards; put photos in hero +
  founder + a new "gallery" strip, see 2C/2D.)
- FOUNDER STORY: add a real warm photo beside the quote (a friendly
  person/cleaner or a tidy home), rounded, soft shadow. Keep the "SC" mark too
  or replace with the photo — your call, but a real photo reads more premium.

### 2C. NEW: a slim "before/after" or gallery strip (optional but high-impact)
The research said before/after galleries are the strongest proof for cleaning
sites. If time allows, add ONE slim section (white or mint) with 3-4 bright
"results" photos in a clean rounded grid, eyebrow label "OUR WORK" / "THE
SPARKCLEAN STANDARD", small heading. No captions needed. Keep it calm and
uniform. If it looks busy, skip it — do not force it.

---

## PART 3 — ADD A STATS BAND (high credibility, low effort)

Add ONE new section (place it after TrustBar or after Services), faint mint
or white, with 4 big confident numbers in a row. Use demo-honest figures
(this is a demo, keep them believable, not absurd):
- "500+   Cleans booked"
- "4.9★   Average rating"
- "12     GTA areas served"
- "100%   Satisfaction guarantee"
Style: each = a very large display number (ink or green) + small muted label
under it. Big type, lots of space, centered, even columns. Collapses to 2x2
on mobile. This instantly reads "established business". (These echo the
reference site's stats band.) A tiny "* illustrative demo figures" note is
fine and keeps it honest.

---

## PART 4 — UPGRADE THE TESTIMONIAL FEEL

The reference uses a big quote-mark graphic. In our Reviews section:
- Add a large, soft, decorative quote-mark (") in faint green/mint behind or
  beside the first review, OR at the top of the section. Low opacity, big.
- Keep the 3 review cards (already good) — keep the green left accent, gold
  stars, initials avatars. Keep "Reviews shown are illustrative demo content."
- Optionally add a thin row of small "as seen on / trusted by" style mint
  pills (e.g. "Insured ✓  Bonded ✓  Eco-Certified ✓  Background-Checked ✓")
  under the heading — reinforces trust like the reference's logo strip.

---

## PART 5 — CALM MOTION (this is the ONLY animation; do it well)

The reference site's whole "premium motion" is gentle scroll reveals. Match
that. Use Framer Motion (already installed). Implement ONE shared reveal and
apply it everywhere consistently:

- On scroll into view: opacity 0 → 1, translateY 24px → 0, duration 0.6s,
  ease `cubic-bezier(0.22,1,0.36,1)`, trigger once, when ~15% visible.
- Stagger children in a group by 0.08s (section heading first, then items).
- Hero on load: heading + sub + CTAs rise/fade in once (same easing, 0.08s
  stagger).
- Cards: gentle hover lift (translateY -4px) + shadow deepen, 0.2s. (Already
  present — keep.)
- Calculator price: keep the smooth count-up (the one signature motion).
- Images: a subtle scale-in (scale 1.03 → 1.0) + fade as they reveal, 0.7s.
  Calm, premium, barely-there.

BANNED (these broke it before): 3D, WebGL, Three.js, particles, floating dot
clusters, custom cursors, pulse rings, spinning icons, shimmer sweeps,
parallax, typewriter, marquees, anything looping forever, anything that draws
attention to itself. Premium = calm. If you're unsure whether a motion is too
much, it is — leave it out.

---

## PART 6 — POLISH DETAILS THAT ADD "EXPENSIVE" FEEL

- Spacing: keep generous section padding (py-24 to py-36). If anything, add
  MORE air around the new images. White space = luxury.
- Consistent radius everywhere: 20-24px on cards, images, buttons.
- One shadow language: `0 10px 30px -12px rgba(15,26,23,0.12)`, hover
  `0 18px 44px -14px rgba(15,26,23,0.18)`. Apply to images too.
- Buttons: keep yellow pill for Book CTAs, green outline for secondary.
  Make sure hover states are smooth (0.2s).
- Typography: headings 700-800 tight leading; eyebrows uppercase 0.22em
  tracking in green. Body muted, line-height 1.7.
- Make sure images never cause horizontal scroll (max-width:100%, object-fit
  cover, defined aspect ratios).
- Add real `alt` text to every image (accessibility + SEO + looks
  professional to anyone inspecting).

---

## PART 7 — HARD RULES (do not break)
- LIGHT site (white/mint). Dark ONLY in footer. ✅
- Text is dark ink on light (white text only on green CTA banner + footer). ✅
- Do NOT change any copy text. ✅
- Do NOT change links. Every Book/CTA/calculator button opens
  https://ig.me/m/shubh_builds_ in a new tab. ✅
- Do NOT touch lib/pricing.ts / calculator math. Default 2bd/1ba bi-weekly =
  $130 (was $150). ✅
- Do NOT add 3D/particles/cursor FX. ✅
- Keep footer credit "Demo site built by Shubh Saxena — shubhbuilds.com". ✅
- Keep all images BRIGHT/AIRY so they blend with the white theme. ✅
- Only use free, commercial-use, attribution-free images. ✅

---

## PART 8 — VERIFY BEFORE COMMIT
- `npm run build` → clean, zero type errors.
- Hero now has a real bright photo; site has 5-6 quality images total.
- Stats band present and reads confident.
- Broom cursor GONE; normal cursor everywhere.
- Scroll down slowly: sections fade/rise in calmly. Nothing flashes, loops,
  or distracts. No 3D, no dots.
- Calculator: inputs change price, count-up works, $130 default unchanged.
- Every Book button → opens IG DM.
- 360px mobile: images scale, no horizontal scroll, stats go 2x2, header keeps
  phone + Book Now.
- prefers-reduced-motion: reveals/count-up become instant.
- Lighthouse: performance still ≥ 90 (compress images!). Accessibility ≥ 95
  (alt text, contrast).
- Gut check: does it now look like a real, established, premium GTA cleaning
  business a homeowner would trust and book? If it feels busy or techy, pull
  back toward calm + image-led.

---

## PART 9 — SHIP
```
npm run build        # must be clean
git add -A
git commit -m "feat: premium upgrade — photography, stats band, calm reveals, remove cursor"
git push
```
Report per file: what you added/changed, which images you used and from where,
confirm the cursor is removed, and the push confirmation. Do not change copy,
links, or pricing math.
