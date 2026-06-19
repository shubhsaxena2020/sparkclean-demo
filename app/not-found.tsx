import Link from "next/link";
import { RevealEyebrow, RevealHeading, RevealSubtext } from "@/components/Reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
      <RevealEyebrow className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)] block" as="span">
        404 ERROR
      </RevealEyebrow>
      <RevealHeading
        as="h1"
        text="Page not found"
        className="mt-3 font-display text-4xl font-black tracking-[-0.02em] text-ink sm:text-5xl"
      />
      <RevealSubtext className="mt-4 max-w-md text-base text-muted">
        The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
      </RevealSubtext>
      <RevealSubtext delay={0.16} className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-6 py-3 text-sm font-bold text-[var(--color-ink)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-[2px] hover:bg-primary/10 hover:shadow-[0_4px_12px_rgba(217,155,0,0.18)] active:translate-y-0"
        >
          Back to Home
        </Link>
      </RevealSubtext>
    </div>
  );
}
