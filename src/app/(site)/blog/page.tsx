import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";
import { getPageSections, getArticles, getHeroImageConfig } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/blog";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "blog",
    lang: LANG,
    path: PATH,
    fallbackTitle: "The Neurosurgery Blog",
    fallbackDescription: "Clear, expert perspectives on brain and spine care — from surgical breakthroughs to practical guidance for patients and families.",
  });
}

export default async function BlogPage() {
  const [sections, articles, schemaFlags, heroImages] = await Promise.all([
    getPageSections("blog"),
    getArticles(),
    getPageSeoSchemaFlags("blog"),
    getHeroImageConfig("blog"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "The Neurosurgery Blog", description: "Clear, expert perspectives on brain and spine care." })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("blog", LANG))} />
        </>
      )}
      <BlogContent sections={sections} articles={articles} heroImages={heroImages} />
    </>
  );
}
