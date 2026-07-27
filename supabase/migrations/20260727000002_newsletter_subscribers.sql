-- Footer newsletter "Subscribe" button had no backend at all (pure dead
-- click). Mirrors the contact_messages precedent: wire it to a real table
-- rather than leaving a fake/disabled interaction.

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  language text not null default 'en' check (language in ('en', 'ar')),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "anyone can subscribe"
  on public.newsletter_subscribers for insert with check (true);

create policy "admin manage newsletter subscribers"
  on public.newsletter_subscribers for all using (public.is_admin()) with check (public.is_admin());
