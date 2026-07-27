import type { Metadata } from "next";
import { LegalPagePlaceholder } from "@/components/sections/LegalPagePlaceholder";

export const metadata: Metadata = {
  title: "شروط الخدمة",
  robots: { index: false, follow: true },
};

export default function TermsOfServicePageArabic() {
  return <LegalPagePlaceholder title="شروط الخدمة" />;
}
