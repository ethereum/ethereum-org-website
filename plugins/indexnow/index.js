// Netlify build plugin: after a production deploy is live, tell IndexNow
// engines (Bing, Yandex, Naver, Seznam) which markdown pages changed.
// onSuccess runs once the deploy is published, so engines fetch new content.

const { execFileSync } = require("child_process")

const {
  changedPageUrls,
  fetchSitemapUrls,
  submitUrls,
  urlLocale,
} = require("./lib")

module.exports = {
  async onSuccess({ utils }) {
    const { CONTEXT, CACHED_COMMIT_REF, COMMIT_REF } = process.env
    const log = (message) => console.log(`[indexnow] ${message}`)

    if (CONTEXT !== "production") return log(`skipped (${CONTEXT})`)
    if (!CACHED_COMMIT_REF || CACHED_COMMIT_REF === COMMIT_REF) {
      return log("skipped (no previous build to diff against)")
    }

    // Never let a submission problem surface as a failed deploy
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
      const ok = statuses.every((status) => status === 200 || status === 202)
      utils.status.show({
        title: "IndexNow",
        summary: `${ok ? "Submitted" : "Failed to submit"} ${urls.length} URLs (HTTP ${statuses.join(", ")})`,
      })
    } catch (error) {
      log(`failed: ${error.message}`)
    }
  },
}
