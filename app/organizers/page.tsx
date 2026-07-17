import type { Metadata } from "next";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CourtIntro from "@/app/components/sections/homepage/CourtIntro";
import HeroSection from "@/app/components/sections/homepage/HeroSection";
import MarqueeSection from "@/app/components/sections/homepage/MarqueeSection";
import OrganizersPainPointsSection from "@/app/components/sections/organizers/PainPointsSection";
import MissionBannerSection from "@/app/components/sections/homepage/MissionBannerSection";
import OrganizersFeaturesSection from "@/app/components/sections/organizers/FeaturesSection";
import OrganizersHowItWorksSection from "@/app/components/sections/organizers/HowItWorksSection";
import WhyWeBuiltSection from "@/app/components/sections/homepage/WhyWeBuiltSection";
import SocialProofSection from "@/app/components/sections/homepage/SocialProofSection";
import OrganizersApplyFormSection from "@/app/components/sections/organizers/ApplyFormSection";
import OfficialsCTASection from "@/app/components/sections/organizers/OfficialsCTASection";

export const metadata: Metadata = {
  title: "MatchPoint — Every Game Deserves the Right Official",
  description:
    "MatchPoint connects Philippine basketball organizers with verified, reliable officials — find, book, and pay your referees in one place.",
};

export default function OrganizersPage() {
  return (
    <main className="relative bg-black">
      {/* 3D rotating court — fixed overlay, fades on scroll */}
      <CourtIntro />

      {/* Header sits above CourtIntro stacking context */}
      <Header />

      {/* Main content sits below court z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        <HeroSection
          tagline="STOP SCRAMBLING. FIND THE RIGHT REFEREE."
          headline="Every Game Deserves the Right Official"
          description="MatchPoint connects Philippine basketball organizers with verified, reliable officials — find, book, and pay your referees in one place."
          ctaText="Start My MatchPoint Journey"
          ctaHref="#apply"
          bgImage="/images/organizers_hero.jpg"
        />
        <MarqueeSection />
        <OrganizersPainPointsSection />
        <MissionBannerSection
          tagline="BUILT FOR ORGANIZERS"
          headline="Every Call Counts"
          description="We built MatchPoint because every organizer deserves a reliable roster of officials, and every game deserves the professionalism it needs."
          bgVideo="/referee-action.mp4"
        />
        <OrganizersFeaturesSection />
        <OrganizersHowItWorksSection />
        <WhyWeBuiltSection />
        <SocialProofSection
          heading="Join 85+ Leagues Already on MatchPoint"
          subheading="Basketball leagues and organizers across the Philippines are finding reliable officials faster and running smoother games with MatchPoint."
          testimonial="We used to spend hours before every game making calls trying to fill our referee slots. MatchPoint cut that down to minutes. Now we have a trusted pool of certified officials we can rely on every weekend."
          authorName="Dante Reyes"
          authorTitle="League Coordinator, Quezon City"
          authorImage="/images/Dante Reyes.png"
        />
        <OrganizersApplyFormSection />
        <OfficialsCTASection />
        <Footer />
      </div>
    </main>
  );
}
