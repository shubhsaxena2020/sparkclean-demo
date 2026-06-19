# 11_ROADMAP.md — SparkClean v2 + what comes after

## NOW → meetup (~6 days): ship multi-page v2
Sequence (see 09_PLAN.md for the staged build):
1. Routing skeleton + shared chrome
2. Home recomposition (overview + links)
3. /services page
4. /areas page
5. /about page (story + why-us + reviews + FAQ)
6. Calm polish + subtle CSS/SVG hero parallax
7. Verify → merge → deploy → screenshot

Definition of done:
- 4 working pages, shared nav with active states, mobile menu.
- Calculator intact ($130 default), all Book links → IG DM.
- Light, fast, mobile-clean, calm motion, subtle hero parallax.
- Live on Vercel + screenshots captured for portfolio build_04.

## THEN: wire into portfolio (small task, ~30-60 min)
- In the portfolio repo, edit `lib/projects.ts` → fill the SparkClean record:
  live URL (sparkclean-two.vercel.app), tech chips (Next.js · Tailwind ·
  Framer Motion · Multi-page), set hasImage:true, add a screenshot to
  public/work/sparkclean.png.
- Commit + push portfolio → auto-deploys to shubhbuilds.com.
- Result: shubhbuilds.com shows 4 real builds, one a polished multi-page
  client demo. That's the proof artifact for the Discord network.

## THEN: outreach (the part that actually earns the $1k)
- Use the message template in portfolio/docs/05_OUTREACH.md.
- Share: shubhbuilds.com + the SparkClean demo.
- Prep a 60-second screen-share walkthrough for the meetup: land on Home →
  scroll → use the calculator → click through to /services and /areas → show
  it's fast on mobile. That demo IS the pitch.

## AFTER THE MEETUP: the 3D house (separate learning project)
You want the scroll-driven 3D house walkthrough. It's a real, impressive skill
— just not something to bolt onto a client demo on a deadline. Treat it as its
own project, its own repo, realistic scope:
- Learn: React Three Fiber (R3F) + drei + GSAP ScrollTrigger (or @react-three/
  drei's ScrollControls). Start with ONE camera move, not eight.
- Use a PRE-MADE model first (don't model a house from scratch). Sketchfab /
  Poly Haven have free CC0 interiors. Get one room navigable on scroll before
  adding more.
- Build it as a standalone "experiments" page or repo so it can't break a
  client site. Test performance on a real mid-range phone early.
- When you're ready to start, I'll write you a proper learning roadmap +
  starter architecture for it. It's a great portfolio piece *once it works* —
  the key is it has to run smoothly, or it reads as broken rather than
  impressive.

## WHY THIS ORDER (the honest logic)
The money goal is a referral from your Discord network in ~6 days. What wins
that is a clean, fast, credible, multi-page client demo + you actually
reaching out — not effects. The 3D walkthrough is a months-scale craft project
that, half-finished or janky, would hurt the pitch. Ship the thing that earns,
then build the thing that's fun to learn. Both happen — just in the order that
serves the deadline.
