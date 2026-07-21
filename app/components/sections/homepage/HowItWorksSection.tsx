"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { HOW_IT_WORKS_STEPS } from "@/app/lib/constants";

export default function HowItWorksSection() {
  return (
    <Section
      id="experience"
      bgColor="bg-section"
      className="flex flex-col items-center gap-16 py-12 md:py-24"
    >
      <FadeIn direction="up">
      <Row maxWidth={960} className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
          How MatchPoint Works for Officials
        </h2>
        <p className="text-base leading-6 text-white/80">
          Your step-by-step journey to a better officiating career.
        </p>
      </Row>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
      <Row className="flex flex-col overflow-hidden rounded-2xl bg-card lg:flex-row">
        <div className="flex flex-1 flex-col justify-center p-6 md:p-10 lg:p-16">
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Grow Your Career.
              <br />
              Get Discovered. Get Paid.
            </h3>
            <p className="text-lg text-primary-500">
              Every call you make builds your reputation.
            </p>
            <div className="flex flex-col gap-6">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div key={step.number} className="flex items-start gap-6">
                  <Image
                    src={step.icon}
                    alt=""
                    width={80}
                    height={80}
                    className="shrink-0 w-12 h-12 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold text-primary-500 md:text-[28px]">
                      {step.number}
                    </p>
                    <p className="max-w-[480px] text-lg font-semibold leading-8 text-white">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-[785px] lg:w-[600px]">
          <Image
            src="/images/photo-panel-officials.png"
            alt="Basketball officials"
            fill
            className="object-cover"
          />
        </div>
      </Row>
      </FadeIn>
      <Row className="h-px bg-primary-500 opacity-35" />
    </Section>
  );
}
