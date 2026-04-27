import { shuffle } from "lodash"

// Visual test builds set IS_VISUAL_TEST=true to keep list order deterministic
// across runs. Not tied to USE_MOCK_DATA, which is also used by unit tests and
// local dev with mocked storage.
export const maybeShuffle = <T>(list: T[]): T[] =>
  process.env.IS_VISUAL_TEST === "true" ? list : shuffle(list)

/**
 * Seeded LCG (Linear Congruential Generator) random number generator.
 * Same seed always produces the same sequence — deterministic across all users.
 */
export function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * Fisher-Yates shuffle driven by seededRandom.
 * Same seed always produces the same order.
 */
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
