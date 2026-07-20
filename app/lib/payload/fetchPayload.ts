import type { SiteSettings } from "./payload-types";

const BASE_URL = process.env.PAYLOAD_API_URL;

interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
}

/**
 * Fetch documents from a Payload CMS collection, scoped to a tenant.
 *
 * Returns `null` on any failure (missing env vars, network error, non-2xx) —
 * callers should handle the null case gracefully rather than crashing.
 */
export async function fetchFromPayload<T>(
  collection: string,
  siteId: string,
  sortOrDepth?: string | number,
  depth?: number,
): Promise<T[] | null> {
  let sort: string | undefined;
  let resolvedDepth: number | undefined;

  if (typeof sortOrDepth === "number") {
    resolvedDepth = sortOrDepth;
  } else {
    sort = sortOrDepth;
    resolvedDepth = depth;
  }

  if (!BASE_URL) {
    console.error("[fetchFromPayload] PAYLOAD_API_URL is not set");
    return null;
  }

  try {
    let url = `${BASE_URL}/api/${collection}?where[site][equals]=${siteId}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (resolvedDepth !== undefined) {
      url += `&depth=${resolvedDepth}`;
    }

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(
        `[fetchFromPayload] ${collection}: HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = (await res.json()) as PayloadListResponse<T>;
    return json.docs;
  } catch (error) {
    console.error(`[fetchFromPayload] ${collection}: fetch failed`, error);
    return null;
  }
}

/**
 * Fetch the single SiteSettings document for MatchPoint.
 *
 * Returns the first document or `null` on any failure — callers should
 * fall back to hardcoded defaults.
 */
export async function fetchSiteSettings(
  siteId: string,
): Promise<SiteSettings | null> {
  const docs = await fetchFromPayload<Record<string, unknown>>(
    "site-settings",
    siteId,
  );
  const doc = docs?.[0];
  if (!doc) return null;

  // Payload nests fields inside tab groups, so we reach into each group.
  const hero = doc.hero as Record<string, unknown> | undefined;
  const organizersHero = doc.organizersHero as Record<string, unknown> | undefined;
  const cta = doc.cta as Record<string, unknown> | undefined;
  const footer = doc.footer as Record<string, unknown> | undefined;
  const custom = doc.custom as Record<string, unknown> | undefined;

  const picked: SiteSettings = {
    id: String(doc.id ?? ""),
    site:
      typeof doc.site === "string"
        ? doc.site
        : String((doc.site as { id?: string })?.id ?? ""),

    // --- hero ---
    heroTagline:
      typeof hero?.heroTagline === "string" ? hero.heroTagline : null,
    heroHeadline:
      typeof hero?.heroHeadline === "string" ? hero.heroHeadline : null,
    heroDescription:
      typeof hero?.heroDescription === "string" ? hero.heroDescription : null,
    heroCtaText:
      typeof hero?.heroCtaText === "string" ? hero.heroCtaText : null,
    heroCtaHref:
      typeof hero?.heroCtaHref === "string" ? hero.heroCtaHref : null,

    // --- organizers hero ---
    organizersHeroTagline:
      typeof organizersHero?.organizersHeroTagline === "string"
        ? organizersHero.organizersHeroTagline
        : null,
    organizersHeroHeadline:
      typeof organizersHero?.organizersHeroHeadline === "string"
        ? organizersHero.organizersHeroHeadline
        : null,
    organizersHeroDescription:
      typeof organizersHero?.organizersHeroDescription === "string"
        ? organizersHero.organizersHeroDescription
        : null,
    organizersHeroCtaText:
      typeof organizersHero?.organizersHeroCtaText === "string"
        ? organizersHero.organizersHeroCtaText
        : null,

    // --- cta ---
    ctaTitle: typeof cta?.ctaTitle === "string" ? cta.ctaTitle : null,
    ctaDescription:
      typeof cta?.ctaDescription === "string" ? cta.ctaDescription : null,
    ctaButtonText:
      typeof cta?.ctaButtonText === "string" ? cta.ctaButtonText : null,

    // --- footer ---
    footerCopy:
      typeof footer?.footerCopy === "string" ? footer.footerCopy : null,

    // --- custom fields ---
    customFields: Array.isArray(custom?.customFields)
      ? (custom.customFields as Array<Record<string, unknown>>).map((f) => ({
          key: String(f.key ?? ""),
          value: String(f.value ?? ""),
        }))
      : null,
  };

  // Round-trip through JSON to guarantee a plain object for RSC serialisation.
  return JSON.parse(JSON.stringify(picked)) as SiteSettings;
}

/**
 * Look up a value from the Custom Fields array by key.
 */
export function getCustomField(
  settings: SiteSettings | null,
  key: string,
  fallback: string,
): string {
  if (!settings?.customFields) return fallback;
  const entry = settings.customFields.find((f) => f.key === key);
  return entry?.value ?? fallback;
}
