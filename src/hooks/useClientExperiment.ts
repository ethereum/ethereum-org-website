"use client"

import { useEffect, useSyncExternalStore } from "react"

import {
  activateClientExperiment,
  type ClientExperimentState,
  getClientExperimentState,
  getServerExperimentState,
  subscribeToClientExperiments,
} from "@/lib/ab-testing/client-experiment"

/**
 * Read a client-assigned experiment (layout chrome - see
 * src/lib/ab-testing/client-experiment.ts).
 *
 * Returns `{ variant: null }` while the assignment is pending, for visitors
 * Matomo does not track, and whenever the experiment is not running in Matomo,
 * so callers can treat null as "render the original".
 *
 * Several components may call this for the same experiment - the desktop and
 * mobile navs both do - and all of them get one shared assignment and one
 * enrollment event.
 */
export const useClientExperiment = (
  name: string,
  { enabled = true }: { enabled?: boolean } = {}
): ClientExperimentState => {
  useEffect(() => {
    activateClientExperiment(name, { enabled })
  }, [name, enabled])

  return useSyncExternalStore(
    subscribeToClientExperiments,
    () => getClientExperimentState(name),
    getServerExperimentState
  )
}
