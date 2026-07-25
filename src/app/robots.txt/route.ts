import { absoluteUrl } from "@/lib/seo/site";

// Route Handler, not the app/robots.ts metadata-file convention — see the
// comment in sitemap.xml/route.ts for why (Next's next-metadata-route-loader
// breaks on this project's apostrophe-containing directory name).
export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
