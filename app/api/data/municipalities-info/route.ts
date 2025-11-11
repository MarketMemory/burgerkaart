import { type NextRequest, NextResponse } from "next/server"

/**
 * Returns list of all municipalities with basic info
 */
export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching municipalities list")

    const municipalities = [
      {
        name: "Amsterdam",
        province: "Noord-Holland",
        slug: "amsterdam",
        population: 873000,
        coordinates: [52.3676, 4.9041],
      },
      {
        name: "Rotterdam",
        province: "Zuid-Holland",
        slug: "rotterdam",
        population: 643000,
        coordinates: [51.9225, 4.4792],
      },
      {
        name: "Utrecht",
        province: "Utrecht",
        slug: "utrecht",
        population: 361000,
        coordinates: [52.0902, 5.1075],
      },
      {
        name: "Den Haag",
        province: "Zuid-Holland",
        slug: "den-haag",
        population: 541000,
        coordinates: [52.0705, 4.3007],
      },
      {
        name: "Groningen",
        province: "Groningen",
        slug: "groningen",
        population: 235000,
        coordinates: [53.2194, 6.5665],
      },
      {
        name: "Leiden",
        province: "Zuid-Holland",
        slug: "leiden",
        population: 125000,
        coordinates: [52.1601, 4.4941],
      },
      {
        name: "Tilburg",
        province: "Noord-Brabant",
        slug: "tilburg",
        population: 222000,
        coordinates: [51.5581, 5.0875],
      },
    ]

    return NextResponse.json({
      success: true,
      source: "Municipalities Directory",
      timestamp: new Date().toISOString(),
      totalMunicipalities: municipalities.length,
      data: municipalities,
    })
  } catch (error) {
    console.error("[v0] Municipalities list error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch municipalities",
      },
      { status: 500 },
    )
  }
}
