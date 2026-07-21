"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";

const SOCIAL_ICONS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572474021116",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const marquee = document.getElementById("marquee");
      const threshold = marquee ? marquee.offsetTop : 400;
      setShowTop(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // check initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Section bgColor="bg-black" className="p-6 md:p-10 lg:p-20">
      <Row className="flex flex-col items-center gap-10">
        <div className="h-px w-full bg-primary-500/40" />
        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative h-[79px] w-[180px]">
              <Image
                src="/images/matchpoint_logo.png"
                alt="MatchPoint"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} MatchPoint Sports. All rights
              reserved.
            </p>
          </div>
          <div className="flex items-center gap-5">
            {SOCIAL_ICONS.map((icon) => (
              <a
                key={icon.name}
                href={icon.href}
                aria-label={icon.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-primary-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Row>

      {/* Back to top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-black shadow-lg transition-all hover:bg-amber-accent hover:scale-110"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </Section>
  );
}
