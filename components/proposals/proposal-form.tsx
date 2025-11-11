"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { submitProposal } from "@/lib/api-client"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

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

const FACILITY_TYPES = [
  { id: "school", label: "School/Onderwijsinstelling" },
  { id: "hospital", label: "Ziekenhuis/Medische voorziening" },
  { id: "policeStation", label: "Politiebureau" },
  { id: "doctorClinic", label: "Huisartsenpraktijk" },
  { id: "asylumCenter", label: "Asielcentrum" },
  { id: "other", label: "Anders" },
]

interface ProposalFormProps {
  onSuccess: () => void
}

export default function ProposalForm({ onSuccess }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    province: "",
    municipality: "",
    facilityType: "",
    action: "add" as "add" | "remove",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.title ||
      !formData.description ||
      !formData.province ||
      !formData.municipality ||
      !formData.facilityType
    ) {
      setStatus("error")
      setErrorMsg("Vul alle velden in")
      return
    }

    setLoading(true)
    setStatus("idle")

    try {
      const result = await submitProposal(formData)
      if (result.success) {
        setStatus("success")
        setFormData({
          title: "",
          description: "",
          province: "",
          municipality: "",
          facilityType: "",
          action: "add",
        })
        setTimeout(() => {
          setStatus("idle")
          onSuccess()
        }, 2000)
      } else {
        setStatus("error")
        setErrorMsg(result.message || "Fout bij indienen voorstel")
      }
    } catch (error) {
      setStatus("error")
      setErrorMsg("Fout bij indienen voorstel")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <CheckCircle size={20} />
            <span>Voorstel succesvol ingediend!</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Titel van je voorstel</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Bijv. Extra school in Amsterdam Noord"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Beschrijving</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Leg uit waarom dit voorstel belangrijk is..."
            rows={4}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Province */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Provincie</label>
            <select
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Kies provincie</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Municipality */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Gemeente</label>
            <input
              type="text"
              value={formData.municipality}
              onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
              placeholder="Bijv. Amsterdam"
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Facility Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Soort voorziening</label>
          <select
            value={formData.facilityType}
            onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Kies voorziening</option>
            {FACILITY_TYPES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Wat wil je?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="action"
                value="add"
                checked={formData.action === "add"}
                onChange={(e) => setFormData({ ...formData, action: e.target.value as "add" | "remove" })}
                className="w-4 h-4"
              />
              <span>Toevoegen</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="action"
                value="remove"
                checked={formData.action === "remove"}
                onChange={(e) => setFormData({ ...formData, action: e.target.value as "add" | "remove" })}
                className="w-4 h-4"
              />
              <span>Verwijderen</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Bezig met indienen..." : "Voorstel indienen"}
        </Button>
      </form>
    </Card>
  )
}
