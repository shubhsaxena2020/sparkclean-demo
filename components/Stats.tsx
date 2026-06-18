"use client";

import { Reveal } from "./Reveal";

const STATS = [
  { value: "500+", label: "Cleans booked" },
  { value: "4.9★", label: "Average rating" },
  { value: "12", label: "GTA areas served" },
  { value: "100%", label: "Satisfaction guarantee" },
];

export default function Stats() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-10 gap-x-6 text-center md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <li key={label} className="flex flex-col items-center">
                <span className="font-display text-4xl font-extrabold text-primary sm:text-5xl leading-none">
                  {value}
                </span>
                <span className="mt-2.5 text-sm font-semibold text-muted">
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-[10px] text-muted/60">
            * illustrative demo figures
          </p>
        </Reveal>
      </div>
    </section>
  );
}
