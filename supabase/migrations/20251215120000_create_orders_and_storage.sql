create extension if not exists pgcrypto;

-- Orders store purchase status and the private download token (emailed after payment)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending',
  stripe_session_id text unique,
  download_token text not null unique,
  email_sent_at timestamptz,
  email_error text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigserial primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  sample_id integer not null,
  quantity integer not null default 1,
  unit_amount_cents integer not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Storage buckets:
-- - sample-previews: PUBLIC demo previews (mp3)
-- - sample-full: PRIVATE full-quality files (wav) - served only via signed URLs
insert into storage.buckets (id, name, public)
values
  ('sample-previews', 'sample-previews', true),
  ('sample-full', 'sample-full', false)
on conflict (id) do nothing;





