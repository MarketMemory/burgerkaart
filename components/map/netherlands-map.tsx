"use client"

import { useState } from "react"
import { LAYER_CONFIG, getColorByProblem, type MapLayer } from "@/lib/map-utils"
import LayerToggle from "./layer-toggle"

interface NetherlandsMapProps {
  selectedRegion: string | null
  onRegionSelect: (region: string) => void
}

// Simplified GeoJSON data for Netherlands regions
const NETHERLANDS_REGIONS = [
  {
    name: "Noord-Holland",
    problems: "Woningtekort, congestie",
    problemValue: 75,
    x: 100,
    y: 80,
    width: 80,
    height: 60,
  },
  {
    name: "Zuid-Holland",
    problems: "Infrastructuur, overstromingsrisico",
    problemValue: 68,
    x: 80,
    y: 140,
    width: 100,
    height: 80,
  },
  {
    name: "Utrecht",
    problems: "Verkeersdruk, wooncrisis",
    problemValue: 72,
    x: 150,
    y: 100,
    width: 70,
    height: 70,
  },
  {
    name: "Gelderland",
    problems: "Verkeersdrukte, stedelijke groei",
    problemValue: 65,
    x: 200,
    y: 80,
    width: 120,
    height: 90,
  },
  {
    name: "Friesland",
    problems: "Bevolkingsdaling, voorzieningen",
    problemValue: 58,
    x: 120,
    y: 20,
    width: 100,
    height: 60,
  },
  {
    name: "Groningen",
    problems: "Werkgelegenheid, jongerenuitstroom",
    problemValue: 62,
    x: 200,
    y: 20,
    width: 80,
    height: 50,
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
        className="relative w-full bg-gradient-to-b from-slate-100 to-slate-50 overflow-auto"
        style={{ minHeight: "500px" }}
      >
        <svg
          viewBox="0 0 450 300"
          className="w-full h-full"
          style={{ maxWidth: "100%", margin: "0 auto", display: "block" }}
        >
          {/* Background */}
          <rect width="450" height="300" fill="#e0f2fe" />

          {/* Water */}
          <circle cx="50" cy="80" r="30" fill="#87ceeb" opacity="0.4" />

          {/* Regions */}
          {NETHERLANDS_REGIONS.map((region) => {
            const isSelected = selectedRegion === region.name
            const isHovered = hoveredRegion === region.name
            const problemColor = layers.problems.visible ? getColorByProblem(region.problemValue) : "#3b82f6"

            return (
              <g key={region.name}>
                {/* Region rectangle */}
                <rect
                  x={region.x}
                  y={region.y}
                  width={region.width}
                  height={region.height}
                  fill={problemColor}
                  fillOpacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.5}
                  stroke={isSelected ? "#000" : "#666"}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onClick={() => onRegionSelect(region.name)}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Region label */}
                <text
                  x={region.x + region.width / 2}
                  y={region.y + region.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-semibold pointer-events-none"
                  fill={region.problemValue > 70 ? "#fff" : "#000"}
                  style={{ cursor: "pointer" }}
                >
                  {region.name.split("-").join("\n")}
                </text>

                {/* Problem intensity badge */}
                <rect
                  x={region.x + region.width - 25}
                  y={region.y + 5}
                  width="20"
                  height="20"
                  fill="#fff"
                  stroke="#999"
                  strokeWidth="1"
                  rx="3"
                />
                <text
                  x={region.x + region.width - 15}
                  y={region.y + 16}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill="#000"
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
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md text-xs">
        <h4 className="font-bold mb-2">Probleemintensiteit</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600"></div>
            <span>Hoog (80-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500"></div>
            <span>Middel (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400"></div>
            <span>Laag (40-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span>Zeer laag (0-39)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
