import type { Metadata } from "next";
import { VideosContent } from "./VideosContent";
import { getPageSections, getVideos, getHeroImageConfig } from "@/server/repositories/content";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildBreadcrumbSchema, buildVideoObjectSchema } from "@/lib/seo/schema";
import { breadcrumbItems } from "@/lib/seo/pageRegistry";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/videos";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "videos",
    lang: LANG,
    path: PATH,
    fallbackTitle: "Videos",
    fallbackDescription: "Educational Videos & Patient Resources",
  });
}

export default async function VideosPage() {
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
              buildWebPageSchema({ path: PATH, lang: LANG, name: "Videos", description: "Educational Videos & Patient Resources" })
            }
          />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems("videos", LANG))} />
          {videos.map((video) => (
            <JsonLd
              key={video.id}
              data={buildVideoObjectSchema({
                name: video.en.title,
                description: video.en.shortDescription || video.en.description,
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
