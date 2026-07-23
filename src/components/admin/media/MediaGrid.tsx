"use client";

import { FileVideo, FileText, File as FileIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPublicMediaUrl } from "@/lib/supabase/storage";
import type { MediaAsset } from "@/hooks/useMediaLibrary";

function KindPlaceholder({ kind }: { kind: MediaAsset["kind"] }) {
  const Icon = kind === "video" ? FileVideo : kind === "pdf" ? FileText : FileIcon;
  return <Icon className="h-7 w-7 text-on-surface-variant/50" />;
}

export function MediaGrid({
  assets,
  onSelect,
  selectedId,
}: {
  assets: MediaAsset[];
  onSelect: (asset: MediaAsset) => void;
  selectedId?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {assets.map((asset) => {
        const selected = selectedId === asset.id;
        return (
          <button
            key={asset.id}
            type="button"
            onClick={() => onSelect(asset)}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-xl border-2 bg-surface-container transition-colors",
              selected ? "border-primary" : "border-transparent hover:border-primary/40",
            )}
          >
            {asset.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin-only media grid, arbitrary user-uploaded sizes
              <img src={getPublicMediaUrl(asset.storage_path)} alt={asset.alt_text_en || asset.file_name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
                <KindPlaceholder kind={asset.kind} />
                <span className="line-clamp-2 text-center text-[10px] text-on-surface-variant">{asset.file_name}</span>
              </div>
            )}
            {selected && (
              <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 truncate bg-black/70 px-2 py-1 text-left text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {asset.file_name}
            </div>
          </button>
        );
      })}
    </div>
  );
}
