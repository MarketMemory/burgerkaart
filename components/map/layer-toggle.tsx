"use client"

import { Card } from "@/components/ui/card"
import type { MapLayer } from "@/lib/map-utils"
import { Eye, EyeOff } from "lucide-react"

interface LayerToggleProps {
  layers: Record<string, MapLayer>
  onToggle: (layerId: string) => void
}

export default function LayerToggle({ layers, onToggle }: LayerToggleProps) {
  return (
    <Card className="p-4 bg-white shadow-lg absolute top-4 left-4 z-10 max-w-xs">
      <h3 className="font-semibold text-foreground mb-4 text-sm">Kaartlagen</h3>
      <div className="space-y-2">
        {Object.values(layers).map((layer) => (
          <button
            key={layer.id}
            onClick={() => onToggle(layer.id)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-100 transition-colors group"
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: layer.color, opacity: layer.visible ? 1 : 0.3 }}
              />
              <span className="text-sm text-foreground">{layer.label}</span>
            </div>
            {layer.visible ? (
              <Eye size={16} className="text-primary opacity-0 group-hover:opacity-100" />
            ) : (
              <EyeOff size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100" />
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs font-semibold text-foreground mb-2">Probleemintensiteit</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-xs text-muted-foreground">Hoog (80+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600" />
            <span className="text-xs text-muted-foreground">Gemiddeld (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-muted-foreground">Laag (40-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Zeer laag (&lt;40)</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
