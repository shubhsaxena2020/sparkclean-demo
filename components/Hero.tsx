"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BOOKING_URL } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

const BADGES = [
  "Insured & Bonded",
  "Eco-Friendly",
  "Background-Checked",
  "100% Satisfaction Guarantee",
];

function HeroArt() {
  // Clean inline-SVG illustration: a home with a sparkle/leaf motif. No photos.
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 440 380"
      className="h-auto w-full max-w-[480px]"
      role="img"
      aria-label="A sparkling clean home illustration"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eafaf3" />
          <stop offset="1" stopColor="#f4fbf8" />
        </linearGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0fb67e" />
          <stop offset="1" stopColor="#0a8c60" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect x="20" y="20" width="400" height="320" rx="28" fill="url(#sky)" />

      {/* floating soft blobs */}
      <circle cx="360" cy="80" r="34" fill="#0fb67e" opacity="0.12" />
      <circle cx="80" cy="300" r="26" fill="#ffc53d" opacity="0.22" />

      {/* house */}
      <g>
        <path d="M120 180 L220 110 L320 180 Z" fill="url(#roof)" />
        <rect x="140" y="178" width="160" height="120" rx="10" fill="#ffffff" stroke="#e3eae7" strokeWidth="2" />
        {/* door */}
        <rect x="200" y="232" width="40" height="66" rx="6" fill="#0fb67e" opacity="0.18" />
        <rect x="200" y="232" width="40" height="66" rx="6" fill="none" stroke="#0a8c60" strokeWidth="2" />
        <circle cx="232" cy="266" r="2.5" fill="#0a8c60" />
        {/* windows */}
        <rect x="158" y="198" width="34" height="34" rx="5" fill="#eafaf3" stroke="#0fb67e" strokeWidth="1.5" />
        <rect x="250" y="198" width="34" height="34" rx="5" fill="#eafaf3" stroke="#0fb67e" strokeWidth="1.5" />
        <path d="M158 215h34M175 198v34" stroke="#0fb67e" strokeWidth="1.2" opacity="0.6" />
        <path d="M250 215h34M267 198v34" stroke="#0fb67e" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* leaf accent by the door */}
      <path
        d="M150 300c0-22 14-36 38-36 0 24-14 38-36 38 0-11 6-19 16-25"
        fill="none"
        stroke="#0a8c60"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* sparkles */}
      {[
        { x: 330, y: 150, s: 1 },
        { x: 110, y: 120, s: 0.7 },
        { x: 300, y: 250, s: 0.6 },
      ].map((sp, i) => (
        <motion.path
          key={i}
          d={`M${sp.x} ${sp.y - 14 * sp.s}c${2.5 * sp.s} ${9 * sp.s} ${5 * sp.s} ${11.5 * sp.s} ${14 * sp.s} ${14 * sp.s}c-${9 * sp.s} ${2.5 * sp.s}-${11.5 * sp.s} ${5 * sp.s}-${14 * sp.s} ${14 * sp.s}c-${2.5 * sp.s}-${9 * sp.s}-${5 * sp.s}-${11.5 * sp.s}-${14 * sp.s}-${14 * sp.s}c${9 * sp.s}-${2.5 * sp.s} ${11.5 * sp.s}-${5 * sp.s} ${14 * sp.s}-${14 * sp.s}z`}
          fill="#ffc53d"
          initial={reduce ? false : { opacity: 0.3, scale: 0.8 }}
          animate={reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface to-bg" />
      <div className="mx-auto grid max-w-[var(--maxw)] items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 text-xs font-semibold text-primary-d">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Toronto&apos;s trusted home cleaning
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            A spotless home,
            <br className="hidden sm:block" /> booked in{" "}
            <span className="text-primary">60 seconds.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Eco-friendly, insured, and trusted across the GTA. Get an instant
            price and book online — no waiting for a callback.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-ink shadow-sm transition-all hover:bg-accent-d hover:shadow-md active:translate-y-px"
            >
              Book Now
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-3.5 text-base font-bold text-primary-d transition-colors hover:bg-surface"
            >
              Calculate Your Price
              <ArrowRightIcon width={18} height={18} />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {BADGES.map((b) => (
              <li key={b} className="flex items-center gap-1.5 text-sm font-medium text-ink/75">
                <svg viewBox="0 0 24 24" width="16" height="16" className="text-primary" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12l5 5 9-10" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroArt />
        </motion.div>
      </div>
    </section>
  );
}
