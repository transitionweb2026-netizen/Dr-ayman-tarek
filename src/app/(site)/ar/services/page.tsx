import type { Metadata } from "next";
import { ServicesContent } from "../../services/ServicesContent";
import { getPageSections, getServices } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar/services";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "services",
    lang: LANG,
    path: PATH,
    fallbackTitle: "الخدمات",
    fallbackDescription: "رعاية احترافية لجراحة المخ والأعصاب وحلول طبية متقدمة",
  });
}

export default async function ServicesPageArabic() {
  const [sections, services, schemaFlags] = await Promise.all([
    getPageSections("services"),
    getServices(),
    getPageSeoSchemaFlags("services"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "الخدمات", description: "رعاية احترافية لجراحة المخ والأعصاب وحلول طبية متقدمة" })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("services", LANG))} />
        </>
      )}
      <ServicesContent sections={sections} services={services} />
    </>
  );
}
