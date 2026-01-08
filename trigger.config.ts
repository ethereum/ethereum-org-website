import * as Sentry from "@sentry/nextjs"
import { defineConfig } from "@trigger.dev/sdk/v3"

/**
 * Trigger.dev configuration for background jobs and scheduled tasks.
 * See https://trigger.dev/docs for documentation.
 */
export default defineConfig({
  project: process.env.TRIGGER_PROJECT_ID || "",
  runtime: "node",
  logLevel: "log",
  // Maximum duration for all tasks (5 minutes)
  // See https://trigger.dev/docs/runs/max-duration
  maxDuration: 300,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 1,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  // Directory containing Trigger.dev task definitions
  dirs: ["./src/data-layer/trigger/tasks"],
  // Initialize Sentry for error tracking in Trigger.dev tasks
  // Uses the same Sentry configuration as the Next.js app
  // Note: Trigger.dev already initializes OpenTelemetry, so we skip Sentry's OpenTelemetry setup
  init: async () => {
    const environment = process.env.NEXT_PUBLIC_CONTEXT || "development"

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.01,
      debug: environment === "development",
      environment,
      enabled: environment === "production",
      // Skip OpenTelemetry setup since Trigger.dev already initializes it
      // This prevents "Attempted duplicate registration of API" errors
      skipOpenTelemetrySetup: true,
    } as Parameters<typeof Sentry.init>[0])
  },
  // Automatically capture and report task failures to Sentry
  onFailure: async ({ payload, error, ctx }) => {
    Sentry.captureException(error, {
      extra: {
        payload,
        ctx,
      },
    })
  },
})
