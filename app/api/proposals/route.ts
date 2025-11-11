import { type NextRequest, NextResponse } from "next/server"

// In-memory database for MVP (replace with real DB later)
const proposals: any[] = []
const votes: Map<string, string[]> = new Map()

export async function GET(request: NextRequest) {
  const province = request.nextUrl.searchParams.get("province")
  const facility = request.nextUrl.searchParams.get("facility")

  let filtered = proposals

  if (province) {
    filtered = filtered.filter((p) => p.province === province)
  }
  if (facility) {
    filtered = filtered.filter((p) => p.facilityType === facility)
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const proposal = {
      id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      description: body.description,
      province: body.province,
      municipality: body.municipality,
      facilityType: body.facilityType,
      action: body.action, // 'add' or 'remove'
      createdAt: new Date().toISOString(),
      votes: 0,
      status: "active",
    }

    proposals.push(proposal)
    votes.set(proposal.id, [])

    return NextResponse.json(
      {
        success: true,
        message: "Voorstel ingediend",
        data: proposal,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij indienen voorstel",
      },
      { status: 400 },
    )
  }
}
