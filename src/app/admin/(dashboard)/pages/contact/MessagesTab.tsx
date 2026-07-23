"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { DataTable } from "@/components/admin/ui/DataTable";
import { SelectField } from "@/components/admin/ui/Field";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";

type Message = Tables<"contact_messages">;

function useMessages() {
  return useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function MessagesTab() {
  const { data: messages, isLoading } = useMessages();
  const qc = useQueryClient();

  async function updateStatus(id: string, status: Message["status"]) {
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["contact_messages"] });
  }

  async function handleDelete(item: Message) {
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["contact_messages"] });
    toast.success("Deleted");
  }

  return (
    <DataTable
      items={messages || []}
      loading={isLoading}
      searchPlaceholder="Search messages..."
      searchText={(m) => `${m.full_name} ${m.email} ${m.message || ""}`}
      onDelete={handleDelete}
      deleteConfirmTitle={(m) => `Delete message from ${m.full_name}?`}
      emptyIcon={Mail}
      emptyTitle="No messages yet"
      emptyDescription="Submissions from the contact form appear here."
      columns={[
        {
          header: "From",
          render: (m) => (
            <div>
              <p className="font-medium">{m.full_name}</p>
              <p className="text-xs text-on-surface-variant" dir="ltr">{m.email} · {m.phone}</p>
            </div>
          ),
        },
        { header: "Service", render: (m) => <span className="text-on-surface-variant">{m.service_of_interest || "—"}</span> },
        { header: "Message", render: (m) => <span className="line-clamp-2 max-w-xs text-on-surface-variant">{m.message || "—"}</span> },
        {
          header: "Status",
          render: (m) => (
            <div className="w-32">
              <SelectField
                value={m.status}
                onChange={(v) => updateStatus(m.id, v as Message["status"])}
                options={[
                  { value: "new", label: "New" },
                  { value: "contacted", label: "Contacted" },
                  { value: "closed", label: "Closed" },
                ]}
              />
            </div>
          ),
        },
      ]}
    />
  );
}
