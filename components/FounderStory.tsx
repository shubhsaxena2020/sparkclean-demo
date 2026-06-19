"use client";

import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext } from "./Reveal";
import { LeafIcon } from "./icons";
import Image from "next/image";
import Link from "next/link";

export default function FounderStory({ showLink = false }: { showLink?: boolean }) {

  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32 lg:py-36 border-b border-[var(--color-border)]">
      {/* Decorative background shape */}
      <div className="absolute -right-20 top-0 w-80 h-80 rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-center">
          
          {/* Left Column: Story (text) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative">
            <span className="absolute -top-16 -left-4 font-display text-[9rem] font-black text-primary/[0.04] leading-none pointer-events-none select-none">
              02
            </span>

            <div className="flex items-center gap-3 relative z-10">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-sm font-black text-white shrink-0 shadow-[0_4px_12px_rgba(15,182,126,0.15)]">
                SC
              </span>
              <RevealEyebrow className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Founder Story
              </RevealEyebrow>
            </div>

            <RevealHeading 
              text="Our Founder's Story" 
              className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
              as="h2"
            />

            <RevealSubtext className="mt-6 text-xl sm:text-2xl leading-[1.6] text-ink italic font-medium relative z-10 pl-4 border-l-4 border-primary/40">
              &ldquo;SparkClean started with one family, one minivan, and a
              simple promise: show up on time, use products safe for kids and
              pets, and leave every home better than we found it. We&apos;re
              not a franchise — we&apos;re your neighbours, and our name is on
              every clean.&rdquo;
            </RevealSubtext>

            <RevealSubtext className="mt-6 text-sm font-bold text-muted relative z-10">
              — The SparkClean family · Family-owned in the GTA
            </RevealSubtext>

            {showLink && (
              <RevealSubtext className="mt-8 relative z-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-d transition-colors"
                >
                  About us →
                </Link>
              </RevealSubtext>
            )}
          </div>

          {/* Right Column: Visual (image) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <Reveal className="w-full max-w-[380px]">
              <div 
                className="relative border border-[var(--color-border)] p-4 bg-white shadow-[0_20px_50px_-20px_rgba(15,26,23,0.15)] rounded-[32px] md:-rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(15,182,126,0.2)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[var(--color-border)] group">
                  <Image
                    src="/img/founder.jpg"
                    alt="Friendly professional cleaner smiling in a clean bright house"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
