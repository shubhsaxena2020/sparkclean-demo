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
      window.addEventListener("touchmove", onTouchMove, { passive: true });
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
        <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
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
