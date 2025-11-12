// Utility functions for map visualization and layer management

export type ProblemSeverity = "high" | "medium" | "low"
export type FacilityType = "school" | "hospital" | "police_station" | "doctor" | "asylum_center"

export interface ProblemData {
  municipality: string
  indicator: string
  severity: ProblemSeverity
  value: number
}

export interface MapLayer {
  id: FacilityType | "problems"
  label: string
  visible: boolean
  color: string
}

// Get color intensity based on problem value (0-100)
export function getColorByProblem(value: number): string {
  if (value >= 80) return "#dc2626" // Red
  if (value >= 60) return "#f97316" // Orange
  if (value >= 40) return "#eab308" // Yellow
  return "#22c55e" // Green
}

// Get color for facility types
export const FACILITY_COLORS: Record<FacilityType, string> = {
  school: "#3b82f6", // Blue
  hospital: "#ef4444", // Red
  police_station: "#f59e0b", // Amber
  doctor: "#10b981", // Emerald
  asylum_center: "#a855f7", // Purple
}

export const LAYER_CONFIG: Record<string, MapLayer> = {
  problems: {
    id: "problems",
    label: "Probleem Intensiteit",
    visible: true,
    color: "#666",
  },
  school: {
    id: "school",
    label: "Scholen",
    visible: false,
    color: FACILITY_COLORS.school,
  },
  hospital: {
    id: "hospital",
    label: "Ziekenhuizen",
    visible: false,
    color: FACILITY_COLORS.hospital,
  },
  police_station: {
    id: "police_station",
    label: "Politiebureaus",
    visible: false,
    color: FACILITY_COLORS.police_station,
  },
  doctor: {
    id: "doctor",
    label: "Huisartsenpraktijken",
    visible: false,
    color: FACILITY_COLORS.doctor,
  },
  asylum_center: {
    id: "asylum_center",
    label: "Asielcentra",
    visible: false,
    color: FACILITY_COLORS.asylum_center,
  },
}
