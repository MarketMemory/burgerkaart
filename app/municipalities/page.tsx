"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/layout/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Users } from "lucide-react"

interface Municipality {
  name: string
  population: number
  growthRate: number
  unemploymentRate: number
  problemCount: number
}

const MAJOR_MUNICIPALITIES: Municipality[] = [
  { name: "Amsterdam", population: 873000, growthRate: 1.2, unemploymentRate: 3.8, problemCount: 4 },
  { name: "Rotterdam", population: 643000, growthRate: 0.8, unemploymentRate: 5.2, problemCount: 3 },
  { name: "Utrecht", population: 361000, growthRate: 1.5, unemploymentRate: 3.5, problemCount: 3 },
  { name: "Den Haag", population: 537000, growthRate: 0.5, unemploymentRate: 4.1, problemCount: 2 },
  { name: "Eindhoven", population: 238000, growthRate: 2.1, unemploymentRate: 3.0, problemCount: 2 },
  { name: "Groningen", population: 234000, growthRate: 0.9, unemploymentRate: 4.8, problemCount: 2 },
]

export default function MunicipalitiesPage() {
  const [search, setSearch] = useState("")
  const [municipalities, setMunicipalities] = useState<Municipality[]>(MAJOR_MUNICIPALITIES)

  const filtered = municipalities.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gemeenten</h1>
          <p className="text-muted-foreground">Bekijk de problemen per gemeente en dien voorstellen in</p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Zoek gemeente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((municipality) => (
            <Link
              key={municipality.name}
              href={`/municipalities/${municipality.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{municipality.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <MapPin size={14} />
                      <span>Nederland</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users size={14} />
                      Inwoners
                    </span>
                    <span className="font-semibold text-foreground">
                      {(municipality.population / 1000).toFixed(0)}K
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Groei</span>
                    <span
                      className={`font-semibold ${municipality.growthRate > 1 ? "text-green-600" : "text-slate-600"}`}
                    >
                      {municipality.growthRate}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm text-muted-foreground">Werkloosheid</span>
                    <span className="font-semibold text-foreground">{municipality.unemploymentRate}%</span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                    <span className="text-sm text-red-700 font-medium">Problemen</span>
                    <span className="font-bold text-red-700">{municipality.problemCount}</span>
                  </div>
                </div>

                <Button className="w-full mt-auto" variant="default">
                  Details bekijken
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Geen gemeenten gevonden</p>
          </Card>
        )}
      </main>
    </div>
  )
}
