"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, TextField } from "@/components/admin/ui/Field";
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

export function SeoFormDialog({ page, onClose }: { page: PageWithSeo | null; onClose: () => void }) {
  const [form, setForm] = useState({
    seo_title_en: "", seo_title_ar: "", seo_description_en: "", seo_description_ar: "",
    canonical_url: "", og_image_media_id: null as string | null,
  });
  const [ogImage, setOgImage] = useState<MediaAsset | null>(null);
  const upsert = useUpsertPageSeo();

  const { data: existingOg } = useMediaAssetById(page?.page_seo?.og_image_media_id);
  useEffect(() => { if (existingOg) setOgImage(existingOg); }, [existingOg]);

  useEffect(() => {
    if (page) {
      const seo = page.page_seo;
      setForm({
        seo_title_en: seo?.seo_title_en || "",
        seo_title_ar: seo?.seo_title_ar || "",
        seo_description_en: seo?.seo_description_en || "",
        seo_description_ar: seo?.seo_description_ar || "",
        canonical_url: seo?.canonical_url || "",
        og_image_media_id: seo?.og_image_media_id || null,
      });
      setOgImage(null);
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

  return (
    <Dialog open={page !== null} onClose={onClose} className="max-w-xl">
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <h2 className="mb-5 text-lg font-bold text-white capitalize">{page?.slug.replace(/-/g, " ")} — SEO</h2>
        <div className="space-y-4">
          <BilingualField label="SEO Title" hint="~60 characters" valueEn={form.seo_title_en} valueAr={form.seo_title_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, seo_title_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, seo_title_ar: v }))} />
          <BilingualField label="SEO Description" hint="~155 characters" multiline valueEn={form.seo_description_en} valueAr={form.seo_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, seo_description_en: v }))} onChangeAr={(v) => setForm((f) => ({ ...f, seo_description_ar: v }))} />
          <FieldGroup label="Canonical URL" hint="Optional — defaults to the page's own URL">
            <TextField value={form.canonical_url} onChange={(e) => setForm((f) => ({ ...f, canonical_url: e.target.value }))} dir="ltr" placeholder="https://..." />
          </FieldGroup>
          <MediaPickerField
            label="Open Graph / Twitter image"
            valueMediaId={form.og_image_media_id}
            valueUrl={ogImage ? getPublicMediaUrl(ogImage.storage_path) : null}
            onChange={(asset) => { setOgImage(asset); setForm((f) => ({ ...f, og_image_media_id: asset?.id ?? null })); }}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="outline" size="sm" onClick={onClose}>Cancel</AdminButton>
          <AdminButton size="sm" loading={upsert.isPending} onClick={handleSave}>Save</AdminButton>
        </div>
      </div>
    </Dialog>
  );
}
