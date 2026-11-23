/**
 * Identity sweep: every English page through the pipeline's deterministic
 * stages with the model replaced by an echo, then through the gates.
 *
 * Normalize -> chunk -> reconstruct -> heading IDs -> sanitize -> gates is all
 * code we own, so English in must come out passing. A page that fails here
 * fails in all 24 locales on every full translation, whatever the model does:
 * that is how the wagmi tutorial failed in every locale on two runs in a row.
 * Also runs sanitize -> gates on English alone, which is what an incremental
 * merge of unchanged sections looks like. No API calls, no cost.
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
    { _testOnly },
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

  const gate = async (rel: string, english: string, output: string) => {
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
    const content = matchTrailingNewline(
      fixed ? fixed.content : output,
      english
    )
    const { failures } = await runGates({
      destPath: dest,
      fileType: "markdown",
      english,
      output: content,
      mode: "full",
    })
    return failures
  }

  let failed = 0
  for (const rel of pages) {
    const english = fs.readFileSync(rel, "utf8")
    const { normalized, extractions } = normalizeContent(english)
    const prose = chunkProse(normalized, PROSE_SIZE_THRESHOLD).join("\n\n")
    const full = _testOnly.restoreHeadingIds(
      _testOnly.reconstructFromPlaceholders(prose, extractions),
      english
    )
    const findings = [
      ...(await gate(rel, english, full)).map((f) => `full: ${f}`),
      ...(await gate(rel, english, english)).map((f) => `sanitize: ${f}`),
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
