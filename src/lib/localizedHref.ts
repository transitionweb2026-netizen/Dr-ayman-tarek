import type { Language } from "@/i18n/LanguageProvider";

/** Prefixes/strips the /ar segment on a root-relative path so internal links
 * and the language switch always point at the real, crawlable per-language
 * URL (/services <-> /ar/services) rather than an unprefixed path that would
 * silently mismatch the page's declared language. */
export function localizedHref(pathname: string, lang: Language): string {
  const bare = pathname === "/ar" || pathname.startsWith("/ar/") ? pathname.slice(3) || "/" : pathname;
  if (lang === "en") return bare;
  return bare === "/" ? "/ar" : `/ar${bare}`;
}

export function languageFromPathname(pathname: string): Language {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}
