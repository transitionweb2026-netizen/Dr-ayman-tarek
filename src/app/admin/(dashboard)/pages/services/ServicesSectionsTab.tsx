"use client";

import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields, SectionRepeaterField, SectionStringListField } from "@/components/admin/sections/SectionFields";

export function ServicesSectionsTab() {
  return (
    <div className="space-y-6">
      <SectionCard pageSlug="services" sectionKey="hero" title="Hero">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle" },
            { key: "cta", label: "Button label" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="services" sectionKey="grid" title="Services Grid Heading" description="Heading shown above the service cards (managed in the Services List tab).">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="services" sectionKey="whyChoose" title="Why Choose Our Services">
        {({ en, ar, setEn, setAr }) => (
          <div className="space-y-5">
            <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
              { key: "eyebrow", label: "Eyebrow" },
              { key: "title", label: "Title" },
              { key: "subtitle", label: "Subtitle", multiline: true },
            ]} />
            <SectionRepeaterField
              label="Reasons"
              itemsEn={(en.items as Record<string, unknown>[]) || []}
              itemsAr={(ar.items as Record<string, unknown>[]) || []}
              onChange={(itemsEn, itemsAr) => { setEn({ items: itemsEn }); setAr({ items: itemsAr }); }}
              fields={[
                { key: "icon", label: "Icon", kind: "icon" },
                { key: "title", label: "Title" },
                { key: "desc", label: "Description", multiline: true },
              ]}
            />
          </div>
        )}
      </SectionCard>

      <SectionCard pageSlug="services" sectionKey="techShowcase" title="Technology Showcase">
        {({ en, ar, setEn, setAr }) => (
          <div className="space-y-5">
            <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
              { key: "heading", label: "Heading" },
              { key: "subheading", label: "Subheading" },
              { key: "description", label: "Description", multiline: true },
              { key: "cta", label: "Button label" },
            ]} />
            <SectionStringListField
              label="Technology tags"
              valuesEn={(en.technologies as string[]) || []}
              valuesAr={(ar.technologies as string[]) || []}
              onChange={(vEn, vAr) => { setEn({ technologies: vEn }); setAr({ technologies: vAr }); }}
            />
          </div>
        )}
      </SectionCard>

      <SectionCard pageSlug="services" sectionKey="finalCta" title="Final CTA">
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
