import { type NextRequest, NextResponse } from "next/server"

// Share proposals data (in production, use a real database)
const proposals: any[] = []
const votes: Map<string, string[]> = new Map()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const proposalId = params.id
    const body = await request.json()
    const userId = body.userId || `user-${Math.random().toString(36).substr(2, 9)}`

    const proposal = proposals.find((p) => p.id === proposalId)
    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Voorstel niet gevonden",
        },
        { status: 404 },
      )
    }

    const proposalVotes = votes.get(proposalId) || []
    if (proposalVotes.includes(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Je hebt al gestemd op dit voorstel",
        },
        { status: 400 },
      )
    }

    proposalVotes.push(userId)
    votes.set(proposalId, proposalVotes)
    proposal.votes = proposalVotes.length

    return NextResponse.json({
      success: true,
      message: "Stem opgeteld",
      data: proposal,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij stemmen",
      },
      { status: 400 },
    )
  }
}
