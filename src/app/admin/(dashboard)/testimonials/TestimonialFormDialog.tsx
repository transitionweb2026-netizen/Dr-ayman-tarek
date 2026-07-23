"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { testimonialHooks, type TestimonialRow } from "@/hooks/useTestimonials";
import { VersionHistoryButton } from "@/components/admin/ui/VersionHistory";
import type { MediaAsset } from "@/hooks/useMediaLibrary";
import { cn } from "@/lib/utils";

/** Resolves an existing photo_media_id to its asset (for the edit-form preview only — new picks already carry the full asset object). */
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

const PLACEMENT_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "dr-ayman-tarek", label: "Dr. Ayman Tarek" },
];

const emptyForm = {
  patient_name: "",
  country: "",
  role_en: "",
  role_ar: "",
  review_en: "",
  review_ar: "",
  rating: 5,
  photo_media_id: null as string | null,
  video_url: "",
  placements: ["home"] as string[],
  status: "draft" as "draft" | "published",
};

export function TestimonialFormDialog({ item, nextOrder, onClose }: { item: TestimonialRow | null | "new"; nextOrder: number; onClose: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const [photoAsset, setPhotoAsset] = useState<MediaAsset | null>(null);
  const create = testimonialHooks.useCreate();
  const update = testimonialHooks.useUpdate();
  const saving = create.isPending || update.isPending;

  const { data: existingPhoto } = useMediaAssetById(item && item !== "new" ? item.photo_media_id : null);
  useEffect(() => {
    if (existingPhoto) setPhotoAsset(existingPhoto);
  }, [existingPhoto]);

  useEffect(() => {
    if (item && item !== "new") {
      setForm({
        patient_name: item.patient_name,
        country: item.country || "",
        role_en: item.role_en || "",
        role_ar: item.role_ar || "",
        review_en: item.review_en,
        review_ar: item.review_ar,
        rating: item.rating,
        photo_media_id: item.photo_media_id,
        video_url: item.video_url || "",
        placements: item.placements.length > 0 ? item.placements : ["home"],
        status: item.status,
      });
      setPhotoAsset(null);
    } else {
      setForm(emptyForm);
      setPhotoAsset(null);
    }
  }, [item]);

  function togglePlacement(value: string) {
    setForm((f) => ({
      ...f,
      placements: f.placements.includes(value) ? f.placements.filter((p) => p !== value) : [...f.placements, value],
    }));
  }

  async function handleSubmit(publish: boolean) {
    if (form.placements.length === 0) {
      toast.error("Select at least one page to show this on.");
      return;
    }
    const values = {
      patient_name: form.patient_name,
      country: form.country || null,
      role_en: form.role_en || null,
      role_ar: form.role_ar || null,
      review_en: form.review_en,
      review_ar: form.review_ar,
      rating: form.rating,
      photo_media_id: form.photo_media_id,
      video_url: form.video_url || null,
      placements: form.placements,
      status: publish ? ("published" as const) : ("draft" as const),
    };
    try {
      if (item && item !== "new") {
        await update.mutateAsync({ id: item.id, values });
      } else {
        await create.mutateAsync({ ...values, display_order: nextOrder });
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
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{item === "new" ? "Add Testimonial" : "Edit Testimonial"}</h2>
          {item !== "new" && <VersionHistoryButton table="testimonials" entityType="testimonials" entityId={item?.id} />}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="Patient name">
              <TextField value={form.patient_name} onChange={(e) => setForm((f) => ({ ...f, patient_name: e.target.value }))} dir="ltr" />
            </FieldGroup>
            <FieldGroup label="Country (optional)">
              <TextField value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} dir="ltr" />
            </FieldGroup>
          </div>

          <BilingualField
            label='Role / procedure (e.g. "Rhinoplasty Patient")'
            valueEn={form.role_en}
            valueAr={form.role_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, role_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, role_ar: v }))}
          />

          <BilingualField
            label="Review"
            required
            multiline
            valueEn={form.review_en}
            valueAr={form.review_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, review_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, review_ar: v }))}
          />

          <FieldGroup label="Rating">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))} aria-label={`${n} stars`}>
                  <Star className={cn("h-6 w-6", n <= form.rating ? "fill-amber-400 text-amber-400" : "text-outline-variant")} />
                </button>
              ))}
            </div>
          </FieldGroup>

          <MediaPickerField
            label="Photo (optional)"
            valueMediaId={form.photo_media_id}
            valueUrl={photoAsset ? getPublicMediaUrl(photoAsset.storage_path) : null}
            onChange={(asset: MediaAsset | null) => {
              setPhotoAsset(asset);
              setForm((f) => ({ ...f, photo_media_id: asset?.id ?? null }));
            }}
          />

          <FieldGroup label="Video URL (optional)">
            <TextField value={form.video_url} onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))} dir="ltr" placeholder="https://..." />
          </FieldGroup>

          <FieldGroup label="Show on">
            <div className="flex flex-wrap gap-2">
              {PLACEMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => togglePlacement(opt.value)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                    form.placements.includes(opt.value) ? "border-primary/50 bg-primary/15 text-primary" : "border-outline-variant/30 text-on-surface-variant",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          <ToggleField label="Published (visible on the live site)" checked={form.status === "published"} onChange={(v) => setForm((f) => ({ ...f, status: v ? "published" : "draft" }))} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton type="button" variant="outline" size="sm" loading={saving} onClick={() => handleSubmit(false)}>
            Save Draft
          </AdminButton>
          <AdminButton type="button" size="sm" loading={saving} onClick={() => handleSubmit(true)}>
            Publish
          </AdminButton>
        </div>
      </div>
    </Dialog>
  );
}
