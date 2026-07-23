"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import { submitContactMessage } from "@/server/actions/contact";

const fieldClass =
  "w-full rounded-xl border border-outline-variant/40 bg-surface-container px-5 py-3.5 text-white outline-none transition-shadow placeholder-on-surface-variant/40 focus:border-primary focus:shadow-glow";

export interface ContactFormContent {
  title: string; subtitle: string;
  fullName: string; fullNamePlaceholder: string;
  phone: string; phonePlaceholder: string;
  email: string; emailPlaceholder: string;
  service: string;
  message: string; messagePlaceholder: string;
  submit: string; successMessage: string;
}

interface ContactFormProps {
  content?: Partial<ContactFormContent>;
  serviceOptions?: string[];
}

export function ContactForm({ content = {}, serviceOptions: serviceOptionsOverride }: ContactFormProps) {
  const { t, tRaw } = useLanguage();
  const serviceOptions = serviceOptionsOverride ?? tRaw<string[]>("contact.form.serviceOptions");
  const c = (key: keyof ContactFormContent) => content[key] ?? t(`contact.form.${key}`);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setError(null);
    const result = await submitContactMessage({
      fullName: String(data.get("fullName") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      setError(result.error || "Something went wrong.");
    }
  }

  // Browsers show native "required"/"invalid" validation messages in the
  // OS/browser's own locale, not the page's — this keeps them in the
  // active site language instead. Cleared on input so normal re-validation
  // still applies once the user starts fixing the field.
  function handleInvalid(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const el = event.currentTarget;
    el.setCustomValidity(el.validity.typeMismatch ? t("contact.form.invalidEmailError") : t("contact.form.requiredError"));
  }
  function clearValidity(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.currentTarget.setCustomValidity("");
  }

  return (
    <GlassCard radius="2xl" interactive={false} className="p-7 md:p-10">
      <h2 className="mb-2 text-section-title text-white">{c("title")}</h2>
      <p className="mb-8 text-body text-on-surface-variant">{c("subtitle")}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-small text-on-surface-variant">
              {c("fullName")}
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder={c("fullNamePlaceholder")}
              className={fieldClass}
              onInvalid={handleInvalid}
              onInput={clearValidity}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-small text-on-surface-variant">
              {c("phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder={c("phonePlaceholder")}
              dir="ltr"
              className={fieldClass}
              onInvalid={handleInvalid}
              onInput={clearValidity}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-small text-on-surface-variant">
            {c("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={c("emailPlaceholder")}
            dir="ltr"
            className={fieldClass}
            onInvalid={handleInvalid}
            onInput={clearValidity}
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-small text-on-surface-variant">
            {c("service")}
          </label>
          <select id="service" name="service" className={fieldClass}>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-small text-on-surface-variant">
            {c("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={c("messagePlaceholder")}
            className={`${fieldClass} resize-none`}
            onInvalid={handleInvalid}
            onInput={clearValidity}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
          icon={<span className="material-symbols-outlined text-xl">send</span>}
        >
          {submitting ? "..." : c("submit")}
        </Button>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-small text-error"
            >
              {error}
            </motion.p>
          )}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-small text-primary"
            >
              {c("successMessage")}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </GlassCard>
  );
}
