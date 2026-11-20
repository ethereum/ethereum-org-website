// Netlify build plugin: after a production deploy is live, tell IndexNow
// engines (Bing, Yandex, Naver, Seznam) which markdown pages changed.
// onSuccess runs once the deploy is published, so engines fetch new content.

const { execFileSync } = require("child_process")

const {
  SITE_URL,
  changedPageUrls,
  fetchSitemapUrls,
  submitUrls,
  urlLocale,
} = require("./lib")

module.exports = {
  async onSuccess({ utils }) {
    const { CONTEXT, URL, CACHED_COMMIT_REF, COMMIT_REF } = process.env
    const log = (message) => console.log(`[indexnow] ${message}`)

    if (CONTEXT !== "production") return log(`skipped (${CONTEXT})`)
    // Forks or other sites building this repo must not submit under our key
    if (URL !== SITE_URL) return log(`skipped (site URL ${URL})`)
    if (!CACHED_COMMIT_REF || CACHED_COMMIT_REF === COMMIT_REF) {
      return log("skipped (no previous build to diff against)")
    }

    // failPlugin flags the plugin in the deploy UI without failing the
    // (already live) deploy. It throws, so it's only called outside the try.
    let failure
    try {
      const nameStatus = execFileSync(
        "git",
        [
          "diff",
          "--name-status",
          "--no-renames",
          CACHED_COMMIT_REF,
          COMMIT_REF,
          "--",
          "public/content",
        ],
        { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
      )
      const { changed, removed } = changedPageUrls(nameStatus)

      // Only submit changed pages the sitemap lists, so unrouted or noindex
      // markdown never reaches the engines
      let live = []
      if (changed.length) {
        const locales = [...new Set(changed.map(urlLocale))]
        const sitemap = new Set(await fetchSitemapUrls(locales))
        live = changed.filter((url) => sitemap.has(url))
      }

      const urls = [...live, ...removed]
      if (!urls.length) return log("no changed pages")

      const statuses = await submitUrls(urls, { log })
      const summary = `${urls.length} URLs (HTTP ${statuses.join(", ")})`
      if (statuses.every((status) => status === 200 || status === 202)) {
        utils.status.show({
          title: "IndexNow",
          summary: `Submitted ${summary}`,
        })
      } else {
        // 403 = key file missing or mismatched
        failure = `IndexNow rejected ${summary}`
      }
    } catch (error) {
      failure = `IndexNow failed: ${error.message}`
    }
    if (failure) utils.build.failPlugin(failure)
  },
}
