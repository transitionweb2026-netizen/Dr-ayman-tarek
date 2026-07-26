import type { Metadata } from "next";
import { DrAymanTarekContent } from "./DrAymanTarekContent";
import { getPageSections, getSpecialties, getTestimonials, getHeroImageConfig } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildPhysicianSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/dr-ayman-tarek";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "dr-ayman-tarek",
    lang: LANG,
    path: PATH,
    fallbackTitle: "Cosmetic Surgery",
    fallbackDescription:
      "Dr. Ayman Tarek, Consultant Plastic, Cosmetic & Reconstructive Surgeon, blends surgical precision with an artistic eye to deliver safe, natural results built entirely around you.",
  });
}

export default async function DrAymanTarekPage() {
  const [sections, specialties, testimonials, settings, schemaFlags, heroImages] = await Promise.all([
    getPageSections("dr-ayman-tarek"),
    getSpecialties(),
    getTestimonials("dr-ayman-tarek"),
    getSiteSettings(),
    getPageSeoSchemaFlags("dr-ayman-tarek"),
    getHeroImageConfig("dr-ayman-tarek"),
  ]);

  const clinicInfo = {
    en: { address: settings.addressEn, hours: settings.businessHours[0]?.value_en || "" },
    ar: { address: settings.addressAr, hours: settings.businessHours[0]?.value_ar || "" },
    phone: settings.phone,
  };

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: settings.doctorNameEn, description: "Consultant Plastic, Cosmetic & Reconstructive Surgeon" })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("dr-ayman-tarek", LANG))} />
          <JsonLd data={buildPhysicianSchema(settings, LANG, PATH)} />
        </>
      )}
      <DrAymanTarekContent sections={sections} specialties={specialties} testimonials={testimonials} clinicInfo={clinicInfo} heroImages={heroImages} />
    </>
  );
}
