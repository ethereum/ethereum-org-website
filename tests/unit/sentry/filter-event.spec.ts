// Fixtures are trimmed copies of real payloads pulled from the Sentry issues
// named in each test, so the rules stay pinned to events we actually receive.

import { expect, test } from "@playwright/test"
import type { ErrorEvent } from "@sentry/nextjs"

import { getDropReason } from "@/lib/sentry/filter-event"

type Frame = { filename?: string; abs_path?: string }

const errorEvent = (
  values: Array<{ value: string; frames?: Frame[] }>,
  extra?: Record<string, unknown>
): ErrorEvent =>
  ({
    exception: {
      values: values.map(({ value, frames }) => ({
        type: "Error",
        value,
        ...(frames ? { stacktrace: { frames } } : {}),
      })),
    },
    ...(extra ? { extra } : {}),
  }) as ErrorEvent

test.describe("extension payloads in serialized extra (ETHORG-73)", () => {
  test("drops a frameless rejection whose extra holds an extension stack", () => {
    const event = errorEvent(
      [
        {
          value:
            "Object captured as promise rejection with keys: code, message, stack",
        },
      ],
      {
        __serialized__: {
          code: 4900,
          message: "The provider is disconnected from all chains.",
          stack:
            "Error: The provider is disconnected from all chains.\n    at s (chrome-extension://acmacodkjbdgmoleebolmdjonilkdbch/background.js:4:8154377)",
        },
      }
    )

    expect(getDropReason(event)).toBe("extension-payload")
  })

  test("keeps a frameless rejection with no extension evidence", () => {
    const event = errorEvent(
      [{ value: "Non-Error promise rejection captured with value: null" }],
      {
        __serialized__: { message: "upstream timeout" },
      }
    )

    expect(getDropReason(event)).toBeNull()
  })
})

test.describe("wallet provider errors (ETHORG-7Q, ETHORG-73)", () => {
  test("drops an EIP-1193 rejection identified only by its code", () => {
    const event = errorEvent(
      [
        {
          value:
            "Object captured as promise rejection with keys: code, message",
        },
      ],
      {
        __serialized__: {
          code: 4001,
          message: "wallet must has at least one account",
        },
      }
    )

    expect(getDropReason(event)).toBe("wallet-provider")
  })

  test("drops a reserved JSON-RPC provider code", () => {
    const event = errorEvent(
      [{ value: "Object captured as promise rejection" }],
      {
        __serialized__: { code: -32603, message: "Internal JSON-RPC error" },
      }
    )

    expect(getDropReason(event)).toBe("wallet-provider")
  })

  test("keeps an unrelated numeric code", () => {
    const event = errorEvent(
      [{ value: "Object captured as promise rejection" }],
      {
        __serialized__: { code: 500, message: "upstream failure" },
      }
    )

    expect(getDropReason(event)).toBeNull()
  })
})

test.describe("third-party throwing frame", () => {
  test("drops when the last frame is an injected wallet script", () => {
    const event = errorEvent([
      {
        value: "Cannot read properties of undefined",
        frames: [
          { filename: "https://ethereum.org/_next/static/chunks/main.js" },
          { filename: "chrome-extension://abc/inpage.js" },
        ],
      },
    ])

    expect(getDropReason(event)).toBe("extension-throw")
  })

  test("keeps our own bug when injected code only appears deeper in the stack", () => {
    const event = errorEvent([
      {
        value: "Cannot read properties of undefined",
        frames: [
          { filename: "chrome-extension://abc/inpage.js" },
          { filename: "https://ethereum.org/_next/static/chunks/app.js" },
        ],
      },
    ])

    expect(getDropReason(event)).toBeNull()
  })

  test("keeps an about:blank frame that is not the throw site", () => {
    const event = errorEvent([
      {
        value: "TypeError: x is not a function",
        frames: [
          { filename: "about:blank" },
          { filename: "https://ethereum.org/_next/static/chunks/app.js" },
        ],
      },
    ])

    expect(getDropReason(event)).toBeNull()
  })
})

test.describe("unattributable stack overflow (ETHORG-9Q)", () => {
  test("drops the single location-less onerror frame", () => {
    const event = errorEvent([
      {
        value: "Maximum call stack size exceeded.",
        frames: [{ filename: "undefined", abs_path: "undefined" }],
      },
    ])

    expect(getDropReason(event)).toBe("unattributable-overflow")
  })

  test("drops the Firefox wording too", () => {
    const event = errorEvent([
      { value: "too much recursion", frames: [{ filename: "undefined" }] },
    ])

    expect(getDropReason(event)).toBe("unattributable-overflow")
  })

  test("keeps a real recursion bug in our bundle", () => {
    const event = errorEvent([
      {
        value: "Maximum call stack size exceeded",
        frames: [
          { filename: "https://ethereum.org/_next/static/chunks/app.js" },
          { filename: "https://ethereum.org/_next/static/chunks/app.js" },
        ],
      },
    ])

    expect(getDropReason(event)).toBeNull()
  })

  test("reads the message from a chained cause, not just values[0]", () => {
    // Sentry prepends causes, so the thrown error is the last value.
    const event = errorEvent([
      { value: "some upstream cause", frames: [{ filename: "undefined" }] },
      {
        value: "Maximum call stack size exceeded",
        frames: [{ filename: "undefined" }],
      },
    ])

    expect(getDropReason(event)).toBe("unattributable-overflow")
  })
})

test("keeps an ordinary first-party error", () => {
  const event = errorEvent([
    {
      value: "The router state header was sent but could not be parsed.",
      frames: [{ filename: "https://ethereum.org/_next/static/chunks/app.js" }],
    },
  ])

  expect(getDropReason(event)).toBeNull()
})
