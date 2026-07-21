"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";

export default function WhyWeBuiltSection() {
  return (
    <Section id="purpose" bgColor="bg-section" className="py-12 md:py-20">
      <Row className="flex flex-col overflow-hidden rounded-2xl lg:flex-row">
        <div className="relative flex min-h-[400px] items-center justify-center p-8 lg:min-h-[623px] lg:flex-1 lg:p-12">
          <Image
            src="/images/founder_image_new.jpg"
            alt="Rhoy Landicho, Founder of MatchPoint"
            fill
            className="object-contain"
          />
        </div>
        <FadeIn direction="up" className="flex flex-1">
          <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:p-16">
            <div className="flex max-w-[621px] flex-col items-center gap-12 text-center">
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Why We Built MatchPoint
              </h2>
              <div className="space-y-6 text-base leading-6 text-white/80">
                <p>
                  Throughout my journey in sports management, I&apos;ve worked
                  closely with organizers, sports officials, and sports officiating
                  organizations. I kept seeing the same challenge.
                </p>
                <p>
                  Organizers and officials are still relying on personal networks,
                  multiple messaging groups, and manual coordination to find each
                  other.
                </p>
                <p>Our sports community deserves a better way.</p>
                <p>That&apos;s why we built MatchPoint.</p>
              </div>
              <p className="text-4xl font-bold text-primary-500 md:text-6xl">
                Every Call Counts
              </p>
              <div className="text-white/80">
                <p className="text-2xl font-bold">Rhoy Landicho</p>
                <p className="text-base">Founder, MatchPoint</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Row>
    </Section>
  );
}
