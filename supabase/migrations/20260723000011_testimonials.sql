-- Testimonials collection (sidebar top-level CRUD). `placements` controls
-- which page(s) a testimonial appears on (e.g. {home}, {dr-ayman-tarek}),
-- replacing the two separate inline testimonial lists that exist today.

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  country text,
  role_en text,
  role_ar text,
  review_en text not null,
  review_ar text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  photo_media_id uuid references public.media_assets(id) on delete set null,
  video_url text,
  placements text[] not null default '{}',
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index testimonials_status_order_idx on public.testimonials(status, display_order);
create index testimonials_placements_idx on public.testimonials using gin(placements);

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;
create policy "public read published testimonials"
  on public.testimonials for select using (status = 'published');
create policy "admin manage testimonials"
  on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
