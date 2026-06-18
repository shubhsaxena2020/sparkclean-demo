"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const NEON_COLORS = [
  "#00ff87", // Neon Green
  "#00f3ff", // Neon Cyan
  "#ffc53d", // Gold Yellow
  "#ff007f", // Neon Pink
];

export default function CustomCursor() {
  const broomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop cursor)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    if (isMobile) return;

    // --- State & Refs for Tracking ---
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0 };
    const currentPos = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let particles: Particle[] = [];
    let animationFrameId: number;

    // Handle Resize for full-screen canvas
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // --- Animation Loop ---
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let sweepTime = 0;

    const tick = () => {
      // 1. Lerp Broom Position for smooth follow
      const ease = 0.18;
      currentPos.x += (mouse.x - currentPos.x) * ease;
      currentPos.y += (mouse.y - currentPos.y) * ease;

      // Calculate velocity
      velocity.x = currentPos.x - mouse.lastX;
      velocity.y = currentPos.y - mouse.lastY;

      mouse.lastX = currentPos.x;
      mouse.lastY = currentPos.y;

      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

      // Increment sweepTime if mouse is moving to animate wiggle
      if (speed > 0.3) {
        sweepTime += Math.min(speed * 0.15, 0.4);
      }

      // Update Broom CSS translation & rotation (sweeping tilt & active wiggle)
      const broom = broomRef.current;
      if (broom) {
        // Base tilt from movement direction
        const baseTilt = Math.max(Math.min(velocity.x * 0.8, 15), -15);
        
        // Dynamic wiggle when moving (simulates active left-right sweeping)
        const wiggleAmp = Math.min(speed * 1.5, 14); // max wiggle amplitude 14 degrees
        const wiggle = Math.sin(sweepTime * 1.8) * wiggleAmp;
        
        const targetRotation = baseTilt + wiggle;
        broom.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0) rotate(${targetRotation}deg)`;
      }

      // 2. Spawn Neon Dust Particles (smooth mist, high density, small sizes)
      if (speed > 0.8 && isVisible) {
        const spawnCount = Math.min(Math.floor(speed * 0.8) + 2, 8);
        const moveAngle = Math.atan2(velocity.y, velocity.x) + Math.PI; // opposite direction
        
        for (let i = 0; i < spawnCount; i++) {
          const spread = 0.6; // radians spread
          const angle = moveAngle + (Math.random() - 0.5) * spread;
          const force = speed * 0.08 + Math.random() * 0.4;
          
          particles.push({
            x: currentPos.x - velocity.x * 0.3 + (Math.random() - 0.5) * 4,
            y: currentPos.y + 16 - velocity.y * 0.3 + (Math.random() - 0.5) * 2,
            vx: Math.cos(angle) * force + (Math.random() - 0.5) * 0.3,
            vy: Math.sin(angle) * force + (Math.random() - 0.5) * 0.3 - 0.15,
            size: Math.random() * 1.6 + 0.5,
            color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
            alpha: 0.95,
            decay: Math.random() * 0.035 + 0.02,
          });
        }
      }

      // 3. Update and Draw Particles in Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply blur filter to canvas for smooth neon mist effect
        ctx.filter = "blur(1.5px)";

        // Filter and update particles
        particles = particles.filter((p) => {
          p.x += p.vx;
          p.y += p.vy;
          
          // Friction (particles decelerate in air)
          p.vx *= 0.93;
          p.vy *= 0.93;
          
          p.alpha -= p.decay;

          if (p.alpha <= 0) return false;

          // Draw neon particle with soft radial gradient
          ctx.save();
          ctx.globalAlpha = p.alpha;
          
          const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          pGlow.addColorStop(0, p.color);
          pGlow.addColorStop(0.3, p.color);
          pGlow.addColorStop(1, "transparent");
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = pGlow;
          ctx.fill();
          ctx.restore();

          return true;
        });

        // Reset filter
        ctx.filter = "none";
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* 2D Canvas for Particle Spray */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] w-screen h-screen"
      />

      {/* Custom Broom Pointer */}
      <div
        ref={broomRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-4 -mt-4 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "32px",
          height: "32px",
          willChange: "transform, opacity",
          transformOrigin: "50% 85%", // Rotate around broom bristle base
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Broom Handle */}
          <line
            x1="26"
            y1="6"
            x2="15"
            y2="19"
            stroke="#f8fafc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Broom Handle Joint */}
          <path
            d="M13.5 17.5L16.5 20.5"
            stroke="#ffc53d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Broom Bristles (Sweeper base) */}
          <path
            d="M8 27C8 25 10 21 15 21C20 21 22 25 22 27H8Z"
            fill="#00ff87"
            stroke="#00cc6a"
            strokeWidth="1"
          />
          {/* Bristle Lines */}
          <line x1="10" y1="23" x2="10" y2="27" stroke="#040a0e" strokeWidth="1" />
          <line x1="12" y1="22" x2="12" y2="27" stroke="#040a0e" strokeWidth="1" />
          <line x1="15" y1="21" x2="15" y2="27" stroke="#040a0e" strokeWidth="1" />
          <line x1="18" y1="22" x2="18" y2="27" stroke="#040a0e" strokeWidth="1" />
          <line x1="20" y1="23" x2="20" y2="27" stroke="#040a0e" strokeWidth="1" />
          {/* Tiny sparkles on the broom */}
          <circle cx="28" cy="4" r="1.5" fill="#ffc53d" />
          <circle cx="5" cy="22" r="1" fill="#00f3ff" />
        </svg>
      </div>
    </>
  );
}
