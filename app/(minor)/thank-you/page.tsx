import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Thank You — MatchPoint",
  description: "Your submission has been received. We'll be in touch soon.",
};

/**
 * Thank You Page
 *
 * Post-submission confirmation page.
 * Full-bleed background image with dark overlay.
 * Includes Header and Footer.
 */
export default function ThankYouPage() {
  return (
    <>
      {/* Full-bleed background with overlay */}
      <section className="relative flex min-h-screen flex-col">
        {/* Background image */}
        <Image
          src="/images/thank_you_page_bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content layer */}
        <div className="relative z-10 flex flex-1 flex-col">
          <Header homeBase />

          <div className="flex flex-1 flex-col items-center justify-center gap-[30px] px-6 py-20 text-center">
            {/* Inbox icon */}
            <Image
              src="/images/thank_you_icon.svg"
              alt=""
              width={80}
              height={80}
              priority
            />

            {/* Text block */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-[48px] font-bold leading-none text-white md:text-[60px]">
                Thank You!
              </h1>
              <p className="max-w-[954px] text-xl leading-9 text-white md:text-2xl">
                Thanks for reaching out!
                <br />
                Your message just showed up in our inbox. Talk to you soon!
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.matchpoint-official.xyz/"
              className="rounded-xl bg-primary-500 px-6 py-5 text-base text-black transition-colors hover:bg-amber-accent"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
