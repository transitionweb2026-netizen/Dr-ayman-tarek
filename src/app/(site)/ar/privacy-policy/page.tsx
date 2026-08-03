import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { privacyPolicyContent } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | د. أيمن طارق",
  description: "كيف تقوم عيادة د. أيمن طارق بجمع بياناتك الشخصية واستخدامها وحمايتها.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPageArabic() {
  return <LegalPageContent content={privacyPolicyContent} />;
}
