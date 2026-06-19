"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a ref for isDragging to avoid stale closure in event handlers
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const startDrag = useCallback(() => {
    isDraggingRef.current = true;
    setIsDragging(true);
  }, []);

  const stopDrag = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      handleMove(e.touches[0].clientX);
    };

    const onEnd = () => {
      stopDrag();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [handleMove, stopDrag]);

  return (
    <div 
      ref={containerRef}
      className="@container relative w-full h-[360px] md:h-[450px] overflow-hidden rounded-[32px] select-none cursor-ew-resize border border-[var(--color-primary)]/10 shadow-[0_12px_40px_rgba(6,61,46,0.06)]"
      style={{ touchAction: "none" }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {/* After Image (Always in background, luxury clean kitchen) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/after.png"
          alt="Spotless luxury kitchen after cleaning"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent pointer-events-none" />
        <span className="absolute bottom-6 right-6 bg-[var(--color-primary)]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-md">
          After
        </span>
      </div>

      {/* Before Image (Clipping container, dusty/unclean) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ width: `${sliderPos}%` }}
      >
        {/* We use container queries (100cqw) so the inner image aligns perfectly with the outer container during SSR */}
        <div className="absolute inset-0 h-full" style={{ width: "100cqw" }}>
          <Image
            src="/img/before.png"
            alt="Cluttered kitchen before cleaning"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover filter brightness-[0.85] contrast-[0.9]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/30 to-transparent pointer-events-none" />
        </div>
        <span className="absolute bottom-6 left-6 bg-[var(--color-muted)]/85 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-md">
          Before
        </span>
      </div>

      {/* Draggable Champagne Gold Bar */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-[var(--color-accent)] cursor-ew-resize z-20 shadow-[0_0_12px_rgba(212,175,55,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.3)] cursor-ew-resize"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: isDragging ? 1.1 : 1.0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
            <path d="M9 18v-12"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
