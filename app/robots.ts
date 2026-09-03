import type { MetadataRoute } from "next";

/**
 * robots.txt generator — served automatically by Next.js at /robots.txt.
 *
 * Allows crawling of the public marketing pages, points crawlers at the
 * dynamic sitemap, and disallows the utility/dev routes that should never be
 * indexed (/testing plus the minor thank-you / coming-soon / maintenance / 404
 * pages). Kept in sync with the routes omitted from app/sitemap.ts.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matchpoint.com.ph";

// Routes that should never be crawled or indexed.
const DISALLOWED = [
  "/testing",
  "/thank-you",
  "/coming-soon",
  "/maintenance",
  "/404",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
