/**
 * Fill the per-locale `aliases` of each curation rule from ETHGlossary.
 *
 *   pnpm typesense:localize-curation
 *
 * Pins match the query string exactly, and the English rules only fire for English
 * strings -- so a reader on /ja/ typing ウォレット fell through to plain ranking while
 * "wallet" was pinned. Rules that name an ETHGlossary `term` get that term's surface forms
 * in every locale written to `curation-aliases.json`, which `curate.ts` pins alongside
 * the English query.
 *
 * Runs once, by hand, when rules change: one request per language, nothing at query or
 * crawl time. The output is committed so review sees the exact strings being pinned, and
 * kept apart from `curation.json` so hand edits and generated text never share a diff.
 */

import { readFileSync, writeFileSync } from "fs"
import path from "path"

import { format } from "prettier"

import { LOCALES } from "./client"

const GLOSSARY_API_URL =
  process.env.GLOSSARY_API_URL || "https://glossary.ethereum.org/api/v1"

const CURATION_PATH = path.join(process.cwd(), "typesense", "curation.json")
const ALIASES_PATH = path.join(
  process.cwd(),
  "typesense",
  "curation-aliases.json"
)

interface CurationRule {
  q: string
  term?: string
  pin: string[]
}

/** rule query -> locale -> the strings that pin the same pages there. */
type Aliases = Record<string, Record<string, string[]>>

interface GlossaryEntry {
  term: string
  aliases?: string[]
  morphology?: { noun?: { singular?: string } | null } | null
  contexts?: Record<string, { term?: string } | undefined>
  plurals?: Record<string, string | null> | null
  confidence?: string
}

interface GlossaryDump {
  language: string
  terms: Record<string, GlossaryEntry>
}

const fetchLanguage = async (lang: string): Promise<GlossaryDump> => {
  const response = await fetch(`${GLOSSARY_API_URL}/translations/${lang}`, {
    headers: { "User-Agent": "ethereum.org typesense:localize-curation" },
  })
  if (!response.ok)
    throw new Error(`ETHGlossary ${response.status} for ${lang}`)
  return (await response.json()) as GlossaryDump
}

/**
 * Every string a reader might type for this term. `ui` is left out on purpose: it is a
 * button label ("Connect wallet"), not a search.
 */
const surfaceForms = (entry: GlossaryEntry) => {
  const raw = [
    entry.term,
    ...(entry.aliases ?? []),
    entry.morphology?.noun?.singular,
    ...Object.entries(entry.contexts ?? {})
      .filter(([context]) => context !== "ui")
      .map(([, value]) => value?.term),
    ...Object.values(entry.plurals ?? {}),
  ]
  const forms = new Set<string>()
  for (const value of raw) {
    const form = value?.replace(/\s+/g, " ").trim()
    if (!form) continue
    forms.add(form)
    // "プルーフ・オブ・ステーク (PoS)" is also typed without its acronym.
    const bare = form.replace(/\s*\([^)]*\)\s*$/, "").trim()
    if (bare && bare !== form) forms.add(bare)
  }
  // The glossary writes Japanese compounds with a middle dot; readers mostly do not.
  for (const form of [...forms])
    if (form.includes("・")) forms.add(form.replaceAll("・", ""))
  return forms
}

const main = async () => {
  const file = JSON.parse(readFileSync(CURATION_PATH, "utf-8"))
  const rules: CurationRule[] = file.rules ?? []
  // Exact matching is case-insensitive, so a form that is already an English rule (de
  // "Wallet", the "PoS" alias) is covered and would only collide with it.
  const english = new Set(rules.map((r) => r.q.toLowerCase()))
  const localized = rules.filter((r) => r.term)
  const aliases: Aliases = {}

  let missing = 0
  for (const lang of LOCALES.filter((l) => l !== "en")) {
    const { terms } = await fetchLanguage(lang)
    // One string pins one place: the first rule to claim a form keeps it.
    const claimed = new Set<string>()
    let count = 0
    for (const rule of localized) {
      const entry = terms[rule.term!]
      if (!entry) {
        console.error(
          `  ${lang}: no glossary entry "${rule.term}" (rule "${rule.q}")`
        )
        missing++
        continue
      }
      if (entry.confidence === "low") continue
      const forms = [...surfaceForms(entry)]
        .filter((f) => !english.has(f.toLowerCase()))
        .filter((f) => {
          const key = f.toLowerCase()
          if (claimed.has(key)) return false
          claimed.add(key)
          return true
        })
        .sort()
      if (!forms.length) continue
      aliases[rule.q] = { ...aliases[rule.q], [lang]: forms }
      count += forms.length
    }
    console.log(`  ${lang}: ${count} localized queries`)
    // Polite to a shared service; the whole run is two dozen requests.
    await new Promise((r) => setTimeout(r, 250))
  }

  // Stable ordering so a re-run only changes what the glossary changed.
  const sorted = Object.fromEntries(
    localized
      .filter((r) => aliases[r.q])
      .map((r) => [
        r.q,
        Object.fromEntries(
          Object.entries(aliases[r.q]).sort(([a], [b]) => a.localeCompare(b))
        ),
      ])
  )
  // Formatted as the repo's Prettier would, so a re-run diffs only what changed.
  const json = JSON.stringify(
    {
      _comment:
        "Generated by `pnpm typesense:localize-curation` from ETHGlossary -- do not edit. Query in curation.json -> locale -> strings that pin the same pages in that locale's collection. See typesense/README.md.",
      aliases: sorted,
    },
    null,
    2
  )
  writeFileSync(ALIASES_PATH, await format(json, { filepath: ALIASES_PATH }))

  if (missing) {
    console.error(`\n${missing} term(s) not found in the glossary`)
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
