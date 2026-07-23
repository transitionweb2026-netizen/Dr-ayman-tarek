-- Services collection (sidebar top-level CRUD).

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  short_description_en text not null default '',
  short_description_ar text not null default '',
  full_description_en text not null default '',
  full_description_ar text not null default '',
  image_media_id uuid references public.media_assets(id) on delete set null,
  icon text,
  recovery_en text,
  recovery_ar text,
  duration_en text,
  duration_ar text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title_en text,
  seo_title_ar text,
  seo_description_en text,
  seo_description_ar text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index services_status_order_idx on public.services(status, display_order);

create table public.service_benefits (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0
);
create index service_benefits_service_id_idx on public.service_benefits(service_id, display_order);

create table public.service_process_steps (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0
);
create index service_process_steps_service_id_idx on public.service_process_steps(service_id, display_order);

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.service_benefits enable row level security;
alter table public.service_process_steps enable row level security;

create policy "public read published services"
  on public.services for select using (status = 'published');
create policy "admin manage services"
  on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "public read service benefits"
  on public.service_benefits for select using (
    exists (select 1 from public.services s where s.id = service_id and s.status = 'published')
  );
create policy "admin manage service benefits"
  on public.service_benefits for all using (public.is_admin()) with check (public.is_admin());

create policy "public read service process steps"
  on public.service_process_steps for select using (
    exists (select 1 from public.services s where s.id = service_id and s.status = 'published')
  );
create policy "admin manage service process steps"
  on public.service_process_steps for all using (public.is_admin()) with check (public.is_admin());
