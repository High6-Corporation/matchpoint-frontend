/** Payload REST API response shapes for the MatchPoint tenant. */

// ============================================================================
// Site Settings (global content — hero, CTA, footer, custom fields)
// ============================================================================

export interface SiteSettings {
  id: string;
  site: string | { id: string; name?: string };

  // --- hero tab ---
  heroTagline?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  heroCtaText?: string | null;
  heroCtaHref?: string | null;

  // --- organizers hero tab ---
  organizersHeroTagline?: string | null;
  organizersHeroHeadline?: string | null;
  organizersHeroDescription?: string | null;
  organizersHeroCtaText?: string | null;

  // --- cta tab ---
  ctaTitle?: string | null;
  ctaDescription?: string | null;
  ctaButtonText?: string | null;

  // --- footer tab ---
  footerCopy?: string | null;

  // --- custom tab ---
  customFields?: { key: string; value: string; id?: string | null }[] | null;
}

// ============================================================================
// Testimonials / Social Proof
// ============================================================================

export interface PayloadTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage?: { id: string; url: string } | string | null;
}

// ============================================================================
// Custom Collections (dynamic content)
// ============================================================================

export interface CustomCollectionField {
  name: string;
  type: "text" | "richtext" | "number" | "media" | "url" | "toggle";
  required: boolean;
  label?: string;
}

export interface CustomCollection {
  id: string;
  site: string | { id: string; name?: string };
  name: string;
  slug?: string | null;
  fields: CustomCollectionField[];
}

export interface CustomCollectionEntry {
  id: string;
  site: string | { id: string; name?: string };
  parentCollection: string | { id: string; name?: string };
  data: Record<string, unknown>;
}

// ============================================================================
// Form-related types
// ============================================================================

export type PayloadFieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "textarea"
  | "website"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "hidden"
  | "fileupload"
  | "time"
  | "password"
  | "html"
  | "section";

export interface DynamicFormField {
  id: number;
  type: PayloadFieldType;
  label: string;
  name: string;
  payloadName?: string;
  isRequired: boolean;
  placeholder: string;
  choices?: { value: string; label: string }[];
  maxLength?: number;
  description?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}
