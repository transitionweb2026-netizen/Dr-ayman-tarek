import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostDetail } from "./BlogPostDetail";
import { getArticleBySlug, getPageSections } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildBlogPostingSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getArticleBySlug(slug), getSiteSettings()]);
  if (!post) return {};
  const path = `/blog/${slug}`;
  return buildPageMetadata({
    lang: LANG,
    path,
    fallbackTitle: post.en.title,
    fallbackDescription: post.en.excerpt,
    settings,
    seoTitleEn: post.seo.seoTitleEn,
    seoTitleAr: post.seo.seoTitleAr,
    seoDescriptionEn: post.seo.seoDescriptionEn,
    seoDescriptionAr: post.seo.seoDescriptionAr,
    keywordsEn: post.seo.keywordsEn,
    keywordsAr: post.seo.keywordsAr,
    canonicalUrl: post.seo.canonicalUrl,
    ogTitleEn: post.seo.ogTitleEn,
    ogTitleAr: post.seo.ogTitleAr,
    ogDescriptionEn: post.seo.ogDescriptionEn,
    ogDescriptionAr: post.seo.ogDescriptionAr,
    ogImageUrl: post.seo.ogImageUrl || post.image,
    twitterTitleEn: post.seo.twitterTitleEn,
    twitterTitleAr: post.seo.twitterTitleAr,
    twitterDescriptionEn: post.seo.twitterDescriptionEn,
    twitterDescriptionAr: post.seo.twitterDescriptionAr,
    twitterImageUrl: post.seo.twitterImageUrl || post.image,
    robotsIndex: post.seo.robotsIndex,
    robotsFollow: post.seo.robotsFollow,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authorName: post.authorName,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, sections, settings] = await Promise.all([getArticleBySlug(slug), getPageSections("blog"), getSiteSettings()]);
  if (!post) notFound();

  const path = `/blog/${slug}`;

  return (
    <>
      {post.seo.schemaEnabled && (
        <>
          <JsonLd data={buildWebPageSchema({ path, lang: LANG, name: post.en.title, description: post.en.excerpt, dateModified: post.updatedAt })} />
          <JsonLd
            data={buildBreadcrumbSchema([
              ...breadcrumbItems("blog", LANG),
              { name: post.en.title, path },
            ])}
          />
          <JsonLd
            data={buildBlogPostingSchema({
              path,
              title: post.en.title,
              description: post.en.excerpt,
              imageUrl: post.image || null,
              authorName: post.authorName,
              publishedAt: post.publishedAt,
              updatedAt: post.updatedAt,
              lang: LANG,
              settings,
            })}
          />
        </>
      )}
      <BlogPostDetail post={post} sections={sections} />
    </>
  );
}
