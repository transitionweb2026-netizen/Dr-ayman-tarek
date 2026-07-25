import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo/site";
import { PAGE_REGISTRY } from "@/lib/seo/pageRegistry";

const STATIC_PRIORITY: Record<string, number> = {
  home: 1,
  services: 0.9,
  "dr-ayman-tarek": 0.9,
  contact: 0.8,
  blog: 0.7,
  videos: 0.7,
};

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

interface Entry {
  url: string;
  lastModified?: string;
  changeFrequency: string;
  priority: number;
  alternates: { en: string; ar: string };
}

function entryXml(entry: Entry): string {
  const lastmod = entry.lastModified ? `\n    <lastmod>${entry.lastModified}</lastmod>` : "";
  return `  <url>
    <loc>${xmlEscape(entry.url)}</loc>${lastmod}
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(entry.alternates.en)}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${xmlEscape(entry.alternates.ar)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(entry.alternates.en)}" />
  </url>`;
}

/**
 * Implemented as a plain Route Handler (not the app/sitemap.ts metadata-file
 * convention) because Next's next-metadata-route-loader generates an error
 * message by string-embedding this project's absolute path, and that path
 * contains an apostrophe ("...doc'ayman tarek'...") which breaks out of the
 * loader's own generated string literal and fails the build — a Next.js
 * bug specific to that reserved-filename convention, not to this code.
 * Route Handlers compile through the normal pipeline and don't hit it.
 */
export async function GET() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("blog_posts").select("slug, updated_at").eq("status", "published");

  const entries: Entry[] = [];

  for (const [slug, page] of Object.entries(PAGE_REGISTRY)) {
    const enPath = page.path;
    const arPath = page.path === "/" ? "/ar" : `/ar${page.path}`;
    const alternates = { en: absoluteUrl(enPath), ar: absoluteUrl(arPath) };
    const priority = STATIC_PRIORITY[slug] ?? 0.6;
    entries.push({ url: absoluteUrl(enPath), changeFrequency: "weekly", priority, alternates });
    entries.push({ url: absoluteUrl(arPath), changeFrequency: "weekly", priority, alternates });
  }

  for (const post of posts || []) {
    const enPath = `/blog/${post.slug}`;
    const arPath = `/ar/blog/${post.slug}`;
    const alternates = { en: absoluteUrl(enPath), ar: absoluteUrl(arPath) };
    const lastModified = post.updated_at ? new Date(post.updated_at).toISOString() : undefined;
    entries.push({ url: absoluteUrl(enPath), lastModified, changeFrequency: "monthly", priority: 0.6, alternates });
    entries.push({ url: absoluteUrl(arPath), lastModified, changeFrequency: "monthly", priority: 0.6, alternates });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(entryXml).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
