"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import MunicipalityProfile from "@/components/municipalities/municipality-profile"
import { fetchCBSStatistics, fetchFacilitiesDirectory } from "@/lib/open-data-client"

export default function MunicipalityDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  // Convert slug back to municipality name
  const municipalityName =
    slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || ""

  const [stats, setStats] = useState<any>(null)
  const [facilities, setFacilities] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [statsData, facilitiesData] = await Promise.all([
          fetchCBSStatistics(municipalityName),
          fetchFacilitiesDirectory(),
        ])
        setStats(statsData?.data?.[municipalityName])
        setFacilities(facilitiesData?.data)
      } catch (error) {
        console.error("Error loading municipality data:", error)
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
        <MunicipalityProfile municipality={municipalityName} stats={stats} facilities={facilities} loading={loading} />
      </main>
    </div>
  )
}
