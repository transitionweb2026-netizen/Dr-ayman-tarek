"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/Button";
import { AdminCard, PageHeader } from "@/components/admin/ui/Card";
import { BilingualField, FieldGroup, TextField } from "@/components/admin/ui/Field";
import { SeoCharField } from "@/components/admin/ui/SeoCharField";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { Repeater } from "@/components/admin/ui/Repeater";
import { Tabs } from "@/components/admin/ui/Tabs";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { NavigationTab } from "./NavigationTab";
import type { MediaAsset } from "@/hooks/useMediaLibrary";
import type { Json } from "@/lib/supabase/database.types";

function useMediaAssetById(id: string | null) {
  return useQuery({
    queryKey: ["media-assets", "byId", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("media_assets").select("*").eq("id", id as string).maybeSingle();
      if (error) throw error;
      return data as MediaAsset | null;
    },
    enabled: Boolean(id),
  });
}

interface HourRow { key: string; label_en: string; label_ar: string; value_en: string; value_ar: string }
interface SocialRow { key: string; platform: string; url: string }
let seq = 0;
const nextKey = () => `row-${Date.now()}-${seq++}`;

const TABS = [
  { key: "general", label: "General" },
  { key: "contact", label: "Contact" },
  { key: "hours", label: "Hours & Social" },
  { key: "seo", label: "Global SEO" },
  { key: "analytics", label: "Analytics" },
  { key: "footer", label: "Footer" },
  { key: "navigation", label: "Navigation" },
];

export function SettingsForm() {
  const { data: settings, isLoading } = useSiteSettings();
  const update = useUpdateSiteSettings();
  const [tab, setTab] = useState("general");

  const [form, setForm] = useState({
    doctor_name_en: "", doctor_name_ar: "", clinic_name_en: "", clinic_name_ar: "",
    logo_media_id: null as string | null, favicon_media_id: null as string | null, footer_badge_media_id: null as string | null,
    phone: "", whatsapp: "", emergency_phone: "", email: "", appointment_booking_url: "", address_en: "", address_ar: "",
    google_maps_embed_url: "", google_maps_address_en: "", google_maps_address_ar: "",
    ga_measurement_id: "", google_ads_id: "", gtm_container_id: "", meta_pixel_id: "",
    footer_description_en: "", footer_description_ar: "", footer_copyright_en: "", footer_copyright_ar: "",
    default_title_en: "", default_title_ar: "", title_template_en: "", title_template_ar: "",
    default_description_en: "", default_description_ar: "",
    google_site_verification: "", bing_site_verification: "", yandex_site_verification: "", ms_clarity_id: "",
    twitter_handle: "", default_og_image_media_id: null as string | null, default_twitter_image_media_id: null as string | null,
    address_street_en: "", address_street_ar: "", address_city_en: "", address_city_ar: "",
    address_region_en: "", address_region_ar: "", address_postal_code: "", address_country_en: "", address_country_ar: "",
    geo_latitude: "", geo_longitude: "",
  });
  const [hours, setHours] = useState<HourRow[]>([]);
  const [social, setSocial] = useState<SocialRow[]>([]);
  const [keywordsEn, setKeywordsEn] = useState("");
  const [keywordsAr, setKeywordsAr] = useState("");
  const [logo, setLogo] = useState<MediaAsset | null>(null);
  const [favicon, setFavicon] = useState<MediaAsset | null>(null);
  const [footerBadge, setFooterBadge] = useState<MediaAsset | null>(null);
  const [defaultOgImage, setDefaultOgImage] = useState<MediaAsset | null>(null);
  const [defaultTwitterImage, setDefaultTwitterImage] = useState<MediaAsset | null>(null);

  const { data: existingLogo } = useMediaAssetById(settings?.logo_media_id ?? null);
  const { data: existingFavicon } = useMediaAssetById(settings?.favicon_media_id ?? null);
  const { data: existingFooterBadge } = useMediaAssetById(settings?.footer_badge_media_id ?? null);
  const { data: existingDefaultOg } = useMediaAssetById(settings?.default_og_image_media_id ?? null);
  const { data: existingDefaultTwitter } = useMediaAssetById(settings?.default_twitter_image_media_id ?? null);
  useEffect(() => { if (existingLogo) setLogo(existingLogo); }, [existingLogo]);
  useEffect(() => { if (existingFavicon) setFavicon(existingFavicon); }, [existingFavicon]);
  useEffect(() => { if (existingFooterBadge) setFooterBadge(existingFooterBadge); }, [existingFooterBadge]);
  useEffect(() => { if (existingDefaultOg) setDefaultOgImage(existingDefaultOg); }, [existingDefaultOg]);
  useEffect(() => { if (existingDefaultTwitter) setDefaultTwitterImage(existingDefaultTwitter); }, [existingDefaultTwitter]);

  useEffect(() => {
    if (!settings) return;
    setForm({
      doctor_name_en: settings.doctor_name_en, doctor_name_ar: settings.doctor_name_ar,
      clinic_name_en: settings.clinic_name_en, clinic_name_ar: settings.clinic_name_ar,
      logo_media_id: settings.logo_media_id, favicon_media_id: settings.favicon_media_id,
      footer_badge_media_id: settings.footer_badge_media_id,
      phone: settings.phone, whatsapp: settings.whatsapp, emergency_phone: settings.emergency_phone, email: settings.email,
      appointment_booking_url: settings.appointment_booking_url || "",
      address_en: settings.address_en, address_ar: settings.address_ar,
      google_maps_embed_url: settings.google_maps_embed_url || "",
      google_maps_address_en: settings.google_maps_address_en || "",
      google_maps_address_ar: settings.google_maps_address_ar || "",
      ga_measurement_id: settings.ga_measurement_id || "", google_ads_id: settings.google_ads_id || "",
      gtm_container_id: settings.gtm_container_id || "", meta_pixel_id: settings.meta_pixel_id || "",
      footer_description_en: settings.footer_description_en, footer_description_ar: settings.footer_description_ar,
      footer_copyright_en: settings.footer_copyright_en, footer_copyright_ar: settings.footer_copyright_ar,
      default_title_en: settings.default_title_en || "", default_title_ar: settings.default_title_ar || "",
      title_template_en: settings.title_template_en || "", title_template_ar: settings.title_template_ar || "",
      default_description_en: settings.default_description_en || "", default_description_ar: settings.default_description_ar || "",
      google_site_verification: settings.google_site_verification || "", bing_site_verification: settings.bing_site_verification || "",
      yandex_site_verification: settings.yandex_site_verification || "", ms_clarity_id: settings.ms_clarity_id || "",
      twitter_handle: settings.twitter_handle || "",
      default_og_image_media_id: settings.default_og_image_media_id, default_twitter_image_media_id: settings.default_twitter_image_media_id,
      address_street_en: settings.address_street_en || "", address_street_ar: settings.address_street_ar || "",
      address_city_en: settings.address_city_en || "", address_city_ar: settings.address_city_ar || "",
      address_region_en: settings.address_region_en || "", address_region_ar: settings.address_region_ar || "",
      address_postal_code: settings.address_postal_code || "",
      address_country_en: settings.address_country_en || "", address_country_ar: settings.address_country_ar || "",
      geo_latitude: settings.geo_latitude?.toString() || "", geo_longitude: settings.geo_longitude?.toString() || "",
    });
    setKeywordsEn((settings.default_keywords_en || []).join(", "));
    setKeywordsAr((settings.default_keywords_ar || []).join(", "));
    const hoursData = (settings.business_hours as unknown as Omit<HourRow, "key">[]) || [];
    setHours(hoursData.map((h) => ({ ...h, key: nextKey() })));
    const socialData = (settings.social_links as unknown as Omit<SocialRow, "key">[]) || [];
    setSocial(socialData.map((s) => ({ ...s, key: nextKey() })));
  }, [settings]);

  async function handleSave() {
    try {
      const { geo_latitude, geo_longitude, ...rest } = form;
      await update.mutateAsync({
        ...rest,
        geo_latitude: geo_latitude ? Number(geo_latitude) : null,
        geo_longitude: geo_longitude ? Number(geo_longitude) : null,
        default_keywords_en: keywordsEn.split(",").map((k) => k.trim()).filter(Boolean),
        default_keywords_ar: keywordsAr.split(",").map((k) => k.trim()).filter(Boolean),
        business_hours: hours.map((h) => ({ label_en: h.label_en, label_ar: h.label_ar, value_en: h.value_en, value_ar: h.value_ar })) as unknown as Json,
        social_links: social.map((s) => ({ platform: s.platform, url: s.url })) as unknown as Json,
      });
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  if (isLoading) return <p className="text-sm text-on-surface-variant">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="Global configuration used everywhere across the site."
        actions={<AdminButton loading={update.isPending} onClick={handleSave}>Save Changes</AdminButton>}
      />

      <div className="mb-6">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "general" && (
        <div className="space-y-6">
          <AdminCard>
            <BilingualField label="Doctor name" valueEn={form.doctor_name_en} valueAr={form.doctor_name_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, doctor_name_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, doctor_name_ar: v }))} />
            <div className="mt-4">
              <BilingualField label="Clinic name" valueEn={form.clinic_name_en} valueAr={form.clinic_name_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, clinic_name_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, clinic_name_ar: v }))} />
            </div>
          </AdminCard>
          <AdminCard>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MediaPickerField label="Logo" valueMediaId={form.logo_media_id} valueUrl={logo ? getPublicMediaUrl(logo.storage_path) : null}
                onChange={(asset) => { setLogo(asset); setForm((f) => ({ ...f, logo_media_id: asset?.id ?? null })); }} />
              <MediaPickerField label="Favicon" valueMediaId={form.favicon_media_id} valueUrl={favicon ? getPublicMediaUrl(favicon.storage_path) : null}
                onChange={(asset) => { setFavicon(asset); setForm((f) => ({ ...f, favicon_media_id: asset?.id ?? null })); }} />
            </div>
            <p className="mt-3 text-xs text-on-surface-variant">Leave empty to keep the current icon-based brand mark unchanged.</p>
          </AdminCard>
        </div>
      )}

      {tab === "contact" && (
        <div className="space-y-6">
          <AdminCard>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldGroup label="Phone" hint="Used for tel: links + Call Now button">
                <TextField value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} dir="ltr" placeholder="+20 100 000 0000" />
              </FieldGroup>
              <FieldGroup label="WhatsApp number" hint="Digits only, no + or spaces (used for wa.me links)">
                <TextField value={form.whatsapp} onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))} dir="ltr" placeholder="201000000000" />
              </FieldGroup>
              <FieldGroup label="Emergency phone">
                <TextField value={form.emergency_phone} onChange={(e) => setForm((f) => ({ ...f, emergency_phone: e.target.value }))} dir="ltr" placeholder="+20 109 999 9999" />
              </FieldGroup>
              <FieldGroup label="Email">
                <TextField value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} dir="ltr" type="email" />
              </FieldGroup>
            </div>
          </AdminCard>
          <AdminCard>
            <FieldGroup
              label="External Booking URL"
              hint="Optional — Calendly, a patient portal, etc. Leave blank and every 'Book Appointment' button sitewide opens the Contact page instead."
            >
              <TextField
                value={form.appointment_booking_url}
                onChange={(e) => setForm((f) => ({ ...f, appointment_booking_url: e.target.value }))}
                dir="ltr"
                type="url"
                placeholder="https://calendly.com/…"
              />
            </FieldGroup>
          </AdminCard>
          <AdminCard>
            <BilingualField label="Clinic address" valueEn={form.address_en} valueAr={form.address_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, address_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, address_ar: v }))} />
          </AdminCard>
          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Google Maps</p>
            <FieldGroup label="Embed URL" hint="Google Maps 'Embed a map' iframe src">
              <TextField value={form.google_maps_embed_url} onChange={(e) => setForm((f) => ({ ...f, google_maps_embed_url: e.target.value }))} dir="ltr" />
            </FieldGroup>
            <div className="mt-4">
              <BilingualField label="Map address label" valueEn={form.google_maps_address_en} valueAr={form.google_maps_address_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, google_maps_address_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, google_maps_address_ar: v }))} />
            </div>
          </AdminCard>
        </div>
      )}

      {tab === "hours" && (
        <div className="space-y-6">
          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Business Hours</p>
            <Repeater
              items={hours}
              onChange={setHours}
              keyOf={(h) => h.key}
              addLabel="Add row"
              emptyLabel="No hours listed yet."
              newItem={() => ({ key: nextKey(), label_en: "", label_ar: "", value_en: "", value_ar: "" })}
              renderItem={(h, _i, patch) => (
                <div className="space-y-3">
                  <BilingualField label="Label" placeholder={{ en: "e.g. Working Hours" }} valueEn={h.label_en} valueAr={h.label_ar}
                    onChangeEn={(v) => patch({ label_en: v })} onChangeAr={(v) => patch({ label_ar: v })} />
                  <BilingualField label="Value" placeholder={{ en: "e.g. Sat - Thu: 9 AM - 7 PM" }} valueEn={h.value_en} valueAr={h.value_ar}
                    onChangeEn={(v) => patch({ value_en: v })} onChangeAr={(v) => patch({ value_ar: v })} />
                </div>
              )}
            />
          </AdminCard>
          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Social Media Links</p>
            <Repeater
              items={social}
              onChange={setSocial}
              keyOf={(s) => s.key}
              addLabel="Add link"
              emptyLabel="No social links yet."
              newItem={() => ({ key: nextKey(), platform: "instagram", url: "" })}
              renderItem={(s, _i, patch) => (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                  <FieldGroup label="Platform">
                    <TextField value={s.platform} onChange={(e) => patch({ platform: e.target.value })} dir="ltr" placeholder="instagram" />
                  </FieldGroup>
                  <FieldGroup label="URL">
                    <TextField value={s.url} onChange={(e) => patch({ url: e.target.value })} dir="ltr" placeholder="https://instagram.com/..." />
                  </FieldGroup>
                </div>
              )}
            />
          </AdminCard>
        </div>
      )}

      {tab === "seo" && (
        <div className="space-y-6">
          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Sitewide Defaults</p>
            <div className="space-y-4">
              <SeoCharField label="Default Title" min={50} max={60} valueEn={form.default_title_en} valueAr={form.default_title_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, default_title_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, default_title_ar: v }))} />
              <BilingualField label="Title Template" hint='Use %s for the page title, e.g. "%s | Dr. Ayman Tarek"' valueEn={form.title_template_en} valueAr={form.title_template_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, title_template_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, title_template_ar: v }))} />
              <SeoCharField label="Default Description" min={140} max={160} multiline valueEn={form.default_description_en} valueAr={form.default_description_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, default_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, default_description_ar: v }))} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FieldGroup label="Default Keywords (English)" hint="Comma-separated">
                  <TextField value={keywordsEn} onChange={(e) => setKeywordsEn(e.target.value)} dir="ltr" placeholder="neurosurgery, spine surgery, ..." />
                </FieldGroup>
                <FieldGroup label="Default Keywords (Arabic)" hint="Comma-separated">
                  <TextField value={keywordsAr} onChange={(e) => setKeywordsAr(e.target.value)} dir="rtl" placeholder="جراحة الأعصاب، جراحة العمود الفقري، ..." />
                </FieldGroup>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Default Social Images</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MediaPickerField label="Default OG Image" valueMediaId={form.default_og_image_media_id} valueUrl={defaultOgImage ? getPublicMediaUrl(defaultOgImage.storage_path) : null}
                onChange={(asset) => { setDefaultOgImage(asset); setForm((f) => ({ ...f, default_og_image_media_id: asset?.id ?? null })); }} />
              <MediaPickerField label="Default Twitter Image" valueMediaId={form.default_twitter_image_media_id} valueUrl={defaultTwitterImage ? getPublicMediaUrl(defaultTwitterImage.storage_path) : null}
                onChange={(asset) => { setDefaultTwitterImage(asset); setForm((f) => ({ ...f, default_twitter_image_media_id: asset?.id ?? null })); }} />
            </div>
            <div className="mt-4">
              <FieldGroup label="Twitter Handle" hint="e.g. @draymantarek">
                <TextField value={form.twitter_handle} onChange={(e) => setForm((f) => ({ ...f, twitter_handle: e.target.value }))} dir="ltr" />
              </FieldGroup>
            </div>
          </AdminCard>

          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Search Engine Verification</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldGroup label="Google Search Console" hint="Verification token only, not the full meta tag">
                <TextField value={form.google_site_verification} onChange={(e) => setForm((f) => ({ ...f, google_site_verification: e.target.value }))} dir="ltr" />
              </FieldGroup>
              <FieldGroup label="Bing Webmaster Tools">
                <TextField value={form.bing_site_verification} onChange={(e) => setForm((f) => ({ ...f, bing_site_verification: e.target.value }))} dir="ltr" />
              </FieldGroup>
              <FieldGroup label="Yandex Webmaster">
                <TextField value={form.yandex_site_verification} onChange={(e) => setForm((f) => ({ ...f, yandex_site_verification: e.target.value }))} dir="ltr" />
              </FieldGroup>
              <FieldGroup label="Microsoft Clarity ID">
                <TextField value={form.ms_clarity_id} onChange={(e) => setForm((f) => ({ ...f, ms_clarity_id: e.target.value }))} dir="ltr" />
              </FieldGroup>
            </div>
          </AdminCard>

          <AdminCard>
            <p className="mb-4 text-sm font-semibold text-white">Structured Business Address</p>
            <p className="mb-4 text-xs text-on-surface-variant">Used for LocalBusiness structured data (Google&apos;s rich business panel) — separate from the display address in the Contact tab.</p>
            <div className="space-y-4">
              <BilingualField label="Street" valueEn={form.address_street_en} valueAr={form.address_street_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, address_street_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, address_street_ar: v }))} />
              <BilingualField label="City" valueEn={form.address_city_en} valueAr={form.address_city_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, address_city_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, address_city_ar: v }))} />
              <BilingualField label="Region / Governorate" valueEn={form.address_region_en} valueAr={form.address_region_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, address_region_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, address_region_ar: v }))} />
              <BilingualField label="Country" valueEn={form.address_country_en} valueAr={form.address_country_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, address_country_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, address_country_ar: v }))} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FieldGroup label="Postal Code">
                  <TextField value={form.address_postal_code} onChange={(e) => setForm((f) => ({ ...f, address_postal_code: e.target.value }))} dir="ltr" />
                </FieldGroup>
                <FieldGroup label="Latitude">
                  <TextField value={form.geo_latitude} onChange={(e) => setForm((f) => ({ ...f, geo_latitude: e.target.value }))} dir="ltr" placeholder="30.0444" />
                </FieldGroup>
                <FieldGroup label="Longitude">
                  <TextField value={form.geo_longitude} onChange={(e) => setForm((f) => ({ ...f, geo_longitude: e.target.value }))} dir="ltr" placeholder="31.2357" />
                </FieldGroup>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {tab === "analytics" && (
        <AdminCard>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="Google Analytics Measurement ID" hint="G-XXXXXXX">
              <TextField value={form.ga_measurement_id} onChange={(e) => setForm((f) => ({ ...f, ga_measurement_id: e.target.value }))} dir="ltr" />
            </FieldGroup>
            <FieldGroup label="Google Ads ID" hint="AW-XXXXXXX">
              <TextField value={form.google_ads_id} onChange={(e) => setForm((f) => ({ ...f, google_ads_id: e.target.value }))} dir="ltr" />
            </FieldGroup>
            <FieldGroup label="Google Tag Manager Container ID" hint="GTM-XXXXXXX">
              <TextField value={form.gtm_container_id} onChange={(e) => setForm((f) => ({ ...f, gtm_container_id: e.target.value }))} dir="ltr" />
            </FieldGroup>
            <FieldGroup label="Meta Pixel ID">
              <TextField value={form.meta_pixel_id} onChange={(e) => setForm((f) => ({ ...f, meta_pixel_id: e.target.value }))} dir="ltr" />
            </FieldGroup>
          </div>
        </AdminCard>
      )}

      {tab === "footer" && (
        <div className="space-y-6">
          <AdminCard>
            <BilingualField label="Footer description" multiline valueEn={form.footer_description_en} valueAr={form.footer_description_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, footer_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, footer_description_ar: v }))} />
            <div className="mt-4">
              <BilingualField label="Copyright line" valueEn={form.footer_copyright_en} valueAr={form.footer_copyright_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, footer_copyright_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, footer_copyright_ar: v }))} />
            </div>
          </AdminCard>
          <AdminCard>
            <MediaPickerField label="Footer Branding Badge" valueMediaId={form.footer_badge_media_id} valueUrl={footerBadge ? getPublicMediaUrl(footerBadge.storage_path) : null}
              onChange={(asset) => { setFooterBadge(asset); setForm((f) => ({ ...f, footer_badge_media_id: asset?.id ?? null })); }} />
            <p className="mt-3 text-xs text-on-surface-variant">A dedicated symbol/emblem for a new premium branding row above the footer&apos;s columns — separate from the Logo above. That row stays hidden until an image is set here.</p>
          </AdminCard>
        </div>
      )}

      {tab === "navigation" && <NavigationTab />}
    </div>
  );
}
