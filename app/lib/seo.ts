import type { Metadata } from "next";
import { fetchPageBySlug, type PayloadMeta } from "@/app/lib/payload";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || "";

/**
 * Resolve a Payload media image to an absolute URL, preferring the 1200×630
 * `og` rendition. Returns `null` when there is no usable image (e.g. `depth=0`
 * leaves `image` as a bare id string, or the media has no file).
 */
function resolveOgImage(
  meta: PayloadMeta | null | undefined,
): { url: string; width: number; height: number } | null {
  const image = meta?.image;
  if (!image || typeof image === "string") return null;

  const og = image.sizes?.og;
  const rawUrl = og?.url || image.url;
  if (!rawUrl) return null;

  return {
    url: rawUrl.startsWith("http") ? rawUrl : `${PAYLOAD_API_URL}${rawUrl}`,
    width: og?.width || image.width || 1200,
    height: og?.height || image.height || 630,
  };
}

/**
 * Build a route's Next.js `Metadata` from its Payload `pages` document.
 *
 * Maps Payload SEO fields → Next metadata:
 *   meta.title        → title / openGraph.title / twitter.title
 *   meta.description  → description / openGraph.description / twitter.description
 *   meta.focusKeyword → keywords (comma-separated string → string[])
 *   meta.image (og)   → openGraph.images / twitter.images (absolute URL)
 *
 * The `pages` collection is publicly readable (unlike `site-settings`, which
 * returns 403), so it is the working source of per-page SEO. Any field missing
 * from Payload — or a total fetch failure — falls back to the caller-provided
 * static metadata, so SEO degrades gracefully instead of breaking.
 */
export async function getPageMetadata(
  slug: string,
  fallback: Metadata,
): Promise<Metadata> {
  const tenantId = process.env.PAYLOAD_TENANT_ID || "";
  const page = await fetchPageBySlug(slug, tenantId);
  const meta = page?.meta;

  if (!meta) return fallback;

  // Normalise to `string | undefined` — OpenGraph/Twitter fields reject `null`,
  // and `fallback.title` may be a TemplateString rather than a plain string.
  const fallbackTitle =
    typeof fallback.title === "string" ? fallback.title : undefined;
  const title = meta.title ?? fallbackTitle ?? undefined;
  const description = meta.description ?? fallback.description ?? undefined;
  const keywords = meta.focusKeyword
    ? meta.focusKeyword
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  const ogImage = resolveOgImage(meta);
  const fallbackOpenGraph =
    typeof fallback.openGraph === "object" ? fallback.openGraph : undefined;
  const fallbackTwitter =
    typeof fallback.twitter === "object" ? fallback.twitter : undefined;

  const ogImages = ogImage
    ? [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: title ?? "",
        },
      ]
    : fallbackOpenGraph?.images;

  const twitterImages = ogImage ? [ogImage.url] : fallbackTwitter?.images;

  return {
    ...fallback,
    title,
    description,
    ...(keywords ? { keywords } : {}),
    openGraph: {
      ...fallbackOpenGraph,
      title,
      description,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      ...fallbackTwitter,
      title,
      description,
      ...(twitterImages ? { images: twitterImages } : {}),
    },
  };
}
