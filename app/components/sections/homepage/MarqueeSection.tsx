import Section from "@/app/components/layout/Section";
import { MARQUEE_ITEM_COUNT } from "@/app/lib/constants";

const TAGLINE = "\u2022 BETTER PAY \u2022 STRONGER NETWORK \u2022 MORE GAMES ";

export default function MarqueeSection() {
  const items = Array.from({ length: MARQUEE_ITEM_COUNT });
  const taglineItems = Array.from({ length: MARQUEE_ITEM_COUNT * 2 });

  return (
    <Section id="marquee" bgColor="bg-primary-500" className="overflow-hidden py-6">
      {/* Row 1 — Upper text: large amber MATCHPOINT */}
      <div className="animate-marquee flex w-max items-center gap-0">
        {items.map((_, i) => (
          <span key={i} className="marquee-upper-text">
            MatchPoint
          </span>
        ))}
      </div>

      {/* Row 2 — Lower text: fast-scrolling subtle tagline */}
      <div className="animate-marquee-fast flex w-max items-center gap-0 mt-1">
        {taglineItems.map((_, i) => (
          <span key={i} className="marquee-lower-text">
            {TAGLINE}
          </span>
        ))}
      </div>
    </Section>
  );
}
