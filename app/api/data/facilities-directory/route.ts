import { type NextRequest, NextResponse } from "next/server"

/**
 * Aggregates facility location data from various open sources
 * Includes schools, hospitals, police stations, doctor clinics
 */
export async function GET(request: NextRequest) {
  const province = request.nextUrl.searchParams.get("province")
  const facilityType = request.nextUrl.searchParams.get("type")

  try {
    // Mock comprehensive facility data (in production, integrate with actual geodata sources)
    const facilitiesData = {
      "Noord-Holland": {
        schools: 245,
        hospitals: 12,
        policeStations: 18,
        doctorClinics: 98,
        asylumCenters: 3,
      },
      "Zuid-Holland": {
        schools: 198,
        hospitals: 10,
        policeStations: 15,
        doctorClinics: 85,
        asylumCenters: 4,
      },
      Utrecht: {
        schools: 142,
        hospitals: 6,
        policeStations: 10,
        doctorClinics: 65,
        asylumCenters: 2,
      },
      Gelderland: {
        schools: 201,
        hospitals: 11,
        policeStations: 16,
        doctorClinics: 92,
        asylumCenters: 3,
      },
    }

    let result = facilitiesData

    if (province && facilitiesData[province as keyof typeof facilitiesData]) {
      result = {
        [province]: facilitiesData[province as keyof typeof facilitiesData],
      }
    }

    return NextResponse.json({
      success: true,
      source: "Aggregated Open Data Sources",
      timestamp: new Date().toISOString(),
      data: result,
      dataQuality: "demonstration",
      note: "In production, integrate with actual geographic data services like PDOK and CBS OData",
    })
  } catch (error) {
    console.error("Facilities data fetch error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching facilities data",
      },
      { status: 500 },
    )
  }
}
