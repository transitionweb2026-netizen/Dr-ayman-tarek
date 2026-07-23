"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Tabs } from "@/components/admin/ui/Tabs";
import { serviceHooks, type ServiceRow } from "@/hooks/useServices";
import { ServiceFormDialog } from "./ServiceFormDialog";
import { ServicesSectionsTab } from "./ServicesSectionsTab";

function ServicesListTab() {
  const { data: items, isLoading } = serviceHooks.useList();
  const deleteItem = serviceHooks.useDelete();
  const reorder = serviceHooks.useReorder();
  const [editing, setEditing] = useState<ServiceRow | "new" | null>(null);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setEditing("new")}>
          Add Service
        </AdminButton>
      </div>
      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search services..."
        searchText={(item) => item.title_en}
        onEdit={(item) => setEditing(item)}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.title_en}"?`}
        onReorder={(reordered) => reorder.mutate(reordered)}
        emptyIcon={Stethoscope}
        emptyTitle="No services yet"
        emptyDescription="Add the procedures and treatments this clinic offers."
        columns={[
          { header: "Service", render: (i) => <span className="font-medium">{i.title_en}</span> },
          { header: "Slug", render: (i) => <span className="text-on-surface-variant" dir="ltr">{i.slug}</span> },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />
      <ServiceFormDialog item={editing} nextOrder={items?.length ?? 0} onClose={() => setEditing(null)} />
    </div>
  );
}

export default function ServicesPageAdmin() {
  const [tab, setTab] = useState("list");

  return (
    <div>
      <PageHeader title="Services" description="The /services page — sections and the service cards themselves." />
      <div className="mb-6">
        <Tabs tabs={[{ key: "list", label: "Services List" }, { key: "sections", label: "Page Sections" }]} active={tab} onChange={setTab} />
      </div>
      {tab === "list" ? <ServicesListTab /> : <ServicesSectionsTab />}
    </div>
  );
}
