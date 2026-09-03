import type { ErrorEvent } from "@sentry/nextjs"

/** Reason an event was dropped, or null to keep it. */
export type DropReason =
  | "extension-payload"
  | "extension-throw"
  | "unattributable"
  | "unsupported-browser"
  | "wallet-provider"
  | null

const EXTENSION_PROTOCOL =
  /(?:chrome|moz|ms-browser|safari(?:-web)?)-extension:\/\//

// Injected third-party scripts whose frames carry no extension protocol.
const INJECTED_SCRIPT = [
  /preload\/document\.js/,
  /injected\/injected\.js/,
  /bridge\/inject\.js/,
  /content[-_]?script\.js/i,
  /inpage\.js/,
]

// EIP-1193 provider errors, plus the -32768..-32000 block JSON-RPC reserves
// for pre-defined errors. Our code never mints either, so the code alone
// identifies a wallet.
const EIP_1193_CODES = new Set([4001, 4100, 4200, 4900, 4901])
const isProviderErrorCode = (code: number): boolean =>
  EIP_1193_CODES.has(code) || (code >= -32768 && code <= -32000)

// Abandoned Firefox/Pale Moon forks that fail on modern baseline features, so
// nothing they report is actionable here. Sentry's legacy-browser inbound
// filter only knows the mainstream engines and never matches these.
const UNSUPPORTED_BROWSER =
  /^(?:Basilisk|Pale ?Moon|Waterfox|SeaMonkey|K-Meleon)$/i

// window.onerror reports cross-origin scripts with no URL, which the SDK
// stringifies into a frame filename.
const NO_LOCATION = new Set(["", "undefined", "null", "<anonymous>"])

const hasUsableLocation = (filename?: string, absPath?: string): boolean =>
  [filename, absPath].some((v) => v !== undefined && !NO_LOCATION.has(v))

// For a non-Error throw the SDK synthesizes an exception and prepends its own
// eventbuilder frame. It resolves to app:///node_modules/@sentry/..., so left
// in it would count as a location and hide that nothing else can be placed.
const isSdkFrame = (filename = "", absPath = ""): boolean =>
  [filename, absPath].some((v) => v.includes("/@sentry/"))

// Not app:/// -- nextjsClientStackFrameNormalization rewrites our own frames to
// that scheme before beforeSend runs, so it marks first-party code too.
const isThirdPartyLocation = (filename = "", absPath = ""): boolean =>
  [filename, absPath].some(
    (v) =>
      EXTENSION_PROTOCOL.test(v) ||
      v === "about:blank" ||
      INJECTED_SCRIPT.some((re) => re.test(v))
  )

/**
 * Decide whether a client error event is worth keeping.
 *
 * Every rule but the last requires positive evidence that the event did not
 * originate in our bundle, so a genuine first-party regression is never
 * silently swallowed. `unsupported-browser` is the one exception: those events
 * may well be ours, but the engine is one we cannot support, so the report is
 * unactionable either way.
 */
export function getDropReason(event: ErrorEvent): DropReason {
  const values = event.exception?.values ?? []

  // Wallet extensions reject with a plain object, so the SDK produces a
  // frameless event and stashes the real stack in extra (ETHORG-73).
  if (EXTENSION_PROTOCOL.test(JSON.stringify(event.extra ?? {}))) {
    return "extension-payload"
  }

  // Wallet providers reject with an EIP-1193 object rather than an Error, so
  // the message varies per wallet but the code does not (ETHORG-7Q, ETHORG-73).
  const serialized = (event.extra as { __serialized__?: { code?: unknown } })
    ?.__serialized__
  if (
    typeof serialized?.code === "number" &&
    isProviderErrorCode(serialized.code)
  ) {
    return "wallet-provider"
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

  // Cross-origin scripts are reported with frames the browser refuses to
  // locate, so no URL-based rule can match them (ETHORG-9Q's stack overflow,
  // ETHORG-1AC's `AutoScroll` scraper). Our own frames are always rewritten to
  // app:///, so an event where *no* frame has a location cannot be ours. A
  // genuinely frameless event is kept: absence of frames is not evidence.
  const frames = values
    .flatMap((v) => v.stacktrace?.frames ?? [])
    .filter((f) => !isSdkFrame(f.filename, f.abs_path))
  if (
    frames.length > 0 &&
    !frames.some((f) => hasUsableLocation(f.filename, f.abs_path))
  ) {
    return "unattributable"
  }

  // `Contexts` types every field as unknown, so narrow before matching.
  const browserName = event.contexts?.browser?.name
  if (
    typeof browserName === "string" &&
    UNSUPPORTED_BROWSER.test(browserName)
  ) {
    return "unsupported-browser"
  }

  return null
}
