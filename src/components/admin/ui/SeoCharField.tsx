"use client";

import { cn } from "@/lib/utils";
import { Label, TextField, TextAreaField } from "./Field";

function counterClass(len: number, min: number, max: number): string {
  if (len === 0) return "text-on-surface-variant/50";
  if (len < min || len > max) return "text-amber-400";
  return "text-emerald-400";
}

/**
 * Same paired EN/AR layout as BilingualField, but with a live character
 * counter under each side — used for SEO title/description, where staying
 * inside Google's practical display range (title ~50-60, description
 * ~140-160) actually matters, unlike ordinary CMS copy fields.
 */
export function SeoCharField({
  label,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  multiline = false,
  min,
  max,
  placeholder,
}: {
  label: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (v: string) => void;
  onChangeAr: (v: string) => void;
  multiline?: boolean;
  min: number;
  max: number;
  placeholder?: { en?: string; ar?: string };
}) {
  const Field = multiline ? TextAreaField : TextField;
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-on-surface-variant/50">English</span>
          <Field value={valueEn} onChange={(e) => onChangeEn(e.target.value)} placeholder={placeholder?.en} dir="ltr" {...(multiline ? { rows: 3 } : {})} />
          <span className={cn("mt-1 block text-right text-xs", counterClass(valueEn.length, min, max))}>
            {valueEn.length} / {min}–{max}
          </span>
        </div>
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-on-surface-variant/50">Arabic</span>
          <Field value={valueAr} onChange={(e) => onChangeAr(e.target.value)} placeholder={placeholder?.ar} dir="rtl" {...(multiline ? { rows: 3 } : {})} />
          <span className={cn("mt-1 block text-right text-xs", counterClass(valueAr.length, min, max))}>
            {valueAr.length} / {min}–{max}
          </span>
        </div>
      </div>
    </div>
  );
}
