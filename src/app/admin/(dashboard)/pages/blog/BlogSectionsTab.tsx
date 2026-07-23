"use client";

import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields } from "@/components/admin/sections/SectionFields";

export function BlogSectionsTab() {
  return (
    <div className="space-y-6">
      <SectionCard pageSlug="blog" sectionKey="hero" title="Hero">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
            { key: "cta", label: "Button label" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="blog" sectionKey="finalCta" title="Final CTA">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "heading", label: "Heading" },
            { key: "subtitle", label: "Subtitle", multiline: true },
          ]} />
        )}
      </SectionCard>
    </div>
  );
}
