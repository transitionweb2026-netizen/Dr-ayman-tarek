"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { faqHooks, type FaqItem } from "@/hooks/useFaqItems";
import { FaqFormDialog } from "./FaqFormDialog";

export default function FaqAdminPage() {
  const { data: items, isLoading } = faqHooks.useList();
  const deleteItem = faqHooks.useDelete();
  const reorder = faqHooks.useReorder();
  const [editing, setEditing] = useState<FaqItem | "new" | null>(null);

  return (
    <div>
      <PageHeader
        title="FAQ"
        description="Questions shown on the Home page and the Contact page."
        actions={
          <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setEditing("new")}>
            Add FAQ
          </AdminButton>
        }
      />

      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search questions..."
        searchText={(item) => item.question_en}
        onEdit={(item) => setEditing(item)}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.question_en}"?`}
        onReorder={(reordered) => reorder.mutate(reordered)}
        emptyIcon={HelpCircle}
        emptyTitle="No FAQ items yet"
        emptyDescription="Add the questions patients ask most."
        columns={[
          { header: "Question", render: (i) => <span className="font-medium">{i.question_en}</span> },
          {
            header: "Shown on",
            render: (i) => <span className="text-on-surface-variant">{i.category === "general" ? "Home" : "Contact"}</span>,
          },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />

      <FaqFormDialog item={editing} nextOrder={(items?.length ?? 0)} onClose={() => setEditing(null)} />
    </div>
  );
}
