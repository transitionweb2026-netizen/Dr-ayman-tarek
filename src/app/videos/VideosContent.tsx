"use client";

import { PageHero } from "@/components/sections/PageHero";
import { VideoLibrary } from "@/components/sections/VideoLibrary";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VideosContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("videos.hero.eyebrow")}
        title={t("videos.hero.title")}
        subtitle={t("videos.hero.subtitle")}
        ctaLabel={t("videos.hero.cta")}
      />
      <VideoLibrary />
      <FinalCta heading={t("videos.finalCta.heading")} subtitle={t("videos.finalCta.subtitle")} />
    </>
  );
}
