// Ported from matomo-org/tracker-cloudflare tests/logger.test.ts

import { expect, test } from "@playwright/test"

import { createLogger } from "../../../netlify/edge-functions/matomo-ai-tracker/logger"

import { createConsoleSpies } from "./helpers"

test.describe("createLogger", () => {
  test("respects log levels", () => {
    const spies = createConsoleSpies()
    try {
      const silentLog = createLogger("silent")
      silentLog.debug("a")
      silentLog.info("b")
      silentLog.warn("c")
      silentLog.error("d")
      expect(spies.calls.debug).toHaveLength(0)
      expect(spies.calls.info).toHaveLength(0)
      expect(spies.calls.warn).toHaveLength(0)
      expect(spies.calls.error).toHaveLength(0)

      const warnLog = createLogger("warn")
      warnLog.debug("x")
      warnLog.info("y")
      warnLog.warn("z")
      warnLog.error("err")
      expect(spies.calls.debug).toHaveLength(0)
      expect(spies.calls.info).toHaveLength(0)
      expect(spies.calls.warn).toHaveLength(1)
      expect(spies.calls.error).toHaveLength(1)

      const debugLog = createLogger("debug")
      debugLog.debug("dbg")
      debugLog.info("inf")
      debugLog.warn("wrn")
      debugLog.error("err")
      expect(spies.calls.debug).toHaveLength(1)
      expect(spies.calls.info).toHaveLength(1)
      expect(spies.calls.warn).toHaveLength(2)
      expect(spies.calls.error).toHaveLength(2)
    } finally {
      spies.restore()
    }
  })
})
