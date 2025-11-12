"use client"

import { useState } from "react"
import { LAYER_CONFIG, getColorByProblem, type MapLayer } from "@/lib/map-utils"
import LayerToggle from "./layer-toggle"

interface NetherlandsMapProps {
  selectedRegion: string | null
  onRegionSelect: (region: string) => void
}

// More realistic Dutch provinces with better positioning
const NETHERLANDS_REGIONS = [
  {
    name: "Groningen",
    problems: "Werkgelegenheid, jongerenuitstroom",
    problemValue: 62,
    position: { x: 320, y: 30 },
    path: "M 320,30 L 380,35 L 385,70 L 340,75 Z",
  },
  {
    name: "Friesland",
    problems: "Bevolkingsdaling, voorzieningen",
    problemValue: 58,
    position: { x: 220, y: 40 },
    path: "M 220,40 L 310,30 L 340,75 L 320,90 L 200,85 Z",
  },
  {
    name: "Drenthe",
    problems: "Economische groei, voorzieningen",
    problemValue: 55,
    position: { x: 300, y: 110 },
    path: "M 340,75 L 385,70 L 410,120 L 360,130 L 340,100 Z",
  },
  {
    name: "Noord-Holland",
    problems: "Woningtekort, congestie",
    problemValue: 75,
    position: { x: 180, y: 140 },
    path: "M 170,120 L 220,110 L 250,160 L 220,170 L 150,160 Z",
  },
  {
    name: "Utrecht",
    problems: "Verkeersdruk, wooncrisis",
    problemValue: 72,
    position: { x: 240, y: 170 },
    path: "M 220,170 L 290,165 L 300,210 L 250,215 Z",
  },
  {
    name: "Flevoland",
    problems: "Infrastructuur, groei",
    problemValue: 60,
    position: { x: 310, y: 160 },
    path: "M 290,165 L 340,160 L 350,210 L 300,210 Z",
  },
  {
    name: "Gelderland",
    problems: "Verkeersdrukte, stedelijke groei",
    problemValue: 65,
    position: { x: 330, y: 180 },
    path: "M 300,210 L 360,200 L 410,240 L 380,260 L 320,255 Z",
  },
  {
    name: "Overijssel",
    problems: "Economische kansen, forenzenverkeer",
    problemValue: 64,
    position: { x: 360, y: 130 },
    path: "M 360,130 L 410,120 L 430,180 L 410,190 L 380,160 Z",
  },
  {
    name: "Zuid-Holland",
    problems: "Infrastructuur, overstromingsrisico",
    problemValue: 68,
    position: { x: 200, y: 220 },
    path: "M 170,180 L 250,175 L 280,250 L 220,260 L 160,240 Z",
  },
  {
    name: "Zeeland",
    problems: "Economische kracht, waterrisico",
    problemValue: 52,
    position: { x: 140, y: 260 },
    path: "M 130,250 L 180,245 L 200,310 L 140,315 Z",
  },
  {
    name: "Noord-Brabant",
    problems: "Economische groei, arbeidsmarkt",
    problemValue: 59,
    position: { x: 240, y: 280 },
    path: "M 220,260 L 300,255 L 330,330 L 250,335 Z",
  },
  {
    name: "Limburg",
    problems: "Industrie transformatie, werkgelegenheid",
    problemValue: 63,
    position: { x: 340, y: 300 },
    path: "M 300,260 L 360,255 L 390,340 L 320,345 Z",
  },
]

export default function NetherlandsMap({ selectedRegion, onRegionSelect }: NetherlandsMapProps) {
  const [layers, setLayers] = useState<Record<string, MapLayer>>(LAYER_CONFIG)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const handleToggleLayer = (layerId: string) => {
    setLayers((prev) => ({
      ...prev,
      [layerId]: {
        ...prev[layerId],
        visible: !prev[layerId].visible,
      },
    }))
  }

  return (
    <div className="relative w-full">
      <div
        className="relative w-full bg-gradient-to-b from-blue-50 to-slate-50 overflow-auto"
        style={{ minHeight: "600px" }}
      >
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full"
          style={{ maxWidth: "100%", margin: "0 auto", display: "block" }}
        >
          <rect width="500" height="400" fill="#e0f7ff" />

          {/* Decorative water elements */}
          <circle cx="80" cy="60" r="35" fill="#87ceeb" opacity="0.3" />
          <circle cx="450" cy="320" r="40" fill="#87ceeb" opacity="0.3" />
          <ellipse cx="120" cy="360" rx="50" ry="30" fill="#87ceeb" opacity="0.25" />

          {NETHERLANDS_REGIONS.map((region) => {
            const isSelected = selectedRegion === region.name
            const isHovered = hoveredRegion === region.name
            const problemColor = layers.problems.visible ? getColorByProblem(region.problemValue) : "#3b82f6"

            return (
              <g key={region.name}>
                {/* Province polygon */}
                <path
                  d={region.path}
                  fill={problemColor}
                  fillOpacity={isSelected ? 0.85 : isHovered ? 0.65 : 0.55}
                  stroke={isSelected ? "#1e40af" : "#64748b"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  onClick={() => onRegionSelect(region.name)}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Province label */}
                <text
                  x={region.position.x}
                  y={region.position.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-bold pointer-events-none select-none"
                  fill={region.problemValue > 65 ? "#fff" : "#1e293b"}
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                >
                  {region.name}
                </text>

                {/* Problem score badge */}
                <circle
                  cx={region.position.x + 30}
                  cy={region.position.y - 20}
                  r="12"
                  fill="#fff"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  style={{ display: layers.problems.visible ? "block" : "none" }}
                />
                <text
                  x={region.position.x + 30}
                  y={region.position.y - 17}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold"
                  fill="#1e293b"
                  style={{ display: layers.problems.visible ? "block" : "none", pointerEvents: "none" }}
                >
                  {region.problemValue}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Layer toggle */}
      <LayerToggle layers={layers} onToggle={handleToggleLayer} />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md text-xs border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2">Probleemintensiteit</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-slate-700">Hoog (70+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-slate-700">Middel (60-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-slate-700">Laag (50-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-slate-700">Zeer laag (&lt;50)</span>
          </div>
        </div>
      </div>

      {/* Info box when region selected */}
      {selectedRegion && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-600 max-w-xs">
          <h3 className="font-bold text-slate-900 mb-2">{selectedRegion}</h3>
          <p className="text-sm text-slate-600 mb-3">
            {NETHERLANDS_REGIONS.find((r) => r.name === selectedRegion)?.problems}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-slate-700">Probleemintensiteit:</span>
            <span className="text-lg font-bold text-blue-600">
              {NETHERLANDS_REGIONS.find((r) => r.name === selectedRegion)?.problemValue}/100
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
