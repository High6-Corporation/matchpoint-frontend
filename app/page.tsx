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
