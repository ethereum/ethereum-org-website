/**
 * Seeded pseudo-random numbers (mulberry32). The lesson's demos use these so
 * layouts and sample data are identical on every render, server and client,
 * and in Chromatic snapshots.
 */
export const createRandom = (seed: number) => {
  let state = seed >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    /** [0, 1) */
    next,
    /** Integer in [min, max] */
    int: (min: number, max: number) =>
      min + Math.floor(next() * (max - min + 1)),
    pick: <T>(items: readonly T[]): T =>
      items[Math.floor(next() * items.length)],
  }
}

/** FNV-1a 32-bit hash, used for the fingerprint display and seeding */
export const fnv1a = (input: string) => {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}
