// Agent-facing markdown rewrites. /<page>.md serves the same source file the
// page itself renders, mirroring importMd()'s slug -> public/content mapping.
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

/** @type { { source: string, destination: string }[] } */
module.exports = [
  {
    source: `/:locale(${NON_DEFAULT_ALTS})/:path*.md`,
    destination: "/content/translations/:locale/:path*/index.md",
  },
  {
    source: `/${DEFAULT_LOCALE}/:path*.md`,
    destination: "/content/:path*/index.md",
  },
  { source: "/:path*.md", destination: "/content/:path*/index.md" },
]
