import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const proposalId = params.id

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"

    // Check if proposal exists
    const { data: proposal, error: proposalError } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", proposalId)
      .single()

    if (proposalError || !proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Voorstel niet gevonden",
        },
        { status: 404 },
      )
    }

    const { data: existingVote, error: voteCheckError } = await supabase
      .from("votes")
      .select("*")
      .eq("proposal_id", proposalId)
      .eq("voter_ip", clientIp)
      .single()

    if (existingVote) {
      return NextResponse.json(
        {
          success: false,
          message: "Je hebt al gestemd op dit voorstel",
        },
        { status: 400 },
      )
    }

    const { error: insertError } = await supabase.from("votes").insert([
      {
        proposal_id: proposalId,
        voter_ip: clientIp,
        vote_value: 1,
      },
    ])

    if (insertError) throw insertError

    const { data: updatedProposal, error: updateError } = await supabase
      .from("proposals")
      .update({ votes_count: (proposal.votes_count || 0) + 1 })
      .eq("id", proposalId)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      message: "Stem opgeteld",
      data: updatedProposal,
    })
  } catch (error) {
    console.error("[v0] Error voting:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Fout bij stemmen",
      },
      { status: 400 },
    )
  }
}
