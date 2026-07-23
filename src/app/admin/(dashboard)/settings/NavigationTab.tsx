"use client";

import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { AdminCard } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { FieldGroup, TextField, ToggleField } from "@/components/admin/ui/Field";
import { useConfirm } from "@/hooks/useConfirm";
import { navLinkHooks, type NavLinkRow } from "@/hooks/useSiteSettings";

const GROUPS: { key: NavLinkRow["location"]; title: string; description: string }[] = [
  { key: "header", title: "Header Navigation", description: "The main nav bar. Hrefs should stay pointed at real pages." },
  { key: "footer_expertise", title: "Footer — Expertise Links", description: "First footer link column." },
  { key: "footer_journey", title: "Footer — Patient Journey Links", description: "Second footer link column." },
];

function LinkRow({ link, onSave }: { link: NavLinkRow; onSave: (patch: Partial<NavLinkRow>) => void }) {
  const update = navLinkHooks.useUpdate();
  const del = navLinkHooks.useDelete();
  const confirm = useConfirm();

  async function handleDelete() {
    const ok = await confirm({ title: `Delete "${link.label_en}"?`, confirmLabel: "Delete", danger: true });
    if (ok) {
      await del.mutateAsync(link.id);
      toast.success("Deleted");
    }
  }

  return (
    <div className="glass grid grid-cols-1 gap-3 rounded-xl p-4 sm:grid-cols-[1fr_1fr_1fr_auto_auto]">
      <FieldGroup label="Label (EN)">
        <TextField defaultValue={link.label_en} onBlur={(e) => onSave({ label_en: e.target.value })} dir="ltr" />
      </FieldGroup>
      <FieldGroup label="Label (AR)">
        <TextField defaultValue={link.label_ar} onBlur={(e) => onSave({ label_ar: e.target.value })} dir="rtl" />
      </FieldGroup>
      <FieldGroup label="URL">
        <TextField defaultValue={link.href} onBlur={(e) => onSave({ href: e.target.value })} dir="ltr" />
      </FieldGroup>
      <div className="flex items-end">
        <ToggleField label="Visible" checked={link.is_visible} onChange={(v) => update.mutate({ id: link.id, values: { is_visible: v } })} />
      </div>
      <div className="flex items-end">
        <button onClick={handleDelete} className="flex h-11 w-11 items-center justify-center rounded-xl text-on-surface-variant hover:bg-error/10 hover:text-error" aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function NavigationTab() {
  const { data: links, isLoading } = navLinkHooks.useList();
  const update = navLinkHooks.useUpdate();
  const create = navLinkHooks.useCreate();

  if (isLoading) return <p className="text-sm text-on-surface-variant">Loading…</p>;

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => {
        const groupLinks = (links || []).filter((l) => l.location === group.key);
        return (
          <AdminCard key={group.key}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{group.title}</p>
                <p className="text-xs text-on-surface-variant">{group.description}</p>
              </div>
              <AdminButton
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus className="h-4 w-4" />}
                onClick={() =>
                  create.mutate({ label_en: "New Link", label_ar: "رابط جديد", href: "#", location: group.key, display_order: groupLinks.length })
                }
              >
                Add
              </AdminButton>
            </div>
            <div className="space-y-3">
              {groupLinks.length === 0 && <p className="text-sm text-on-surface-variant">No links yet.</p>}
              {groupLinks.map((link) => (
                <LinkRow key={link.id} link={link} onSave={(patch) => update.mutate({ id: link.id, values: patch })} />
              ))}
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
}
