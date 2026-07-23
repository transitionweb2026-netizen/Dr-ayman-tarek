"use client";

import { useState } from "react";
import { toast } from "sonner";
import { History, RotateCcw } from "lucide-react";
import { Dialog } from "./Dialog";
import { AdminButton } from "./Button";
import { useConfirm } from "@/hooks/useConfirm";
import { useRevisions, useRestoreRevision, type ContentRevision } from "@/hooks/useContentRevisions";
import type { Database } from "@/lib/supabase/database.types";

function defaultLabel(snapshot: Record<string, unknown>): string {
  const candidates = ["title_en", "question_en", "patient_name", "name_en", "label_en", "file_name"];
  for (const key of candidates) {
    if (typeof snapshot[key] === "string" && snapshot[key]) return snapshot[key] as string;
  }
  return "Untitled";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

interface VersionHistoryProps {
  table: keyof Database["public"]["Tables"];
  entityType: string;
  entityId: string | undefined;
}

/** "Version History" trigger + panel — reused by every collection's edit
 * form (Services, Specialties, Videos, FAQ, Testimonials, Blog, page
 * sections, Site Settings) via the same entity_type/entity_id/table triple. */
export function VersionHistoryButton({ table, entityType, entityId }: VersionHistoryProps) {
  const [open, setOpen] = useState(false);
  if (!entityId) return null;
  return (
    <>
      <AdminButton type="button" variant="outline" size="sm" icon={<History className="h-4 w-4" />} onClick={() => setOpen(true)}>
        History
      </AdminButton>
      <VersionHistoryDialog table={table} entityType={entityType} entityId={entityId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function VersionHistoryDialog({ table, entityType, entityId, open, onClose }: VersionHistoryProps & { open: boolean; onClose: () => void }) {
  const { data: revisions, isLoading } = useRevisions(entityType, entityId);
  const restore = useRestoreRevision(table, entityType);
  const confirm = useConfirm();

  async function handleRestore(revision: ContentRevision) {
    const ok = await confirm({
      title: `Restore this version from ${formatDate(revision.created_at)}?`,
      description: "The current content becomes its own restorable version first — nothing is lost.",
      confirmLabel: "Restore",
    });
    if (!ok || !entityId) return;
    try {
      await restore.mutateAsync({ entityId, snapshot: revision.snapshot });
      toast.success("Restored");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to restore");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Version History</h2>
        <p className="mb-5 text-sm text-on-surface-variant">Last {revisions?.length ?? 0} saved versions.</p>

        {isLoading ? (
          <p className="text-sm text-on-surface-variant">Loading…</p>
        ) : !revisions || revisions.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No history yet — versions appear after your first save.</p>
        ) : (
          <div className="max-h-[50vh] space-y-2 overflow-y-auto">
            {revisions.map((rev, i) => (
              <div key={rev.id} className="flex items-center justify-between rounded-xl border border-outline-variant/15 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{defaultLabel(rev.snapshot)}</p>
                  <p className="text-xs text-on-surface-variant">{formatDate(rev.created_at)}{i === 0 ? " · current" : ""}</p>
                </div>
                {i !== 0 && (
                  <button
                    onClick={() => handleRestore(rev)}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-primary hover:bg-primary/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Restore
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}
