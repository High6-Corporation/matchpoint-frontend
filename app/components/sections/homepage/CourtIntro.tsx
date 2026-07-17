"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Court markings ─── */
function CourtSurface() {
  return (
    <div
      className="absolute inset-0 rounded-lg"
      style={{
        background: "#0a0a0a",
        border: "2px solid rgba(245, 158, 11, 0.35)",
        transform: "rotateX(10deg)",
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      {/* Half-court line */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "5%",
          bottom: "5%",
          width: "2px",
          background: "rgba(245, 158, 11, 0.5)",
          transform: "translateX(-50%)",
        }}
      />

      {/* Center circle */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: "16%",
          height: "30%",
          border: "2px dashed rgba(245, 158, 11, 0.5)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Left key / lane */}
      <div
        className="absolute"
        style={{
          left: "5%",
          top: "25%",
          width: "18%",
          height: "50%",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          borderRight: "2px solid rgba(245, 158, 11, 0.5)",
        }}
      />

      {/* Right key / lane */}
      <div
        className="absolute"
        style={{
          right: "5%",
          top: "25%",
          width: "18%",
          height: "50%",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          borderLeft: "2px solid rgba(245, 158, 11, 0.5)",
        }}
      />

      {/* Free throw lines */}
      <div
        className="absolute"
        style={{
          left: "23%",
          top: "30%",
          width: "2px",
          height: "40%",
          background: "rgba(245, 158, 11, 0.35)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "23%",
          top: "30%",
          width: "2px",
          height: "40%",
          background: "rgba(245, 158, 11, 0.35)",
        }}
      />

      {/* Three-point arcs — large circles clipped by overflow:hidden */}
      <div
        className="absolute rounded-full"
        style={{
          left: "-24%",
          top: "6%",
          width: "52%",
          height: "88%",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          borderLeft: "none",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          right: "-24%",
          top: "6%",
          width: "52%",
          height: "88%",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          borderRight: "none",
        }}
      />

      {/* Center dot */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: "8px",
          height: "8px",
          background: "#f59e0b",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

/* ─── Single rotating court card ─── */
function CourtCard({ reverse = false }: { reverse?: boolean }) {
  const animClass = reverse ? "court-card-reverse" : "court-card";
  return (
    <div
      className="absolute"
      style={{
        width: "clamp(320px, 55vw, 700px)",
        aspectRatio: "94 / 50",
        left: "50%",
        top: "42%",
        marginLeft: "calc(clamp(320px, 55vw, 700px) / -2)",
        marginTop: "calc(clamp(320px, 55vw, 700px) * 0.5 / -2)",
        opacity: reverse ? 0.15 : 0.9,
      }}
    >
      <div
        className={"absolute inset-0 " + animClass}
        style={{
          transformStyle: "preserve-3d",
          perspective: "2000px",
        }}
      >
        <CourtSurface />
      </div>
    </div>
  );
}

/* ─── Main wrapper with scroll fade ─── */
export default function CourtIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "200vh top",
      onUpdate: (self) => {
        const holdUntil = 0.5; // stay fully visible for first 50% of scroll
        let opacity: number;
        if (self.progress < holdUntil) {
          opacity = 1;
        } else {
          // ease-out fade over remaining 50%
          const p = (self.progress - holdUntil) / (1 - holdUntil);
          opacity = 1 - Math.pow(p, 3);
        }
        el.style.opacity = String(Math.max(0, opacity));
        el.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 50,
        background:
          "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)",
        perspective: "2000px",
      }}
    >
      {/* Ambient amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 55%)",
        }}
      />

      <div
        className="relative w-full h-full"
        style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
      >
        <CourtCard />
        <CourtCard reverse />
      </div>

      {/* Bottom scroll prompt */}
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-sm font-bold uppercase tracking-[4px] text-white/60">
          MatchPoint Sports
        </p>
        <p className="text-xs font-medium uppercase tracking-[3px] text-white/40 animate-pulse">
          Scroll to Enter
        </p>
      </div>
    </div>
  );
}
