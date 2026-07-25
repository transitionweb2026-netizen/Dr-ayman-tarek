"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { languageFromPathname, localizedHref } from "@/lib/localizedHref";

/**
 * Client-side only, never in middleware/SSR — crawlers and anyone hitting a
 * URL directly always get exactly what that URL declares, so this can never
 * read as cloaking. One-directional and one-shot: if a returning visitor's
 * remembered language is Arabic but they've landed on an unprefixed
 * (English) URL, send them to the /ar equivalent once, on first mount of the
 * (site) shell. Deliberately does NOT redirect the other way (an explicit
 * visit to a /ar/... URL — e.g. a shared link — is a stronger signal than a
 * stale "en" in localStorage and should never be overridden), and never
 * re-checks after the first run, so it can't fight a language-switch click
 * later in the session.
 */
export function RememberedLanguageRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    try {
      const remembered = window.localStorage.getItem("language");
      if (remembered === "ar" && languageFromPathname(pathname) === "en") {
        router.replace(localizedHref(pathname, "ar"));
      }
    } catch {
      /* localStorage unavailable — no remembered preference to honor */
    }
    // Intentionally runs once per mount of the (site) shell, not on every
    // pathname change — see the doc comment above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
