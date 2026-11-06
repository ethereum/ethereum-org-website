/**
 * Re-derive every stored source manifest under the current intl-content-tree
 * hashing scheme, without touching a single translation.
 *
 * One-off, run only when intl-content-tree bumps MANIFEST_VERSION (a change to
 * how content is hashed). Not part of any regular run.
 *
 *   pnpm exec tsx src/scripts/intl-pipeline/migrate-manifests.ts            # rewrite in place
 *   pnpm exec tsx src/scripts/intl-pipeline/migrate-manifests.ts --dry-run  # report only
 *
 * Why: a manifest's rootHash is what decides whether English "changed". When
 * the package changes how it hashes (0.4: frontmatter sequences and mappings
 * became real nodes; quoted scalars lost their quotes), every stored hash is
 * stale in a way that has nothing to do with content, and the next run would
 * either see drift everywhere or -- if the pipeline restamped from current
 * English -- swallow the real changes that had gone undetected. Re-serializing
 * each manifest's own English (`git show <sourceCommitSha>:<file>`) keeps the
 * comparison honest: only files whose English actually moved show up as stale
 * afterwards.
 *
 * `sourceCommitSha` and `generatedAt` are preserved. A sibling translation.json
 * has its englishManifestHash moved along with the source rootHash it mirrors.
 */

import { execFileSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

import {
  buildJsonManifest,
  buildMarkdownManifest,
  MANIFEST_VERSION,
} from "./lib/llm/manifest-adapter"
import { MANIFESTS_DIR } from "./constants"

const dryRun = process.argv.includes("--dry-run")
const root = process.cwd()

interface Counts {
  scanned: number
  rewritten: number
  unchanged: number
  translationUpdated: number
  skipped: Array<{ manifest: string; reason: string }>
}

function walkSourceManifests(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkSourceManifests(full, out)
    else if (entry.name === "source.json") out.push(full)
  }
}

function englishAt(sha: string, file: string): string | null {
  try {
    return execFileSync("git", ["show", `${sha}:${file}`], {
      encoding: "utf-8",
      maxBuffer: 1 << 26,
      stdio: ["ignore", "pipe", "ignore"],
    })
  } catch {
    return null
  }
}

function main(): void {
  const manifests: string[] = []
  walkSourceManifests(path.join(root, MANIFESTS_DIR), manifests)
  manifests.sort()

  const counts: Counts = {
    scanned: 0,
    rewritten: 0,
    unchanged: 0,
    translationUpdated: 0,
    skipped: [],
  }

  for (const manifestPath of manifests) {
    counts.scanned++
    const rel = path.relative(root, manifestPath)
    const stored = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as {
      sourceFile?: string
      sourceCommitSha?: string
      generatedAt?: string
      rootHash?: string
    }

    if (!stored.sourceFile || !stored.sourceCommitSha) {
      counts.skipped.push({
        manifest: rel,
        reason: "no sourceFile/sourceCommitSha",
      })
      continue
    }
    if (!/^[0-9a-f]{40}$/i.test(stored.sourceCommitSha)) {
      counts.skipped.push({
        manifest: rel,
        reason: "malformed sourceCommitSha",
      })
      continue
    }

    const english = englishAt(stored.sourceCommitSha, stored.sourceFile)
    if (english === null) {
      counts.skipped.push({
        manifest: rel,
        reason: `git show ${stored.sourceCommitSha.slice(0, 8)}:${stored.sourceFile} failed`,
      })
      continue
    }

    const rebuilt = JSON.parse(
      stored.sourceFile.endsWith(".json")
        ? buildJsonManifest(english, stored.sourceFile, stored.sourceCommitSha)
        : buildMarkdownManifest(
            english,
            stored.sourceFile,
            stored.sourceCommitSha
          )
    ) as { generatedAt: string; rootHash: string }
    // The stamp records when English was last captured, not when it was
    // re-hashed. Keep it.
    if (stored.generatedAt) rebuilt.generatedAt = stored.generatedAt

    const next = JSON.stringify(rebuilt, null, 2) + "\n"
    const current = fs.readFileSync(manifestPath, "utf-8")
    if (next === current) {
      counts.unchanged++
      continue
    }

    counts.rewritten++
    if (!dryRun) fs.writeFileSync(manifestPath, next)

    const translationPath = path.join(
      path.dirname(manifestPath),
      "translation.json"
    )
    if (
      rebuilt.rootHash !== stored.rootHash &&
      fs.existsSync(translationPath)
    ) {
      const translation = JSON.parse(
        fs.readFileSync(translationPath, "utf-8")
      ) as { englishManifestHash?: string }
      // Only a translation that tracked the old source hash follows it; one that
      // was already behind stays behind (that gap is real, not a scheme change).
      if (translation.englishManifestHash === stored.rootHash) {
        translation.englishManifestHash = rebuilt.rootHash
        counts.translationUpdated++
        if (!dryRun) {
          fs.writeFileSync(
            translationPath,
            JSON.stringify(translation, null, 2) + "\n"
          )
        }
      }
    }
  }

  console.log(
    `[migrate-manifests] schema v${MANIFEST_VERSION}${dryRun ? " (dry run)" : ""}: ` +
      `${counts.scanned} scanned, ${counts.rewritten} rewritten, ${counts.unchanged} unchanged, ` +
      `${counts.translationUpdated} translation.json hash(es) moved, ${counts.skipped.length} skipped`
  )
  for (const s of counts.skipped) {
    console.log(`  skipped ${s.manifest}: ${s.reason}`)
  }
}

main()
