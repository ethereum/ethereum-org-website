import * as Sentry from "@sentry/nextjs"

const dns = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: dns,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_CONTEXT,
  tracesSampleRate: 1.0,
})
