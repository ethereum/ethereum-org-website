/**
 * XP levels, named after ETH's units (the ether course teaches them): seven
 * tiers of three levels. Strings: `page-courses-xp-level-{id}` for the name,
 * `-fact` for the namesake card shown on reaching the tier.
 */
export const TIERS = [
  { id: "wei", floor: 0 },
  { id: "babbage", floor: 50 },
  { id: "lovelace", floor: 150 },
  { id: "shannon", floor: 400 },
  { id: "szabo", floor: 1_000 },
  { id: "finney", floor: 2_500 },
  { id: "ether", floor: 5_000 },
] as const

export type TierId = (typeof TIERS)[number]["id"]

export const LEVELS_PER_TIER = 3

/** Every level's XP floor: each tier's span split into equal thirds */
const LEVEL_FLOORS = TIERS.flatMap(({ floor }, i) => {
  const next = TIERS[i + 1]?.floor ?? floor * 2
  const step = (next - floor) / LEVELS_PER_TIER
  return Array.from({ length: LEVELS_PER_TIER }, (_, j) =>
    Math.round(floor + step * j)
  )
})

export interface Level {
  /** 1-based, across all tiers */
  number: number
  tier: TierId
  /** 1 to `LEVELS_PER_TIER`, shown as I, II, III */
  step: number
  floor: number
  /** XP where the next level starts; null at the top */
  next: number | null
}

export const levelFor = (xp: number): Level => {
  let index = 0
  while (index + 1 < LEVEL_FLOORS.length && xp >= LEVEL_FLOORS[index + 1])
    index++
  return {
    number: index + 1,
    tier: TIERS[Math.floor(index / LEVELS_PER_TIER)].id,
    step: (index % LEVELS_PER_TIER) + 1,
    floor: LEVEL_FLOORS[index],
    next: LEVEL_FLOORS[index + 1] ?? null,
  }
}

/** 0-1 progress from this level's floor to the next */
export const levelProgress = (xp: number, level = levelFor(xp)) =>
  level.next === null ? 1 : (xp - level.floor) / (level.next - level.floor)

export const ROMAN = ["I", "II", "III"] as const
