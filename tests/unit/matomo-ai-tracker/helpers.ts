// Manual spy/stub helpers standing in for the vi.* utilities used by the
// upstream matomo-org/tracker-cloudflare suite (Playwright has no module mocks)

type ConsoleMethod = "debug" | "info" | "warn" | "error"

const consoleMethods: ConsoleMethod[] = ["debug", "info", "warn", "error"]

export interface ConsoleSpies {
  calls: Record<ConsoleMethod, unknown[][]>
  restore: () => void
}

export const createConsoleSpies = (): ConsoleSpies => {
  const originals = consoleMethods.map(
    (method) => [method, console[method]] as const
  )
  const calls: ConsoleSpies["calls"] = {
    debug: [],
    info: [],
    warn: [],
    error: [],
  }
  for (const method of consoleMethods) {
    console[method] = (...args: unknown[]) => {
      calls[method].push(args)
    }
  }
  return {
    calls,
    restore: () => {
      for (const [method, original] of originals) {
        console[method] = original
      }
    },
  }
}

export type FetchArgs = [RequestInfo | URL, RequestInit | undefined]

export interface FetchStub {
  calls: FetchArgs[]
  restore: () => void
}

export const stubGlobalFetch = (
  impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
): FetchStub => {
  const original = globalThis.fetch
  const calls: FetchArgs[] = []
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    calls.push([input, init])
    return impl(input, init)
  }) as typeof fetch
  return {
    calls,
    restore: () => {
      globalThis.fetch = original
    },
  }
}
