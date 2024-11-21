-- Create events table
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  date date not null,
  time time not null,
  location text not null,
  theme text not null,
  guests integer not null check (guests > 0),
  description text,

  -- Add indexes for better query performance
  constraint events_user_id_date_idx unique (user_id, date)
);

-- Set up Row Level Security (RLS)
alter table public.events enable row level security;

-- Create policy to allow users to only see their own events
create policy "Users can view their own events"
  on public.events for select
  using (auth.uid() = user_id);

-- Create policy to allow users to insert their own events
create policy "Users can insert their own events"
  on public.events for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own events
create policy "Users can update their own events"
  on public.events for update
  using (auth.uid() = user_id);

-- Create policy to allow users to delete their own events
create policy "Users can delete their own events"
  on public.events for delete
  using (auth.uid() = user_id);