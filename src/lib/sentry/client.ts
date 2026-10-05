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

export const loadSentry = (): Promise<Sentry> =>
  (loading ??= import("./sdk").then((module) => {
    module.init(clientOptions)
    sentry = module
    return module
  }))

/** The SDK if it has finished loading, without triggering a load. */
export const getLoadedSentry = (): Sentry | undefined => sentry

export function captureException(
  ...args: Parameters<Sentry["captureException"]>
): void {
  void loadSentry().then((module) => module.captureException(...args))
}
