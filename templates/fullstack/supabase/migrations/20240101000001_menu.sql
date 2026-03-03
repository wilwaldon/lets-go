-- Menu categories table
create table public.menu_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  display_order int not null default 0,
  created_at timestamptz default now() not null
);

-- Menu items table
create table public.menu_items (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.menu_categories(id) on delete cascade not null,
  name text not null,
  description text,
  price decimal(10,2) not null check (price >= 0),
  image_url text,
  dietary_tags text[] default '{}',
  is_available boolean default true not null,
  display_order int not null default 0,
  created_at timestamptz default now() not null
);

-- Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  guest_email text,
  items jsonb not null,
  subtotal decimal(10,2) not null check (subtotal >= 0),
  tax decimal(10,2) not null check (tax >= 0),
  total decimal(10,2) not null check (total >= 0),
  status text default 'pending' not null check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_id text,
  payment_provider text check (payment_provider in ('stripe', 'square')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  -- Either user_id or guest_email must be present
  constraint user_or_guest_check check (
    (user_id is not null) or (guest_email is not null)
  )
);

-- Trigger for orders updated_at
create trigger on_order_updated
  before update on public.orders
  for each row execute function public.handle_updated_at();

-- RLS Policies for menu_categories
alter table public.menu_categories enable row level security;

create policy "Menu categories are viewable by everyone"
  on public.menu_categories
  for select
  using (true);

-- Admin users can insert/update/delete categories (for future admin panel)
create policy "Authenticated users can manage categories"
  on public.menu_categories
  for all
  using (auth.role() = 'authenticated');

-- RLS Policies for menu_items
alter table public.menu_items enable row level security;

create policy "Available menu items are viewable by everyone"
  on public.menu_items
  for select
  using (is_available = true);

create policy "All menu items viewable by authenticated users"
  on public.menu_items
  for select
  using (auth.role() = 'authenticated');

-- Admin users can manage items (for future admin panel)
create policy "Authenticated users can manage items"
  on public.menu_items
  for all
  using (auth.role() = 'authenticated');

-- RLS Policies for orders
alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders
  for select
  using (
    auth.uid() = user_id
    or
    (guest_email is not null and guest_email = auth.jwt()->>'email')
  );

create policy "Anyone can create orders"
  on public.orders
  for insert
  with check (true);

-- Only the system (via service role) can update orders
create policy "Service role can update orders"
  on public.orders
  for update
  using (auth.role() = 'service_role');

-- Create indexes for performance
create index menu_items_category_id_idx on public.menu_items(category_id);
create index menu_items_is_available_idx on public.menu_items(is_available);
create index menu_items_display_order_idx on public.menu_items(display_order);
create index menu_categories_display_order_idx on public.menu_categories(display_order);
create index orders_user_id_idx on public.orders(user_id);
create index orders_guest_email_idx on public.orders(guest_email);
create index orders_status_idx on public.orders(status);
create index orders_created_at_idx on public.orders(created_at);
