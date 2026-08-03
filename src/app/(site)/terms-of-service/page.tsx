import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { termsOfServiceContent } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "Terms of Service | Dr. Ayman Tarek",
  description: "The terms governing your use of Dr. Ayman Tarek's clinic website.",
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return <LegalPageContent content={termsOfServiceContent} />;
}
