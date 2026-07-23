import type { Metadata } from "next";
import { VideosContent } from "./VideosContent";
import { getPageSections, getPageSeo, getVideos } from "@/server/repositories/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("videos");
  return { title: seo?.seoTitleEn || "Videos", description: seo?.seoDescriptionEn || undefined };
}

export default async function VideosPage() {
  const [sections, videos] = await Promise.all([getPageSections("videos"), getVideos()]);
  return <VideosContent sections={sections} videos={videos} />;
}
