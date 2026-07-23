-- Media Library: logical folders + asset metadata. Physical storage stays
-- flat (uuid-prefixed) in the `media` Storage bucket (created in the storage
-- policies migration) — folders are a DB-only browsing concept so moving an
-- asset between folders is just an UPDATE, never a storage rename race.

create table public.media_folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references public.media_folders(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index media_folders_parent_id_idx on public.media_folders(parent_id);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  folder_id uuid references public.media_folders(id) on delete set null,
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  kind text not null check (kind in ('image', 'video', 'pdf', 'other')),
  file_size bigint,
  width int,
  height int,
  alt_text_en text,
  alt_text_ar text,
  uploaded_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index media_assets_folder_id_idx on public.media_assets(folder_id);
create index media_assets_kind_idx on public.media_assets(kind);

create trigger media_assets_set_updated_at
  before update on public.media_assets
  for each row execute function public.set_updated_at();

-- admin_profiles.avatar: added here (not in 0002) since media_assets must
-- exist first for the foreign key.
alter table public.admin_profiles
  add column avatar_media_id uuid references public.media_assets(id) on delete set null;

alter table public.media_folders enable row level security;
alter table public.media_assets enable row level security;

-- Media is referenced by public pages (images), so it's publicly readable
-- like the assets themselves in Storage; only admins can manage it.
create policy "public read media folders"
  on public.media_folders for select using (true);
create policy "admin manage media folders"
  on public.media_folders for all using (public.is_admin()) with check (public.is_admin());

create policy "public read media assets"
  on public.media_assets for select using (true);
create policy "admin manage media assets"
  on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
