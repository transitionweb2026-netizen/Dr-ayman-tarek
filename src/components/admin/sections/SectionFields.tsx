"use client";

import { useState } from "react";
import { BilingualField, TextField } from "@/components/admin/ui/Field";
import { Repeater } from "@/components/admin/ui/Repeater";
import { IconPicker } from "@/components/admin/ui/IconPicker";

export interface TextFieldSpec {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
}

/** Renders a flat list of bilingual text fields against a section's en/ar
 * content objects — covers the majority of sections (hero, finalCta, about,
 * ...) which are just a handful of text fields, no repeaters. */
export function SectionTextFields({
  fields,
  en,
  ar,
  setEn,
  setAr,
}: {
  fields: TextFieldSpec[];
  en: Record<string, unknown>;
  ar: Record<string, unknown>;
  setEn: (patch: Record<string, unknown>) => void;
  setAr: (patch: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <BilingualField
          key={f.key}
          label={f.label}
          hint={f.hint}
          multiline={f.multiline}
          valueEn={(en[f.key] as string) || ""}
          valueAr={(ar[f.key] as string) || ""}
          onChangeEn={(v) => setEn({ [f.key]: v })}
          onChangeAr={(v) => setAr({ [f.key]: v })}
        />
      ))}
    </div>
  );
}

export interface RepeaterItemFieldSpec {
  key: string;
  label: string;
  /** "text" (default): bilingual field. "icon": Material Symbol picker,
   * same value stored in both languages. "shared": plain single text input
   * (e.g. a stat's numeric value), same value stored in both languages. */
  kind?: "text" | "icon" | "shared";
  multiline?: boolean;
}

interface MergedItem {
  rowKey: string;
  en: Record<string, unknown>;
  ar: Record<string, unknown>;
}
let seq = 0;
const nextKey = () => `item-${Date.now()}-${seq++}`;

/** Repeater over an in-page item list (certificates, achievements,
 * milestones, ...). en/ar arrays are stored as parallel, index-aligned
 * arrays in content.en.items / content.ar.items — this merges them into one
 * editing surface and splits back into the two arrays on every change. */
export function SectionRepeaterField({
  label,
  itemsEn,
  itemsAr,
  onChange,
  fields,
  addLabel = "Add item",
}: {
  label: string;
  itemsEn: Record<string, unknown>[];
  itemsAr: Record<string, unknown>[];
  onChange: (itemsEn: Record<string, unknown>[], itemsAr: Record<string, unknown>[]) => void;
  fields: RepeaterItemFieldSpec[];
  addLabel?: string;
}) {
  const [merged, setMerged] = useState<MergedItem[]>(() =>
    itemsEn.length > 0
      ? itemsEn.map((enItem, i) => ({ rowKey: nextKey(), en: enItem, ar: itemsAr[i] || {} }))
      : [],
  );

  function updateMerged(next: MergedItem[]) {
    setMerged(next);
    onChange(next.map((m) => m.en), next.map((m) => m.ar));
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-on-surface-variant">{label}</span>
      <Repeater
        items={merged}
        onChange={updateMerged}
        keyOf={(m) => m.rowKey}
        addLabel={addLabel}
        newItem={() => ({ rowKey: nextKey(), en: {} as Record<string, unknown>, ar: {} as Record<string, unknown> })}
        renderItem={(item, _i, patchRow) => (
          <div className="space-y-3">
            {fields.map((f) => {
              if (f.kind === "icon") {
                return (
                  <div key={f.key}>
                    <span className="mb-1.5 block text-sm font-medium text-on-surface-variant">{f.label}</span>
                    <IconPicker
                      value={(item.en[f.key] as string) || ""}
                      onChange={(v) => patchRow({ en: { ...item.en, [f.key]: v }, ar: { ...item.ar, [f.key]: v } })}
                    />
                  </div>
                );
              }
              if (f.kind === "shared") {
                return (
                  <div key={f.key}>
                    <span className="mb-1.5 block text-sm font-medium text-on-surface-variant">{f.label}</span>
                    <TextField
                      value={(item.en[f.key] as string) || ""}
                      onChange={(e) => patchRow({ en: { ...item.en, [f.key]: e.target.value }, ar: { ...item.ar, [f.key]: e.target.value } })}
                      dir="ltr"
                    />
                  </div>
                );
              }
              return (
                <BilingualField
                  key={f.key}
                  label={f.label}
                  multiline={f.multiline}
                  valueEn={(item.en[f.key] as string) || ""}
                  valueAr={(item.ar[f.key] as string) || ""}
                  onChangeEn={(v) => patchRow({ en: { ...item.en, [f.key]: v } })}
                  onChangeAr={(v) => patchRow({ ar: { ...item.ar, [f.key]: v } })}
                />
              );
            })}
          </div>
        )}
      />
    </div>
  );
}

/** Simple bilingual string-list repeater (Services' tech-tag list). */
export function SectionStringListField({
  label,
  valuesEn,
  valuesAr,
  onChange,
}: {
  label: string;
  valuesEn: string[];
  valuesAr: string[];
  onChange: (en: string[], ar: string[]) => void;
}) {
  const rows = valuesEn.map((v, i) => ({ en: v, ar: valuesAr[i] || "" }));

  function setRow(i: number, patch: { en?: string; ar?: string }) {
    const next = rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
    onChange(next.map((r) => r.en), next.map((r) => r.ar));
  }
  function addRow() {
    onChange([...valuesEn, ""], [...valuesAr, ""]);
  }
  function removeRow(i: number) {
    onChange(valuesEn.filter((_, idx) => idx !== i), valuesAr.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-on-surface-variant">{label}</span>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <TextField value={row.en} onChange={(e) => setRow(i, { en: e.target.value })} dir="ltr" placeholder="English" />
            <TextField value={row.ar} onChange={(e) => setRow(i, { ar: e.target.value })} dir="rtl" placeholder="عربي" />
            <button type="button" onClick={() => removeRow(i)} className="rounded-lg px-3 text-sm text-on-surface-variant hover:bg-error/10 hover:text-error">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addRow} className="mt-2 rounded-lg border border-outline-variant/30 px-3 py-1.5 text-sm text-on-surface-variant hover:text-white">
        + Add
      </button>
    </div>
  );
}
