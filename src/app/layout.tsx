import type { Metadata } from "next";
import { Manrope, Cairo } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { PageTransition } from "@/components/motion/PageTransition";
import { LanguageProvider } from "@/i18n/LanguageProvider";

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
const languageInitScript = `
(function () {
  try {
    if (window.localStorage.getItem("language") === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Dr. Ayman Tarek | Elite Neurosurgery & Neurology",
    template: "%s | Dr. Ayman Tarek",
  },
  description:
    "Dr. Ayman Tarek — global excellence in neurosurgery, spine care, and neuro-oncology. Precision surgery, life reimagined.",
};

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
          <LanguageProvider>
            <div className="app-mesh-bg bg-noise" aria-hidden />
            <FloatingContactButtons />
            <Header />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
