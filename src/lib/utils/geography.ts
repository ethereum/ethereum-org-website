import type { Continent } from "@/lib/types"

// Continent → countries mapping for location parsing
export const CONTINENT_COUNTRIES: Record<Continent, string[]> = {
  europe: [
    "Austria",
    "Belgium",
    "Croatia",
    "Czechia",
    "Czech Republic",
    "Denmark",
    "England",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Montenegro",
    "Netherlands",
    "The Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "UK",
    "Ukraine",
    "United Kingdom",
  ],
  asia: [
    "China",
    "Hong Kong",
    "Hong Kong SAR",
    "India",
    "Indonesia",
    "Japan",
    "Korea",
    "Malaysia",
    "Philippines",
    "Singapore",
    "South Korea",
    "Taiwan",
    "Thailand",
    "Vietnam",
  ],
  "north-america": [
    "Canada",
    "Costa Rica",
    "Honduras",
    "Mexico",
    "USA",
    "United States",
  ],
  "south-america": [
    "Argentina",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Peru",
    "Venezuela",
  ],
  africa: ["Ethiopia", "Ghana", "Kenya", "Nigeria", "Rwanda", "South Africa"],
  "middle-east": [
    "Bahrain",
    "Iran",
    "Israel",
    "Kuwait",
    "Qatar",
    "Saudi Arabia",
    "UAE",
    "United Arab Emirates",
  ],
  oceania: ["Australia", "New Zealand"],
}

// Derive reverse mapping for lookups
export const COUNTRY_TO_CONTINENT: Record<string, Continent> = Object.entries(
  CONTINENT_COUNTRIES
).reduce(
  (acc, [continent, countries]) => {
    for (const country of countries) {
      acc[country] = continent as Continent
    }
    return acc
  },
  {} as Record<string, Continent>
)

/**
 * Parse a location string (e.g., "Berlin, Germany") to its continent.
 * Returns null for online events or unrecognized locations.
 */
export function parseLocationToContinent(location: string): Continent | null {
  if (!location || location.toLowerCase() === "online") return null
  const parts = location.split(/,\s*/)
  const country = parts[parts.length - 1]?.trim()
  if (!country) return null
  return COUNTRY_TO_CONTINENT[country] || null
}
