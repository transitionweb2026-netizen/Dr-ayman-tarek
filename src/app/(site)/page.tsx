import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";
import { getPageSections, getPageSeo, getVideos, getArticles, getFaqItems, getTestimonials } from "@/server/repositories/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return { title: seo?.seoTitleEn || undefined, description: seo?.seoDescriptionEn || undefined };
}

export default async function HomePage() {
  const [sections, videos, articles, faqItems, testimonials] = await Promise.all([
    getPageSections("home"),
    getVideos(),
    getArticles(),
    getFaqItems("general"),
    getTestimonials("home"),
  ]);

  return <HomeContent sections={sections} videos={videos} articles={articles} faqItems={faqItems} testimonials={testimonials} />;
}
