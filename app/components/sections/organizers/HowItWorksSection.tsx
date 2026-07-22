"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { ORGANIZERS_HOW_IT_WORKS_STEPS } from "@/app/lib/constants";

export default function OrganizersHowItWorksSection() {
  return (
    <Section
      id="experience"
      bgColor="bg-section"
      className="flex flex-col items-center gap-16 py-24"
    >
      <FadeIn direction="up">
        <Row maxWidth={960} className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            How MatchPoint Works for Organizers
          </h2>
          <p className="text-base leading-6 text-white/80">
            Your step-by-step guide to finding and managing great officials.
          </p>
        </Row>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
        <Row className="flex flex-col overflow-hidden rounded-2xl bg-card lg:flex-row">
          <div className="flex flex-1 flex-col justify-center p-10 lg:p-16">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Find Reliable Officials.
                <br />
                Run Smoother Games.
              </h3>
              <p className="text-lg text-primary-500">
                The right referee makes all the difference.
              </p>
              <div className="flex flex-col gap-6">
                {ORGANIZERS_HOW_IT_WORKS_STEPS.map((step) => (
                  <div key={step.number} className="flex items-start gap-6">
                    <Image
                      src={step.icon}
                      alt=""
                      width={80}
                      height={80}
                      className="shrink-0"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-[28px] font-bold text-primary-500">
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
              src="/images/how_matchpoint_works_for_organizers.jpg"
              alt="Organizer managing games on MatchPoint"
              fill
              className="object-cover object-top md:object-[0px_20%]"
            />
          </div>
        </Row>
      </FadeIn>
      <Row className="h-px bg-primary-500 opacity-35" />
    </Section>
  );
}
