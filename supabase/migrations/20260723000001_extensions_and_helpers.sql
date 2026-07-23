-- Extensions + shared helper functions reused by every later migration.

create extension if not exists pgcrypto;

-- Generic updated_at trigger, attached per-table below.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
