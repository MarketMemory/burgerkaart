"use client"

import { useState } from "react"

interface NetherlandsMapProps {
  selectedRegion: string | null
  onRegionSelect: (region: string) => void
}

const NETHERLANDS_REGIONS = [
  { name: "Groningen", problems: "Werkgelegenheid, jongerenuitstroom", value: 62 },
  { name: "Friesland", problems: "Bevolkingsdaling, voorzieningen", value: 58 },
  { name: "Drenthe", problems: "Economische groei, voorzieningen", value: 55 },
  { name: "Noord-Holland", problems: "Woningtekort, congestie", value: 75 },
  { name: "Utrecht", problems: "Verkeersdruk, wooncrisis", value: 72 },
  { name: "Flevoland", problems: "Infrastructuur, groei", value: 60 },
  { name: "Gelderland", problems: "Verkeersdrukte, stedelijke groei", value: 65 },
  { name: "Overijssel", problems: "Economische kansen, forenzenverkeer", value: 64 },
  { name: "Zuid-Holland", problems: "Infrastructuur, overstromingsrisico", value: 68 },
  { name: "Zeeland", problems: "Economische kracht, waterrisico", value: 52 },
  { name: "Noord-Brabant", problems: "Economische groei, arbeidsmarkt", value: 59 },
  { name: "Limburg", problems: "Industrie transformatie, werkgelegenheid", value: 63 },
]

function getColorByValue(value: number): string {
  if (value >= 75) return "bg-red-600"
  if (value >= 65) return "bg-orange-500"
  if (value >= 55) return "bg-yellow-500"
  return "bg-green-500"
}

export default function NetherlandsMap({ selectedRegion, onRegionSelect }: NetherlandsMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <div className="w-full bg-gradient-to-br from-blue-100 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Nederlandse Provincies</h2>

        {/* Map Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {NETHERLANDS_REGIONS.map((region) => {
            const isSelected = selectedRegion === region.name
            const isHovered = hoveredRegion === region.name
            const colorClass = getColorByValue(region.value)

            return (
              <button
                key={region.name}
                onClick={() => onRegionSelect(region.name)}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`p-4 rounded-lg transition-all duration-200 cursor-pointer border-2 ${
                  isSelected ? "border-blue-800 shadow-lg scale-105" : "border-slate-300"
                } ${isHovered ? "shadow-md" : "shadow-sm"} ${colorClass} text-white`}
              >
                <div className="font-bold text-lg mb-2">{region.name}</div>
                <div className="text-sm text-white/90 mb-3 line-clamp-2">{region.problems}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Problemen:</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">{region.value}/100</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Probleemintensiteit Legenda</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-600 rounded"></div>
              <span className="text-sm text-slate-700">Hoog (75+)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-sm text-slate-700">Gemiddeld (65-74)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              <span className="text-sm text-slate-700">Laag (55-64)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-sm text-slate-700">Zeer laag (&lt;55)</span>
            </div>
          </div>
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedRegion}</h3>
            <p className="text-slate-700 mb-4">
              {NETHERLANDS_REGIONS.find((r) => r.name === selectedRegion)?.problems}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-sm font-semibold text-slate-600">Probleemintensiteit:</span>
                <div className="text-3xl font-bold text-blue-600">
                  {NETHERLANDS_REGIONS.find((r) => r.name === selectedRegion)?.value}/100
                </div>
              </div>
            </div>
            <a
              href={`/municipalities/${selectedRegion.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Naar gemeenteprofiel
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
