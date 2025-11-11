import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const province = request.nextUrl.searchParams.get("province")
    const facility = request.nextUrl.searchParams.get("facility")
    const municipality = request.nextUrl.searchParams.get("municipality")

    let query = supabase.from("proposals").select("*").eq("status", "active").order("votes_count", { ascending: false })

    if (municipality) {
      query = query.eq("municipality_id", municipality)
    }
    if (facility) {
      query = query.eq("facility_type", facility)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: data || [],
      total: data?.length || 0,
    })
  } catch (error) {
    console.error("[v0] Error fetching proposals:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij ophalen voorstellen",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"

    const { data, error } = await supabase
      .from("proposals")
      .insert([
        {
          municipality_id: body.municipality_id,
          municipality_name: body.municipality_name,
          title: body.title,
          description: body.description,
          proposal_type: body.proposal_type,
          facility_type: body.facility_type,
          estimated_cost: body.estimated_cost || 0,
          annual_maintenance: body.annual_maintenance || 0,
          created_by_ip: clientIp,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      {
        success: true,
        message: "Voorstel ingediend",
        data,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error creating proposal:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij indienen voorstel",
      },
      { status: 400 },
    )
  }
}
