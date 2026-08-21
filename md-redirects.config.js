// Agent-facing markdown redirects. /<page>.md 307s to the static source file
// the page itself renders, mirroring importMd()'s slug -> public/content
// mapping. Redirects rather than rewrites: on Netlify's Next runtime, rewrites
// resolve inside the server function, which cannot reach public/ assets (they
// live only on the CDN) -- the client's follow-up request is served directly.
//
// Order matters -- Next takes the first match. Non-default locales resolve into
// public/content/translations/<locale>/, and everything else resolves to the
// English content root.

const i18nConfigJson = require("./i18n.config.json")

// Mirrors DEFAULT_LOCALE in src/lib/constants.ts, which this CJS config cannot
// import. English content lives at the content root, not under translations/.
const DEFAULT_LOCALE = "en"

const NON_DEFAULT_ALTS = i18nConfigJson
  .map(({ code }) => code)
  .filter((code) => code !== DEFAULT_LOCALE)
  .join("|") // e.g. "ar|bn|cs|..."

/** @type { { source: string, destination: string, permanent: boolean }[] } */
module.exports = [
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
    // exclude content/ or requests for the real files would redirect in a loop.
    // :path* is optional, so this also covers single-segment pages.
    source: "/:first((?!content/)[^/]+)/:path*.md",
    destination: "/content/:first/:path*/index.md",
    permanent: false,
  },
]
