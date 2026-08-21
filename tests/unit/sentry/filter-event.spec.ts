// Fixtures are trimmed copies of real payloads from the Sentry issues named
// below, so the rules stay pinned to events we actually receive.

import { expect, test } from "@playwright/test"
import type { ErrorEvent } from "@sentry/nextjs"

import { type DropReason, getDropReason } from "@/lib/sentry/filter-event"

const OURS = "https://ethereum.org/_next/static/chunks/app.js"

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
    "unattributable-overflow",
  ],
  [
    "overflow, Firefox wording",
    event([{ value: "too much recursion", frames: ["<anonymous>"] }]),
    "unattributable-overflow",
  ],
  [
    // Sentry prepends causes, so the thrown error is the last value.
    "overflow reported on a chained cause",
    event([
      { value: "some upstream cause", frames: ["undefined"] },
      { value: "Maximum call stack size exceeded", frames: ["undefined"] },
    ]),
    "unattributable-overflow",
  ],
  [
    "overflow in our own bundle",
    event([
      { value: "Maximum call stack size exceeded", frames: [OURS, OURS] },
    ]),
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
