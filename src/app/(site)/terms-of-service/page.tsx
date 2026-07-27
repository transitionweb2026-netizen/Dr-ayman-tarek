import type { Metadata } from "next";
import { LegalPagePlaceholder } from "@/components/sections/LegalPagePlaceholder";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return <LegalPagePlaceholder title="Terms of Service" />;
}
