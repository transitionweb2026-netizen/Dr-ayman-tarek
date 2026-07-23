-- Two items flagged by the Supabase security advisor after the CMS migration:
-- schema_migrations (this tracking table itself) was exposed to PostgREST
-- with RLS disabled, and set_updated_at() had a mutable search_path. Neither
-- is queried by the app at runtime, so both fixes are pure lockdown with no
-- behavioral impact.

alter table public.schema_migrations enable row level security;

alter function public.set_updated_at() set search_path = public;
