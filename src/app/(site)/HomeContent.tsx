"use client";

import { HomeHero, type HomeHeroContent } from "@/components/sections/HomeHero";
import { StatsStrip, type Stat } from "@/components/sections/StatsStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SpecialtiesGrid, type SpecialtiesGridContent } from "@/components/sections/SpecialtiesGrid";
import { TestimonialsPanel, type TestimonialsPanelContent } from "@/components/sections/TestimonialsPanel";
import { InsightsFaq, type InsightsFaqContent } from "@/components/sections/InsightsFaq";
import { VideoSeriesPreview } from "@/components/sections/VideoSeriesPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickSection } from "@/lib/pickLang";
import type { BilingualVideo, BilingualArticle, BilingualFaqItem, BilingualTestimonial } from "@/server/repositories/content";

type Sections = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;
interface AboutContent { title: string; bio: string; cta: string; videoCaption: string }
interface CtaContent { heading: string; subtitle: string; primaryLabel?: string }
interface StatItem { icon: string; value: string; suffix: string; label: string }

export function HomeContent({
  sections,
  videos,
  articles,
  faqItems,
  testimonials,
}: {
  sections: Sections;
  videos: BilingualVideo[];
  articles: BilingualArticle[];
  faqItems: BilingualFaqItem[];
  testimonials: BilingualTestimonial[];
}) {
  const { t, language } = useLanguage();

  const hero = pickSection<HomeHeroContent>(sections, "hero", language);
  const statsContent = pickSection<{ items: StatItem[] }>(sections, "stats", language);
  const about = pickSection<AboutContent>(sections, "about", language);
  const specialties = pickSection<SpecialtiesGridContent>(sections, "specialties", language);
  const testimonialsPanel = pickSection<TestimonialsPanelContent>(sections, "testimonialsPanel", language);
  const milestones = (pickSection<{ milestones: { year: string; title: string; place: string }[] }>(sections, "testimonialsPanel", language).milestones) || [];
  const insightsFaq = pickSection<InsightsFaqContent>(sections, "insightsFaq", language);
  const videoSeries = pickSection<{ title: string }>(sections, "videoSeries", language);
  const finalCta = pickSection<CtaContent>(sections, "finalCta", language);

  const stats: Stat[] = (statsContent.items || []).map((s) => ({ icon: s.icon, value: parseInt(s.value, 10) || 0, suffix: s.suffix, label: s.label }));

  const panelTestimonials = testimonials.map((item) => {
    const copy = language === "ar" ? item.ar : item.en;
    return { quote: copy.quote, name: item.patientName, role: copy.role || "" };
  });

  const insightArticles = articles.slice(0, 3).map((a) => {
    const copy = language === "ar" ? a.ar : a.en;
    return { tag: copy.category || "", date: copy.date, title: copy.title, excerpt: copy.excerpt, image: a.image };
  });

  const homeFaqItems = faqItems.map((item) => {
    const copy = language === "ar" ? item.ar : item.en;
    return { question: copy.question, answer: copy.answer };
  });

  return (
    <>
      <HomeHero content={hero} />
      <StatsStrip stats={stats.length > 0 ? stats : undefined} />
      <AboutPreview
        title={about.title || ""}
        cta={
          <button className="group flex items-center gap-2 text-small text-primary">
            {about.cta || ""}
            <NeonIcon
              name="arrow_forward"
              neon={false}
              className="text-primary transition-transform duration-300 ease-in-out [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))_drop-shadow(0_0_10px_rgba(168,85,247,.35))] group-hover:translate-x-1 group-hover:[filter:drop-shadow(0_0_12px_rgba(192,38,255,.6))_drop-shadow(0_0_24px_rgba(192,38,255,.45))_drop-shadow(0_0_40px_rgba(192,38,255,.3))] rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </button>
        }
      >
        <p className="text-body-lg text-on-surface-variant">{about.bio || ""}</p>
      </AboutPreview>
      <SpecialtiesGrid content={specialties} />
      <TestimonialsPanel content={testimonialsPanel} testimonials={panelTestimonials} milestones={milestones} />
      <InsightsFaq content={insightsFaq} articles={insightArticles} faqItems={homeFaqItems} />
      <VideoSeriesPreview videos={videos} titleOverride={videoSeries.title} />
      <FinalCta
        heading={finalCta.heading || ""}
        subtitle={finalCta.subtitle || ""}
        primaryLabel={finalCta.primaryLabel || t("home.finalCta.primaryLabel")}
      />
    </>
  );
}
