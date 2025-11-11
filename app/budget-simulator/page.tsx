"use client"
import Header from "@/components/layout/header"
import BudgetSimulator from "@/components/budget/budget-simulator"

export default function BudgetSimulatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Budgetsimulattor</h1>
          <p className="text-muted-foreground">Experimenteer met toewijzing van middelen. Zien hoe het budget werkt.</p>
        </div>
        <BudgetSimulator />
      </main>
    </div>
  )
}
