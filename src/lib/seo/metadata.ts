import "server-only";
import type { Metadata } from "next";
import type { Language } from "@/i18n/LanguageProvider";
import type { SiteSettingsData } from "@/server/repositories/settings";
import { absoluteUrl } from "./site";
import { localizedHref } from "@/lib/localizedHref";

export interface BuildMetadataInput {
  lang: Language;
  /** Root-relative path of THIS render, e.g. "/services" or "/ar/services". */
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  settings: SiteSettingsData;
  seoTitleEn?: string | null; seoTitleAr?: string | null;
  seoDescriptionEn?: string | null; seoDescriptionAr?: string | null;
  keywordsEn?: string[]; keywordsAr?: string[];
  canonicalUrl?: string | null;
  ogTitleEn?: string | null; ogTitleAr?: string | null;
  ogDescriptionEn?: string | null; ogDescriptionAr?: string | null;
  ogImageUrl?: string | null;
  twitterTitleEn?: string | null; twitterTitleAr?: string | null;
  twitterDescriptionEn?: string | null; twitterDescriptionAr?: string | null;
  twitterImageUrl?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authorName?: string | null;
}

function pick(lang: Language, en: string | null | undefined, ar: string | null | undefined): string | null {
  const value = lang === "ar" ? ar : en;
  return value && value.trim() ? value : null;
}

/** Every generateMetadata() on the public site funnels through this — one
 * place that applies the CMS-value-else-fallback rule, real per-language
 * canonical + hreflang alternates, and full Open Graph / Twitter / robots
 * output, so no page hand-rolls its own metadata object. */
export function buildPageMetadata(input: BuildMetadataInput): Metadata {
  const { lang, path, settings } = input;

  const title = pick(lang, input.seoTitleEn, input.seoTitleAr) || input.fallbackTitle;
  const description = pick(lang, input.seoDescriptionEn, input.seoDescriptionAr) || input.fallbackDescription;
  const keywords = (lang === "ar" ? input.keywordsAr : input.keywordsEn) || [];

  const ogTitle = pick(lang, input.ogTitleEn, input.ogTitleAr) || title;
  const ogDescription = pick(lang, input.ogDescriptionEn, input.ogDescriptionAr) || description;
  const ogImage = input.ogImageUrl || settings.defaultOgImageUrl;

  const twitterTitle = pick(lang, input.twitterTitleEn, input.twitterTitleAr) || ogTitle;
  const twitterDescription = pick(lang, input.twitterDescriptionEn, input.twitterDescriptionAr) || ogDescription;
  const twitterImage = input.twitterImageUrl || ogImage;

  const canonical = input.canonicalUrl || absoluteUrl(path);
  const enPath = localizedHref(path, "en");
  const arPath = localizedHref(path, "ar");

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(enPath),
        ar: absoluteUrl(arPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    robots: {
      index: input.robotsIndex ?? true,
      follow: input.robotsFollow ?? true,
    },
    openGraph: {
      type: input.type || "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: settings.doctorNameEn,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime || undefined,
            modifiedTime: input.modifiedTime || undefined,
            authors: input.authorName ? [input.authorName] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
      site: settings.twitterHandle || undefined,
    },
  };
}
