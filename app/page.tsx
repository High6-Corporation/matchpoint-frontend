import type { Metadata } from "next";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CourtIntro from "@/app/components/sections/homepage/CourtIntro";
import HeroSection from "@/app/components/sections/homepage/HeroSection";
import MarqueeSection from "@/app/components/sections/homepage/MarqueeSection";
import PainPointsSection from "@/app/components/sections/homepage/PainPointsSection";
import MissionBannerSection from "@/app/components/sections/homepage/MissionBannerSection";
import FeaturesSection from "@/app/components/sections/homepage/FeaturesSection";
import HowItWorksSection from "@/app/components/sections/homepage/HowItWorksSection";
import WhyWeBuiltSection from "@/app/components/sections/homepage/WhyWeBuiltSection";
import SocialProofSection from "@/app/components/sections/homepage/SocialProofSection";
import ApplyFormSection from "@/app/components/sections/homepage/ApplyFormSection";
import OrganizerCTASection from "@/app/components/sections/homepage/OrganizerCTASection";
import { fetchSiteSettings } from "@/app/lib/payload";
import { getPageMetadata } from "@/app/lib/seo";

/**
 * Static fallback used when the Payload `pages` doc (slug "homepage") is
 * unreachable or missing SEO fields. Mirrors the site-wide default metadata.
 */
const HOMEPAGE_FALLBACK: Metadata = {
  title: "MatchPoint — Every Call Counts",
  description:
    "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
  openGraph: {
    title: "MatchPoint — Every Call Counts",
    description:
      "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
    images: [
      {
        url: "/images/matchpoint-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "MatchPoint — Every Call Counts",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchPoint — Every Call Counts",
    description:
      "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
    images: ["/images/matchpoint-thumbnail.png"],
  },
};

/**
 * Homepage SEO — sourced from the Payload `pages` document with slug
 * "homepage" (meta.title / description / focusKeyword / image), falling back
 * to HOMEPAGE_FALLBACK when Payload is unavailable.
 */
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("homepage", HOMEPAGE_FALLBACK);
}

export default async function Home() {
  const siteId = process.env.PAYLOAD_SITE_ID || "";
  const settings = await fetchSiteSettings(siteId);

  return (
    <main className="relative bg-black">
      {/* 3D rotating court — fixed overlay, fades on scroll */}
      <CourtIntro />

      {/* Header sits above CourtIntro stacking context */}
      <Header />

      {/* Main content sits below court z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        <HeroSection
          tagline={settings?.heroTagline ?? undefined}
          headline={settings?.heroHeadline ?? undefined}
          description={settings?.heroDescription ?? undefined}
          ctaText={settings?.heroCtaText ?? undefined}
          ctaHref={settings?.heroCtaHref ?? undefined}
        />
      <MarqueeSection />
      <PainPointsSection />
      <MissionBannerSection bgVideo="/referee-action.mp4" />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyWeBuiltSection />
      <SocialProofSection />
      <ApplyFormSection />
      <OrganizerCTASection />
        <Footer />
      </div>
    </main>
  );
}
