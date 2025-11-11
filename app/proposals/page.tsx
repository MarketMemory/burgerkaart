"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import ProposalForm from "@/components/proposals/proposal-form"
import ProposalsList from "@/components/proposals/proposals-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProposalsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedProvince, setSelectedProvince] = useState<string>("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Jouw voorstellen</h1>
          <p className="text-muted-foreground">Dien voorstellen in voor betere voorzieningen in jouw gemeente</p>
        </div>

        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit">Voorstel indienen</TabsTrigger>
            <TabsTrigger value="browse">Alle voorstellen</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="mt-6">
            <ProposalForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <ProposalsList refreshTrigger={refreshTrigger} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
