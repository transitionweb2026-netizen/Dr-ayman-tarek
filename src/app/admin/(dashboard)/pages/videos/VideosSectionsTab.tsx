"use client";

import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields } from "@/components/admin/sections/SectionFields";

export function VideosSectionsTab() {
  return (
    <div className="space-y-6">
      <SectionCard pageSlug="videos" sectionKey="hero" title="Hero">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle" },
            { key: "cta", label: "Button label" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="videos" sectionKey="library" title="Video Library Heading" description="Heading shown above the video grid (managed in the Videos List tab).">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="videos" sectionKey="finalCta" title="Final CTA">
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
