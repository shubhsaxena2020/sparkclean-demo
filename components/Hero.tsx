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
      <div className="mx-auto grid max-w-[var(--maxw)] items-center gap-10 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-2 lg:py-36">
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary block mb-3">
            Toronto&apos;s trusted home cleaning
          </span>

          <motion.h1
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[3.8rem]"
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
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-bg shadow-[0_4px_10px_rgba(255,197,61,0.25)] transition-all hover:bg-accent-d hover:shadow-[0_6px_15px_rgba(255,197,61,0.4)] active:translate-y-px"
            >
              Book Now
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-8 py-4 text-base font-bold text-primary transition-colors hover:bg-primary/5"
            >
              Calculate Your Price
              <ArrowRightIcon width={18} height={18} className="text-primary" />
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
            {BADGES.map((b) => (
              <li
                key={b}
                className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-3.5 py-1 text-xs font-semibold text-white/95"
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
          className="flex justify-center lg:justify-end min-h-[300px] lg:min-h-[400px] pointer-events-none"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Empty spacer space to allow background 3D bubble to float here on desktop */}
        </motion.div>
      </div>
    </section>
  );
}
