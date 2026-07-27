import type { Metadata } from "next";
import { LegalPagePlaceholder } from "@/components/sections/LegalPagePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return <LegalPagePlaceholder title="Privacy Policy" />;
}
