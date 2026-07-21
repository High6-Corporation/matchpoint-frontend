"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { PAIN_POINTS } from "@/app/lib/constants";

export default function PainPointsSection() {
  return (
    <Section id="problem" bgColor="bg-black" className="py-12 md:py-20">
      <FadeIn direction="up">
      <Row className="flex flex-col overflow-hidden rounded-2xl lg:flex-row">
        <div className="relative min-h-[320px] lg:min-h-[690px] lg:w-[48%]">
          <Image
            src="/images/grind-photo.png"
            alt="The daily grind of a basketball official"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-panel p-6 md:p-10 lg:w-[52%]">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            THE STRUGGLE IS REAL
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div key={point.title} className="rounded-2xl bg-card p-6">
                <Image src={point.icon} alt="" width={40} height={40} />
                <h3 className="mt-3 text-lg font-semibold leading-8 text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-base leading-6 text-white/80">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Row>
      </FadeIn>
    </Section>
  );
}
