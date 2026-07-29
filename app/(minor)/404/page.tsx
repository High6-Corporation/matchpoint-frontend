import Image from "next/image";
import type { Metadata } from "next";
import Row from "@/app/components/layout/Row";

export const metadata: Metadata = {
  title: "404 — MatchPoint",
  description: "The page you are looking for doesn't exist or has been moved.",
};

/**
 * 404 Page
 *
 * Direct /404 route inside the (minor) route group.
 * The global catch-all 404 handler remains at app/not-found.tsx.
 * Two-column layout: text left, large "404" right.
 * Full-bleed referee background with dark overlay.
 */
export default function FourOhFourPage() {
  return (
    <section className="relative flex min-h-screen flex-col">
      {/* Background image */}
      <Image
        src="/images/404_bg.png"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content layer */}
      <Row className="relative z-10 flex flex-1 items-center">
        <div className="flex w-full flex-col items-start justify-between gap-10 py-20 lg:flex-row lg:items-center">
          {/* Left — Text block */}
          <div className="flex max-w-[520px] flex-col gap-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-[60px]">
              Ooops...
            </h1>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Page not found
            </h2>
            <p className="text-base leading-7 text-white/70">
              The page you are looking for doesn&apos;t exist or another error
              occurred, go back to homepage.
            </p>
            <a
              href="/"
              className="mt-4 inline-block w-fit rounded-xl bg-primary-500 px-6 py-5 text-base text-white transition-colors hover:bg-amber-accent"
            >
              Return to Homepage
            </a>
          </div>

          {/* Right — 404 graphic */}
          <Image
            src="/images/404_matchpoint.png"
            alt="404"
            width={576}
            height={224}
            className="w-full max-w-[400px] shrink-0 lg:max-w-[550px]"
          />
        </div>
      </Row>
    </section>
  );
}
