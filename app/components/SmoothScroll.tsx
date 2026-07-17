"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis → GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis rAF from GSAP ticker for frame-perfect sync
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after all content has painted
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimeout);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
