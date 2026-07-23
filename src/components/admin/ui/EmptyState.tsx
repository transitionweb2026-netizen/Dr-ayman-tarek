import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant/30 px-6 py-16 text-center">
      <div className="icon-badge-neon mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
        <Icon className="icon-neon h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-on-surface-variant">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
