import type { Adapter } from "flags"

import type { ABTestConfig, MatomoExperiment } from "./types"

const USE_MOCK_EXPERIMENTS = process.env.USE_MOCK_EXPERIMENTS === "true"

/**
 * Mock experiments for local development.
 * Add experiments here to test A/B variants without Matomo.
 * Enable with USE_MOCK_EXPERIMENTS=true
 */
const MOCK_EXPERIMENTS: Record<string, ABTestConfig> = {
  HomepageHero: {
    name: "HomepageHero",
    id: "dev-1",
    enabled: true,
    variants: [
      { name: "Original", weight: 50 },
      { name: "VariantA", weight: 50 },
    ],
  },
}

function isExperimentActive(exp: MatomoExperiment): boolean {
  const now = new Date()
  if (exp.start_date && new Date(exp.start_date) > now) return false
  if (exp.end_date && new Date(exp.end_date) < now) return false
  return ["created", "running"].includes(exp.status)
}

async function fetchMatomoExperiments(): Promise<Record<string, ABTestConfig>> {
  if (USE_MOCK_EXPERIMENTS) {
    console.log("[Matomo Adapter] Using mock experiments")
    return MOCK_EXPERIMENTS
  }

  const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
  const apiToken = process.env.MATOMO_API_TOKEN
  const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "42"

  if (!matomoUrl || !apiToken) {
    console.error("[Matomo Adapter] Missing configuration")
    return {}
  }

  try {
    const response = await fetch(
      `${matomoUrl}/index.php?module=API&method=AbTesting.getAllExperiments&idSite=${siteId}&format=json&token_auth=${apiToken}`,
      {
        headers: { "User-Agent": "ethereum.org-flags-adapter/1.0" },
        cache: "force-cache",
      }
    )

    // Check HTTP status before parsing JSON
    if (!response.ok) {
      console.error(
        `[Matomo Adapter] HTTP ${response.status}: ${response.statusText}`
      )
      return {}
    }

    const data = await response.json()
    if (data.result === "error" || !Array.isArray(data)) {
      return {}
    }

    const config: Record<string, ABTestConfig> = {}
    for (const exp of data as MatomoExperiment[]) {
      if (!exp.variations?.length) continue

      const variationsTotalWeight = exp.variations.reduce(
        (sum, v) => sum + (v.percentage || 0),
        0
      )

      // Clamp original weight to 0 if variations exceed 100%
      const originalWeight = 100 - variationsTotalWeight
      if (originalWeight < 0) {
        console.warn(
          `[Matomo Adapter] Experiment ${exp.name} variations exceed 100% (${variationsTotalWeight}%)`
        )
      }

      config[exp.name] = {
        name: exp.name,
        id: exp.idexperiment,
        enabled: isExperimentActive(exp),
        variants: [
          { name: "Original", weight: Math.max(0, originalWeight) },
          ...exp.variations.map((v) => ({
            name: v.name,
            weight: v.percentage || 0,
          })),
        ],
      }
    }

    return config
  } catch (error) {
    console.error("[Matomo Adapter] Fetch failed:", error)
    return {}
  }
}

// FNV-1a hash for deterministic assignment (matching current implementation)
function fnv1aHash(str: string): number {
  let hash = 2166136261
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = (hash * 16777619) >>> 0
  }
  return hash
}

function assignVariantIndex(config: ABTestConfig, fingerprint: string): number {
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

export interface MatomoEntities {
  fingerprint: string
  /** Debug overrides from cookies (flag key -> variant index). Only populated in dev/preview. */
  overrides?: Record<string, number>
}

/**
 * Creates a Matomo adapter for a specific experiment.
 * The adapter fetches experiment config from Matomo and assigns variants deterministically.
 */
export function createMatomoAdapter(experimentName: string) {
  return function matomoAdapter(): Adapter<number, MatomoEntities> {
    return {
      origin() {
        const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
        return matomoUrl ? `${matomoUrl}/index.php?module=AbTesting` : undefined
      },

      async decide({ key, entities }) {
        // Check for debug override first (only populated in dev/preview)
        const override = entities?.overrides?.[key]
        if (override !== undefined) {
          return override
        }

        const config = await fetchMatomoExperiments()
        const experiment = config[experimentName]

        if (!experiment || !experiment.enabled) {
          return 0 // Default to original variant
        }

        const fingerprint = entities?.fingerprint || "anonymous"
        const fullFingerprint = `${fingerprint}|${key}`
        const variantIndex = assignVariantIndex(experiment, fullFingerprint)

        return variantIndex
      },
    }
  }
}

/**
 * Get experiment configuration from Matomo.
 * Useful for getting variant names and weights.
 */
export async function getMatomoExperimentConfig(
  experimentName: string
): Promise<ABTestConfig | null> {
  const config = await fetchMatomoExperiments()
  return config[experimentName] || null
}
