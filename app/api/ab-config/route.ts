import { NextResponse } from "next/server"

import { getActiveExperimentConfigs } from "@/lib/ab-testing/matomo-adapter"

/**
 * Active experiment config for experiments assigned in the browser.
 *
 * Page-level experiments never need this - the proxy resolves them before the
 * response is built. Layout-level experiments (the nav, the footer: chrome
 * that every page shares) cannot use the precompute pattern because
 * `abTestRoutes` is keyed by page path, so they read the running experiments
 * from here instead. See docs/ab-testing.md, "Layout-level experiments".
 *
 * Cached for an hour, matching the proxy adapter's TTL, so pausing an
 * experiment in Matomo takes effect within the same window either way.
 */
export const revalidate = 3600

export async function GET() {
  const experiments = await getActiveExperimentConfigs()

  return NextResponse.json(
    { experiments },
    {
      headers: {
        // Shared cache only: a visitor-agnostic payload, so the CDN can serve
        // every request from one entry
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  )
}
