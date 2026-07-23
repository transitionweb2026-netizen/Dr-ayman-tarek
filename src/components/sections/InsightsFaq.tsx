"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

interface InsightArticle {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface InsightsFaqContent {
  insightsHeading: string;
  viewAll: string;
  faqHeading: string;
}

function ArticleCard({
  article,
  insightsHeading,
  viewAllLabel,
  readStoryLabel,
}: {
  article: InsightArticle;
  insightsHeading: string;
  viewAllLabel: string;
  readStoryLabel: string;
}) {
  const image = article.image;
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

interface InsightsFaqProps {
  content: Partial<InsightsFaqContent>;
  articles: InsightArticle[];
  faqItems: AccordionItem[];
}

export function InsightsFaq({ content, articles, faqItems }: InsightsFaqProps) {
  const { t } = useLanguage();
  const insightsHeading = content.insightsHeading || "";
  const viewAllLabel = content.viewAll || "";

  return (
    <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile pb-section-gap-sm md:px-margin-desktop lg:grid-cols-[3.2fr_1.3fr] lg:items-stretch">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.title} delay={index * 0.1}>
            <ArticleCard
              article={article}
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
            <h2 className="text-card-title text-white">{content.faqHeading || ""}</h2>
            <button className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">{viewAllLabel}</button>
          </div>
          <Accordion items={faqItems.slice(0, 6)} />
        </GlassCard>
      </Reveal>
    </section>
  );
}
