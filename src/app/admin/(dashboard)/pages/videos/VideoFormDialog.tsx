"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";
import { videoHooks, type VideoRow } from "@/hooks/useVideos";
import type { MediaAsset } from "@/hooks/useMediaLibrary";
import { VersionHistoryButton } from "@/components/admin/ui/VersionHistory";

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

const emptyForm = {
  slug: "",
  title_en: "",
  title_ar: "",
  short_description_en: "",
  short_description_ar: "",
  description_en: "",
  description_ar: "",
  thumbnail_media_id: null as string | null,
  youtube_url: "",
  duration: "",
  category_en: "",
  category_ar: "",
  is_featured: false,
  status: "draft" as "draft" | "published",
};

export function VideoFormDialog({ item, nextOrder, onClose }: { item: VideoRow | null | "new"; nextOrder: number; onClose: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [thumbnail, setThumbnail] = useState<MediaAsset | null>(null);
  const create = videoHooks.useCreate();
  const update = videoHooks.useUpdate();
  const saving = create.isPending || update.isPending;

  const { data: existingThumb } = useMediaAssetById(item && item !== "new" ? item.thumbnail_media_id : null);
  useEffect(() => {
    if (existingThumb) setThumbnail(existingThumb);
  }, [existingThumb]);

  useEffect(() => {
    if (item && item !== "new") {
      setForm({
        slug: item.slug,
        title_en: item.title_en,
        title_ar: item.title_ar,
        short_description_en: item.short_description_en,
        short_description_ar: item.short_description_ar,
        description_en: item.description_en,
        description_ar: item.description_ar,
        thumbnail_media_id: item.thumbnail_media_id,
        youtube_url: item.youtube_url,
        duration: item.duration || "",
        category_en: item.category_en || "",
        category_ar: item.category_ar || "",
        is_featured: item.is_featured,
        status: item.status,
      });
      setSlugTouched(true);
      setThumbnail(null);
    } else {
      setForm(emptyForm);
      setSlugTouched(false);
      setThumbnail(null);
    }
  }, [item]);

  async function handleSubmit(publish: boolean) {
    if (!form.title_en || !form.title_ar || !form.slug) {
      toast.error("Title (both languages) and slug are required.");
      return;
    }
    const values = { ...form, status: publish ? ("published" as const) : ("draft" as const) };
    try {
      if (item && item !== "new") {
        await update.mutateAsync({ id: item.id, values });
      } else {
        await create.mutateAsync({ ...values, display_order: nextOrder, published_at: publish ? new Date().toISOString() : null });
      }
      toast.success(publish ? "Published" : "Saved as draft");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  const open = item !== null;

  return (
    <Dialog open={open} onClose={onClose} className="max-w-2xl">
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{item === "new" ? "Add Video" : "Edit Video"}</h2>
          {item !== "new" && <VersionHistoryButton table="videos" entityType="videos" entityId={item?.id} />}
        </div>
        <div className="space-y-5">
          <BilingualField
            label="Title"
            required
            valueEn={form.title_en}
            valueAr={form.title_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, title_en: v, slug: slugTouched ? f.slug : slugify(v) }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, title_ar: v }))}
          />
          <FieldGroup label="Slug">
            <TextField value={form.slug} onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })); }} dir="ltr" />
          </FieldGroup>
          <BilingualField
            label="Short description"
            hint="Shown on the video card"
            multiline
            valueEn={form.short_description_en}
            valueAr={form.short_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, short_description_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, short_description_ar: v }))}
          />
          <BilingualField
            label="Full description"
            multiline
            valueEn={form.description_en}
            valueAr={form.description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, description_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, description_ar: v }))}
          />
          <MediaPickerField
            label="Thumbnail"
            valueMediaId={form.thumbnail_media_id}
            valueUrl={thumbnail ? getPublicMediaUrl(thumbnail.storage_path) : null}
            onChange={(asset) => { setThumbnail(asset); setForm((f) => ({ ...f, thumbnail_media_id: asset?.id ?? null })); }}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="YouTube URL">
              <TextField value={form.youtube_url} onChange={(e) => setForm((f) => ({ ...f, youtube_url: e.target.value }))} dir="ltr" placeholder="https://youtube.com/watch?v=..." />
            </FieldGroup>
            <FieldGroup label="Duration" hint='e.g. "6:24"'>
              <TextField value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} dir="ltr" />
            </FieldGroup>
          </div>
          <BilingualField
            label="Category"
            valueEn={form.category_en}
            valueAr={form.category_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, category_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, category_ar: v }))}
          />
          <ToggleField label="Featured" checked={form.is_featured} onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))} />
          <ToggleField label="Published (visible on the live site)" checked={form.status === "published"} onChange={(v) => setForm((f) => ({ ...f, status: v ? "published" : "draft" }))} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton type="button" variant="outline" size="sm" onClick={onClose}>Cancel</AdminButton>
          <AdminButton type="button" variant="outline" size="sm" loading={saving} onClick={() => handleSubmit(false)}>Save Draft</AdminButton>
          <AdminButton type="button" size="sm" loading={saving} onClick={() => handleSubmit(true)}>Publish</AdminButton>
        </div>
      </div>
    </Dialog>
  );
}
