import { type NextRequest, NextResponse } from "next/server"

// Facility costs in thousands of euros per year
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
  policeStation: {
    setup: 2000,
    annual: 1500,
    description: "Politiebureau",
  },
  doctorClinic: {
    setup: 500,
    annual: 400,
    description: "Huisartsenpraktijk",
  },
  asylumCenter: {
    setup: 3000,
    annual: 8000,
    description: "Asielcentrum (120 plaatsen)",
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { facilities, baseBudget } = body

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

    const remainingBudget = baseBudget - totalAnnualCost // Corrected variable name
    const isFeasible = remainingBudget >= 0

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
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij budgetberekening",
      },
      { status: 400 },
    )
  }
}
