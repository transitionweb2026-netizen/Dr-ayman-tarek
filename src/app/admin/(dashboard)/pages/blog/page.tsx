"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Newspaper, Star } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Tabs } from "@/components/admin/ui/Tabs";
import { blogHooks } from "@/hooks/useBlog";
import { BlogSectionsTab } from "./BlogSectionsTab";

function BlogListTab() {
  const { data: items, isLoading } = blogHooks.useList();
  const deleteItem = blogHooks.useDelete();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link href="/admin/pages/blog/new">
          <AdminButton icon={<Plus className="h-4 w-4" />}>Add Article</AdminButton>
        </Link>
      </div>
      <DataTable
        items={items || []}
        loading={isLoading}
        searchPlaceholder="Search articles..."
        searchText={(item) => item.title_en}
        editHref={(item) => `/admin/pages/blog/${item.id}`}
        onDelete={async (item) => {
          await deleteItem.mutateAsync(item.id);
          toast.success("Deleted");
        }}
        deleteConfirmTitle={(item) => `Delete "${item.title_en}"?`}
        emptyIcon={Newspaper}
        emptyTitle="No articles yet"
        emptyDescription="Write your first blog post."
        columns={[
          { header: "Article", render: (i) => <span className="font-medium">{i.title_en}</span> },
          { header: "Category", render: (i) => <span className="text-on-surface-variant">{i.category_en || "—"}</span> },
          { header: "Featured", render: (i) => (i.is_featured ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <span className="text-on-surface-variant/40">—</span>) },
          { header: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />
    </div>
  );
}

export default function BlogPageAdmin() {
  const [tab, setTab] = useState("list");

  return (
    <div>
      <PageHeader title="Blog" description="The /blog page — sections and the articles themselves." />
      <div className="mb-6">
        <Tabs tabs={[{ key: "list", label: "Articles" }, { key: "sections", label: "Page Sections" }]} active={tab} onChange={setTab} />
      </div>
      {tab === "list" ? <BlogListTab /> : <BlogSectionsTab />}
    </div>
  );
}
