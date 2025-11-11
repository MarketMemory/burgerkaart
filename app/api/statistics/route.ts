import { type NextRequest, NextResponse } from "next/server"

// Mock data for common problems per municipality
const municipalStatistics: Record<string, any> = {
  Amsterdam: {
    population: 873000,
    problems: [
      { name: "Woningtekort", severity: "high", percentage: 85 },
      { name: "Verkeersdruk", severity: "high", percentage: 72 },
      { name: "Lerarentekort", severity: "medium", percentage: 45 },
    ],
    facilities: {
      schools: 120,
      hospitals: 8,
      policeStations: 15,
      asylumCenters: 2,
    },
  },
  Rotterdam: {
    population: 643000,
    problems: [
      { name: "Veiligheidszorg", severity: "high", percentage: 68 },
      { name: "Werkloosheid", severity: "medium", percentage: 52 },
      { name: "Huisvesting", severity: "high", percentage: 70 },
    ],
    facilities: {
      schools: 95,
      hospitals: 6,
      policeStations: 12,
      asylumCenters: 3,
    },
  },
  Utrecht: {
    population: 361000,
    problems: [
      { name: "Woningtekort", severity: "high", percentage: 75 },
      { name: "Fietsopslag", severity: "low", percentage: 35 },
      { name: "Zorgverstrekking", severity: "medium", percentage: 48 },
    ],
    facilities: {
      schools: 75,
      hospitals: 4,
      policeStations: 8,
      asylumCenters: 1,
    },
  },
}

export async function GET(request: NextRequest) {
  const municipality = request.nextUrl.searchParams.get("municipality")

  if (municipality && municipalStatistics[municipality]) {
    return NextResponse.json({
      success: true,
      data: municipalStatistics[municipality],
    })
  }

  return NextResponse.json({
    success: true,
    data: municipalStatistics,
  })
}
