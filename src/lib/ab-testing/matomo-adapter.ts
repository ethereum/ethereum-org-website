import type { Adapter } from "flags"

import { assignVariantIndex } from "./assignment"
import type { ABTestConfig, MatomoExperiment } from "./types"

const USE_MOCK_EXPERIMENTS = process.env.USE_MOCK_EXPERIMENTS === "true"

/**
 * Mock experiments for local development.
 * Add experiments here to test A/B variants without Matomo credentials.
 * Enable with USE_MOCK_EXPERIMENTS=true. Example entry:
 *
 *   MyExperiment: {
 *     name: "MyExperiment",
 *     id: "dev-1",
 *     enabled: true,
 *     variants: [
 *       { name: "Original", weight: 50 },
 *       { name: "VariantA", weight: 50 },
 *     ],
 *   },
 */
const MOCK_EXPERIMENTS: Record<string, ABTestConfig> = {
  NavLabels2026: {
    name: "NavLabels2026",
    id: "dev-19",
    enabled: true,
    variants: [
      { name: "Original", weight: 50 },
      { name: "CommunityRoadmap", weight: 50 },
    ],
  },
  FindWalletCatalog2026: {
    name: "FindWalletCatalog2026",
    id: "dev-15",
    enabled: true,
    variants: [
      { name: "Original", weight: 50 },
      { name: "NewCatalog", weight: 50 },
    ],
  },
}

function isExperimentActive(exp: MatomoExperiment): boolean {
  const now = new Date()
  if (exp.start_date && new Date(exp.start_date) > now) return false
  if (exp.end_date && new Date(exp.end_date) < now) return false
  if (exp.status === "running") return true
  // A merely-created experiment must not bucket users; "created" only
  // counts when it was explicitly scheduled
  return exp.status === "created" && Boolean(exp.start_date)
}

// The adapter runs in the proxy (edge runtime), where Next's Data Cache does
// not exist - fetch cache options are no-ops there. Config is cached at
// module level instead: warm isolates keep it across requests, so a route
// pays one Matomo round-trip (~50-160ms) per isolate per TTL window and ~0
// otherwise. Matomo dashboard changes propagate within the TTL.
const CONFIG_TTL_MS = 60 * 60 * 1000
/** After a failed fetch, retry sooner than the full TTL */
const ERROR_RETRY_MS = 60 * 1000
const FETCH_TIMEOUT_MS = 2_000

let cachedConfig: Record<string, ABTestConfig> | null = null
let cachedAt = 0
let inflight: Promise<Record<string, ABTestConfig>> | null = null

async function getExperimentConfig(): Promise<Record<string, ABTestConfig>> {
  if (USE_MOCK_EXPERIMENTS) return MOCK_EXPERIMENTS

  const fresh = cachedConfig && Date.now() - cachedAt < CONFIG_TTL_MS
  if (fresh) return cachedConfig as Record<string, ABTestConfig>

  // Dedupe: concurrent requests (and multi-flag routes) share one fetch
  inflight ??= fetchMatomoExperiments()
    .then((config) => {
      cachedConfig = config
      cachedAt = Date.now()
      return config
    })
    .catch((error) => {
      console.error(
        "[Matomo Adapter] Config fetch failed:",
        error instanceof Error ? error.message : error
      )
      // Stale-if-error: keep serving the last known config; without one,
      // cache an empty config (everyone gets the original variant) so the
      // retry backoff applies even when the first fetch fails
      cachedConfig = cachedConfig ?? {}
      cachedAt = Date.now() - CONFIG_TTL_MS + ERROR_RETRY_MS
      return cachedConfig
    })
    .finally(() => {
      inflight = null
    })

  return inflight
}

async function fetchMatomoExperiments(): Promise<Record<string, ABTestConfig>> {
  const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
  const apiToken = process.env.MATOMO_API_TOKEN
  const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "4"

  if (!matomoUrl || !apiToken) {
    console.error("[Matomo Adapter] Missing configuration")
    return {}
  }

  // Failures throw so getExperimentConfig can fall back to the last known
  // config (stale-if-error) instead of wiping it with an empty one
  const response = await fetch(
    `${matomoUrl}/index.php?module=API&method=AbTesting.getAllExperiments&idSite=${siteId}&format=json&token_auth=${apiToken}`,
    {
      headers: { "User-Agent": "ethereum.org-flags-adapter/1.0" },
      // Bound the worst case: a hanging Matomo must never stall page
      // requests for longer than this
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  if (data.result === "error" || !Array.isArray(data)) {
    throw new Error(data.message || "Invalid API response")
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
}

/**
 * Experiments Matomo currently reports as active.
 *
 * The proxy checks this before rewriting. Rewriting while nothing is running
 * would pin every visitor to variant index 0, which is only harmless when
 * index 0 happens to be the shipped design - for a test that pits a redesign
 * against the code it replaced, it would silently serve the old one. Falling
 * through instead keeps the deployed page authoritative until a test starts.
 */
export async function getActiveExperimentNames(): Promise<Set<string>> {
  const config = await getExperimentConfig()
  const active = new Set<string>()
  for (const experiment of Object.values(config)) {
    if (experiment.enabled) active.add(experiment.name)
  }
  return active
}

/**
 * Active experiments with their variant weights, for experiments assigned in
 * the browser rather than by the proxy (see docs/ab-testing.md, "Layout-level
 * experiments"). Served by /api/ab-config - it carries no Matomo credentials
 * and nothing the dashboard doesn't already make public.
 */
export async function getActiveExperimentConfigs(): Promise<ABTestConfig[]> {
  const config = await getExperimentConfig()
  return Object.values(config).filter((experiment) => experiment.enabled)
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
export function createMatomoAdapter(
  experimentName: string
): Adapter<number, MatomoEntities> {
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

      const config = await getExperimentConfig()
      const experiment = config[experimentName]

      if (!experiment || !experiment.enabled) {
        return 0 // Default to original variant
      }

      const fingerprint = entities?.fingerprint || "anonymous"
      const fullFingerprint = `${fingerprint}|${key}`
      return assignVariantIndex(experiment, fullFingerprint)
    },
  }
}
