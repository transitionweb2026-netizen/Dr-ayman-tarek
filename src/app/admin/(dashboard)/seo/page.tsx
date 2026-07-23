"use client";

import { useState } from "react";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { DataTable } from "@/components/admin/ui/DataTable";
import { usePagesWithSeo, type PageWithSeo } from "@/hooks/usePageSeo";
import { SeoFormDialog } from "./SeoFormDialog";

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  "dr-ayman-tarek": "Dr. Ayman Tarek",
  services: "Services",
  videos: "Videos",
  blog: "Blog",
  contact: "Contact",
};

export default function SeoPage() {
  const { data: pages, isLoading } = usePagesWithSeo();
  const [editing, setEditing] = useState<PageWithSeo | null>(null);

  return (
    <div>
      <PageHeader title="SEO" description="Meta title, description, canonical URL, and social preview image for each page." />

      <DataTable
        items={pages || []}
        loading={isLoading}
        onEdit={(p) => setEditing(p)}
        emptyIcon={Search}
        emptyTitle="No pages found"
        columns={[
          { header: "Page", render: (p) => <span className="font-medium">{PAGE_LABELS[p.slug] || p.slug}</span> },
          {
            header: "SEO Title",
            render: (p) =>
              p.page_seo?.seo_title_en ? (
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {p.page_seo.seo_title_en}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400">
                  <AlertCircle className="h-4 w-4" /> Not set — falls back to site default
                </span>
              ),
          },
          {
            header: "Description",
            render: (p) => (p.page_seo?.seo_description_en ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-amber-400" />),
          },
          {
            header: "OG Image",
            render: (p) => (p.page_seo?.og_image_media_id ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-amber-400" />),
          },
        ]}
      />

      <SeoFormDialog page={editing} onClose={() => setEditing(null)} />
    </div>
  );
}
