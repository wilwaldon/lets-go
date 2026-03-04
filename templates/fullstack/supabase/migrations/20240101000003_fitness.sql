-- Fitness & Gym Schema
-- This migration adds tables for fitness-specific functionality

-- Class categories table
create table public.class_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.class_categories enable row level security;

-- RLS policies for class_categories (public read)
create policy "Class categories are viewable by everyone"
  on public.class_categories for select
  using (true);

-- Class types table (yoga, HIIT, spin, etc.)
create table public.class_types (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.class_categories(id) on delete set null,
  name text not null,
  description text not null,
  duration integer not null, -- in minutes
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced', 'all_levels')),
  max_capacity integer not null default 20,
  image_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.class_types enable row level security;

-- RLS policies for class_types (public read active classes)
create policy "Active class types are viewable by everyone"
  on public.class_types for select
  using (is_active = true);

-- Instructors table
create table public.instructors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  title text not null,
  bio text,
  specialties text[] default array[]::text[],
  certifications text[] default array[]::text[],
  image_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.instructors enable row level security;

-- RLS policies for instructors (public read active instructors)
create policy "Active instructors are viewable by everyone"
  on public.instructors for select
  using (is_active = true);

-- Class sessions table (recurring schedule)
create table public.class_sessions (
  id uuid default gen_random_uuid() primary key,
  class_type_id uuid references public.class_types(id) on delete cascade not null,
  instructor_id uuid references public.instructors(id) on delete restrict not null,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0 = Sunday, 6 = Saturday
  start_time time not null,
  end_time time not null,
  max_capacity integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Prevent double-booking: unique constraint on instructor + day + time
  constraint unique_instructor_session unique (instructor_id, day_of_week, start_time)
);

-- Enable RLS
alter table public.class_sessions enable row level security;

-- RLS policies for class_sessions (public read active sessions)
create policy "Active class sessions are viewable by everyone"
  on public.class_sessions for select
  using (is_active = true);

-- Class bookings table
create table public.class_bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  class_session_id uuid references public.class_sessions(id) on delete restrict not null,
  booking_date date not null, -- The specific date they're attending this recurring class
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'no_show')),
  cancellation_reason text,
  cancelled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Prevent double-booking: user can't book same session on same date twice
  constraint unique_user_booking unique (user_id, class_session_id, booking_date)
);

-- Enable RLS
alter table public.class_bookings enable row level security;

-- RLS policies for class_bookings
-- Users can view their own bookings
create policy "Users can view their own class bookings"
  on public.class_bookings for select
  using (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Users can create bookings for themselves
create policy "Users can create their own class bookings"
  on public.class_bookings for insert
  with check (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Users can update their own bookings (cancellation)
create policy "Users can update their own class bookings"
  on public.class_bookings for update
  using (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Membership plans table
create table public.membership_plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  price decimal(10, 2) not null,
  interval text not null check (interval in ('month', 'year')),
  features text[] not null,
  is_popular boolean default false,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.membership_plans enable row level security;

-- RLS policies for membership_plans (public read active plans)
create policy "Active membership plans are viewable by everyone"
  on public.membership_plans for select
  using (is_active = true);

-- User memberships table
create table public.user_memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  plan_id uuid references public.membership_plans(id) on delete restrict not null,
  status text not null default 'active' check (status in ('active', 'cancelled', 'paused', 'expired')),
  start_date date not null,
  end_date date,
  auto_renew boolean default true,
  payment_provider text, -- 'stripe' or 'square'
  payment_subscription_id text, -- External subscription ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_memberships enable row level security;

-- RLS policies for user_memberships
-- Users can view their own memberships
create policy "Users can view their own memberships"
  on public.user_memberships for select
  using (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Create indexes for better query performance
create index idx_class_types_category on public.class_types(category_id);
create index idx_class_types_active on public.class_types(is_active);
create index idx_class_sessions_class_type on public.class_sessions(class_type_id);
create index idx_class_sessions_instructor on public.class_sessions(instructor_id);
create index idx_class_sessions_day on public.class_sessions(day_of_week);
create index idx_class_bookings_user on public.class_bookings(user_id);
create index idx_class_bookings_session on public.class_bookings(class_session_id);
create index idx_class_bookings_date on public.class_bookings(booking_date);
create index idx_class_bookings_status on public.class_bookings(status);
create index idx_membership_plans_active on public.membership_plans(is_active);
create index idx_user_memberships_user on public.user_memberships(user_id);
create index idx_user_memberships_status on public.user_memberships(status);

-- Create triggers for updated_at
create trigger update_class_categories_updated_at before update on public.class_categories
  for each row execute function update_updated_at_column();

create trigger update_class_types_updated_at before update on public.class_types
  for each row execute function update_updated_at_column();

create trigger update_instructors_updated_at before update on public.instructors
  for each row execute function update_updated_at_column();

create trigger update_class_sessions_updated_at before update on public.class_sessions
  for each row execute function update_updated_at_column();

create trigger update_class_bookings_updated_at before update on public.class_bookings
  for each row execute function update_updated_at_column();

create trigger update_membership_plans_updated_at before update on public.membership_plans
  for each row execute function update_updated_at_column();

create trigger update_user_memberships_updated_at before update on public.user_memberships
  for each row execute function update_updated_at_column();
