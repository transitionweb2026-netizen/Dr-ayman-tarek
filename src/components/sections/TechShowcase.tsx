"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerChild } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";

const SHOWCASE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk";

export function TechShowcase() {
  const { t, tRaw } = useLanguage();
  const technologies = tRaw<string[]>("services.techShowcase.technologies");

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop">
      <div className="overflow-hidden rounded-[32px] glass shadow-glow-lg">
        <Reveal direction="down" duration={0.5}>
          <div className="border-b border-primary/[0.14] px-6 py-4 text-center md:px-10">
            <h2 className="text-body-lg font-semibold text-white">{t("services.techShowcase.heading")}</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-[0.85fr_1.1fr_0.85fr] lg:gap-8 md:p-10">
          <Stagger className="order-2 space-y-4 lg:order-1" gap={0.08}>
            {Array.isArray(technologies) &&
              technologies.map((tech) => (
                <StaggerChild key={tech} className="flex items-center gap-3">
                  <NeonIcon name="check_circle" filled className="shrink-0 text-xl" />
                  <span className="text-body text-on-surface">{tech}</span>
                </StaggerChild>
              ))}
          </Stagger>

          <Reveal scale className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-primary/20 shadow-glow-lg">
              <Image src={SHOWCASE_IMAGE} alt="" fill className="object-cover" />
            </div>
          </Reveal>

          <div className="order-3 space-y-4 text-center lg:text-left rtl:lg:text-right">
            <Reveal>
              <h3 className="text-card-title text-white">{t("services.techShowcase.subheading")}</h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-body text-on-surface-variant">{t("services.techShowcase.description")}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <Button
                icon={<span className="material-symbols-outlined text-lg rtl:-scale-x-100">arrow_forward</span>}
                iconPosition="end"
              >
                {t("services.techShowcase.cta")}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
