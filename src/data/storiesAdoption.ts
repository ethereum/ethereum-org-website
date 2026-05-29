/**
 * MOCK adoption data for the `/stories` "Ethereum adoption on planet earth" map.
 *
 * Keyed by ISO 3166-1 alpha-2 country code (matching the `id`s in
 * `app/[locale]/stories/_components/AdoptionMap/world.svg`). The value is a
 * placeholder "adoption rate" on a 0–100 scale used only to drive the color
 * intensity of each country. Countries omitted here render as "No data".
 *
 * TODO: replace with a real adoption metric once a data source is chosen.
 */
export const storiesAdoption: Record<string, number> = {
  // Featured-story countries (highlighted in the section copy)
  VE: 78,
  UA: 71,
  CA: 64,
  // Americas
  US: 88,
  BR: 57,
  AR: 59,
  MX: 43,
  CO: 41,
  CL: 37,
  // Europe
  GB: 69,
  DE: 49,
  FR: 46,
  NL: 52,
  CH: 58,
  ES: 36,
  IT: 33,
  PL: 38,
  PT: 34,
  SE: 42,
  NO: 40,
  BE: 35,
  TR: 53,
  RU: 29,
  // Africa
  NG: 82,
  ZA: 47,
  KE: 49,
  GH: 45,
  EG: 31,
  // Middle East
  AE: 61,
  SA: 33,
  IL: 48,
  // Asia-Pacific
  SG: 74,
  KR: 66,
  IN: 62,
  JP: 41,
  CN: 22,
  ID: 44,
  PH: 51,
  VN: 55,
  TH: 35,
  MY: 39,
  PK: 27,
  BD: 24,
  AU: 44,
  NZ: 38,
}

/** Highest mock value, used to normalize the color scale and label the legend. */
export const STORIES_ADOPTION_MAX = Math.max(...Object.values(storiesAdoption))
