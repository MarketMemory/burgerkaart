// API client helpers for frontend

export async function fetchProposals(province?: string, facility?: string) {
  const params = new URLSearchParams()
  if (province) params.append("province", province)
  if (facility) params.append("facility", facility)

  const response = await fetch(`/api/proposals?${params}`)
  return response.json()
}

export async function submitProposal(proposal: {
  title: string
  description: string
  province: string
  municipality: string
  facilityType: string
  action: "add" | "remove"
}) {
  const response = await fetch("/api/proposals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proposal),
  })
  return response.json()
}

export async function voteOnProposal(proposalId: string, userId?: string) {
  const response = await fetch(`/api/proposals/${proposalId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  })
  return response.json()
}

export async function fetchMunicipalStats(municipality?: string) {
  const params = new URLSearchParams()
  if (municipality) params.append("municipality", municipality)

  const response = await fetch(`/api/statistics?${params}`)
  return response.json()
}

export async function calculateBudget(facilities: Record<string, number>, basebudget: number) {
  const response = await fetch("/api/budget/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ facilities, basebudget }),
  })
  return response.json()
}
