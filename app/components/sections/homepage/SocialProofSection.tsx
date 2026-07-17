"use client";

import Image from "next/image";
import Section from "@/app/components/layout/Section";
import Row from "@/app/components/layout/Row";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { TESTIMONIAL_STATS } from "@/app/lib/constants";

interface SocialProofSectionProps {
  heading?: string;
  subheading?: string;
  testimonial?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
}

const DEFAULTS = {
  heading: "Join 500+ Officials Already on MatchPoint",
  subheading:
    "Referees across the Philippines are growing their careers, booking more games, and getting paid on time — all through MatchPoint.",
  testimonial:
    "MatchPoint changed how I approach officiating. I went from 2 games a month to being fully booked every weekend. The payment tracking alone saved me hours of chasing organizers.",
  authorName: "Rodel Santos",
  authorTitle: "PBA-Certified Referee, Metro Manila",
  authorImage: "/images/avatar-rodel.png",
};

export default function SocialProofSection({
  heading = DEFAULTS.heading,
  subheading = DEFAULTS.subheading,
  testimonial = DEFAULTS.testimonial,
  authorName = DEFAULTS.authorName,
  authorTitle = DEFAULTS.authorTitle,
  authorImage = DEFAULTS.authorImage,
}: SocialProofSectionProps) {
  return (
    <Section className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <Image
          src="/images/Stadium Background.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <FadeIn direction="up">
      <Row className="relative flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-[710px] text-xl leading-9 text-white/80 md:text-2xl">
            {subheading}
          </p>
        </div>
        <figure className="relative flex max-w-[695px] flex-col gap-10 rounded-3xl border border-primary-500 bg-gradient-to-b from-black to-primary-900 p-12">
          <Image
            src="/icons/quote.svg"
            alt=""
            width={51}
            height={42}
            className="absolute left-5 top-5 opacity-60"
          />
          <blockquote className="max-w-[599px] text-base leading-6 text-white">
            {testimonial}
          </blockquote>
          <figcaption className="flex items-center gap-2">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
              />
            </span>
            <span className="text-base leading-6 text-white">
              {authorName}
              <br />
              {authorTitle}
            </span>
          </figcaption>
        </figure>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {TESTIMONIAL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[100px] w-[204px] flex-col items-center justify-center rounded-lg border border-primary-700 bg-panel"
            >
              <p className="text-4xl font-semibold leading-[46px] text-primary-500">
                {stat.value}
              </p>
              <p className="text-sm leading-6 text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Row>
      </FadeIn>
    </Section>
  );
}
