"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";
import { localizedHref, languageFromPathname } from "@/lib/localizedHref";

export type Language = "en" | "ar";
/** Widens every literal string leaf to `string` so the ar dictionary (whose
 * values are naturally different literal strings from en) type-checks
 * against the same shape instead of en's own literal-string types. */
type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepStringify<U>[]
    : { readonly [K in keyof T]: DeepStringify<T[K]> };
export type Dictionary = DeepStringify<typeof en>;

const DICTIONARIES: Record<Language, Dictionary> = { en, ar };
const STORAGE_KEY = "language";

interface LanguageContextValue {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  /** Dot-path lookup into the active dictionary, e.g. t("nav.home"). String
   * leaves only — falls back to English, then the key itself, if missing. */
  t: (path: string) => string;
  /** Same dot-path lookup for array/object dictionary entries (testimonial
   * lists, FAQ items, service option lists, …) that t()'s string-only
   * contract can't return. Caller supplies the expected shape. */
  tRaw: <T = unknown>(path: string) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolve(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

function applyDomDirection(lang: Language) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // The URL is now the single source of truth for language (real /ar/*
  // routes exist — see localizedHref.ts), which is what makes the hreflang
  // tags in <head> and the actually-rendered content agree. The root
  // layout's <html lang/dir> is already server-rendered to match (via the
  // x-pathname header middleware sets), so there's nothing to patch after
  // hydration the way the old localStorage-guess version needed.
  const language: Language = languageFromPathname(pathname);

  useEffect(() => {
    applyDomDirection(language);
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* localStorage unavailable (private mode, etc.) — preference just won't persist */
    }
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;
      router.push(localizedHref(pathname, lang));
    },
    [language, pathname, router],
  );

  const t = useCallback(
    (path: string) => {
      const value = resolve(DICTIONARIES[language], path);
      if (typeof value === "string") return value;
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing translation for "${path}" (${language})`);
      }
      const fallback = resolve(DICTIONARIES.en, path);
      return typeof fallback === "string" ? fallback : path;
    },
    [language],
  );

  const tRaw = useCallback(
    <T,>(path: string): T => {
      const value = resolve(DICTIONARIES[language], path);
      if (value !== undefined) return value as T;
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing translation for "${path}" (${language})`);
      }
      return resolve(DICTIONARIES.en, path) as T;
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, dir: language === "ar" ? "rtl" : "ltr", setLanguage, t, tRaw }),
    [language, setLanguage, t, tRaw],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
