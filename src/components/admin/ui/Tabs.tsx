"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="glass inline-flex items-center gap-1 rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            active === tab.key ? "text-white" : "text-on-surface-variant hover:text-white",
          )}
        >
          {active === tab.key && (
            <motion.span layoutId="admin-tabs-pill" className="absolute inset-0 rounded-full bg-primary/25" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
