"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/site";
import { MenuIcon, CloseIcon } from "./icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="SparkClean home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-primary)] text-xs font-black tracking-tight text-[var(--color-ink)] shadow-[0_4px_15px_rgba(244,180,0,0.3)]">
        SC
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-[var(--color-ink)]">
        SparkClean
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    firstMobileLinkRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-[var(--color-primary)]/15 bg-white/78 shadow-[0_10px_30px_rgba(21,19,13,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/20"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[var(--maxw)] items-center justify-between gap-4 px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[var(--color-primary)] ${
                  active
                    ? "text-[var(--color-ink)] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-[var(--color-primary)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={BOOKING_URL}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-[0_4px_15px_rgba(244,180,0,0.3)] transition-colors duration-200 hover:bg-[var(--color-primary-d)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40"
          >
            Request Quote
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-ink)] transition-colors duration-200 hover:bg-white md:hidden"
          >
            {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-[var(--color-border)] bg-white/95 shadow-[0_10px_35px_rgba(21,19,13,0.06)] backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-[var(--maxw)] flex-col gap-2 px-6 py-4">
            {NAV.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 hover:bg-[var(--color-surface-2)]/50 ${
                      active ? "bg-[var(--color-surface-2)]/30 font-bold text-[var(--color-ink)]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
