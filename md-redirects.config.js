// Agent-facing markdown redirects. /<page>.md 307s to the static source file
// the page itself renders, mirroring importMd()'s slug -> public/content
// mapping. Redirects rather than rewrites: on Netlify's Next runtime, rewrites
// resolve inside the server function, which cannot reach public/ assets (they
// live only on the CDN) -- the client's follow-up request is served directly.
//
// Order matters -- Next takes the first match. Pages with interactive diagrams
// resolve to their agent copy (AGENT_CONTENT_DIR in src/lib/constants.ts,
// written before the build by src/scripts/agent-markdown.ts), which spells each
// figure out as text. Other non-default locales resolve into
// public/content/translations/<locale>/, and everything else resolves to the
// English content root.

const fs = require("fs")
const path = require("path")

const i18nConfigJson = require("./i18n.config.json")

const AGENT_DIR = "agent-md"

// Mirrors DEFAULT_LOCALE in src/lib/constants.ts, which this CJS config cannot
// import. English content lives at the content root, not under translations/.
const DEFAULT_LOCALE = "en"

const NON_DEFAULT_ALTS = i18nConfigJson
  .map(({ code }) => code)
  .filter((code) => code !== DEFAULT_LOCALE)
  .join("|") // e.g. "ar|bn|cs|..."

/** Agent copies on disk, as content paths ("developers/docs/gas"). */
const listAgentPages = () => {
  const root = path.join(__dirname, "public", AGENT_DIR)
  if (!fs.existsSync(root)) return []
  return fs
    .readdirSync(root, { recursive: true, encoding: "utf8" })
    .filter((file) => path.basename(file) === "index.md")
    .map((file) => path.dirname(file).split(path.sep).join("/"))
}

const agentRedirects = (page) => {
  const destination = `/${AGENT_DIR}/${page}/index.md`
  const [, locale, slug] = page.match(/^translations\/([^/]+)\/(.+)$/) ?? []
  const sources = locale
    ? [`/${locale}/${slug}.md`]
    : [`/${page}.md`, `/${DEFAULT_LOCALE}/${page}.md`]
  return sources.map((source) => ({ source, destination, permanent: false }))
}

/**
 * @param {string[]} [agentPages] content paths with an agent copy; defaults to
 *   the copies on disk
 * @returns { { source: string, destination: string, permanent: boolean }[] }
 */
module.exports = (agentPages = listAgentPages()) => [
  ...agentPages.flatMap(agentRedirects),
  {
    source: `/:locale(${NON_DEFAULT_ALTS})/:path*.md`,
    destination: "/content/translations/:locale/:path*/index.md",
    permanent: false,
  },
  {
    source: `/${DEFAULT_LOCALE}/:path*.md`,
    destination: "/content/:path*/index.md",
    permanent: false,
  },
  {
    // Redirects run before public files in Next, so the first segment must
    // exclude content/ and the agent copies, or requests for the real files
    // would redirect in a loop. :path* is optional, so this also covers
    // single-segment pages.
    source: `/:first((?!content/|${AGENT_DIR}/)[^/]+)/:path*.md`,
    destination: "/content/:first/:path*/index.md",
    permanent: false,
  },
]
