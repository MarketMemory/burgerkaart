"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface NetherlandsMapProps {
  selectedRegion: string | null
  onRegionSelect: (region: string) => void
}

// GeoJSON data for Netherlands provinces (simplified)
const NETHERLANDS_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Noord-Holland", problems: "Woningtekort, congestie" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4.8, 52.8],
            [5.2, 52.8],
            [5.2, 52.4],
            [4.8, 52.4],
            [4.8, 52.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Zuid-Holland", problems: "Infrastructuur, overstromingsrisico" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4.2, 52.2],
            [4.8, 52.2],
            [4.8, 51.6],
            [4.2, 51.6],
            [4.2, 52.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Utrecht", problems: "Verkeersdruk, wooncrisis" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4.8, 52.4],
            [5.4, 52.4],
            [5.4, 51.9],
            [4.8, 51.9],
            [4.8, 52.4],
          ],
        ],
      },
    },
  ],
}

export default function NetherlandsMap({ selectedRegion, onRegionSelect }: NetherlandsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([52.15, 5.0], 7)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current)

      // Add GeoJSON layer
      L.geoJSON(NETHERLANDS_GEOJSON, {
        style: {
          color: "#1e40af",
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.5,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties
          const popup = L.popup().setContent(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${props.name}</h3>
              <p class="text-xs text-gray-600 mt-1">Problemen: ${props.problems}</p>
              <button class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                Details bekijken
              </button>
            </div>
          `)

          layer.bindPopup(popup)
          layer.on("click", () => {
            onRegionSelect(props.name)
          })
        },
      }).addTo(map.current)
    }

    // Highlight selected region
    if (selectedRegion && map.current) {
      const bounds = L.latLngBounds([
        [51.5, 3.4],
        [53.5, 7.2],
      ])
      map.current.fitBounds(bounds)
    }
  }, [selectedRegion, onRegionSelect])

  return <div ref={mapContainer} className="w-full h-full" style={{ minHeight: "500px" }} />
}
