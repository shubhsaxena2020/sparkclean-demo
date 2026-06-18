"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";
import { RevealEyebrow, RevealSubtext } from "./Reveal";
import { ArrowRightIcon } from "./icons";
import Scene3D from "./Scene3D";

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

  // Mouse tilt tracking values (trysoloai.com premium 3D feel)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left - width / 2;
    const clientY = e.clientY - rect.top - height / 2;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      className="relative overflow-hidden bg-white blueprint-grid border-b border-[var(--color-border)]" 
      style={{ background: "radial-gradient(circle at 10% 20%, rgba(15,182,126,0.04), transparent 50%)" }}
    >
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Interactive 3D Soap Bubbles Backdrop */}
      <Scene3D />

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

          <RevealSubtext delay={0.16} className="mt-8 flex flex-col gap-3.5 w-full sm:w-auto sm:flex-row" as="div">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_12px_rgba(255,197,61,0.25)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#F5B625] hover:shadow-[0_6px_20px_rgba(255,197,61,0.4)] active:translate-y-0 relative z-25"
            >
              Book Now
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-8 py-4 text-base font-bold text-primary transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-primary/5 hover:shadow-[0_4px_12px_rgba(15,182,126,0.1)] active:translate-y-0 relative z-25"
            >
              Calculate Your Price
              <ArrowRightIcon width={18} height={18} className="text-primary" />
            </a>
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
            className="flex justify-center lg:justify-end items-center w-full max-w-[440px] cursor-grab active:cursor-grabbing"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 1.03 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-square" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Floating Cards (SoloAI vibe) */}
              <div 
                className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3.5 rounded-2xl bg-white/95 p-3.5 shadow-[0_12px_30px_-5px_rgba(15,26,23,0.08)] border border-[var(--color-border)] backdrop-blur-md animate-float-1 pointer-events-auto hover:scale-105 transition-transform"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary text-sm font-bold">★</div>
                <div>
                  <div className="text-[11px] font-black text-ink">4.9/5 GTA Rating</div>
                  <div className="text-[9px] text-muted font-bold leading-none mt-0.5">Top-rated clean team</div>
                </div>
              </div>

              <div 
                className="absolute top-1/3 -right-8 z-20 hidden sm:flex items-center gap-3.5 rounded-2xl bg-white/95 p-3.5 shadow-[0_12px_30px_-5px_rgba(15,26,23,0.08)] border border-[var(--color-border)] backdrop-blur-md animate-float-2 pointer-events-auto hover:scale-105 transition-transform"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-accent/20 text-[#c2911b] text-sm font-bold">⚡</div>
                <div>
                  <div className="text-[11px] font-black text-ink">Booked in 60s</div>
                  <div className="text-[9px] text-muted font-bold leading-none mt-0.5">Instant online pricing</div>
                </div>
              </div>

              <div 
                className="absolute -bottom-8 -left-8 z-20 hidden sm:flex items-center gap-3.5 rounded-2xl bg-white/95 p-3.5 shadow-[0_12px_30px_-5px_rgba(15,26,23,0.08)] border border-[var(--color-border)] backdrop-blur-md animate-float-3 pointer-events-auto hover:scale-105 transition-transform"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary text-sm font-bold">✓</div>
                <div>
                  <div className="text-[11px] font-black text-ink">Insured & Bonded</div>
                  <div className="text-[9px] text-muted font-bold leading-none mt-0.5">100% secure service</div>
                </div>
              </div>

              {/* Main Image Frame with border glow and perspective */}
              <div 
                className="overflow-hidden rounded-[24px] border border-[var(--color-border)] shadow-[0_15px_40px_-15px_rgba(15,26,23,0.18)] w-full h-full relative group"
                style={{ transform: "translateZ(10px)" }}
              >
                <Image
                  src="/img/hero.jpg"
                  alt="Bright, clean modern living room filled with sunlight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <div 
                className="absolute -bottom-3 -right-3 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(15,182,126,0.25)] flex items-center gap-1 z-10 sm:hidden"
                style={{ transform: "translateZ(20px)" }}
              >
                <span>★ 4.9 average rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

