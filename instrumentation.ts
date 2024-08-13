import * as Sentry from "@sentry/nextjs"

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!dsn) {
    console.warn("Sentry DSN not found, skipping")
    return
  }

  const commonSentryOptions = {
    dsn,
    enabled: process.env.NODE_ENV === "production",
    tracesSampleRate: 1.0,
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      ...commonSentryOptions,
    })
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      ...commonSentryOptions,
    })
  }
}
