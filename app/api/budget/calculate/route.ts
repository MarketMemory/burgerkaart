import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const FACILITY_COSTS = {
  school: {
    setup: 5000,
    annual: 2000,
    description: "Basisschool",
  },
  hospital: {
    setup: 25000,
    annual: 15000,
    description: "Ziekenhuisafdeling",
  },
  police_station: {
    setup: 2000,
    annual: 1500,
    description: "Politiebureau",
  },
  doctor: {
    setup: 500,
    annual: 400,
    description: "Huisartsenpraktijk",
  },
  asylum_center: {
    setup: 3000,
    annual: 8000,
    description: "Asielcentrum (120 plaatsen)",
  },
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { facilities, baseBudget, municipality_id } = body

    let totalSetupCost = 0
    let totalAnnualCost = 0
    const breakdown: any[] = []

    for (const [facilityType, count] of Object.entries(facilities)) {
      const cost = FACILITY_COSTS[facilityType as keyof typeof FACILITY_COSTS]
      if (cost && count > 0) {
        const setup = cost.setup * (count as number)
        const annual = cost.annual * (count as number)
        totalSetupCost += setup
        totalAnnualCost += annual

        breakdown.push({
          facility: facilityType,
          count,
          setup,
          annual,
          description: cost.description,
        })
      }
    }

    const remainingBudget = baseBudget - totalAnnualCost
    const isFeasible = remainingBudget >= 0

    if (municipality_id) {
      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"

      await supabase.from("budget_simulations").insert([
        {
          municipality_id,
          total_budget: baseBudget,
          facilities_json: facilities,
          user_ip: clientIp,
        },
      ])
    }

    return NextResponse.json({
      success: true,
      data: {
        totalSetupCost,
        totalAnnualCost,
        remainingBudget,
        isFeasible,
        breakdown,
        budgetStatus: isFeasible ? "feasible" : "over_budget",
      },
    })
  } catch (error) {
    console.error("[v0] Error calculating budget:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij budgetberekening",
      },
      { status: 400 },
    )
  }
}
