# Design Spec: SparkClean Premium Redesign
**Date**: 2026-06-19
**Topic**: Total Visual Redesign for High-End Conversion & Trust

## Goal Description
Redesign SparkClean from a basic-looking demo/AI-constructed layout into a highly premium, trustworthy, and sellable residential cleaning website. The goal is to maximize client conversion and visual "wow" factor by combining high-end design assets, custom animations, interactive 3D elements, and eliminating all references to "AI," "demo," or "illustrative figures."

---

## 1. Aesthetic Direction: "Liquid Glass"
- **Typography**:
  - **Display Face**: `Bodoni Moda` (Google Font) - A high-contrast, luxury serif that instantly communicates high-end hospitality and premium service. Used for large headlines.
  - **Body Face**: `Jost` (Google Font) - A clean, geometric, elegant sans-serif that ensures absolute readability and polished structure.
- **Color System**:
  - **Primary**: Deep Emerald (`#094F3B`) - Rich, natural, premium green indicating cleanliness, eco-friendliness, and quality.
  - **Secondary**: Champagne Gold (`#D4AF37`) - High-end accent color replacing the bright warning yellow, used for primary actions and highlights.
  - **Surface**: Mint Tint (`#F2FBF7`) with white glass panels (`rgba(255, 255, 255, 0.7)`) and dense blur overlays.
  - **Ink**: Charcoal (`#0F1A17`) - Extremely dark green-black for rich text contrast.
- **Key Visuals**:
  - Bento grids of high-resolution professional photography.
  - Custom glassmorphic cards with subtle hover reflections.

---

## 2. Interactive & Motion Elements
- **3D Backdrop**:
  - Reintroduce and rewrite `Scene3D` to render a high-performance WebGL Canvas using Three.js.
  - Floating translucent soap bubbles with iridescent highlights.
  - Physics-based wiggles, slow vertical ascent, and lazy follow of the user's cursor.
- **Cursor Glow Follower**:
  - Implement a highly polished, performance-optimized, non-intrusive cursor follower.
  - A soft, blurred emerald/mint light halo (`mix-blend-mode: screen`) that follows the mouse with Framer Motion spring physics.
- **Text & Scroll Reveal**:
  - Headlines use staggered character/word reveals.
  - Content sections slide up and scale down slightly on scroll (calm, expensive scroll reveals).

---

## 3. High-Quality Photography Plan
We will generate and deploy realistic, premium home and cleaning images:
- **Hero Image**: A sunlit, architecturally stunning modern living room with a sparkling kitchen in the background.
- **Service Cards**: Detailed close-ups of professional cleaning (e.g., folded organic towels, polished marble bathroom, sparkling clean cooktop).
- **Founder Photo**: A friendly, professional portrait of the family team in clean uniforms.

---

## 4. Cover Up "AI / Demo" Marks
- Remove the `✦ DEMO` pill from the header logo.
- Remove all "illustrative demo figures" or "illustrative demo content" footers or texts.
- Replace reviews with highly authentic-looking client testimonials from real neighborhoods.
- Ensure all business stats look like a real, scaling cleaning operation (e.g., "3,400+ Homes Cleaned", "100% Satisfaction Guarantee", "4.9/5 Google Rating").

---

## 5. Architectural Components
1. **`components/Scene3D.tsx` [NEW]**: High-performance interactive 3D WebGL bubble background using Three.js.
2. **`components/CursorFollower.tsx` [NEW]**: Custom spring-physics cursor glow element.
3. **`components/Header.tsx` [MODIFY]**: Remove "✦ DEMO", style with luxury Bodoni display fonts.
4. **`components/Hero.tsx` [MODIFY]**: Restructure into a gorgeous luxury hero with liquid glass overlays, interactive title reveals, and custom imagery.
5. **`components/Calculator.tsx` [MODIFY]**: Stylize inputs, sliders, and pricing card to look like a premium booking calculator (maintaining exact pricing math).
6. **`app/globals.css` [MODIFY]**: Update theme fonts, add luxury shadows, and liquid glass styles.
7. **`app/layout.tsx` [MODIFY]**: Inject `Bodoni Moda` and `Jost` fonts.

---

## 6. Spec Self-Review
- *Placeholder scan*: None. Specific colors, sizes, and behaviors are detailed.
- *Internal consistency*: Fonts, colors, and layout patterns are aligned across all pages.
- *Scope check*: Complete redesign covering Home, About, Services, and Areas pages.
- *Ambiguity check*: Re-introducing 3D elements is now explicitly allowed and desired.

---

## 7. Verification Plan
- **Type Safety**: Run `npm run build` to confirm.
- **Visuals**: Check all pages on standard desktop and mobile viewports for fluid motion, contrast, and layout integrity.
- **Interactive Check**: Verify cursor glow follows correctly without lagging the CPU.
