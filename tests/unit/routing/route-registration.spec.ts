// A new route must be registered below or it ships English-only, leaves the
// sitemap, or renders empty after an ISR regeneration on Netlify.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { expect, test } from "@playwright/test"

import { discoverStaticPages } from "@/lib/utils/staticPages"
import {
  EXACT_PATH_NAMESPACE_MAP,
  getPrimaryNamespaceForPath,
  PREFIX_PATH_NAMESPACE_MAP,
} from "@/lib/utils/translations"

const REPO_ROOT = path.resolve(__dirname, "../../..")
const APP_DIR = "app"
const LOCALE_DIR = "app/[locale]"

const read = (rel: string) => readFileSync(path.join(REPO_ROOT, rel), "utf8")
const stripComments = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\/|(^|[^:])\/\/.*$/gm, "$1")

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
  // Slugs come from markdown via getPostSlugs()/getVideoSlugs(), or never indexed.
  const EXEMPT = [
    "/[...slug]",
    "/stories/[slug]",
    "/videos/[slug]",
    "/ab-code/[code]",
  ]

  const registry = stripComments(read("src/lib/i18n/translationRegistry.ts"))
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

test.describe("UI pages map to their own namespace", () => {
  const ENGLISH_ONLY = [
    "/contributing/translation-program/translatathon/leaderboard/",
  ]
  // Prefixes whose subpages intentionally share the section namespace.
  const SHARED_PREFIXES = ["/community/events/"]

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
      const ownEntry =
        page in EXACT_PATH_NAMESPACE_MAP ||
        PREFIX_PATH_NAMESPACE_MAP.some(([prefix]) => prefix === page) ||
        SHARED_PREFIXES.some((prefix) => page.startsWith(prefix))
      expect(ownEntry, `map ${page} in translations.ts`).toBe(true)
      const ns = getPrimaryNamespaceForPath(page)
      expect(existsSync(path.join(REPO_ROOT, `src/intl/en/${ns}.json`))).toBe(
        true
      )
    })
  }
})

test.describe("routes rendered at runtime that read public/content are traced", () => {
  // Reader -> the public/content collection it needs. `null` = per-page
  // markdown, which only a route-specific include can cover.
  const READERS: Record<string, string | null> = {
    getStoriesData: "stories",
    getStorySlugs: "stories",
    getBlogPostsData: "latest",
    getLatestArticles: "latest",
    getTutorialsData: "developers/tutorials",
    getVideoData: "videos",
    getVideos: "videos",
    getVideoSlugs: "videos",
    getPostSlugs: null,
    getPageData: null,
    importMd: null,
  }
  const EXEMPT = [
    // Renders every markdown page; tracing all of public/content is out of budget.
    "[locale]/[...slug]",
    // Known slugs are prerendered; on-demand misses 404 via getVideoData's catch.
    "[locale]/videos/[slug]",
  ]
  // Only reached from the force-static sitemap.
  const BUILD_ONLY = path.join(REPO_ROOT, "src/lib/i18n/translationRegistry.ts")

  const config = createRequire(__filename)(
    path.join(REPO_ROOT, "next.config.js")
  )("phase-production-build")
  const includes: Record<string, string[]> = config.outputFileTracingIncludes

  const revalidatingGetters = [
    ...read("src/lib/data/index.ts").matchAll(
      /export const (\w+) = createCachedGetter\([^)]*,\s*(\w+)\s*\)/g
    ),
  ]
    .filter(([, , revalidate]) => revalidate !== "false")
    .map(([, name]) => name)

  const sources = new Map<string, string>()
  const source = (file: string) => {
    if (!sources.has(file))
      sources.set(file, stripComments(readFileSync(file, "utf8")))
    return sources.get(file)!
  }

  const resolveImport = (from: string, spec: string) => {
    const base = spec.startsWith("@/")
      ? path.join(REPO_ROOT, "src", spec.slice(2))
      : spec.startsWith(".")
        ? path.resolve(path.dirname(from), spec)
        : null
    if (!base) return
    return ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]
      .map((ext) => base + ext)
      .find((f) => existsSync(f) && statSync(f).isFile())
  }

  /** The route's own files, its private `_folders`, and everything they import. */
  const routeModules = (route: string): string[] => {
    const dir = path.join(REPO_ROOT, APP_DIR, route)
    const queue = readdirSync(dir, { withFileTypes: true, recursive: true })
      .filter(
        (e) =>
          e.isFile() &&
          /\.tsx?$/.test(e.name) &&
          (e.parentPath === dir ||
            path.relative(dir, e.parentPath).startsWith("_"))
      )
      .map((e) => path.join(e.parentPath, e.name))
    const seen = new Set(queue)
    for (const file of queue) {
      for (const [, spec] of source(file).matchAll(
        /(?:from|import\()\s*["']([^"']+)["']/g
      )) {
        const dep = resolveImport(file, spec)
        if (dep && dep !== BUILD_ONLY && !seen.has(dep)) {
          seen.add(dep)
          queue.push(dep)
        }
      }
    }
    return queue
  }

  const segmentConfig = (route: string) =>
    ["page.tsx", "route.ts", "layout.tsx"]
      .map((f) => path.join(REPO_ROOT, APP_DIR, route, f))
      .filter(existsSync)
      .map(source)
      .join("\n")

  const calls = (src: string, name: string) =>
    new RegExp(`\\b${name}\\b`).test(src) &&
    !new RegExp(`(?:function|const)\\s+${name}\\b`).test(src)

  const runtime = routes
    .map((route) => {
      const modules = routeModules(route).map(source)
      const readers = Object.keys(READERS).filter((r) =>
        modules.some((src) => calls(src, r))
      )
      const config = segmentConfig(route)
      const revalidates =
        /export const revalidate = [1-9]/.test(config) ||
        modules.some(
          (src) =>
            src.includes('"@/lib/data"') &&
            revalidatingGetters.some((g) => calls(src, g))
        )
      const onDemand =
        urlOf(route).includes("[") &&
        !/export const dynamicParams = false/.test(config)
      return { route, readers, runtime: revalidates || onDemand }
    })
    .filter((r) => r.readers.length && r.runtime)
    .filter((r) => !EXEMPT.includes(r.route))

  test("runtime content routes are discovered", () => {
    expect(runtime.map((r) => r.route)).toEqual(
      expect.arrayContaining(["[locale]", "[locale]/stories/[slug]"])
    )
  })

  for (const { route, readers } of runtime) {
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
