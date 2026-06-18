"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
}

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, lastX: 0, lastY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const broomRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    // Disable entirely if prefers reduced motion or no fine pointer (touch devices)
    if (reduce) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initialize position
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.targetX = mouseRef.current.x;
    mouseRef.current.targetY = mouseRef.current.y;

    const tick = () => {
      const mouse = mouseRef.current;
      
      // Lerp position
      const ease = 0.15;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Calculate velocity
      const vx = mouse.x - mouse.lastX;
      const vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      const speed = Math.sqrt(vx * vx + vy * vy);

      // Rotate broom based on horizontal velocity
      const targetRotation = Math.max(-25, Math.min(25, vx * 1.5));
      rotationRef.current += (targetRotation - rotationRef.current) * 0.1;

      // Update broom element style
      if (broomRef.current) {
        broomRef.current.style.transform = `translate3d(${mouse.x - 6}px, ${mouse.y - 18}px, 0) rotate(${rotationRef.current}deg)`;
      }

      // Draw particles on canvas
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn particles under the broom head (offset slightly left-bottom relative to hot-spot)
        if (speed > 1 && particlesRef.current.length < 40) {
          particlesRef.current.push({
            x: mouse.x - 2 + (Math.random() - 0.5) * 6,
            y: mouse.y + 6 + (Math.random() - 0.5) * 6,
            vx: -vx * 0.1 + (Math.random() - 0.5) * 0.5,
            vy: 0.8 + Math.random() * 0.4, // gently falls
            alpha: 0.6,
            life: 600,
          });
        }

        // Update and draw particles
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.02; // gravity
          p.alpha -= 1.4 / p.life; // decay
          p.life -= 16; // approx time per frame

          if (p.alpha <= 0 || p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = `rgba(15, 182, 126, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 + Math.random() * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [reduce]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] h-screen w-screen"
      />
      <div
        ref={broomRef}
        className="fixed left-0 top-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: "24px",
          height: "24px",
          transformOrigin: "20% 80%",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Broom handle */}
          <path d="M19 5L12 12" stroke="#0F1A17" strokeWidth="2.2" strokeLinecap="round" />
          {/* Bristles connector */}
          <path d="M13 13L9 9" stroke="#FFC53D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Broom bristles */}
          <path d="M13 13L9 17C8.5 17.5 7.5 17.5 7 17L5 15C4.5 14.5 4.5 13.5 5 13L9 9" fill="#0FB67E" stroke="#0A8C60" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 18.5L7 16.5M3.5 16.5L5.5 14.5M6.5 20.5L8.5 18.5" stroke="#0F1A17" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
