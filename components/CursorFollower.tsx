"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft elastic spring kinematics matching user global configuration guidelines
  const springConfig = { damping: 45, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 100); // offset half of the 200px glow width
      mouseY.set(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-50 mix-blend-screen opacity-25 blur-[90px] bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
