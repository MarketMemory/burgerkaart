import { type NextRequest, NextResponse } from "next/server"

/**
 * Fetches GeoJSON data from PDOK for Dutch provinces and municipalities
 * Uses modern OGC API Features endpoint (preferred over WFS)
 */
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "province" // province or municipality

  try {
    console.log("[v0] Fetching PDOK data for type:", type)

    const pdokEndpoint =
      type === "province"
        ? "https://api.pdok.nl/cbs/gebiedsindelingen/ogc/v1/collections/provincie_gegeneraliseerd/items?f=json&limit=100"
        : "https://api.pdok.nl/cbs/gebiedsindelingen/ogc/v1/collections/gemeente_gegeneraliseerd/items?f=json&limit=500"

    const response = await fetch(pdokEndpoint, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error("[v0] PDOK API error:", response.status, response.statusText)
      throw new Error(`PDOK API returned ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] PDOK response received, features count:", data.features?.length)

    // Transform features to include accessible properties
    const transformedFeatures =
      data.features?.map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          name: feature.properties?.statnaam || feature.properties?.name || "Unknown",
          code: feature.properties?.statcode || feature.properties?.id,
        },
      })) || []

    return NextResponse.json({
      success: true,
      source: "PDOK OGC API",
      type,
      timestamp: new Date().toISOString(),
      totalFeatures: transformedFeatures.length,
      data: {
        type: "FeatureCollection",
        features: transformedFeatures,
      },
    })
  } catch (error) {
    console.error("[v0] PDOK fetch error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "PDOK fetch failed",
        source: "PDOK (error)",
      },
      { status: 500 },
    )
  }
}
