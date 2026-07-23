import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { getPageSections, getPageSeo, getServices } from "@/server/repositories/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services");
  return { title: seo?.seoTitleEn || "Services", description: seo?.seoDescriptionEn || undefined };
}

export default async function ServicesPage() {
  const [sections, services] = await Promise.all([getPageSections("services"), getServices()]);
  return <ServicesContent sections={sections} services={services} />;
}
