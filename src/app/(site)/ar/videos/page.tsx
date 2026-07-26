import type { Metadata } from "next";
import { VideosContent } from "../../videos/VideosContent";
import { getPageSections, getVideos, getHeroImageConfig } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildVideoObjectSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar/videos";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "videos",
    lang: LANG,
    path: PATH,
    fallbackTitle: "الفيديوهات",
    fallbackDescription: "فيديوهات تعليمية وموارد للمرضى",
  });
}

export default async function VideosPageArabic() {
  const [sections, videos, schemaFlags, heroImages] = await Promise.all([
    getPageSections("videos"),
    getVideos(),
    getPageSeoSchemaFlags("videos"),
    getHeroImageConfig("videos"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({ path: PATH, lang: LANG, name: "الفيديوهات", description: "فيديوهات تعليمية وموارد للمرضى" })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("videos", LANG))} />
          {videos.map((video) => (
            <JsonLd
              key={video.id}
              data={buildVideoObjectSchema({
                name: video.ar.title,
                description: video.ar.shortDescription || video.ar.description,
                thumbnailUrl: video.thumbnail,
                uploadDate: video.publishedAtIso,
                duration: video.duration,
                embedUrl: video.youtubeUrl,
              })}
            />
          ))}
        </>
      )}
      <VideosContent sections={sections} videos={videos} heroImages={heroImages} />
    </>
  );
}
