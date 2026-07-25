import "server-only";
import type { Metadata } from "next";
import type { Language } from "@/i18n/LanguageProvider";
import { getPageSeo, type PageSlug } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildPageMetadata } from "./metadata";

/** generateMetadata() for every one of the 6 structured CMS pages (EN and AR
 * variants alike) funnels through this — fetches page_seo + site_settings
 * once, applies the CMS-value-else-fallback rule via buildPageMetadata(). */
export async function buildStaticPageMetadata(params: {
  slug: PageSlug;
  lang: Language;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getPageSeo(params.slug), getSiteSettings()]);
  return buildPageMetadata({
    lang: params.lang,
    path: params.path,
    fallbackTitle: params.fallbackTitle,
    fallbackDescription: params.fallbackDescription,
    settings,
    seoTitleEn: seo?.seoTitleEn,
    seoTitleAr: seo?.seoTitleAr,
    seoDescriptionEn: seo?.seoDescriptionEn,
    seoDescriptionAr: seo?.seoDescriptionAr,
    keywordsEn: seo?.keywordsEn,
    keywordsAr: seo?.keywordsAr,
    canonicalUrl: seo?.canonicalUrl,
    ogTitleEn: seo?.ogTitleEn,
    ogTitleAr: seo?.ogTitleAr,
    ogDescriptionEn: seo?.ogDescriptionEn,
    ogDescriptionAr: seo?.ogDescriptionAr,
    ogImageUrl: seo?.ogImageUrl,
    twitterTitleEn: seo?.twitterTitleEn,
    twitterTitleAr: seo?.twitterTitleAr,
    twitterDescriptionEn: seo?.twitterDescriptionEn,
    twitterDescriptionAr: seo?.twitterDescriptionAr,
    twitterImageUrl: seo?.twitterImageUrl,
    robotsIndex: seo?.robotsIndex,
    robotsFollow: seo?.robotsFollow,
  });
}

/** Page-level JSON-LD inputs shared by every static page's server component. */
export async function getPageSeoSchemaFlags(slug: PageSlug): Promise<{ schemaEnabled: boolean; schemaJsonld: Record<string, unknown> | null }> {
  const seo = await getPageSeo(slug);
  return { schemaEnabled: seo?.schemaEnabled ?? true, schemaJsonld: seo?.schemaJsonld ?? null };
}
