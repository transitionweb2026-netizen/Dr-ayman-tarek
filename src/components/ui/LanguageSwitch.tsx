"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";

interface LanguageSwitchProps {
  className?: string;
  /** "sm" for the compact header slot, "lg" for the roomier mobile drawer. */
  size?: "sm" | "lg";
}

/**
 * Premium glassmorphism segmented language switch. The active pill uses a
 * shared layoutId (not a hardcoded left/right transform) so it correctly
 * tracks whichever button is active even when flexbox visually reorders
 * the two buttons under dir="rtl" — a plain x-offset would end up on the
 * wrong side once the site flips direction.
 */
export function LanguageSwitch({ className, size = "sm" }: LanguageSwitchProps) {
  const { language, setLanguage, t } = useLanguage();
  const isLg = size === "lg";

  return (
    <div
      role="group"
      aria-label={t("languageSwitch.groupLabel")}
      className={cn(
        "glass inline-flex items-center rounded-full p-1",
        isLg ? "gap-1" : "gap-0.5",
        className,
      )}
    >
      {(["en", "ar"] as const).map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            aria-label={lang === "en" ? t("languageSwitch.switchToEnglish") : t("languageSwitch.switchToArabic")}
            className={cn(
              "relative rounded-full font-bold transition-colors duration-300 ease-premium",
              isLg ? "min-w-[64px] px-5 py-2.5 text-body" : "min-w-[44px] px-3.5 py-1.5 text-small",
              active ? "text-white" : "text-on-surface-variant hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId="language-switch-pill"
                className="absolute inset-0 rounded-full bg-gradient-brand shadow-glow"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{lang === "en" ? t("languageSwitch.en") : t("languageSwitch.ar")}</span>
          </button>
        );
      })}
    </div>
  );
}
