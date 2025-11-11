-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  municipality_id TEXT NOT NULL,
  municipality_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('add_facility', 'remove_facility')),
  facility_type TEXT NOT NULL CHECK (facility_type IN ('school', 'doctor', 'police_station', 'asylum_center', 'hospital', 'library')),
  estimated_cost NUMERIC(12, 2),
  annual_maintenance NUMERIC(12, 2),
  votes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by_ip TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'implemented'))
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  voter_ip TEXT NOT NULL,
  vote_value INTEGER NOT NULL CHECK (vote_value IN (1, -1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(proposal_id, voter_ip)
);

-- Create budget_simulations table for tracking user experiments
CREATE TABLE IF NOT EXISTS budget_simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  municipality_id TEXT NOT NULL,
  total_budget NUMERIC(12, 2) NOT NULL,
  facilities_json JSONB NOT NULL,
  user_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create municipality_problems table for tracking identified problems
CREATE TABLE IF NOT EXISTS municipality_problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  municipality_id TEXT NOT NULL,
  municipality_name TEXT NOT NULL,
  problem_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_proposals_municipality ON proposals(municipality_id);
CREATE INDEX IF NOT EXISTS idx_proposals_facility_type ON proposals(facility_type);
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at);
CREATE INDEX IF NOT EXISTS idx_votes_proposal_id ON votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_votes_voter_ip ON votes(voter_ip);
CREATE INDEX IF NOT EXISTS idx_budget_simulations_municipality ON budget_simulations(municipality_id);
CREATE INDEX IF NOT EXISTS idx_municipality_problems_municipality ON municipality_problems(municipality_id);

-- Enable RLS (Row Level Security) for public access
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE municipality_problems ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON proposals
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON proposals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON votes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON budget_simulations
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON budget_simulations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON municipality_problems
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON municipality_problems
  FOR INSERT WITH CHECK (true);
