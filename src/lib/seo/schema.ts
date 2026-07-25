import "server-only";
import type { SiteSettingsData } from "@/server/repositories/settings";
import type { Language } from "@/i18n/LanguageProvider";
import { absoluteUrl } from "./site";

type JsonLdObject = Record<string, unknown>;

function postalAddress(settings: SiteSettingsData, lang: Language): JsonLdObject | undefined {
  const street = lang === "ar" ? settings.addressStreetAr : settings.addressStreetEn;
  const city = lang === "ar" ? settings.addressCityAr : settings.addressCityEn;
  const region = lang === "ar" ? settings.addressRegionAr : settings.addressRegionEn;
  const country = lang === "ar" ? settings.addressCountryAr : settings.addressCountryEn;
  if (!street && !city && !region && !country) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: street || undefined,
    addressLocality: city || undefined,
    addressRegion: region || undefined,
    postalCode: settings.addressPostalCode || undefined,
    addressCountry: country || undefined,
  };
}

function geo(settings: SiteSettingsData): JsonLdObject | undefined {
  if (settings.geoLatitude == null || settings.geoLongitude == null) return undefined;
  return { "@type": "GeoCoordinates", latitude: settings.geoLatitude, longitude: settings.geoLongitude };
}

/** Combined Organization + MedicalBusiness + MedicalClinic + LocalBusiness —
 * one node describing the practice, rendered once sitewide (root layout). */
export function buildOrganizationSchema(settings: SiteSettingsData, lang: Language = "en"): JsonLdObject {
  const name = lang === "ar" ? settings.clinicNameAr : settings.clinicNameEn;
  const address = lang === "ar" ? settings.addressAr : settings.addressEn;
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness", "Organization"],
    "@id": `${absoluteUrl("/")}#organization`,
    name,
    url: absoluteUrl("/"),
    logo: settings.logoUrl || undefined,
    image: settings.logoUrl || settings.defaultOgImageUrl || undefined,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: postalAddress(settings, lang) || (address ? { "@type": "PostalAddress", streetAddress: address } : undefined),
    geo: geo(settings),
    sameAs: settings.socialLinks.map((l) => l.url).filter(Boolean),
    medicalSpecialty: ["Neurosurgery", "Neurology"],
  };
}

/** Sitewide WebSite node — publisher/org backlink for rich-result eligibility. */
export function buildWebSiteSchema(settings: SiteSettingsData): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: settings.doctorNameEn,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: ["en", "ar"],
  };
}

/** Physician/Person schema for the Dr. Ayman Tarek page. */
export function buildPhysicianSchema(
  settings: SiteSettingsData,
  lang: Language,
  path: string,
): JsonLdObject {
  const name = lang === "ar" ? settings.doctorNameAr : settings.doctorNameEn;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${absoluteUrl(path)}#physician`,
    name,
    url: absoluteUrl(path),
    image: settings.logoUrl || undefined,
    medicalSpecialty: ["Neurosurgery", "Neurology"],
    worksFor: { "@id": `${absoluteUrl("/")}#organization` },
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
  };
}

export function buildWebPageSchema(params: {
  path: string;
  name: string;
  description: string;
  lang: Language;
  dateModified?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(params.path)}#webpage`,
    url: absoluteUrl(params.path),
    name: params.name,
    description: params.description,
    inLanguage: params.lang,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#organization` },
    dateModified: params.dateModified,
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]): JsonLdObject | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildBlogPostingSchema(params: {
  path: string;
  title: string;
  description: string;
  imageUrl: string | null;
  authorName: string | null;
  publishedAt: string | null;
  updatedAt: string;
  lang: Language;
  settings: SiteSettingsData;
}): JsonLdObject {
  const { path, title, description, imageUrl, authorName, publishedAt, updatedAt, settings } = params;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: absoluteUrl(path),
    headline: title,
    description,
    image: imageUrl || undefined,
    datePublished: publishedAt || undefined,
    dateModified: updatedAt,
    author: { "@type": "Person", name: authorName || settings.doctorNameEn },
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function buildVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string | null;
  duration: string | null;
  embedUrl: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl || undefined,
    uploadDate: video.uploadDate || undefined,
    duration: video.duration || undefined,
    embedUrl: video.embedUrl,
  };
}

export function buildContactPageSchema(settings: SiteSettingsData, lang: Language, path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(path)}#contactpage`,
    url: absoluteUrl(path),
    about: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: lang,
  };
}
