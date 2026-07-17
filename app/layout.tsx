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
  title: "MatchPoint — Every Call Counts",
  description:
    "The platform built for Philippine basketball officials — get discovered, get booked, and get paid on time.",
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
