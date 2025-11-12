"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export interface MunicipalityFilters {
  populationMin: number
  populationMax: number
  growthMin: number
  growthMax: number
  unemploymentMax: number
  problemsMin: number
  sortBy: "name" | "population" | "growth" | "unemployment" | "problems"
}

interface FilterPanelProps {
  filters: MunicipalityFilters
  onFilterChange: (filters: MunicipalityFilters) => void
  onReset: () => void
}

export default function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSliderChange = (key: keyof MunicipalityFilters, value: number[]) => {
    if (key.includes("Min")) {
      onFilterChange({ ...filters, [key]: value[0] })
    } else if (key.includes("Max")) {
      onFilterChange({ ...filters, [key]: value[0] })
    }
  }

  return (
    <Card className={`p-6 sticky top-4 transition-all ${isExpanded ? "mb-6" : "mb-2"}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span>Filters</span>
          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
            {Object.values(filters).filter((v) => v !== "name").length}
          </span>
        </button>
        <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Reset
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Population Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Bevolking: {filters.populationMin.toLocaleString("nl-NL")} -{" "}
              {filters.populationMax.toLocaleString("nl-NL")}
            </label>
            <div className="space-y-2">
              <Slider
                value={[filters.populationMin]}
                onValueChange={(val) => handleSliderChange("populationMin", val)}
                min={0}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <Slider
                value={[filters.populationMax]}
                onValueChange={(val) => handleSliderChange("populationMax", val)}
                min={0}
                max={1000000}
                step={10000}
                className="w-full"
              />
            </div>
          </div>

          {/* Growth Rate */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Groei: {filters.growthMin}% - {filters.growthMax}%
            </label>
            <div className="space-y-2">
              <Slider
                value={[filters.growthMin]}
                onValueChange={(val) => handleSliderChange("growthMin", val)}
                min={-5}
                max={5}
                step={0.1}
                className="w-full"
              />
              <Slider
                value={[filters.growthMax]}
                onValueChange={(val) => handleSliderChange("growthMax", val)}
                min={-5}
                max={5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Unemployment */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Max. werkloosheid: {filters.unemploymentMax}%
            </label>
            <Slider
              value={[filters.unemploymentMax]}
              onValueChange={(val) => handleSliderChange("unemploymentMax", val)}
              min={0}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Problem Count */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Min. aantal problemen: {filters.problemsMin}
            </label>
            <Slider
              value={[filters.problemsMin]}
              onValueChange={(val) => handleSliderChange("problemsMin", val)}
              min={0}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Sorteren op</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "name" as const, label: "Naam" },
                { key: "population" as const, label: "Bevolking" },
                { key: "growth" as const, label: "Groei" },
                { key: "unemployment" as const, label: "Werkloosheid" },
                { key: "problems" as const, label: "Problemen" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => onFilterChange({ ...filters, sortBy: option.key })}
                  className={`px-3 py-2 text-xs rounded font-medium transition-colors ${
                    filters.sortBy === option.key
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-foreground hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
