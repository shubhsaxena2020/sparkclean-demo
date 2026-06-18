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
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-auto w-full max-w-[400px] opacity-75"
      role="img"
      aria-label="Abstract soft green spheres representing purity and calm"
    >
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0fb67e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0fb67e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2ef0aa" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2ef0aa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eafaf3" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#eafaf3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
      <circle cx="240" cy="220" r="120" fill="url(#grad2)" />
      <circle cx="120" cy="240" r="90" fill="url(#grad3)" />
      <circle cx="180" cy="200" r="55" fill="#0fb67e" opacity="0.03" />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface to-bg" />
      {/* 2% Noise Grain Overlay */}
      <svg className="absolute inset-0 -z-20 h-full w-full opacity-[0.02] pointer-events-none" aria-hidden="true">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <div className="mx-auto grid max-w-[var(--maxw)] items-center gap-10 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:py-36">
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary block mb-3">
            Toronto&apos;s trusted home cleaning
          </span>

          <motion.h1
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.8rem]"
          >
            <motion.span variants={reduce ? undefined : lineVariants} className="block">
              A spotless home,
            </motion.span>
            <motion.span variants={reduce ? undefined : lineVariants} className="block text-primary">
              booked in 60 seconds.
            </motion.span>
          </motion.h1>

          <p className="mt-6 max-w-xl text-lg leading-[1.7] text-muted">
            Eco-friendly, insured, and trusted across the GTA. Get an instant
            price and book online — no waiting for a callback.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 w-full sm:w-auto sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_10px_rgba(255,197,61,0.2)] transition-all hover:bg-accent-d hover:shadow-[0_6px_15px_rgba(255,197,61,0.35)] active:translate-y-px"
            >
              Book Now
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-8 py-4 text-base font-bold text-primary-d transition-colors hover:bg-primary/5"
            >
              Calculate Your Price
              <ArrowRightIcon width={18} height={18} className="text-primary-d" />
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
            {BADGES.map((b) => (
              <li
                key={b}
                className="flex items-center gap-1.5 rounded-full border border-[#e3eae7] bg-white px-3.5 py-1 text-xs font-semibold text-ink/80"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  className="text-primary shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroArt />
        </motion.div>
      </div>
    </section>
  );
}
