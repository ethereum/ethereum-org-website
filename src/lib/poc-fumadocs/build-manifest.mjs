#!/usr/bin/env node
/*
 * Hybrid content-layer manifest builder.
 *
 * Walks public/content/, parses YAML frontmatter, validates it against a
 * minimal schema, and emits:
 *   - `.source/manifest.json`  → locale → slug → frontmatter
 *   - `.source/types.ts`       → generated slug literal unions + manifest
 *                                shape so consumers get autocomplete and
 *                                compile-time route enumeration
 *
 * MDX bodies stay on disk and are compiled at request time by the legacy
 * next-mdx-remote pipeline (see src/lib/md/compile.ts). The function bundle
 * ships the raw .md files (see netlify.toml [functions].included_files +
 * next.config.js outputFileTracingIncludes) so runtime body reads and ISR
 * revalidation both work.
 *
 * Environment:
 *   NEXT_PUBLIC_BUILD_LOCALES   comma-separated locale codes; unset = all
 *   MANIFEST_STRICT=1           fail on any invalid frontmatter (CI mode)
 */

import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

const REPO_ROOT = process.cwd()
const CONTENT_DIR = path.join(REPO_ROOT, "public/content")
const TRANSLATIONS_DIR = path.join(CONTENT_DIR, "translations")
const SOURCE_DIR = path.join(REPO_ROOT, ".source")
const MANIFEST_PATH = path.join(SOURCE_DIR, "manifest.json")
const TYPES_PATH = path.join(SOURCE_DIR, "types.ts")

const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES?.split(",")
const STRICT = process.env.MANIFEST_STRICT === "1"
const isLocaleEnabled = (locale) =>
  !BUILD_LOCALES || BUILD_LOCALES.includes(locale)

// Minimal frontmatter validator. The Frontmatter type union in
// src/lib/interfaces.ts has many variants (video, tutorial, use-case, …);
// we only enforce SharedFrontmatter's required fields at the manifest seam.
// Per-variant validation happens later, at the consumption site, via the
// generated TypeScript types.
function validateFrontmatter(data) {
  // Only `title` is strictly required — many translated use-case pages
  // omit `description` (the page derives subtitle from summaryPoints
  // instead). Keep validation minimal so we don't drop pages the legacy
  // pipeline happily renders.
  const errors = []
  if (typeof data?.title !== "string" || data.title.length === 0) {
    errors.push("missing or non-string `title`")
  }
  if (
    data?.description != null &&
    typeof data.description !== "string"
  ) {
    errors.push("`description` must be a string when present")
  }
  if (data?.lang != null && typeof data.lang !== "string") {
    errors.push("`lang` must be a string when present")
  }
  return errors
}

function collectIndexFiles(rootDir, excludeRel) {
  const out = []
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      const rel = path.relative(rootDir, full)
      if (
        excludeRel &&
        (rel === excludeRel || rel.startsWith(excludeRel + path.sep))
      ) {
        continue
      }
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name === "index.md" || entry.name === "index.mdx") {
        const relDir = path.relative(rootDir, dir)
        if (!relDir) continue // skip root-level index file
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

function buildLocale(localeRoot, skipped, excludeRel) {
  const pages = {}
  for (const { slug, filePath } of collectIndexFiles(localeRoot, excludeRel)) {
    const raw = fs.readFileSync(filePath, "utf-8")
    let data
    try {
      ;({ data } = matter(raw))
    } catch (err) {
      // Malformed YAML (e.g. duplicate keys). Skip the page so the manifest
      // builds; log so a translator can fix upstream.
      skipped.push({
        filePath,
        reason: "parse",
        message: err.message?.split("\n")[0] ?? String(err),
      })
      continue
    }

    const errors = validateFrontmatter(data)
    if (errors.length > 0) {
      skipped.push({
        filePath,
        reason: "schema",
        message: errors.join("; "),
      })
      continue
    }
    pages[slug] = data
  }
  return pages
}

const manifest = {}
const skipped = []

if (isLocaleEnabled("en")) {
  manifest.en = buildLocale(CONTENT_DIR, skipped, "translations")
}

if (fs.existsSync(TRANSLATIONS_DIR)) {
  for (const entry of fs.readdirSync(TRANSLATIONS_DIR, {
    withFileTypes: true,
  })) {
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

// Generate `.source/types.ts` — a string-literal union of every slug found
// in the EN locale (the canonical set) plus the manifest's typed shape. The
// EN locale is the source of truth: translated pages are a subset of EN.
function generateTypes() {
  const enSlugs = Object.keys(manifest.en ?? {}).sort()
  const slugLiteral =
    enSlugs.length > 0
      ? enSlugs.map((s) => `  | ${JSON.stringify(s)}`).join("\n")
      : "  | never"

  const locales = Object.keys(manifest).sort()
  const localeLiteral =
    locales.length > 0
      ? locales.map((l) => `  | ${JSON.stringify(l)}`).join("\n")
      : "  | never"

  return `// AUTO-GENERATED by src/lib/poc-fumadocs/build-manifest.mjs.
// Do not edit by hand. Regenerated on every install / build.

import type { Frontmatter } from "@/lib/types"

export type ContentLocale =
${localeLiteral}

export type ContentSlug =
${slugLiteral}

export type ManifestFrontmatter = Frontmatter

export type Manifest = Partial<
  Record<ContentLocale, Record<string, ManifestFrontmatter>>
>
`
}

fs.writeFileSync(TYPES_PATH, generateTypes())

let pageCount = 0
for (const locale of Object.keys(manifest)) {
  pageCount += Object.keys(manifest[locale]).length
}
console.log(
  `[manifest] wrote ${pageCount} pages across ${Object.keys(manifest).length} locales → ${path.relative(REPO_ROOT, MANIFEST_PATH)}`
)
console.log(
  `[manifest] wrote types → ${path.relative(REPO_ROOT, TYPES_PATH)}`
)

const parseSkips = skipped.filter((s) => s.reason === "parse")
const schemaSkips = skipped.filter((s) => s.reason === "schema")

if (parseSkips.length > 0) {
  console.warn(
    `[manifest] ${parseSkips.length} files skipped due to malformed YAML:`
  )
  for (const { filePath, message } of parseSkips) {
    console.warn(`  - ${path.relative(REPO_ROOT, filePath)}: ${message}`)
  }
}

if (schemaSkips.length > 0) {
  console.warn(
    `[manifest] ${schemaSkips.length} files skipped due to invalid frontmatter:`
  )
  for (const { filePath, message } of schemaSkips) {
    console.warn(`  - ${path.relative(REPO_ROOT, filePath)}: ${message}`)
  }
}

if (STRICT && skipped.length > 0) {
  console.error(
    `[manifest] MANIFEST_STRICT=1 and ${skipped.length} files failed validation.`
  )
  process.exit(1)
}
