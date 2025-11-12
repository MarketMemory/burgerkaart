"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, Loader } from "lucide-react"
import { generateMunicipalityPDF } from "@/lib/pdf-export"

interface PDFExportButtonProps {
  municipality: string
  stats: any
  facilities: any
}

export default function PDFExportButton({ municipality, stats, facilities }: PDFExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    try {
      setLoading(true)
      await generateMunicipalityPDF(municipality, stats, facilities)
    } catch (error) {
      console.error("Error exporting PDF:", error)
      alert("Fout bij het exporteren van PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={loading} variant="outline" size="sm">
      {loading ? (
        <>
          <Loader size={16} className="mr-2 animate-spin" />
          Genereren...
        </>
      ) : (
        <>
          <FileDown size={16} className="mr-2" />
          Download PDF
        </>
      )}
    </Button>
  )
}
