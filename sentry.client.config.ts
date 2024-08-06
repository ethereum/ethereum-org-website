import * as Sentry from "@sentry/nextjs"

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_CONTEXT,
  tracesSampleRate: 1.0,
})
