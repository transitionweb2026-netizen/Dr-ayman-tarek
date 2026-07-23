-- Dr. Ayman Tarek's "Technical Specialties" grid — same shape as services
-- (per-row image upload makes a dedicated table nicer to edit than a JSONB
-- array), but only reachable from that page's editor, no sidebar entry.

create table public.specialties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  short_description_en text not null default '',
  short_description_ar text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  image_media_id uuid references public.media_assets(id) on delete set null,
  recovery_en text,
  recovery_ar text,
  duration_en text,
  duration_ar text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index specialties_status_order_idx on public.specialties(status, display_order);

create trigger specialties_set_updated_at
  before update on public.specialties
  for each row execute function public.set_updated_at();

alter table public.specialties enable row level security;
create policy "public read published specialties"
  on public.specialties for select using (status = 'published');
create policy "admin manage specialties"
  on public.specialties for all using (public.is_admin()) with check (public.is_admin());
