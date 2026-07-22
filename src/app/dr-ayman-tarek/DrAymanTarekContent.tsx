"use client";

import { PageHero } from "@/components/sections/PageHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { ProcedureCardGrid } from "@/components/sections/ProcedureCardGrid";
import { StatsStrip, type Stat } from "@/components/sections/StatsStrip";
import { TestimonialsGrid, type Testimonial } from "@/components/sections/TestimonialsGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { getSpecialties } from "@/data/specialties";
import { useLanguage } from "@/i18n/LanguageProvider";

const CERTIFICATE_META = [
  { key: "europeanBoard", icon: "workspace_premium", image: "/illustrations/dr-ayman-tarek/cert-european-board.svg" },
  { key: "isapsFellowship", icon: "verified", image: "/illustrations/dr-ayman-tarek/cert-isaps-fellowship.svg" },
  { key: "burnsDiploma", icon: "local_hospital", image: "/illustrations/dr-ayman-tarek/cert-burns-diploma.svg" },
  { key: "injectables", icon: "colorize", image: "/illustrations/dr-ayman-tarek/cert-injectables.svg" },
  { key: "egyptianSociety", icon: "groups", image: "/illustrations/dr-ayman-tarek/cert-egyptian-society.svg" },
  { key: "bodyContouringAward", icon: "military_tech", image: "/illustrations/dr-ayman-tarek/cert-body-contouring-award.svg" },
];

const ACHIEVEMENT_META = [
  { key: "experience", icon: "timeline", image: "/illustrations/dr-ayman-tarek/achievement-experience.svg" },
  { key: "speaker", icon: "podium", image: "/illustrations/dr-ayman-tarek/achievement-speaker.svg" },
  { key: "research", icon: "science", image: "/illustrations/dr-ayman-tarek/achievement-research.svg" },
  { key: "international", icon: "public", image: "/illustrations/why-choose/international-standards.svg" },
];

const STATS_META = [
  { icon: "workspace_premium", value: 4000, suffix: "+", key: "successfulSurgeries" },
  { icon: "military_tech", value: 15, suffix: "+", key: "yearsOfExperience" },
  { icon: "favorite", value: 6000, suffix: "+", key: "happyPatients" },
  { icon: "groups", value: 30, suffix: "+", key: "internationalConferences" },
  { icon: "science", value: 12, suffix: "+", key: "scientificPublications" },
];

const DOCTOR_INTRO_VIDEO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9";

export function DrAymanTarekContent() {
  const { language, t, tRaw } = useLanguage();

  const certificates: Feature[] = CERTIFICATE_META.map((item) => ({
    icon: item.icon,
    image: item.image,
    title: t(`drAymanTarek.certificates.items.${item.key}.title`),
    desc: t(`drAymanTarek.certificates.items.${item.key}.desc`),
  }));

  const achievements: Feature[] = ACHIEVEMENT_META.map((item) => ({
    icon: item.icon,
    image: item.image,
    title: t(`drAymanTarek.achievements.items.${item.key}.title`),
    desc: t(`drAymanTarek.achievements.items.${item.key}.desc`),
  }));

  const stats: Stat[] = STATS_META.map((item) => ({
    icon: item.icon,
    value: item.value,
    suffix: item.suffix,
    label: t(`drAymanTarek.stats.${item.key}`),
  }));

  const testimonials = tRaw<Testimonial[]>("drAymanTarek.testimonials.items");

  return (
    <>
      <PageHero
        eyebrow={t("drAymanTarek.hero.eyebrow")}
        title={
          <>
            {t("drAymanTarek.hero.titleLine1")}
            <br />
            {t("drAymanTarek.hero.titleLine2")}
          </>
        }
        subtitle={t("drAymanTarek.hero.subtitle")}
        ctaLabel={t("drAymanTarek.hero.cta")}
      />

      <AboutPreview
        title={t("drAymanTarek.about.title")}
        videoCaption={t("drAymanTarek.about.videoCaption")}
        videoImage={DOCTOR_INTRO_VIDEO}
      >
        <p className="text-body-lg text-on-surface-variant">{t("drAymanTarek.about.bio1")}</p>
        <p className="text-body text-on-surface-variant">{t("drAymanTarek.about.bio2")}</p>
      </AboutPreview>

      <FeatureGrid
        title={t("drAymanTarek.certificates.title")}
        subtitle={t("drAymanTarek.certificates.subtitle")}
        features={certificates}
        columns={3}
      />

      <ProcedureCardGrid
        title={t("drAymanTarek.specialties.title")}
        subtitle={t("drAymanTarek.specialties.subtitle")}
        items={getSpecialties(language)}
      />

      <FeatureGrid
        title={t("drAymanTarek.achievements.title")}
        subtitle={t("drAymanTarek.achievements.subtitle")}
        features={achievements}
      />

      <StatsStrip stats={stats} />

      <TestimonialsGrid title={t("drAymanTarek.testimonials.title")} testimonials={testimonials} />

      {/* Bespoke 3-column final CTA: icon / headline+CTAs / clinic info */}
      <section className="mx-auto mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <GlassCard
          radius="3xl"
          interactive={false}
          className="grid grid-cols-1 items-center gap-10 overflow-hidden border-primary/15 p-margin-mobile text-center shadow-glow-lg md:grid-cols-2 md:p-10 lg:grid-cols-[1fr_1.4fr_1fr] lg:p-section-gap"
        >
          {/* Icon + headline/CTAs share one grid cell at tablet (a real
              two-column layout instead of forcing the desktop 3-column grid
              into a cramped 768px row) but dissolve back into two
              independent top-level grid items at lg via `contents`, so
              desktop's 3-column layout is exactly what it was before. */}
          <div className="contents md:flex md:flex-col md:gap-8 lg:contents">
            <Reveal scale className="flex items-center justify-center">
              <div className="icon-badge-neon mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center rounded-full">
                <NeonIcon name="face_retouching_natural" className="animate-pulse text-[100px]" />
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal>
                <h2 className="text-section-title font-bold leading-tight text-white">
                  {t("drAymanTarek.finalCta.heading")}
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="text-body-lg text-on-surface-variant">{t("drAymanTarek.finalCta.subtitle")}</p>
              </Reveal>
              <Reveal delay={0.12} className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <Button size="lg" className="w-full px-6 py-3.5 shadow-2xl sm:w-auto lg:px-10 lg:py-4">
                  {t("drAymanTarek.finalCta.bookConsultation")}
                </Button>
              </Reveal>
              <Reveal delay={0.18} className="w-full sm:w-auto">
                <Button
                  variant="whatsapp"
                  className="w-full px-6 py-3.5 sm:w-auto lg:px-8 lg:py-3"
                  icon={
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.94L2 22l5.29-1.39a9.87 9.87 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
                    </svg>
                  }
                >
                  {t("drAymanTarek.finalCta.chatWhatsapp")}
                </Button>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} direction="right" className="space-y-4 text-center lg:text-left rtl:lg:text-right">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="location_on" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">{t("drAymanTarek.finalCta.address")}</p>
                <p className="text-small text-on-surface-variant">{t("drAymanTarek.finalCta.addressLabel")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="schedule" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">{t("drAymanTarek.finalCta.hours")}</p>
                <p className="text-small text-on-surface-variant">{t("drAymanTarek.finalCta.hoursLabel")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="call" className="shrink-0 text-2xl" />
              <div>
                <p dir="ltr" className="text-body font-bold text-white">
                  {t("drAymanTarek.finalCta.phone")}
                </p>
                <p className="text-small text-on-surface-variant">{t("drAymanTarek.finalCta.phoneLabel")}</p>
              </div>
            </div>
          </Reveal>
        </GlassCard>
      </section>
    </>
  );
}
