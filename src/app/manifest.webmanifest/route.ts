import { getSiteSettings } from "@/server/repositories/settings";

// Route Handler, not the app/manifest.ts metadata-file convention — see the
// comment in sitemap.xml/route.ts for why (Next's next-metadata-route-loader
// breaks on this project's apostrophe-containing directory name).
export async function GET() {
  const settings = await getSiteSettings();
  const icons = settings.faviconUrl ? [{ src: settings.faviconUrl, sizes: "any", type: "image/png" }] : [];

  const manifest = {
    name: `${settings.doctorNameEn} — ${settings.clinicNameEn || "Neurosurgery & Neurology"}`,
    short_name: settings.doctorNameEn,
    description: settings.footerDescriptionEn || undefined,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0613",
    theme_color: "#0a0613",
    icons,
  };

  return Response.json(manifest, { headers: { "Content-Type": "application/manifest+json" } });
}
