# SparkClean Complete Overhaul Visual Redesign Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely rebuild the SparkClean landing page from scratch into an asymmetrical, luxurious Bento Grid layout using custom glass panels, an interactive Before/After image comparison slider, magnetic mouse buttons, and a slow shifting ambient background.

**Architecture:** We will create a custom React slider component with mouse/touch listeners for Before/After images, use Framer Motion springs for magnetic buttons, and organize the home page into a CSS Grid-based Bento layout.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js.

---

## Proposed File Map

### New Components
- `components/BeforeAfter.tsx`: Draggable Before/After image comparison slider.
- `components/MagneticButton.tsx`: Framer-motion wrapper to pull elements toward the cursor.

### Modified Components & Layouts
- `app/globals.css`: Shifting ambient background animation, Bento Grid layout patterns, luxury glass classes.
- `app/page.tsx`: Entirely new homepage layout structured as an asymmetrical bento grid.
- `components/Hero.tsx`: Overhauled to represent a brand thesis rather than a template hero.
- `components/Calculator.tsx`: Rebuilt as a compact, high-fidelity glass panel widget that embeds into the bento.

---

### Task 1: Setup Luxury Theme Styling & Gradient Animations

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write Custom Shifting Gradient & Bento Styles in globals.css**
  Append custom styles for ambient shifting background and bento panels:
  ```css
  /* Shifting background gradient */
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .ambient-bg {
    background: linear-gradient(-45deg, #f5fbf7, #fdfbf7, #eef7f2, #fafaf9);
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
  }

  /* Premium Glass Bento panels */
  .bento-panel {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(9, 79, 59, 0.08);
    box-shadow: 
      0 10px 30px -10px rgba(9, 79, 59, 0.04),
      0 1px 1px 0 rgba(255, 255, 255, 0.8) inset;
    border-radius: 32px;
    overflow: hidden;
    transition: all 0.4s var(--ease);
  }

  .bento-panel:hover {
    background: rgba(255, 255, 255, 0.6);
    border-color: rgba(9, 79, 59, 0.15);
    box-shadow: 
      0 20px 40px -15px rgba(9, 79, 59, 0.08),
      0 0 0 1px rgba(9, 79, 59, 0.05);
    transform: translateY(-2px);
  }
  ```

- [ ] **Step 2: Commit Task 1**
  ```bash
  git commit -am "design: add bento grid and shifting ambient gradient styles"
  ```

---

### Task 2: Build Interactive Before/After Slider Component

**Files:**
- Create: `components/BeforeAfter.tsx`

- [ ] **Step 1: Write BeforeAfter.tsx**
  Implement a responsive React component that allows horizontal dragging to compare two images:
  ```tsx
  "use client";

  import { useState, useRef, useEffect } from "react";
  import Image from "next/image";

  export default function BeforeAfter() {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(pct);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onMouseUp = () => setIsDragging(false);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onMouseUp);
      }
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onMouseUp);
      };
    }, [isDragging]);

    return (
      <div 
        ref={containerRef}
        className="relative w-full h-full min-h-[300px] md:min-h-[400px] overflow-hidden rounded-[24px] select-none cursor-ew-resize border border-primary/10 shadow-lg"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Always in background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/img/after.jpg"
            alt="Spotless clean interior"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <span className="absolute bottom-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
            After
          </span>
        </div>

        {/* Before Image (Clipping container) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 w-[100vw] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
            <Image
              src="/img/before.jpg"
              alt="Cluttered messy interior"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="absolute bottom-4 left-4 bg-muted px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
            Before
          </span>
        </div>

        {/* Draggable Bar */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
            <span className="text-primary text-xs font-bold font-sans">↔</span>
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Commit Task 2**
  ```bash
  git add components/BeforeAfter.tsx
  git commit -m "feat: add interactive Before/After comparison slider"
  ```

---

### Task 3: Build Magnetic Button Component

**Files:**
- Create: `components/MagneticButton.tsx`

- [ ] **Step 1: Write MagneticButton.tsx**
  Implement a spring-physics magnetic wrapper that pulls towards mouse coordinate bounds:
  ```tsx
  "use client";

  import { useRef, useState } from "react";
  import { motion, useMotionValue, useSpring } from "framer-motion";

  export default function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // pull strength: max 12px
      x.set(distanceX * 0.25);
      y.set(distanceY * 0.25);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Commit Task 3**
  ```bash
  git add components/MagneticButton.tsx
  git commit -m "feat: add magnetic button wrapper component"
  ```

---

### Task 4: Rebuild Homepage Layout (Bento Grid Assembly)

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/Calculator.tsx`

- [ ] **Step 1: Rewrite app/page.tsx to structure bento grid**
  Re-compose the main page content into an asymmetrical grid of glass panels. It will load `BeforeAfter`, `Calculator` as a bento card, and `Hero` as the top large block.
  (Ensure all sections fit into a custom responsive layout).

- [ ] **Step 2: Simplify and refactor Calculator.tsx as a compact Bento component**
  Reorganize `components/Calculator.tsx` to omit large page-hero blocks so it embeds beautifully inside a grid card.

- [ ] **Step 3: Commit Task 4**
  ```bash
  git commit -am "feat: assemble bento grid layout and inline compact calculator widget"
  ```

---

### Task 5: Generate Before/After Photographic Assets

**Files:**
- Create: `public/img/before.jpg`
- Create: `public/img/after.jpg`

- [ ] **Step 1: Generate before image**
  Generate a dusty, cluttered kitchen/living room image using `generate_image` with prompt: "Messy, dusty and cluttered modern kitchen sink and countertop, dirty dishes, unorganized space, interior design photography, photorealistic, 8k resolution". Save to `public/img/before.jpg`.

- [ ] **Step 2: Generate after image**
  Generate a perfectly pristine kitchen/living room image using `generate_image` with prompt: "Prerendered, perfectly clean, gleaming quartz kitchen countertop and sink, spotless white modern interior, organized kitchen, sunlit architectural design, 8k resolution". Save to `public/img/after.jpg`.

- [ ] **Step 3: Commit Task 5**
  ```bash
  git commit -am "design: save before/after generated imagery assets"
  ```

---

### Task 6: Visual Verification & Compilation

- [ ] **Step 1: Compile the project**
  Run `npm run build` and ensure zero errors.
- [ ] **Step 2: Visual Review at localhost:3000**
  Open the browser to verify Before/After slider dragging and bento hover transitions.
- [ ] **Step 3: Commit final state**
  ```bash
  git commit -am "chore: verified complete visual redesign"
  ```
