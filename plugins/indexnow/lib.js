// IndexNow submission helpers shared by the Netlify build plugin and the CLI.
// Protocol: https://www.indexnow.org/documentation

const i18nConfig = require("../../i18n.config.json")

// Public by design: engines verify ownership by fetching /<key>.txt, which
// must contain exactly this value (public/fc6bce24ef26bd1222946b181a2d2197.txt).
const INDEXNOW_KEY = "fc6bce24ef26bd1222946b181a2d2197"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
const SITE_URL = "https://ethereum.org"
const DEFAULT_LOCALE = "en"
const MAX_URLS_PER_REQUEST = 10000

const LOCALES = new Set(i18nConfig.map(({ code }) => code))

const CONTENT_ROOT = "public/content/"
const TRANSLATIONS_ROOT = `${CONTENT_ROOT}translations/`

/**
 * Maps a changed repo file to the page URL it renders, or null. Only markdown
 * pages map 1:1 to URLs; React pages and JSON strings are left to recrawl.
 */
const fileToUrl = (file) => {
  if (!file.startsWith(CONTENT_ROOT) || !file.endsWith("/index.md")) return null

  let locale = DEFAULT_LOCALE
  let slug = file.slice(CONTENT_ROOT.length, -"index.md".length)

  if (file.startsWith(TRANSLATIONS_ROOT)) {
    const [code, ...rest] = file.slice(TRANSLATIONS_ROOT.length).split("/")
    if (!LOCALES.has(code) || code === DEFAULT_LOCALE) return null
    locale = code
    slug = rest.slice(0, -1).join("/") + "/"
  }

  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return `${SITE_URL}${prefix}/${slug === "/" ? "" : slug}`
}

/**
 * Parses `git diff --name-status --no-renames` output into page URLs. Removed
 * pages are returned separately: they are absent from the sitemap but still
 * worth submitting so engines notice the 404 or redirect.
 */
const changedPageUrls = (nameStatus) => {
  const changed = new Set()
  const removed = new Set()
  for (const line of nameStatus.split("\n")) {
    const [status, file] = line.split("\t")
    const url = file && fileToUrl(file)
    if (!url) continue
    ;(status === "D" ? removed : changed).add(url)
  }
  return { changed: [...changed], removed: [...removed] }
}

const parseLocs = (xml) =>
  [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(([, loc]) =>
    loc.replace(/&amp;/g, "&")
  )

const fetchText = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  return res.text()
}

/**
 * URLs in the live sitemap, read through the sitemap index. Pass locales to
 * fetch only their shards (each is ~2MB).
 */
const fetchSitemapUrls = async (locales) => {
  const shards = parseLocs(await fetchText(`${SITE_URL}/sitemap.xml`)).filter(
    (shard) => !locales || locales.some((l) => shard.endsWith(`/${l}.xml`))
  )
  const urls = await Promise.all(
    shards.map(async (shard) => parseLocs(await fetchText(shard)))
  )
  return urls.flat()
}

/** Locale code of a site URL; English is unprefixed */
const urlLocale = (url) => {
  const first = new URL(url).pathname.split("/")[1]
  return LOCALES.has(first) ? first : DEFAULT_LOCALE
}

const chunk = (items, size) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, (i + 1) * size)
  )

/**
 * POSTs URLs to IndexNow in batches. 200 and 202 both mean accepted (202:
 * key not yet verified). Returns the status of each batch.
 */
const submitUrls = async (urls, { log = console.log } = {}) => {
  const host = new URL(SITE_URL).host
  const statuses = []
  for (const urlList of chunk(urls, MAX_URLS_PER_REQUEST)) {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, urlList }),
    })
    log(`IndexNow: ${urlList.length} URLs -> ${res.status}`)
    statuses.push(res.status)
  }
  return statuses
}

module.exports = {
  INDEXNOW_KEY,
  MAX_URLS_PER_REQUEST,
  SITE_URL,
  changedPageUrls,
  chunk,
  fetchSitemapUrls,
  fileToUrl,
  parseLocs,
  submitUrls,
  urlLocale,
}
