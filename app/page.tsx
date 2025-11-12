"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Map, Users, TrendingUp, Lightbulb, Layers, Download, Filter } from "lucide-react"
import Header from "@/components/layout/header"
import NetherlandsMap from "@/components/map/netherlands-map"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-background">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Jouw stem telt in
              <span className="text-blue-600"> Nederland</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Een open platform waar burgers voorstellen indienen voor betere voorzieningen in hun gemeente. Stem,
              simuleer budgetten en draag bij aan de toekomst van jouw buurt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/municipalities">
                <Button className="bg-blue-600 text-white px-8 py-3 text-lg hover:bg-blue-700 inline-flex items-center gap-2">
                  Verken gemeenten
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/proposals">
                <Button variant="outline" className="px-8 py-3 text-lg bg-transparent">
                  Dien voorstel in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Verken de Nederlandse Kaart</h2>
            <p className="text-muted-foreground text-lg">
              Klik op een provincie om problemen te zien en voorstellen in te dienen
            </p>
          </div>

          <Card className="p-0 overflow-hidden shadow-lg">
            <NetherlandsMap selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
          </Card>

          {selectedRegion && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Geselecteerde regio:</strong> {selectedRegion}
              </p>
              <Link href={`/municipalities/${selectedRegion.toLowerCase().replace(/\s+/g, "-")}`}>
                <Button className="mt-3 bg-blue-600 text-white hover:bg-blue-700">Naar gemeenteprofiel</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">Platformfuncties</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Map className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Interactieve Kaart</h3>
              <p className="text-muted-foreground text-sm">
                Verken Nederlandse provincies en gemeenten. Zie probleemintensiteit via heatmap-visualisatie.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Lightbulb className="text-yellow-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Dien Voorstel In</h3>
              <p className="text-muted-foreground text-sm">
                Heb je een idee? Dien een voorstel in voor een school, ziekenhuis of ander faciliteit.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Users className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Stem en Discussieer</h3>
              <p className="text-muted-foreground text-sm">
                Stem op voorstellen die je steunt en lees wat andere burgers voorstellen.
              </p>
            </Card>

            {/* Feature 4 - Budget Simulator */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-purple-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Budget Simulator</h3>
              <p className="text-muted-foreground text-sm">
                Experimenteer met budgetverdelng en zie hoe veel voorzieningen realistisch zijn.
              </p>
            </Card>

            {/* Feature 5 - Advanced Filters */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Filter className="text-indigo-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Geavanceerde Filters</h3>
              <p className="text-muted-foreground text-sm">
                Filter gemeenten op bevolking, groei, werkloosheid en aantal problemen.
              </p>
            </Card>

            {/* Feature 6 - Layer Toggle */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Layers className="text-pink-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Kaartlagen</h3>
              <p className="text-muted-foreground text-sm">
                Toggle kaartlagen voor problemen, scholen, ziekenhuizen en andere voorzieningen.
              </p>
            </Card>

            {/* Feature 7 - PDF Export */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Download className="text-cyan-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">PDF Export</h3>
              <p className="text-muted-foreground text-sm">
                Download gemeenteprofiel rapporten als PDF voor offline raadpleging.
              </p>
            </Card>

            {/* Feature 8 - Open Source */}
            <Card className="p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Map className="text-orange-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Open Data</h3>
              <p className="text-muted-foreground text-sm">
                Volledig geïntegreerd met PDOK en CBS openbare datasets. Geen verborgen data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">Platform Statistieken</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">12</div>
              <p className="text-lg text-muted-foreground">Provincies</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-lg text-muted-foreground">Gemeenten</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">Gratis</div>
              <p className="text-lg text-muted-foreground">Open-source</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-lg text-muted-foreground">Open Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Klaar om te beginnen?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Ontdek hoe je kan bijdragen aan betere voorzieningen in jouw buurt en Nederland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/municipalities">
                <Button className="bg-white text-blue-600 px-8 py-3 text-lg hover:bg-blue-50 font-semibold">
                  Ontdek gemeenten
                </Button>
              </Link>
              <Link href="/proposals">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-lg text-white border-white hover:bg-blue-600 bg-transparent"
                >
                  Dien voorstel in
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Over</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Over Burgerkaart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/municipalities" className="hover:text-white transition">
                    Gemeenten
                  </Link>
                </li>
                <li>
                  <Link href="/proposals" className="hover:text-white transition">
                    Voorstellen
                  </Link>
                </li>
                <li>
                  <Link href="/budget-simulator" className="hover:text-white transition">
                    Budget Simulator
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Juridisch</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Open Data
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Open Source</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Documentatie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Bijdragen
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>Burgerkaart Nederland © 2025. Open-source platform voor burgerparticipatie.</p>
            <p className="mt-2 text-slate-400">Gratis beschikbaar voor iedereen. Geen verborgen kosten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
