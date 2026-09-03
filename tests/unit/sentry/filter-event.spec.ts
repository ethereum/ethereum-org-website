// Fixtures are trimmed copies of real payloads from the Sentry issues named
// below, so the rules stay pinned to events we actually receive.

import { expect, test } from "@playwright/test"
import type { ErrorEvent } from "@sentry/nextjs"

import { type DropReason, getDropReason } from "@/lib/sentry/filter-event"

// @sentry/nextjs rewrites our origin to app:/// before beforeSend runs, so
// this is what a first-party frame actually looks like at filter time.
const OURS = "app:///_next/static/chunks/app.js"

// The SDK prepends this to any non-Error throw it has to synthesize.
const SDK = "app:///node_modules/@sentry/core/src/utils/eventbuilder.ts"

const event = (
  values: Array<{ value: string; frames?: string[] }>,
  extra?: Record<string, unknown>
): ErrorEvent =>
  ({
    exception: {
      values: values.map(({ value, frames }) => ({
        value,
        ...(frames && {
          stacktrace: { frames: frames.map((f) => ({ filename: f })) },
        }),
      })),
    },
    ...(extra && { extra }),
  }) as ErrorEvent

const inBrowser = (name: string, base: ErrorEvent): ErrorEvent =>
  ({ ...base, contexts: { browser: { name } } }) as ErrorEvent

const cases: Array<[name: string, event: ErrorEvent, expected: DropReason]> = [
  // Wallet providers vary the message per wallet but not the code
  // (ETHORG-7Q, ETHORG-73).
  [
    "EIP-1193 code",
    event([{ value: "Object captured as promise rejection" }], {
      __serialized__: {
        code: 4001,
        message: "wallet must has at least one account",
      },
    }),
    "wallet-provider",
  ],
  [
    "reserved JSON-RPC code",
    event([{ value: "Object captured as promise rejection" }], {
      __serialized__: { code: -32603, message: "Internal JSON-RPC error" },
    }),
    "wallet-provider",
  ],
  [
    "unrelated numeric code",
    event([{ value: "Object captured as promise rejection" }], {
      __serialized__: { code: 500, message: "upstream failure" },
    }),
    null,
  ],
  [
    "extension stack in serialized extra",
    event([{ value: "Object captured as promise rejection" }], {
      __serialized__: {
        stack:
          "at s (chrome-extension://acmacodkjbdgmoleebolmdjonilkdbch/background.js:4)",
      },
    }),
    "extension-payload",
  ],
  // Frames are oldest-first, so only the last is the throw site. Matching any
  // frame would discard our own bugs whenever a wallet wraps our functions.
  [
    "injected script throws",
    event([
      {
        value: "x is not a function",
        frames: [OURS, "chrome-extension://a/inpage.js"],
      },
    ]),
    "extension-throw",
  ],
  [
    "injected script deeper in the stack, ours throws",
    event([
      {
        value: "x is not a function",
        frames: ["chrome-extension://a/inpage.js", OURS],
      },
    ]),
    null,
  ],
  // A cross-origin script that onerror cannot attribute (ETHORG-9Q).
  [
    "overflow with no usable location",
    event([
      { value: "Maximum call stack size exceeded.", frames: ["undefined"] },
    ]),
    "unattributable",
  ],
  [
    "overflow, Firefox wording",
    event([{ value: "too much recursion", frames: ["<anonymous>"] }]),
    "unattributable",
  ],
  [
    // Sentry prepends causes, so the thrown error is the last value.
    "overflow reported on a chained cause",
    event([
      { value: "some upstream cause", frames: ["undefined"] },
      { value: "Maximum call stack size exceeded", frames: ["undefined"] },
    ]),
    "unattributable",
  ],
  [
    "overflow in our own bundle",
    event([
      { value: "Maximum call stack size exceeded", frames: [OURS, OURS] },
    ]),
    null,
  ],
  // The message no longer gates the rule, so any unlocatable stack is dropped
  // whatever it says. ETHORG-1AC: a third-party `AutoScroll` scraper whose
  // frames carry a line/column but no filename at all.
  [
    "unlocatable stack, arbitrary message",
    event([
      {
        value:
          "Failed to execute 'querySelector' on 'Document': The provided selector is empty.",
        frames: ["", "", ""],
      },
    ]),
    "unattributable",
  ],
  [
    "one locatable frame among unlocatable ones is enough to keep",
    event([
      { value: "Cannot read properties of null", frames: ["undefined", OURS] },
    ]),
    null,
  ],
  // Absence of frames is not evidence of anything, so these still come through
  // and remain the residue that only a message rule could catch.
  [
    "frameless event with a noisy message",
    event([{ value: "Failed to connect to MetaMask" }]),
    null,
  ],
  // ETHORG-1AV: an injected script on Baidu Explorer calls a non-standard
  // `.unLoad`. The SDK's own frame is the only locatable one, so it has to be
  // discounted or the stack looks attributable.
  [
    "SDK frame is not evidence of attribution",
    event([
      {
        value: "Cannot read properties of undefined (reading 'unLoad')",
        frames: [SDK, "<anonymous>"],
      },
    ]),
    "unattributable",
  ],
  [
    "SDK frame alongside a real first-party frame still keeps",
    event([
      {
        value: "Cannot read properties of null (reading 'click')",
        frames: [SDK, OURS],
      },
    ]),
    null,
  ],
  // Pale Moon forks fail on modern baseline features -- ETHORG-1AY is Next's
  // own runtime throwing because Basilisk has no document.currentScript.
  [
    "unsupported engine",
    inBrowser(
      "Basilisk",
      event([
        {
          value:
            "Invariant: Expected document.currentScript to be a <script> element.",
          frames: [OURS],
        },
      ])
    ),
    "unsupported-browser",
  ],
  [
    "supported engine, same error",
    inBrowser(
      "Firefox",
      event([
        {
          value:
            "Invariant: Expected document.currentScript to be a <script> element.",
          frames: [OURS],
        },
      ])
    ),
    null,
  ],
  [
    "about:blank throw site",
    event([{ value: "x is not a function", frames: [OURS, "about:blank"] }]),
    "extension-throw",
  ],
  [
    "frameless overflow, no third-party evidence",
    event([{ value: "Maximum call stack size exceeded" }]),
    null,
  ],
  [
    "ordinary first-party error",
    event([
      { value: "The router state header could not be parsed.", frames: [OURS] },
    ]),
    null,
  ],
]

for (const [name, errorEvent, expected] of cases) {
  test(`${expected ?? "keeps"}: ${name}`, () => {
    expect(getDropReason(errorEvent)).toBe(expected)
  })
}
