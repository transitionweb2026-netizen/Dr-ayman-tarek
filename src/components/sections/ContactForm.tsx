"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

const fieldClass =
  "w-full rounded-xl border border-outline-variant/40 bg-surface-container px-5 py-3.5 text-white outline-none transition-shadow placeholder-on-surface-variant/40 focus:border-primary focus:shadow-glow";

/** Client-side only for now — no backend is wired up yet; submit shows a local confirmation. */
export function ContactForm() {
  const { t, tRaw } = useLanguage();
  const serviceOptions = tRaw<string[]>("contact.form.serviceOptions");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
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
      <h2 className="mb-2 text-section-title text-white">{t("contact.form.title")}</h2>
      <p className="mb-8 text-body text-on-surface-variant">{t("contact.form.subtitle")}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-small text-on-surface-variant">
              {t("contact.form.fullName")}
            </label>
            <input
              id="fullName"
              required
              placeholder={t("contact.form.fullNamePlaceholder")}
              className={fieldClass}
              onInvalid={handleInvalid}
              onInput={clearValidity}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-small text-on-surface-variant">
              {t("contact.form.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder={t("contact.form.phonePlaceholder")}
              dir="ltr"
              className={fieldClass}
              onInvalid={handleInvalid}
              onInput={clearValidity}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-small text-on-surface-variant">
            {t("contact.form.email")}
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder={t("contact.form.emailPlaceholder")}
            dir="ltr"
            className={fieldClass}
            onInvalid={handleInvalid}
            onInput={clearValidity}
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-small text-on-surface-variant">
            {t("contact.form.service")}
          </label>
          <select id="service" className={fieldClass}>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-small text-on-surface-variant">
            {t("contact.form.message")}
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t("contact.form.messagePlaceholder")}
            className={`${fieldClass} resize-none`}
            onInvalid={handleInvalid}
            onInput={clearValidity}
          />
        </div>
        <Button type="submit" className="w-full" icon={<span className="material-symbols-outlined text-xl">send</span>}>
          {t("contact.form.submit")}
        </Button>
        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-small text-primary"
            >
              {t("contact.form.successMessage")}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </GlassCard>
  );
}
