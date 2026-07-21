import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FeaturedArticle } from "@/components/sections/FeaturedArticle";
import { ArticlesGrid } from "@/components/sections/ArticlesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { FEATURED_ARTICLE, ARTICLES } from "@/data/blog";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Updates"
        title="The Neurosurgery Blog"
        subtitle="Clear, expert perspectives on brain and spine care — from surgical breakthroughs to practical guidance for patients and families."
        ctaLabel="Explore Articles"
        ctaIcon="auto_stories"
      />

      <section className="mx-auto max-w-container-max space-y-14 px-margin-mobile pt-section-gap-sm pb-section-gap-sm md:px-margin-desktop">
        <FeaturedArticle article={FEATURED_ARTICLE} />
        <ArticlesGrid articles={ARTICLES} />
      </section>

      <FinalCta
        heading="Have a Question About Your Diagnosis?"
        subtitle="Schedule a consultation with Dr. Ayman Tarek and get clear, expert guidance built around your case."
      />
    </>
  );
}
