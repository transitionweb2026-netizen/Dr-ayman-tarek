import type { Metadata } from "next";
import { BlogContent } from "../../blog/BlogContent";
import { getPageSections, getArticles } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar/blog";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "blog",
    lang: LANG,
    path: PATH,
    fallbackTitle: "مدونة جراحة الأعصاب",
    fallbackDescription: "رؤى واضحة ومتخصصة حول رعاية المخ والعمود الفقري — من التطورات الجراحية إلى الإرشادات العملية للمرضى وأسرهم.",
  });
}

export default async function BlogPageArabic() {
  const [sections, articles, schemaFlags] = await Promise.all([
    getPageSections("blog"),
    getArticles(),
    getPageSeoSchemaFlags("blog"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "مدونة جراحة الأعصاب", description: "رؤى واضحة ومتخصصة حول رعاية المخ والعمود الفقري." })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("blog", LANG))} />
        </>
      )}
      <BlogContent sections={sections} articles={articles} />
    </>
  );
}
