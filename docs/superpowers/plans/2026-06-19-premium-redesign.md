# SparkClean Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the SparkClean website to look extremely premium, trustworthy, and client-ready by introducing Liquid Glass styling, an interactive 3D Three.js bubble backdrop, a smooth cursor-following glow, high-end photography, and removing all "AI/Demo" indicators.

**Architecture:** We will use Next.js font loading for custom typography (`Bodoni Moda` and `Jost`), Tailwind v4 CSS variables for the color tokens, Three.js within a canvas ref for the optimized 3D bubbles background, and Framer Motion spring physics for the custom cursor glow.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js, Lucide Icons.

---

## Proposed File Map

### New Components
- `components/CursorFollower.tsx`: Custom cursor glow halo using Framer Motion.
- `components/Scene3D.tsx`: Three.js interactive bubble backdrop canvas.

### Modified Styles & Layouts
- `app/globals.css`: Update typography fonts, color system variables, custom glassmorphism styles, and shadows.
- `app/layout.tsx`: Load google fonts `Bodoni_Moda` and `Jost`.

### Redesigned Components
- `components/Header.tsx`: Remove demo pills, apply new typography.
- `components/Hero.tsx`: Integrate 3D backdrop, cursor follower, title reveals, new imagery.
- `components/Calculator.tsx`: Re-theme as a luxury booking widget.
- `components/Reviews.tsx`: Replace disclaimers, make stats/ratings look authentic.
- `components/FounderStory.tsx`: Style with premium layouts and new photography.

---

### Task 1: Setup Fonts and Theme Colors

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Load Bodoni Moda and Jost fonts in layout**
  Update `app/layout.tsx` to import and load `Bodoni_Moda` and `Jost` fonts instead of `Plus_Jakarta_Sans` and `Inter`.
  ```tsx
  import { Bodoni_Moda, Jost } from "next/font/google";

  const bodoni = Bodoni_Moda({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-bodoni",
  });

  const jost = Jost({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jost",
  });
  ```
  And update the `<html lang="en">` tag class:
  ```tsx
  <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
  ```

- [ ] **Step 2: Update Tailwind Theme Variables in globals.css**
  Update the theme tokens in `app/globals.css` to use the premium charcoal, emerald, and champagne gold palette:
  ```css
  @theme {
    --color-bg:        #FAFAF9;   /* stone white background */
    --color-surface:   #F5F8F6;   /* ultra light emerald tint */
    --color-surface-2: #EDF3F0;   
    --color-ink:       #0A120F;   /* rich charcoal ink */
    --color-primary:   #094F3B;   /* deep luxury emerald green */
    --color-primary-d: #053326;   
    --color-accent:    #D4AF37;   /* champagne gold for CTA/Trust */
    --color-muted:     #52605C;   
    --color-border:    #E2E8F0;   
    --radius:          24px;
    --maxw:            1200px;
    --ease:            cubic-bezier(0.22, 1, 0.36, 1);

    --font-display: var(--font-bodoni), serif;
    --font-sans: var(--font-jost), sans-serif;
  }
  ```

- [ ] **Step 3: Commit Task 1**
  ```bash
  git add app/layout.tsx app/globals.css
  git commit -m "design: load luxury typography and updated color tokens"
  ```

---

### Task 2: Implement CursorFollower Component

**Files:**
- Create: `components/CursorFollower.tsx`

- [ ] **Step 1: Write CursorFollower.tsx**
  Implement a smooth, performance-optimized glowing pointer tracker that follows the cursor using framer-motion spring hooks.
  ```tsx
  "use client";

  import { useEffect } from "react";
  import { motion, useMotionValue, useSpring } from "framer-motion";

  export default function CursorFollower() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 40, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - 100); // offset half of the glow width
        mouseY.set(e.clientY - 100);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
      <motion.div
        className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-50 mix-blend-screen opacity-30 blur-[80px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    );
  }
  ```

- [ ] **Step 2: Commit Task 2**
  ```bash
  git add components/CursorFollower.tsx
  git commit -m "feat: add cursor follower glow effect"
  ```

---

### Task 3: Create Interactive 3D WebGL Bubbles Backdrop

**Files:**
- Create: `components/Scene3D.tsx`

- [ ] **Step 1: Write Scene3D.tsx**
  Implement an elegant Three.js scene of floating translucent bubbles that drift upwards, wiggle, and move away from the mouse cursor coordinates.
  ```tsx
  "use client";

  import { useEffect, useRef } from "react";
  import * as THREE from "three";

  export default function Scene3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !mountRef.current) return;

      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.z = 10;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(5, 10, 7);
      scene.add(dirLight);

      const bubbleGeometry = new THREE.SphereGeometry(1, 32, 32);
      const bubbleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe6f7f2,
        transmission: 0.95,
        opacity: 0.9,
        transparent: true,
        roughness: 0.05,
        metalness: 0.02,
        ior: 1.12,
        thickness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        side: THREE.DoubleSide,
      });

      const count = 12;
      const bubbles: Array<{
        mesh: THREE.Mesh;
        speedY: number;
        driftSpeed: number;
        driftRange: number;
        baseX: number;
        initialDriftOffset: number;
      }> = [];

      for (let i = 0; i < count; i++) {
        const scale = 0.25 + Math.random() * 0.55;
        const mesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        mesh.scale.set(scale, scale, scale);

        const x = (Math.random() - 0.5) * 12;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 4;
        mesh.position.set(x, y, z);

        scene.add(mesh);
        bubbles.push({
          mesh,
          speedY: 0.004 + Math.random() * 0.006,
          driftSpeed: 0.2 + Math.random() * 0.5,
          driftRange: 0.15 + Math.random() * 0.25,
          baseX: x,
          initialDriftOffset: Math.random() * Math.PI * 2,
        });
      }

      let targetX = 0;
      let targetY = 0;
      const onMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", onMouseMove);

      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();
      let reqId: number;

      const animate = () => {
        reqId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        camera.position.x += (targetX * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (targetY * 1.2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        bubbles.forEach((b) => {
          b.mesh.position.y += b.speedY;
          b.mesh.position.x = b.baseX + Math.sin(elapsed * b.driftSpeed + b.initialDriftOffset) * b.driftRange;
          
          b.mesh.rotation.x += 0.002;
          b.mesh.rotation.y += 0.003;

          if (b.mesh.position.y > 6.0) {
            b.mesh.position.y = -6.0;
            b.mesh.position.x = (Math.random() - 0.5) * 12;
            b.baseX = b.mesh.position.x;
          }
        });

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        bubbleGeometry.dispose();
        bubbleMaterial.dispose();
        renderer.dispose();
      };
    }, []);

    return (
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        style={{ opacity: 0.65 }}
      />
    );
  }
  ```

- [ ] **Step 2: Commit Task 3**
  ```bash
  git add components/Scene3D.tsx
  git commit -m "feat: add interactive 3D soap bubbles backdrop"
  ```

---

### Task 4: Redesign Header & Footer Components

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Remove "✦ DEMO" from Logo and clean header nav**
  Modify `components/Header.tsx` to remove any `DEMO` badges, apply Jost font styles, and ensure the sticky glass navbar blends beautifully:
  ```tsx
  // in components/Header.tsx:
  // Remove "✦ DEMO" badge
  // Apply luxury display serif styling for "SparkClean" title.
  ```

- [ ] **Step 2: Remove references to "Illustrative demo" in footer**
  Modify `components/Footer.tsx` to remove the line "Live booking-system integration available on request" or "Demo site built by..." and write it like a fully live, high-end professional cleaning business.

- [ ] **Step 3: Commit Task 4**
  ```bash
  git add components/Header.tsx components/Footer.tsx
  git commit -m "design: remove demo indicators from header and footer"
  ```

---

### Task 5: Redesign Hero Component

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Update Hero component layout and integrations**
  - Import and render `<Scene3D />` and `<CursorFollower />`.
  - Use `Bodoni Moda` styling on the main h1 text.
  - Implement dynamic character/word entrance animations using Framer Motion.
  - Ensure the overlaid trust badges use glassmorphism styles with deep emerald and champagne gold accents.

- [ ] **Step 2: Commit Task 5**
  ```bash
  git add components/Hero.tsx
  git commit -m "design: redesign hero section with 3D backdrop and custom pointer glow"
  ```

---

### Task 6: Generate Real High-Quality Imagery

**Files:**
- Create/Overwrite: `/img/hero.jpg`
- Create/Overwrite: `/img/founder.jpg`
- Create/Overwrite: `/img/results1.jpg`
- Create/Overwrite: `/img/results2.jpg`
- Create/Overwrite: `/img/results3.jpg`

- [ ] **Step 1: Generate Hero home image**
  Use `generate_image` tool with a prompt: "Stunning sunlit modern luxury living room, minimalist white interior, sparkling clean quartz kitchen countertops in the background, architecturally designed, photo realistic, 8k resolution". Save to `public/img/hero.jpg`.

- [ ] **Step 2: Generate Founder family photo**
  Use `generate_image` tool with a prompt: "Warm friendly family cleaning team portrait, smiling professional local cleaners in smart emerald green polo uniforms, inside a clean bright home, soft natural light, high-end photography". Save to `public/img/founder.jpg`.

- [ ] **Step 3: Generate Results photos**
  Generate three high-end result photos showing spotless living areas, bathrooms, and bedrooms. Save to `public/img/results1.jpg`, `results2.jpg`, `results3.jpg`.

- [ ] **Step 4: Commit Task 6**
  ```bash
  git commit -m "design: replace all placeholders with high-end generated photography assets"
  ```

---

### Task 7: Redesign Pricing, Reviews, and Calculator

**Files:**
- Modify: `components/Calculator.tsx`
- Modify: `components/Reviews.tsx`

- [ ] **Step 1: Update Calculator to feel luxurious**
  Re-theme the pricing calculator with champagne-gold highlights, glass panels (`glass-panel`), and sleek inputs. Ensure the pricing math in `lib/pricing.ts` is preserved.

- [ ] **Step 2: Clean up Reviews disclaimers and text**
  Modify `components/Reviews.tsx` to remove comments like "Reviews shown are illustrative demo content." and replace mock reviews with extremely realistic client testimonials from affluent neighborhoods in Toronto (e.g. Forest Hill, Rosedale, The Annex).

- [ ] **Step 3: Commit Task 7**
  ```bash
  git add components/Calculator.tsx components/Reviews.tsx
  git commit -m "design: re-themed calculator and made reviews fully realistic"
  ```

---

### Task 8: Verification & Compilation Check

- [ ] **Step 1: Compile the project**
  Run `npm run build` to verify there are no TypeScript, compilation, or styling issues.
- [ ] **Step 2: Verify responsiveness and visuals**
  Run the dev server and test sections, layout transitions, and interactive canvas backgrounds.
- [ ] **Step 3: Commit final build state**
  ```bash
  git commit -am "chore: verified final build and visual styling compliance"
  ```
