"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, TrendingUp, Building2, Users, DollarSign } from "lucide-react"
import PDFExportButton from "./pdf-export-button"

interface MunicipalityProfileProps {
  municipality: string
  stats: any
  facilities: any
  loading: boolean
}

export default function MunicipalityProfile({ municipality, stats, facilities, loading }: MunicipalityProfileProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-32 bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{municipality}</h1>
          <p className="text-muted-foreground">Statistieken, problemen en voorstellen voor verbetering</p>
        </div>
        <PDFExportButton municipality={municipality} stats={stats} facilities={facilities} />
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.population && (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Users className="text-blue-500" size={24} />
              <div>
                <div className="text-sm text-muted-foreground">Inwoners</div>
                <div className="text-2xl font-bold text-foreground">{(stats.population / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </Card>
        )}

        {stats?.growthRate !== undefined && (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="text-green-500" size={24} />
              <div>
                <div className="text-sm text-muted-foreground">Groei</div>
                <div className="text-2xl font-bold text-foreground">{stats.growthRate}%</div>
              </div>
            </div>
          </Card>
        )}

        {stats?.unemploymentRate !== undefined && (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <DollarSign className="text-orange-500" size={24} />
              <div>
                <div className="text-sm text-muted-foreground">Werkloosheid</div>
                <div className="text-2xl font-bold text-foreground">{stats.unemploymentRate}%</div>
              </div>
            </div>
          </Card>
        )}

        {stats?.medianAge && (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Users className="text-purple-500" size={24} />
              <div>
                <div className="text-sm text-muted-foreground">Mediaanleeftijd</div>
                <div className="text-2xl font-bold text-foreground">{stats.medianAge} jr</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Problems */}
      {stats?.problems && stats.problems.length > 0 && (
        <Card className="p-8 border-red-200">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-red-600" size={24} />
            <h2 className="text-2xl font-bold text-foreground">Speerpunten</h2>
          </div>

          <div className="space-y-3">
            {stats.problems.map((problem: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{problem.indicator}</h3>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        problem.severity === "high"
                          ? "bg-red-500"
                          : problem.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${problem.value}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      problem.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : problem.severity === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {problem.severity.charAt(0).toUpperCase() + problem.severity.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Facilities */}
      {facilities && (
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-foreground">Huidige voorzieningen</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {facilities[municipality]?.schools && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-muted-foreground">Scholen</div>
                <div className="text-3xl font-bold text-blue-700">{facilities[municipality].schools}</div>
              </div>
            )}
            {facilities[municipality]?.hospitals && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-muted-foreground">Ziekenhuizen</div>
                <div className="text-3xl font-bold text-red-700">{facilities[municipality].hospitals}</div>
              </div>
            )}
            {facilities[municipality]?.policeStations && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-sm text-muted-foreground">Politiebureaus</div>
                <div className="text-3xl font-bold text-yellow-700">{facilities[municipality].policeStations}</div>
              </div>
            )}
            {facilities[municipality]?.doctorClinics && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-muted-foreground">Huisartsenpraktijken</div>
                <div className="text-3xl font-bold text-green-700">{facilities[municipality].doctorClinics}</div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-3">Jouw voorstel indienen</h3>
        <p className="text-blue-800 mb-4">Zag je een probleem? Dien jouw voorstel in en stem op andere voorstellen.</p>
        <Link href="/proposals">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Naar voorstellenpagina</Button>
        </Link>
      </Card>
    </div>
  )
}
