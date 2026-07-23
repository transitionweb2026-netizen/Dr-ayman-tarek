"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";
import { FieldGroup, TextField, SelectField } from "@/components/admin/ui/Field";
import { inviteAdmin } from "@/server/actions/users";

export function InviteAdminDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  async function handleInvite() {
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    setLoading(true);
    try {
      await inviteAdmin(email, fullName, role);
      toast.success(`Invitation sent to ${email}`);
      qc.invalidateQueries({ queryKey: ["admin_profiles"] });
      setEmail("");
      setFullName("");
      setRole("editor");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send invite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Invite Admin</h2>
        <p className="mb-5 text-sm text-on-surface-variant">They&apos;ll receive an email invitation to set their own password.</p>
        <div className="space-y-4">
          <FieldGroup label="Email">
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" type="email" placeholder="colleague@example.com" />
          </FieldGroup>
          <FieldGroup label="Full name (optional)">
            <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} dir="ltr" />
          </FieldGroup>
          <FieldGroup label="Role">
            <SelectField
              value={role}
              onChange={(v) => setRole(v as "admin" | "editor")}
              options={[
                { value: "editor", label: "Editor — content only" },
                { value: "admin", label: "Admin — full access, incl. Users & Settings" },
              ]}
            />
          </FieldGroup>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="outline" size="sm" onClick={onClose}>Cancel</AdminButton>
          <AdminButton size="sm" loading={loading} onClick={handleInvite}>Send Invite</AdminButton>
        </div>
      </div>
    </Dialog>
  );
}
