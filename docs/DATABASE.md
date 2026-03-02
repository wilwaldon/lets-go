# Database Conventions

## Migration Files

- Numbered sequentially: `00001_`, `00002_`, etc.
- Each migration is idempotent where possible
- Always include `created_at` and `updated_at` timestamps on every table
- Always include RLS policies in the same migration that creates the table
- Use UUIDs for all primary keys (`gen_random_uuid()`)

## RLS Policy Pattern

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own data
CREATE POLICY "Users can read own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public read access for non-sensitive data
CREATE POLICY "Public can read"
  ON table_name FOR SELECT
  TO anon
  USING (is_public = true);
```

## Key Principles

- **Row Level Security (RLS)** enabled on every table from day one — no exceptions
- All schemas defined in migration files
- Demo data provided via `seed.sql` for development
- Never skip RLS policies on any table
