"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FeaturedArticle } from "@/components/sections/FeaturedArticle";
import { ArticlesGrid } from "@/components/sections/ArticlesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickSection } from "@/lib/pickLang";
import type { BilingualArticle } from "@/server/repositories/content";
import type { BlogArticle } from "@/data/blog";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;
interface HeroContent { eyebrow: string; title: string; subtitle: string; cta: string }
interface CtaContent { heading: string; subtitle: string }

function formatReadingTime(minutes: number | null, language: string): string {
  if (!minutes) return "";
  return language === "ar" ? `${minutes} دقائق قراءة` : `${minutes} min read`;
}

function toBlogArticle(a: BilingualArticle, language: "en" | "ar"): BlogArticle {
  const copy = language === "ar" ? a.ar : a.en;
  return {
    id: a.slug,
    title: copy.title,
    category: copy.category || "",
    date: copy.date,
    readingTime: formatReadingTime(a.readingTime, language),
    excerpt: copy.excerpt,
    image: a.image,
  };
}

export function BlogContent({ sections, articles }: { sections: Sections; articles: BilingualArticle[] }) {
  const { language } = useLanguage();
  const hero = pickSection<HeroContent>(sections, "hero", language);
  const finalCta = pickSection<CtaContent>(sections, "finalCta", language);

  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow || ""} title={hero.title || ""} subtitle={hero.subtitle || ""} ctaLabel={hero.cta} ctaIcon="auto_stories" />

      <section className="mx-auto max-w-container-max space-y-14 px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop">
        {featured && <FeaturedArticle article={toBlogArticle(featured, language)} />}
        <ArticlesGrid articles={rest.map((a) => toBlogArticle(a, language))} />
      </section>

      <FinalCta heading={finalCta.heading || ""} subtitle={finalCta.subtitle || ""} />
    </>
  );
}
