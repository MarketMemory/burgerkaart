export const MUNICIPALITY_SLUG_MAP: Record<string, string> = {
  amsterdam: "Amsterdam",
  rotterdam: "Rotterdam",
  utrecht: "Utrecht",
  "den-haag": "Den Haag",
  groningen: "Groningen",
  leiden: "Leiden",
  tilburg: "Tilburg",
  // Add more municipalities as needed
}

export function getProperMunicipalityName(slug: string): string | null {
  return MUNICIPALITY_SLUG_MAP[slug.toLowerCase()] || null
}

export function createMunicipalitySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}
