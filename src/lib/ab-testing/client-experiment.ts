import { push } from "@socialgouv/matomo-next"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"
import { isOptedOut } from "@/lib/utils/matomo"

import { assignVariantIndex } from "./assignment"
import { FLAG_OVERRIDE_COOKIE_PREFIX } from "./constants"
import type { ABTestConfig } from "./types"

/**
 * Client-assigned experiments, for chrome that lives in the layout.
 *
 * The precompute pattern in docs/ab-testing.md resolves a variant in the proxy
 * and serves a prerendered page per permutation, but `abTestRoutes` is keyed by
 * page path. Layout chrome - the nav, the footer - is on every page, so there
 * is no route to key on, and reading the assignment from a header in the root
 * layout would make the whole site dynamic. Those experiments are assigned in
 * the browser instead, from the Matomo visitor id, so the bucket is stable
 * across pages and sessions without adding a cookie.
 *
 * Constraints this inherits, all of them deliberate:
 * - Only visitors Matomo actually tracks are enrolled. Opted out, Do Not
 *   Track, or tracker blocked means no assignment and no variant - those
 *   visits are absent from Matomo reports anyway, so enrolling them would only
 *   dilute the arms.
 * - Server-rendered markup is never varied, so no cache entry can hold the
 *   wrong variant. The tradeoff is that the variant applies once the visitor id
 *   is known rather than on first paint - see docs/ab-testing.md for when that
 *   makes this the wrong mechanism for a test.
 *
 * Deliberately not imported from ./flags: that module pulls in the flags SDK
 * and the Matomo API adapter, neither of which belongs in a client bundle.
 */

/** Matomo experiment 19: Participate -> Community, Research -> Roadmap */
export const NAV_LABELS_EXPERIMENT = "NavLabels2026"
/** Must match the Matomo variation name exactly - a typo silently matches nothing */
export const NAV_LABELS_VARIANT = "CommunityRoadmap"

/** Debug overrides are only honored in dev and preview deploys */
const ALLOW_DEBUG_OVERRIDES = !IS_PROD || IS_PREVIEW_DEPLOY

/** Trailing slash included: `trailingSlash: true` would otherwise 308 first */
const CONFIG_ENDPOINT = "/api/ab-config/"
const CONFIG_TIMEOUT_MS = 3_000
/**
 * How long to wait for matomo.js. The tracker loads async, so on a first
 * pageview the visitor id can arrive after the nav has already rendered; the
 * subscribers re-render when it does.
 */
const TRACKER_TIMEOUT_MS = 3_000
const TRACKER_POLL_MS = 100

export type ClientExperimentState = {
  /** Resolved variation name, or null while pending and for excluded visitors */
  variant: string | null
  resolved: boolean
}

const PENDING: ClientExperimentState = { variant: null, resolved: false }
const EXCLUDED: ClientExperimentState = { variant: null, resolved: true }

const states = new Map<string, ClientExperimentState>()
const listeners = new Set<() => void>()
const activated = new Set<string>()

let configPromise: Promise<ABTestConfig[]> | null = null

const emit = () => listeners.forEach((listener) => listener())

const setState = (name: string, state: ClientExperimentState) => {
  states.set(name, state)
  emit()
}

export const subscribeToClientExperiments = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getClientExperimentState = (name: string): ClientExperimentState =>
  states.get(name) ?? PENDING

/** Server render has no visitor id, so every experiment reads as pending */
export const getServerExperimentState = (): ClientExperimentState => PENDING

const readOverrideCookie = (name: string): number | null => {
  if (!ALLOW_DEBUG_OVERRIDES) return null
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${FLAG_OVERRIDE_COOKIE_PREFIX}${name}=([^;]*)`)
  )
  if (!match) return null
  const value = parseInt(decodeURIComponent(match[1]), 10)
  return isNaN(value) || value < 0 ? null : value
}

const fetchActiveExperiments = async (): Promise<ABTestConfig[]> => {
  const response = await fetch(CONFIG_ENDPOINT, {
    signal: AbortSignal.timeout(CONFIG_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  return Array.isArray(data?.experiments) ? data.experiments : []
}

/**
 * Matomo's visitor id, once the tracker exists. It is generated on init and
 * persisted in Matomo's own first-party cookie, so it is the same value on the
 * first pageview and on every later visit - which is what makes the bucket
 * stable without a cookie of our own.
 */
const getVisitorId = (): Promise<string | null> =>
  new Promise((resolve) => {
    const deadline = Date.now() + TRACKER_TIMEOUT_MS

    const attempt = () => {
      const visitorId = window.Matomo?.getAsyncTracker?.()?.getVisitorId?.()
      if (visitorId) return resolve(visitorId)
      if (Date.now() > deadline) return resolve(null)
      setTimeout(attempt, TRACKER_POLL_MS)
    }

    attempt()
  })

const enterExperiment = (experiment: string, variation: string) => {
  push(["AbTesting::enter", { experiment, variation }] as unknown as [
    string,
    Record<string, string>,
  ])
  // Custom dimension 1 is what segment queries read (dimension1==Original)
  push(["setCustomDimension", 1, variation] as unknown as [string, string])
}

/**
 * Resolve and enroll, once per pageview. Safe to call from several components:
 * the desktop and mobile navs both render, and both need the same answer.
 */
export const activateClientExperiment = (
  name: string,
  { enabled }: { enabled: boolean }
) => {
  if (activated.has(name)) return
  activated.add(name)

  // Non-default locales are never enrolled, matching the proxy-side scope
  if (!enabled) return setState(name, EXCLUDED)

  if (isOptedOut() || navigator.doNotTrack === "1") {
    return setState(name, EXCLUDED)
  }

  const override = readOverrideCookie(name)

  configPromise ??= fetchActiveExperiments()

  configPromise
    .then(async (experiments) => {
      const config = experiments.find((experiment) => experiment.name === name)
      // Not running in Matomo: pausing on the dashboard returns everyone to
      // the original within the cache TTL, no deploy needed
      if (!config) return setState(name, EXCLUDED)

      if (override !== null) {
        const overridden = config.variants[override]?.name
        return setState(
          name,
          overridden ? { variant: overridden, resolved: true } : EXCLUDED
        )
      }

      const visitorId = await getVisitorId()
      // Tracker blocked or never loaded - this visit is not in Matomo, so
      // there is nothing to enroll
      if (!visitorId) return setState(name, EXCLUDED)

      // Experiment name FIRST. FNV-1a barely moves the bucket when only the
      // tail of the seed differs, so appending the name makes two experiments
      // land the same visitors in the same arm ~99% of the time; leading with
      // it decorrelates them (see tests/unit/ab-testing/assignment.spec.ts).
      const index = assignVariantIndex(config, `${name}|${visitorId}`)
      const variant = config.variants[index]?.name
      if (!variant) return setState(name, EXCLUDED)

      enterExperiment(name, variant)
      setState(name, { variant, resolved: true })
    })
    .catch(() => setState(name, EXCLUDED))
}

/** Test seam: clears memoized state between cases */
export const resetClientExperiments = () => {
  states.clear()
  activated.clear()
  configPromise = null
}
