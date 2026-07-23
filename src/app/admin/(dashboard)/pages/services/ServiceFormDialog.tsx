"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { MediaPickerField } from "@/components/admin/ui/MediaPicker";
import { IconPicker } from "@/components/admin/ui/IconPicker";
import { Repeater } from "@/components/admin/ui/Repeater";
import { createClient } from "@/lib/supabase/client";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";
import { serviceHooks, useServiceChildren, useSaveServiceChildren, type ServiceRow } from "@/hooks/useServices";
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

interface RepeaterRow {
  key: string;
  text_en: string;
  text_ar: string;
}

let seq = 0;
const nextKey = () => `new-${Date.now()}-${seq++}`;

const emptyForm = {
  slug: "",
  title_en: "",
  title_ar: "",
  short_description_en: "",
  short_description_ar: "",
  full_description_en: "",
  full_description_ar: "",
  image_media_id: null as string | null,
  icon: "",
  recovery_en: "",
  recovery_ar: "",
  duration_en: "",
  duration_ar: "",
  seo_title_en: "",
  seo_title_ar: "",
  seo_description_en: "",
  seo_description_ar: "",
  status: "draft" as "draft" | "published",
};

export function ServiceFormDialog({ item, nextOrder, onClose }: { item: ServiceRow | null | "new"; nextOrder: number; onClose: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [image, setImage] = useState<MediaAsset | null>(null);
  const [benefits, setBenefits] = useState<RepeaterRow[]>([]);
  const [steps, setSteps] = useState<RepeaterRow[]>([]);

  const create = serviceHooks.useCreate();
  const update = serviceHooks.useUpdate();
  const saveChildren = useSaveServiceChildren();
  const saving = create.isPending || update.isPending || saveChildren.isPending;

  const editingId = item && item !== "new" ? item.id : undefined;
  const { data: existingImage } = useMediaAssetById(item && item !== "new" ? item.image_media_id : null);
  const { data: children } = useServiceChildren(editingId);

  useEffect(() => {
    if (existingImage) setImage(existingImage);
  }, [existingImage]);

  useEffect(() => {
    if (children) {
      setBenefits(children.benefits.map((b) => ({ key: b.id, text_en: b.text_en, text_ar: b.text_ar })));
      setSteps(children.steps.map((s) => ({ key: s.id, text_en: s.text_en, text_ar: s.text_ar })));
    }
  }, [children]);

  useEffect(() => {
    if (item && item !== "new") {
      setForm({
        slug: item.slug,
        title_en: item.title_en,
        title_ar: item.title_ar,
        short_description_en: item.short_description_en,
        short_description_ar: item.short_description_ar,
        full_description_en: item.full_description_en,
        full_description_ar: item.full_description_ar,
        image_media_id: item.image_media_id,
        icon: item.icon || "",
        recovery_en: item.recovery_en || "",
        recovery_ar: item.recovery_ar || "",
        duration_en: item.duration_en || "",
        duration_ar: item.duration_ar || "",
        seo_title_en: item.seo_title_en || "",
        seo_title_ar: item.seo_title_ar || "",
        seo_description_en: item.seo_description_en || "",
        seo_description_ar: item.seo_description_ar || "",
        status: item.status,
      });
      setSlugTouched(true);
      setImage(null);
    } else {
      setForm(emptyForm);
      setSlugTouched(false);
      setImage(null);
      setBenefits([]);
      setSteps([]);
    }
  }, [item]);

  async function handleSubmit(publish: boolean) {
    if (!form.title_en || !form.title_ar || !form.slug) {
      toast.error("Title (both languages) and slug are required.");
      return;
    }
    const values = {
      slug: form.slug,
      title_en: form.title_en,
      title_ar: form.title_ar,
      short_description_en: form.short_description_en,
      short_description_ar: form.short_description_ar,
      full_description_en: form.full_description_en,
      full_description_ar: form.full_description_ar,
      image_media_id: form.image_media_id,
      icon: form.icon || null,
      recovery_en: form.recovery_en || null,
      recovery_ar: form.recovery_ar || null,
      duration_en: form.duration_en || null,
      duration_ar: form.duration_ar || null,
      seo_title_en: form.seo_title_en || null,
      seo_title_ar: form.seo_title_ar || null,
      seo_description_en: form.seo_description_en || null,
      seo_description_ar: form.seo_description_ar || null,
      status: publish ? ("published" as const) : ("draft" as const),
    };
    try {
      let serviceId: string;
      if (item && item !== "new") {
        serviceId = item.id;
        await update.mutateAsync({ id: item.id, values });
      } else {
        const created = await create.mutateAsync({ ...values, display_order: nextOrder });
        serviceId = created.id;
      }
      await saveChildren.mutateAsync({
        serviceId,
        benefits: benefits.map((b) => ({ text_en: b.text_en, text_ar: b.text_ar })),
        steps: steps.map((s) => ({ text_en: s.text_en, text_ar: s.text_ar })),
      });
      toast.success(publish ? "Published" : "Saved as draft");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  const open = item !== null;

  return (
    <Dialog open={open} onClose={onClose} className="max-w-3xl">
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{item === "new" ? "Add Service" : "Edit Service"}</h2>
          {item !== "new" && <VersionHistoryButton table="services" entityType="services" entityId={item?.id} />}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BilingualField
              label="Title"
              required
              valueEn={form.title_en}
              valueAr={form.title_ar}
              onChangeEn={(v) => {
                setForm((f) => ({ ...f, title_en: v, slug: slugTouched ? f.slug : slugify(v) }));
              }}
              onChangeAr={(v) => setForm((f) => ({ ...f, title_ar: v }))}
            />
          </div>

          <FieldGroup label="Slug" hint="Used in the service's URL">
            <TextField
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
              }}
              dir="ltr"
            />
          </FieldGroup>

          <BilingualField
            label="Short description"
            hint="Shown on the service card"
            multiline
            valueEn={form.short_description_en}
            valueAr={form.short_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, short_description_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, short_description_ar: v }))}
          />

          <BilingualField
            label="Full description"
            hint="Shown on the service detail view"
            multiline
            valueEn={form.full_description_en}
            valueAr={form.full_description_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, full_description_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, full_description_ar: v }))}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MediaPickerField
              label="Image"
              valueMediaId={form.image_media_id}
              valueUrl={image ? getPublicMediaUrl(image.storage_path) : null}
              onChange={(asset) => {
                setImage(asset);
                setForm((f) => ({ ...f, image_media_id: asset?.id ?? null }));
              }}
            />
            <FieldGroup label="Icon">
              <IconPicker value={form.icon} onChange={(v) => setForm((f) => ({ ...f, icon: v }))} />
            </FieldGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BilingualField
              label="Recovery time"
              placeholder={{ en: "e.g. 2 – 4 weeks" }}
              valueEn={form.recovery_en}
              valueAr={form.recovery_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, recovery_en: v }))}
              onChangeAr={(v) => setForm((f) => ({ ...f, recovery_ar: v }))}
            />
            <BilingualField
              label="Procedure duration"
              placeholder={{ en: "e.g. 2 – 3 hours" }}
              valueEn={form.duration_en}
              valueAr={form.duration_ar}
              onChangeEn={(v) => setForm((f) => ({ ...f, duration_en: v }))}
              onChangeAr={(v) => setForm((f) => ({ ...f, duration_ar: v }))}
            />
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-on-surface-variant">Benefits</span>
            <Repeater
              items={benefits}
              onChange={setBenefits}
              keyOf={(b) => b.key}
              newItem={() => ({ key: nextKey(), text_en: "", text_ar: "" })}
              addLabel="Add benefit"
              emptyLabel="No benefits listed yet."
              renderItem={(b, _i, update) => (
                <BilingualField label="" valueEn={b.text_en} valueAr={b.text_ar} onChangeEn={(v) => update({ text_en: v })} onChangeAr={(v) => update({ text_ar: v })} />
              )}
            />
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-on-surface-variant">Process steps</span>
            <Repeater
              items={steps}
              onChange={setSteps}
              keyOf={(s) => s.key}
              newItem={() => ({ key: nextKey(), text_en: "", text_ar: "" })}
              addLabel="Add step"
              emptyLabel="No process steps listed yet."
              renderItem={(s, _i, update) => (
                <BilingualField label="" valueEn={s.text_en} valueAr={s.text_ar} onChangeEn={(v) => update({ text_en: v })} onChangeAr={(v) => update({ text_ar: v })} />
              )}
            />
          </div>

          <div className="rounded-xl border border-outline-variant/20 p-4">
            <p className="mb-4 text-sm font-semibold text-white">SEO</p>
            <div className="space-y-4">
              <BilingualField
                label="SEO title"
                valueEn={form.seo_title_en}
                valueAr={form.seo_title_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, seo_title_en: v }))}
                onChangeAr={(v) => setForm((f) => ({ ...f, seo_title_ar: v }))}
              />
              <BilingualField
                label="SEO description"
                multiline
                valueEn={form.seo_description_en}
                valueAr={form.seo_description_ar}
                onChangeEn={(v) => setForm((f) => ({ ...f, seo_description_en: v }))}
                onChangeAr={(v) => setForm((f) => ({ ...f, seo_description_ar: v }))}
              />
            </div>
          </div>

          <ToggleField label="Published (visible on the live site)" checked={form.status === "published"} onChange={(v) => setForm((f) => ({ ...f, status: v ? "published" : "draft" }))} />
        </div>

        <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 flex justify-end gap-3 border-t border-outline-variant/20 bg-surface-container-lowest/95 px-6 py-4 backdrop-blur">
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
