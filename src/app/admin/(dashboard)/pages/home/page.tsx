"use client";

import { PageHeader } from "@/components/admin/ui/Card";
import { SectionCard } from "@/components/admin/sections/SectionCard";
import { SectionTextFields, SectionRepeaterField } from "@/components/admin/sections/SectionFields";

export default function HomePageAdmin() {
  return (
    <div>
      <PageHeader title="Home" description="Every section of the homepage, top to bottom." />

      <div className="space-y-6">
        <SectionCard pageSlug="home" sectionKey="hero" title="Hero">
          {({ en, ar, setEn, setAr }) => (
            <SectionTextFields
              en={en} ar={ar} setEn={setEn} setAr={setAr}
              fields={[
                { key: "badge", label: "Badge" },
                { key: "headingLine1", label: "Heading — line 1" },
                { key: "headingLine2", label: "Heading — line 2" },
                { key: "description", label: "Description", multiline: true },
                { key: "primaryCta", label: "Primary button label" },
                { key: "secondaryCta", label: "Secondary button label" },
                { key: "doctorName", label: "Doctor name (on hero card)" },
                { key: "doctorTitle", label: "Doctor title (on hero card)" },
                { key: "statValue", label: "Hero stat value", hint: "e.g. 5,000+" },
                { key: "statLabel", label: "Hero stat label" },
                { key: "boardCertifiedTitle", label: "Certification badge title" },
                { key: "boardCertifiedSubtitle", label: "Certification badge subtitle" },
              ]}
            />
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="stats" title="Statistics Strip" description="The 4-number strip under the hero.">
          {({ en, ar, setEn, setAr }) => (
            <SectionRepeaterField
              label="Stats"
              itemsEn={(en.items as Record<string, unknown>[]) || []}
              itemsAr={(ar.items as Record<string, unknown>[]) || []}
              onChange={(itemsEn, itemsAr) => { setEn({ items: itemsEn }); setAr({ items: itemsAr }); }}
              fields={[
                { key: "icon", label: "Icon", kind: "icon" },
                { key: "value", label: "Value", kind: "shared" },
                { key: "label", label: "Label" },
              ]}
            />
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="about" title="About the Surgeon">
          {({ en, ar, setEn, setAr }) => (
            <SectionTextFields
              en={en} ar={ar} setEn={setEn} setAr={setAr}
              fields={[
                { key: "title", label: "Title" },
                { key: "bio", label: "Bio", multiline: true },
                { key: "cta", label: "Button label" },
                { key: "videoCaption", label: "Video caption" },
              ]}
            />
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="specialties" title="Precision Specialties (preview)" description="The 4-card specialty preview grid.">
          {({ en, ar, setEn, setAr }) => (
            <div className="space-y-5">
              <SectionTextFields
                en={en} ar={ar} setEn={setEn} setAr={setAr}
                fields={[
                  { key: "eyebrow", label: "Eyebrow" },
                  { key: "title", label: "Title" },
                  { key: "subtitle", label: "Subtitle", multiline: true },
                ]}
              />
              <SectionRepeaterField
                label="Cards"
                itemsEn={(en.items as Record<string, unknown>[]) || []}
                itemsAr={(ar.items as Record<string, unknown>[]) || []}
                onChange={(itemsEn, itemsAr) => { setEn({ items: itemsEn }); setAr({ items: itemsAr }); }}
                fields={[
                  { key: "icon", label: "Icon", kind: "icon" },
                  { key: "title", label: "Title" },
                  { key: "desc", label: "Description", multiline: true },
                  { key: "cta", label: "Button label" },
                ]}
              />
            </div>
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="testimonialsPanel" title="Testimonials Panel" description="Testimonials shown here come from the Testimonials collection (placement = Home). This section only holds the panel's headings and career milestones.">
          {({ en, ar, setEn, setAr }) => (
            <div className="space-y-5">
              <SectionTextFields
                en={en} ar={ar} setEn={setEn} setAr={setAr}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "viewAll", label: "\"View all\" link label" },
                  { key: "milestonesTitle", label: "Milestones title" },
                ]}
              />
              <SectionRepeaterField
                label="Career milestones"
                itemsEn={(en.milestones as Record<string, unknown>[]) || []}
                itemsAr={(ar.milestones as Record<string, unknown>[]) || []}
                onChange={(itemsEn, itemsAr) => { setEn({ milestones: itemsEn }); setAr({ milestones: itemsAr }); }}
                fields={[
                  { key: "year", label: "Year", kind: "shared" },
                  { key: "title", label: "Title" },
                  { key: "place", label: "Place" },
                ]}
              />
            </div>
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="insightsFaq" title="Latest Insights & FAQ Preview" description="Articles and FAQ items shown here come from the Blog and FAQ collections. This section only holds the two headings.">
          {({ en, ar, setEn, setAr }) => (
            <SectionTextFields
              en={en} ar={ar} setEn={setEn} setAr={setAr}
              fields={[
                { key: "insightsHeading", label: "Articles heading" },
                { key: "viewAll", label: "\"View all\" link label" },
                { key: "faqHeading", label: "FAQ heading" },
              ]}
            />
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="videoSeries" title="Clinical Video Series Preview" description="Videos shown here come from the Videos collection (featured). This section only holds the heading.">
          {({ en, ar, setEn, setAr }) => (
            <SectionTextFields en={en} ar={ar} setEn={setEn} setAr={setAr} fields={[{ key: "title", label: "Title" }]} />
          )}
        </SectionCard>

        <SectionCard pageSlug="home" sectionKey="finalCta" title="Final CTA">
          {({ en, ar, setEn, setAr }) => (
            <SectionTextFields
              en={en} ar={ar} setEn={setEn} setAr={setAr}
              fields={[
                { key: "heading", label: "Heading" },
                { key: "subtitle", label: "Subtitle", multiline: true },
                { key: "primaryLabel", label: "Button label" },
              ]}
            />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
