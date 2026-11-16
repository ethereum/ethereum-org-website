// On Netlify the proxy runs before Next's own redirects (locally it runs
// after), so resolvePathRoute alone decides whether a slash-less URL redirects
// or renders a 200 duplicate. Every redirect must land on the final URL in one
// hop; `null` hands the path to next-intl.

import type { NextConfig } from "next"
import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { match } from "next/dist/compiled/path-to-regexp"
import { expect, test } from "@playwright/test"

import {
  compileRedirectSource,
  findLegacyRedirect,
  resolvePathRoute,
} from "@/lib/utils/redirects"

import i18nConfig from "../../../i18n.config.json"
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

const redirect = (destination: string, permanent = true) => ({
  destination,
  permanent,
})

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

test("non-canonical default-locale paths also drop the prefix in one hop", () => {
  expect(resolvePathRoute("/EN/Developers")).toEqual(redirect("/developers/"))
  expect(resolvePathRoute("/nl/en/developers")).toEqual(
    redirect("/developers/")
  )
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

test("no redirect target is protocol-relative", () => {
  // Netlify strips the origin from same-origin Locations, so `//host/...`
  // would send the browser off-site
  for (const path of [
    "//evil.com/x",
    "//Evil.com/x/",
    "///evil.com/x",
    "/nl//evil.com/x",
    "/NL//Evil.com/x/",
    "/de//evil.com/x",
    "/foo//bar",
  ]) {
    const route = resolvePathRoute(path)
    expect(route, path).not.toBeNull()
    expect(route!.destination, path).toMatch(/^\/(?!\/)/)
    expect(route!.destination, path).not.toContain("//")
  }
  expect(resolvePathRoute("//evil.com/x")).toEqual(redirect("/evil.com/x/"))
})

test("legacy sources redirect straight to their destination", () => {
  // Not via the next.config rules, whose order relative to the proxy is
  // Netlify's choice
  for (const path of ["/eth", "/eth/", "/ETH", "/en/eth", "/nl/eth"]) {
    expect(resolvePathRoute(path), path).toEqual(redirect("/what-is-ether/"))
  }
  expect(resolvePathRoute("/de/eth")).toEqual(redirect("/de/what-is-ether/"))
  expect(resolvePathRoute("/fr/eth/supply")).toEqual(
    redirect("/fr/what-is-ether/supply/")
  )
  expect(resolvePathRoute("/de/discord")).toEqual(
    redirect("https://discord.gg/MWpjbnsfNE")
  )
  expect(resolvePathRoute("/pdfs/a/b")).toEqual(redirect("/"))
  expect(resolvePathRoute("/de/developers/docs/rollups")).toEqual(
    redirect("/de/developers/docs/scaling/#rollups")
  )
  expect(resolvePathRoute("/developers/docs/accounts/abstraction")).toEqual(
    redirect("/roadmap/account-abstraction/", false)
  )
})

test("every locale in i18n.config.json is recognized, whatever the build subset", () => {
  for (const { code } of i18nConfig) {
    const expected =
      code === "en" ? "/what-is-ether/" : `/${code}/what-is-ether/`
    expect(resolvePathRoute(`/${code}/eth`), code).toEqual(redirect(expected))
  }
})

test("near-misses of legacy sources are not treated as legacy", () => {
  expect(resolvePathRoute("/ethx")).toEqual(redirect("/ethx/"))
  expect(resolvePathRoute("/ethx/")).toBeNull()
  expect(resolvePathRoute("/eth/x")).toEqual(redirect("/eth/x/"))
  expect(resolvePathRoute("/x/eth")).toEqual(redirect("/x/eth/"))
})

test("source matching is case-insensitive", () => {
  expect(compileRedirectSource("/a%E2%80%99s")!.test("/a%e2%80%99s")).toBe(true)
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
      expect(Boolean(findLegacyRedirect(path)), path).toBe(reference(path))
    }
  }
})
