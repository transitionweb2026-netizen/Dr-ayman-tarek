"use client";

import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields } from "@/components/admin/sections/SectionFields";

export function ContactSectionsTab() {
  return (
    <div className="space-y-6">
      <SectionCard pageSlug="contact" sectionKey="hero" title="Hero">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "eyebrow", label: "Eyebrow" },
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="quickInfo" title="Quick Info Labels" description="Phone/email/address/hours values come from Site Settings — these are just the four card labels.">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "callLabel", label: "Phone card label" },
            { key: "emailLabel", label: "Email card label" },
            { key: "visitLabel", label: "Address card label" },
            { key: "hoursLabel", label: "Hours card label" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="clinicHours" title="Clinic Hours Title" description="The hours themselves come from Site Settings → Hours & Social.">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[{ key: "title", label: "Title" }]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="emergency" title="Emergency Contact" description="Phone number comes from Site Settings → Contact.">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", multiline: true },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="form" title="Appointment Form">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[
            { key: "title", label: "Title" },
            { key: "subtitle", label: "Subtitle", multiline: true },
            { key: "fullName", label: "\"Full name\" field label" },
            { key: "fullNamePlaceholder", label: "\"Full name\" placeholder" },
            { key: "phone", label: "\"Phone\" field label" },
            { key: "phonePlaceholder", label: "\"Phone\" placeholder" },
            { key: "email", label: "\"Email\" field label" },
            { key: "emailPlaceholder", label: "\"Email\" placeholder" },
            { key: "service", label: "\"Service\" field label" },
            { key: "message", label: "\"Message\" field label" },
            { key: "messagePlaceholder", label: "\"Message\" placeholder" },
            { key: "submit", label: "Submit button label" },
            { key: "successMessage", label: "Success message" },
          ]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="faq" title="Contact FAQ Heading" description="FAQ items themselves come from the FAQ collection (category = Contact).">
        {({ en, ar, setEn, setAr }) => (
          <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[{ key: "title", label: "Title" }]} />
        )}
      </SectionCard>

      <SectionCard pageSlug="contact" sectionKey="finalCta" title="Final CTA">
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
