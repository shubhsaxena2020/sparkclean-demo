"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
    <section 
      className="relative overflow-hidden bg-white" 
      style={{ background: "radial-gradient(circle at 10% 20%, rgba(15,182,126,0.04), transparent 50%)" }}
    >
      <div className="mx-auto grid max-w-[var(--maxw)] items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:py-36">
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block mb-3">
            TORONTO&apos;S TRUSTED HOME CLEANING
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
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_12px_rgba(255,197,61,0.25)] transition-all hover:bg-[#F5B625] hover:shadow-[0_6px_20px_rgba(255,197,61,0.4)] active:translate-y-px"
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
                className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-transparent px-3.5 py-1 text-xs font-semibold text-ink shadow-[0_2px_8px_rgba(15,182,126,0.02)]"
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
          className="flex justify-center lg:justify-end items-center"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 1.03 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-square">
            <div className="overflow-hidden rounded-[24px] border border-[var(--color-border)] shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] w-full h-full relative">
              <Image
                src="/img/hero.jpg"
                alt="Bright, clean modern living room filled with sunlight"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -left-3 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(15,182,126,0.25)] flex items-center gap-1 z-10">
              <span>★ 4.9 average rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
