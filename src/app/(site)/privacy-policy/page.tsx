import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { privacyPolicyContent } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Ayman Tarek",
  description: "How Dr. Ayman Tarek's clinic collects, uses, and protects your personal information.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return <LegalPageContent content={privacyPolicyContent} />;
}
