"use client";

import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields, SectionRepeaterField } from "@/components/admin/sections/SectionFields";

export function DrAymanTarekSectionsTab() {
  return (
    <div className="space-y-6">
      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="hero" title="Hero">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "titleLine1", label: "Title — line 1" },
            { key: "titleLine2", label: "Title — line 2" },
            { key: "subtitle", label: "Subtitle", multiline: true },
            { key: "cta", label: "Button label" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="about" title="About Dr. Ayman Tarek">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "title", label: "Title" },
            { key: "videoCaption", label: "Video caption" },
            { key: "bio1", label: "Bio — paragraph 1", multiline: true },
            { key: "bio2", label: "Bio — paragraph 2", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="certificates" title="Certificates & Accreditations">
        {({ en, ar, setEn, setAr }) => (
          <div className="space-y-5">
            <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
              { key: "title", label: "Title" },
              { key: "subtitle", label: "Subtitle", multiline: true },
            ]} />
            <SectionRepeaterField
              label="Certificates"
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

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="specialties" title="Technical Specialties Heading" description="The specialty cards themselves are managed in the Specialties List tab.">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="achievements" title="Professional Achievements">
        {({ en, ar, setEn, setAr }) => (
          <div className="space-y-5">
            <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
              { key: "title", label: "Title" },
              { key: "subtitle", label: "Subtitle", multiline: true },
            ]} />
            <SectionRepeaterField
              label="Achievements"
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

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="stats" title="Achievement Stats Strip">
        {({ en, ar, setEn, setAr }) => (
          <SectionRepeaterField
            label="Stats"
            itemsEn={(en.items as Record<string, unknown>[]) || []}
            itemsAr={(ar.items as Record<string, unknown>[]) || []}
            onChange={(itemsEn, itemsAr) => { setEn({ items: itemsEn }); setAr({ items: itemsAr }); }}
            fields={[
              { key: "icon", label: "Icon", kind: "icon" },
              { key: "value", label: "Value", kind: "shared" },
              { key: "suffix", label: "Suffix", kind: "shared" },
              { key: "label", label: "Label" },
            ]}
          />
        )}
      </SectionCard>

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="testimonials" title="Testimonials Heading" description="Testimonials themselves come from the Testimonials collection (placement = Dr. Ayman Tarek).">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[{ key: "title", label: "Title" }]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="dr-ayman-tarek" sectionKey="finalCta" title="Final CTA" description="Address, phone, and working hours shown here come from Site Settings.">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "heading", label: "Heading" },
            { key: "subtitle", label: "Subtitle", multiline: true },
            { key: "bookConsultation", label: "Book button label" },
            { key: "chatWhatsapp", label: "WhatsApp button label" },
          ]} />
        )}
      </SectionCard>
    </div>
  );
}
