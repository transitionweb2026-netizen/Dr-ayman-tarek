import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { getPageSections, getServices, getHeroImageConfig } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/services";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "services",
    lang: LANG,
    path: PATH,
    fallbackTitle: "Services",
    fallbackDescription: "Professional Neurosurgical Care & Advanced Medical Solutions",
  });
}

export default async function ServicesPage() {
  const [sections, services, schemaFlags, heroImages] = await Promise.all([
    getPageSections("services"),
    getServices(),
    getPageSeoSchemaFlags("services"),
    getHeroImageConfig("services"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "Services", description: "Professional Neurosurgical Care & Advanced Medical Solutions" })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("services", LANG))} />
        </>
      )}
      <ServicesContent sections={sections} services={services} heroImages={heroImages} />
    </>
  );
}
