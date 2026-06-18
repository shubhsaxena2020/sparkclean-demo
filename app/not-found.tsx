import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        404 ERROR
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
