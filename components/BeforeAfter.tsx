"use client";

import { useId, useState } from "react";
import Image from "next/image";

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const labelId = useId();

  return (
    <div className="grid gap-4">
      <div
        className="@container relative h-[360px] w-full overflow-hidden rounded-[28px] border border-[var(--color-primary)]/10 shadow-[0_12px_40px_rgba(6,61,46,0.06)]"
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/img/after.jpg"
            alt="Sample kitchen after a professional deep cleaning"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent pointer-events-none" />
          <span className="absolute bottom-6 right-6 rounded-full bg-[var(--color-primary)]/84 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-md backdrop-blur-md">
            After
          </span>
        </div>

        <div
          className="absolute inset-0 z-10 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 h-full" style={{ width: "100cqw" }}>
            <Image
              src="/img/before.jpg"
              alt="Sample kitchen before a professional deep cleaning"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover brightness-[0.85] contrast-[0.92]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/30 to-transparent pointer-events-none" />
          </div>
          <span className="absolute bottom-6 left-6 rounded-full bg-[var(--color-muted)]/86 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-md backdrop-blur-md">
            Before
          </span>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 top-0 z-20 w-[2px] bg-[var(--color-accent)] shadow-[0_0_12px_rgba(212,175,55,0.5)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-primary)] shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
              <path d="M9 18v-12" />
            </svg>
          </div>
        </div>

        <input
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderPos}
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(event) => setSliderPos(Number(event.target.value))}
          className="absolute inset-x-4 bottom-4 z-30 h-8 cursor-ew-resize opacity-0 focus-visible:opacity-100"
        />
      </div>
      <p id={labelId} className="text-sm font-semibold text-[var(--color-muted)]">
        Compare sample before and after imagery. Use the slider to reveal more or less of the before image.
      </p>
    </div>
  );
}
