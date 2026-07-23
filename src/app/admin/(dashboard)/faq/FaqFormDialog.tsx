"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { BilingualField, FieldGroup, SelectField, ToggleField } from "@/components/admin/ui/Field";
import { faqHooks, type FaqItem } from "@/hooks/useFaqItems";
import { VersionHistoryButton } from "@/components/admin/ui/VersionHistory";

const emptyForm = {
  question_en: "",
  question_ar: "",
  answer_en: "",
  answer_ar: "",
  category: "general" as "general" | "contact",
  status: "draft" as "draft" | "published",
};

export function FaqFormDialog({ item, nextOrder, onClose }: { item: FaqItem | null | "new"; nextOrder: number; onClose: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const create = faqHooks.useCreate();
  const update = faqHooks.useUpdate();
  const saving = create.isPending || update.isPending;

  useEffect(() => {
    if (item && item !== "new") {
      setForm({
        question_en: item.question_en,
        question_ar: item.question_ar,
        answer_en: item.answer_en,
        answer_ar: item.answer_ar,
        category: item.category,
        status: item.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [item]);

  async function handleSubmit(publish: boolean) {
    const values = { ...form, status: publish ? ("published" as const) : ("draft" as const) };
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
    <Dialog open={open} onClose={onClose} className="max-w-xl">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{item === "new" ? "Add FAQ" : "Edit FAQ"}</h2>
          {item !== "new" && <VersionHistoryButton table="faq_items" entityType="faq_items" entityId={item?.id} />}
        </div>
        <div className="space-y-4">
          <BilingualField
            label="Question"
            required
            valueEn={form.question_en}
            valueAr={form.question_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, question_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, question_ar: v }))}
          />
          <BilingualField
            label="Answer"
            required
            multiline
            valueEn={form.answer_en}
            valueAr={form.answer_ar}
            onChangeEn={(v) => setForm((f) => ({ ...f, answer_en: v }))}
            onChangeAr={(v) => setForm((f) => ({ ...f, answer_ar: v }))}
          />
          <FieldGroup label="Shown on">
            <SelectField
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v as "general" | "contact" }))}
              options={[
                { value: "general", label: "Home — Common Questions" },
                { value: "contact", label: "Contact — Contact Questions" },
              ]}
            />
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
