"use client";

import Image from "next/image";
import Link from "next/link";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedHref } from "@/lib/localizedHref";
import { pickSection } from "@/lib/pickLang";
import type { BlogPostView } from "./blogPostView";

interface CtaContent { heading: string; subtitle: string }
type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;

/** Article-reading layout for a single blog post — new page, so it composes
 * existing primitives (GlowOrb/GlassCard/Reveal/FinalCta) in a fresh
 * arrangement rather than reusing PageHero, which is built around the CTA +
 * social-card layout of the 6 section-level pages, not a single article. */
export function BlogPostDetail({ post, sections }: { post: BlogPostView; sections: Sections }) {
  const { t, language } = useLanguage();
  const backHref = localizedHref("/blog", language);
  const finalCta = pickSection<CtaContent>(sections, "finalCta", language);

  const readingTimeLabel = post.readingTime
    ? language === "ar"
      ? `${post.readingTime} دقائق قراءة`
      : `${post.readingTime} min read`
    : null;
  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(language === "ar" ? "ar-EG" : undefined, { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-lowest via-background to-[#150a24]" />
        <GlowOrb className="z-[1] -left-40 -top-32 h-[480px] w-[480px]" />
        <GlowOrb className="z-[1] -right-24 bottom-0 h-[400px] w-[400px]" color="tertiary" />
        <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />

        <div className="relative z-10 mx-auto max-w-3xl px-margin-mobile md:px-8">
          <Reveal>
            <Link
              href={backHref}
              className="mb-8 inline-flex items-center gap-2 text-small text-on-surface-variant transition-colors hover:text-primary"
            >
              <NeonIcon name="arrow_back" className="text-base rtl:-scale-x-100" />
              {t("common.backToBlog")}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {post.category && (
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-small text-primary">{post.category}</span>
              )}
              {dateLabel && <span className="text-xs text-on-surface-variant">{dateLabel}</span>}
              {readingTimeLabel && (
                <>
                  <span className="text-xs text-on-surface-variant">•</span>
                  <span className="text-xs text-on-surface-variant">{readingTimeLabel}</span>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-6 text-hero text-white">{post.title}</h1>
          </Reveal>
          {post.authorName && (
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3">
                {post.authorAvatarUrl ? (
                  <Image src={post.authorAvatarUrl} alt={post.authorName} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="icon-badge-neon flex h-10 w-10 items-center justify-center rounded-full">
                    <NeonIcon name="person" className="text-lg" />
                  </div>
                )}
                <span className="text-body text-white">{post.authorName}</span>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {post.image && (
        <div className="mx-auto mb-14 max-w-4xl px-margin-mobile md:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-primary/10 shadow-glow-lg">
              <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" priority />
            </div>
          </Reveal>
        </div>
      )}

      <section className="mx-auto mb-section-gap max-w-3xl px-margin-mobile md:px-8">
        <Reveal>
          <GlassCard as="article" radius="3xl" interactive={false} className="p-margin-mobile md:p-10">
            {post.contentHtml ? (
              <div className="rich-text-content" dir={language === "ar" ? "rtl" : "ltr"} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            ) : (
              <p className="text-body text-on-surface-variant">{post.excerpt}</p>
            )}
          </GlassCard>
        </Reveal>
      </section>

      {finalCta.heading && <FinalCta heading={finalCta.heading} subtitle={finalCta.subtitle || ""} />}
    </>
  );
}
