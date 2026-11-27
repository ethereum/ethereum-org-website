import childProcess from "child_process"
import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { getPostSlugs } from "@/lib/utils/md"
import { getFullUrl } from "@/lib/utils/url"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import plugin from "../../../netlify/plugins/indexnow/index.js"
import {
  changedPageUrls,
  fileToUrl,
  INDEXNOW_KEY,
  MAX_URLS_PER_REQUEST,
  parseLocs,
  SITE_URL,
  submitUrls,
  urlLocale,
} from "../../../netlify/plugins/indexnow/lib.js"

import { importMd } from "@/lib/md/import"

const CONTENT_ROOT = path.join(process.cwd(), "public/content")

test("the key file at the site root holds exactly the key", () => {
  // Engines reject every submission if /<key>.txt is missing or differs
  const file = path.join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`)
  expect(fs.readFileSync(file, "utf8")).toBe(INDEXNOW_KEY)
  expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{8,128}$/)
})

test("every markdown page maps to the URL the site renders it at", async () => {
  const slugs = await getPostSlugs("/")
  const pages = LOCALES_CODES.flatMap((locale) => {
    const dir =
      locale === DEFAULT_LOCALE
        ? CONTENT_ROOT
        : path.join(CONTENT_ROOT, "translations", locale)
    return slugs
      .map((slug) => ({ locale, slug, abs: path.join(dir, slug, "index.md") }))
      .filter(({ abs }) => fs.existsSync(abs))
  })
  expect(pages.length).toBeGreaterThan(slugs.length)

  // Compared in bulk: one expect per page takes longer than the test timeout
  type Row = { file: string; read: boolean; url: string | null }
  const actual: Row[] = []
  const expected: Row[] = []
  for (const { locale, slug, abs } of pages) {
    const file = path.relative(process.cwd(), abs).split(path.sep).join("/")
    // The page route reads this file for (locale, slug)...
    const { markdown, isTranslated } = await importMd(locale, slug)
    const read = isTranslated && markdown === fs.readFileSync(abs, "utf8")
    actual.push({ file, read, url: fileToUrl(file) })
    // ...and the site's URL helper places it here (on the production origin:
    // the site's SITE_URL follows NEXT_PUBLIC_SITE_URL, the plugin's doesn't)
    const { pathname } = new URL(getFullUrl(locale, slug))
    expected.push({ file, read: true, url: new URL(pathname, SITE_URL).href })
  }
  expect(actual).toEqual(expected)
})

test("files that are not live pages map to nothing", () => {
  expect(fileToUrl("public/content/eth/image.png")).toBeNull()
  expect(fileToUrl("public/content/translations/nl/eth/index.md")).toBeNull()
  expect(fileToUrl("src/intl/en/common.json")).toBeNull()
  expect(fileToUrl("app/[locale]/page.tsx")).toBeNull()
})

test("removed pages are reported separately from changed ones", () => {
  const diff = [
    "M\tpublic/content/eth/index.md",
    "A\tpublic/content/translations/de/eth/index.md",
    "D\tpublic/content/old-page/index.md",
    "M\tpublic/content/eth/index.md",
    "M\tsrc/intl/en/common.json",
    "",
  ].join("\n")
  expect(changedPageUrls(diff)).toEqual({
    changed: [
      fileToUrl("public/content/eth/index.md"),
      fileToUrl("public/content/translations/de/eth/index.md"),
    ],
    removed: [fileToUrl("public/content/old-page/index.md")],
  })
})

test("sitemap locs are extracted and unescaped", () => {
  const xml =
    "<urlset><url><loc>https://ethereum.org/a/</loc></url>" +
    "<url><loc> https://ethereum.org/b/?x=1&amp;y=2 </loc></url></urlset>"
  expect(parseLocs(xml)).toEqual([
    "https://ethereum.org/a/",
    "https://ethereum.org/b/?x=1&y=2",
  ])
})

test("URLs resolve to their sitemap shard locale", () => {
  expect(urlLocale("https://ethereum.org/eth/")).toBe("en")
  expect(urlLocale("https://ethereum.org/de/eth/")).toBe("de")
  expect(urlLocale("https://ethereum.org/")).toBe("en")
})

type Request = { url: string; init?: RequestInit }

/** Replaces fetch: serves sitemap XML and answers IndexNow POSTs with status */
const stubFetch = (
  shards: Record<string, string[]>,
  status = 200
): Request[] => {
  const requests: Request[] = []
  const urlset = (locs: string[]) =>
    locs.map((loc) => `<url><loc>${loc}</loc></url>`).join("")
  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input)
    requests.push({ url, init })
    if (init?.method === "POST") return new Response(null, { status })
    if (url === `${SITE_URL}/sitemap.xml`) {
      const locs = Object.keys(shards).map(
        (name) => `${SITE_URL}/sitemaps/sitemap/${name}.xml`
      )
      return new Response(`<sitemapindex>${urlset(locs)}</sitemapindex>`)
    }
    const name = url.match(/\/([^/]+)\.xml$/)?.[1] ?? ""
    if (!(name in shards)) return new Response(null, { status: 404 })
    return new Response(`<urlset>${urlset(shards[name])}</urlset>`)
  }) as typeof fetch
  return requests
}

const posts = (requests: Request[]) =>
  requests
    .filter(({ init }) => init?.method === "POST")
    .map(({ init }) => JSON.parse(String(init?.body)))

const realFetch = globalThis.fetch
const realExecFileSync = childProcess.execFileSync
const realEnv = { ...process.env }
test.afterEach(() => {
  globalThis.fetch = realFetch
  childProcess.execFileSync = realExecFileSync
  process.env = { ...realEnv }
})

test("submitUrls POSTs batches within the per-request limit", async () => {
  const requests = stubFetch({}, 202)
  const urls = Array.from(
    { length: MAX_URLS_PER_REQUEST + 7_087 },
    (_, i) => `${SITE_URL}/page-${i}/`
  )
  expect(await submitUrls(urls, { log: () => {} })).toEqual([202, 202])

  const bodies = posts(requests)
  expect(bodies.map((body) => body.urlList.length)).toEqual([
    MAX_URLS_PER_REQUEST,
    7_087,
  ])
  expect(bodies.flatMap((body) => body.urlList)).toEqual(urls)
  for (const body of bodies) {
    expect(body).toMatchObject({ host: "ethereum.org", key: INDEXNOW_KEY })
  }
})

/** Runs onSuccess as a production build of ethereum.org with a stubbed diff */
const runOnSuccess = async (diff: string, env: Record<string, string> = {}) => {
  Object.assign(process.env, {
    CONTEXT: "production",
    URL: SITE_URL,
    CACHED_COMMIT_REF: "aaa",
    COMMIT_REF: "bbb",
    ...env,
  })
  let gitCalls = 0
  childProcess.execFileSync = (() => {
    gitCalls++
    return diff
  }) as unknown as typeof childProcess.execFileSync

  const failures: string[] = []
  const shown: string[] = []
  const utils = {
    build: {
      failPlugin: (message: string) => {
        failures.push(message)
      },
    },
    status: {
      show: ({ summary }: { summary: string }) => {
        shown.push(summary)
      },
    },
  }
  const log = console.log
  console.log = () => {}
  try {
    await plugin.onSuccess({ utils })
  } finally {
    console.log = log
  }
  return { failures, shown, gitCalls }
}

const ETH = "public/content/eth/index.md"
const DE_ETH = "public/content/translations/de/eth/index.md"
const UNLISTED = "public/content/unlisted/index.md"
const OLD = "public/content/old-page/index.md"

const urlOf = (file: string) => {
  const url = fileToUrl(file)
  if (!url) throw new Error(`${file} maps to no URL`)
  return url
}

test("onSuccess skips previews, forks and builds with nothing to diff", async () => {
  const skips: Record<string, string>[] = [
    { CONTEXT: "deploy-preview" },
    { URL: "https://some-fork.netlify.app" },
    { CACHED_COMMIT_REF: "" },
    { CACHED_COMMIT_REF: "bbb" },
  ]
  for (const env of skips) {
    const requests = stubFetch({})
    const result = await runOnSuccess(`M\t${ETH}`, env)
    expect(result, JSON.stringify(env)).toEqual({
      failures: [],
      shown: [],
      gitCalls: 0,
    })
    expect(requests).toEqual([])
  }
})

test("onSuccess submits changed sitemap pages and removed pages", async () => {
  const requests = stubFetch({
    en: [urlOf(ETH)],
    de: [urlOf(DE_ETH)],
    fr: [],
  })
  const diff = [`M\t${ETH}`, `A\t${DE_ETH}`, `M\t${UNLISTED}`, `D\t${OLD}`]
  const result = await runOnSuccess(diff.join("\n"))

  expect(result.failures).toEqual([])
  expect(result.shown).toEqual(["Submitted 3 URLs (HTTP 200)"])
  expect(posts(requests).map((body) => body.urlList)).toEqual([
    [urlOf(ETH), urlOf(DE_ETH), urlOf(OLD)],
  ])
  // Only the shards of changed locales are fetched
  expect(requests.some(({ url }) => url.endsWith("/fr.xml"))).toBe(false)
})

test("onSuccess flags the plugin when no changed page is in the sitemap", async () => {
  // e.g. the sitemap drops trailing slashes
  const requests = stubFetch({ en: [urlOf(ETH).replace(/\/$/, "")] })
  const result = await runOnSuccess(`M\t${ETH}`)

  expect(posts(requests)).toEqual([])
  expect(result.failures).toEqual([
    expect.stringContaining("none of 1 changed pages is in the sitemap"),
  ])
})

test("onSuccess flags the plugin when a locale's shard is missing", async () => {
  // e.g. shards renamed from de.xml to de-0.xml
  const requests = stubFetch({ en: [urlOf(ETH)], "de-0": [] })
  const result = await runOnSuccess([`M\t${ETH}`, `M\t${DE_ETH}`].join("\n"))

  expect(posts(requests)).toEqual([])
  expect(result.failures).toEqual([
    expect.stringContaining("sitemap index has no shard for de"),
  ])
})

test("onSuccess flags the plugin when IndexNow rejects the submission", async () => {
  stubFetch({ en: [urlOf(ETH)] }, 403)
  const result = await runOnSuccess(`M\t${ETH}`)

  expect(result.shown).toEqual([])
  expect(result.failures).toEqual(["IndexNow: rejected 1 URLs (HTTP 403)"])
})
