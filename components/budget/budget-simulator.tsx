"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { calculateBudget } from "@/lib/api-client"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FacilityCount {
  school: number
  hospital: number
  policeStation: number
  doctorClinic: number
  asylumCenter: number
}

const FACILITY_INFO = {
  school: {
    label: "Scholen",
    setupCost: 5000,
    annualCost: 2000,
    description: "Basisschool",
    color: "bg-blue-100",
    textColor: "text-blue-700",
  },
  hospital: {
    label: "Ziekenhuizen",
    setupCost: 25000,
    annualCost: 15000,
    description: "Ziekenhuisafdeling",
    color: "bg-red-100",
    textColor: "text-red-700",
  },
  policeStation: {
    label: "Politiebureaus",
    setupCost: 2000,
    annualCost: 1500,
    description: "Politiebureau",
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
  doctorClinic: {
    label: "Huisartsenpraktijken",
    setupCost: 500,
    annualCost: 400,
    description: "Huisartsenpraktijk",
    color: "bg-green-100",
    textColor: "text-green-700",
  },
  asylumCenter: {
    label: "Asielcentra",
    setupCost: 3000,
    annualCost: 8000,
    description: "Asielcentrum (120 plaatsen)",
    color: "bg-purple-100",
    textColor: "text-purple-700",
  },
}

export default function BudgetSimulator() {
  const [baseBudget, setBaseBudget] = useState(50000) // 50 million euros annual
  const [facilities, setFacilities] = useState<FacilityCount>({
    school: 1,
    hospital: 0,
    policeStation: 1,
    doctorClinic: 2,
    asylumCenter: 0,
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFacilityChange = (facility: keyof FacilityCount, value: number) => {
    setFacilities({
      ...facilities,
      [facility]: Math.max(0, value),
    })
  }

  const calculateSimulation = useCallback(async () => {
    setLoading(true)
    try {
      const response = await calculateBudget(facilities, baseBudget)
      if (response.success) {
        setResult(response.data)
      }
    } catch (error) {
      console.error("Error calculating budget:", error)
    } finally {
      setLoading(false)
    }
  }, [facilities, baseBudget])

  // Auto-calculate when facilities or budget changes
  useState(() => {
    const timer = setTimeout(calculateSimulation, 500)
    return () => clearTimeout(timer)
  }, [facilities, baseBudget, calculateSimulation])

  return (
    <div className="space-y-8">
      {/* Budget Input */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Budget configuratie</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Jaarlijks budget (miljoen euro's)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={baseBudget}
              onChange={(e) => setBaseBudget(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">€10M</span>
              <span className="text-2xl font-bold text-primary">€{baseBudget}M</span>
              <span className="text-sm text-muted-foreground">€100M</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Facility Sliders */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Voorzieningen</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(facilities) as Array<keyof FacilityCount>).map((facility) => {
            const info = FACILITY_INFO[facility]
            return (
              <div key={facility} className={`p-4 rounded-lg ${info.color}`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{info.label}</h3>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                  <div className={`text-2xl font-bold ${info.textColor}`}>{facilities[facility]}</div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={facilities[facility]}
                  onChange={(e) => handleFacilityChange(facility, Number.parseInt(e.target.value))}
                  className="w-full"
                />

                <div className="flex justify-between text-xs text-muted-foreground mt-3">
                  <span>Setup: €{info.setupCost / 1000}K</span>
                  <span>Jaarlijks: €{info.annualCost / 1000}K</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Results */}
      {result && (
        <Card className={`p-8 ${result.isFeasible ? "border-green-200" : "border-red-200"}`}>
          <div className="flex items-start gap-4 mb-6">
            {result.isFeasible ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <AlertCircle className="text-red-600" size={24} />
            )}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {result.isFeasible ? "Budget is haalbaar!" : "Budget overschreden"}
              </h2>
              <p className="text-muted-foreground">
                {result.isFeasible
                  ? "Dit budget is realistisch te realiseren."
                  : "Je overschrijdt het beschikbare budget."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Setup-kosten</div>
              <div className="text-2xl font-bold text-primary">€{(result.totalSetupCost / 1000).toFixed(1)}K</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Jaarlijkse kosten</div>
              <div className="text-2xl font-bold text-primary">€{(result.totalAnnualCost / 1000).toFixed(1)}K</div>
            </div>
            <div className={`p-4 rounded-lg ${result.isFeasible ? "bg-green-50" : "bg-red-50"}`}>
              <div className="text-sm text-muted-foreground mb-1">Resterende budget</div>
              <div className={`text-2xl font-bold ${result.isFeasible ? "text-green-600" : "text-red-600"}`}>
                €{(result.remainingBudget / 1000).toFixed(1)}K
              </div>
            </div>
          </div>

          {/* Breakdown */}
          {result.breakdown.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Kosten overzicht</h3>
              <div className="space-y-2">
                {result.breakdown.map((item: any) => (
                  <div key={item.facility} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                    <div>
                      <div className="font-medium text-foreground">{item.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.count}x · Setup: €{(item.setup / 1000).toFixed(1)}K · Jaarlijks: €
                        {(item.annual / 1000).toFixed(1)}K
                      </div>
                    </div>
                    <div className="font-semibold text-primary">€{((item.setup + item.annual) / 1000).toFixed(1)}K</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      <Card className="p-8 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Over deze simulator</h3>
            <p className="text-blue-800 text-sm">
              Deze simulator toont de basiskosten van voorzieningen. Werkelijke kosten kunnen variëren per locatie. De
              bedragen zijn indicatief en gebaseerd op gemiddelden uit openbare data.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
