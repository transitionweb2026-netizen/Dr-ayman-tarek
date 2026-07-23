import type { Metadata } from "next";
import { DrAymanTarekContent } from "./DrAymanTarekContent";
import { getPageSections, getPageSeo, getSpecialties, getTestimonials } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("dr-ayman-tarek");
  return { title: seo?.seoTitleEn || "Cosmetic Surgery", description: seo?.seoDescriptionEn || undefined };
}

export default async function DrAymanTarekPage() {
  const [sections, specialties, testimonials, settings] = await Promise.all([
    getPageSections("dr-ayman-tarek"),
    getSpecialties(),
    getTestimonials("dr-ayman-tarek"),
    getSiteSettings(),
  ]);

  const clinicInfo = {
    en: { address: settings.addressEn, hours: settings.businessHours[0]?.value_en || "" },
    ar: { address: settings.addressAr, hours: settings.businessHours[0]?.value_ar || "" },
    phone: settings.phone,
  };

  return <DrAymanTarekContent sections={sections} specialties={specialties} testimonials={testimonials} clinicInfo={clinicInfo} />;
}
