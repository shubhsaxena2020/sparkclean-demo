# README — SparkClean build kit

Read in order. Grounded in real GTA cleaning-market research.

| Doc | Job |
|-----|-----|
| 00_RESEARCH.md | Why every feature exists — GTA cleaning conversion findings. Wins ties. |
| 01_ARCHITECTURE.md | Stack, tokens, file tree, component contracts, calculator logic. |
| 02_CONTENT.md | Exact copy + demo reviews. |
| 03_BUILD_PROMPT.md | The prompt to paste into Claude Code. |
| 04_PLAN.md | Decisions, pre-flight, build sequence, portfolio wiring. |

## 60-second version
1. `mkdir sparkclean && cd sparkclean`, put 00–03 in a `docs/` folder.
2. Open Claude Code there, paste 03_BUILD_PROMPT.md, let it build + verify.
3. Push to a NEW repo (sparkclean-demo) + `vercel --prod`.
4. Test the calculator and all Book buttons (→ your Instagram DM).
5. Screenshot → add to the portfolio as build_04.

## The core idea (don't lose it)
The instant price calculator is the product. Everything else is the trustworthy
wrapper around it. A cleaning site that shows the price and books 24/7 is what
justifies $300–$1k — a brochure doesn't. Keep it light, fast, honest, and let
the calculator be the thing people remember.

## Non-negotiables
- Light/green/clean — no dark, no 3D, no cursor FX (that was the portfolio).
- Current stack: Next 16 / React 19 / Tailwind 4. Never Next 14 (EOL).
- Every Book CTA + calculator → ig.me/m/shubh_builds_.
- Footer credit "built by Shubh Saxena — shubhbuilds.com" stays. Free ads.
- Separate repo + Vercel project from the portfolio.
