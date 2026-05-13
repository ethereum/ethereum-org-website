#!/usr/bin/env node
/*
 * Inline fumadocs-mdx eager frontmatter imports as plain JS constants.
 *
 * Why this exists: fumadocs-mdx generates `.source/server.ts` with one
 * `import { frontmatter as __fd_glob_N } from "<file>?collection=X&only=frontmatter"`
 * line per markdown file. At 25 locales x ~325 files = ~8,050 of these
 * eager virtual-module imports. Each becomes its own entry in Turbopack's
 * Rust-side module graph, and the cumulative native RSS during compile
 * crosses Netlify's 10.7 GB container ceiling well before "Generating
 * static pages". V8 heap is empty (~34 MB) when the SIGKILL fires — the
 * cost is graph mass in native memory, not JS heap.
 *
 * This script post-processes `.source/server.ts` to replace those 8k
 * imports with plain `const __fd_glob_N = {...fm};` literals. Lazy body
 * imports stay as-is (cheap chunk entries until first request). The
 * result: zero `?only=frontmatter` virtual modules in the graph.
 */

import fs from "node:fs"
import path from "node:path"
import url from "node:url"

import matter from "gray-matter"

const __filename = url.fileURLToPath(import.meta.url)
const REPO_ROOT = path.resolve(path.dirname(__filename), "..", "..", "..")
const SOURCE_DIR = path.join(REPO_ROOT, ".source")
const SERVER_TS = path.join(SOURCE_DIR, "server.ts")

if (!fs.existsSync(SERVER_TS)) {
  console.error(`[inline-fm] ${SERVER_TS} not found — run fumadocs-mdx first.`)
  process.exit(1)
}

const src = fs.readFileSync(SERVER_TS, "utf-8")

// Bail out if the file is already patched (idempotent).
if (src.startsWith("// PATCHED")) {
  console.log("[inline-fm] already patched — noop.")
  process.exit(0)
}

const importRe =
  /^import \{ frontmatter as (__fd_glob_\d+) \} from "([^"]+?)\?collection=[^"]+&only=frontmatter"\r?\n?/gm

const constants = []
const seen = new Set()
let importMatches = 0

for (const m of src.matchAll(importRe)) {
  const [, name, relPath] = m
  importMatches++
  if (seen.has(name)) continue
  seen.add(name)
  const absPath = path.resolve(SOURCE_DIR, relPath)
  const raw = fs.readFileSync(absPath, "utf-8")
  const { data } = matter(raw)
  constants.push(`const ${name} = ${JSON.stringify(data)};`)
}

if (importMatches === 0) {
  console.warn("[inline-fm] no eager frontmatter imports found — noop.")
  process.exit(0)
}

const stripped = src.replace(importRe, "")

const header =
  "// PATCHED by src/lib/poc-fumadocs/inline-frontmatter.mjs — eager " +
  "?only=frontmatter virtual modules replaced with inline constants to " +
  "shrink the Turbopack module graph. Lazy body imports preserved.\n" +
  "// @ts-nocheck\n"

const cleanedBody = stripped.replace(/^\/\/ @ts-nocheck\r?\n?/m, "")

fs.writeFileSync(SERVER_TS, header + constants.join("\n") + "\n" + cleanedBody)

console.log(
  `[inline-fm] inlined ${constants.length} frontmatter objects ` +
    `(${importMatches} import lines stripped).`
)
