import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const municipality = request.nextUrl.searchParams.get("municipality")

    let query = supabase.from("municipality_problems").select("*").order("created_at", { ascending: false })

    if (municipality) {
      query = query.eq("municipality_id", municipality)
    }

    const { data: problems, error } = await query

    if (error) throw error

    // Group and aggregate problems
    const aggregated = problems?.reduce((acc: any, problem: any) => {
      if (!acc[problem.municipality_id]) {
        acc[problem.municipality_id] = {
          municipality_name: problem.municipality_name,
          problems: [],
        }
      }
      acc[problem.municipality_id].problems.push(problem)
      return acc
    }, {})

    if (municipality && aggregated && aggregated[municipality]) {
      return NextResponse.json({
        success: true,
        data: aggregated[municipality],
      })
    }

    return NextResponse.json({
      success: true,
      data: aggregated || {},
    })
  } catch (error) {
    console.error("[v0] Error fetching statistics:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij ophalen statistieken",
      },
      { status: 500 },
    )
  }
}
