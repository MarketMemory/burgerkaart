# Database Setup Guide

This project uses Supabase for persistent data storage. Follow these steps to set up the database:

## Prerequisites
- Supabase account (free tier available at https://supabase.com)
- Project connected via the Vercel integration

## Setup Steps

### 1. Verify Supabase Integration
- Check that Supabase is connected in your Vercel project settings
- Verify environment variables are available:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

### 2. Run Database Migrations
The database schema is defined in `scripts/01-init-schema.sql`. You have two options:

**Option A: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy the contents of `scripts/01-init-schema.sql`
5. Run the query

**Option B: Using Supabase CLI (if installed)**
\`\`\`bash
supabase db push
\`\`\`

### 3. Verify Tables Created
After running the migration, verify these tables exist in Supabase:
- `proposals` - stores citizen proposals
- `votes` - stores votes on proposals
- `budget_simulations` - stores budget simulator experiments
- `municipality_problems` - stores identified problems per municipality

## Database Schema Overview

### proposals
- `id` (UUID) - Primary key
- `municipality_id` (TEXT) - Municipality identifier
- `municipality_name` (TEXT) - Full municipality name
- `title` (TEXT) - Proposal title
- `description` (TEXT) - Detailed description
- `proposal_type` (TEXT) - 'add_facility' or 'remove_facility'
- `facility_type` (TEXT) - Type of facility (school, doctor, police_station, etc.)
- `estimated_cost` (NUMERIC) - Initial setup cost
- `annual_maintenance` (NUMERIC) - Annual running cost
- `votes_count` (INTEGER) - Number of votes
- `created_at` (TIMESTAMP) - Creation timestamp
- `status` (TEXT) - 'active', 'archived', or 'implemented'

### votes
- `id` (UUID) - Primary key
- `proposal_id` (UUID) - References proposals
- `voter_ip` (TEXT) - IP address of voter (prevents duplicate votes)
- `vote_value` (INTEGER) - 1 for upvote, -1 for downvote
- `created_at` (TIMESTAMP) - Vote timestamp

### budget_simulations
- `id` (UUID) - Primary key
- `municipality_id` (TEXT) - Municipality identifier
- `total_budget` (NUMERIC) - Total budget used in simulation
- `facilities_json` (JSONB) - Facilities configuration
- `user_ip` (TEXT) - IP address of user
- `created_at` (TIMESTAMP) - Simulation timestamp

### municipality_problems
- `id` (UUID) - Primary key
- `municipality_id` (TEXT) - Municipality identifier
- `municipality_name` (TEXT) - Full municipality name
- `problem_type` (TEXT) - Category of problem
- `severity` (TEXT) - 'low', 'medium', or 'high'
- `description` (TEXT) - Problem description
- `created_at` (TIMESTAMP) - Creation timestamp

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- All tables allow public read access
- Insert access is allowed for all users (no authentication required)
- Votes use IP address + proposal_id UNIQUE constraint to prevent duplicates
- For production, consider implementing rate limiting and spam detection

## Troubleshooting

### Tables don't appear after running migration
- Check Supabase dashboard for any error messages
- Verify you have permission to create tables
- Try running the migration again

### API returns 500 errors
- Check browser console for error messages
- Verify environment variables are set correctly
- Check Supabase dashboard logs for any database errors

### Votes not working
- Verify the `votes` table exists
- Check that the UNIQUE constraint on (proposal_id, voter_ip) is in place
- Try voting from a different IP/device

## Next Steps

1. Run the database migration
2. Test creating a proposal via the UI
3. Test voting on a proposal
4. Test the budget simulator
5. Deploy to production

For more help, see the Supabase documentation: https://supabase.com/docs
