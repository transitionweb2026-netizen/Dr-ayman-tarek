"use client";

import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";

const WHY_CHOOSE_META = [
  { key: "personalized", icon: "tune", image: "/illustrations/why-choose/personalized-treatment.svg" },
  { key: "experienced", icon: "workspace_premium", image: "/illustrations/why-choose/experienced-surgeon.svg" },
  { key: "technology", icon: "precision_manufacturing", image: "/illustrations/why-choose/advanced-technology.svg" },
  { key: "international", icon: "public", image: "/illustrations/why-choose/international-standards.svg" },
  { key: "facilities", icon: "domain", image: "/illustrations/why-choose/modern-facilities.svg" },
  { key: "recovery", icon: "bolt", image: "/illustrations/why-choose/fast-recovery.svg" },
  { key: "patientCentered", icon: "volunteer_activism", image: "/illustrations/why-choose/patient-centered-care.svg" },
  { key: "safety", icon: "shield", image: "/illustrations/why-choose/safety-first.svg" },
];

export function ServicesContent() {
  const { t } = useLanguage();

  const whyChoose: Feature[] = WHY_CHOOSE_META.map((item) => ({
    icon: item.icon,
    image: item.image,
    title: t(`services.whyChoose.items.${item.key}.title`),
    desc: t(`services.whyChoose.items.${item.key}.desc`),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        ctaLabel={t("services.hero.cta")}
      />
      <ServicesGrid />
      <FeatureGrid
        eyebrow={t("services.whyChoose.eyebrow")}
        title={t("services.whyChoose.title")}
        subtitle={t("services.whyChoose.subtitle")}
        features={whyChoose}
      />
      <TechShowcase />
      <FinalCta heading={t("services.finalCta.heading")} subtitle={t("services.finalCta.subtitle")} />
    </>
  );
}
