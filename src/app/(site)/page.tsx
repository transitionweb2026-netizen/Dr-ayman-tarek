import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";
import { getPageSections, getVideos, getArticles, getFaqItems, getTestimonials, getHeroImageConfig } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "en" as const;
const PATH = "/";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "home",
    lang: LANG,
    path: PATH,
    fallbackTitle: "Dr. Ayman Tarek | Elite Neurosurgery & Neurology",
    fallbackDescription:
      "Advanced neurological care combining robotic precision with deep clinical expertise. We specialize in complex spinal disorders and neuro-oncology.",
  });
}

export default async function HomePage() {
  const [sections, videos, articles, faqItems, testimonials, settings, schemaFlags, heroImages] = await Promise.all([
    getPageSections("home"),
    getVideos(),
    getArticles(),
    getFaqItems("general"),
    getTestimonials("home"),
    getSiteSettings(),
    getPageSeoSchemaFlags("home"),
    getHeroImageConfig("home"),
  ]);

  return (
    <>
      {schemaFlags.schemaEnabled && (
        <>
          <JsonLd
            data={
              schemaFlags.schemaJsonld ||
              buildWebPageSchema({
                path: PATH,
                lang: LANG,
                name: settings.doctorNameEn,
                description: "Advanced neurological care combining robotic precision with deep clinical expertise.",
              })
            }
          />
          {(() => {
            const faqSchema = buildFaqSchema(faqItems.map((f) => ({ question: f.en.question, answer: f.en.answer })));
            return faqSchema ? <JsonLd data={faqSchema} /> : null;
          })()}
        </>
      )}
      <HomeContent sections={sections} videos={videos} articles={articles} faqItems={faqItems} testimonials={testimonials} heroImages={heroImages} />
    </>
  );
}
