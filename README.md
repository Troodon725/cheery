# Holiday Hub

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

You can find these credentials in your Supabase project dashboard under Project Settings > API.

## Database Setup

1. Go to your Supabase project's SQL Editor
2. Copy the contents of `supabase/migrations/20240320000000_create_events_table.sql`
3. Paste and run the SQL in the SQL Editor

This will:
- Create the events table with proper constraints
- Set up Row Level Security (RLS)
- Create policies for secure data access