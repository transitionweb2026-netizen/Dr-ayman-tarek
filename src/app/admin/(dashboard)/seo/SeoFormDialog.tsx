"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { SeoCharField } from "@/components/admin/ui/SeoCharField";
import { SearchPreview } from "@/components/admin/ui/SearchPreview";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { useUpsertPageSeo, type PageWithSeo } from "@/hooks/usePageSeo";
import type { MediaAsset } from "@/hooks/useMediaLibrary";

function useMediaAssetById(id: string | null | undefined) {
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

const EMPTY_FORM = {
  seo_title_en: "", seo_title_ar: "", seo_description_en: "", seo_description_ar: "",
  focus_keyword_en: "", focus_keyword_ar: "",
  canonical_url: "", og_image_media_id: null as string | null, twitter_image_media_id: null as string | null,
  og_title_en: "", og_title_ar: "", og_description_en: "", og_description_ar: "",
  twitter_title_en: "", twitter_title_ar: "", twitter_description_en: "", twitter_description_ar: "",
  robots_index: true, robots_follow: true, schema_enabled: true,
};

export function SeoFormDialog({ page, onClose }: { page: PageWithSeo | null; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [ogImage, setOgImage] = useState<MediaAsset | null>(null);
  const [twitterImage, setTwitterImage] = useState<MediaAsset | null>(null);
  const upsert = useUpsertPageSeo();

  const { data: existingOg } = useMediaAssetById(page?.page_seo?.og_image_media_id);
  const { data: existingTwitter } = useMediaAssetById(page?.page_seo?.twitter_image_media_id);
  useEffect(() => { if (existingOg) setOgImage(existingOg); }, [existingOg]);
  useEffect(() => { if (existingTwitter) setTwitterImage(existingTwitter); }, [existingTwitter]);

  useEffect(() => {
    if (page) {
      const seo = page.page_seo;
      setForm({
        seo_title_en: seo?.seo_title_en || "", seo_title_ar: seo?.seo_title_ar || "",
        seo_description_en: seo?.seo_description_en || "", seo_description_ar: seo?.seo_description_ar || "",
        focus_keyword_en: seo?.focus_keyword_en || "", focus_keyword_ar: seo?.focus_keyword_ar || "",
        canonical_url: seo?.canonical_url || "",
        og_image_media_id: seo?.og_image_media_id || null, twitter_image_media_id: seo?.twitter_image_media_id || null,
        og_title_en: seo?.og_title_en || "", og_title_ar: seo?.og_title_ar || "",
        og_description_en: seo?.og_description_en || "", og_description_ar: seo?.og_description_ar || "",
        twitter_title_en: seo?.twitter_title_en || "", twitter_title_ar: seo?.twitter_title_ar || "",
        twitter_description_en: seo?.twitter_description_en || "", twitter_description_ar: seo?.twitter_description_ar || "",
        robots_index: seo?.robots_index ?? true, robots_follow: seo?.robots_follow ?? true, schema_enabled: seo?.schema_enabled ?? true,
      });
      setOgImage(null);
      setTwitterImage(null);
    }
  }, [page]);

  async function handleSave() {
    if (!page) return;
    try {
      await upsert.mutateAsync({ pageId: page.id, patch: form });
      toast.success("SEO saved");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  const previewImageUrl = ogImage ? getPublicMediaUrl(ogImage.storage_path) : null;

  return (
    <Dialog open={page !== null} onClose={onClose} className="max-w-4xl">
      <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 p-6">
          <h2 className="text-lg font-bold text-white capitalize">{page?.slug.replace(/-/g, " ")} — SEO</h2>

          <BilingualField label="Focus Keyword" hint="The single phrase this page targets" valueEn={form.focus_keyword_en} valueAr={form.focus_keyword_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, focus_keyword_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, focus_keyword_ar: v }))} />

          <SeoCharField label="SEO Title" min={50} max={60} valueEn={form.seo_title_en} valueAr={form.seo_title_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, seo_title_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, seo_title_ar: v }))} />
          <SeoCharField label="Meta Description" min={140} max={160} multiline valueEn={form.seo_description_en} valueAr={form.seo_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, seo_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, seo_description_ar: v }))} />

          <FieldGroup label="Canonical URL" hint="Optional — defaults to the page's own URL">
            <TextField value={form.canonical_url} onChange={(e) => setForm((f) => ({ ...f, canonical_url: e.target.value }))} dir="ltr" placeholder="https://..." />
          </FieldGroup>

          <div className="rounded-xl border border-outline-variant/20 p-4">
            <p className="mb-4 text-sm font-semibold text-white">Open Graph (Facebook, LinkedIn, WhatsApp)</p>
            <div className="space-y-4">
              <BilingualField label="OG Title" hint="Falls back to SEO Title" valueEn={form.og_title_en} valueAr={form.og_title_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, og_title_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, og_title_ar: v }))} />
              <BilingualField label="OG Description" hint="Falls back to Meta Description" multiline valueEn={form.og_description_en} valueAr={form.og_description_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, og_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, og_description_ar: v }))} />
              <MediaPickerField
                label="OG Image"
                valueMediaId={form.og_image_media_id}
                valueUrl={ogImage ? getPublicMediaUrl(ogImage.storage_path) : null}
                onChange={(asset) => { setOgImage(asset); setForm((f) => ({ ...f, og_image_media_id: asset?.id ?? null })); }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant/20 p-4">
            <p className="mb-4 text-sm font-semibold text-white">Twitter / X Card</p>
            <div className="space-y-4">
              <BilingualField label="Twitter Title" hint="Falls back to OG Title" valueEn={form.twitter_title_en} valueAr={form.twitter_title_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, twitter_title_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, twitter_title_ar: v }))} />
              <BilingualField label="Twitter Description" hint="Falls back to OG Description" multiline valueEn={form.twitter_description_en} valueAr={form.twitter_description_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, twitter_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, twitter_description_ar: v }))} />
              <MediaPickerField
                label="Twitter Image (falls back to OG Image)"
                valueMediaId={form.twitter_image_media_id}
                valueUrl={twitterImage ? getPublicMediaUrl(twitterImage.storage_path) : null}
                onChange={(asset) => { setTwitterImage(asset); setForm((f) => ({ ...f, twitter_image_media_id: asset?.id ?? null })); }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ToggleField label="Index" checked={form.robots_index} onChange={(v) => setForm((f) => ({ ...f, robots_index: v }))} />
            <ToggleField label="Follow" checked={form.robots_follow} onChange={(v) => setForm((f) => ({ ...f, robots_follow: v }))} />
            <ToggleField label="Structured data" checked={form.schema_enabled} onChange={(v) => setForm((f) => ({ ...f, schema_enabled: v }))} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AdminButton variant="outline" size="sm" onClick={onClose}>Cancel</AdminButton>
            <AdminButton size="sm" loading={upsert.isPending} onClick={handleSave}>Save</AdminButton>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 bg-surface-container-lowest/40 p-6 lg:border-l lg:border-t-0">
          <p className="mb-4 text-sm font-semibold text-white">Search &amp; Social Preview</p>
          <SearchPreview
            title={form.seo_title_en || `${page?.slug.replace(/-/g, " ")}`}
            description={form.seo_description_en}
            url={form.canonical_url || `https://your-site.com/${page?.slug === "home" ? "" : page?.slug}`}
            imageUrl={previewImageUrl}
          />
        </div>
      </div>
    </Dialog>
  );
}
