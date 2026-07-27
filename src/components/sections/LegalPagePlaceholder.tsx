"use client";

import { NeonIcon } from "@/components/ui/NeonIcon";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Minimal on-brand placeholder for legal pages that don't have real copy
 * yet (Privacy Policy, Terms of Service) — a real, working route rather
 * than a "#" link, per the "never leave fake links, show Coming Soon
 * instead" rule. Swap in the actual legal text here once it's written. */
export function LegalPagePlaceholder({ title }: { title: string }) {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-margin-mobile pt-32 pb-20 text-center">
      <GlowOrb className="z-[1] -left-40 -top-32 h-[480px] w-[480px]" />
      <GlowOrb className="z-[1] -right-24 bottom-0 h-[400px] w-[400px]" color="tertiary" />
      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
      <div className="relative z-10 max-w-md">
        <div className="icon-badge-neon mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
          <NeonIcon name="description" className="text-4xl" />
        </div>
        <h1 className="mb-3 text-hero text-white">{title}</h1>
        <p className="text-body-lg text-on-surface-variant">{t("common.comingSoon")}</p>
      </div>
    </section>
  );
}
