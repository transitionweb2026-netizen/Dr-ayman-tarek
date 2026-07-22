"use client";

import { HomeHero } from "@/components/sections/HomeHero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { TestimonialsPanel } from "@/components/sections/TestimonialsPanel";
import { InsightsFaq } from "@/components/sections/InsightsFaq";
import { VideoSeriesPreview } from "@/components/sections/VideoSeriesPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <HomeHero />
      <StatsStrip />
      <AboutPreview
        title={t("home.about.title")}
        cta={
          <button className="group flex items-center gap-2 text-small text-primary">
            {t("home.about.cta")}
            {/* Keeps its pre-existing "slide right" hover instead of icon-neon's
                own hover-scale (both animate `transform`, so only one can own it) —
                the glow still intensifies on hover via group-hover. */}
            <NeonIcon
              name="arrow_forward"
              neon={false}
              className="text-primary transition-transform duration-300 ease-in-out [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))_drop-shadow(0_0_10px_rgba(168,85,247,.35))] group-hover:translate-x-1 group-hover:[filter:drop-shadow(0_0_12px_rgba(192,38,255,.6))_drop-shadow(0_0_24px_rgba(192,38,255,.45))_drop-shadow(0_0_40px_rgba(192,38,255,.3))] rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </button>
        }
      >
        <p className="text-body-lg text-on-surface-variant">{t("home.about.bio")}</p>
      </AboutPreview>
      <SpecialtiesGrid />
      <TestimonialsPanel />
      <InsightsFaq />
      <VideoSeriesPreview />
      <FinalCta
        heading={t("home.finalCta.heading")}
        subtitle={t("home.finalCta.subtitle")}
        primaryLabel={t("home.finalCta.primaryLabel")}
      />
    </>
  );
}
