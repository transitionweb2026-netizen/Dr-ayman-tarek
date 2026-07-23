"use client";

import { PageHero } from "@/components/sections/PageHero";
import { VideoLibrary } from "@/components/sections/VideoLibrary";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickSection } from "@/lib/pickLang";
import type { BilingualVideo } from "@/server/repositories/content";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;
interface HeroContent { eyebrow: string; title: string; subtitle: string; cta: string }
interface LibraryContent { title: string; subtitle: string }
interface CtaContent { heading: string; subtitle: string }

export function VideosContent({ sections, videos }: { sections: Sections; videos: BilingualVideo[] }) {
  const { language } = useLanguage();
  const hero = pickSection<HeroContent>(sections, "hero", language);
  const library = pickSection<LibraryContent>(sections, "library", language);
  const finalCta = pickSection<CtaContent>(sections, "finalCta", language);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow || ""} title={hero.title || ""} subtitle={hero.subtitle || ""} ctaLabel={hero.cta} />
      <VideoLibrary videos={videos} titleOverride={library.title} subtitleOverride={library.subtitle} />
      <FinalCta heading={finalCta.heading || ""} subtitle={finalCta.subtitle || ""} />
    </>
  );
}
