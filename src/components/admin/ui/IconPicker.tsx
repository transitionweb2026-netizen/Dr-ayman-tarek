"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// Curated from every NeonIcon/icon field already in use across the public
// site — not an exhaustive Material Symbols list (there are ~2,500), just a
// convenient starting set. Any valid Material Symbols name can still be
// typed directly; the preview glyph confirms it rendered.
const SUGGESTED_ICONS = [
  "neurology", "biotech", "grain", "pin", "workspace_premium", "verified",
  "local_hospital", "colorize", "groups", "military_tech", "timeline",
  "podium", "science", "public", "favorite", "medical_services",
  "support_agent", "tune", "precision_manufacturing", "domain", "bolt",
  "volunteer_activism", "shield", "call", "mail", "location_on", "schedule",
  "calendar_month", "play_circle", "monitor_heart", "graphic_eq",
  "check_circle", "visibility", "arrow_forward", "open_in_new", "share",
  "face_retouching_natural",
];

export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return SUGGESTED_ICONS;
    return SUGGESTED_ICONS.filter((name) => name.includes(query.toLowerCase().replace(/\s+/g, "_")));
  }, [query]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="icon-badge-neon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          <span className="material-symbols-outlined icon-neon text-xl">{value || "help"}</span>
        </div>
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setQuery(e.target.value);
          }}
          placeholder="e.g. neurology"
          dir="ltr"
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-left text-sm text-white outline-none focus:border-primary"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {filtered.slice(0, 14).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              onChange(name);
              setQuery("");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs transition-colors",
              value === name ? "border-primary/50 bg-primary/15 text-primary" : "border-outline-variant/30 text-on-surface-variant hover:text-white",
            )}
          >
            <span className="material-symbols-outlined text-sm">{name}</span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
