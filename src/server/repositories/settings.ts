import "server-only";
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
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*, logo:media_assets!site_settings_logo_media_id_fkey(storage_path), favicon:media_assets!site_settings_favicon_media_id_fkey(storage_path)").eq("id", 1).single();
  if (error) throw error;
  const row = data as unknown as Record<string, unknown>;
  const logo = row.logo as { storage_path: string } | null;
  const favicon = row.favicon as { storage_path: string } | null;
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
  };
}

export interface NavLinkData {
  labelEn: string; labelAr: string; href: string;
}

export async function getNavLinks(): Promise<{ header: NavLinkData[]; footerExpertise: NavLinkData[]; footerJourney: NavLinkData[] }> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("nav_links").select("*").eq("is_visible", true).order("display_order");
  if (error) throw error;
  const map = (location: string) => data.filter((l) => l.location === location).map((l) => ({ labelEn: l.label_en, labelAr: l.label_ar, href: l.href }));
  return { header: map("header"), footerExpertise: map("footer_expertise"), footerJourney: map("footer_journey") };
}
