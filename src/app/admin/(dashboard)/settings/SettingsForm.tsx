"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/Button";
import { AdminCard, PageHeader } from "@/components/admin/ui/Card";
import { BilingualField, FieldGroup, TextField } from "@/components/admin/ui/Field";
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
    logo_media_id: null as string | null, favicon_media_id: null as string | null,
    phone: "", whatsapp: "", emergency_phone: "", email: "", address_en: "", address_ar: "",
    google_maps_embed_url: "", google_maps_address_en: "", google_maps_address_ar: "",
    ga_measurement_id: "", google_ads_id: "", gtm_container_id: "", meta_pixel_id: "",
    footer_description_en: "", footer_description_ar: "", footer_copyright_en: "", footer_copyright_ar: "",
  });
  const [hours, setHours] = useState<HourRow[]>([]);
  const [social, setSocial] = useState<SocialRow[]>([]);
  const [logo, setLogo] = useState<MediaAsset | null>(null);
  const [favicon, setFavicon] = useState<MediaAsset | null>(null);

  const { data: existingLogo } = useMediaAssetById(settings?.logo_media_id ?? null);
  const { data: existingFavicon } = useMediaAssetById(settings?.favicon_media_id ?? null);
  useEffect(() => { if (existingLogo) setLogo(existingLogo); }, [existingLogo]);
  useEffect(() => { if (existingFavicon) setFavicon(existingFavicon); }, [existingFavicon]);

  useEffect(() => {
    if (!settings) return;
    setForm({
      doctor_name_en: settings.doctor_name_en, doctor_name_ar: settings.doctor_name_ar,
      clinic_name_en: settings.clinic_name_en, clinic_name_ar: settings.clinic_name_ar,
      logo_media_id: settings.logo_media_id, favicon_media_id: settings.favicon_media_id,
      phone: settings.phone, whatsapp: settings.whatsapp, emergency_phone: settings.emergency_phone, email: settings.email,
      address_en: settings.address_en, address_ar: settings.address_ar,
      google_maps_embed_url: settings.google_maps_embed_url || "",
      google_maps_address_en: settings.google_maps_address_en || "",
      google_maps_address_ar: settings.google_maps_address_ar || "",
      ga_measurement_id: settings.ga_measurement_id || "", google_ads_id: settings.google_ads_id || "",
      gtm_container_id: settings.gtm_container_id || "", meta_pixel_id: settings.meta_pixel_id || "",
      footer_description_en: settings.footer_description_en, footer_description_ar: settings.footer_description_ar,
      footer_copyright_en: settings.footer_copyright_en, footer_copyright_ar: settings.footer_copyright_ar,
    });
    const hoursData = (settings.business_hours as unknown as Omit<HourRow, "key">[]) || [];
    setHours(hoursData.map((h) => ({ ...h, key: nextKey() })));
    const socialData = (settings.social_links as unknown as Omit<SocialRow, "key">[]) || [];
    setSocial(socialData.map((s) => ({ ...s, key: nextKey() })));
  }, [settings]);

  async function handleSave() {
    try {
      await update.mutateAsync({
        ...form,
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
        <AdminCard>
          <BilingualField label="Footer description" multiline valueEn={form.footer_description_en} valueAr={form.footer_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, footer_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, footer_description_ar: v }))} />
          <div className="mt-4">
            <BilingualField label="Copyright line" valueEn={form.footer_copyright_en} valueAr={form.footer_copyright_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, footer_copyright_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, footer_copyright_ar: v }))} />
          </div>
        </AdminCard>
      )}

      {tab === "navigation" && <NavigationTab />}
    </div>
  );
}
