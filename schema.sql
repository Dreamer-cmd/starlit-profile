
-- Schema for Supabase

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  name text not null,
  avatar text,
  status text,
  bio text,
  featured text,
  theme text default 'cosmic',
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Social links table
create table social_links (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles on delete cascade not null,
  platform text not null,
  url text not null,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table social_links enable row level security;

-- Create profiles for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, name, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New User'),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS Policies for profiles table
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- RLS Policies for social_links table
create policy "Social links are viewable by everyone"
  on social_links for select
  using (true);

create policy "Users can insert their own social links"
  on social_links for insert
  with check (auth.uid() = profile_id);

create policy "Users can update their own social links"
  on social_links for update
  using (auth.uid() = profile_id);

create policy "Users can delete their own social links"
  on social_links for delete
  using (auth.uid() = profile_id);
