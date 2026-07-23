"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Video as VideoIcon, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Tabs } from "@/components/admin/ui/Tabs";
import { videoHooks, type VideoRow } from "@/hooks/useVideos";
import { VideoFormDialog } from "./VideoFormDialog";
import { VideosSectionsTab } from "./VideosSectionsTab";

function VideosListTab() {
  const { data: items, isLoading } = videoHooks.useList();
  const deleteItem = videoHooks.useDelete();
  const reorder = videoHooks.useReorder();
  const [editing, setEditing] = useState<VideoRow | "new" | null>(null);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setEditing("new")}>
          Add Video
        </AdminButton>
      </div>
      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search videos..."
        searchText={(item) => item.title_en}
        onEdit={(item) => setEditing(item)}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.title_en}"?`}
        onReorder={(reordered) => reorder.mutate(reordered)}
        emptyIcon={VideoIcon}
        emptyTitle="No videos yet"
        emptyDescription="Add your first patient-education video."
        columns={[
          { header: "Video", render: (i) => <span className="font-medium">{i.title_en}</span> },
          { header: "Category", render: (i) => <span className="text-on-surface-variant">{i.category_en || "—"}</span> },
          { header: "Featured", render: (i) => (i.is_featured ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <span className="text-on-surface-variant/40">—</span>) },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />
      <VideoFormDialog item={editing} nextOrder={items?.length ?? 0} onClose={() => setEditing(null)} />
    </div>
  );
}

export default function VideosPageAdmin() {
  const [tab, setTab] = useState("list");

  return (
    <div>
      <PageHeader title="Videos" description="The /videos page — sections and the video library itself." />
      <div className="mb-6">
        <Tabs tabs={[{ key: "list", label: "Videos List" }, { key: "sections", label: "Page Sections" }]} active={tab} onChange={setTab} />
      </div>
      {tab === "list" ? <VideosListTab /> : <VideosSectionsTab />}
    </div>
  );
}
