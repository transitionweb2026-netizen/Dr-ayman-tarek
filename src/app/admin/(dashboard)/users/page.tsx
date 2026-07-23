"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { DataTable } from "@/components/admin/ui/DataTable";
import { SelectField } from "@/components/admin/ui/Field";
import { useConfirm } from "@/hooks/useConfirm";
import { createClient } from "@/lib/supabase/client";
import { removeAdmin, updateAdminRole } from "@/server/actions/users";
import { InviteAdminDialog } from "./InviteAdminDialog";

interface AdminProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "editor";
  created_at: string;
}

function useAdminProfiles() {
  return useQuery({
    queryKey: ["admin_profiles"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("admin_profiles").select("*").order("created_at");
      if (error) throw error;
      return data as AdminProfileRow[];
    },
  });
}

export default function UsersPage() {
  const { data: users, isLoading } = useAdminProfiles();
  const qc = useQueryClient();
  const confirm = useConfirm();
  const [inviteOpen, setInviteOpen] = useState(false);

  async function handleRoleChange(userId: string, role: "admin" | "editor") {
    try {
      await updateAdminRole(userId, role);
      qc.invalidateQueries({ queryKey: ["admin_profiles"] });
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  async function handleRemove(user: AdminProfileRow) {
    const ok = await confirm({
      title: `Remove ${user.full_name || user.email}?`,
      description: "They will immediately lose access to the admin dashboard.",
      confirmLabel: "Remove",
      danger: true,
    });
    if (!ok) return;
    try {
      await removeAdmin(user.id);
      qc.invalidateQueries({ queryKey: ["admin_profiles"] });
      toast.success("Removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove user");
    }
  }

  return (
    <div>
      <PageHeader
        title="Users"
        description="Everyone with access to this dashboard."
        actions={
          <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setInviteOpen(true)}>
            Invite Admin
          </AdminButton>
        }
      />

      <DataTable
        items={users || []}
        loading={isLoading}
        onDelete={handleRemove}
        deleteConfirmTitle={(u) => `Remove ${u.full_name || u.email}?`}
        emptyIcon={UsersIcon}
        emptyTitle="No other users yet"
        columns={[
          { header: "Name", render: (u) => <span className="font-medium">{u.full_name || "—"}</span> },
          { header: "Email", render: (u) => <span dir="ltr">{u.email}</span> },
          {
            header: "Role",
            render: (u) => (
              <div className="w-40">
                <SelectField
                  value={u.role}
                  onChange={(v) => handleRoleChange(u.id, v as "admin" | "editor")}
                  options={[
                    { value: "editor", label: "Editor" },
                    { value: "admin", label: "Admin" },
                  ]}
                />
              </div>
            ),
          },
        ]}
      />

      <InviteAdminDialog open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
