import { type NextRequest, NextResponse } from "next/server"

/**
 * Fetches open statistics from CBS (Centraal Bureau voor de Statistiek)
 * CBS provides demographic data, employment stats, education indicators
 */
export async function GET(request: NextRequest) {
  const municipality = request.nextUrl.searchParams.get("municipality")

  try {
    // CBS OData endpoint (public API, no auth needed)
    const cbsApiUrl = "https://opendata.cbs.nl/ODataFeed/odata/84583NED/TypedDataSet"

    const response = await fetch(cbsApiUrl)

    if (!response.ok) {
      throw new Error("CBS API request failed")
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      source: "CBS (Centraal Bureau voor de Statistiek)",
      timestamp: new Date().toISOString(),
      data,
    })
  } catch (error) {
    console.error("CBS data fetch error:", error)

    // Return mock data for demonstration
    const mockStats = {
      Amsterdam: {
        population: 873000,
        growthRate: 1.2,
        unemploymentRate: 3.8,
        medianAge: 38,
        problems: [
          { indicator: "Housing shortage", severity: "high", value: 85 },
          { indicator: "Traffic congestion", severity: "high", value: 72 },
          { indicator: "Teacher shortage", severity: "medium", value: 45 },
          { indicator: "Healthcare waiting lists", severity: "medium", value: 38 },
        ],
      },
      Rotterdam: {
        population: 643000,
        growthRate: 0.8,
        unemploymentRate: 5.2,
        medianAge: 37,
        problems: [
          { indicator: "Safety concerns", severity: "high", value: 68 },
          { indicator: "Unemployment", severity: "medium", value: 52 },
          { indicator: "Housing availability", severity: "high", value: 70 },
        ],
      },
      Utrecht: {
        population: 361000,
        growthRate: 1.5,
        unemploymentRate: 3.5,
        medianAge: 36,
        problems: [
          { indicator: "Housing shortage", severity: "high", value: 75 },
          { indicator: "Bike parking", severity: "low", value: 35 },
          { indicator: "Healthcare provision", severity: "medium", value: 48 },
        ],
      },
    }

    return NextResponse.json({
      success: true,
      source: "CBS (mock data)",
      message: "Using demonstration data",
      data: mockStats,
    })
  }
}
