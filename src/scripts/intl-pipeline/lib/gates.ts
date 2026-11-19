/**
 * Pre-commit gates for translated output.
 *
 * Until now nothing between the model and the commit checked structure, so
 * anchors slid, closers were renamed and unquoted YAML shipped, and the first
 * thing to notice was the Netlify build. These run on the exact bytes about to
 * be recorded; a failure fails the task, the manifest is not stamped, and the
 * pair is retried next run (or quarantined once it repeats).
 *
 * Structure is judged against `verify-structure.ts`, the same checks the review
 * tooling runs. Incremental output is held to "no worse than the locale it
 * replaces" -- roughly a fifth of the corpus already carries pre-existing
 * errors, and an absolute bar would freeze those files forever. Full
 * translations start from nothing, so they get the absolute bar.
 */

import { escapeHeadingIds } from "../../../lib/md/escapeHeadingIds"

import { type Finding, verifyJson, verifyMarkdown } from "./verify-structure"

export interface GateInput {
  destPath: string
  fileType: "markdown" | "json"
  /** Current English source */
  english: string
  /** The content about to be committed */
  output: string
  /** The locale file being replaced; absent for a first translation */
  baseline?: string
  mode: "incremental" | "full"
}

export interface GateResult {
  ok: boolean
  failures: string[]
}

/** Strip line numbers so a finding matches itself after lines shift. */
const identity = (f: Finding) =>
  `${f.check}: ${f.detail.replace(/\bline \d+/g, "line N")}`

const countBy = (fs: Finding[]) => {
  const m = new Map<string, number>()
  for (const f of fs) m.set(f.check, (m.get(f.check) ?? 0) + 1)
  return m
}

/**
 * Structural findings the output introduces. Incremental: a finding counts only
 * if the baseline did not already have it and the check's error count grew.
 * Full: every error counts.
 */
export function structuralRegressions(input: GateInput): string[] {
  const verify = input.fileType === "json" ? verifyJson : verifyMarkdown
  const after = verify(input.english, input.output, input.destPath).filter(
    (f) => f.severity === "error"
  )
  if (input.mode === "full" || input.baseline === undefined) {
    return after.map(identity)
  }
  const before = verify(input.english, input.baseline, input.destPath).filter(
    (f) => f.severity === "error"
  )
  const known = new Set(before.map(identity))
  const beforeCounts = countBy(before)
  const afterCounts = countBy(after)
  return after
    .filter((f) => !known.has(identity(f)))
    .filter(
      (f) => (afterCounts.get(f.check) ?? 0) > (beforeCounts.get(f.check) ?? 0)
    )
    .map(identity)
}

/** Every key path in a JSON document, `a.b.c` style, arrays by index. */
export function jsonKeyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return []
  const out: string[] = []
  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      const p = `${prefix}[${i}]`
      out.push(p, ...jsonKeyPaths(v, p))
    })
    return out
  }
  for (const [k, v] of Object.entries(value)) {
    const p = prefix ? `${prefix}.${k}` : k
    out.push(p, ...jsonKeyPaths(v, p))
  }
  return out
}

/** Nested key parity: top-level checks miss a key dropped inside a namespace. */
export function jsonDeepParity(english: string, output: string): string[] {
  let en: unknown
  let out: unknown
  try {
    en = JSON.parse(english)
  } catch {
    return []
  }
  try {
    out = JSON.parse(output)
  } catch (e) {
    return [`json-parse: ${e instanceof Error ? e.message : String(e)}`]
  }
  const a = new Set(jsonKeyPaths(en))
  const b = new Set(jsonKeyPaths(out))
  const missing = [...a].filter((k) => !b.has(k))
  const extra = [...b].filter((k) => !a.has(k))
  const failures: string[] = []
  if (missing.length)
    failures.push(
      `json-missing-paths: ${missing.length} (${missing.slice(0, 5).join(", ")})`
    )
  if (extra.length)
    failures.push(
      `json-extra-paths: ${extra.length} (${extra.slice(0, 5).join(", ")})`
    )
  return failures
}

interface MdxChain {
  serialize: typeof import("next-mdx-remote/serialize").serialize
  remarkPlugins: unknown[]
}
let mdxChain: Promise<MdxChain> | null = null

/**
 * The parsing half of the site's MDX setup (`src/lib/md/compile.ts`): the same
 * heading-id escape and the same syntax-shaping remark plugins. The site's ToC
 * and JSX-preserve passes and the image pass run on the parsed tree and cannot
 * make a file fail or pass parsing, so they are left out; they also pull in
 * ESM-only deps the CJS test build cannot load.
 *
 * The packages themselves are ESM-only (next-mdx-remote/serialize with
 * top-level await), so they are imported lazily -- the same reason the
 * sanitizer imports franc-min dynamically.
 */
function loadMdxChain(): Promise<MdxChain> {
  mdxChain ??= (async () => {
    const [
      { serialize },
      { default: remarkGfm },
      { default: remarkHeadingId },
      { default: remarkSlug },
    ] = await Promise.all([
      import("next-mdx-remote/serialize"),
      import("remark-gfm"),
      import("remark-heading-id"),
      import("rehype-slug"),
    ])
    return {
      serialize,
      remarkPlugins: [remarkGfm, remarkHeadingId, remarkSlug],
    }
  })()
  return mdxChain
}

/**
 * Compile with the site's parser setup. The frontmatter is parsed too, so an
 * unquoted `key: a: b` fails here as well.
 */
export async function mdxCompileError(
  markdown: string
): Promise<string | null> {
  const chain = await loadMdxChain()
  try {
    await chain.serialize(escapeHeadingIds(markdown), {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: chain.remarkPlugins },
    } as never)
    return null
  } catch (e) {
    const lines = (e instanceof Error ? e.message : String(e)).split("\n")
    // next-mdx-remote prefixes a one-line banner; the parser's message follows
    return (lines.find((l, i) => i > 0 && l.trim()) ?? lines[0]).trim()
  }
}

export async function runGates(input: GateInput): Promise<GateResult> {
  const failures: string[] = []

  for (const f of structuralRegressions(input)) failures.push(`structure ${f}`)

  if (input.fileType === "markdown") {
    const err = await mdxCompileError(input.output)
    if (err) failures.push(`mdx ${err}`)
  } else {
    for (const f of jsonDeepParity(input.english, input.output))
      failures.push(`structure ${f}`)
  }

  return { ok: failures.length === 0, failures }
}

/** Error thrown by tasks when a gate fails; classified for quarantine. */
export class GateError extends Error {
  constructor(destPath: string, failures: string[]) {
    super(
      `[gate] ${destPath}: ${failures.length} check(s) failed -- ${failures.slice(0, 3).join("; ")}${failures.length > 3 ? ` (+${failures.length - 3} more)` : ""}`
    )
    this.name = "GateError"
  }
}
