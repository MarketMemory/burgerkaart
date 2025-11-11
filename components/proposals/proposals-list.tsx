"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchProposals, voteOnProposal } from "@/lib/api-client"
import { ThumbsUp } from "lucide-react"

interface ProposalsListProps {
  refreshTrigger: number
}

interface Proposal {
  id: string
  title: string
  description: string
  province: string
  municipality: string
  facilityType: string
  action: "add" | "remove"
  votes: number
  createdAt: string
}

export default function ProposalsList({ refreshTrigger }: ProposalsListProps) {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadProposals = async () => {
      setLoading(true)
      try {
        const result = await fetchProposals()
        if (result.success) {
          setProposals(result.data || [])
        }
      } catch (error) {
        console.error("Error loading proposals:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProposals()
  }, [refreshTrigger])

  const handleVote = async (proposalId: string) => {
    if (votedProposals.has(proposalId)) return

    try {
      const result = await voteOnProposal(proposalId)
      if (result.success) {
        setProposals(proposals.map((p) => (p.id === proposalId ? { ...p, votes: result.data.votes } : p)))
        setVotedProposals(new Set([...votedProposals, proposalId]))
      }
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Voorstellen laden...</div>
  }

  if (proposals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nog geen voorstellen ingediend</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {proposals
        .sort((a, b) => b.votes - a.votes)
        .map((proposal) => (
          <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      proposal.action === "add" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {proposal.action === "add" ? "+ Toevoegen" : "- Verwijderen"}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {proposal.facilityType}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{proposal.title}</h3>
                <p className="text-muted-foreground mb-3">{proposal.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{proposal.province}</span>
                  <span>{proposal.municipality}</span>
                  <span>{new Date(proposal.createdAt).toLocaleDateString("nl-NL")}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{proposal.votes}</div>
                  <div className="text-xs text-muted-foreground">stemmen</div>
                </div>
                <Button
                  onClick={() => handleVote(proposal.id)}
                  disabled={votedProposals.has(proposal.id)}
                  className="flex items-center gap-2"
                  variant={votedProposals.has(proposal.id) ? "outline" : "default"}
                >
                  <ThumbsUp size={16} />
                  {votedProposals.has(proposal.id) ? "Gestemd" : "Stemmen"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
    </div>
  )
}
