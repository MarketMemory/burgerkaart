/**
 * Client library for accessing open data sources
 * PDOK, CBS, and other Dutch geographic/statistical data
 */

export async function fetchPDOKGeometries(type: "province" | "municipality" = "province") {
  try {
    console.log("[v0] Fetching PDOK geometries for type:", type)
    const response = await fetch(`/api/data/pdok-geojson?type=${type}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "PDOK fetch failed")
    }

    return data
  } catch (error) {
    console.error("[v0] Error fetching PDOK geometries:", error)
    return null
  }
}

export async function fetchCBSStatistics(municipality?: string) {
  try {
    console.log("[v0] Fetching CBS statistics for:", municipality || "all")

    const url = municipality
      ? `/api/data/cbs-statistics?municipality=${encodeURIComponent(municipality)}`
      : "/api/data/cbs-statistics"

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "CBS fetch failed")
    }

    return data
  } catch (error) {
    console.error("[v0] Error fetching CBS statistics:", error)
    return null
  }
}

export async function fetchFacilitiesDirectory(municipality?: string, type?: string) {
  try {
    console.log("[v0] Fetching facilities for:", municipality || "all")

    const params = new URLSearchParams()
    if (municipality) params.append("province", municipality)
    if (type) params.append("type", type)

    const response = await fetch(`/api/data/facilities-directory?${params}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Facilities fetch failed")
    }

    return data
  } catch (error) {
    console.error("[v0] Error fetching facilities:", error)
    return null
  }
}

/**
 * Problem identification based on statistics
 * Analyzes data to suggest areas for improvement
 */
export function analyzeMunicipalProblems(stats: any): Array<{
  indicator: string
  severity: "low" | "medium" | "high"
  value: number
}> {
  if (!stats || !stats.problems) return []

  return stats.problems
    .map((p: any) => ({
      indicator: p.indicator,
      severity: p.severity,
      value: p.value,
    }))
    .sort((a: any, b: any) => {
      // Sort by severity (high > medium > low) then by value
      const severityOrder = { high: 0, medium: 1, low: 2 }
      const severityDiff =
        severityOrder[a.severity as keyof typeof severityOrder] -
        severityOrder[b.severity as keyof typeof severityOrder]
      return severityDiff !== 0 ? severityDiff : b.value - a.value
    })
}

/**
 * Facility cost estimator for budget simulation
 */
export const FACILITY_COSTS = {
  school: { setup: 5000000, annual: 450000 }, // €5M setup, €450K/year
  hospital: { setup: 150000000, annual: 8000000 }, // €150M setup, €8M/year
  policeStation: { setup: 3000000, annual: 400000 }, // €3M setup, €400K/year
  doctorClinic: { setup: 500000, annual: 250000 }, // €500K setup, €250K/year
  asylumCenter: { setup: 2000000, annual: 800000 }, // €2M setup, €800K/year
  childcareCenter: { setup: 1000000, annual: 350000 }, // €1M setup, €350K/year
} as const

/**
 * Calculate total cost for facilities
 */
export function calculateFacilityCosts(facilities: Record<string, number>): {
  totalSetup: number
  totalAnnual: number
  breakdown: Record<string, { setup: number; annual: number }>
} {
  const breakdown: Record<string, { setup: number; annual: number }> = {}
  let totalSetup = 0
  let totalAnnual = 0

  for (const [facilityKey, count] of Object.entries(facilities)) {
    const costKey = facilityKey as keyof typeof FACILITY_COSTS
    if (FACILITY_COSTS[costKey]) {
      const costs = FACILITY_COSTS[costKey]
      breakdown[facilityKey] = {
        setup: costs.setup * count,
        annual: costs.annual * count,
      }
      totalSetup += breakdown[facilityKey].setup
      totalAnnual += breakdown[facilityKey].annual
    }
  }

  return { totalSetup, totalAnnual, breakdown }
}
