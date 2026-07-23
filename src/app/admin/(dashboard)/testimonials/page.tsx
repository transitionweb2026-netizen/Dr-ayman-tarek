"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Quote, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { testimonialHooks, type TestimonialRow } from "@/hooks/useTestimonials";
import { TestimonialFormDialog } from "./TestimonialFormDialog";

export default function TestimonialsAdminPage() {
  const { data: items, isLoading } = testimonialHooks.useList();
  const deleteItem = testimonialHooks.useDelete();
  const reorder = testimonialHooks.useReorder();
  const [editing, setEditing] = useState<TestimonialRow | "new" | null>(null);

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Patient reviews shown on Home and the Dr. Ayman Tarek page."
        actions={
          <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setEditing("new")}>
            Add Testimonial
          </AdminButton>
        }
      />

      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search patients..."
        searchText={(item) => item.patient_name}
        onEdit={(item) => setEditing(item)}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.patient_name}"'s testimonial?`}
        onReorder={(reordered) => reorder.mutate(reordered)}
        emptyIcon={Quote}
        emptyTitle="No testimonials yet"
        emptyDescription="Add your first patient review."
        columns={[
          { header: "Patient", render: (i) => <span className="font-medium">{i.patient_name}</span> },
          {
            header: "Rating",
            render: (i) => (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: i.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            ),
          },
          {
            header: "Shown on",
            render: (i) => <span className="text-on-surface-variant">{i.placements.join(", ")}</span>,
          },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />

      <TestimonialFormDialog item={editing} nextOrder={items?.length ?? 0} onClose={() => setEditing(null)} />
    </div>
  );
}
