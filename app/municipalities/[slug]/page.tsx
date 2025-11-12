"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import MunicipalityProfile from "@/components/municipalities/municipality-profile"
import { fetchCBSStatistics, fetchFacilitiesDirectory } from "@/lib/open-data-client"
import { getProperMunicipalityName } from "@/lib/municipality-mapping"

export default function MunicipalityDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const municipalityName = getProperMunicipalityName(slug) || ""

  const [stats, setStats] = useState<any>(null)
  const [facilities, setFacilities] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        if (!municipalityName) {
          setError("Municipality not found")
          return
        }

        const [statsData, facilitiesData] = await Promise.all([
          fetchCBSStatistics(municipalityName),
          fetchFacilitiesDirectory(),
        ])

        if (statsData?.success) {
          setStats(statsData?.data)
        } else {
          setError(statsData?.error || "Failed to load statistics")
        }

        setFacilities(facilitiesData?.data)
      } catch (error) {
        console.error("Error loading municipality data:", error)
        setError("Failed to load municipality data")
      } finally {
        setLoading(false)
      }
    }

    if (municipalityName) {
      loadData()
    }
  }, [municipalityName])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && <div className="bg-red-50 text-red-900 p-4 rounded-lg mb-6">Error: {error}</div>}
        <MunicipalityProfile municipality={municipalityName} stats={stats} facilities={facilities} loading={loading} />
      </main>
    </div>
  )
}
