/**
 * Restore heading anchors in translated markdown from the English source.
 *
 * Usage:
 *   pnpm exec tsx src/scripts/intl-pipeline/repair-anchors.ts            # rewrite in place
 *   pnpm exec tsx src/scripts/intl-pipeline/repair-anchors.ts --dry-run  # report only
 *
 * Heading IDs are the same ASCII slugs in every locale -- they are the anchor
 * targets for the table of contents and for inbound `#fragment` links -- so a
 * translated heading's `{#id}` must be its English counterpart's, positionally.
 *
 * Run 29962972384 (2026-07-22) broke that for 322 files: the model returned
 * headings without their `{#id}`, Phase 5 took the model's heading line, and
 * 815 anchors were dropped. The propagation bug was fixed a week later
 * (6126795b7e) but the corpus was never repaired, and because
 * `findStructuralRegressions` scores a run against the locale it starts from,
 * the loss became the baseline every later run preserves. This is the repair.
 *
 * Only positional copying, never invention: a file is touched only when its
 * heading count and level sequence match English exactly, which is what makes
 * "the Nth heading" a safe identity. Files whose structure genuinely diverged
 * are reported and left alone for retranslation. Idempotent -- a second run
 * reports zero changes.
 */

import * as fs from "fs"
import * as path from "path"

import {
  englishCounterpart,
  type Finding,
  verifyMarkdown,
} from "./lib/verify-structure"

const dryRun = process.argv.includes("--dry-run")

/** Heading lines outside fenced code, with their anchor if they carry one. */
function headings(src: string) {
  const out: { line: number; level: number; anchor: string | null }[] = []
  let fence: string | null = null
  src.split("\n").forEach((line, i) => {
    const f = line.match(/^\s*(`{3,}|~{3,})/)
    if (f) {
      if (!fence) fence = f[1][0]
      else if (line.trim().startsWith(fence)) fence = null
      return
    }
    if (fence) return
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (!h) return
    const anchor = h[2].match(/\{#[^}]*\}/)
    out.push({
      line: i + 1,
      level: h[1].length,
      anchor: anchor ? anchor[0] : null,
    })
  })
  return out
}

/** Replace or append the anchor on one heading line, preserving its text. */
function setAnchor(line: string, anchor: string): string {
  const stripped = line.replace(/\s*\{#[^}]*\}\s*$/, "").trimEnd()
  return `${stripped} ${anchor}`
}

interface Repair {
  file: string
  added: number
  corrected: number
}

function listTranslations(dir: string, out: string[]): void {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) listTranslations(p, out)
    else if (e.name.endsWith(".md")) out.push(p)
  }
}

function main(): void {
  const files: string[] = []
  listTranslations("public/content/translations", files)
  files.sort()

  const repaired: Repair[] = []
  const skipped: Array<{ file: string; reason: string }> = []
  let scanned = 0

  for (const file of files) {
    const en = englishCounterpart(file)
    if (!en || !fs.existsSync(en)) continue
    scanned++

    const enSrc = fs.readFileSync(en, "utf-8")
    const trSrc = fs.readFileSync(file, "utf-8")
    const eh = headings(enSrc)
    const th = headings(trSrc)

    const mismatched = th.filter((h, i) => (eh[i]?.anchor ?? null) !== h.anchor)
    if (mismatched.length === 0) continue

    // Positional identity only holds when the outline is the same shape.
    if (eh.length !== th.length) {
      skipped.push({
        file,
        reason: `heading count en=${eh.length} tr=${th.length}`,
      })
      continue
    }
    const badLevel = th.findIndex((h, i) => h.level !== eh[i].level)
    if (badLevel !== -1) {
      skipped.push({
        file,
        reason: `heading ${badLevel + 1} level en=h${eh[badLevel].level} tr=h${th[badLevel].level}`,
      })
      continue
    }

    const lines = trSrc.split("\n")
    let added = 0
    let corrected = 0
    for (let i = 0; i < th.length; i++) {
      const want = eh[i].anchor
      if (!want || th[i].anchor === want) continue
      // An English heading with no anchor leaves the locale's alone: there is
      // nothing to copy, and inventing one would create a new target.
      if (th[i].anchor === null) added++
      else corrected++
      const idx = th[i].line - 1
      lines[idx] = setAnchor(lines[idx], want)
    }
    if (added + corrected === 0) continue

    const next = lines.join("\n")

    // Never ship a repair that makes the file worse by some other measure.
    const before = verifyMarkdown(enSrc, trSrc, file).filter(isError)
    const after = verifyMarkdown(enSrc, next, file).filter(isError)
    if (after.length > before.length) {
      skipped.push({
        file,
        reason: `repair would add errors (${before.length} -> ${after.length})`,
      })
      continue
    }

    if (!dryRun) fs.writeFileSync(file, next)
    repaired.push({ file, added, corrected })
  }

  const totalAdded = repaired.reduce((n, r) => n + r.added, 0)
  const totalCorrected = repaired.reduce((n, r) => n + r.corrected, 0)
  console.log(
    `[repair-anchors]${dryRun ? " (dry run)" : ""}: ${scanned} translated file(s) scanned, ` +
      `${repaired.length} repaired (${totalAdded} anchor(s) restored, ${totalCorrected} corrected), ` +
      `${skipped.length} skipped`
  )
  for (const s of skipped) console.log(`  skipped ${s.file}: ${s.reason}`)
}

const isError = (f: Finding) => f.severity === "error"

main()
