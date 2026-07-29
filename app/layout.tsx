import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SmoothScroll from "@/app/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

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
      </body>
    </html>
  );
}
