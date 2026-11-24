/**
 * Identity sweep: every English page through the pipeline's deterministic
 * stages with the model replaced by an echo, then through the gates.
 *
 * Normalize -> chunk -> reconstruct -> heading IDs -> sanitize -> gates is all
 * code we own, so English in must come out passing. A page that fails here
 * fails in all 24 locales on every full translation, whatever the model does:
 * that is how the wagmi tutorial failed in every locale on two runs in a row.
 * Also sanitizes English alone, which is what an incremental merge of
 * unchanged sections looks like, and requires its links and code to come back
 * untouched: the gates don't compare external URLs or inline code. No API
 * calls, no cost.
 *
 *   pnpm intl:identity-sweep [path-substring ...]
 *
 * With --pairs it dry-runs the incremental path instead: every translated pair
 * whose English moved since its manifest is merged with the model replaced by
 * the planner's own section bodies, then sanitized and gated as a real run
 * would. Run it with intl/pending-{base} merged in to see what the next
 * dispatch will do. Pairs the merge hands to a full translation are listed as
 * cost, not failure.
 *
 *   pnpm intl:identity-sweep --pairs [path-substring ...]
 *
 * Exits non-zero when any page or pair fails a gate.
 */

import { execFileSync } from "child_process"
import fs from "fs"
import path from "path"

// config.ts throws on import without a token; nothing here calls the API.
process.env.GITHUB_API_TOKEN ??= "identity-sweep"

const CONTENT = path.join(process.cwd(), "public", "content")
const JSON_ROOT = path.join(process.cwd(), "src", "intl", "en")

function sourceFiles(
  dir: string,
  keep: (name: string) => boolean,
  out: string[] = []
): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name !== "translations") sourceFiles(p, keep, out)
    } else if (keep(e.name)) out.push(path.relative(process.cwd(), p))
  }
  return out
}

/** Link targets and code spans, which no sanitizer fix may alter in English. */
function literals(md: string): string[] {
  const out: string[] = []
  for (const m of md.matchAll(/\]\((<[^>\n]*>|[^)\s]*)/g)) out.push(m[1])
  for (const m of md.matchAll(/`[^`\n]+`/g)) out.push(m[0])
  return out
}

function literalDrift(english: string, output: string): string[] {
  const left = new Map<string, number>()
  for (const l of literals(english)) left.set(l, (left.get(l) ?? 0) + 1)
  const extra: string[] = []
  for (const l of literals(output)) {
    const n = left.get(l) ?? 0
    if (n) left.set(l, n - 1)
    else extra.push(l)
  }
  return extra.slice(0, 3).map((l) => `link or code altered: ${l}`)
}

async function quiet<T>(fn: () => T | Promise<T>): Promise<T> {
  const { log, warn } = console
  console.log = console.warn = () => {}
  try {
    return await fn()
  } finally {
    console.log = log
    console.warn = warn
  }
}

async function main() {
  const [
    { normalizeContent },
    { restoreNormalizedMarkdown },
    { chunkProse, PROSE_SIZE_THRESHOLD },
    { matchTrailingNewline },
    { runSanitizer },
    { runGates },
  ] = await Promise.all([
    import("./lib/llm/content-normalizer"),
    import("./lib/llm/gemini"),
    import("./lib/llm/code-block-extractor"),
    import("./lib/workflows/utils"),
    import("./intl-sanitizer"),
    import("./lib/gates"),
  ])

  const args = process.argv.slice(2)
  const pairs = args.includes("--pairs")
  const filters = args.filter((a) => a !== "--pairs")
  const matches = (p: string) =>
    !filters.length || filters.some((f) => p.includes(f))

  const sanitize = async (
    dest: string,
    rel: string,
    english: string,
    output: string
  ) => {
    const sanitized = await quiet(() =>
      runSanitizer(
        [{ path: dest, content: output }],
        undefined,
        new Map([[rel, english]])
      )
    )
    const fixed = sanitized?.changedFiles?.find((f) => f.path === dest)
    return matchTrailingNewline(fixed ? fixed.content : output, english)
  }

  if (pairs) {
    const [
      { findStructuralRegressions, getLlmSectionIds, pipeline },
      { hasEnglishChanged },
      { getDestinationFromPath },
      { MANIFESTS_DIR },
      { config, getExcludedReason },
      { buildSectionList, extractSections },
      { extractCodeFencesOnly, restoreCodeBlocksStrict },
    ] = await Promise.all([
      import("./pipeline"),
      import("./lib/llm/manifest-adapter"),
      import("./lib/github/commits"),
      import("./constants"),
      import("./config"),
      import("./lib/llm/incremental-translate"),
      import("./lib/llm/code-block-extractor"),
    ])

    // main.ts's markdown translator with the model taken out: the planner's
    // section bodies, fences lifted and restored, so the sweep sees the section
    // boundaries the real prompt uses rather than the merge's own.
    const echo = (englishA: string, englishB: string, localeA: string) => {
      const lifted = new Map<string, ReturnType<typeof extractCodeFencesOnly>>()
      const ids = getLlmSectionIds(englishA, englishB, "markdown")
      for (const s of buildSectionList(
        extractSections(englishB),
        extractSections(localeA),
        ids
      ))
        if (s.action === "TRANSLATE")
          lifted.set(s.id, extractCodeFencesOnly(s.content || ""))
      return (id: string, fallback: string) => {
        const l = lifted.get(id)
        if (!l?.prose) return fallback
        return l.blocks.length
          ? restoreCodeBlocksStrict(l.prose, l.blocks, id)
          : l.prose
      }
    }

    const sources = [
      ...sourceFiles(JSON_ROOT, (n) => n.endsWith(".json")),
      ...sourceFiles(CONTENT, (n) => n === "index.md"),
    ].filter((p) => matches(p) && !getExcludedReason(p))
    if (!sources.length)
      throw new Error(`No English sources match ${filters.join(", ")}`)

    const shown = new Map<string, string | null>()
    const englishAt = (sha: string, rel: string) => {
      const ref = `${sha}:${rel}`
      if (!shown.has(ref)) {
        let text: string | null = null
        if (/^[0-9a-f]{40}$/i.test(sha)) {
          try {
            text = execFileSync("git", ["show", ref], {
              encoding: "utf8",
              stdio: ["ignore", "pipe", "ignore"],
              maxBuffer: 64 * 1024 * 1024,
            })
          } catch {
            text = null
          }
        }
        shown.set(ref, text)
      }
      return shown.get(ref) ?? null
    }

    let checked = 0
    let failed = 0
    const full = new Map<string, { pairs: number; reason: string }>()
    for (const rel of sources) {
      const type = rel.endsWith(".json") ? "json" : "markdown"
      const englishB = fs.readFileSync(rel, "utf8")
      for (const locale of config.allInternalCodes) {
        const dest = getDestinationFromPath(rel, locale)
        const manifestPath = path.join(MANIFESTS_DIR, dest, "source.json")
        const localePath =
          type === "markdown"
            ? dest
            : path.join("src", "intl", locale, path.basename(rel))
        // No manifest or no locale file: a full translation, which the page
        // sweep covers.
        if (!fs.existsSync(manifestPath) || !fs.existsSync(localePath)) continue
        const manifest = fs.readFileSync(manifestPath, "utf8")
        if (!hasEnglishChanged(englishB, manifest, type)) continue
        checked++

        const toFull = (reason: string) =>
          full.set(rel, {
            pairs: (full.get(rel)?.pairs ?? 0) + 1,
            reason: full.get(rel)?.reason ?? reason,
          })
        const englishA = englishAt(JSON.parse(manifest).sourceCommitSha, rel)
        if (englishA === null) {
          toFull("no English at the manifest's commit")
          continue
        }
        if (englishA.includes("\r\n") || englishB.includes("\r\n")) {
          toFull("CRLF English")
          continue
        }
        const localeA = fs.readFileSync(localePath, "utf8")
        let merged: string
        try {
          merged = await quiet(() =>
            pipeline(
              englishA,
              englishB,
              localeA,
              type,
              type === "markdown"
                ? echo(englishA, englishB, localeA)
                : (_, en) => en
            )
          )
        } catch (e) {
          failed++
          console.log(
            `${dest}\n  merge threw: ${e instanceof Error ? e.message : e}`
          )
          continue
        }
        const [regression] = findStructuralRegressions(
          englishA,
          localeA,
          englishB,
          merged,
          type
        )
        if (regression) {
          toFull(regression.detail)
          continue
        }

        const output = await sanitize(dest, rel, englishB, merged)
        const { failures } = await runGates({
          destPath: dest,
          fileType: type,
          english: englishB,
          output,
          baseline: localeA,
          baselineEnglish: englishA,
          mode: "incremental",
        })
        if (!failures.length) continue
        failed++
        console.log(`${dest}\n  ${failures.join("\n  ")}`)
      }
    }

    const fullPairs = [...full.values()].reduce((n, f) => n + f.pairs, 0)
    if (full.size) {
      console.log(`\nFull translation (pairs per page, first reason):`)
      for (const [rel, f] of [...full].sort((a, b) => b[1].pairs - a[1].pairs))
        console.log(`  ${f.pairs} ${rel}: ${f.reason}`)
    }
    console.log(
      `\n${checked} pair(s) with English changes, ${failed} failing, ${fullPairs} to full translation`
    )
    if (failed) process.exit(1)
    return
  }

  const pages = sourceFiles(CONTENT, (n) => n === "index.md").filter(matches)
  if (!pages.length)
    throw new Error(`No English pages match ${filters.join(", ")}`)

  const gate = async (english: string, output: string) =>
    (
      await runGates({
        destPath: "identity-sweep.md",
        fileType: "markdown",
        english,
        output,
        mode: "full",
      })
    ).failures

  let failed = 0
  for (const rel of pages) {
    const english = fs.readFileSync(rel, "utf8")
    const dest = rel.replace(
      "public/content/",
      "public/content/translations/de/"
    )
    const { normalized, extractions } = normalizeContent(english)
    const prose = chunkProse(normalized, PROSE_SIZE_THRESHOLD).join("\n\n")
    const full = await sanitize(
      dest,
      rel,
      english,
      restoreNormalizedMarkdown(prose, extractions, normalized, english)
    )
    const sanitized = await sanitize(dest, rel, english, english)
    const findings = [
      ...(await gate(english, full)).map((f) => `full: ${f}`),
      ...(await gate(english, sanitized)).map((f) => `sanitize: ${f}`),
      ...literalDrift(english, full).map((f) => `full: ${f}`),
      ...literalDrift(english, sanitized).map((f) => `sanitize: ${f}`),
    ]
    if (!findings.length) continue
    failed++
    console.log(`${rel}\n  ${[...new Set(findings)].join("\n  ")}`)
  }

  console.log(`\n${pages.length} page(s), ${failed} failing`)
  if (failed) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
