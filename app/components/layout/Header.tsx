"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/app/lib/constants";

interface HeaderProps {
  /** When true, all nav links point to the homepage (e.g. /#home) instead of same-page anchors */
  homeBase?: boolean;
}

export default function Header({ homeBase = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const resolve = (href: string) =>
    homeBase && href.startsWith("#") ? `/${href}` : href;

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] flex h-[98px] items-center justify-between px-6 transition-all duration-300 lg:px-16"
      style={{
        background: scrolled || menuOpen ? "rgba(0, 0, 0, 0.9)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
      }}
    >
      <Link href={resolve("#top")} className="relative h-[66px] w-[129px] shrink-0">
        <Image
          src="/images/matchpoint_logo.png"
          alt="MatchPoint"
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop nav */}
      <div className="flex items-center gap-7">
        <nav className="hidden items-center gap-7 text-base text-white/80 lg:flex">
          {NAVIGATION_ITEMS.map((link) => (
            <Link
              key={link.label}
              href={resolve(link.href)}
              className="transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={resolve("#apply")}
          className="hidden rounded-xl bg-primary-500 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-amber-accent lg:block"
        >
          Start Your Journey
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-x-0 top-0 z-40 flex flex-col items-center gap-8 bg-black/95 pt-[120px] pb-10 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg text-white/80">
          {NAVIGATION_ITEMS.map((link) => (
            <Link
              key={link.label}
              href={resolve(link.href)}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={resolve("#apply")}
          onClick={() => setMenuOpen(false)}
          className="rounded-xl bg-primary-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-amber-accent"
        >
          Start Your Journey
        </Link>
      </div>
    </header>
  );
}
