"use client";

import { NeonIcon } from "@/components/ui/NeonIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { LegalPageData } from "@/data/legalContent";

/** Shared page for Privacy Policy and Terms of Service — same header/card
 * treatment as the rest of the site (glass, glow, Reveal/Stagger), fed a
 * bilingual content object rather than the page_sections CMS (these two
 * pages aren't part of the 6 CMS-managed pages), so swapping in the
 * client's final legal text later is a data-only change, no layout work. */
export function LegalPageContent({ content }: { content: LegalPageData }) {
  const { language } = useLanguage();
  const t = (field: { en: string; ar: string }) => (language === "ar" ? field.ar : field.en);

  return (
    <>
      <section className="relative flex flex-col items-center overflow-hidden px-margin-mobile pb-14 pt-32 text-center">
        <GlowOrb className="z-[1] -left-40 -top-32 h-[480px] w-[480px]" />
        <GlowOrb className="z-[1] -right-24 bottom-0 h-[400px] w-[400px]" color="tertiary" />
        <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
        <Reveal className="relative z-10 max-w-2xl">
          <div className="icon-badge-neon mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
            <NeonIcon name="description" className="text-4xl" />
          </div>
          <h1 className="mb-3 text-hero text-white">{t(content.title)}</h1>
          {t(content.lastUpdated) && (
            <p className="mb-4 text-small uppercase tracking-widest text-primary">{t(content.lastUpdated)}</p>
          )}
          {t(content.intro) && <p className="text-body-lg text-on-surface-variant">{t(content.intro)}</p>}
        </Reveal>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
        <Stagger className="mx-auto max-w-3xl space-y-6">
          {content.sections.map((section, i) => (
            <StaggerChild key={i}>
              <GlassCard radius="2xl" interactive={false} className="p-7 text-left rtl:text-right md:p-8">
                <h2 className="mb-4 text-card-title text-white">{t(section.heading)}</h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.en} className="whitespace-pre-line text-body text-on-surface-variant">
                      {t(paragraph)}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </StaggerChild>
          ))}
        </Stagger>
      </section>
    </>
  );
}
