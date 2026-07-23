"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Tabs } from "@/components/admin/ui/Tabs";
import { specialtyHooks, type SpecialtyRow } from "@/hooks/useSpecialties";
import { SpecialtyFormDialog } from "./SpecialtyFormDialog";
import { DrAymanTarekSectionsTab } from "./DrAymanTarekSectionsTab";

function SpecialtiesListTab() {
  const { data: items, isLoading } = specialtyHooks.useList();
  const deleteItem = specialtyHooks.useDelete();
  const reorder = specialtyHooks.useReorder();
  const [editing, setEditing] = useState<SpecialtyRow | "new" | null>(null);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setEditing("new")}>
          Add Specialty
        </AdminButton>
      </div>
      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search specialties..."
        searchText={(item) => item.title_en}
        onEdit={(item) => setEditing(item)}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.title_en}"?`}
        onReorder={(reordered) => reorder.mutate(reordered)}
        emptyIcon={Stethoscope}
        emptyTitle="No specialties yet"
        emptyDescription="Add the cosmetic procedures Dr. Ayman Tarek performs."
        columns={[
          { header: "Specialty", render: (i) => <span className="font-medium">{i.title_en}</span> },
          { header: "Slug", render: (i) => <span className="text-on-surface-variant" dir="ltr">{i.slug}</span> },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />
      <SpecialtyFormDialog item={editing} nextOrder={items?.length ?? 0} onClose={() => setEditing(null)} />
    </div>
  );
}

export default function DrAymanTarekPageAdmin() {
  const [tab, setTab] = useState("list");

  return (
    <div>
      <PageHeader title="Dr. Ayman Tarek" description="The /dr-ayman-tarek page — sections and the specialty cards themselves." />
      <div className="mb-6">
        <Tabs tabs={[{ key: "list", label: "Specialties List" }, { key: "sections", label: "Page Sections" }]} active={tab} onChange={setTab} />
      </div>
      {tab === "list" ? <SpecialtiesListTab /> : <DrAymanTarekSectionsTab />}
    </div>
  );
}
