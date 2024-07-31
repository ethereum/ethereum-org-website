import * as Sentry from "@sentry/nextjs"

export async function register() {
  const dns = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!dns) {
    console.warn("Sentry DSN not found, skipping")
    return
  }

  const commonSentryOptions = {
    dsn: dns,
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
