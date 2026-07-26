import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { mediaPublicUrl } from "./media";
import type { Tables } from "@/lib/supabase/database.types";

export type PageSlug = Tables<"pages">["slug"];

/** {en: {...}, ar: {...}} for one page's sections, keyed by section_key —
 * the shape every page Server wrapper hands to its Client content component. */
export const getPageSections = cache(async function getPageSections(
  slug: PageSlug,
): Promise<Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>> {
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
});

/** Same default photo every hero already used pre-CMS — the fallback when a
 * page's hero section has no desktop image configured yet, so an
 * unconfigured hero still renders exactly as it always has (never a broken
 * image). Kept as the single shared default rather than per-page copies. */
const DEFAULT_HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCzisrET4Qkk8YLXGhJ2mVo7nKTWW63hoguCebr-wvWBiXwpBJCiMlxUIeY5UZjBMIo_6euqQYrIjaosvUv3eFdDQM3CvsV_XbLZcyymmvgQFyZfgFDW2OrQVXrD-Z2Q5eZ0pUi5c0_quGDB2PhTRff6XEfa35aYt2iTFghaDbo-OS8YixuEWh-6KrSyqJgSHDtlYajwgDYJolToQH1MvTWYbjrIvgsOGpPbIfnGk2q6zdT69oefoMw";

export type HeroImageStrategy = "auto" | "manual";
export type HeroSubjectPosition = "auto" | "left" | "center" | "right";
export type HeroCropMode = "smart" | "cover" | "contain";
export type HeroOverlayGradientMode = "auto" | "left" | "right" | "radial" | "none";

export interface HeroImageConfig {
  desktopImageUrl: string;
  tabletImageUrl: string;
  mobileImageUrl: string;
  desktopAltEn: string;
  desktopAltAr: string;
  mobileAltEn: string;
  mobileAltAr: string;

  /** "auto" (default): the Smart Hero engine (src/lib/heroLayout.ts) picks
   * content side, crop, and safe text width from the focus point below —
   * any uploaded photo works without prep. "manual": ignore all of that and
   * render the hero's original fixed-left, fixed-width composition — a
   * guaranteed escape hatch back to the pre-smart-hero behavior. */
  imageStrategy: HeroImageStrategy;
  /** "auto" derives the subject's side from Desktop Focus X; pin it explicitly if the auto zone guess is wrong. */
  subjectPosition: HeroSubjectPosition;
  /** 0-100, where the subject sits in the photo. (50, 50) = dead center. */
  desktopFocusX: number;
  desktopFocusY: number;
  mobileFocusX: number;
  mobileFocusY: number;
  /** 0-40. How much extra clearance to reserve around the subject — larger = narrower, safer text column. */
  faceSafeMarginPct: number;
  /** 0-100 or null. Manual override for the text column's max-width (% of the hero frame); null = auto-computed. */
  safeTextAreaPct: number | null;
  /** "smart" (default): auto-push the crop and zoom slightly when the subject is centered, to open a clear text zone. "cover"/"contain": plain CSS object-fit, no auto-adjustment. */
  cropMode: HeroCropMode;
  /** "auto" (default): gradient darkens whichever side the text lands on. Pin a direction, "radial", or "none" to override. */
  overlayGradient: HeroOverlayGradientMode;
  /** -20 to 20. Fine-tune nudge on top of the computed safe text width. */
  contentOffsetPct: number;
  /** 30-65. Target text-column width (% of the hero frame) the auto system aims for. */
  heroBalance: number;

  /** 1 = 100%, no zoom — manual-strategy zoom, or the floor the auto engine may zoom past. */
  desktopScale: number;
  mobileScale: number;

  /** 0-100. Extra flat tint on top of the hero's own built-in gradient —
   * 0 (default) is a no-op, the existing gradient treatment is untouched. */
  overlayOpacity: number;
  /** px. 0 (default) = no blur, image stays crisp. */
  overlayBlur: number;
  /** Optional ambient layer behind the doctor image — null (default) renders nothing, so this is purely additive. */
  backgroundImageUrl: string | null;
  backgroundOpacity: number;
  backgroundBlur: number;
  /** Glow orbs / dot-grid / holographic overlay. Default true (current behavior). */
  showDecorations: boolean;
}

const HERO_IMAGE_DEFAULTS: Omit<HeroImageConfig, "desktopImageUrl" | "tabletImageUrl" | "mobileImageUrl"> = {
  desktopAltEn: "", desktopAltAr: "", mobileAltEn: "", mobileAltAr: "",
  imageStrategy: "auto",
  subjectPosition: "auto",
  desktopFocusX: 50, desktopFocusY: 25, mobileFocusX: 50, mobileFocusY: 25,
  faceSafeMarginPct: 8,
  safeTextAreaPct: null,
  cropMode: "smart",
  overlayGradient: "auto",
  contentOffsetPct: 0,
  heroBalance: 45,
  desktopScale: 1, mobileScale: 1,
  overlayOpacity: 0, overlayBlur: 0,
  backgroundImageUrl: null, backgroundOpacity: 40, backgroundBlur: 0,
  showDecorations: true,
};

function numOr<T>(value: unknown, fallback: T): number | T {
  const n = Number(value);
  return Number.isFinite(n) && value !== "" && value !== null && value !== undefined ? n : fallback;
}
function strOr(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}
function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** Hero image + composition config for one page — separate from
 * getPageSections()'s generic text content because it needs an extra
 * media_assets lookup to resolve stored media IDs into public URLs.
 * Reuses getPageSections() (React-cache()-deduped) rather than re-querying
 * page_sections, so this never costs a second round trip for the same page
 * within one request. All "shared" (non-bilingual) fields are read from the
 * English side of the hero section — the admin form writes the same value
 * to both languages, matching the rest of this CMS's "shared field" pattern. */
export const getHeroImageConfig = cache(async function getHeroImageConfig(slug: PageSlug): Promise<HeroImageConfig> {
  const sections = await getPageSections(slug);
  const hero = sections.hero?.en || {};
  const heroAr = sections.hero?.ar || {};

  const mediaIds = [hero.desktopImageId, hero.tabletImageId, hero.mobileImageId, hero.backgroundImageId].filter(
    (id): id is string => typeof id === "string" && id.length > 0,
  );

  let mediaUrls: Record<string, string> = {};
  if (mediaIds.length > 0) {
    const supabase = await createClient();
    const { data } = await supabase.from("media_assets").select("id, storage_path").in("id", mediaIds);
    mediaUrls = Object.fromEntries((data || []).map((row) => [row.id, mediaPublicUrl(row.storage_path)]));
  }
  const resolve = (id: unknown) => (typeof id === "string" && mediaUrls[id] ? mediaUrls[id] : null);

  const desktopImageUrl = resolve(hero.desktopImageId) || DEFAULT_HERO_IMAGE_URL;
  const mobileImageUrl = resolve(hero.mobileImageId) || desktopImageUrl;
  const tabletImageUrl = resolve(hero.tabletImageId) || desktopImageUrl;

  return {
    desktopImageUrl,
    tabletImageUrl,
    mobileImageUrl,
    desktopAltEn: strOr(hero.desktopAlt, HERO_IMAGE_DEFAULTS.desktopAltEn),
    desktopAltAr: strOr(heroAr.desktopAlt, HERO_IMAGE_DEFAULTS.desktopAltAr),
    mobileAltEn: strOr(hero.mobileAlt, HERO_IMAGE_DEFAULTS.mobileAltEn),
    mobileAltAr: strOr(heroAr.mobileAlt, HERO_IMAGE_DEFAULTS.mobileAltAr),
    imageStrategy: oneOf(hero.imageStrategy, ["auto", "manual"] as const, HERO_IMAGE_DEFAULTS.imageStrategy),
    subjectPosition: oneOf(hero.subjectPosition, ["auto", "left", "center", "right"] as const, HERO_IMAGE_DEFAULTS.subjectPosition),
    desktopFocusX: numOr(hero.desktopFocusX, HERO_IMAGE_DEFAULTS.desktopFocusX),
    desktopFocusY: numOr(hero.desktopFocusY, HERO_IMAGE_DEFAULTS.desktopFocusY),
    mobileFocusX: numOr(hero.mobileFocusX, HERO_IMAGE_DEFAULTS.mobileFocusX),
    mobileFocusY: numOr(hero.mobileFocusY, HERO_IMAGE_DEFAULTS.mobileFocusY),
    faceSafeMarginPct: numOr(hero.faceSafeMarginPct, HERO_IMAGE_DEFAULTS.faceSafeMarginPct),
    safeTextAreaPct: numOr(hero.safeTextAreaPct, null),
    cropMode: oneOf(hero.cropMode, ["smart", "cover", "contain"] as const, HERO_IMAGE_DEFAULTS.cropMode),
    overlayGradient: oneOf(hero.overlayGradient, ["auto", "left", "right", "radial", "none"] as const, HERO_IMAGE_DEFAULTS.overlayGradient),
    contentOffsetPct: numOr(hero.contentOffsetPct, HERO_IMAGE_DEFAULTS.contentOffsetPct),
    heroBalance: numOr(hero.heroBalance, HERO_IMAGE_DEFAULTS.heroBalance),
    desktopScale: numOr(hero.desktopScale, HERO_IMAGE_DEFAULTS.desktopScale),
    mobileScale: numOr(hero.mobileScale, HERO_IMAGE_DEFAULTS.mobileScale),
    overlayOpacity: numOr(hero.overlayOpacity, HERO_IMAGE_DEFAULTS.overlayOpacity),
    overlayBlur: numOr(hero.overlayBlur, HERO_IMAGE_DEFAULTS.overlayBlur),
    backgroundImageUrl: resolve(hero.backgroundImageId),
    backgroundOpacity: numOr(hero.backgroundOpacity, HERO_IMAGE_DEFAULTS.backgroundOpacity),
    backgroundBlur: numOr(hero.backgroundBlur, HERO_IMAGE_DEFAULTS.backgroundBlur),
    showDecorations: hero.showDecorations === false ? false : HERO_IMAGE_DEFAULTS.showDecorations,
  };
});

export interface PageSeoData {
  seoTitleEn: string | null;
  seoTitleAr: string | null;
  seoDescriptionEn: string | null;
  seoDescriptionAr: string | null;
  keywordsEn: string[];
  keywordsAr: string[];
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  twitterImageUrl: string | null;
  schemaJsonld: Record<string, unknown> | null;
  focusKeywordEn: string | null;
  focusKeywordAr: string | null;
  ogTitleEn: string | null;
  ogTitleAr: string | null;
  ogDescriptionEn: string | null;
  ogDescriptionAr: string | null;
  twitterTitleEn: string | null;
  twitterTitleAr: string | null;
  twitterDescriptionEn: string | null;
  twitterDescriptionAr: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaEnabled: boolean;
}

export const getPageSeo = cache(async function getPageSeo(slug: PageSlug): Promise<PageSeoData | null> {
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).maybeSingle();
  if (!page) return null;
  const { data: seo } = await supabase
    .from("page_seo")
    .select(
      "*, og_image:media_assets!page_seo_og_image_media_id_fkey(storage_path), twitter_image:media_assets!page_seo_twitter_image_media_id_fkey(storage_path)",
    )
    .eq("page_id", page.id)
    .maybeSingle();
  if (!seo) return null;
  const row = seo as unknown as Record<string, unknown>;
  const ogAsset = row.og_image as { storage_path: string } | null;
  const twitterAsset = row.twitter_image as { storage_path: string } | null;
  return {
    seoTitleEn: row.seo_title_en as string | null,
    seoTitleAr: row.seo_title_ar as string | null,
    seoDescriptionEn: row.seo_description_en as string | null,
    seoDescriptionAr: row.seo_description_ar as string | null,
    keywordsEn: (row.keywords_en as string[]) || [],
    keywordsAr: (row.keywords_ar as string[]) || [],
    canonicalUrl: row.canonical_url as string | null,
    ogImageUrl: ogAsset ? mediaPublicUrl(ogAsset.storage_path) : null,
    twitterImageUrl: twitterAsset ? mediaPublicUrl(twitterAsset.storage_path) : null,
    schemaJsonld: (row.schema_jsonld as Record<string, unknown> | null) || null,
    focusKeywordEn: row.focus_keyword_en as string | null,
    focusKeywordAr: row.focus_keyword_ar as string | null,
    ogTitleEn: row.og_title_en as string | null,
    ogTitleAr: row.og_title_ar as string | null,
    ogDescriptionEn: row.og_description_en as string | null,
    ogDescriptionAr: row.og_description_ar as string | null,
    twitterTitleEn: row.twitter_title_en as string | null,
    twitterTitleAr: row.twitter_title_ar as string | null,
    twitterDescriptionEn: row.twitter_description_en as string | null,
    twitterDescriptionAr: row.twitter_description_ar as string | null,
    robotsIndex: row.robots_index as boolean,
    robotsFollow: row.robots_follow as boolean,
    schemaEnabled: row.schema_enabled as boolean,
  };
});

function resolveImage(mediaPath: string | null | undefined, fallbackUrl: string | null): string {
  if (mediaPath) return mediaPublicUrl(mediaPath);
  return fallbackUrl || "";
}

export interface BilingualService {
  id: string; slug: string; image: string; icon: string | null;
  en: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null; benefits: string[]; process: string[] };
  ar: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null; benefits: string[]; process: string[] };
}

export const getServices = cache(async function getServices(): Promise<BilingualService[]> {
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
});

export interface BilingualSpecialty {
  id: string; slug: string; image: string;
  en: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null };
  ar: { title: string; shortDescription: string; description: string; recovery: string | null; duration: string | null };
}

export const getSpecialties = cache(async function getSpecialties(): Promise<BilingualSpecialty[]> {
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
});

export interface BilingualVideo {
  id: string; slug: string; thumbnail: string; youtubeUrl: string; duration: string | null; featured: boolean;
  publishedAtIso: string | null;
  en: { title: string; shortDescription: string; description: string; category: string | null; date: string };
  ar: { title: string; shortDescription: string; description: string; category: string | null; date: string };
}

export const getVideos = cache(async function getVideos(): Promise<BilingualVideo[]> {
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
      publishedAtIso: row.published_at as string | null,
      en: { title: row.title_en as string, shortDescription: row.short_description_en as string, description: row.description_en as string, category: row.category_en as string | null, date },
      ar: { title: row.title_ar as string, shortDescription: row.short_description_ar as string, description: row.description_ar as string, category: row.category_ar as string | null, date },
    };
  });
});

export interface BilingualArticle {
  id: string; slug: string; image: string; featured: boolean; readingTime: number | null;
  en: { title: string; excerpt: string; category: string | null; date: string };
  ar: { title: string; excerpt: string; category: string | null; date: string };
}

export const getArticles = cache(async function getArticles(): Promise<BilingualArticle[]> {
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
});

export interface BlogPostSeo {
  seoTitleEn: string | null; seoTitleAr: string | null;
  seoDescriptionEn: string | null; seoDescriptionAr: string | null;
  focusKeywordEn: string | null; focusKeywordAr: string | null;
  keywordsEn: string[]; keywordsAr: string[];
  canonicalUrl: string | null;
  ogTitleEn: string | null; ogTitleAr: string | null;
  ogDescriptionEn: string | null; ogDescriptionAr: string | null;
  ogImageUrl: string | null;
  twitterTitleEn: string | null; twitterTitleAr: string | null;
  twitterDescriptionEn: string | null; twitterDescriptionAr: string | null;
  twitterImageUrl: string | null;
  robotsIndex: boolean; robotsFollow: boolean; schemaEnabled: boolean;
}

export interface BlogPostDetail {
  id: string; slug: string; image: string; readingTime: number | null;
  authorName: string | null; authorAvatarUrl: string | null;
  publishedAt: string | null; updatedAt: string;
  en: { title: string; excerpt: string; category: string | null; contentJson: unknown };
  ar: { title: string; excerpt: string; category: string | null; contentJson: unknown };
  seo: BlogPostSeo;
}

/** Full single-post payload for the blog detail route — separate from
 * getArticles()'s lighter BilingualArticle (grid cards don't need rich-text
 * body or the full SEO field set). */
export const getArticleBySlug = cache(async function getArticleBySlug(slug: string): Promise<BlogPostDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "*, featured_image:media_assets!blog_posts_featured_image_media_id_fkey(storage_path), author_avatar:media_assets!blog_posts_author_avatar_media_id_fkey(storage_path), og_image:media_assets!blog_posts_og_image_media_id_fkey(storage_path), twitter_image:media_assets!blog_posts_twitter_image_media_id_fkey(storage_path)",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = data as unknown as Record<string, unknown>;
  const featuredImage = row.featured_image as { storage_path: string } | null;
  const authorAvatar = row.author_avatar as { storage_path: string } | null;
  const ogAsset = row.og_image as { storage_path: string } | null;
  const twitterAsset = row.twitter_image as { storage_path: string } | null;
  return {
    id: row.id as string,
    slug: row.slug as string,
    image: resolveImage(featuredImage?.storage_path, row.featured_image_url as string | null),
    readingTime: row.reading_time_minutes as number | null,
    authorName: row.author_name as string | null,
    authorAvatarUrl: authorAvatar ? mediaPublicUrl(authorAvatar.storage_path) : null,
    publishedAt: row.published_at as string | null,
    updatedAt: row.updated_at as string,
    en: { title: row.title_en as string, excerpt: row.excerpt_en as string, category: row.category_en as string | null, contentJson: row.content_en },
    ar: { title: row.title_ar as string, excerpt: row.excerpt_ar as string, category: row.category_ar as string | null, contentJson: row.content_ar },
    seo: {
      seoTitleEn: row.seo_title_en as string | null, seoTitleAr: row.seo_title_ar as string | null,
      seoDescriptionEn: row.seo_description_en as string | null, seoDescriptionAr: row.seo_description_ar as string | null,
      focusKeywordEn: row.focus_keyword_en as string | null, focusKeywordAr: row.focus_keyword_ar as string | null,
      keywordsEn: (row.keywords_en as string[]) || [], keywordsAr: (row.keywords_ar as string[]) || [],
      canonicalUrl: row.canonical_url as string | null,
      ogTitleEn: row.og_title_en as string | null, ogTitleAr: row.og_title_ar as string | null,
      ogDescriptionEn: row.og_description_en as string | null, ogDescriptionAr: row.og_description_ar as string | null,
      ogImageUrl: ogAsset ? mediaPublicUrl(ogAsset.storage_path) : null,
      twitterTitleEn: row.twitter_title_en as string | null, twitterTitleAr: row.twitter_title_ar as string | null,
      twitterDescriptionEn: row.twitter_description_en as string | null, twitterDescriptionAr: row.twitter_description_ar as string | null,
      twitterImageUrl: twitterAsset ? mediaPublicUrl(twitterAsset.storage_path) : null,
      robotsIndex: row.robots_index as boolean, robotsFollow: row.robots_follow as boolean, schemaEnabled: row.schema_enabled as boolean,
    },
  };
});

export interface BilingualFaqItem {
  id: string;
  en: { question: string; answer: string };
  ar: { question: string; answer: string };
}

export const getFaqItems = cache(async function getFaqItems(category: "general" | "contact"): Promise<BilingualFaqItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faq_items").select("*").eq("status", "published").eq("category", category).order("display_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    en: { question: row.question_en, answer: row.answer_en },
    ar: { question: row.question_ar, answer: row.answer_ar },
  }));
});

export interface BilingualTestimonial {
  id: string; patientName: string; country: string | null; rating: number; photo: string | null;
  en: { role: string | null; quote: string };
  ar: { role: string | null; quote: string };
}

export const getTestimonials = cache(async function getTestimonials(placement: string): Promise<BilingualTestimonial[]> {
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
});
