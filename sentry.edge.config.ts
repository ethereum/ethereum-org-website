import * as Sentry from "@sentry/nextjs"

const environment = process.env.NEXT_PUBLIC_CONTEXT || "development"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.01,
  // Opt-in via `SENTRY_DEBUG=true`. See sentry.server.config.ts.
  debug: process.env.SENTRY_DEBUG === "true",
  environment,
  enabled: environment === "production",
  initialScope: { tags: { module: "app" } },
  ignoreTransactions: ["proxy"],
})
