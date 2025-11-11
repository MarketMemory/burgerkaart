/**
 * Client library for accessing open data sources
 * PDOK, CBS, and other Dutch geographic/statistical data
 */

export async function fetchPDOKGeometries() {
  try {
    const response = await fetch("/api/data/pdok-geojson")
    return await response.json()
  } catch (error) {
    console.error("Error fetching PDOK geometries:", error)
    return null
  }
}

export async function fetchCBSStatistics(municipality?: string) {
  try {
    const url = municipality ? `/api/data/cbs-statistics?municipality=${municipality}` : "/api/data/cbs-statistics"

    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error("Error fetching CBS statistics:", error)
    return null
  }
}

export async function fetchFacilitiesDirectory(province?: string, type?: string) {
  try {
    const params = new URLSearchParams()
    if (province) params.append("province", province)
    if (type) params.append("type", type)

    const response = await fetch(`/api/data/facilities-directory?${params}`)
    return await response.json()
  } catch (error) {
    console.error("Error fetching facilities:", error)
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

  return stats.problems.map((p: any) => ({
    indicator: p.indicator,
    severity: p.severity,
    value: p.value,
  }))
}
