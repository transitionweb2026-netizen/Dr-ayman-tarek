"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, ImageIcon, Search } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { CardGridSkeleton } from "@/components/admin/ui/Skeleton";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaDetailDialog } from "@/components/admin/media/MediaDetailDialog";
import { useMediaAssets, useUploadMedia, type MediaAsset } from "@/hooks/useMediaLibrary";

export default function MediaLibraryPage() {
  const { data: assets, isLoading } = useMediaAssets();
  const upload = useUploadMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<"all" | MediaAsset["kind"]>("all");
  const [selected, setSelected] = useState<MediaAsset | null>(null);

  const filtered = (assets || []).filter((a) => {
    if (kindFilter !== "all" && a.kind !== kindFilter) return false;
    if (query && !a.file_name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    for (const file of Array.from(files)) {
      try {
        await upload.mutateAsync(file);
      } catch (err) {
        toast.error(`Failed to upload ${file.name}: ${err instanceof Error ? err.message : "unknown error"}`);
      }
    }
    toast.success(files.length > 1 ? `${files.length} files uploaded` : "File uploaded");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Every image, video, and document used across the site — upload once, reuse everywhere."
        actions={
          <AdminButton icon={<Upload className="h-4 w-4" />} loading={upload.isPending} onClick={() => fileInputRef.current?.click()}>
            Upload
          </AdminButton>
        }
      />
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/60" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full rounded-full border border-outline-variant/30 bg-surface-container py-2 pl-10 pr-4 text-sm text-white outline-none placeholder-on-surface-variant/50 focus:border-primary/50"
          />
        </div>
        <div className="glass inline-flex items-center gap-1 self-start rounded-full p-1">
          {(["all", "image", "video", "pdf"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKindFilter(k)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                kindFilter === k ? "bg-primary/25 text-white" : "text-on-surface-variant hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
      >
        {isLoading ? (
          <CardGridSkeleton count={10} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No media yet"
            description="Drag & drop files anywhere on this page, or use the Upload button."
          />
        ) : (
          <MediaGrid assets={filtered} onSelect={setSelected} />
        )}
      </div>

      <MediaDetailDialog asset={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
