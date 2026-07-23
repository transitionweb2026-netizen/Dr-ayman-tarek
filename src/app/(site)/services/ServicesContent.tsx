"use client";

import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickSection } from "@/lib/pickLang";
import type { BilingualService } from "@/server/repositories/content";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;

interface HeroContent { eyebrow: string; title: string; subtitle: string; cta: string }
interface GridContent { eyebrow: string; title: string; subtitle: string }
interface WhyChooseItem { icon: string; title: string; desc: string }
interface WhyChooseContent { eyebrow: string; title: string; subtitle: string; items: WhyChooseItem[] }
interface TechContent { heading: string; technologies: string[]; subheading: string; description: string; cta: string }
interface CtaContent { heading: string; subtitle: string }

export function ServicesContent({ sections, services }: { sections: Sections; services: BilingualService[] }) {
  const { language } = useLanguage();

  const hero = pickSection<HeroContent>(sections, "hero", language);
  const grid = pickSection<GridContent>(sections, "grid", language);
  const whyChoose = pickSection<WhyChooseContent>(sections, "whyChoose", language);
  const tech = pickSection<TechContent>(sections, "techShowcase", language);
  const finalCta = pickSection<CtaContent>(sections, "finalCta", language);

  const whyChooseFeatures: Feature[] = (whyChoose.items || []).map((item) => ({ icon: item.icon, title: item.title, desc: item.desc }));

  return (
    <>
      <PageHero eyebrow={hero.eyebrow || ""} title={hero.title || ""} subtitle={hero.subtitle || ""} ctaLabel={hero.cta} />
      <ServicesGrid eyebrowOverride={grid.eyebrow} titleOverride={grid.title} subtitleOverride={grid.subtitle} services={services} />
      <FeatureGrid eyebrow={whyChoose.eyebrow || ""} title={whyChoose.title || ""} subtitle={whyChoose.subtitle || ""} features={whyChooseFeatures} />
      <TechShowcase heading={tech.heading} technologies={tech.technologies} subheading={tech.subheading} description={tech.description} cta={tech.cta} />
      <FinalCta heading={finalCta.heading || ""} subtitle={finalCta.subtitle || ""} />
    </>
  );
}
