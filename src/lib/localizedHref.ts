import type { Language } from "@/i18n/LanguageProvider";

/** True for anything that isn't a root-relative internal path — external
 * URLs (http/https), protocol-relative URLs, and non-navigational schemes
 * (mailto:, tel:, #fragment) — none of which should ever be prefixed with
 * /ar. Nav links are CMS-editable free text (nav_links.href), so this needs
 * to be checked, not assumed. */
function isExternalOrNonPath(href: string): boolean {
  return !href.startsWith("/") || href.startsWith("//");
}

/** Prefixes/strips the /ar segment on a root-relative path so internal links
 * and the language switch always point at the real, crawlable per-language
 * URL (/services <-> /ar/services) rather than an unprefixed path that would
 * silently mismatch the page's declared language. External URLs, mailto:,
 * tel:, and #fragments pass through untouched — prefixing "/ar" onto
 * "https://…" or "mailto:…" would produce a broken link. */
export function localizedHref(pathname: string, lang: Language): string {
  if (isExternalOrNonPath(pathname)) return pathname;
  const bare = pathname === "/ar" || pathname.startsWith("/ar/") ? pathname.slice(3) || "/" : pathname;
  if (lang === "en") return bare;
  return bare === "/" ? "/ar" : `/ar${bare}`;
}

export function languageFromPathname(pathname: string): Language {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}
