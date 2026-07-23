import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";
import { getPageSections, getPageSeo, getFaqItems, getServices } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact");
  return { title: seo?.seoTitleEn || "Contact", description: seo?.seoDescriptionEn || undefined };
}

export default async function ContactPage() {
  const [sections, settings, faqItems, services] = await Promise.all([
    getPageSections("contact"),
    getSiteSettings(),
    getFaqItems("contact"),
    getServices(),
  ]);

  return (
    <ContactContent
      sections={sections}
      settings={settings}
      faqItems={faqItems}
      services={services}
      generalConsultationLabel={{ en: "General Consultation", ar: "استشارة عامة" }}
      otherLabel={{ en: "Other", ar: "أخرى" }}
    />
  );
}
