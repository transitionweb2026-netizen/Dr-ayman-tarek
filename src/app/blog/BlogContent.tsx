"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FeaturedArticle } from "@/components/sections/FeaturedArticle";
import { ArticlesGrid } from "@/components/sections/ArticlesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { getFeaturedArticle, getArticles } from "@/data/blog";
import { useLanguage } from "@/i18n/LanguageProvider";

export function BlogContent() {
  const { language, t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("blog.hero.eyebrow")}
        title={t("blog.hero.title")}
        subtitle={t("blog.hero.subtitle")}
        ctaLabel={t("blog.hero.cta")}
        ctaIcon="auto_stories"
      />

      <section className="mx-auto max-w-container-max space-y-14 px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop">
        <FeaturedArticle article={getFeaturedArticle(language)} />
        <ArticlesGrid articles={getArticles(language)} />
      </section>

      <FinalCta heading={t("blog.finalCta.heading")} subtitle={t("blog.finalCta.subtitle")} />
    </>
  );
}
