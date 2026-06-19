import { RevealHeading, RevealSubtext } from "./Reveal";
import { BOOKING_URL } from "@/lib/site";

export default function CTABanner() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 text-center"
      style={{ background: "linear-gradient(135deg, #15130D, #2A2618)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-[0.035] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <RevealHeading
          as="h2"
          text="Ready to turn estimate interest into a quote request?"
          className="text-3xl font-black tracking-[-0.02em] text-white sm:text-5xl leading-[1.03]"
        />
        <RevealSubtext className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-white/90 sm:text-lg">
          Capture the details a cleaning team needs before confirming availability,
          final price, access instructions, and service scope.
        </RevealSubtext>
        <RevealSubtext delay={0.16}>
          <a
            href={BOOKING_URL}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-ink shadow-[0_4px_12px_rgba(255,197,61,0.25)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#F5B625] hover:shadow-[0_6px_20px_rgba(255,197,61,0.4)] active:translate-y-0"
          >
            Request Quote
          </a>
        </RevealSubtext>
      </div>
    </section>
  );
}
