-- Contact form submissions. The form currently fakes success client-side
-- with no backend at all — wiring it to a real table is a natural
-- consequence of adding one, surfaced as a "Messages" tab inside the Contact
-- page admin editor (no new sidebar item).

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  service_of_interest text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);
create index contact_messages_status_idx on public.contact_messages(status, created_at desc);

alter table public.contact_messages enable row level security;

-- Public site visitors can submit (insert) but never read back other
-- people's submissions.
create policy "anyone can submit a contact message"
  on public.contact_messages for insert with check (true);

create policy "admin manage contact messages"
  on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());
