// On Netlify the proxy runs before Next's trailingSlash redirect (locally it
// runs after), so resolvePathRoute alone decides whether a slash-less URL
// redirects or renders a 200 duplicate. Every redirect must land on the final
// slashed URL in one hop; `null` hands the path to next-intl.

import type { NextConfig } from "next"
import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { match } from "next/dist/compiled/path-to-regexp"
import { expect, test } from "@playwright/test"

import {
  compileRedirectSource,
  isLegacyRedirectSource,
  resolvePathRoute,
} from "@/lib/utils/redirects"

import nextConfig from "../../../next.config.js"
import legacyRedirects from "../../../redirects.config.js"

test("Netlify hands the proxy the raw, slash-less path", async () => {
  // Without this, Netlify appends the slash before the proxy runs and the
  // slash redirect below never fires in production.
  // withSentryConfig's typings hide that the export is a phase function
  const loadConfig = nextConfig as unknown as (
    phase: string,
    context: object
  ) => Promise<NextConfig>
  const config = await loadConfig(PHASE_PRODUCTION_BUILD, {})
  expect(config.skipProxyUrlNormalize).toBe(true)
  expect(config.trailingSlash).toBe(true)
})

const redirect = (pathname: string) => ({ type: "redirect", pathname })
const rewrite = (pathname: string) => ({ type: "rewrite", pathname })

test("slash-less URLs 301 to the slashed URL", () => {
  expect(resolvePathRoute("/developers/docs/bridges")).toEqual(
    redirect("/developers/docs/bridges/")
  )
  expect(resolvePathRoute("/de/developers/docs/bridges")).toEqual(
    redirect("/de/developers/docs/bridges/")
  )
  expect(resolvePathRoute("/de")).toEqual(redirect("/de/"))
})

test("slashed URLs pass through to next-intl", () => {
  expect(resolvePathRoute("/")).toBeNull()
  expect(resolvePathRoute("/developers/docs/bridges/")).toBeNull()
  expect(resolvePathRoute("/de/developers/docs/bridges/")).toBeNull()
})

test("default-locale paths are left to next-intl's single-hop prefix strip", () => {
  expect(resolvePathRoute("/en")).toBeNull()
  expect(resolvePathRoute("/en/developers/docs/bridges")).toBeNull()
})

test("mixed case and deprecated locales redirect straight to the slashed URL", () => {
  expect(resolvePathRoute("/Developers/Docs/Bridges")).toEqual(
    redirect("/developers/docs/bridges/")
  )
  expect(resolvePathRoute("/nl/developers/docs/bridges")).toEqual(
    redirect("/developers/docs/bridges/")
  )
  expect(resolvePathRoute("/nl")).toEqual(redirect("/"))
  expect(resolvePathRoute("/nl/")).toEqual(redirect("/"))
})

test("legacy sources rewrite to the form their next.config redirect matches", () => {
  // No slash redirect first: the config rule fires on the rewritten path and
  // sends the request straight to its destination.
  expect(resolvePathRoute("/eth")).toEqual(rewrite("/en/eth/"))
  expect(resolvePathRoute("/eth/")).toEqual(rewrite("/en/eth/"))
  expect(resolvePathRoute("/en/eth")).toEqual(rewrite("/en/eth/"))
  expect(resolvePathRoute("/de/eth")).toEqual(rewrite("/de/eth/"))
  expect(resolvePathRoute("/discord")).toEqual(rewrite("/en/discord/"))
  expect(resolvePathRoute("/pdfs/a/b")).toEqual(rewrite("/en/pdfs/a/b/"))
})

test("near-misses of legacy sources are not treated as legacy", () => {
  expect(resolvePathRoute("/ethx")).toEqual(redirect("/ethx/"))
  expect(resolvePathRoute("/eth/x")).toEqual(redirect("/eth/x/"))
  expect(resolvePathRoute("/x/eth")).toEqual(redirect("/x/eth/"))
})

test("every redirects.config.js source compiles", () => {
  const unsupported = legacyRedirects
    .map(([source]) => source)
    .filter((source) => !compileRedirectSource(source))
  expect(unsupported).toEqual([])
})

test("the source matcher agrees with path-to-regexp", () => {
  // Next tolerates a trailing slash on every custom route source
  const matchers = legacyRedirects.map(([source]) => match(source))
  const reference = (path: string) =>
    matchers.some((m) => m(path.length > 1 ? path.replace(/\/$/, "") : path))

  for (const [source] of legacyRedirects) {
    const base = source.replace(/\/:\w+\*$/, "").replace(/:\w+/g, "x")
    const samples = [
      base,
      `${base}/`,
      `${base}/a`,
      `${base}/a/b/`,
      `${base}x`,
      `${base}.html`,
      `/de${base}`,
    ]
    for (const path of samples) {
      expect(isLegacyRedirectSource(path), path).toBe(reference(path))
    }
  }
})
