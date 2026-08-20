// These rewrites are the only guard that agent-facing markdown URLs resolve to
// the same file importMd() reads. Suffix matching on a greedy `:path*` is the
// subtle part -- it relies on backtracking to leave `.md` for the literal, so
// assert the near-misses alongside the matches.

import { createRequire } from "module"

import { PHASE_PRODUCTION_BUILD } from "next/constants"
import { match } from "next/dist/compiled/path-to-regexp"
import loadCustomRoutes from "next/dist/lib/load-custom-routes"
import type { NextConfigComplete } from "next/dist/server/config-shared"
import { expect, test } from "@playwright/test"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import rewrites from "../../../rewrites.config.js"

// First match wins, mirroring Next's own resolution order.
const resolve = (pathname: string) => {
  for (const rule of rewrites) {
    const result = match(rule.source, { decode: decodeURIComponent })(pathname)
    if (!result) continue
    const params = result.params as Record<string, string | string[]>
    return rule.destination.replace(/:(\w+)\*?/g, (_, name: string) => {
      const value = params[name]
      return Array.isArray(value) ? value.join("/") : value
    })
  }
  return null
}

test("English .md URLs resolve to the file importMd reads", () => {
  expect(resolve("/smart-contracts.md")).toBe(
    "/content/smart-contracts/index.md"
  )
  expect(resolve("/developers/docs/intro-to-ethereum.md")).toBe(
    "/content/developers/docs/intro-to-ethereum/index.md"
  )
})

test("the default locale prefix resolves to root content, not translations", () => {
  // There is no public/content/translations/en -- English lives at the root.
  expect(resolve(`/${DEFAULT_LOCALE}/smart-contracts.md`)).toBe(
    "/content/smart-contracts/index.md"
  )
})

test("every non-default locale resolves into translations", () => {
  const nonDefault = LOCALES_CODES.filter((code) => code !== DEFAULT_LOCALE)
  expect(nonDefault.length).toBeGreaterThan(0)

  for (const locale of nonDefault) {
    expect(resolve(`/${locale}/smart-contracts.md`)).toBe(
      `/content/translations/${locale}/smart-contracts/index.md`
    )
  }
})

test("non-markdown and unconfigured-locale paths are left alone", () => {
  expect(resolve("/smart-contracts.mdx")).toBeNull()
  expect(resolve("/smart-contracts/")).toBeNull()
  expect(resolve("/smart-contracts")).toBeNull()
  // An unconfigured prefix is not a locale, so it stays part of the slug.
  expect(resolve("/zz/smart-contracts.md")).toBe(
    "/content/zz/smart-contracts/index.md"
  )
})

test("the rules register as afterFiles rewrites", async () => {
  // afterFiles is load-bearing: real files under /content must resolve before
  // the unprefixed rule gets a chance to re-wrap an already-rewritten path.
  // next.config.js is CJS and phase-taking, so require it the way Next does.
  const config = createRequire(__filename)("../../../next.config.js") as (
    phase: string
  ) => Promise<NextConfigComplete> | NextConfigComplete

  const routes = await loadCustomRoutes(await config(PHASE_PRODUCTION_BUILD))

  expect(routes.rewrites.beforeFiles).toHaveLength(0)
  expect(routes.rewrites.fallback).toHaveLength(0)
  expect(routes.rewrites.afterFiles).toHaveLength(rewrites.length)
})
