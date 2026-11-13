// Manual IndexNow submission, e.g. after a URL-wide change like a redirect fix.
//
//   pnpm indexnow:submit --sitemap            every URL in the live sitemap
//   pnpm indexnow:submit <url> [<url> ...]    specific URLs
//
// Add --dry-run to print the URLs without submitting.

const { SITE_URL, fetchSitemapUrls, submitUrls } = require("./lib")

const main = async () => {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const urls = args.includes("--sitemap")
    ? await fetchSitemapUrls()
    : args.filter((arg) => !arg.startsWith("--"))

  const foreign = urls.filter((url) => !url.startsWith(`${SITE_URL}/`))
  if (foreign.length) throw new Error(`Not ${SITE_URL} URLs: ${foreign}`)
  if (!urls.length) throw new Error("No URLs given; pass URLs or --sitemap")

  if (dryRun) {
    console.log(urls.join("\n"))
    return console.log(`${urls.length} URLs (dry run, nothing submitted)`)
  }

  const statuses = await submitUrls(urls)
  if (!statuses.every((status) => status === 200 || status === 202)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
