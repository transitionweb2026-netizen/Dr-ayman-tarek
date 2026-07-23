"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Stethoscope, Video, Newspaper, Quote, HelpCircle, Mail, ImageIcon, ArrowRight } from "lucide-react";
import { AdminCard } from "@/components/admin/ui/Card";
import { Skeleton } from "@/components/admin/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";

function useDashboardCounts() {
  return useQuery({
    queryKey: ["dashboard-counts"],
    queryFn: async () => {
      const supabase = createClient();
      const tables = ["services", "videos", "blog_posts", "testimonials", "faq_items", "media_assets", "contact_messages"] as const;
      const results = await Promise.all(tables.map((t) => supabase.from(t).select("*", { count: "exact", head: true })));
      const counts: Record<string, number> = {};
      tables.forEach((t, i) => { counts[t] = results[i].count ?? 0; });
      const { count: newMessages } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new");
      const result: Record<string, number> = { ...counts, newMessages: newMessages ?? 0 };
      return result;
    },
  });
}

function useRecentMessages() {
  return useQuery({
    queryKey: ["dashboard-recent-messages"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    },
  });
}

const STAT_CARDS = [
  { key: "services", label: "Services", href: "/admin/pages/services", icon: Stethoscope },
  { key: "videos", label: "Videos", href: "/admin/pages/videos", icon: Video },
  { key: "blog_posts", label: "Articles", href: "/admin/pages/blog", icon: Newspaper },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { key: "faq_items", label: "FAQ Items", href: "/admin/faq", icon: HelpCircle },
  { key: "media_assets", label: "Media Files", href: "/admin/media", icon: ImageIcon },
];

export default function DashboardPage() {
  const { data: counts, isLoading } = useDashboardCounts();
  const { data: messages, isLoading: messagesLoading } = useRecentMessages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Overview of your site&apos;s content.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {STAT_CARDS.map((card) => (
          <Link key={card.key} href={card.href}>
            <AdminCard className="transition-colors hover:border-primary/30">
              <card.icon className="icon-neon mb-3 h-5 w-5" />
              {isLoading ? <Skeleton className="h-7 w-10" /> : <p className="text-2xl font-bold text-white">{counts?.[card.key] ?? 0}</p>}
              <p className="mt-0.5 text-xs text-on-surface-variant">{card.label}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent Contact Messages</p>
            {!isLoading && (counts?.newMessages ?? 0) > 0 && (
              <span className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary">{counts?.newMessages} new</span>
            )}
          </div>
          {messagesLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          ) : !messages || messages.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-on-surface-variant">
              <Mail className="h-6 w-6" />
              <span className="text-sm">No messages yet</span>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-xl border border-outline-variant/15 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{m.full_name}</p>
                    <p className="truncate text-xs text-on-surface-variant" dir="ltr">{m.email} · {m.phone}</p>
                  </div>
                  <span className={m.status === "new" ? "shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary" : "shrink-0 text-[10px] text-on-surface-variant"}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link href="/admin/pages/contact" className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline">
            View all messages <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </AdminCard>

        <AdminCard>
          <p className="mb-4 text-sm font-semibold text-white">Quick Links</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Add Service", href: "/admin/pages/services" },
              { label: "Add Video", href: "/admin/pages/videos" },
              { label: "Write Article", href: "/admin/pages/blog/new" },
              { label: "Upload Media", href: "/admin/media" },
              { label: "Site Settings", href: "/admin/settings" },
              { label: "Manage Users", href: "/admin/users" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl border border-outline-variant/20 px-4 py-3 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
