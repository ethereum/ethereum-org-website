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

import matter from "gray-matter"

/**
 * `error` -- a structural invariant that can never legitimately differ between
 * a source file and its translation. Always a defect; fails the gate.
 *
 * `warn` -- a coverage heuristic. A translation CAN legitimately be
 * byte-identical to English ("Maintenance" is a French word), so these are
 * reported for a human to judge and do not fail the gate.
 */
export type Severity = "error" | "warn"

export type Finding = {
  file: string
  check: string
  detail: string
  severity: Severity
}

// --- helpers ---------------------------------------------------------------

/** Heading scan that ignores fenced code (a shell `# comment` is not a heading). */
function headings(src: string) {
  const out: {
    line: number
    level: number
    text: string
    anchor: string | null
  }[] = []
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
      text: h[2].replace(/\s*\{#[^}]*\}\s*$/, "").trim(),
      anchor: anchor ? anchor[0] : null,
    })
  })
  return out
}

const multiset = (xs: string[]) => {
  const m = new Map<string, number>()
  for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1)
  return m
}

function diffMultiset(a: string[], b: string[]) {
  const ma = multiset(a)
  const mb = multiset(b)
  const out: string[] = []
  for (const [k, n] of ma)
    if ((mb.get(k) ?? 0) !== n) out.push(`${k} (en=${n} tr=${mb.get(k) ?? 0})`)
  for (const [k, n] of mb) if (!ma.has(k)) out.push(`${k} (en=0 tr=${n})`)
  return out
}

const all = (src: string, re: RegExp) => [...src.matchAll(re)].map((m) => m[1])

/** Component tag names, opening and closing, in document order. */
const tags = (src: string) => all(src, /<\/?([A-Z][A-Za-z0-9]*)/g)
const fences = (src: string) => src.match(/```[\s\S]*?```/g) ?? []
const hrefs = (src: string) => all(src, /(?:\]\(|href=")(\/[^)"\s]*)/g)
const altText = (src: string) => all(src, /!\[([^\]]*)\]/g)
const attrValues = (src: string, attr: string) =>
  all(src, new RegExp(`<[A-Z][A-Za-z0-9]*[^>]*?\\s${attr}="([^"]*)"`, "g"))

// --- markdown checks -------------------------------------------------------

export function verifyMarkdown(
  enSrc: string,
  trSrc: string,
  file: string
): Finding[] {
  const f: Finding[] = []
  const add = (check: string, detail: string, severity: Severity = "error") =>
    f.push({ file, check, detail, severity })

  const eh = headings(enSrc)
  const th = headings(trSrc)

  if (eh.length !== th.length) {
    add("heading-count", `en=${eh.length} tr=${th.length}`)
  } else {
    // Level sequence must match exactly.
    const lvl = th.findIndex((h, i) => h.level !== eh[i].level)
    if (lvl !== -1)
      add(
        "heading-level",
        `heading ${lvl + 1} (line ${th[lvl].line}): en=h${eh[lvl].level} tr=h${th[lvl].level}`
      )

    // Each heading must carry its own English anchor -- this is the PR #19115 bug.
    th.forEach((h, i) => {
      if ((eh[i].anchor ?? null) !== (h.anchor ?? null))
        add(
          "heading-anchor",
          `line ${h.line}: expected ${eh[i].anchor ?? "(none)"}, found ${h.anchor ?? "(none)"}`
        )
    })
  }

  // Component tags: same names, same counts. Catches </ExpandableCard> -> </ButtonLink>
  // and any orphaned or duplicated closer.
  const tagDiff = diffMultiset(tags(enSrc), tags(trSrc))
  if (tagDiff.length) add("jsx-tags", tagDiff.join(", "))

  // Internal links must be byte-identical.
  const hrefDiff = diffMultiset(hrefs(enSrc), hrefs(trSrc))
  if (hrefDiff.length) add("internal-href", hrefDiff.join(", "))

  // Code fences must survive untouched.
  const ef = fences(enSrc)
  const tf = fences(trSrc)
  if (ef.length !== tf.length)
    add("code-fence-count", `en=${ef.length} tr=${tf.length}`)

  // Translatable attributes: same count, and none left identical to English
  // while the file was otherwise translated.
  for (const attr of ["title", "description"]) {
    const ea = attrValues(enSrc, attr)
    const ta = attrValues(trSrc, attr)
    if (ea.length !== ta.length) {
      add(`attr-count:${attr}`, `en=${ea.length} tr=${ta.length}`)
      continue
    }
    ta.forEach((v, i) => {
      if (v === ea[i] && /[A-Za-z]{3}/.test(v))
        add(`attr-untranslated:${attr}`, `${attr}="${v}"`, "warn")
    })
  }

  // Image alt text is reader-visible; flag values left identical to English.
  const ealt = altText(enSrc)
  const talt = altText(trSrc)
  if (ealt.length !== talt.length)
    add("img-alt-count", `en=${ealt.length} tr=${talt.length}`)
  else
    talt.forEach((v, i) => {
      if (
        v === ealt[i] &&
        /[A-Za-z]{3}/.test(v) &&
        v.trim().split(/\s+/).length > 1
      )
        add("img-alt-untranslated", `"${v}"`, "warn")
    })

  // Headings left verbatim English (whole-block translation miss).
  if (eh.length === th.length) {
    const same = th.filter(
      (h, i) =>
        h.text === eh[i].text &&
        /[A-Za-z]{3}/.test(h.text) &&
        h.text.trim().split(/\s+/).length > 1
    )
    // A couple of identical headings can be legitimate (e.g. "Hardware");
    // a majority means the block was never translated.
    if (same.length > 2 && same.length >= th.length / 2)
      add(
        "headings-untranslated",
        `${same.length}/${th.length} headings identical to English`,
        "warn"
      )
  }

  // Frontmatter must parse, and every field must keep the SHAPE English gave it.
  // An unquoted YAML scalar containing ": " silently becomes a mapping, so a
  // summaryPoints entry turns into an object and React throws at render --
  // after a clean MDX compile, which is why compiling is not sufficient.
  let enFm: Record<string, unknown> | null = null
  let trFm: Record<string, unknown> | null = null
  try {
    enFm = matter(enSrc).data
  } catch {
    enFm = null // English broken: not this file's problem
  }
  try {
    trFm = matter(trSrc).data
  } catch (e) {
    add(
      "frontmatter-parse",
      e instanceof Error ? e.message.split("\n")[0] : String(e)
    )
  }
  if (enFm && trFm) {
    const shape = (v: unknown): string =>
      Array.isArray(v)
        ? "array"
        : v === null
          ? "null"
          : v instanceof Date
            ? "date"
            : typeof v
    for (const [k, ev] of Object.entries(enFm)) {
      if (!(k in trFm)) {
        add("frontmatter-missing-key", k)
        continue
      }
      const tv = trFm[k]
      if (shape(ev) !== shape(tv)) {
        add("frontmatter-shape", `${k}: en=${shape(ev)} tr=${shape(tv)}`)
        continue
      }
      // A translated string that parsed as an object is the colon-in-scalar bug.
      if (Array.isArray(ev) && Array.isArray(tv)) {
        if (ev.length !== tv.length)
          add(
            "frontmatter-array-length",
            `${k}: en=${ev.length} tr=${tv.length}`
          )
        tv.forEach((x, i) => {
          if (shape(x) !== shape(ev[i] ?? x))
            add(
              "frontmatter-shape",
              `${k}[${i}]: en=${shape(ev[i])} tr=${shape(x)}${
                shape(x) === "object"
                  ? ` -- unquoted YAML scalar containing ": "?`
                  : ""
              }`
            )
        })
      }
    }
  }

  // Placeholder residue must never reach shipped output.
  const residue = trSrc.match(/HTML-PLACEHOLDER-[A-Z]+-[0-9a-f]+/g)
  if (residue) add("placeholder-residue", [...new Set(residue)].join(", "))

  // Empty {#} anchors break the MDX parser (KB pattern 23).
  if (/\{#\}/.test(trSrc)) add("empty-anchor", "found `{#}`")

  // A tag with attributes nested inside a JSX attribute value breaks parsing.
  const nested = trSrc.match(
    /\s(?:title|description)="[^"]*<[a-zA-Z][^>]*"[^>]*"/g
  )
  if (nested) add("nested-tag-in-attr", nested[0].slice(0, 80))

  return f
}

// --- json checks -----------------------------------------------------------

const icu = (s: string) =>
  [...String(s).matchAll(/\{[a-zA-Z0-9_]+\}|<\/?[a-zA-Z][a-zA-Z0-9]*>/g)]
    .map((m) => m[0])
    .sort()

export function verifyJson(
  enRaw: string,
  trRaw: string,
  file: string
): Finding[] {
  const f: Finding[] = []
  const add = (check: string, detail: string, severity: Severity = "error") =>
    f.push({ file, check, detail, severity })

  let en: Record<string, unknown>
  let tr: Record<string, unknown>
  try {
    en = JSON.parse(enRaw)
  } catch {
    return f // English broken: not this file's problem
  }
  try {
    tr = JSON.parse(trRaw)
  } catch (e) {
    add("json-parse", e instanceof Error ? e.message : String(e))
    return f
  }

  const missing = Object.keys(en).filter((k) => !(k in tr))
  const extra = Object.keys(tr).filter((k) => !(k in en))
  if (missing.length)
    add(
      "json-missing-keys",
      `${missing.length}: ${missing.slice(0, 5).join(", ")}`
    )
  if (extra.length)
    add("json-extra-keys", `${extra.length}: ${extra.slice(0, 5).join(", ")}`)

  for (const k of Object.keys(en)) {
    if (!(k in tr)) continue
    const a = icu(String(en[k]))
    const b = icu(String(tr[k]))
    if (a.join(",") !== b.join(","))
      add("json-placeholder", `${k}: en=[${a}] tr=[${b}]`)
    if (String(tr[k]).includes("HTML-PLACEHOLDER"))
      add("placeholder-residue", k)
  }
  return f
}

// --- driver ----------------------------------------------------------------

/** Map a translated path to its English counterpart, or null if there is none. */
export function englishCounterpart(file: string): string | null {
  let m = file.match(/^(.*\/)?public\/content\/translations\/[^/]+\/(.*)$/)
  if (m) return path.join("public/content", m[2])
  m = file.match(/^(.*\/)?src\/intl\/([^/]+)\/(.*\.json)$/)
  if (m && m[2] !== "en") return path.join("src/intl/en", m[3])
  return null
}

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
