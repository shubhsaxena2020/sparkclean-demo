# 10_POLISH.md — SparkClean v2 calm polish + subtle parallax

> Applied in Stage 6, across all 4 pages. Calm only. NO WebGL, NO 3D, NO
> particles, NO custom cursor. The three reference sites (Merry Maids, Molly
> Maid, Impact) use almost no animation — premium here = calm + restraint.

---

## MOTION BUDGET (use ONLY these)
1. Scroll reveal (shared): opacity 0→1, translateY 24→0, 0.6s,
   ease cubic-bezier(0.22,1,0.36,1), trigger once at ~15% in view, children
   stagger 0.08s. Apply to section heading → items, every section, every page.
2. Hero load: heading + sub + CTAs rise/fade once (same easing, 0.08s stagger).
3. Card hover: lift translateY(-4px) + soft shadow deepen, 0.2s.
4. Calculator price: smooth count-up on change (the ONE signature motion).
5. Button hover: subtle colour/shadow shift, 0.2s.
6. Image reveal: gentle scale 1.03→1.0 + fade, 0.7s.
7. Page transition (optional, only if trivial): a quick 0.25s opacity fade on
   route change. If it adds any complexity or jank, SKIP it.

BANNED: WebGL/Three.js, 3D, particles, floating dots, custom cursors, pulse
rings, spinning icons, shimmer sweeps, marquees, typewriter, anything looping
forever or grabbing attention. If unsure, leave it out.

---

## SUBTLE HERO PARALLAX (CSS/SVG only — the "little more")
A gentle sense of depth in the HERO only. Pure CSS/SVG + a tiny scroll/pointer
listener. No libraries beyond what's installed. Must be barely-there.

Approach (pick the simplest that looks good):
- The hero already has soft mint shapes / a photo. Put 2-3 layers at different
  depths (e.g. a faint back mint blob, the photo/illustration, a small front
  accent shape).
- On scroll, translate the back layer slightly slower and the front layer
  slightly faster (parallax) using `transform: translateY()` tied to scrollY.
  Keep total movement tiny (≤ 24px). Use `will-change: transform` and rAF or a
  passive scroll listener; throttle.
- OPTIONAL pointer parallax on desktop only: layers shift ≤ 8px toward cursor.
  Disable on touch. Keep it subtle.
- Respect prefers-reduced-motion: disable parallax entirely, render static.
- Must not cause horizontal scroll or layout shift. Test 360px.

This gives the "alive / crafted" feel you want without WebGL risk. If it ever
looks janky on the laptop or mobile, dial the movement down or remove it — a
clean static hero beats a janky parallax.

---

## TYPOGRAPHY / DEPTH CONSISTENCY (across all pages)
- Display headings 700-800, tight leading, -0.02em tracking, ink.
- Eyebrows uppercase 0.22em tracking, green, small.
- Body muted, line-height 1.7.
- One shadow language sitewide: 0 10px 30px -12px rgba(15,26,23,0.12);
  hover 0 18px 44px -14px rgba(15,26,23,0.18). Images use it too.
- Consistent radius 20-24px on cards/images/buttons.
- Generous section padding (py-24 to py-36) on every page, including subpages.
- PageHero on subpages gets extra top space so pages feel intentional.

---

## VERIFY (Stage 6)
- All 4 pages reveal calmly on scroll; nothing loops or distracts.
- Hero parallax is subtle, smooth, off under reduced-motion, fine on mobile.
- No WebGL/3D/cursor anywhere.
- Calculator count-up still smooth; math unchanged ($130 default).
- Lighthouse perf ≥ 90, a11y ≥ 95 on Home.
- 360px: no horizontal scroll, no layout shift from parallax.
- Gut check vs the 3 reference sites: does ours look as credible/established,
  but cleaner and faster? It should.
