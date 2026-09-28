/**
 * Structural fidelity gate for translated content.
 *
 * The per-file pipeline asks the LLM to carry structure (heading anchors,
 * component names, JSX attributes, code fences) through translation. Nothing
 * downstream checked that it did, so a bad generation shipped silently --
 * see PR #19115, where anchor assignment slid by three in all 24 locales and
 * `</ExpandableCard>` came back as `</ButtonLink>` in 71 files.
 *
 * Every check here compares a translated file against its English source and
 * asserts an invariant that must hold regardless of target language. Meaning is
 * not checked -- only structure. Run before committing pipeline output.
 *
 *   pnpm tsx src/scripts/intl-pipeline/verify-structure.ts [file ...]
 *
 * With no arguments, verifies every file under public/content/translations and
 * every src/intl/<locale>/*.json that has an English counterpart.
 */

import { execFileSync } from "child_process"
import fs from "fs"
import path from "path"

import {
  englishCounterpart,
  type Finding,
  verifyJson,
  verifyMarkdown,
} from "./lib/verify-structure"

export {
  englishCounterpart,
  type Finding,
  type Severity,
  verifyJson,
  verifyMarkdown,
} from "./lib/verify-structure"

// --- driver ----------------------------------------------------------------

function listAll(): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(md|json)$/.test(e.name)) out.push(p)
    }
  }
  walk("public/content/translations")
  walk("src/intl")
  return out.filter((p) => !p.startsWith("src/intl/en/"))
}

function main() {
  const args = process.argv.slice(2)
  const changedOnly = args.includes("--changed")
  let files = args.filter((a) => !a.startsWith("--"))

  if (changedOnly) {
    const base = process.env.VERIFY_BASE || "origin/dev"
    files = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], {
      encoding: "utf-8",
    })
      .split("\n")
      .filter(Boolean)
  }
  if (!files.length) files = listAll()

  const findings: Finding[] = []
  let checked = 0
  for (const file of files) {
    const en = englishCounterpart(file)
    if (!en || !fs.existsSync(en) || !fs.existsSync(file)) continue
    checked++
    const enSrc = fs.readFileSync(en, "utf-8")
    const trSrc = fs.readFileSync(file, "utf-8")
    findings.push(
      ...(file.endsWith(".json")
        ? verifyJson(enSrc, trSrc, file)
        : verifyMarkdown(enSrc, trSrc, file))
    )
  }

  const errors = findings.filter((f) => f.severity === "error")
  const warns = findings.filter((f) => f.severity === "warn")

  for (const f of findings)
    console.log(
      `${f.severity === "error" ? "ERROR" : "warn "} ${f.file}\n        [${f.check}] ${f.detail}`
    )

  const tally = (list: Finding[]) => {
    const m = new Map<string, number>()
    for (const f of list) m.set(f.check, (m.get(f.check) ?? 0) + 1)
    return [...m].sort((a, b) => b[1] - a[1])
  }

  console.log(
    `\n--- ${checked} file(s) checked: ${errors.length} error(s), ${warns.length} warning(s) ---`
  )
  for (const [label, list] of [
    ["errors", errors],
    ["warnings", warns],
  ] as const) {
    if (!list.length) continue
    console.log(`${label}:`)
    for (const [k, n] of tally(list))
      console.log(`  ${String(n).padStart(5)}  ${k}`)
  }
  // Only structural errors fail the gate. Warnings need a human read.
  process.exit(errors.length ? 1 : 0)
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1])))
  main()
