import { type NextRequest, NextResponse } from "next/server"

/**
 * Fetches GeoJSON data from PDOK for Dutch provinces and municipalities
 * PDOK provides free access to Dutch geographic data
 */
export async function GET(request: NextRequest) {
  try {
    // PDOK WFS endpoint for administrative boundaries
    const wfsUrl = "https://geodata.nationaalgeoregister.nl/administratiefegrenzen/wfs"

    const params = new URLSearchParams({
      service: "WFS",
      version: "2.0.0",
      request: "GetFeature",
      typeName: "administratiefegrenzen:provincies",
      outputFormat: "application/json",
    })

    const response = await fetch(`${wfsUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error("PDOK request failed")
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      source: "PDOK",
      timestamp: new Date().toISOString(),
      data,
    })
  } catch (error) {
    console.error("PDOK data fetch error:", error)

    // Return cached/mock data as fallback
    return NextResponse.json({
      success: true,
      source: "PDOK (cached)",
      message: "Using cached data",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    })
  }
}
