# Design Spec: SparkClean Complete Visual Redesign
**Date**: 2026-06-19
**Topic**: Total Re-Architecture of UI/UX for High-End Conversion

## Goal Description
Completely rebuild the SparkClean user interface from scratch. The current layout feels like a basic template. The new design will utilize luxury editorial layouts, a fully interactive **Before/After slider**, an immersive shifting **ambient gradient background** behind the 3D WebGL soap bubbles, **magnetic button controls**, and a highly polished **glassmorphic bento grid** structure.

---

## 1. Design & Typography (Luxury Editorial)
- **Typography System**:
  - **Hero Headings**: `Bodoni Moda` (luxury high-contrast serif) paired with italicized key phrases for a sophisticated, human-designer look.
  - **Body / Interface**: `Jost` (geometric sans-serif) set with tight letter-spacing for sub-headings, and generous tracking for data.
- **Palette Overhaul**:
  - **Background**: Soft Stone White (`#FBFBFA`) and Translucent Milk Glass (`rgba(255, 255, 255, 0.4)`).
  - **Brand Colors**: High-End Forest Emerald (`#063D2E`), Warm Champagne Gold (`#D4AF37`), and Soft Mint Glow (`#EBF5F0`).
  - **Contrast Ink**: Dark Graphite (`#070F0C`).

---

## 2. Interactive & Motion Elements
- **3D Backdrop (`Scene3D.tsx`)**:
  - Upgraded WebGL bubble scene that renders high-definition translucent spheres with iridescent sheen wiggling on canvas.
  - A shifting, animated mesh gradient background in CSS that slowly blends gold and emerald colors.
- **Cursor Glow Follower (`CursorFollower.tsx`)**:
  - Soft glowing cursor trailer with magnetic attraction to key call-to-action buttons.
- **Before/After Slider Component (`BeforeAfter.tsx` [NEW])**:
  - A fully interactive, responsive slider allowing users to drag a central bar left/right to reveal a "Before" (dusty/cluttered) and "After" (spotless/luxury) kitchen or living room scene.
- **Magnetic Buttons**:
  - Main CTA buttons will pull slightly toward the user's cursor on hover.

---

## 3. High-Fidelity Bento Grid Layout
Instead of stacked blocks, the homepage will use an asymmetrical Bento Grid:
- **Block A (2x2)**: The Interactive Before/After slider.
- **Block B (1x2)**: Real-time price estimator (calculator).
- **Block C (1x1)**: Dynamic trust stats (satisfaction rating, area coverage).
- **Block D (2x1)**: Elegant testimonial carousel.

---

## 4. Genuinely Real-World Copy
- No demo, mockup, or placeholder text.
- Complete lists of luxury service offerings (Deep Clean, Move-In, Post-Construction, Regular Elite).

---

## 5. Implementation Phases
1. **Phase 1: Styles & Layout Init**: Update fonts, CSS grid values, noise, and variables.
2. **Phase 2: Interactive Before/After Component**: Build the custom dragging slider.
3. **Phase 3: Rebuilding Homepage Layout**: Assemble the Bento Grid structure in `app/page.tsx`.
4. **Phase 4: Magnetic & Liquid Interaction Hooks**: Add framer-motion magnetic hover hooks.
5. **Phase 5: Build & Visual Polish**: Verify at localhost:3000.
