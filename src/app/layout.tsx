import type { Metadata } from "next";
import { Manrope, Cairo } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/server/repositories/settings";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Cairo: a premium, professional Arabic typeface with a wide weight range
// that reads at the same register as Manrope — used only when Arabic is
// active (see fontFamily.arabic in tailwind.config.ts), so English keeps
// its exact existing typography untouched.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// Runs before hydration so a returning Arabic user's <html> already has the
// right lang/dir before first paint — same FOUC-prevention pattern as a
// dark-mode blocking script. LanguageProvider's own effect keeps React
// state in sync with whatever this already set.
//
// Skips /admin: the dashboard is English/LTR-only by design (see
// AdminShell's own dir="ltr" reset), and without this guard a client-side
// navigation from an Arabic-flipped public page into /admin would carry
// the stale dir="rtl" attribute over since nothing else would reset it.
const languageInitScript = `
(function () {
  try {
    if (location.pathname.startsWith("/admin")) return;
    if (window.localStorage.getItem("language") === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    }
  } catch (e) {}
})();
`;

// Favicon is CMS-managed (Site Settings → General) — falls back to Next's
// default app icon handling when no favicon has been uploaded yet.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.doctorNameEn} | Elite Neurosurgery & Neurology`,
      template: `%s | ${settings.doctorNameEn}`,
    },
    description:
      "Dr. Ayman Tarek — global excellence in neurosurgery, spine care, and neuro-oncology. Precision surgery, life reimagined.",
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${manrope.variable} ${cairo.variable}`}>
      {/* App Router root-layout <head> is the documented escape hatch for tags the
          Metadata API doesn't cover (icon-font stylesheet, the language-init
          script). The no-page-custom-font rule predates App Router and
          false-positives on the font link below. */}
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
      </head>
      <body className="min-h-screen font-sans rtl:font-arabic antialiased">
        {/* reducedMotion="user" makes every motion.* component site-wide
            automatically honor the OS-level prefers-reduced-motion setting
            (swaps transform/scale animations for instant or opacity-only) —
            one place instead of gating each animation individually. */}
        <MotionConfig reducedMotion="user">
          {children}
          <Toaster theme="dark" position="top-center" richColors />
        </MotionConfig>
      </body>
    </html>
  );
}
