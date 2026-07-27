"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";

interface InsightArticle {
  slug: string;
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

function ArticleCard({ article, readStoryLabel, href }: { article: InsightArticle; readStoryLabel: string; href: string }) {
  return (
    <GlassCard radius="2xl" className="flex h-full flex-col p-6">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl">
        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 hover:scale-110" />
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
      <Link className="mt-auto flex items-center gap-2 pt-4 text-small text-primary" href={href}>
        {readStoryLabel} <NeonIcon name="open_in_new" className="text-sm" />
      </Link>
    </GlassCard>
  );
}

interface InsightsFaqProps {
  content: Partial<InsightsFaqContent>;
  articles: InsightArticle[];
  faqItems: AccordionItem[];
}

export function InsightsFaq({ content, articles, faqItems }: InsightsFaqProps) {
  const { t, language } = useLanguage();
  const insightsHeading = content.insightsHeading || "";
  const viewAllLabel = content.viewAll || "";

  return (
    <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile pb-section-gap-sm md:px-margin-desktop lg:grid-cols-[3.2fr_1.3fr] lg:items-stretch">
      <div className="flex flex-col">
        <Reveal className="mb-5 flex items-center justify-between">
          <h2 className="text-card-title text-white">{insightsHeading}</h2>
          <Link href={localizedHref("/blog", language)} className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">
            {viewAllLabel}
          </Link>
        </Reveal>
        <div className="grid flex-1 grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.1}>
              <ArticleCard article={article} readStoryLabel={t("common.readStory")} href={localizedHref(`/blog/${article.slug}`, language)} />
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={articles.length * 0.1}>
        <GlassCard radius="2xl" className="flex flex-col p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-card-title text-white">{content.faqHeading || ""}</h2>
            <Link href={localizedHref("/contact#faq", language)} className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">
              {viewAllLabel}
            </Link>
          </div>
          <Accordion items={faqItems.slice(0, 6)} />
        </GlassCard>
      </Reveal>
    </section>
  );
}
