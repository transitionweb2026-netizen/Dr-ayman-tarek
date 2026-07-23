"use client";

import { useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-sm text-white outline-none transition-shadow placeholder-on-surface-variant/40 focus:border-primary focus:shadow-glow disabled:opacity-50";

export function Label({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <span className="text-sm font-medium text-on-surface-variant">{children}</span>
      {hint && <span className="text-xs text-on-surface-variant/60">{hint}</span>}
    </div>
  );
}

export function TextField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function TextAreaField({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "resize-none", className)} {...props} />;
}

export function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <Label hint={hint}>{label}</Label>
      {children}
    </div>
  );
}

/**
 * Paired EN/AR input — the single control every bilingual text field in the
 * CMS is built from, so an editor always sees "this is one logical field,
 * shown in two languages" rather than two unrelated inputs.
 */
export function BilingualField({
  label,
  hint,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  multiline = false,
  placeholder,
  required,
}: {
  label: string;
  hint?: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (v: string) => void;
  onChangeAr: (v: string) => void;
  multiline?: boolean;
  placeholder?: { en?: string; ar?: string };
  required?: boolean;
}) {
  const Field = multiline ? TextAreaField : TextField;
  return (
    <div>
      <Label hint={hint}>
        {label}
        {required && <span className="text-error"> *</span>}
      </Label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-on-surface-variant/50">English</span>
          <Field
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholder?.en}
            dir="ltr"
            {...(multiline ? { rows: 4 } : {})}
          />
        </div>
        <div>
          <span className="mb-1 block text-xs uppercase tracking-wide text-on-surface-variant/50">Arabic</span>
          <Field
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            placeholder={placeholder?.ar}
            dir="rtl"
            {...(multiline ? { rows: 4 } : {})}
          />
        </div>
      </div>
    </div>
  );
}

export function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3 text-left"
    >
      <span className="text-sm text-white">{label}</span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function SelectField({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(fieldClass, focused && "border-primary", className)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
