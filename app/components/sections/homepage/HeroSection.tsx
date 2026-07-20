"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/layout/Section";
import ParticleCanvas from "@/app/components/sections/homepage/ParticleCanvas";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  tagline?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage?: string;
}

const DEFAULTS = {
  tagline: "Built for Officials Who Make Every Game Count",
  headline: "Every Call Counts",
  description:
    "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
  ctaText: "Start My MatchPoint Journey",
  ctaHref: "#apply",
  bgImage: "/images/hero-bg.png",
};

export default function HeroSection({
  tagline = DEFAULTS.tagline,
  headline = DEFAULTS.headline,
  description = DEFAULTS.description,
  ctaText = DEFAULTS.ctaText,
  ctaHref = DEFAULTS.ctaHref,
  bgImage = DEFAULTS.bgImage,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* ── Parallax + staggered entrance ── */
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const indicator = scrollIndicatorRef.current;
    if (!section || !bg || !content || !indicator) return;

    // Background parallax — bg drifts down as user scrolls
    gsap.to(bg, {
      y: "30vh",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered entrance timeline
    const tl = gsap.timeline({ delay: 0.5 });

    const eyebrow = content.querySelector(".hero-eyebrow");
    const headlineEl = content.querySelector(".hero-headline");
    const sub = content.querySelector(".hero-sub");
    const cta = content.querySelector(".hero-cta");

    if (eyebrow)
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    if (headlineEl)
      tl.to(headlineEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.35");
    if (sub)
      tl.to(sub, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.55");
    if (cta)
      tl.to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4");

    // Scroll indicator fade
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 100);
      indicator.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ minHeight: "150vh" }}>
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden" style={{ height: "130vh" }}>
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        {/* Bottom gradient — blends hero into black spacer */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
        {/* Floating amber bubble lights */}
        <ParticleCanvas />
      </div>

      {/* Sticky content */}
      <Section
        id="home"
        className="sticky top-0 z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        <div
          ref={contentRef}
          className="relative flex max-w-[1000px] flex-col items-center gap-10 text-center"
        >
          {/* Eyebrow / tagline */}
          <p
            className="hero-eyebrow text-base uppercase tracking-[3.2px] text-amber-accent"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {tagline}
          </p>

          {/* Headline */}
          <h1
            className="hero-headline text-gradient font-bold"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              fontSize: "clamp(48px, 8vw, 96px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {headline}
          </h1>

          {/* Description */}
          <p
            className="hero-sub max-w-[954px] text-xl leading-9 text-white/80 md:text-2xl"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {description}
          </p>

          {/* CTA */}
          <div
            className="hero-cta"
            style={{ opacity: 0, transform: "translateY(15px) scale(0.95)" }}
          >
            <Link
              href={ctaHref}
              className="rounded-xl bg-primary-500 px-6 py-5 text-base font-bold text-white transition-colors hover:bg-amber-accent"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </Section>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <svg
          className="animate-bounce"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Spacers — smooth visual transition to next section */}
      <div className="h-[150px] w-full bg-black" />
      <div className="h-[100px] w-full bg-gradient-to-b from-black to-[#100c08]" />
    </div>
  );
}
