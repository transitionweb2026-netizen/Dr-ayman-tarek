import Link from "next/link";
import { NeonIcon } from "@/components/ui/NeonIcon";

/**
 * Root-level 404 — catches any path that doesn't match a route, including
 * /admin/* and anything under (site). Renders inside RootLayout (inherits
 * fonts/dark theme/globals automatically), but deliberately doesn't pull in
 * the public site's Header/Footer chrome (would need a CMS data fetch this
 * boundary shouldn't depend on) — a plain, on-brand standalone page is the
 * standard pattern for 404s. Kept in English: this boundary can be hit
 * before the URL-derived language context has anything meaningful to key
 * off (e.g. a typo'd path with no /ar prefix either way).
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-margin-mobile text-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-lowest via-background to-[#150a24]" />
      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
      <div className="relative z-10 max-w-md">
        <div className="icon-badge-neon mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
          <NeonIcon name="search_off" className="text-4xl" />
        </div>
        <h1 className="mb-3 text-hero text-white">Page not found</h1>
        <p className="mb-8 text-body-lg text-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="btn-primary px-9 py-4">
          <span className="relative">Back to homepage</span>
        </Link>
      </div>
    </div>
  );
}
