"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 500, suffix: "+", label: "Cleans booked" },
  { value: 4.9, suffix: "★", label: "Average rating" },
  { value: 12, suffix: "", label: "GTA areas served" },
  { value: 100, suffix: "%", label: "Satisfaction guarantee" },
];

function CountUpNumber({
  value,
  suffix = "",
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toString() + suffix;
      return;
    }

    let start = 0;
    const end = value;
    const isFloat = value % 1 !== 0;
    const totalTicks = 60 * duration;
    let currentTick = 0;

    const animate = () => {
      currentTick++;
      const progress = currentTick / totalTicks;
      // Cubic ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (end - start) * easeOut;

      if (ref.current) {
        ref.current.textContent =
          (isFloat ? currentVal.toFixed(1) : Math.floor(currentVal).toString()) + suffix;
      }

      if (currentTick < totalTicks) {
        requestAnimationFrame(animate);
      } else {
        if (ref.current) ref.current.textContent = value.toString() + suffix;
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, suffix, duration, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-10 gap-x-6 text-center md:grid-cols-4">
            {STATS.map(({ value, suffix, label }) => (
              <li key={label} className="flex flex-col items-center">
                <span className="font-display text-4xl font-extrabold text-primary sm:text-5xl leading-none">
                  <CountUpNumber value={value} suffix={suffix} />
                </span>
                <span className="mt-2.5 text-sm font-semibold text-muted">
                  {label}
                </span>
              </li>
            ))}
          </ul>

        </Reveal>
      </div>
    </section>
  );
}
