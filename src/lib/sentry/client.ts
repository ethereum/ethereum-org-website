import { clientOptions } from "./client-options"

type Sentry = typeof import("./sdk")

/**
 * Lazily loaded browser Sentry.
 *
 * The SDK used to load and initialise before hydration on every page, making
 * it the largest script on the critical path. It now loads when
 * instrumentation-client.ts schedules it (the page is idle after `load`), or
 * earlier if something needs to report an error. Errors thrown before Sentry
 * is ready are buffered by instrumentation-client.ts and replayed once it is.
 */
let sentry: Sentry | undefined
let loading: Promise<Sentry> | undefined
const loadCallbacks: ((sentry: Sentry) => void)[] = []

// A failed chunk load only means Sentry is unavailable; never surface it as an
// unhandled rejection
const ignoreLoadFailure = () => {}

export const loadSentry = (): Promise<Sentry> =>
  (loading ??= import("./sdk").then(
    (module) => {
      module.init(clientOptions)
      sentry = module
      loadCallbacks.splice(0).forEach((callback) => callback(module))
      return module
    },
    (error: unknown) => {
      // Allow a later call to retry the chunk load
      loading = undefined
      throw error
    }
  ))

/**
 * Run `callback` once Sentry has loaded, whichever caller triggered the load,
 * without triggering it here.
 */
export const onSentryLoad = (callback: (sentry: Sentry) => void): void => {
  if (sentry) callback(sentry)
  else loadCallbacks.push(callback)
}

/** The SDK if it has finished loading, without triggering a load. */
export const getLoadedSentry = (): Sentry | undefined => sentry

export function captureException(
  ...args: Parameters<Sentry["captureException"]>
): void {
  loadSentry()
    .then((module) => module.captureException(...args))
    .catch(ignoreLoadFailure)
}

/** Start loading Sentry without waiting for it. */
export const preloadSentry = (): void => {
  loadSentry().catch(ignoreLoadFailure)
}
