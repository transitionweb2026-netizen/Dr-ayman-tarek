"use client";

import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { AccordionItem } from "@/components/ui/Accordion";

const QUICK_INFO_META = [
  { key: "call", icon: "call" },
  { key: "email", icon: "mail" },
  { key: "visit", icon: "location_on" },
  { key: "hours", icon: "schedule" },
] as const;

export function ContactContent() {
  const { t, tRaw } = useLanguage();
  const faqItems = tRaw<AccordionItem[]>("contact.faq.items");

  return (
    <>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        align="center"
        height="sm"
      />

      <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
        <GlassCard radius="3xl" interactive={false} className="w-full px-gutter py-10 shadow-glow">
          <Stagger className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {QUICK_INFO_META.map((item) => (
              <StaggerChild key={item.key} className="flex flex-col items-center gap-3">
                <IconBadge icon={item.icon} className="h-14 w-14 rounded-2xl" />
                <p dir={item.key === "call" || item.key === "email" ? "ltr" : undefined} className="text-body-lg font-bold text-white">
                  {t(`contact.quickInfo.${item.key}.value`)}
                </p>
                <p className="text-small text-on-surface-variant">{t(`contact.quickInfo.${item.key}.label`)}</p>
              </StaggerChild>
            ))}
          </Stagger>
        </GlassCard>
      </section>

      <section className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-10 px-margin-mobile py-section-gap-sm md:px-margin-desktop lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.06}>
            <GlassCard radius="2xl" interactive={false} className="overflow-hidden">
              <div className="line-grid relative flex aspect-[4/3] items-center justify-center bg-surface-container">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
                <div className="relative flex flex-col items-center">
                  <NeonIcon name="location_on" filled className="animate-pulse-node text-5xl" />
                  <span className="glass mt-2 rounded-full px-4 py-1.5 text-small text-white">{t("contact.map.address")}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="text-small text-on-surface-variant">{t("common.mapPreviewNote")}</p>
                <a href="#" className="flex shrink-0 items-center gap-1 text-small text-primary">
                  <NeonIcon name="open_in_new" className="text-lg" />
                  {t("common.directions")}
                </a>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.12}>
            <GlassCard radius="2xl" interactive={false} className="p-7">
              <h3 className="mb-5 text-card-title text-white">{t("contact.clinicHours.title")}</h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t("contact.clinicHours.weekdays")}</span>
                  <span className="font-bold text-white">{t("contact.clinicHours.weekdaysValue")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t("contact.clinicHours.friday")}</span>
                  <span className="font-bold text-white">{t("contact.clinicHours.fridayValue")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t("contact.clinicHours.critical")}</span>
                  <span className="font-bold text-primary">{t("contact.clinicHours.criticalValue")}</span>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.18}>
            <GlassCard radius="2xl" interactive={false} className="border-error/30 p-7 shadow-[0_0_40px_rgba(255,180,171,0.1)]">
              {/* Intentionally excluded from the neon system: this badge is red/error
                  to signal urgency, matching the card's own error-colored border.
                  Recoloring it neon purple would undercut that "this is urgent"
                  semantic, so it keeps its own color instead. */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-error/40 bg-error/10">
                  <span className="material-symbols-outlined fill-icon text-2xl text-error">emergency</span>
                </span>
                <div>
                  <h3 className="mb-1 text-body-lg font-bold text-white">{t("contact.emergency.title")}</h3>
                  <p className="mb-2 text-small text-on-surface-variant">{t("contact.emergency.description")}</p>
                  <a href="tel:+201099999999" dir="ltr" className="block text-card-title font-bold text-error">
                    {t("contact.emergency.phone")}
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <FaqSection title={t("contact.faq.title")} items={faqItems} />

      <FinalCta heading={t("contact.finalCta.heading")} subtitle={t("contact.finalCta.subtitle")} />
    </>
  );
}
