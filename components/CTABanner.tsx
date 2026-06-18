import { Reveal } from "./Reveal";
import { BOOKING_URL } from "@/lib/site";

export default function CTABanner() {
  return (
    <section className="mx-auto max-w-[var(--maxw)] px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0fb67e] to-[#0a8c60] px-6 py-20 text-center shadow-[0_20px_40px_rgba(10,140,96,0.18)] sm:px-16 sm:py-24">
          {/* Subtle static dot matrix overlay (<4% opacity) */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-[0.035] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight sm:leading-none">
              Ready for a spotless space?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg leading-[1.7]">
              Get your instant price and book in under a minute. Same-day slots
              across the GTA.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_10px_rgba(255,197,61,0.2)] transition-all hover:bg-accent-d hover:shadow-[0_6px_15px_rgba(255,197,61,0.35)] active:translate-y-px"
            >
              Book Now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
