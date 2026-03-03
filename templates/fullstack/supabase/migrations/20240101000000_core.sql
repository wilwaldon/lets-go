-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for profiles updated_at
create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- RLS Policies for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles
  for select
  using (true);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Contact submissions table
create table public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz default now() not null
);

-- RLS for contact submissions
alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  with check (true);

-- Only authenticated users can view submissions (for admin panel later)
create policy "Authenticated users can view submissions"
  on public.contact_submissions
  for select
  using (auth.role() = 'authenticated');

-- Create indexes for performance
create index profiles_updated_at_idx on public.profiles(updated_at);
create index contact_submissions_created_at_idx on public.contact_submissions(created_at);
create index contact_submissions_status_idx on public.contact_submissions(status);
