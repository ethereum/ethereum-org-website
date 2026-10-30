import { readFileSync } from "fs"
import { join } from "path"
import { runInNewContext } from "vm"

import { ModuleKind, ScriptTarget, transpileModule } from "typescript"
import { expect, test } from "@playwright/test"

import type { FileContributor, GitHubContributorsData } from "@/lib/types"

import { getAppPageLastCommitDate } from "@/lib/utils/gh"

type Registry = Pick<
  typeof import("@/lib/i18n/translationRegistry"),
  "getAllPagesWithTranslations"
>

const sourcePath = join(process.cwd(), "src/lib/i18n/translationRegistry.ts")
const compiledRegistry = transpileModule(readFileSync(sourcePath, "utf8"), {
  compilerOptions: {
    module: ModuleKind.CommonJS,
    target: ScriptTarget.ES2022,
  },
  fileName: sourcePath,
}).outputText

const earlier = {
  login: "earlier",
  avatar_url: "https://example.com/earlier.png",
  html_url: "https://example.com/earlier",
  date: "2025-01-02T03:04:05Z",
} satisfies FileContributor

const later = {
  ...earlier,
  login: "later",
  date: "2026-07-08T09:10:11Z",
} satisfies FileContributor

const contributors = {
  content: {
    about: [later, earlier],
    "videos/example-video": [earlier],
  },
  appPages: {
    staking: [earlier],
    "developers/tools": [later],
    "apps/[application]": [later],
    "apps/categories/[catetgoryName]": [later],
  },
  generatedAt: "2026-10-16T00:00:00Z",
} satisfies GitHubContributorsData

function loadRegistry(
  contributorData: GitHubContributorsData | null = contributors
) {
  let contributorReads = 0

  // Keep Next cache, SVG assets, and external data outside this unit test.
  // The registry's real discovery orchestration and date lookups still run.
  const imports: Record<string, unknown> = {
    fs: { existsSync: () => true },
    path: { join },
    "@/lib/constants": {
      DEFAULT_LOCALE: "en",
      LOCALES_CODES: ["en", "es"],
    },
    "../utils/gh": { getAppPageLastCommitDate },
    "../utils/md": {
      getPostSlugs: async () => ["/about", "/about/", "/unknown"],
    },
    "../utils/staticPages": {
      getStaticPagePaths: () => ["/staking/", "/developers/tools/"],
    },
    "../utils/translations": {
      getPrimaryNamespaceForPath: () => null,
    },
    "../utils/url": {
      addSlashes: (slug: string) => `/${slug.replace(/^\/+|\/+$/g, "")}/`,
      slugify: (value: string) => value.toLowerCase().replaceAll(" ", "-"),
    },
    "../utils/videos": {
      getVideoSlugs: async () => ["example-video"],
    },
    "./translationStatus": {
      areNamespacesTranslated: async () => true,
    },
    "@/data/apps/categories": {
      appsCategories: { defi: { slug: "defi" } },
    },
    "@/lib/data": {
      getStaticGitHubContributors: async () => {
        contributorReads += 1
        return contributorData
      },
      getStaticAppsData: async () => ({
        defi: [{ name: "Example App" }, { name: "Scout Game" }],
      }),
      getStaticDeveloperToolsData: async () => ({}),
    },
    "@/lib/utils/developerToolsData": {
      normalizeDeveloperToolsData: () => ({
        taxonomy: {
          categories: { definitions: [{ id: "testing" }] },
        },
      }),
      withCategories: () => [{ id: "example-tool" }],
      getToolKey: (tool: { id: string }) => tool.id,
    },
    "@/lib/utils/walletData": {
      getAllWalletSlugs: () => [],
      WALLET_PERSONA_IDS: [],
    },
  }

  const registry = {} as Registry
  runInNewContext(
    compiledRegistry,
    {
      exports: registry,
      require: (specifier: string) => {
        if (!(specifier in imports)) {
          throw new Error(`Unmocked registry dependency: ${specifier}`)
        }
        return imports[specifier]
      },
    },
    { filename: sourcePath }
  )

  return {
    registry,
    getContributorReads: () => contributorReads,
  }
}

test("markdown pages receive ISO lastModified using normalized slugs", async () => {
  const { registry, getContributorReads } = loadRegistry()
  const pages = await registry.getAllPagesWithTranslations()

  for (const slug of ["/about", "/about/"]) {
    expect(pages.find((page) => page.slug === slug)).toMatchObject({
      slug,
      translatedLocales: ["en", "es"],
      lastModified: "2026-07-08T09:10:11.000Z",
    })
  }

  expect(getContributorReads()).toBe(1)
})

test("video and static pages retain their own contributor dates", async () => {
  const { registry } = loadRegistry()
  const pages = await registry.getAllPagesWithTranslations()

  for (const slug of ["videos/example-video", "/staking/"]) {
    expect(pages.find((page) => page.slug === slug)).toMatchObject({
      lastModified: "2025-01-02T03:04:05.000Z",
    })
  }

  expect(
    pages.find((page) => page.slug === "/developers/tools/")
  ).toMatchObject({
    lastModified: "2026-07-08T09:10:11.000Z",
  })
})

test("dynamic pages never inherit template or listing modification dates", async () => {
  const { registry } = loadRegistry()
  const pages = await registry.getAllPagesWithTranslations()

  for (const slug of [
    "/apps/example-app/",
    "/apps/categories/defi/",
    "/developers/tools/categories/testing/",
    "/developers/tools/example-tool/",
  ]) {
    const page = pages.find((entry) => entry.slug === slug)
    expect(page, slug).toBeDefined()
    expect(page?.lastModified, slug).toBeUndefined()
  }

  expect(pages.some((page) => page.slug === "/apps/scout-game/")).toBe(false)
})

test("missing page history leaves lastModified absent", async () => {
  const { registry } = loadRegistry()
  const pages = await registry.getAllPagesWithTranslations()
  const unknownPage = pages.find((page) => page.slug === "/unknown")

  expect(unknownPage).toBeDefined()
  expect(unknownPage?.lastModified).toBeUndefined()
})

test("missing contributor data leaves all dates absent", async () => {
  const { registry, getContributorReads } = loadRegistry(null)
  const pages = await registry.getAllPagesWithTranslations()

  expect(pages.length).toBeGreaterThan(0)
  expect(pages.every((page) => page.lastModified === undefined)).toBe(true)
  expect(getContributorReads()).toBe(1)
})
