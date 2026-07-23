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
import { pickSection } from "@/lib/pickLang";
import type { SiteSettingsData } from "@/server/repositories/settings";
import type { BilingualFaqItem, BilingualService } from "@/server/repositories/content";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;
interface HeroContent { eyebrow: string; title: string; subtitle: string }
interface QuickInfoContent { callLabel: string; emailLabel: string; visitLabel: string; hoursLabel: string }
interface ClinicHoursContent { title: string }
interface EmergencyContent { title: string; description: string }
interface FaqHeadingContent { title: string }
interface FinalCtaContent { heading: string; subtitle: string }

export function ContactContent({
  sections,
  settings,
  faqItems: bilingualFaqItems,
  services,
  generalConsultationLabel,
  otherLabel,
}: {
  sections: Sections;
  settings: SiteSettingsData;
  faqItems: BilingualFaqItem[];
  services: BilingualService[];
  generalConsultationLabel: { en: string; ar: string };
  otherLabel: { en: string; ar: string };
}) {
  const { t, language } = useLanguage();

  const serviceOptions = [
    generalConsultationLabel[language],
    ...services.map((s) => (language === "ar" ? s.ar.title : s.en.title)),
    otherLabel[language],
  ];

  const hero = pickSection<HeroContent>(sections, "hero", language);
  const quickInfo = pickSection<QuickInfoContent>(sections, "quickInfo", language);
  const clinicHours = pickSection<ClinicHoursContent>(sections, "clinicHours", language);
  const emergency = pickSection<EmergencyContent>(sections, "emergency", language);
  const faqHeading = pickSection<FaqHeadingContent>(sections, "faq", language);
  const finalCta = pickSection<FinalCtaContent>(sections, "finalCta", language);

  const address = language === "ar" ? settings.addressAr : settings.addressEn;
  const mapAddress = (language === "ar" ? settings.googleMapsAddressAr : settings.googleMapsAddressEn) || address;
  const hours = settings.businessHours.map((h) => ({
    label: language === "ar" ? h.label_ar : h.label_en,
    value: language === "ar" ? h.value_ar : h.value_en,
  }));

  const quickInfoItems = [
    { key: "call", icon: "call", value: settings.phone, label: quickInfo.callLabel, ltr: true },
    { key: "email", icon: "mail", value: settings.email, label: quickInfo.emailLabel, ltr: true },
    { key: "visit", icon: "location_on", value: address, label: quickInfo.visitLabel, ltr: false },
    { key: "hours", icon: "schedule", value: hours[0]?.value || "", label: quickInfo.hoursLabel, ltr: false },
  ];

  const faqItems = bilingualFaqItems.map((item) => {
    const copy = language === "ar" ? item.ar : item.en;
    return { question: copy.question, answer: copy.answer };
  });

  const formContent = pickSection<Record<string, string>>(sections, "form", language);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow || ""} title={hero.title || ""} subtitle={hero.subtitle || ""} align="center" height="sm" />

      <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap-sm md:px-margin-desktop">
        <GlassCard radius="3xl" interactive={false} className="w-full px-gutter py-10 shadow-glow">
          <Stagger className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {quickInfoItems.map((item) => (
              <StaggerChild key={item.key} className="flex flex-col items-center gap-3">
                <IconBadge icon={item.icon} className="h-14 w-14 rounded-2xl" />
                <p dir={item.ltr ? "ltr" : undefined} className="text-body-lg font-bold text-white">
                  {item.value}
                </p>
                <p className="text-small text-on-surface-variant">{item.label}</p>
              </StaggerChild>
            ))}
          </Stagger>
        </GlassCard>
      </section>

      <section className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-10 px-margin-mobile py-section-gap-sm md:px-margin-desktop lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ContactForm content={formContent} serviceOptions={serviceOptions} />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.06}>
            <GlassCard radius="2xl" interactive={false} className="overflow-hidden">
              <div className="line-grid relative flex aspect-[4/3] items-center justify-center bg-surface-container">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
                <div className="relative flex flex-col items-center">
                  <NeonIcon name="location_on" filled className="animate-pulse-node text-5xl" />
                  <span className="glass mt-2 rounded-full px-4 py-1.5 text-small text-white">{mapAddress}</span>
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
              <h3 className="mb-5 text-card-title text-white">{clinicHours.title || ""}</h3>
              <div className="space-y-3 text-body">
                {hours.map((h, i) => (
                  <div key={h.label} className="flex justify-between">
                    <span className="text-on-surface-variant">{h.label}</span>
                    <span className={i === hours.length - 1 ? "font-bold text-primary" : "font-bold text-white"}>{h.value}</span>
                  </div>
                ))}
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
                  <h3 className="mb-1 text-body-lg font-bold text-white">{emergency.title || ""}</h3>
                  <p className="mb-2 text-small text-on-surface-variant">{emergency.description || ""}</p>
                  <a href={`tel:${settings.emergencyPhone.replace(/[^\d+]/g, "")}`} dir="ltr" className="block text-card-title font-bold text-error">
                    {settings.emergencyPhone}
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <FaqSection title={faqHeading.title || ""} items={faqItems} />

      <FinalCta heading={finalCta.heading || ""} subtitle={finalCta.subtitle || ""} />
    </>
  );
}
