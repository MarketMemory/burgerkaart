// PDF export utilities for municipality reports

export async function generateMunicipalityPDF(municipality: string, stats: any, facilities: any) {
  try {
    // Dynamically import html2pdf only when needed
    const html2pdf = (await import("html2pdf.js")).default

    const element = document.createElement("div")
    element.innerHTML = generatePDFHTML(municipality, stats, facilities)

    const options = {
      margin: 10,
      filename: `${municipality}-rapport-${new Date().getFullYear()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    }

    return html2pdf().set(options).from(element).save()
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

function generatePDFHTML(municipality: string, stats: any, facilities: any): string {
  const today = new Date().toLocaleDateString("nl-NL")
  const problemsList =
    stats?.problems
      ?.map(
        (p: any) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.indicator}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
        <span style="
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          background-color: ${p.severity === "high" ? "#fee2e2" : p.severity === "medium" ? "#fef3c7" : "#dcfce7"};
          color: ${p.severity === "high" ? "#991b1b" : p.severity === "medium" ? "#92400e" : "#166534"};
        ">
          ${p.severity.toUpperCase()}
        </span>
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${p.value}%</td>
    </tr>
  `,
      )
      .join("") ||
    '<tr><td colspan="3" style="padding: 8px; text-align: center; color: #999;">Geen data beschikbaar</td></tr>'

  const facilitiesList = facilities?.[municipality]
    ? `
    <tr><td style="padding: 8px;">Scholen</td><td style="padding: 8px; text-align: right; font-weight: bold;">${facilities[municipality].schools || 0}</td></tr>
    <tr><td style="padding: 8px;">Ziekenhuizen</td><td style="padding: 8px; text-align: right; font-weight: bold;">${facilities[municipality].hospitals || 0}</td></tr>
    <tr><td style="padding: 8px;">Politiebureaus</td><td style="padding: 8px; text-align: right; font-weight: bold;">${facilities[municipality].policeStations || 0}</td></tr>
    <tr><td style="padding: 8px;">Huisartsenpraktijken</td><td style="padding: 8px; text-align: right; font-weight: bold;">${facilities[municipality].doctorClinics || 0}</td></tr>
  `
    : '<tr><td colspan="2" style="padding: 8px; text-align: center; color: #999;">Geen data beschikbaar</td></tr>'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .header {
          background-color: #1e40af;
          color: white;
          padding: 20px;
          margin-bottom: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          background-color: #f3f4f6;
          padding: 10px 15px;
          margin: 0 0 15px 0;
          font-size: 16px;
          color: #1e40af;
          border-left: 4px solid #1e40af;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .stat-card {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th {
          background-color: #f3f4f6;
          padding: 10px;
          text-align: left;
          font-weight: bold;
          font-size: 14px;
          border-bottom: 2px solid #d1d5db;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${municipality}</h1>
        <p>Gemeentelijk Overzicht Rapport - ${today}</p>
      </div>

      <!-- Statistics Section -->
      <div class="section">
        <h2>Basisgegevens</h2>
        <div class="stats-grid">
          ${
            stats?.population
              ? `
            <div class="stat-card">
              <div class="stat-label">Inwoners</div>
              <div class="stat-value">${(stats.population / 1000).toFixed(0)}K</div>
            </div>
          `
              : ""
          }
          ${
            stats?.growthRate !== undefined
              ? `
            <div class="stat-card">
              <div class="stat-label">Bevolkingsgroei</div>
              <div class="stat-value">${stats.growthRate}%</div>
            </div>
          `
              : ""
          }
          ${
            stats?.unemploymentRate !== undefined
              ? `
            <div class="stat-card">
              <div class="stat-label">Werkloosheid</div>
              <div class="stat-value">${stats.unemploymentRate}%</div>
            </div>
          `
              : ""
          }
          ${
            stats?.medianAge
              ? `
            <div class="stat-card">
              <div class="stat-label">Mediaanleeftijd</div>
              <div class="stat-value">${stats.medianAge} jaar</div>
            </div>
          `
              : ""
          }
        </div>
      </div>

      <!-- Problems Section -->
      <div class="section">
        <h2>Geïdentificeerde Speerpunten</h2>
        <table>
          <thead>
            <tr>
              <th>Indicator</th>
              <th style="text-align: center;">Prioriteit</th>
              <th style="text-align: right;">Waarde</th>
            </tr>
          </thead>
          <tbody>
            ${problemsList}
          </tbody>
        </table>
      </div>

      <!-- Facilities Section -->
      <div class="section">
        <h2>Huidige Voorzieningen</h2>
        <table>
          <thead>
            <tr>
              <th>Faciliteitstype</th>
              <th style="text-align: right;">Aantal</th>
            </tr>
          </thead>
          <tbody>
            ${facilitiesList}
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p><strong>Bron:</strong> Burgerkaart Nederland - Open Data Platform</p>
        <p>Dit rapport is gegenereerd op ${today}. De informatie is gebaseerd op openbare datasets van CBS, PDOK en gemeentelijke registraties.</p>
      </div>
    </body>
    </html>
  `
}
