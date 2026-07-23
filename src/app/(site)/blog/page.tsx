import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";
import { getPageSections, getPageSeo, getArticles } from "@/server/repositories/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blog");
  return { title: seo?.seoTitleEn || "Blog", description: seo?.seoDescriptionEn || undefined };
}

export default async function BlogPage() {
  const [sections, articles] = await Promise.all([getPageSections("blog"), getArticles()]);
  return <BlogContent sections={sections} articles={articles} />;
}
