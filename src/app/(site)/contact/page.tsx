import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";
import { getPageSections, getFaqItems, getServices, getHeroImageConfig } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildFaqSchema, buildContactPageSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "contact",
    lang: LANG,
    path: PATH,
    fallbackTitle: "Contact Us",
    fallbackDescription: "We're here to help you take the first step toward better neurological health.",
  });
}

export default async function ContactPage() {
  const [sections, settings, faqItems, services, schemaFlags, heroImages] = await Promise.all([
    getPageSections("contact"),
    getSiteSettings(),
    getFaqItems("contact"),
    getServices(),
    getPageSeoSchemaFlags("contact"),
    getHeroImageConfig("contact"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "Contact Us", description: "We're here to help you take the first step toward better neurological health." })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("contact", LANG))} />
          <JsonLd data={buildContactPageSchema(settings, LANG, PATH)} />
          {(() => {
            const faqSchema = buildFaqSchema(faqItems.map((f) => ({ question: f.en.question, answer: f.en.answer })));
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
        heroImages={heroImages}
      />
    </>
  );
}
