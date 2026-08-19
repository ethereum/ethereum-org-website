import type { ABTestConfig } from "./types"

/**
 * FNV-1a hash. djb2 produced an uneven split across variants in the first
 * implementation (#15927) - don't swap this out without validating the
 * distribution over at least 10k fingerprints.
 */
export function fnv1aHash(str: string): number {
  let hash = 2166136261
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = (hash * 16777619) >>> 0
  }
  return hash
}

/**
 * Map a fingerprint onto a variant index (0 = original) by cumulative weight.
 *
 * Shared by the server-side flags adapter and the client-side layout
 * experiments so both bucket identically for the same fingerprint.
 */
export function assignVariantIndex(
  config: ABTestConfig,
  fingerprint: string
): number {
  const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0)
  if (totalWeight === 0) return 0

  const hash = fnv1aHash(fingerprint)
  const normalized = hash / 0x100000000
  const weighted = normalized * totalWeight

  let cumulative = 0
  for (let i = 0; i < config.variants.length; i++) {
    cumulative += config.variants[i].weight
    if (weighted <= cumulative) return i
  }
  return 0
}
