-- Salon Services and Booking Schema
-- This migration adds tables for salon-specific functionality

-- Service categories table
create table public.service_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.service_categories enable row level security;

-- RLS policies for service_categories (public read)
create policy "Service categories are viewable by everyone"
  on public.service_categories for select
  using (true);

-- Services table
create table public.services (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.service_categories(id) on delete set null,
  name text not null,
  description text not null,
  duration integer not null, -- in minutes
  price decimal(10, 2) not null,
  image_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.services enable row level security;

-- RLS policies for services (public read active services)
create policy "Active services are viewable by everyone"
  on public.services for select
  using (is_active = true);

-- Staff members table
create table public.staff_members (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  title text not null,
  bio text,
  specialties text[] default array[]::text[],
  image_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.staff_members enable row level security;

-- RLS policies for staff_members (public read active staff)
create policy "Active staff are viewable by everyone"
  on public.staff_members for select
  using (is_active = true);

-- Appointments table
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.user_profiles(id) on delete cascade not null,
  service_id uuid references public.services(id) on delete restrict not null,
  staff_id uuid references public.staff_members(id) on delete restrict not null,
  appointment_date date not null,
  appointment_time time not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes text,
  cancellation_reason text,
  cancelled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Prevent double-booking: unique constraint on staff + date + time
  constraint unique_staff_appointment unique (staff_id, appointment_date, appointment_time)
);

-- Enable RLS
alter table public.appointments enable row level security;

-- RLS policies for appointments
-- Users can view their own appointments
create policy "Users can view their own appointments"
  on public.appointments for select
  using (auth.uid() = (select user_id from public.user_profiles where id = customer_id));

-- Users can create appointments for themselves
create policy "Users can create their own appointments"
  on public.appointments for insert
  with check (auth.uid() = (select user_id from public.user_profiles where id = customer_id));

-- Users can update their own appointments (notes, cancellation)
create policy "Users can update their own appointments"
  on public.appointments for update
  using (auth.uid() = (select user_id from public.user_profiles where id = customer_id));

-- Staff availability table (optional - for managing blocked times)
create table public.staff_availability (
  id uuid default gen_random_uuid() primary key,
  staff_id uuid references public.staff_members(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0 = Sunday, 6 = Saturday
  start_time time not null,
  end_time time not null,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.staff_availability enable row level security;

-- RLS policies for staff_availability (public read)
create policy "Staff availability is viewable by everyone"
  on public.staff_availability for select
  using (true);

-- Gallery images table
create table public.gallery_images (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  image_url text not null,
  caption text,
  alt_text text not null,
  display_order integer default 0,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.gallery_images enable row level security;

-- RLS policies for gallery_images (public read)
create policy "Gallery images are viewable by everyone"
  on public.gallery_images for select
  using (true);

-- Create indexes for better query performance
create index idx_services_category on public.services(category_id);
create index idx_services_active on public.services(is_active);
create index idx_appointments_customer on public.appointments(customer_id);
create index idx_appointments_staff on public.appointments(staff_id);
create index idx_appointments_date on public.appointments(appointment_date);
create index idx_appointments_status on public.appointments(status);
create index idx_staff_availability_staff on public.staff_availability(staff_id);
create index idx_gallery_category on public.gallery_images(category);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_service_categories_updated_at before update on public.service_categories
  for each row execute function update_updated_at_column();

create trigger update_services_updated_at before update on public.services
  for each row execute function update_updated_at_column();

create trigger update_staff_members_updated_at before update on public.staff_members
  for each row execute function update_updated_at_column();

create trigger update_appointments_updated_at before update on public.appointments
  for each row execute function update_updated_at_column();

create trigger update_staff_availability_updated_at before update on public.staff_availability
  for each row execute function update_updated_at_column();

create trigger update_gallery_images_updated_at before update on public.gallery_images
  for each row execute function update_updated_at_column();
