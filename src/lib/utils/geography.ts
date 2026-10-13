import countries from "i18n-iso-countries"

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
 * Sentinel location strings that indicate a virtual/remote event rather
 * than a physical location. Matched case-insensitively.
 */
const ONLINE_LOCATION_VALUES = new Set(["online", "remote"])

/**
 * Returns true if the location string represents a virtual event
 * (e.g., "Online", "Remote") rather than a physical location.
 */
export function isOnlineLocation(location: string): boolean {
  return ONLINE_LOCATION_VALUES.has(location?.trim().toLowerCase() ?? "")
}

/**
 * Parse a location string (e.g., "Berlin, Germany") to its continent.
 * Returns null for online events or unrecognized locations.
 */
export function parseLocationToContinent(location: string): Continent | null {
  if (!location || isOnlineLocation(location)) return null
  const parts = location.split(/,\s*/)
  const country = parts[parts.length - 1]?.trim()
  if (!country) return null
  return COUNTRY_TO_CONTINENT[country] || null
}

/**
 * Aliases for country names that i18n-iso-countries doesn't recognize.
 * Maps free-text names from external data to forms the package understands.
 */
const COUNTRY_NAME_ALIASES: Record<string, string> = {
  "Hong Kong SAR": "Hong Kong",
  // Add more here as needed
}

// i18n-iso-countries is keyed by base language and ships no Traditional
// Chinese or Telugu data, so zh-tw fell back to Simplified zh and te to English.
const ICU_LOCALES = new Set(["zh-tw", "te"])

// CLDR's long form for the SARs is a descriptor ("中國香港特別行政區"); its short
// form is the plain city name. Elsewhere the short form is an abbreviation.
const SHORT_FORM_REGIONS = new Set(["HK", "MO"])

const regionNamesCache = new Map<string, Intl.DisplayNames>()

function getRegionName(code: string, locale: string): string | undefined {
  const style = SHORT_FORM_REGIONS.has(code) ? "short" : "long"
  const cacheKey = `${locale}:${style}`

  let displayNames = regionNamesCache.get(cacheKey)
  if (!displayNames) {
    displayNames = new Intl.DisplayNames([locale], { type: "region", style })
    regionNamesCache.set(cacheKey, displayNames)
  }
  return displayNames.of(code)
}

/**
 * Translate an English country name into the target locale.
 *
 * Accepts informal English country names (e.g., "USA", "United States",
 * "Hong Kong SAR") and returns the localized name.
 *
 * @param country - English country name (informal forms accepted)
 * @param locale - Target locale code (e.g., "ja", "es", "ar")
 * @returns Localized country name, or the original string if not recognized
 */
export function getCountryTranslation(country: string, locale: string): string {
  if (!country) return country

  const normalized = COUNTRY_NAME_ALIASES[country] ?? country
  const code = countries.getAlpha2Code(normalized, "en")
  if (!code) return country

  if (ICU_LOCALES.has(locale)) {
    return getRegionName(code, locale) ?? country
  }

  // Strip region suffix: "pt-br" -> "pt"
  // (i18n-iso-countries uses base language codes)
  const baseLocale = locale.split("-")[0]
  return countries.getName(code, baseLocale) ?? country
}

/**
 * Localize an event location string by translating the country portion.
 *
 * Parses "City, Country" format, translates the country into the target
 * locale, and reassembles. City names are left in their original script.
 *
 * Returns the original string unchanged if:
 * - The location is a virtual event sentinel (e.g., "Online", "Remote") --
 *   these are handled separately by i18n keys via the isOnline flag
 * - The country cannot be identified or translated
 * - The locale is "en" (no translation needed)
 *
 * @param location - Raw location string (e.g., "Denver, USA")
 * @param locale - Target locale code (e.g., "ja", "es", "ar")
 * @returns Localized location string (e.g., "Denver, アメリカ合衆国")
 */
export function localizeLocation(location: string, locale: string): string {
  if (!location || locale === "en") return location

  if (isOnlineLocation(location)) return location

  const parts = location.split(/,\s*/)
  const rawCountry = parts[parts.length - 1].trim()

  const localizedCountry = getCountryTranslation(rawCountry, locale)

  // Country wasn't translated -- return original
  if (localizedCountry === rawCountry) return location

  if (parts.length === 1) {
    // No comma -- the whole string was the country (e.g., "Hong Kong SAR")
    return localizedCountry
  }

  // Reassemble: "City, TranslatedCountry"
  const city = parts.slice(0, -1).join(", ")
  return `${city}, ${localizedCountry}`
}
