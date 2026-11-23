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
 * Exits non-zero when any page fails a gate.
 */

import fs from "fs"
import path from "path"

// config.ts throws on import without a token; nothing here calls the API.
process.env.GITHUB_API_TOKEN ??= "identity-sweep"

const CONTENT = path.join(process.cwd(), "public", "content")

function englishPages(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name !== "translations") englishPages(p, out)
    } else if (e.name === "index.md") out.push(path.relative(process.cwd(), p))
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

async function quiet<T>(fn: () => Promise<T>): Promise<T> {
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

  const filters = process.argv.slice(2)
  const pages = englishPages(CONTENT).filter(
    (p) => !filters.length || filters.some((f) => p.includes(f))
  )

  if (!pages.length)
    throw new Error(`No English pages match ${filters.join(", ")}`)

  const sanitize = async (rel: string, english: string, output: string) => {
    const dest = rel.replace(
      "public/content/",
      "public/content/translations/de/"
    )
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
    const { normalized, extractions } = normalizeContent(english)
    const prose = chunkProse(normalized, PROSE_SIZE_THRESHOLD).join("\n\n")
    const full = await sanitize(
      rel,
      english,
      restoreNormalizedMarkdown(prose, extractions, normalized, english)
    )
    const sanitized = await sanitize(rel, english, english)
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
