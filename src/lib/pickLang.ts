import type { Language } from "@/i18n/LanguageProvider";

type SectionMap = Record<string, { en: Record<string, unknown>; ar: Record<string, unknown> }>;

/** Picks one section's content for the active language, with a typed cast —
 * every page Content component uses this once per section instead of
 * re-deriving the en/ar-pick logic inline. Falls back to `{}` if the
 * section is missing (e.g. never saved in the CMS yet) so destructuring
 * with defaults downstream never throws. */
export function pickSection<T>(sections: SectionMap, key: string, language: Language): Partial<T> {
  const section = sections[key];
  if (!section) return {};
  return (language === "ar" ? section.ar : section.en) as Partial<T>;
}
