"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";

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
  // Matches the inline blocking script in layout.tsx's <head>, which already
  // set document.documentElement.lang/dir synchronously before hydration —
  // this just brings React's own state in sync with what's already on the DOM.
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    applyDomDirection(language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* localStorage unavailable (private mode, etc.) — language just won't persist */
    }
  }, []);

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
