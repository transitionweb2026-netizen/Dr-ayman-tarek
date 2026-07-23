"use client";

import { PageHero } from "@/components/sections/PageHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { ProcedureCardGrid, type ProcedureCardItem } from "@/components/sections/ProcedureCardGrid";
import { StatsStrip, type Stat } from "@/components/sections/StatsStrip";
import { TestimonialsGrid, type Testimonial } from "@/components/sections/TestimonialsGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickSection } from "@/lib/pickLang";
import type { BilingualSpecialty, BilingualTestimonial } from "@/server/repositories/content";

// Bespoke illustration images, positionally matched to the always-present
// certificate/achievement items (not admin-uploaded, so kept as a fixed
// lookup rather than a repeater field) — preserves the original artwork
// exactly while titles/descriptions/icons stay CMS-editable.
const CERTIFICATE_IMAGES = [
  "/illustrations/dr-ayman-tarek/cert-european-board.svg",
  "/illustrations/dr-ayman-tarek/cert-isaps-fellowship.svg",
  "/illustrations/dr-ayman-tarek/cert-burns-diploma.svg",
  "/illustrations/dr-ayman-tarek/cert-injectables.svg",
  "/illustrations/dr-ayman-tarek/cert-egyptian-society.svg",
  "/illustrations/dr-ayman-tarek/cert-body-contouring-award.svg",
];
const ACHIEVEMENT_IMAGES = [
  "/illustrations/dr-ayman-tarek/achievement-experience.svg",
  "/illustrations/dr-ayman-tarek/achievement-speaker.svg",
  "/illustrations/dr-ayman-tarek/achievement-research.svg",
  "/illustrations/why-choose/international-standards.svg",
];

const DOCTOR_INTRO_VIDEO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;
interface HeroContent { eyebrow: string; titleLine1: string; titleLine2: string; subtitle: string; cta: string }
interface AboutContent { title: string; videoCaption: string; bio1: string; bio2: string }
interface ItemsContent { title: string; subtitle: string; items: { icon: string; title: string; desc: string }[] }
interface SpecialtiesHeadingContent { title: string; subtitle: string }
interface StatsContent { items: { icon: string; value: string; suffix: string; label: string }[] }
interface TestimonialsHeadingContent { title: string }
interface FinalCtaContent { heading: string; subtitle: string; bookConsultation: string; chatWhatsapp: string }

export function DrAymanTarekContent({
  sections,
  specialties,
  testimonials: bilingualTestimonials,
  clinicInfo,
}: {
  sections: Sections;
  specialties: BilingualSpecialty[];
  testimonials: BilingualTestimonial[];
  clinicInfo: { en: { address: string; hours: string }; ar: { address: string; hours: string }; phone: string };
}) {
  const { language, t } = useLanguage();
  const clinic = language === "ar" ? clinicInfo.ar : clinicInfo.en;

  const hero = pickSection<HeroContent>(sections, "hero", language);
  const about = pickSection<AboutContent>(sections, "about", language);
  const certificatesContent = pickSection<ItemsContent>(sections, "certificates", language);
  const specialtiesHeading = pickSection<SpecialtiesHeadingContent>(sections, "specialties", language);
  const achievementsContent = pickSection<ItemsContent>(sections, "achievements", language);
  const statsContent = pickSection<StatsContent>(sections, "stats", language);
  const testimonialsHeading = pickSection<TestimonialsHeadingContent>(sections, "testimonials", language);
  const finalCta = pickSection<FinalCtaContent>(sections, "finalCta", language);

  const certificates: Feature[] = (certificatesContent.items || []).map((item, i) => ({
    icon: item.icon, title: item.title, desc: item.desc, image: CERTIFICATE_IMAGES[i],
  }));
  const achievements: Feature[] = (achievementsContent.items || []).map((item, i) => ({
    icon: item.icon, title: item.title, desc: item.desc, image: ACHIEVEMENT_IMAGES[i],
  }));
  const stats: Stat[] = (statsContent.items || []).map((s) => ({ icon: s.icon, value: parseInt(s.value, 10) || 0, suffix: s.suffix, label: s.label }));

  const specialtyItems: ProcedureCardItem[] = specialties.map((s) => {
    const copy = language === "ar" ? s.ar : s.en;
    return { id: s.slug, title: copy.title, shortDescription: copy.shortDescription, description: copy.description, image: s.image, recovery: copy.recovery || "", duration: copy.duration || "" };
  });

  const testimonials: Testimonial[] = bilingualTestimonials.map((item) => {
    const copy = language === "ar" ? item.ar : item.en;
    return { quote: copy.quote, name: item.patientName, role: copy.role || "" };
  });

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow || ""}
        title={
          <>
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </>
        }
        subtitle={hero.subtitle || ""}
        ctaLabel={hero.cta}
      />

      <AboutPreview title={about.title || ""} videoCaption={about.videoCaption || ""} videoImage={DOCTOR_INTRO_VIDEO}>
        <p className="text-body-lg text-on-surface-variant">{about.bio1 || ""}</p>
        <p className="text-body text-on-surface-variant">{about.bio2 || ""}</p>
      </AboutPreview>

      <FeatureGrid title={certificatesContent.title || ""} subtitle={certificatesContent.subtitle || ""} features={certificates} columns={3} />

      <ProcedureCardGrid title={specialtiesHeading.title || ""} subtitle={specialtiesHeading.subtitle || ""} items={specialtyItems} />

      <FeatureGrid title={achievementsContent.title || ""} subtitle={achievementsContent.subtitle || ""} features={achievements} />

      <StatsStrip stats={stats.length > 0 ? stats : undefined} />

      <TestimonialsGrid title={testimonialsHeading.title || ""} testimonials={testimonials} />

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
                <h2 className="text-section-title font-bold leading-tight text-white">{finalCta.heading || ""}</h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="text-body-lg text-on-surface-variant">{finalCta.subtitle || ""}</p>
              </Reveal>
              <Reveal delay={0.12} className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <Button size="lg" className="w-full px-6 py-3.5 shadow-2xl sm:w-auto lg:px-10 lg:py-4">
                  {finalCta.bookConsultation || ""}
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
                  {finalCta.chatWhatsapp || ""}
                </Button>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} direction="right" className="space-y-4 text-center lg:text-left rtl:lg:text-right">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="location_on" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">{clinic.address}</p>
                <p className="text-small text-on-surface-variant">{t("contact.quickInfo.visit.label")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="schedule" className="shrink-0 text-2xl" />
              <div>
                <p className="text-body font-bold text-white">{clinic.hours}</p>
                <p className="text-small text-on-surface-variant">{t("contact.quickInfo.hours.label")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <NeonIcon name="call" className="shrink-0 text-2xl" />
              <div>
                <p dir="ltr" className="text-body font-bold text-white">
                  {clinicInfo.phone}
                </p>
                <p className="text-small text-on-surface-variant">{t("contact.quickInfo.call.label")}</p>
              </div>
            </div>
          </Reveal>
        </GlassCard>
      </section>
    </>
  );
}
