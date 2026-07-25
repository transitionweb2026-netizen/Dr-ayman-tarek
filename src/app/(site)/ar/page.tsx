import type { Metadata } from "next";
import { HomeContent } from "../HomeContent";
import { getPageSections, getVideos, getArticles, getFaqItems, getTestimonials } from "@/server/repositories/content";
import { getSiteSettings } from "@/server/repositories/settings";
import { buildStaticPageMetadata, getPageSeoSchemaFlags } from "@/lib/seo/pageMetadata";
import { buildWebPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const LANG = "ar" as const;
const PATH = "/ar";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    slug: "home",
    lang: LANG,
    path: PATH,
    fallbackTitle: "د. أيمن طارق | التميز العالمي في جراحة الأعصاب",
    fallbackDescription: "رعاية عصبية متقدمة تجمع بين الدقة الروبوتية والخبرة السريرية العميقة. نتخصص في اضطرابات العمود الفقري المعقدة وأورام الجهاز العصبي.",
  });
}

export default async function HomePageArabic() {
  const [sections, videos, articles, faqItems, testimonials, settings, schemaFlags] = await Promise.all([
    getPageSections("home"),
    getVideos(),
    getArticles(),
    getFaqItems("general"),
    getTestimonials("home"),
    getSiteSettings(),
    getPageSeoSchemaFlags("home"),
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
                name: settings.doctorNameAr,
                description: "رعاية عصبية متقدمة تجمع بين الدقة الروبوتية والخبرة السريرية العميقة.",
              })
            }
          />
          {(() => {
            const faqSchema = buildFaqSchema(faqItems.map((f) => ({ question: f.ar.question, answer: f.ar.answer })));
            return faqSchema ? <JsonLd data={faqSchema} /> : null;
          })()}
        </>
      )}
      <HomeContent sections={sections} videos={videos} articles={articles} faqItems={faqItems} testimonials={testimonials} />
    </>
  );
}
