#!/usr/bin/env node
/*
 * Postinstall: walk public/content/ and emit `.source/manifest.json` with
 * per-locale slug → frontmatter maps.
 *
 * Hybrid PoC architecture: fumadocs (via this manifest) owns build-time
 * routing + frontmatter; legacy `importMd` + `next-mdx-remote` owns
 * body compilation at request time. The manifest is the small artifact
 * that lets the catch-all route enumerate pages and look up frontmatter
 * without an fs walk. The .md files themselves stay in public/content/
 * and ship with the function bundle (see netlify.toml [functions]
 * included_files) so runtime body reads + ISR revalidation work.
 *
 * Honours NEXT_PUBLIC_BUILD_LOCALES (comma-separated). Unset = all
 * locales discovered under public/content/translations/.
 */

import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

const REPO_ROOT = process.cwd()
const CONTENT_DIR = path.join(REPO_ROOT, "public/content")
const TRANSLATIONS_DIR = path.join(CONTENT_DIR, "translations")
const SOURCE_DIR = path.join(REPO_ROOT, ".source")
const MANIFEST_PATH = path.join(SOURCE_DIR, "manifest.json")

const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES?.split(",")
const isLocaleEnabled = (locale) =>
  !BUILD_LOCALES || BUILD_LOCALES.includes(locale)

// Walk a directory tree for `index.md` / `index.mdx` files. The slug is
// the directory path of each match, relative to `rootDir`, with `/`
// separators. The `translations/` subtree under the EN root is excluded.
function collectIndexFiles(rootDir, excludeRel) {
  const out = []
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      const rel = path.relative(rootDir, full)
      if (excludeRel && (rel === excludeRel || rel.startsWith(excludeRel + path.sep))) {
        continue
      }
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name === "index.md" || entry.name === "index.mdx") {
        const relDir = path.relative(rootDir, dir)
        if (!relDir) continue // skip a root-level index file
        out.push({
          slug: relDir.split(path.sep).join("/"),
          filePath: full,
        })
      }
    }
  }
  walk(rootDir)
  return out
}

function buildLocale(localeRoot, skipped) {
  const pages = {}
  for (const { slug, filePath } of collectIndexFiles(localeRoot)) {
    const raw = fs.readFileSync(filePath, "utf-8")
    let data
    try {
      ;({ data } = matter(raw))
    } catch (err) {
      // Malformed YAML frontmatter (see PROGRESS: te/videos/ai-agents-
      // interview-luna duplicate `title:`). Skip the page so the manifest
      // builds; log so a translator can fix upstream.
      skipped.push({ filePath, error: err.message?.split("\n")[0] })
      continue
    }
    pages[slug] = data
  }
  return pages
}

const manifest = {}
const skipped = []

if (isLocaleEnabled("en")) {
  manifest.en = buildLocale(CONTENT_DIR, skipped)
  // The walker doesn't exclude the `translations` subtree; filter it out
  // of the EN map.
  manifest.en = Object.fromEntries(
    Object.entries(manifest.en).filter(
      ([slug]) => !slug.startsWith("translations/")
    )
  )
}

if (fs.existsSync(TRANSLATIONS_DIR)) {
  for (const entry of fs.readdirSync(TRANSLATIONS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (!isLocaleEnabled(entry.name)) continue
    manifest[entry.name] = buildLocale(
      path.join(TRANSLATIONS_DIR, entry.name),
      skipped
    )
  }
}

fs.mkdirSync(SOURCE_DIR, { recursive: true })
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest))

let pageCount = 0
for (const locale of Object.keys(manifest)) {
  pageCount += Object.keys(manifest[locale]).length
}
console.log(
  `[manifest] wrote ${pageCount} pages across ${Object.keys(manifest).length} locales → ${path.relative(REPO_ROOT, MANIFEST_PATH)}`
)
if (skipped.length > 0) {
  console.warn(`[manifest] ${skipped.length} files skipped due to malformed frontmatter:`)
  for (const { filePath, error } of skipped) {
    console.warn(`  - ${path.relative(REPO_ROOT, filePath)}: ${error}`)
  }
}
