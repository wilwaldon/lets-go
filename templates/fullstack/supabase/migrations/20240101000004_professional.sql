-- Professional Services Schema
-- This migration adds tables for professional services (law, consulting, etc.)

-- Service areas table (practice areas)
create table public.service_areas (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.service_areas enable row level security;

-- RLS policies for service_areas (public read)
create policy "Service areas are viewable by everyone"
  on public.service_areas for select
  using (true);

-- Service offerings table
create table public.service_offerings (
  id uuid default gen_random_uuid() primary key,
  service_area_id uuid references public.service_areas(id) on delete cascade not null,
  name text not null,
  description text not null,
  features text[] default array[]::text[],
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.service_offerings enable row level security;

-- RLS policies for service_offerings (public read)
create policy "Service offerings are viewable by everyone"
  on public.service_offerings for select
  using (true);

-- Professionals table (attorneys, consultants, etc.)
create table public.professionals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  title text not null,
  bio text,
  specialties text[] default array[]::text[],
  credentials text[] default array[]::text[],
  image_url text,
  email text,
  phone text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.professionals enable row level security;

-- RLS policies for professionals (public read active professionals)
create policy "Active professionals are viewable by everyone"
  on public.professionals for select
  using (is_active = true);

-- Consultations table
create table public.consultations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  professional_id uuid references public.professionals(id) on delete restrict not null,
  service_area_id uuid references public.service_areas(id) on delete restrict not null,
  consultation_date date not null,
  consultation_time time not null,
  duration integer default 60, -- in minutes
  meeting_type text not null check (meeting_type in ('in_person', 'video', 'phone')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes text,
  cancellation_reason text,
  cancelled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Prevent double-booking: unique constraint on professional + date + time
  constraint unique_professional_consultation unique (professional_id, consultation_date, consultation_time)
);

-- Enable RLS
alter table public.consultations enable row level security;

-- RLS policies for consultations
-- Users can view their own consultations
create policy "Users can view their own consultations"
  on public.consultations for select
  using (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Users can create consultations for themselves
create policy "Users can create their own consultations"
  on public.consultations for insert
  with check (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Users can update their own consultations (cancellation)
create policy "Users can update their own consultations"
  on public.consultations for update
  using (auth.uid() = (select user_id from public.user_profiles where id = user_id));

-- Professional availability table
create table public.professional_availability (
  id uuid default gen_random_uuid() primary key,
  professional_id uuid references public.professionals(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0 = Sunday, 6 = Saturday
  start_time time not null,
  end_time time not null,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.professional_availability enable row level security;

-- RLS policies for professional_availability (public read)
create policy "Professional availability is viewable by everyone"
  on public.professional_availability for select
  using (true);

-- Case studies table
create table public.case_studies (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text not null,
  challenge text,
  solution text,
  results text,
  image_url text,
  is_featured boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.case_studies enable row level security;

-- RLS policies for case_studies (public read)
create policy "Case studies are viewable by everyone"
  on public.case_studies for select
  using (true);

-- Create indexes for better query performance
create index idx_service_offerings_area on public.service_offerings(service_area_id);
create index idx_professionals_active on public.professionals(is_active);
create index idx_consultations_user on public.consultations(user_id);
create index idx_consultations_professional on public.consultations(professional_id);
create index idx_consultations_date on public.consultations(consultation_date);
create index idx_consultations_status on public.consultations(status);
create index idx_professional_availability_professional on public.professional_availability(professional_id);
create index idx_case_studies_category on public.case_studies(category);
create index idx_case_studies_featured on public.case_studies(is_featured);

-- Create triggers for updated_at
create trigger update_service_areas_updated_at before update on public.service_areas
  for each row execute function update_updated_at_column();

create trigger update_service_offerings_updated_at before update on public.service_offerings
  for each row execute function update_updated_at_column();

create trigger update_professionals_updated_at before update on public.professionals
  for each row execute function update_updated_at_column();

create trigger update_consultations_updated_at before update on public.consultations
  for each row execute function update_updated_at_column();

create trigger update_professional_availability_updated_at before update on public.professional_availability
  for each row execute function update_updated_at_column();

create trigger update_case_studies_updated_at before update on public.case_studies
  for each row execute function update_updated_at_column();
