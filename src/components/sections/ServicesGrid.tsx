"use client";

import { ProcedureCardGrid } from "@/components/sections/ProcedureCardGrid";
import { getServices } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ServicesGrid() {
  const { language, t } = useLanguage();

  return (
    <ProcedureCardGrid
      eyebrow={t("services.grid.eyebrow")}
      title={t("services.grid.title")}
      subtitle={t("services.grid.subtitle")}
      items={getServices(language)}
      sectionId="services"
      topPadding
    />
  );
}
