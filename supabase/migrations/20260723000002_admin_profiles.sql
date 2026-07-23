-- Admin accounts. A Supabase Auth user only gets into /admin if a matching
-- row exists here — having a valid session is not sufficient by itself.

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger admin_profiles_set_updated_at
  before update on public.admin_profiles
  for each row execute function public.set_updated_at();

-- SECURITY DEFINER so this can be safely called from *other* tables' RLS
-- policies without recursing back into admin_profiles' own RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_profiles where id = auth.uid()
  );
$$;

alter table public.admin_profiles enable row level security;

create policy "admins can view all profiles"
  on public.admin_profiles for select
  using (public.is_admin());

create policy "admins can update their own profile"
  on public.admin_profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- No insert/delete policy: admin accounts are created/removed only via the
-- service_role key from a server action (supabase.auth.admin.*), which
-- bypasses RLS entirely — never exposed to the anon or authenticated roles.
