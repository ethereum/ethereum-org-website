import shuffle from "lodash/shuffle"

// Visual test builds set IS_VISUAL_TEST=true to keep list order deterministic
// across runs. Not tied to USE_MOCK_DATA, which is also used by unit tests and
// local dev with mocked storage.
export const safeShuffle = <T>(list: T[]): T[] =>
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

/** 32-bit FNV-1a hash of a string */
const hashString = (text: string) => {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * mulberry32 seeded by a string. Unlike seededRandom, its low bits are well
 * spread, so small ranges (a 3-option shuffle) come out uniform.
 */
export function stringSeededRandom(seed: string) {
  let a = hashString(seed)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Uniform Fisher-Yates shuffle driven by stringSeededRandom */
export function stringSeededShuffle<T>(items: readonly T[], seed: string): T[] {
  const shuffled = [...items]
  const random = stringSeededRandom(seed)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
