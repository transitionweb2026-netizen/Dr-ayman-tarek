"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";
import type { BlogArticle } from "@/data/blog";

/** Large hero-style card for the blog's single Featured Article. */
export function FeaturedArticle({ article }: { article: BlogArticle }) {
  const { t, language } = useLanguage();
  const href = localizedHref(`/blog/${article.id}`, language);
  return (
    <Reveal>
      <GlassCard radius="3xl" className="group overflow-hidden">
        <Link href={href} className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[440px]">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <div className="max-w-xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-small text-primary">
                  {article.category}
                </span>
                <span className="text-xs text-on-surface-variant">{article.date}</span>
                <span className="text-xs text-on-surface-variant">•</span>
                <span className="text-xs text-on-surface-variant">{article.readingTime}</span>
              </div>
              <h2 className="mb-4 text-section-title text-white">{article.title}</h2>
              <p className="mb-6 text-body-lg text-on-surface-variant">{article.excerpt}</p>
              <span className="btn-primary self-start px-9 py-4">
                <span className="relative">{t("common.readMore")}</span>
                <span className="shrink-0">
                  <NeonIcon name="arrow_forward" neon={false} className="text-xl text-white rtl:-scale-x-100" />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </GlassCard>
    </Reveal>
  );
}
