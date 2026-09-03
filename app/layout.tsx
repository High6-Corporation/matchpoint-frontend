import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import SmoothScroll from "@/app/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Google Analytics (gtag.js) measurement ID — override via env if needed.
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-R0E0220396";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://72.60.195.99:3014"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-black font-sans text-white antialiased`}>
        <SmoothScroll />
        {children}

        {/* Google Analytics (gtag.js). `afterInteractive` is Next.js's
            recommended strategy for analytics / tag-manager scripts: it loads
            early but after hydration, so it never blocks first-party code. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
