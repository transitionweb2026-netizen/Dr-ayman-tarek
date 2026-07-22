"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

const ARTICLE_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCj_BLuiyILw1YhqAC3tRIDF2988vEFMbdp2CShPuVIiDUoHM1kMzpKG_4i0s5CUQUmeVMDWsJnumLQFXXrf0m-Mjl34wizujbVZdXvUYuolvYMi8YyTkj8UyYy6owS1CMhwr6GhKZvbQVx4zQYVu5JL4WeKrZ9IM5Qa-npZXsG-RmAevHAwlFxJCgUchdKulNiNaTwgXXFMihF3Ca3g_TTGj18eVkdNijbGyFBcA_Ydb9qTxI01BtA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTn3cyqUNe0ocnTjAZNiU5K9DqBl7NhprA_LEZLFZdsfYHOSUvWgG4z5ly_9fRYrWBfOch68eVi6fVDiJRcEZ9QKfi5Hj6oqaqOVKEMusztlkmYqVhxRwvogyhNcuiel8bNSOj3TtidYMdw9NdHd_55yE7p3rVGC-iaOvAyZV5tB3ohCj8Zkhed11RQnRdpdNgf5A1NfHSeO6erTwhaMrdCajgAonxI05DC1TiGTJj3Yd5T0EZsOmC",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP6klrdOkaqLvlrfoMX7AfD2Ic6H8jgwmKRZypU2FjhK07NPZMQ2pij14DYs6TqVdsQ22uvX0yGm-3_Mz9rDK-ZvQOTzYvMUCqWdenca9F4lD5Ocq8LJiVMMuxbuzeH-nT1oHMiyczcIdSqFeExP1eGrfiAs7NB-VsTV1HlmTpETg9JIRyWRIiFQg5F79aCEvZkhTKDZBF-NMypOxuu7ASYLJexGp_rWY6OSjF8d8G_LLu6Ze9dc1",
];

interface InsightArticle {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

function ArticleCard({
  article,
  image,
  insightsHeading,
  viewAllLabel,
  readStoryLabel,
}: {
  article: InsightArticle;
  image: string;
  insightsHeading: string;
  viewAllLabel: string;
  readStoryLabel: string;
}) {
  return (
    <GlassCard radius="2xl" className="flex h-full flex-col p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-card-title text-white">{insightsHeading}</h2>
        <button className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">{viewAllLabel}</button>
      </div>
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl">
        <Image src={image} alt="" fill className="object-cover transition-transform duration-700 hover:scale-110" />
      </div>
      <div className="mt-4 flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-small text-primary">
            {article.tag}
          </span>
          <span className="text-xs text-on-surface-variant">{article.date}</span>
        </div>
        <h3 className="text-card-title text-white">{article.title}</h3>
        <p className="text-body leading-relaxed text-on-surface-variant">{article.excerpt}</p>
      </div>
      <a className="mt-auto flex items-center gap-2 pt-4 text-small text-primary" href="#">
        {readStoryLabel} <NeonIcon name="open_in_new" className="text-sm" />
      </a>
    </GlassCard>
  );
}

export function InsightsFaq() {
  const { t, tRaw } = useLanguage();
  const articles = tRaw<InsightArticle[]>("home.insightsFaq.articles");
  const faqItems = tRaw<AccordionItem[]>("home.insightsFaq.faqItems");
  const insightsHeading = t("home.insightsFaq.insightsHeading");
  const viewAllLabel = t("home.insightsFaq.viewAll");

  return (
    <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile pb-section-gap-sm md:px-margin-desktop lg:grid-cols-[3.2fr_1.3fr] lg:items-stretch">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.title} delay={index * 0.1}>
            <ArticleCard
              article={article}
              image={ARTICLE_IMAGES[index] ?? ARTICLE_IMAGES[0]}
              insightsHeading={insightsHeading}
              viewAllLabel={viewAllLabel}
              readStoryLabel={t("common.readStory")}
            />
          </Reveal>
        ))}
      </div>
      <Reveal delay={articles.length * 0.1}>
        <GlassCard radius="2xl" className="flex flex-col p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-card-title text-white">{t("home.insightsFaq.faqHeading")}</h2>
            <button className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">{viewAllLabel}</button>
          </div>
          <Accordion items={faqItems.slice(0, 6)} />
        </GlassCard>
      </Reveal>
    </section>
  );
}
