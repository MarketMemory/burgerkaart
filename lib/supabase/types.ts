// Database type definitions for better TypeScript support
export interface Proposal {
  id: string
  municipality_id: string
  municipality_name: string
  title: string
  description: string
  proposal_type: "add_facility" | "remove_facility"
  facility_type: "school" | "doctor" | "police_station" | "asylum_center" | "hospital" | "library"
  estimated_cost: number
  annual_maintenance: number
  votes_count: number
  created_at: string
  updated_at: string
  created_by_ip: string
  status: "active" | "archived" | "implemented"
}

export interface Vote {
  id: string
  proposal_id: string
  voter_ip: string
  vote_value: 1 | -1
  created_at: string
}

export interface BudgetSimulation {
  id: string
  municipality_id: string
  total_budget: number
  facilities_json: Record<string, number>
  user_ip: string
  created_at: string
}

export interface MunicipalityProblem {
  id: string
  municipality_id: string
  municipality_name: string
  problem_type: string
  severity: "low" | "medium" | "high"
  description: string
  created_at: string
}
