import fs from "fs"
import { extname, join, relative, sep } from "path"

import matter from "gray-matter"

import i18nConfig from "../../../i18n.config.json"
import { CONTENT_DIR, DEFAULT_LOCALE } from "../../lib/constants"
import type {
  ContentManifest,
  ContentManifestEntry,
} from "../../lib/content/types"
import type { Layout } from "../../lib/types"
import { getLayoutFromSlug } from "../../lib/utils/layout"

import { validateFrontmatter, ValidationIssue } from "./validate"

const REPO_ROOT = process.cwd()
const CONTENT_ROOT = join(REPO_ROOT, CONTENT_DIR)
const TRANSLATIONS_ROOT = join(CONTENT_ROOT, "translations")
const OUTPUT_FILE = join(REPO_ROOT, "src/lib/content/manifest.generated.ts")

const ALL_LOCALES: string[] = i18nConfig.map(({ code }) => code)

const toPosix = (p: string) => p.split(sep).join("/")

/**
 * Walk a directory recursively and return relative slugs of every
 * <dir>/index.md it finds. Skips the `translations/` and `videos/`
 * folders (translations are walked separately; videos have their own
 * route).
 */
const walkSlugs = (root: string): string[] => {
  if (!fs.existsSync(root)) return []
  const slugs: string[] = []

  const recurse = (dir: string, rel: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const name = entry.name
      const full = join(dir, name)
      const next = rel ? `${rel}/${name}` : name

      if (entry.isDirectory()) {
        if (name === "translations" || name === "videos") continue
        recurse(full, next)
        continue
      }
      if (extname(name) !== ".md") continue
      // Only treat index.md as the page entry — sibling .md files in the
      // same folder are excerpts/partials, not standalone slugs.
      if (name !== "index.md") continue
      slugs.push(rel)
    }
  }

  recurse(root, "")
  return slugs.sort()
}

const readEntry = (
  bodyPath: string,
  slug: string,
  locale: string,
  isTranslated: boolean,
  issues: ValidationIssue[]
): ContentManifestEntry | null => {
  let raw: string
  try {
    raw = fs.readFileSync(bodyPath, "utf-8")
  } catch (err) {
    issues.push({
      bodyPath: toPosix(relative(REPO_ROOT, bodyPath)),
      locale,
      slug,
      field: "<file>",
      reason: `read failed: ${(err as Error).message}`,
      severity: "error",
    })
    return null
  }

  let parsed: matter.GrayMatterFile<string>
  try {
    parsed = matter(raw)
  } catch (err) {
    issues.push({
      bodyPath: toPosix(relative(REPO_ROOT, bodyPath)),
      locale,
      slug,
      field: "<frontmatter>",
      reason: `gray-matter failed: ${(err as Error).message}`,
      severity: "error",
    })
    return null
  }

  const data = parsed.data as Record<string, unknown>
  const layoutFromMd = data.template
  const layout: Layout =
    (typeof layoutFromMd === "string" ? (layoutFromMd as Layout) : undefined) ??
    (getLayoutFromSlug(slug) as Layout)

  const ctx = {
    bodyPath: toPosix(relative(REPO_ROOT, bodyPath)),
    locale,
    slug,
  }
  // Translations fall back to en at runtime, so demote validation errors
  // there to warnings; only en frontmatter is load-bearing.
  const localIssues: ValidationIssue[] = []
  const frontmatter = validateFrontmatter(data, layout, ctx, localIssues)
  for (const issue of localIssues) {
    issues.push(
      locale === DEFAULT_LOCALE ? issue : { ...issue, severity: "warning" }
    )
  }

  return {
    slug,
    locale,
    layout,
    frontmatter,
    bodyPath: ctx.bodyPath,
    isTranslated,
  }
}

const buildManifest = (): {
  manifest: ContentManifest
  allSlugs: string[]
  issues: ValidationIssue[]
} => {
  const issues: ValidationIssue[] = []
  const manifest: ContentManifest = {}

  const enSlugs = walkSlugs(CONTENT_ROOT)

  for (const slug of enSlugs) {
    const bodyPath = join(CONTENT_ROOT, slug, "index.md")
    const entry = readEntry(bodyPath, slug, DEFAULT_LOCALE, true, issues)
    if (entry) {
      manifest[slug] = { [DEFAULT_LOCALE]: entry }
    }
  }

  for (const locale of ALL_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const localeRoot = join(TRANSLATIONS_ROOT, locale)
    if (!fs.existsSync(localeRoot)) continue

    const translatedSlugs = walkSlugs(localeRoot)
    for (const slug of translatedSlugs) {
      if (!manifest[slug]) continue // orphan translation; skip
      const bodyPath = join(localeRoot, slug, "index.md")
      const entry = readEntry(bodyPath, slug, locale, true, issues)
      if (entry) {
        manifest[slug][locale] = entry
      }
    }
  }

  return { manifest, allSlugs: enSlugs, issues }
}

const writeManifestFile = (manifest: ContentManifest, allSlugs: string[]) => {
  const sortedManifest: ContentManifest = {}
  for (const slug of allSlugs) {
    const localeMap = manifest[slug]
    if (!localeMap) continue
    const sortedLocales: Record<string, ContentManifestEntry> = {}
    for (const locale of Object.keys(localeMap).sort()) {
      sortedLocales[locale] = localeMap[locale]
    }
    sortedManifest[slug] = sortedLocales
  }

  const body = `// @generated by src/scripts/build-content-manifest
// Do not edit by hand. Regenerate with \`pnpm build:content-manifest\`.
/* eslint-disable */
import type { ContentManifest } from "./types"

// Cast: the Frontmatter type is an intersection of every layout's shape,
// which no single page can satisfy. Runtime validation lives in the
// generator's validate.ts — what reaches this file has already been
// checked.
export const contentManifest = ${JSON.stringify(
    sortedManifest,
    null,
    2
  )} as unknown as ContentManifest

export const allSlugs: readonly string[] = ${JSON.stringify(allSlugs, null, 2)}
`

  fs.mkdirSync(join(REPO_ROOT, "src/lib/content"), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, body, "utf-8")
}

const reportIssues = (issues: ValidationIssue[]): number => {
  if (issues.length === 0) return 0
  const errors = issues.filter((i) => i.severity === "error")
  const warnings = issues.filter((i) => i.severity === "warning")

  const print = (group: ValidationIssue[], label: string) => {
    if (group.length === 0) return
    console.log(`\n${label} (${group.length}):`)
    for (const i of group) {
      console.log(`  - ${i.bodyPath} [${i.locale}] ${i.field}: ${i.reason}`)
    }
  }

  print(warnings, "Warnings")
  print(errors, "Errors")
  return errors.length
}

const ensureStub = () => {
  if (fs.existsSync(OUTPUT_FILE)) return
  fs.mkdirSync(join(REPO_ROOT, "src/lib/content"), { recursive: true })
  const stub = `// @generated by src/scripts/build-content-manifest (stub)
/* eslint-disable */
import type { ContentManifest } from "./types"

export const contentManifest: ContentManifest = {}
export const allSlugs: readonly string[] = []
`
  fs.writeFileSync(OUTPUT_FILE, stub, "utf-8")
}

const main = () => {
  ensureStub()
  const start = Date.now()
  const { manifest, allSlugs, issues } = buildManifest()
  writeManifestFile(manifest, allSlugs)

  const errorCount = reportIssues(issues)
  const elapsed = ((Date.now() - start) / 1000).toFixed(2)
  console.log(
    `\nWrote ${toPosix(relative(REPO_ROOT, OUTPUT_FILE))} — ${allSlugs.length} en slugs, ${Object.values(
      manifest
    ).reduce(
      (n, locales) => n + Object.keys(locales).length,
      0
    )} entries in ${elapsed}s`
  )
  if (errorCount > 0) {
    console.error(`\n${errorCount} validation error(s); aborting.`)
    process.exit(1)
  }
}

main()
