"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { ORGANIZERS_FEATURES } from "@/app/lib/constants";

export default function OrganizersFeaturesSection() {
  return (
    <Section id="solutions" bgColor="bg-black" className="py-20">
      <FadeIn direction="up">
        <Row className="flex flex-col overflow-hidden rounded-2xl lg:flex-row">
          {/* Left — feature cards */}
          <div className="bg-panel p-10 lg:w-[52%]">
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Everything an Organizer Needs
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ORGANIZERS_FEATURES.map((feature, i) => (
                <div key={feature.title} className="rounded-2xl bg-card p-6">
                  <Image
                    src={i % 2 === 0 ? "/images/card-left.svg" : "/images/card-right.svg"}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <h3 className="mt-3 text-lg font-semibold leading-8 text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base leading-6 text-white/80">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right — organizer photo */}
          <div className="relative min-h-[480px] md:min-h-[560px] lg:min-h-[811px] lg:w-[48%]">
            <Image
              src="/images/every_organizers_image.jpg"
              alt="An organizer managing games on MatchPoint"
              fill
              className="object-cover object-top"
            />
          </div>
        </Row>
      </FadeIn>
    </Section>
  );
}
