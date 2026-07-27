import type { Metadata } from "next";
import { LegalPagePlaceholder } from "@/components/sections/LegalPagePlaceholder";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPageArabic() {
  return <LegalPagePlaceholder title="سياسة الخصوصية" />;
}
