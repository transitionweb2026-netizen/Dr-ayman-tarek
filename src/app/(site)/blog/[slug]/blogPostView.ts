import type { Language } from "@/i18n/LanguageProvider";
import type { BlogPostDetail as BlogPostDetailData } from "@/server/repositories/content";

/** No "use client" here — deliberately a separate module from
 * BlogPostDetail.tsx. That file is a Client Component, so every export from
 * it (including a plain helper function) is treated as client-only by
 * Next.js's RSC boundary rules; calling it directly from a Server Component
 * page.tsx throws at request time ("Attempted to call ... from the server
 * but ... is on the client"). Keeping the transform here, in a module with
 * no directive, makes it a normal function callable from either side. */
export interface BlogPostView {
  slug: string;
  image: string;
  readingTime: number | null;
  authorName: string | null;
  authorAvatarUrl: string | null;
  publishedAt: string | null;
  title: string;
  excerpt: string;
  category: string | null;
  contentHtml: string;
}

/** Called server-side in page.tsx with contentHtml already rendered via
 * renderRichTextHtml() (which imports @tiptap/core — never call this with
 * that still un-rendered on the client). */
export function toBlogPostView(post: BlogPostDetailData, lang: Language, contentHtml: string): BlogPostView {
  const copy = lang === "ar" ? post.ar : post.en;
  return {
    slug: post.slug,
    image: post.image,
    readingTime: post.readingTime,
    authorName: post.authorName,
    authorAvatarUrl: post.authorAvatarUrl,
    publishedAt: post.publishedAt,
    title: copy.title,
    excerpt: copy.excerpt,
    category: copy.category,
    contentHtml,
  };
}
