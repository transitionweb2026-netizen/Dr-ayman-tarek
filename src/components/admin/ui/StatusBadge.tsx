import { cn } from "@/lib/utils";
import type { Status } from "@/lib/supabase/database.types";

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        status === "published" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "published" ? "bg-emerald-400" : "bg-amber-400")} />
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}
