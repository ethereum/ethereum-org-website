import * as Sentry from "@sentry/nextjs"

type LogContext = Record<string, unknown>

const shouldLogToConsole = process.env.NODE_ENV !== "production"

const normalizeContext = (
  context?: LogContext,
  error?: unknown
): LogContext | undefined => {
  if (!context && !error) return undefined
  return {
    ...context,
    ...(error ? { error } : {}),
  }
}

export const logger = {
  warn(message: string, context?: LogContext) {
    if (shouldLogToConsole) {
      console.warn(message, context)
    }

    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
    })
  },

  error(message: string, error?: unknown, context?: LogContext) {
    const extra = normalizeContext(context, error)

    if (shouldLogToConsole) {
      console.error(message, error ?? context)
    }

    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: context,
        tags: { logger: "centralized" },
      })
      return
    }

    Sentry.captureMessage(message, {
      level: "error",
      extra,
      tags: { logger: "centralized" },
    })
  },
}
