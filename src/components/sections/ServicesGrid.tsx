"use client";

import { ProcedureCardGrid, type ProcedureCardItem } from "@/components/sections/ProcedureCardGrid";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { BilingualService } from "@/server/repositories/content";

interface ServicesGridProps {
  services: BilingualService[];
  eyebrowOverride?: string;
  titleOverride?: string;
  subtitleOverride?: string;
}

export function ServicesGrid({ services, eyebrowOverride, titleOverride, subtitleOverride }: ServicesGridProps) {
  const { language, t } = useLanguage();

  const items: ProcedureCardItem[] = services.map((s) => {
    const copy = language === "ar" ? s.ar : s.en;
    return {
      id: s.slug,
      title: copy.title,
      shortDescription: copy.shortDescription,
      description: copy.description,
      image: s.image,
      recovery: copy.recovery || "",
      duration: copy.duration || "",
    };
  });

  return (
    <ProcedureCardGrid
      eyebrow={eyebrowOverride ?? t("services.grid.eyebrow")}
      title={titleOverride ?? t("services.grid.title")}
      subtitle={subtitleOverride ?? t("services.grid.subtitle")}
      items={items}
      sectionId="services"
      topPadding
    />
  );
}
