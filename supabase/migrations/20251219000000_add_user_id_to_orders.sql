-- Add user_id column to orders table to link purchases to authenticated users
-- This enables the "My Vault" feature where users can see their purchased samples

-- Add nullable user_id column (nullable because guest checkout might still be allowed)
alter table public.orders 
add column if not exists user_id uuid references auth.users(id) on delete set null;

-- Create index for faster user lookups
create index if not exists orders_user_id_idx on public.orders(user_id);

-- Create a policy to allow users to view their own orders
create policy "Users can view their own orders"
  on public.orders
  for select
  using (auth.uid() = user_id);

-- Create a policy for order_items to allow viewing if user owns the order
create policy "Users can view their own order items"
  on public.order_items
  for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Create a view for easy access to user's purchased samples
create or replace view public.user_purchased_samples as
select distinct
  oi.sample_id,
  o.user_id,
  o.email,
  min(o.created_at) as first_purchased_at,
  max(o.created_at) as last_purchased_at
from public.order_items oi
join public.orders o on o.id = oi.order_id
where o.status = 'paid'
group by oi.sample_id, o.user_id, o.email;

-- Grant access to the view
grant select on public.user_purchased_samples to authenticated;



