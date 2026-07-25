import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { mediaPublicUrl } from "./media";

export interface SiteSettingsData {
  doctorNameEn: string; doctorNameAr: string;
  clinicNameEn: string; clinicNameAr: string;
  logoUrl: string | null; faviconUrl: string | null;
  phone: string; whatsapp: string; emergencyPhone: string; email: string;
  addressEn: string; addressAr: string;
  businessHours: { label_en: string; label_ar: string; value_en: string; value_ar: string }[];
  socialLinks: { platform: string; url: string }[];
  googleMapsEmbedUrl: string | null;
  googleMapsAddressEn: string | null; googleMapsAddressAr: string | null;
  gaMeasurementId: string | null; googleAdsId: string | null; gtmContainerId: string | null; metaPixelId: string | null;
  footerDescriptionEn: string; footerDescriptionAr: string;
  footerCopyrightEn: string; footerCopyrightAr: string;
  // SEO / verification / analytics
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  yandexSiteVerification: string | null;
  msClarityId: string | null;
  twitterHandle: string | null;
  defaultOgImageUrl: string | null;
  defaultTwitterImageUrl: string | null;
  addressStreetEn: string | null; addressStreetAr: string | null;
  addressCityEn: string | null; addressCityAr: string | null;
  addressRegionEn: string | null; addressRegionAr: string | null;
  addressPostalCode: string | null;
  addressCountryEn: string | null; addressCountryAr: string | null;
  geoLatitude: number | null; geoLongitude: number | null;
  defaultTitleEn: string | null; defaultTitleAr: string | null;
  titleTemplateEn: string | null; titleTemplateAr: string | null;
  defaultDescriptionEn: string | null; defaultDescriptionAr: string | null;
  defaultKeywordsEn: string[]; defaultKeywordsAr: string[];
  /** Origin of the Supabase Storage host, for a <link rel="preconnect">; not a DB column. */
  supabaseAssetHost: string | null;
}

export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettingsData> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "*, logo:media_assets!site_settings_logo_media_id_fkey(storage_path), favicon:media_assets!site_settings_favicon_media_id_fkey(storage_path), default_og_image:media_assets!site_settings_default_og_image_media_id_fkey(storage_path), default_twitter_image:media_assets!site_settings_default_twitter_image_media_id_fkey(storage_path)",
    )
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = data as unknown as Record<string, unknown>;
  const logo = row.logo as { storage_path: string } | null;
  const favicon = row.favicon as { storage_path: string } | null;
  const defaultOgImage = row.default_og_image as { storage_path: string } | null;
  const defaultTwitterImage = row.default_twitter_image as { storage_path: string } | null;
  let supabaseAssetHost: string | null = null;
  try {
    supabaseAssetHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : null;
  } catch {
    supabaseAssetHost = null;
  }
  return {
    doctorNameEn: row.doctor_name_en as string, doctorNameAr: row.doctor_name_ar as string,
    clinicNameEn: row.clinic_name_en as string, clinicNameAr: row.clinic_name_ar as string,
    logoUrl: logo ? mediaPublicUrl(logo.storage_path) : null,
    faviconUrl: favicon ? mediaPublicUrl(favicon.storage_path) : null,
    phone: row.phone as string, whatsapp: row.whatsapp as string, emergencyPhone: row.emergency_phone as string, email: row.email as string,
    addressEn: row.address_en as string, addressAr: row.address_ar as string,
    businessHours: (row.business_hours as SiteSettingsData["businessHours"]) || [],
    socialLinks: (row.social_links as SiteSettingsData["socialLinks"]) || [],
    googleMapsEmbedUrl: row.google_maps_embed_url as string | null,
    googleMapsAddressEn: row.google_maps_address_en as string | null, googleMapsAddressAr: row.google_maps_address_ar as string | null,
    gaMeasurementId: row.ga_measurement_id as string | null, googleAdsId: row.google_ads_id as string | null,
    gtmContainerId: row.gtm_container_id as string | null, metaPixelId: row.meta_pixel_id as string | null,
    footerDescriptionEn: row.footer_description_en as string, footerDescriptionAr: row.footer_description_ar as string,
    footerCopyrightEn: row.footer_copyright_en as string, footerCopyrightAr: row.footer_copyright_ar as string,
    googleSiteVerification: row.google_site_verification as string | null,
    bingSiteVerification: row.bing_site_verification as string | null,
    yandexSiteVerification: row.yandex_site_verification as string | null,
    msClarityId: row.ms_clarity_id as string | null,
    twitterHandle: row.twitter_handle as string | null,
    defaultOgImageUrl: defaultOgImage ? mediaPublicUrl(defaultOgImage.storage_path) : null,
    defaultTwitterImageUrl: defaultTwitterImage ? mediaPublicUrl(defaultTwitterImage.storage_path) : null,
    addressStreetEn: row.address_street_en as string | null, addressStreetAr: row.address_street_ar as string | null,
    addressCityEn: row.address_city_en as string | null, addressCityAr: row.address_city_ar as string | null,
    addressRegionEn: row.address_region_en as string | null, addressRegionAr: row.address_region_ar as string | null,
    addressPostalCode: row.address_postal_code as string | null,
    addressCountryEn: row.address_country_en as string | null, addressCountryAr: row.address_country_ar as string | null,
    geoLatitude: row.geo_latitude as number | null, geoLongitude: row.geo_longitude as number | null,
    defaultTitleEn: row.default_title_en as string | null, defaultTitleAr: row.default_title_ar as string | null,
    titleTemplateEn: row.title_template_en as string | null, titleTemplateAr: row.title_template_ar as string | null,
    defaultDescriptionEn: row.default_description_en as string | null, defaultDescriptionAr: row.default_description_ar as string | null,
    defaultKeywordsEn: (row.default_keywords_en as string[]) || [], defaultKeywordsAr: (row.default_keywords_ar as string[]) || [],
    supabaseAssetHost,
  };
});

export interface NavLinkData {
  labelEn: string; labelAr: string; href: string;
}

export const getNavLinks = cache(async function getNavLinks(): Promise<{ header: NavLinkData[]; footerExpertise: NavLinkData[]; footerJourney: NavLinkData[] }> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("nav_links").select("*").eq("is_visible", true).order("display_order");
  if (error) throw error;
  const map = (location: string) => data.filter((l) => l.location === location).map((l) => ({ labelEn: l.label_en, labelAr: l.label_ar, href: l.href }));
  return { header: map("header"), footerExpertise: map("footer_expertise"), footerJourney: map("footer_journey") };
});
