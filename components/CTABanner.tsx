import { Reveal } from "./Reveal";
import { BOOKING_URL } from "@/lib/site";

export default function CTABanner() {
  return (
    <section className="mx-auto max-w-[var(--maxw)] px-4 py-12 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card)+8px)] bg-primary px-6 py-14 text-center shadow-[0_18px_50px_rgba(15,182,126,0.28)] sm:px-12">
          {/* decorative sparkles */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
            <circle cx="12%" cy="30%" r="48" fill="#ffffff" />
            <circle cx="88%" cy="70%" r="64" fill="#ffffff" />
          </svg>
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready for a spotless space?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/90 sm:text-lg">
              Get your instant price and book in under a minute. Same-day slots
              across the GTA.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-base font-bold text-ink shadow-md transition-all hover:bg-accent-d active:translate-y-px"
            >
              Book Now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
