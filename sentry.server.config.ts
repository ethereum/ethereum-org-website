import * as Sentry from "@sentry/nextjs"

const environment = process.env.NEXT_PUBLIC_CONTEXT || "development"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.01,
  debug: process.env.SENTRY_DEBUG === "true",
  environment,
  enabled: environment === "production",
  initialScope: { tags: { module: "app" } },
  ignoreTransactions: ["proxy"],
  // Netlify Blobs cache reads and Next.js internals dominate our span quota.
  ignoreSpans: [
    { op: "http.client", name: /netlifyblobs\.com/ },
    { name: "resolve page components" },
    { name: "start response" },
  ],
})
