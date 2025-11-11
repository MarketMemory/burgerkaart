"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  selectedRegion: string | null
  onSelectRegion: (region: string | null) => void
  isOpen: boolean
}

const PROVINCES = [
  "Noord-Holland",
  "Zuid-Holland",
  "Utrecht",
  "Flevoland",
  "Gelderland",
  "Overijssel",
  "Drenthe",
  "Groningen",
  "Friesland",
  "Limburg",
  "North Brabant",
  "Zeeland",
]

export default function Navigation({ selectedRegion, onSelectRegion, isOpen }: NavigationProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProvinces = PROVINCES.filter((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))

  if (!isOpen) return null

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <Input
            placeholder="Zoek provincie of gemeente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">PROVINCIES</h3>
          <div className="space-y-2">
            {filteredProvinces.map((province) => (
              <button
                key={province}
                onClick={() => onSelectRegion(province)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedRegion === province
                    ? "bg-blue-50 text-blue-700 border-2 border-blue-300"
                    : "hover:bg-slate-50 text-slate-700 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="font-medium">{province}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedRegion && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Geselecteerd</h4>
            <p className="text-blue-700 text-sm">{selectedRegion}</p>
            <button
              onClick={() => onSelectRegion(null)}
              className="mt-3 w-full px-3 py-2 bg-white text-blue-600 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Wissen
            </button>
          </Card>
        )}
      </div>
    </aside>
  )
}
