# 09_PLAN.md — SparkClean v2 build plan (staged, safe)

> Goal: ship the multi-page rebuild (Home + Services + Areas + About) with
> calm polish + subtle CSS/SVG hero parallax, WITHOUT breaking the working
> site. Work in stages, commit after each, keep a backup branch.

---

## BEFORE STARTING — safety net
```
cd C:\Users\shubh.LAPTOP-FDPKIM1J\sparkclean
git checkout master
git pull
git branch backup-v1-singlepage     # restore point for the current good site
git checkout -b multipage            # do all v2 work on this branch
```
If anything goes badly wrong at any stage:
`git checkout master` (untouched) — or reset the branch to backup-v1-singlepage.
Only merge `multipage` → `master` at the very end, after it's verified.

---

## STAGE 1 — Routing skeleton (no visual change yet)
Goal: create the 4 routes sharing header/footer, each rendering a stub.
- Move Header + Footer into `app/layout.tsx` (shared chrome).
- Create `app/services/page.tsx`, `app/areas/page.tsx`, `app/about/page.tsx`,
  each rendering just a `<PageHero/>` stub for now.
- Add `app/not-found.tsx` (simple branded 404 with a Home link).
- Header nav links point to the 4 routes; active state via `usePathname()`.
- Verify: `npm run build` clean; click through all 4 routes; nav highlights.
- Commit: `git commit -am "stage1: multipage routing skeleton + shared chrome"`

## STAGE 2 — Home recomposition
Goal: Home becomes the overview with "see more" links (per 08).
- Keep all current Home sections.
- Add preview links: "View all services →" (/services),
  "Read more reviews →" (/about#reviews), "See all areas →" (/areas),
  "About us →" (/about).
- Verify build + Home looks right + links work.
- Commit: `git commit -am "stage2: home overview with section links"`

## STAGE 3 — /services page
- PageHero + full Services grid + "What's included" check-lists + embedded
  Calculator (reuse component) + CTABanner.
- NEW original intro copy (no reference-site text).
- Verify build + calculator works on this page too + mobile clean.
- Commit: `git commit -am "stage3: services page"`

## STAGE 4 — /areas page
- PageHero + 12 neighbourhood pills (larger grid) + "DM us if you don't see
  your area" → IG DM + optional 2-col area list with one-line blurbs + CTABanner.
- Verify build + mobile.
- Commit: `git commit -am "stage4: areas page"`

## STAGE 5 — /about page
- PageHero + FounderStory + WhyUs trust grid (6 cards) + Stats + Reviews
  (id="reviews") + FAQ accordion (NEW original copy) + CTABanner.
- Verify build + the Home deep-link /about#reviews scrolls correctly + a11y on
  the accordion (keyboard + aria-expanded).
- Commit: `git commit -am "stage5: about page (story, why-us, reviews, faq)"`

## STAGE 6 — Polish + subtle parallax (see 10_POLISH.md)
- Apply calm motion budget consistently across all pages.
- Add the subtle CSS/SVG hero parallax (NO WebGL).
- Smooth page transition (light fade) between routes if easy; skip if risky.
- Verify build + mobile + reduced-motion + Lighthouse.
- Commit: `git commit -am "stage6: calm polish + subtle hero parallax"`

## STAGE 7 — Final verify + merge + deploy
- Full pass of the acceptance checklist (08 + 10).
- `git checkout master && git merge multipage`
- `git push`
- `vercel --prod`  (or let the GitHub auto-deploy run)
- Screenshot all 4 pages for the portfolio (build_04).

---

## RULES DURING BUILD
- Commit after every stage (clean history, easy rollback).
- Never touch lib/pricing.ts. Never change existing copy. New pages = new copy.
- No reference-site layout/CSS/text/image copying. Structure only.
- All booking links → https://ig.me/m/shubh_builds_ (new tab).
- If a stage breaks the build and it's not fixable quickly, revert that stage's
  commit and report — don't pile fixes on a broken state.
- Keep the light theme; dark only in footer. No 3D/cursor FX.

## TIME / SEQUENCING NOTE (for Shubh)
- Stages 1-2 are the riskiest (routing). Let Claude Code do those if its limit
  allows — it handled the base build cleanly. Use Antigravity for the
  page-content stages (3-5) and polish (6), pointed at this plan.
- Stop and screenshot after each stage so we catch drift early, like we did
  with the theme fix.
