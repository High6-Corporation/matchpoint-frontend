import type { MetadataRoute } from "next";
import { fetchPageBySlug, type PayloadPage } from "@/app/lib/payload";

/**
 * Dynamic sitemap for the MatchPoint marketing site.
 *
 * Only routes that actually exist on the frontend are emitted, so the sitemap
 * never lists URLs that 404. Each route may be backed by a Payload `pages`
 * document (matched by slug); when that doc is published, its
 * `updatedAt` / `publishedAt` drives `lastModified`, keeping the sitemap in
 * sync with CMS edits. Payload pages that have no matching frontend route
 * (e.g. the "seo-only-test-page") are ignored on purpose.
 *
 * Fetches fail gracefully — if Payload is unreachable or a page is missing,
 * the route is still emitted with a fallback `lastModified`. The whole file is
 * cached and regenerated at most once per hour (see `revalidate` below).
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matchpoint.com.ph";
const TENANT_ID = process.env.PAYLOAD_TENANT_ID || "";

// Regenerate at most once per hour (ISR) so frequent crawler hits stay cheap.
export const revalidate = 3600;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type SitemapRoute = {
  /** Frontend path, e.g. "/" or "/organizers". */
  path: string;
  /** Backing Payload page slug used to source `lastModified` (optional). */
  slug?: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

// Real, indexable frontend routes in priority order. Utility/dev routes
// (/testing, /thank-you, /coming-soon, /maintenance, /404) are intentionally
// omitted here and disallowed in app/robots.ts.
const SITEMAP_ROUTES: SitemapRoute[] = [
  { path: "/", slug: "homepage", changeFrequency: "daily", priority: 1.0 },
  {
    path: "/organizers",
    slug: "organizers",
    changeFrequency: "weekly",
    priority: 0.9,
  },
];

/** Build an absolute URL from a frontend path. */
function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Best-available last-modified date from a Payload page doc. */
function lastModifiedFrom(page: PayloadPage | null): Date {
  if (page?._status === "published") {
    const raw = page.updatedAt || page.publishedAt;
    if (raw) {
      const date = new Date(raw);
      if (!Number.isNaN(date.getTime())) return date;
    }
  }
  return new Date();
}

/**
 * Main sitemap generator — served automatically by Next.js at /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // depth=0 → lightweight read; the sitemap only needs slug/_status/updatedAt.
  const pages = await Promise.all(
    SITEMAP_ROUTES.map((route) =>
      route.slug
        ? fetchPageBySlug(route.slug, TENANT_ID, 0)
        : Promise.resolve(null),
    ),
  );

  return SITEMAP_ROUTES.map((route, i) => ({
    url: absoluteUrl(route.path),
    lastModified: lastModifiedFrom(pages[i]),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
