-- Generic version history for every editable entity (page_sections, services,
-- specialties, videos, blog_posts, faq_items, testimonials, site_settings).
-- One polymorphic table instead of a bespoke history table per content type.

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  snapshot jsonb not null,
  created_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create index content_revisions_entity_idx on public.content_revisions(entity_type, entity_id, created_at desc);

alter table public.content_revisions enable row level security;

-- Admin-only in both directions — revision history is an editorial tool,
-- never exposed publicly.
create policy "admin manage content revisions"
  on public.content_revisions for all using (public.is_admin()) with check (public.is_admin());
