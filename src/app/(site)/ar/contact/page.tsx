import type { Metadata } from "next";
import { ContactContent } from "../../contact/ContactContent";
import { getPageSections, getFaqItems, getServices } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildFaqSchema, buildContactPageSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar/contact";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "contact",
    lang: LANG,
    path: PATH,
    fallbackTitle: "تواصل معنا",
    fallbackDescription: "نحن هنا لمساعدتك على اتخاذ الخطوة الأولى نحو صحة عصبية أفضل.",
  });
}

export default async function ContactPageArabic() {
  const [sections, settings, faqItems, services, schemaFlags] = await Promise.all([
    getPageSections("contact"),
    getSiteSettings(),
    getFaqItems("contact"),
    getServices(),
    getPageSeoSchemaFlags("contact"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "تواصل معنا", description: "نحن هنا لمساعدتك على اتخاذ الخطوة الأولى نحو صحة عصبية أفضل." })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("contact", LANG))} />
          <JsonLd data={buildContactPageSchema(settings, LANG, PATH)} />
          {(() => {
            const faqSchema = buildFaqSchema(faqItems.map((f) => ({ question: f.ar.question, answer: f.ar.answer })));
            return faqSchema ? <JsonLd data={faqSchema} /> : null;
          })()}
        </>
      )}
      <ContactContent
        sections={sections}
        settings={settings}
        faqItems={faqItems}
        services={services}
        generalConsultationLabel={{ en: "General Consultation", ar: "استشارة عامة" }}
        otherLabel={{ en: "Other", ar: "أخرى" }}
      />
    </>
  );
}
