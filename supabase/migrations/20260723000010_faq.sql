-- FAQ collection (sidebar top-level CRUD). `category` lets the same table
-- back both Home's "Common Questions" and Contact's "Contact Questions"
-- instead of the two duplicated inline lists that exist today.

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_ar text not null,
  answer_en text not null,
  answer_ar text not null,
  category text not null default 'general' check (category in ('general', 'contact')),
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index faq_items_category_order_idx on public.faq_items(category, status, display_order);

create trigger faq_items_set_updated_at
  before update on public.faq_items
  for each row execute function public.set_updated_at();

alter table public.faq_items enable row level security;
create policy "public read published faq"
  on public.faq_items for select using (status = 'published');
create policy "admin manage faq"
  on public.faq_items for all using (public.is_admin()) with check (public.is_admin());
