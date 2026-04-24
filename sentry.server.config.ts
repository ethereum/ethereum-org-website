import * as Sentry from "@sentry/nextjs"

const environment = process.env.NEXT_PUBLIC_CONTEXT || "development"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.01,
  // Opt-in via `SENTRY_DEBUG=true`. Off by default — under Turbopack the
  // OTel instrumentation makes `debug: true` very noisy in dev even when
  // `enabled: false`, so the old `environment === "development"` default
  // flooded terminals with init messages.
  debug: process.env.SENTRY_DEBUG === "true",
  environment,
  enabled: environment === "production",
  initialScope: { tags: { module: "app" } },
  ignoreTransactions: ["proxy"],
})
