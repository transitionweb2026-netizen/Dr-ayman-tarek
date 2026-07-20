import { ProcedureCardGrid } from "@/components/sections/ProcedureCardGrid";
import { SERVICES } from "@/data/services";

export function ServicesGrid() {
  return (
    <ProcedureCardGrid
      eyebrow="What We Offer"
      title="Our Services"
      subtitle="Comprehensive neurosurgical and neurological care, delivered with precision, safety, and a patient-first approach. Select a service to learn more."
      items={SERVICES}
      sectionId="services"
      topPadding
    />
  );
}
