import type { Logger, LogLevel } from "./types"

const levels = ["silent", "error", "warn", "info", "debug"]

export function createLogger(level: LogLevel = "info"): Logger {
  const idx = levels.indexOf(level)
  const enabled = (lvl: LogLevel) => levels.indexOf(lvl) <= idx && idx !== 0
  return {
    debug: (...args: unknown[]) => {
      if (enabled("debug")) console.debug(...args)
    },
    info: (...args: unknown[]) => {
      if (enabled("info")) console.info(...args)
    },
    warn: (...args: unknown[]) => {
      if (enabled("warn")) console.warn(...args)
    },
    error: (...args: unknown[]) => {
      if (enabled("error")) console.error(...args)
    },
  }
}
