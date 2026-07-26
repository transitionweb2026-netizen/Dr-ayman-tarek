import type { Metadata } from "next";
import { DrAymanTarekContent } from "../../dr-ayman-tarek/DrAymanTarekContent";
import { getPageSections, getSpecialties, getTestimonials, getHeroImageConfig } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildPhysicianSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar/dr-ayman-tarek";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "dr-ayman-tarek",
    lang: LANG,
    path: PATH,
    fallbackTitle: "جراحة تجميلية",
    fallbackDescription: "د. أيمن طارق، استشاري جراحة التجميل والتقويم والترميم، يجمع بين الدقة الجراحية والعين الفنية لتقديم نتائج آمنة وطبيعية مصممة خصيصًا لك.",
  });
}

export default async function DrAymanTarekPageArabic() {
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
              buildWebPageSchema({ path: PATH, lang: LANG, name: settings.doctorNameAr, description: "استشاري جراحة التجميل والتقويم والترميم" })
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
