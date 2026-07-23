import "server-only";
import { createClient } from "@/lib/supabase/server";
import { mediaPublicUrl } from "./media";
import type { Tables } from "@/lib/supabase/database.types";

export type PageSlug = Tables<"pages">["slug"];

/** {en: {...}, ar: {...}} for one page's sections, keyed by section_key —
 * the shape every page Server wrapper hands to its Client content component. */
export async function getPageSections(slug: PageSlug): Promise<Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>> {
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).maybeSingle();
  if (!page) return {};
  const { data: sections, error } = await supabase
    .from("page_sections")
    .select("section_key, content")
    .eq("page_id", page.id)
    .eq("status", "published")
    .eq("is_visible", true);
  if (error) throw error;
  const map: Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }> = {};
  for (const row of sections) {
    const content = row.content as unknown as { en?: Record<string, unknown>; ar?: Record<string, unknown> };
    map[row.section_key] = { en: content?.en || {}, ar: content?.ar || {} };
  }
  return map;
}

export interface PageSeoData {
  seoTitleEn: string | null;
  seoTitleAr: string | null;
  seoDescriptionEn: string | null;
  seoDescriptionAr: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
}

export async function getPageSeo(slug: PageSlug): Promise<PageSeoData | null> {
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).maybeSingle();
  if (!page) return null;
  const { data: seo } = await supabase
    .from("page_seo")
    .select("*, media_assets!page_seo_og_image_media_id_fkey(storage_path)")
    .eq("page_id", page.id)
    .maybeSingle();
  if (!seo) return null;
  const ogAsset = (seo as unknown as { media_assets?: { storage_path: string } | null }).media_assets;
  return {
    seoTitleEn: seo.seo_title_en,
    seoTitleAr: seo.seo_title_ar,
    seoDescriptionEn: seo.seo_description_en,
    seoDescriptionAr: seo.seo_description_ar,
    canonicalUrl: seo.canonical_url,
    ogImageUrl: ogAsset ? mediaPublicUrl(ogAsset.storage_path) : null,
  };
}

function resolveImage(mediaPath: string | null | undefined, fallbackUrl: string | null): string {
  if (mediaPath) return mediaPublicUrl(mediaPath);
  return fallbackUrl || "";
}

export interface BilingualService {
  id: string; slug: string; image: string; icon: string | null;
  en: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null; benefits: string[]; process: string[] };
  ar: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null; benefits: string[]; process: string[] };
}

export async function getServices(): Promise<BilingualService[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, media_assets(storage_path), service_benefits(text_en, text_ar, display_order), service_process_steps(text_en, text_ar, display_order)")
    .eq("status", "published")
    .order("display_order");
  if (error) throw error;
  return (data as unknown as Array<Record<string, unknown>>).map((row) => {
    const media = row.media_assets as { storage_path: string } | null;
    const benefits = (row.service_benefits as { text_en: string; text_ar: string; display_order: number }[]) || [];
    const steps = (row.service_process_steps as { text_en: string; text_ar: string; display_order: number }[]) || [];
    const sortedBenefits = [...benefits].sort((a, b) => a.display_order - b.display_order);
    const sortedSteps = [...steps].sort((a, b) => a.display_order - b.display_order);
    return {
      id: row.id as string,
      slug: row.slug as string,
      image: resolveImage(media?.storage_path, row.image_url as string | null),
      icon: row.icon as string | null,
      en: {
        title: row.title_en as string, shortDescription: row.short_description_en as string, description: row.full_description_en as string,
        recovery: row.recovery_en as string | null, duration: row.duration_en as string | null,
        benefits: sortedBenefits.map((b) => b.text_en), process: sortedSteps.map((s) => s.text_en),
      },
      ar: {
        title: row.title_ar as string, shortDescription: row.short_description_ar as string, description: row.full_description_ar as string,
        recovery: row.recovery_ar as string | null, duration: row.duration_ar as string | null,
        benefits: sortedBenefits.map((b) => b.text_ar), process: sortedSteps.map((s) => s.text_ar),
      },
    };
  });
}

export interface BilingualSpecialty {
  id: string; slug: string; image: string;
  en: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null };
  ar: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null };
}

export async function getSpecialties(): Promise<BilingualSpecialty[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("specialties").select("*, media_assets(storage_path)").eq("status", "published").order("display_order");
  if (error) throw error;
  return (data as unknown as Array<Record<string, unknown>>).map((row) => {
    const media = row.media_assets as { storage_path: string } | null;
    return {
      id: row.id as string,
      slug: row.slug as string,
      image: resolveImage(media?.storage_path, row.image_url as string | null),
      en: { title: row.title_en as string, shortDescription: row.short_description_en as string, description: row.description_en as string, recovery: row.recovery_en as string | null, duration: row.duration_en as string | null },
      ar: { title: row.title_ar as string, shortDescription: row.short_description_ar as string, description: row.description_ar as string, recovery: row.recovery_ar as string | null, duration: row.duration_ar as string | null },
    };
  });
}

export interface BilingualVideo {
  id: string; slug: string; thumbnail: string; youtubeUrl: string; duration: string | null; featured: boolean;
  en: { title: string; shortDescription: string; description: string; category: string | null; date: string };
  ar: { title: string; shortDescription: string; description: string; category: string | null; date: string };
}

export async function getVideos(): Promise<BilingualVideo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("videos").select("*, media_assets(storage_path)").eq("status", "published").order("display_order");
  if (error) throw error;
  return (data as unknown as Array<Record<string, unknown>>).map((row) => {
    const media = row.media_assets as { storage_path: string } | null;
    const date = row.published_at ? new Date(row.published_at as string).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
    return {
      id: row.id as string,
      slug: row.slug as string,
      thumbnail: resolveImage(media?.storage_path, row.thumbnail_url as string | null),
      youtubeUrl: row.youtube_url as string,
      duration: row.duration as string | null,
      featured: row.is_featured as boolean,
      en: { title: row.title_en as string, shortDescription: row.short_description_en as string, description: row.description_en as string, category: row.category_en as string | null, date },
      ar: { title: row.title_ar as string, shortDescription: row.short_description_ar as string, description: row.description_ar as string, category: row.category_ar as string | null, date },
    };
  });
}

export interface BilingualArticle {
  id: string; slug: string; image: string; featured: boolean; readingTime: number | null;
  en: { title: string; excerpt: string; category: string | null; date: string };
  ar: { title: string; excerpt: string; category: string | null; date: string };
}

export async function getArticles(): Promise<BilingualArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, media_assets!blog_posts_featured_image_media_id_fkey(storage_path)")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data as unknown as Array<Record<string, unknown>>).map((row) => {
    const media = row.media_assets as { storage_path: string } | null;
    const date = row.published_at ? new Date(row.published_at as string).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
    return {
      id: row.id as string,
      slug: row.slug as string,
      image: resolveImage(media?.storage_path, row.featured_image_url as string | null),
      featured: row.is_featured as boolean,
      readingTime: row.reading_time_minutes as number | null,
      en: { title: row.title_en as string, excerpt: row.excerpt_en as string, category: row.category_en as string | null, date },
      ar: { title: row.title_ar as string, excerpt: row.excerpt_ar as string, category: row.category_ar as string | null, date },
    };
  });
}

export interface BilingualFaqItem {
  id: string;
  en: { question: string; answer: string };
  ar: { question: string; answer: string };
}

export async function getFaqItems(category: "general" | "contact"): Promise<BilingualFaqItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faq_items").select("*").eq("status", "published").eq("category", category).order("display_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    en: { question: row.question_en, answer: row.answer_en },
    ar: { question: row.question_ar, answer: row.answer_ar },
  }));
}

export interface BilingualTestimonial {
  id: string; patientName: string; country: string | null; rating: number; photo: string | null;
  en: { role: string | null; quote: string };
  ar: { role: string | null; quote: string };
}

export async function getTestimonials(placement: string): Promise<BilingualTestimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*, media_assets(storage_path)")
    .eq("status", "published")
    .contains("placements", [placement])
    .order("display_order");
  if (error) throw error;
  return (data as unknown as Array<Record<string, unknown>>).map((row) => {
    const media = row.media_assets as { storage_path: string } | null;
    return {
      id: row.id as string,
      patientName: row.patient_name as string,
      country: row.country as string | null,
      rating: row.rating as number,
      photo: media ? mediaPublicUrl(media.storage_path) : null,
      en: { role: row.role_en as string | null, quote: row.review_en as string },
      ar: { role: row.role_ar as string | null, quote: row.review_ar as string },
    };
  });
}
