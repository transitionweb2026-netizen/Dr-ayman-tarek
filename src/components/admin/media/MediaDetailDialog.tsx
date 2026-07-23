"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Trash2, Upload } from "lucide-react";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { TextField, FieldGroup } from "@/components/admin/ui/Field";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteMedia, useUpdateMedia, type MediaAsset } from "@/hooks/useMediaLibrary";
import { getPublicMediaUrl } from "@/lib/supabase/storage";

export function MediaDetailDialog({ asset, onClose }: { asset: MediaAsset | null; onClose: () => void }) {
  const [fileName, setFileName] = useState("");
  const [altEn, setAltEn] = useState("");
  const [altAr, setAltAr] = useState("");
  const updateMedia = useUpdateMedia();
  const deleteMedia = useDeleteMedia();
  const confirm = useConfirm();

  useEffect(() => {
    if (asset) {
      setFileName(asset.file_name);
      setAltEn(asset.alt_text_en || "");
      setAltAr(asset.alt_text_ar || "");
    }
  }, [asset]);

  if (!asset) return null;
  const url = getPublicMediaUrl(asset.storage_path);

  async function handleSave() {
    if (!asset) return;
    await updateMedia.mutateAsync({ id: asset.id, patch: { file_name: fileName, alt_text_en: altEn, alt_text_ar: altAr } });
    toast.success("Saved");
    onClose();
  }

  async function handleDelete() {
    if (!asset) return;
    const ok = await confirm({
      title: `Delete "${asset.file_name}"?`,
      description: "This removes the file permanently. Anything still referencing it will show a broken image.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    await deleteMedia.mutateAsync({ id: asset.id, storagePath: asset.storage_path });
    toast.success("Deleted");
    onClose();
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  }

  return (
    <Dialog open={Boolean(asset)} onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <div className="mb-5 flex h-56 items-center justify-center overflow-hidden rounded-xl bg-surface-container">
          {asset.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploaded asset
            <img src={url} alt={asset.alt_text_en || asset.file_name} className="h-full w-full object-contain" />
          ) : (
            <Upload className="h-10 w-10 text-on-surface-variant/40" />
          )}
        </div>

        <div className="space-y-4">
          <FieldGroup label="File name">
            <TextField value={fileName} onChange={(e) => setFileName(e.target.value)} dir="ltr" />
          </FieldGroup>
          {asset.kind === "image" && (
            <>
              <FieldGroup label="Alt text (English)" hint="Improves accessibility & SEO">
                <TextField value={altEn} onChange={(e) => setAltEn(e.target.value)} dir="ltr" />
              </FieldGroup>
              <FieldGroup label="Alt text (Arabic)">
                <TextField value={altAr} onChange={(e) => setAltAr(e.target.value)} dir="rtl" />
              </FieldGroup>
            </>
          )}
          <FieldGroup label="Public URL">
            <div className="flex gap-2">
              <TextField value={url} readOnly dir="ltr" className="text-on-surface-variant" />
              <AdminButton type="button" variant="outline" size="sm" onClick={handleCopyUrl} icon={<Copy className="h-4 w-4" />} />
            </div>
          </FieldGroup>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <AdminButton type="button" variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />} loading={deleteMedia.isPending} onClick={handleDelete}>
            Delete
          </AdminButton>
          <div className="flex gap-3">
            <AdminButton type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton type="button" size="sm" loading={updateMedia.isPending} onClick={handleSave}>
              Save
            </AdminButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
