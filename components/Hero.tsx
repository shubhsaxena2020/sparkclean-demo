"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";
import { RevealEyebrow, RevealSubtext } from "./Reveal";
import { ArrowRightIcon } from "./icons";
import Scene3D from "./Scene3D";
import CursorFollower from "./CursorFollower";
import BeforeAfter from "./BeforeAfter";
import MagneticButton from "./MagneticButton";

const BADGES = [
  "Insured & Bonded",
  "Eco-Friendly",
  "Background-Checked",
  "100% Satisfaction Guarantee",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const layerBg1Ref = useRef<HTMLDivElement>(null);
  const layerBg2Ref = useRef<HTMLDivElement>(null);
  const layerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Keep total movement tiny (<= 24px)
          const yBg1 = Math.min(24, Math.max(-24, scrollY * 0.06));
          const yBg2 = Math.min(16, Math.max(-16, scrollY * -0.04));
          const yImg = Math.min(12, Math.max(-12, scrollY * 0.03));

          if (layerBg1Ref.current) {
            layerBg1Ref.current.style.transform = `translate3d(0, ${yBg1}px, 0)`;
          }
          if (layerBg2Ref.current) {
            layerBg2Ref.current.style.transform = `translate3d(0, ${yBg2}px, 0)`;
          }
          if (layerImageRef.current) {
            layerImageRef.current.style.transform = `translate3d(0, ${yImg}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section 
      className="relative overflow-hidden bg-[var(--color-bg)] blueprint-grid border-b border-[var(--color-border)] min-h-[85vh] flex items-center" 
      style={{ background: "radial-gradient(circle at 10% 20%, rgba(9, 79, 59, 0.05), transparent 60%)" }}
    >
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Interactive 3D Soap Bubbles Backdrop */}
      <Scene3D />

      {/* Interactive Cursor Glow Follower */}
      <CursorFollower />


      {/* Background blobs for parallax */}
      <div 
        ref={layerBg1Ref}
        className="absolute -left-10 top-10 w-72 h-72 rounded-full bg-[rgba(15,182,126,0.03)] blur-3xl pointer-events-none z-0 will-change-transform" 
      />
      <div 
        ref={layerBg2Ref}
        className="absolute right-0 bottom-10 w-96 h-96 rounded-full bg-[rgba(15,182,126,0.045)] blur-3xl pointer-events-none z-0 will-change-transform" 
      />

      <div className="mx-auto grid max-w-[var(--maxw)] items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:py-36 relative z-10">
        <div className="flex flex-col items-start">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block mb-3">
            TORONTO&apos;S TRUSTED HOME CLEANING
          </RevealEyebrow>

          <motion.h1
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.15 }}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.8rem]"
          >
            <motion.span variants={reduce ? undefined : lineVariants} className="block">
              A spotless home,
            </motion.span>
            <motion.span variants={reduce ? undefined : lineVariants} className="block text-primary">
              booked in 60 seconds.
            </motion.span>
          </motion.h1>

          <RevealSubtext className="mt-6 max-w-xl text-lg leading-[1.7] text-muted">
            Eco-friendly, insured, and trusted across the GTA. Get an instant
            price and book online — no waiting for a callback.
          </RevealSubtext>

          <RevealSubtext delay={0.16} className="mt-8 flex flex-wrap gap-4 w-full" as="div">
            <MagneticButton>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-white shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(212,175,55,0.45)] relative z-25"
              >
                Book in 60 Seconds
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--color-primary)] px-8 py-4 text-base font-bold text-[var(--color-primary)] transition-all duration-300 ease-out hover:bg-[var(--color-primary)]/5 hover:shadow-[0_4px_15px_rgba(9,79,59,0.15)] relative z-25"
              >
                Calculate Your Price
                <ArrowRightIcon width={18} height={18} className="text-[var(--color-primary)]" />
              </a>
            </MagneticButton>
          </RevealSubtext>

          <RevealSubtext delay={0.22} as="div">
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
              {BADGES.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm px-3.5 py-1 text-xs font-semibold text-ink shadow-[0_2px_8px_rgba(15,182,126,0.02)] hover:border-primary/40 hover:bg-white/80 transition-all duration-250"
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
          </RevealSubtext>
        </div>

        <div ref={layerImageRef} className="will-change-transform w-full flex justify-center lg:justify-end relative z-20">
          <motion.div
            className="w-full max-w-[500px]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BeforeAfter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

