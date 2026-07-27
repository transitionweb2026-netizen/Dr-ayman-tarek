import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ title, items }: { title: string; items: AccordionItem[] }) {
  return (
    <section id="faq" className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-sm md:px-margin-desktop scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={title} />
        <Accordion items={items} />
      </div>
    </section>
  );
}
