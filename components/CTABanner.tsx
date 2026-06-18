import { Reveal } from "./Reveal";
import { BOOKING_URL } from "@/lib/site";

export default function CTABanner() {
  return (
    <section 
      className="w-full py-20 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0FB67E, #0A8C60)" }}
    >
      {/* Subtle static dot matrix overlay (<5% opacity) */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-[0.035] pointer-events-none" />

      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6 relative z-10">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.05]">
            Ready for a spotless space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/95 sm:text-lg leading-[1.7]">
            Get your instant price and book in under a minute. Same-day slots
            across the GTA.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_12px_rgba(255,197,61,0.25)] transition-all hover:bg-[#F5B625] hover:shadow-[0_6px_20px_rgba(255,197,61,0.4)] active:translate-y-px"
          >
            Book Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
