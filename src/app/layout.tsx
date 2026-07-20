import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { PageTransition } from "@/components/motion/PageTransition";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

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
    <html lang="en" className={`dark ${manrope.variable}`}>
      {/* App Router root-layout <head> is the documented escape hatch for tags the
          Metadata API doesn't cover (icon-font stylesheet). The no-page-custom-font
          rule predates App Router and false-positives here. */}
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="app-mesh-bg bg-noise" aria-hidden />
        <SocialRail />
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
