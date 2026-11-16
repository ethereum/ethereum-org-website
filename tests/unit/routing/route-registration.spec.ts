// Routes are discovered from the filesystem, so a new page has to be wired
// into the registries below or it silently ships English-only, drops out of
// the sitemap, or renders empty after an ISR regeneration on Netlify.

import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

import { discoverStaticPages } from "@/lib/utils/staticPages"
import { getPrimaryNamespaceForPath } from "@/lib/utils/translations"

const REPO_ROOT = path.resolve(__dirname, "../../..")
const APP_DIR = "app"
const LOCALE_DIR = "app/[locale]"

const read = (rel: string) => readFileSync(path.join(REPO_ROOT, rel), "utf8")

/** Every route dir under app/[locale] (relative to app/) that holds page.tsx or route.ts. */
const findRoutes = (dir = LOCALE_DIR): string[] => {
  const out: string[] = []
  for (const entry of readdirSync(path.join(REPO_ROOT, dir), {
    withFileTypes: true,
  })) {
    if (entry.isDirectory()) {
      if (/^[@_]|^\(\.+\)/.test(entry.name)) continue
      out.push(...findRoutes(`${dir}/${entry.name}`))
    } else if (/^(page\.tsx|route\.ts)$/.test(entry.name)) {
      out.push(path.relative(APP_DIR, dir))
    }
  }
  return [...new Set(out)]
}

const routes = findRoutes()
const urlOf = (route: string) =>
  `/${route
    .split("/")
    .slice(1)
    .filter((s) => !s.startsWith("("))
    .join("/")}`

test("routes are discovered", () => {
  expect(routes.length).toBeGreaterThan(50)
})

test.describe("dynamic routes are in getDynamicIntlPagePaths()", () => {
  // Slugs for these come from markdown via getPostSlugs()/getVideoSlugs(),
  // or the route is never meant to be indexed.
  const EXEMPT = [
    "/[...slug]",
    "/stories/[slug]",
    "/videos/[slug]",
    "/ab-code/[code]",
  ]

  const registry = read("src/lib/i18n/translationRegistry.ts")
  const dynamic = routes
    .filter(
      (r) =>
        urlOf(r).includes("[") &&
        existsSync(path.join(REPO_ROOT, APP_DIR, r, "page.tsx"))
    )
    .map(urlOf)
    .filter((url) => !EXEMPT.some((e) => url.startsWith(e)))

  test("dynamic routes are discovered", () => {
    expect(dynamic.length).toBeGreaterThan(4)
  })

  for (const url of dynamic) {
    const prefix = url.slice(0, url.indexOf("["))
    test(url, () => {
      expect(
        registry,
        `register \`${prefix}\${...}/\` in getDynamicIntlPagePaths()`
      ).toContain(`\`${prefix}\${`)
    })
  }
})

test.describe("UI pages map to a primary namespace", () => {
  const ENGLISH_ONLY = [
    "/contributing/translation-program/translatathon/leaderboard/",
  ]

  const uiPages = discoverStaticPages()
    .map((p) => (p === "/" ? "/" : `${p}/`))
    .filter(
      (p) => !existsSync(path.join(REPO_ROOT, "public/content", p, "index.md"))
    )
    .filter((p) => !ENGLISH_ONLY.includes(p))

  test("UI pages are discovered", () => {
    expect(uiPages.length).toBeGreaterThan(50)
  })

  for (const page of uiPages) {
    test(page, () => {
      const ns = getPrimaryNamespaceForPath(page)
      expect(ns, `map ${page} in translations.ts`).toBeTruthy()
      expect(existsSync(path.join(REPO_ROOT, `src/intl/en/${ns}.json`))).toBe(
        true
      )
    })
  }
})

test.describe("ISR routes reading public/content are traced", () => {
  // Reader -> the public/content collection it needs. `null` = per-page
  // markdown, which only a route-specific include can cover.
  const READERS: Record<string, string | null> = {
    getStoriesData: "stories",
    getStorySlugs: "stories",
    getBlogPostsData: "latest",
    getLatestArticles: "latest",
    getTutorialsData: "developers/tutorials",
    getPostSlugs: null,
    getPageData: null,
    importMd: null,
    getVideoData: null,
    getVideos: null,
    getVideoSlugs: null,
  }
  // Routes that read public/content but are prerendered once, never regenerated.
  const STATIC: string[] = []

  // next.config.js pulls in Sentry and next-intl, so read the literal instead.
  const config = read("next.config.js")
  const start = config.indexOf(
    "{",
    config.indexOf("outputFileTracingIncludes:")
  )
  let end = start
  for (let depth = 0; ; end++) {
    if (config[end] === "{") depth++
    if (config[end] === "}" && --depth === 0) break
  }
  const includes: Record<string, string[]> = new Function(
    `return ${config.slice(start, end + 1)}`
  )()

  // A route's own files plus its private `_folders`.
  const routeSource = (route: string): string => {
    const dir = path.join(REPO_ROOT, APP_DIR, route)
    return readdirSync(dir, { withFileTypes: true, recursive: true })
      .filter(
        (e) =>
          e.isFile() &&
          /\.tsx?$/.test(e.name) &&
          (e.parentPath === dir ||
            path.relative(dir, e.parentPath).startsWith("_"))
      )
      .map((e) => readFileSync(path.join(e.parentPath, e.name), "utf8"))
      .join("\n")
  }

  const isr = routes
    .map((route) => {
      const src = routeSource(route)
      const readers = Object.keys(READERS).filter((r) =>
        new RegExp(`\\b${r}\\b`).test(src)
      )
      return { route, readers, revalidates: src.includes('"@/lib/data"') }
    })
    .filter((r) => r.readers.length && r.revalidates)
    .filter((r) => !STATIC.includes(r.route))

  test("ISR content routes are discovered", () => {
    expect(isr.length).toBeGreaterThan(1)
  })

  for (const { route, readers } of isr) {
    test(route, () => {
      const keys = Object.keys(includes).filter((key) => {
        const k = key.replaceAll("\\", "")
        return route === k || route.startsWith(`${k}/`)
      })
      for (const reader of readers) {
        const collection = READERS[reader]
        const traced = keys
          .filter((k) => collection || k.replaceAll("\\", "") !== "[locale]")
          .some((k) =>
            includes[k].some(
              (glob) => !collection || glob.includes(`/${collection}/`)
            )
          )
        expect(
          traced,
          `${route} calls ${reader}; add public/content/${collection ?? "…"} to outputFileTracingIncludes`
        ).toBe(true)
      }
    })
  }
})
