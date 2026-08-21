import type { ErrorEvent } from "@sentry/nextjs"

/** Reason an event was dropped, or null to keep it. */
export type DropReason =
  | "extension-payload"
  | "extension-throw"
  | "unattributable-overflow"
  | null

const EXTENSION_PROTOCOL = /(?:chrome|moz|safari|ms-browser)-extension:\/\//

// Injected third-party scripts whose frames carry no extension protocol.
const INJECTED_SCRIPT = [
  /preload\/document\.js/,
  /injected\/injected\.js/,
  /bridge\/inject\.js/,
  /content[-_]?script\.js/i,
  /inpage\.js/,
]

const OVERFLOW_MESSAGE = /Maximum call stack size exceeded|too much recursion/i

// window.onerror reports cross-origin scripts with no URL, which the SDK
// stringifies into a frame filename.
const NO_LOCATION = new Set(["", "undefined", "null", "<anonymous>"])

const hasUsableLocation = (filename?: string, absPath?: string): boolean =>
  [filename, absPath].some((v) => v !== undefined && !NO_LOCATION.has(v))

const isThirdPartyLocation = (filename = "", absPath = ""): boolean =>
  [filename, absPath].some(
    (v) =>
      EXTENSION_PROTOCOL.test(v) ||
      v.startsWith("app:///") ||
      INJECTED_SCRIPT.some((re) => re.test(v))
  )

/**
 * Decide whether a client error event is third-party noise.
 *
 * Every rule requires positive evidence that the event did not originate in our
 * bundle, so a genuine first-party regression is never silently swallowed.
 */
export function getDropReason(event: ErrorEvent): DropReason {
  const values = event.exception?.values ?? []

  // Wallet extensions reject with a plain object, so the SDK produces a
  // frameless event and stashes the real stack in extra (ETHORG-73).
  if (EXTENSION_PROTOCOL.test(JSON.stringify(event.extra ?? {}))) {
    return "extension-payload"
  }

  // Sentry orders frames oldest-first, so the throwing frame is the last one.
  // Matching any frame would discard our own bugs whenever injected wallet code
  // appears anywhere in the stack.
  const throwingFrames = values
    .map((v) => v.stacktrace?.frames)
    .filter((frames) => frames?.length)
    .map((frames) => frames![frames!.length - 1])

  if (
    throwingFrames.some((f) => isThirdPartyLocation(f.filename, f.abs_path))
  ) {
    return "extension-throw"
  }

  // Stack overflows inside a cross-origin script arrive with a single
  // location-less frame, which no URL-based rule can match (ETHORG-9Q).
  const message = values.map((v) => v.value ?? "").join("\n")
  if (OVERFLOW_MESSAGE.test(message)) {
    const frames = values.flatMap((v) => v.stacktrace?.frames ?? [])
    const attributable = frames.some((f) =>
      hasUsableLocation(f.filename, f.abs_path)
    )
    if (!attributable) return "unattributable-overflow"
  }

  return null
}
