import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { termsOfServiceContent } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "شروط الاستخدام | د. أيمن طارق",
  description: "الشروط التي تحكم استخدامك لموقع عيادة د. أيمن طارق.",
  robots: { index: false, follow: true },
};

export default function TermsOfServicePageArabic() {
  return <LegalPageContent content={termsOfServiceContent} />;
}
